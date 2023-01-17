import React from 'react';
import PromoCodeCheck from './components/PromoCodeCheck';

const translationPath = 'screens.medicationFlow';
const productId = 'sniffles_async_telehealth';
const analyticName = 'Sniffles_Async';

export default function MedicationCodeVerify({
  onChangeState,
  promoCode,
  onPressNext,
  isRedeemed,
}) {
  const handleChangeState = async (value) => {
    await onChangeState(value, 'paymentRecord');
    onPressNext();
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
      analyticName={analyticName}
    />
  );
}
