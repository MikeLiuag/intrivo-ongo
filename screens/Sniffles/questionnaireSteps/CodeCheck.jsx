import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import PromoCodeCheck from '../../Medication/components/PromoCodeCheck';
import { snifflesFieldNames } from '../../../store/sniffles/slice';

const translationPath = 'screens.medicationFlow';
const productId = 'sniffles_observation';

const CodeCheck = ({ onChangeState, promoCode, isRedeemed }) => {
  useFocusEffect(
    useCallback(() => {
      onChangeState(true, 'skipCode');
    }, [onChangeState])
  );

  const handleChangeState = async (value) => {
    await onChangeState(value, snifflesFieldNames.PAYMENT_RECORD);
    onChangeState(null, null, true);
  };

  return (
    <PromoCodeCheck
      onChangeState={handleChangeState}
      onChangeCode={(value) => onChangeState(value, snifflesFieldNames.PROMO_CODE)}
      onResetRedeemStatus={() => onChangeState(false, 'isRedeemed')}
      promoCode={promoCode}
      isRedeemed={isRedeemed}
      translationPath={translationPath}
      productId={productId}
      analyticName='Sniffles_POC'
    />
  );
};

export default CodeCheck;
