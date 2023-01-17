import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { BlueButton } from '../../../components/Buttons/BlueButton';
import InputLeftLabel from '../../../components/InputLeftLabel';
import { clearGlobalErrors, setGlobalErrors } from '../../../store/app/slice';
import { getEventPromoCodeWithParams, getPriceForTest } from '../../../store/events/slice';
import { LogEvent } from '../../../analytics';
import { colors } from '../../../theme';
import { fonts } from '../../../theme/fonts';
import { dimensions } from '../../../theme/dimensions';

const DEFAULT_ANALYTIC = 'Sniffles_Async';
const PromoCodeCheck = ({
  onChangeState,
  onChangeCode,
  onResetRedeemStatus,
  promoCode,
  translationPath,
  productId,
  analyticName = DEFAULT_ANALYTIC,
  isRedeemed,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onNext = () => {
    LogEvent(`${analyticName}_EnterCode_click_Next`);
    dispatch(
      getEventPromoCodeWithParams({
        promoCode,
        productId,
        vendor: 'intrivo',
      })
    )
      .unwrap()
      .then(async (data) => {
        if (!data?.valid) {
          switch (data?.invalidation_reason) {
            case 'usage_limit_exceeded':
              dispatch(
                setGlobalErrors({
                  message: t(`errors.sniffles.couponBeingUsed.title`),
                  subtitle: t(`errors.sniffles.couponBeingUsed.subTitle`),
                })
              );
              break;
            case 'not_found':
              dispatch(
                setGlobalErrors({
                  message: t(`errors.sniffles.couponNotFound.title`),
                  subtitle: t(`errors.sniffles.couponNotFound.subTitle`),
                })
              );
              break;
            case 'not_applicable_to_given_product':
              dispatch(
                setGlobalErrors({
                  message: t(`errors.sniffles.couponNotApplicable.title`),
                  subtitle: t(`errors.sniffles.couponNotApplicable.subTitle`),
                })
              );
              break;
            default:
              break;
          }
          onChangeCode('');
        } else {
          dispatch(clearGlobalErrors());
          const { price: { amount, adjusted_amount: adjustedAmount = null } = {} } = data;
          if (adjustedAmount === 0) {
            onChangeState({
              amount: 0,
              discount: amount,
            });
          } else if (adjustedAmount > 0) {
            dispatch(
              getPriceForTest({
                promoCode,
                productId,
              })
            )
              .unwrap()
              .then((res) => {
                onChangeState({
                  amount: adjustedAmount,
                  discount: amount - adjustedAmount,
                  paymentIntentId: res?.id,
                  clientSecret: res?.client_secret,
                });
              });
          }
        }
      });
    onResetRedeemStatus();
  };

  useEffect(() => {
    if (isRedeemed && promoCode) {
      onNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={styles.body}>
        <View style={styles.input}>
          <InputLeftLabel
            value={promoCode}
            action={(value) => onChangeCode(value)}
            placeholder={t(`${translationPath}.question9.title`)}
          />
        </View>
      </View>
      <BlueButton style={styles.bottomButton} title='Next' disabled={!promoCode} action={onNext} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  containerStyle: {
    paddingHorizontal: dimensions.pageMarginHorizontal,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.familyBold,
    color: colors.black,
    lineHeight: 36,
    marginVertical: 20,
  },
  subtitle: {
    fontFamily: fonts.familyLight,
    fontSize: 13,
    color: colors.greyDark2,
    lineHeight: 20,
    marginBottom: 14,
  },
  input: {
    marginTop: 20,
  },
  header: {
    paddingHorizontal: dimensions.pageMarginHorizontal,
  },
  body: {
    flex: 1,
  },
  bottomButton: { marginBottom: 20 },
});

export default PromoCodeCheck;
