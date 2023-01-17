import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { LogEvent } from '../../../../analytics';
import StripePaymentForm from '../../../../components/StripePaymentForm';
import {
  createAppointmentRequest,
  getSnifflesProductInfo,
  snifflesFieldNames,
} from '../../../../store/sniffles/slice';

const translationsPath = 'screens.sniffles.snifflesTelehealth.questions.payment';

function PaymentInfo({ onChangeState, skipSteps, paymentRecord = {}, promoCode }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [disableForm, setDisableForm] = useState(false);

  const [productInfo, setProductInfo] = useState({
    amount: paymentRecord?.amount,
    discount: paymentRecord?.discount,
    id: paymentRecord?.paymentIntentId,
    client_secret: paymentRecord?.clientSecret,
  });

  const onSuccessPayment = async (data) => {
    await onChangeState(data, snifflesFieldNames.PAYMENT_RECORD);
    onSubmit();
  };

  useFocusEffect(
    useCallback(() => {
      if (!paymentRecord || (paymentRecord && Object.keys(paymentRecord).length === 0)) {
        dispatch(getSnifflesProductInfo('sniffles_sync_telehealth')).unwrap().then(setProductInfo);
      }
    }, [dispatch, paymentRecord])
  );

  const onHaveCode = () => {
    LogEvent('Sniffles_Virtual_Payment_click_Code');
    onChangeState({}, snifflesFieldNames.PAYMENT_RECORD);
    onChangeState(false, 'skipCode');
    skipSteps(-1);
  };

  const onClearCode = () => {
    onChangeState('', 'promoCode');
    onChangeState({}, snifflesFieldNames.PAYMENT_RECORD);
    setProductInfo({});
    setDisableForm(false);
  };

  const onSubmit = useCallback(() => {
    setDisableForm(true);
    dispatch(createAppointmentRequest(productInfo.id))
      .unwrap()
      .then(() => {
        onChangeState('', 'promoCode');
        onChangeState(false, 'isRedeemed');
        onChangeState(null, null, true);
      });
  }, [dispatch, onChangeState, productInfo.id]);

  return (
    <View style={{ flex: 1, marginTop: 25 }}>
      <StripePaymentForm
        paymentInfo={productInfo}
        onSuccessPayment={onSuccessPayment}
        infoText={t(`${translationsPath}.info`)}
        buttonTitle={t(`${translationsPath}.buttonTitle`)}
        codeTitle={t(`${translationsPath}.codeButton`)}
        onHaveCode={onHaveCode}
        hasCode={!promoCode}
        onClearCode={onClearCode}
        onButtonCTA={onSubmit}
        discount={productInfo?.discount}
        forceDisablePayment={disableForm}
      />
    </View>
  );
}

export default PaymentInfo;
