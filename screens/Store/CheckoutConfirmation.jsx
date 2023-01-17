import React, { useEffect } from 'react';
import { StyleSheet, Alert, View, Text, ScrollView } from 'react-native';
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
import ShippingInfo from '../../components/Ecommerce/ShippingInfo';
import CartItem from '../../components/Ecommerce/CartItem';
import { LogEvent } from '../../analytics';

export default ({ navigation }) => {
  const { t } = useTranslation();
  const { cart } = useSelector((state) => state.ecommerce);

  useEffect(() => {
    LogEvent('Confirmation_screen');
  }, []);

  const handleRightClick = () => {
    LogEvent('Confirmation_click_Close');
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
        center={[t('checkout.confirmation'), styles.headerTitle]}
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
            <Text style={styles.thankText}>{t('checkout.thankPurchase')}</Text>
            <Text style={styles.orderConfirmText}>
              {t('checkout.orderConfirm')}
            </Text>
            <Text style={styles.orderNumberText}>
              {t('checkout.orderNumber')}:{' '}
              <Text style={styles.orderNumber}>2345678</Text>
            </Text>
          </View>

          <ShippingInfo editable={false} />

          <View style={styles.summaryView}>

          {cart.map((item, index) => (
            <CartItem
              key={index.toString()}
              index={index}
              noBorder
              productData={item}
              editable={false}
            />
          ))}
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
              <Text style={styles.totalText}>{t('cart.total')}</Text>
              <Text style={styles.totalText}>$9.72</Text>
            </View>
          </View>

          <View style={styles.paymentView}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {t('checkout.paymentInformation')}
              </Text>
            </View>
            <Text style={styles.paymentText}>VISA **** **** **** 8477</Text>
            <Text style={styles.paymentText}>
              {t('checkout.expires')} 12/23
            </Text>
          </View>

          <View style={styles.footer}>
            <BlueButton
              title={t('checkout.backToHome')}
              styleText={styles.paymentButtonText}
              style={styles.blueButton}
              action={() => {
                LogEvent('Confirmation_click_BackHome');
                navigation.navigate('Dashboard');
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
  topView: {
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryButtonBorder,
    paddingBottom: 20,
  },
  thankText: {
    fontFamily: 'Museo_700',
    fontSize: 18,
    lineHeight: 22,
    color: colors.greyDark2,
  },
  orderConfirmText: {
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyDark2,
    marginTop: 10,
  },
  orderNumberText: {
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyDark2,
    marginTop: 15,
  },
  orderNumber: { fontFamily: 'Museo_700' },
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
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  blueButton: {
    height: 60,
    marginTop: 10,
    borderRadius: 16,
  },
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
  },

  totalText: {
    fontSize: 14,
    color: colors.greyDark2,
    fontFamily: 'Museo_700',
    lineHeight: 17,
  },
});
