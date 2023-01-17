import React, { useCallback, useState, useEffect } from 'react';
import {
  useStripe,
  useApplePay,
  ApplePayButton,
  initPaymentSheet,
} from '@stripe/stripe-react-native';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlueButton } from './Buttons/BlueButton';
import DashedDivider from './DashedDivider';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import { formatProductPrice } from '../utilis/strings';

const translationPrefix = 'screens.sniffles.payment';

const StripePaymentForm = ({
  paymentInfo,
  onSuccessPayment,
  infoText,
  hasCode,
  onHaveCode,
  discount = null,
  buttonTitle,
  onClearCode,
  codeTitle = '',
  onButtonCTA,
  forceDisablePayment = false,
}) => {
  const { t } = useTranslation();
  const { presentPaymentSheet } = useStripe();
  const { isApplePaySupported, presentApplePay, confirmApplePayPayment } = useApplePay();

  const [successfullPaid, setSuccessfullPaid] = useState(false);
  const [showPaymentSheet, setShowPaymentSheet] = useState(!forceDisablePayment);
  const [applePayIsBusy, setApplePayBusy] = useState(false);

  const { amount = '', client_secret: clientSecret = '', id = '' } = paymentInfo || {};

  const displayedPrice = formatProductPrice(amount);

  const onPaymentSheetResult = useCallback(
    ({ error }) => {
      if (!error) {
        setSuccessfullPaid(true);
        onSuccessPayment({ amount, paymentIntentId: id });
      } else {
        setShowPaymentSheet(false);
      }
    },
    [onSuccessPayment, amount, id]
  );

  const onPayment = useCallback(async () => {
    if (!clientSecret) return;

    presentPaymentSheet({
      clientSecret,
    }).then((data) => {
      onPaymentSheetResult(data);
    });
  }, [onPaymentSheetResult, clientSecret, presentPaymentSheet]);

  const onPressHaveCode = () => {
    onHaveCode();
  };

  useEffect(() => {
    if (clientSecret)
      initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        customFlow: false,
        merchantDisplayName: 'On/Go',
        // applePay: {
        //   merchantCountryCode: 'US',
        // },
      });
  }, [clientSecret]);

  const onPressButton = async () => {
    onPayment();
  };

  const onApplePay = async () => {
    if (applePayIsBusy) return;
    setApplePayBusy(true);
    const { error } = await presentApplePay({
      cartItems: [{ label: 'On/Go', amount: displayedPrice, paymentType: 'Immediate' }],
      country: 'US',
      currency: 'USD',
    });
    if (error) {
      setApplePayBusy(false);
      console.warn('Apple pay error: ', error);
    } else {
      const { error: confirmError } = await confirmApplePayPayment(clientSecret);
      if (confirmError) {
        setApplePayBusy(false);
        console.warn('Payment is not confirmed: ', confirmError);
      } else {
        setSuccessfullPaid(true);
        onSuccessPayment({ amount, paymentIntentId: id });
        setApplePayBusy(false);
      }
    }
  };

  const onSubmit = () => {
    if ((onButtonCTA && amount === 0) || forceDisablePayment) {
      onButtonCTA();
    }
  };

  const renderPrice = () =>
    paymentInfo?.amount >= 0 ? (
      <>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>$</Text>
          <Text style={[styles.priceText, { fontSize: 40, lineHeight: 40 }]}>
            {discount && amount === 0 ? '0.00' : displayedPrice}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{infoText}</Text>
          <Text style={styles.infoText}>
            ${discount ? formatProductPrice(discount + amount) : displayedPrice}
          </Text>
        </View>

        {!!discount && (
          <View style={styles.infoContainer}>
            <Text style={styles.discountText}>{t('screens.medicationFlow.review.discount')}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.discountText}>${formatProductPrice(discount)}</Text>
              {!hasCode && (
                <Pressable style={{ marginLeft: 5 }} onPress={onClearCode}>
                  <Text style={[styles.codeButtonText, { marginTop: 0 }]}>Remove</Text>
                </Pressable>
              )}
            </View>
          </View>
        )}
        <DashedDivider horizontalMargin={24} />
        {hasCode ? (
          <Text onPress={onPressHaveCode} style={styles.codeButtonText}>
            {codeTitle || t(`${translationPrefix}.codeButton`)}
          </Text>
        ) : null}
        <BlueButton
          action={onPressButton}
          style={styles.button}
          styleText={styles.buttonText}
          disabled={!(paymentInfo || amount === 0)}
          title='Credit Card'
        />
        {isApplePaySupported && amount !== 0 && (
          <ApplePayButton
            onPress={onApplePay}
            type='plain'
            buttonStyle='black'
            borderRadius={16}
            style={styles.applePay}
          />
        )}
      </>
    ) : (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size='large' color={colors.primaryBlue} />
      </View>
    );

  if (successfullPaid) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size='large' color={colors.primaryBlue} />
      </View>
    );
  }
  return (
    <>
      <View style={styles.container}>{renderPrice()}</View>
      {(amount === 0 || forceDisablePayment) && (
        <BlueButton
          action={onSubmit}
          disabled={!(paymentInfo || amount === 0)}
          title={buttonTitle || t(`${translationPrefix}.buttonTitle`)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    fontFamily: fonts.familyBold,
    fontSize: 20,
    lineHeight: 21,
  },
  priceContainer: {
    height: 40,
    flexDirection: 'row',
  },
  button: {
    marginTop: 50,
    width: '100%',
    backgroundColor: colors.white,
    borderColor: colors.black,
  },
  buttonText: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
    color: colors.black,
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 13,
  },
  infoText: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeLarge,
    color: colors.greyMed,
  },
  codeButtonText: {
    marginTop: 20,
    color: colors.primaryBlue,
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
  },
  discountText: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeLarge,
    color: colors.primaryRed,
  },
  applePay: {
    width: '100%',
    height: 60,
    marginTop: 12,
  },
});

export default StripePaymentForm;
