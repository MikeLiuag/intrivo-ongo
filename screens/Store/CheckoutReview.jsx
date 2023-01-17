import React, { useEffect } from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import HeaderComp from '../../components/HeaderComp';
import { colors } from '../../theme';
import { BlueButton } from '../../components/Buttons/BlueButton';
import CloseIcon from '../../components/Svg/close';
import Carousel from '../../components/IntroSteps/Carousel';
import ContactInfo from '../../components/Ecommerce/ContactInfo';
import ShippingInfo from '../../components/Ecommerce/ShippingInfo';
import CartItem from '../../components/Ecommerce/CartItem';
import { LogEvent } from '../../analytics';

export default ({ navigation, route }) => {
  const { t } = useTranslation();
  const { cart } = useSelector((state) => state.ecommerce);

  useEffect(() => {
    LogEvent('Review_screen');
  }, []);

  const handleRightClick = () => {
    LogEvent('Review_click_Close');
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
    LogEvent('Review_click_Back');
    navigation.goBack();
  };

  function calculateTotal() {
    if (cart.length > 1) {
      return cart.reduce(
        (a, b) =>
          Number(a.product.price) * Number(a.quantity) +
          Number(b.product.price) * Number(b.quantity)
      );
    }
    return (Number(cart[0].product.price) * Number(cart[0].quantity)).toFixed(
      2
    );
  }

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
                {t('screens.intro.step')} {3}/{3}
              </Text>
              <Text style={styles.stepText}>{t('checkout.review')}</Text>
            </View>
          </View>

          <View style={styles.summaryView}>
            <Text style={styles.orderSummaryText}>
              {t('cart.orderSummary')}
            </Text>
            <View style={styles.totalView}>
              <Text style={styles.subTotalText}>{t('cart.subtotal')}</Text>
              <Text style={styles.summaryPriceText}>${calculateTotal()}</Text>
            </View>
            <View style={styles.totalView}>
              <Text style={styles.subTotalText}>{t('cart.shipping')}</Text>
              <Text style={styles.summaryPriceText}>{t('cart.free')}</Text>
            </View>
            <View style={styles.totalView}>
              <Text style={styles.subTotalText}>{t('cart.estimatedTax')}</Text>
              <Text style={styles.summaryPriceText}>$0.70</Text>
            </View>
            <View style={styles.totalView}>
              <Text style={styles.subTotalText}>{t('cart.coupon')}</Text>
              <Text
                style={[styles.summaryPriceText, { color: colors.statusRed }]}
              >
                - $9.00
              </Text>
            </View>
            <View style={styles.totalView}>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.greyDark2,
                  fontFamily: 'Museo_700',
                  lineHeight: 17,
                }}
              >
                {t('cart.total')}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.greyDark2,
                  fontFamily: 'Museo_700',
                  lineHeight: 17,
                }}
              >
                $9.72
              </Text>
            </View>
          </View>

          <ContactInfo
            isEditable={false}
            data={route.params.contactData}
            onClickEdit={() => {
              LogEvent('Review_click_EditContact');
              navigation.navigate('CheckoutShipping', {
                edit: 'contact',
              });
            }}
          />

          <ShippingInfo
            isEditable={false}
            data={route.params.shippingData}
            onClickEdit={() => {
              LogEvent('Review_click_EditShipping');
              navigation.navigate('CheckoutShipping', {
                edit: 'shipping',
              });
            }}
          />

          <View style={styles.paymentView}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {t('checkout.paymentInformation')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  LogEvent('Review_click_EditPayment');
                  navigation.goBack();
                }}
              >
                <Text style={styles.editButtonText}>{t('checkout.edit')}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.paymentText}>VISA **** **** **** 8477</Text>
            <Text style={styles.paymentText}>Expires 12/23</Text>
          </View>

          {cart.map((item, index) => (
            <CartItem
              key={index.toString()}
              index={index}
              noBorder
              productData={item}
              editable={false}
            />
          ))}

          <View style={styles.footer}>
            <BlueButton
              title={t('checkout.submitOrder')}
              styleText={styles.paymentButtonText}
              style={styles.blueButton}
              action={() => {
                LogEvent('Review_click_Submit');
                navigation.navigate('CheckoutConfirmation');
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
  topView: {
    alignItems: 'center',
  },
  stepView: { flexDirection: 'row' },
  imageBackground: {
    backgroundColor: colors.greyExtraLight,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

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

  paymentText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Museo_500',
    color: colors.greyMed,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Museo_700',
    color: colors.greyDark2,
  },
  totalText: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Museo_700',
    color: colors.greyDark2,
    textAlign: 'center',
    marginVertical: 10,
  },
  footer: { flex: 1, justifyContent: 'flex-end', marginBottom: 40 },
  blueButton: { height: 60, marginTop: 10, borderRadius: 16 },
  summaryView: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D5D5D5',
    paddingBottom: 20,
  },
  orderSummaryText: {
    fontSize: 16,
    color: colors.greyDark2,
    fontFamily: 'Museo_700',
    lineHeight: 19,
  },
  totalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  subTotalText: {
    fontSize: 14,
    color: colors.greyDark2,
    fontFamily: 'Museo_300',
    lineHeight: 17,
  },
  summaryPriceText: {
    fontSize: 14,
    color: colors.greyDark2,
    fontFamily: 'Museo_300',
    lineHeight: 17,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  paymentView: {
    marginVertical: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryButtonBorder,
  },
  editButtonText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Museo_700',
    color: colors.primaryBlue,
  },
});
