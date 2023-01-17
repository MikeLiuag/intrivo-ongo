import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-native-elements';
import HeaderComp from '../../components/HeaderComp';
import { colors } from '../../theme';
import { BlueButton } from '../../components/Buttons/BlueButton';
import CloseIcon from '../../components/Svg/close';
import Carousel from '../../components/IntroSteps/Carousel';
import InputLeftLabel from '../../components/InputLeftLabel';
import Icon from '../../components/Icon';
import BillingInfo from '../../components/Ecommerce/BillingInfo';
import { LogEvent } from '../../analytics';

export default ({ navigation, route }) => {
  const { t } = useTranslation();
  const [bellingMethod, setBellingMethod] = useState(0);

  const [data, setData] = useState({
    card_number: '',
    cvv: '',
    expiry_date: '',
  });

  useEffect(() => {
    LogEvent('Payment_screen');
  }, []);

  const handleRightClick = () => {
    LogEvent('Payment_click_Close');
    Alert.alert(t('exitAlert.Title'), t('exitAlert.Text'), [
      {
        text: t('yesNo.Yes'),
        onPress: () => {
          navigation.navigate('Dashboard');
        },
      },
      {
        text: t('yesNo.No'),
        style: 'cancel',
      },
    ]);
  };

  const handleGoBack = () => {
    LogEvent('Payment_click_Back');
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.container}>
      <HeaderComp
        center={[t('checkout.title'), styles.headerTitle]}
        left="arrow"
        onLeftClick={handleGoBack}
        addStyle={styles.header}
        right={[<CloseIcon width={14} height={14} />, handleRightClick]}
      />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={5}
      >
        <View style={styles.content}>
          <View style={styles.topView}>
            <Carousel currentStep={1} maxStep={3} />
            <View style={styles.stepView}>
              <Text allowFontScaling={false} style={styles.stepCounter}>
                {t('screens.intro.step')} {2}/{3}
              </Text>
              <Text style={styles.stepText}>{t('checkout.payment')}</Text>
            </View>
          </View>
          <View style={styles.paymentView}>
            <Text style={styles.sectionTitle}>
              {t('checkout.paymentInformation')}
            </Text>
            <InputLeftLabel
              error=""
              value={data.card_number}
              placeholder={t('placeholder.cardNumber')}
              keyboardType="number-pad"
              action={(value) => {
                setData((current) => ({
                  ...current,
                  card_number: value,
                }));
              }}
              left={<View style={styles.leftInputView} />}
            />

            <InputLeftLabel
              error=""
              value={data.expiry_date}
              placeholder={t('placeholder.expiryDate')}
              action={(value) => {
                setData((current) => ({
                  ...current,
                  expiry_date: value
                    ? value
                        ?.replace(/\//g, '')
                        .match(/.{1,2}/g)
                        .join('/')
                    : '',
                }));
              }}
              keyboardType="number-pad"
              maxLength={5}
            />

            <View style={styles.cvvContainer}>
              <View style={styles.cvvInput}>
                <InputLeftLabel
                  error=""
                  value={data.cvv}
                  placeholder={t('placeholder.cvv')}
                  action={(value) => {
                    setData((current) => ({
                      ...current,
                      cvv: value,
                    }));
                  }}
                  keyboardType="number-pad"
                />
              </View>

              <View style={styles.cvvTooltip}>
                <Tooltip
                  withOverlay={false}
                  backgroundColor={colors.greyDark2}
                  containerStyle={{ borderRadius: 0 }}
                  popover={
                    <Text style={styles.tooltipText}>
                      {t('checkout.cvvToolTip')}
                    </Text>
                  }
                  height={125}
                  width={135}
                >
                  <Icon
                    type="MaterialIcons"
                    name="info"
                    size={26}
                    color={colors.primaryBlue}
                  />
                </Tooltip>
              </View>
            </View>
          </View>

          <View style={styles.billingView}>
            <Text style={styles.sectionTitle}>
              {t('checkout.billingInformation')}
            </Text>
            <Pressable
              style={styles.shippingMethod}
              onPress={() => {
                setBellingMethod(0);
              }}
            >
              <View style={styles.radioView}>
                <Icon
                  type="MaterialIcons"
                  name={
                    bellingMethod === 0 ? 'radio-button-on' : 'radio-button-off'
                  }
                  size={24}
                  color={
                    bellingMethod === 0
                      ? colors.primaryBlue
                      : colors.secondaryButtonBorder
                  }
                />
                <Text style={styles.methodText}>
                  {t('checkout.sameAsShipping')}
                </Text>
              </View>
            </Pressable>
            <Pressable
              style={styles.shippingMethod}
              onPress={() => {
                setBellingMethod(1);
              }}
            >
              <View style={styles.radioView}>
                <Icon
                  type="MaterialIcons"
                  name={
                    bellingMethod === 1 ? 'radio-button-on' : 'radio-button-off'
                  }
                  size={24}
                  color={
                    bellingMethod === 1
                      ? colors.primaryBlue
                      : colors.secondaryButtonBorder
                  }
                />
                <Text style={styles.methodText}>
                  {t('checkout.useDifferentAddress')}
                </Text>
              </View>
            </Pressable>
            {bellingMethod === 1 ? <BillingInfo /> : null}
          </View>

          <View style={styles.footer}>
            <Text style={styles.totalText}>{t('cart.total')}: $9.72</Text>
            <BlueButton
              title={t('checkout.continueReview')}
              styleText={styles.paymentButtonText}
              style={styles.blueButton}
              action={() => {
                LogEvent('Payment_click_Continue');
                navigation.navigate('CheckoutReview', {
                  shippingData: route.params.shippingData,
                  contactData: route.params.contactData,
                });
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scrollContainer: { flex: 1 },
  scrollContentContainer: { flexGrow: 1 },
  content: {
    paddingHorizontal: wp('8%'),
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: hp('2.5%'),
    marginHorizontal: wp('4%'),
  },
  headerTitle: {
    fontSize: 16,
    color: colors.black,
    fontFamily: 'Museo_700',
  },
  rightBtnStyle: { width: 40, height: 40, left: 5 },
  imageBackground: {
    backgroundColor: colors.greyExtraLight,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topView: {
    alignItems: 'center',
  },
  stepView: { flexDirection: 'row' },
  stepCounter: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    letterSpacing: 1.5,
    color: colors.greyGrey,
    textTransform: 'uppercase',
    marginTop: 20,
  },
  stepText: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 1.5,
    color: colors.primaryBlue,
    textTransform: 'uppercase',
    marginTop: 20,
    paddingHorizontal: 5,
  },
  paymentButtonText: {
    fontSize: 16,
    color: colors.greyWhite,
    fontFamily: 'Museo_700',
    marginLeft: 5,
    lineHeight: 19,
  },
  shippingMethod: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodText: {
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Museo_500',
    color: colors.greyMed,
  },
  methodPriceText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Museo_700',
    color: colors.greyMed,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Museo_700',
    color: colors.greyDark2,
  },
  radioView: { flexDirection: 'row', alignItems: 'center' },
  totalText: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Museo_700',
    color: colors.greyDark2,
    textAlign: 'center',
    marginVertical: 10,
    marginTop: 85,
  },
  tooltipText: {
    fontFamily: 'Museo_500',
    color: colors.greyWhite,
    fontSize: 12,
    textAlign: 'center',
  },
  leftInputView: {
    backgroundColor: colors.greyLight2,
    height: 22,
    width: 33,
    marginLeft: 10,
  },
  cvvContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cvvInput: { width: '90%' },
  cvvTooltip: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  billingView: { marginTop: 20 },
  footer: { flex: 1, justifyContent: 'flex-end', marginBottom: 40 },
  blueButton: { height: 60, marginTop: 10, borderRadius: 16 },
  paymentView: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryButtonBorder,
    paddingBottom: 40,
  },
});
