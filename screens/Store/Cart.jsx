import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComp from '../../components/HeaderComp';
import { colors } from '../../theme';
import { BlueButton } from '../../components/Buttons/BlueButton';
import CloseIcon from '../../components/Svg/close';
import Icon from '../../components/Icon';
import InputLeftLabel from '../../components/InputLeftLabel';
import CartItem from '../../components/Ecommerce/CartItem';
import EmptyCart from '../../components/Ecommerce/EmptyCart';

import { fetchCart, makeCheckout } from '../../store/ecommerce/slice';
import { LogEvent } from '../../analytics';

export default ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.ecommerce);
  const { newCart } = useSelector((state) => state.ecommerce);
  const [promoCodePlaceholder, setPromocodePlaceholder] =
    useState('Enter promo code');
  const [errorPromoCode, setErrorPromoCode] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoCodes, setPromoCodes] = useState([]);
  let estimatedCost = {};

  if (newCart.length > 0) {
    estimatedCost = newCart[0]?.data?.cart?.estimatedCost;
  }
  useEffect(() => {
    dispatch(fetchCart(cart[0]?.newCart?.payload?.data?.cartCreate?.cart?.id));
  }, []);

  useEffect(() => {
    LogEvent('Cart_screen');
  }, []);

  function handleRightClick() {
    LogEvent('Cart_click_Close');
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
  }
  function addPromoCode() {
    if (1) {
      setPromoCodes([...promoCodes, promoCode]);
      setPromoCode('');
      setErrorPromoCode('');
      setPromocodePlaceholder(t('cart.promocodePlaceholder'));
    } else {
      setErrorPromoCode(' ');
      setPromocodePlaceholder('Invalid code, try again.');
    }
  }
  function removePromocode(index) {
    const tempPromoCodes = promoCodes;
    tempPromoCodes.splice(index, 1);
    setPromoCodes([...tempPromoCodes]);
  }
  const handleSubmit = () => {
    dispatch(makeCheckout({ email: 'bvladyka@intrivo.com' }));
    LogEvent('Cart_click_Back');
    navigation.goBack();
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={{ flex: 1, backgroundColor: '#ffffff' }}
    >
      <HeaderComp
        center={[t('cart.title'), styles.headerTitle]}
        left="arrow"
        onLeftClick={handleSubmit}
        addStyle={styles.header}
        right={[
          <CloseIcon width={14} height={14} />,
          handleRightClick,
          styles.rightBtnStyle,
        ]}
      />
      <LinearGradient
        colors={['#ffffff', '#ffffff']}
        start={{ x: 0, y: 0 }}
        style={{ flex: 1 }}
      >
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.content}>
                <Text style={styles.totalTextStyle}>
                  {t('cart.estimatedTotal')}:{' '}
                  <Text style={styles.priceStyle}>
                    {newCart.length > 0
                      ? `$${estimatedCost?.totalAmount?.amount}0`
                      : ''}
                  </Text>
                </Text>
                <Text>
                  {newCart.length > 0
                    ? newCart.map((item, index) => (
                        <CartItem
                          key={index.toString()}
                          index={index}
                          noBorder={cart.length - 1 === item}
                          productData={item}
                        />
                      ))
                    : ''}
                </Text>
                <View
                  style={{
                    marginVertical: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: '#D5D5D5',
                    paddingBottom: 20,
                  }}
                >
                  <InputLeftLabel
                    error={errorPromoCode}
                    value={promoCode}
                    placeholder={promoCodePlaceholder}
                    action={setPromoCode}
                    right={
                      promoCode && (
                        <TouchableOpacity
                          style={[styles.quantityBlueContainer]}
                          onPress={() => {
                            addPromoCode();
                          }}
                        >
                          <Icon
                            type="MaterialCommunityIcons"
                            name="plus"
                            size={24}
                            color={colors.greyWhite}
                          />
                        </TouchableOpacity>
                      )
                    }
                  />
                  <View
                    style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}
                  >
                    {promoCodes.map((item, index) => (
                      <View key={item.toString()} style={styles.promoCodeView}>
                        <Text style={styles.promoCodeText}>{item}</Text>
                        <TouchableOpacity
                          onPress={() => {
                            removePromocode(index);
                          }}
                          style={styles.cancelButton}
                        >
                          <Icon
                            type="MaterialCommunityIcons"
                            name="close"
                            size={10}
                            color={colors.greyWhite}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.summaryView}>
                  <Text style={styles.orderSummaryText}>
                    {t('cart.orderSummary')}
                  </Text>
                  <View style={styles.totalView}>
                    <Text style={styles.subTotalText}>
                      {t('cart.subtotal')}
                    </Text>
                    <Text style={styles.summaryPriceText}>
                      {newCart.length > 0
                        ? `$${estimatedCost?.subtotalAmount?.amount}0`
                        : ''}
                    </Text>
                  </View>
                  <View style={styles.totalView}>
                    <Text style={styles.subTotalText}>
                      {t('cart.shipping')}
                    </Text>
                    <Text style={styles.summaryPriceText}>
                      {t('cart.free')}
                    </Text>
                  </View>
                  <View style={styles.totalView}>
                    <Text style={styles.subTotalText}>
                      {t('cart.estimatedTax')}
                    </Text>
                    <Text style={styles.summaryPriceText}>
                      {newCart.length > 0
                        ? `$${estimatedCost?.totalTaxAmount?.amount}0`
                        : ''}
                    </Text>
                  </View>
                  <View style={styles.totalView}>
                    <Text style={styles.subTotalText}>{t('cart.coupon')}</Text>
                    <Text
                      style={[
                        styles.summaryPriceText,
                        { color: colors.statusRed },
                      ]}
                    />
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
                      {newCart.length > 0
                        ? `$${estimatedCost?.totalAmount?.amount}0 ${estimatedCost?.totalTaxAmount?.currencyCode}`
                        : ''}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <BlueButton
              title={t('cart.proceedCheckout')}
              styleText={styles.cartButtonText}
              style={{
                height: 50,
                marginBottom: 35,
                marginHorizontal: wp('4%'),
              }}
              // action={handleSubmit}
              action={() => {
                LogEvent('Cart_click_Proceed');
                navigation.navigate('CheckoutShipping');
              }}
            />
          </>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4%'),
    justifyContent: 'space-between',
    height: '100%',
  },
  content: {
    paddingHorizontal: wp('8%'),
    height: '100%',
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
    fontWeight: '600',
    color: colors.black,
  },
  rightBtnStyle: { marginRight: 10 },
  totalTextStyle: {
    fontStyle: 'normal',
    fontFamily: 'Museo_500',
    fontSize: 16,
    fontWeight: '400',
    color: colors.greyDark2,
    marginTop: 4,
    textAlign: 'center',
  },
  priceStyle: {
    fontStyle: 'normal',
    fontFamily: 'Museo_900',
    fontSize: 16,
    color: colors.greyDark2,
    marginTop: 10,
    lineHeight: 22,
  },
  testTextStyle: {
    fontStyle: 'normal',
    fontFamily: 'Museo_500',
    fontSize: 14,
    fontWeight: '400',
    color: colors.greyDark2,
  },
  testNumberStyle: {
    fontStyle: 'normal',
    fontFamily: 'Museo_500',
    fontSize: 12,
    fontWeight: '400',
    color: colors.greyDark2,
    marginTop: 4,
  },
  quantityBlueContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 130,
  },
  cartButtonText: {
    fontSize: 17,
    color: colors.greyWhite,
    fontFamily: 'Museo_700',
    marginLeft: 5,
    lineHeight: 19,
  },
  cancelButton: {
    backgroundColor: colors.primaryBlue,
    width: 16,
    height: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  promoCodeView: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  promoCodeText: {
    fontSize: 14,
    color: colors.greyDark2,
    fontFamily: 'Museo_500',
  },
  summaryView: {
    marginVertical: 20,
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
});
