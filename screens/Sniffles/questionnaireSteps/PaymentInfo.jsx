import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import StripePaymentForm from '../../../components/StripePaymentForm';
import { getSnifflesProductInfo, snifflesFieldNames } from '../../../store/sniffles/slice';
import { LogEvent } from '../../../analytics';

const translationsPath = 'screens.sniffles.questions.payment';

function PaymentInfo({ onChangeState, skipSteps, paymentRecord, promoCode, analyticsName }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [disableForm, setDisableForm] = useState(false);

  const [paymentInfo, setPaymentInfo] = useState({
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
        dispatch(getSnifflesProductInfo('sniffles_observation')).unwrap().then(setPaymentInfo);
      }
    }, [dispatch, paymentRecord])
  );

  const onHaveCode = () => {
    LogEvent(`Sniffles_POC_${analyticsName}_click_Code`);
    onChangeState({}, snifflesFieldNames.PAYMENT_RECORD);
    onChangeState(false, 'skipCode');
    skipSteps(-1);
  };

  const onClearCode = () => {
    onChangeState('', 'promoCode');
    onChangeState({}, snifflesFieldNames.PAYMENT_RECORD);
    setPaymentInfo({});
    setDisableForm(false);
  };

  const onSubmit = useCallback(() => {
    setDisableForm(true);
    onChangeState(null, null, true);
  }, [onChangeState]);

  return (
    <View style={{ flex: 1, marginTop: 25 }}>
      <StripePaymentForm
        paymentInfo={paymentInfo}
        onSuccessPayment={onSuccessPayment}
        infoText={t(`${translationsPath}.info`)}
        buttonTitle={t(`${translationsPath}.buttonTitle`)}
        codeTitle={t(`${translationsPath}.codeButton`)}
        onHaveCode={onHaveCode}
        hasCode={!promoCode}
        onClearCode={onClearCode}
        onButtonCTA={onSubmit}
        discount={paymentInfo?.discount}
        forceDisablePayment={disableForm}
      />
    </View>
  );
}

export default PaymentInfo;
