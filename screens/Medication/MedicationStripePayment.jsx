import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getSnifflesProductInfo } from '../../store/sniffles/slice';
import {
  createMedicationRequest,
  clearSelections,
  snifflesFieldNames,
} from '../../store/medicationFlow/slice';
import { LogEvent } from '../../analytics';
import StripePaymentForm from '../../components/StripePaymentForm';
import CompletedScreen from '../../components/CompletedScreen';

const translationPath = 'screens.medicationFlow.payment';
const analyticConfirmation = 'Sniffles_Async_Confirmation';

function MedicationStripePayment({ onChangeState, skipSteps, paymentRecord = {}, promoCode }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { reset } = useNavigation();
  const { users } = useSelector((state) => state.user) || {};

  const [isCompletedModalVisible, setIsCompletedModalVisible] = useState(false);

  const [disableForm, setDisableForm] = useState(false);

  const [paymentInfo, setProductInfo] = useState({
    amount: paymentRecord?.amount,
    discount: paymentRecord?.discount,
    id: paymentRecord?.paymentIntentId,
    client_secret: paymentRecord?.clientSecret,
  });

  const onModalClose = (type) => {
    LogEvent(`${analyticConfirmation}_click_${type}`);
    setIsCompletedModalVisible(false);
    reset({
      index: 0,
      routes: [
        { name: 'Dashboard' },
        {
          name: 'CarePlan',
          params: {
            purpose: 'sniffles',
            from: 'MedicationFlow',
          },
        },
      ],
    });
    dispatch(clearSelections());
  };

  const onSuccessPayment = async (data) => {
    await onChangeState(data, snifflesFieldNames.PAYMENT_RECORD);
    onSubmit();
  };

  useFocusEffect(
    useCallback(() => {
      if (!paymentRecord || Object.keys(paymentRecord).length === 0) {
        dispatch(getSnifflesProductInfo('sniffles_async_telehealth')).unwrap().then(setProductInfo);
      }
    }, [dispatch, paymentRecord])
  );

  const onClearCode = () => {
    onChangeState('', 'promoCode');
    onChangeState({}, snifflesFieldNames.PAYMENT_RECORD);
    setProductInfo({});
    setDisableForm(false);
  };

  const onHaveCode = () => {
    LogEvent(`Sniffles_Async_Payment_click_Code`);
    onChangeState({}, snifflesFieldNames.PAYMENT_RECORD);
    skipSteps(-1);
  };

  const onSubmit = useCallback(async () => {
    setDisableForm(true);
    dispatch(createMedicationRequest())
      .unwrap()
      .then(() => {
        onChangeState('', 'promoCode');
        onChangeState(false, 'isRedeemed');
        setIsCompletedModalVisible(true);
      });
  }, [dispatch, onChangeState]);

  return (
    <View style={{ flex: 1, paddingTop: 24 }}>
      <StripePaymentForm
        paymentInfo={paymentInfo}
        infoText={t(`${translationPath}.provider`)}
        buttonTitle={t(`${translationPath}.buttonTitle`)}
        codeTitle={t(`${translationPath}.codeButton`)}
        onSuccessPayment={onSuccessPayment}
        hasCode={!promoCode}
        onClearCode={onClearCode}
        onHaveCode={onHaveCode}
        onButtonCTA={onSubmit}
        discount={paymentInfo?.discount}
        forceDisablePayment={disableForm}
      />
      {isCompletedModalVisible && (
        <CompletedScreen
          title={t(`${translationPath}.submitSuccess`)}
          descr={t(`${translationPath}.descr`)}
          buttonTitle={t(`${translationPath}.gotIt`)}
          visible={isCompletedModalVisible}
          result={2}
          background
          onPressButton={() => onModalClose('GotIt')}
          onClose={() => onModalClose('Close')}
          analyticName={analyticConfirmation}
          checkmark
        />
      )}
    </View>
  );
}

export default MedicationStripePayment;
