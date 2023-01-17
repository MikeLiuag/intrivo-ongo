import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import PromoCodeCheck from '../../../Medication/components/PromoCodeCheck';

const translationPath = 'screens.medicationFlow';
const productId = 'sniffles_sync_telehealth';

const CodeCheck = ({ onChangeState, promoCode, isRedeemed }) => {
  useFocusEffect(
    useCallback(() => {
      onChangeState(true, 'skipCode');
    }, [onChangeState])
  );

  const handleChangeState = async (value) => {
    await onChangeState(value, 'paymentRecord');
    onChangeState(null, null, true);
  };

  return (
    <PromoCodeCheck
      onChangeState={handleChangeState}
      onChangeCode={(value) => onChangeState(value, 'promoCode')}
      onResetRedeemStatus={() => onChangeState(false, 'isRedeemed')}
      promoCode={promoCode}
      isRedeemed={isRedeemed}
      translationPath={translationPath}
      productId={productId}
      analyticName='Sniffles_Telehealth'
    />
  );
};

export default CodeCheck;
