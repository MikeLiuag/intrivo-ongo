import React, { useEffect } from 'react';
import {
  StyleSheet,
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
import ShippingInfo from '../../components/Ecommerce/ShippingInfo';
import CartItem from '../../components/Ecommerce/CartItem';
import OrderProgressView from '../../components/Ecommerce/OrderProgressView';
import { LogEvent } from '../../analytics';

export default ({ navigation }) => {
  const { t } = useTranslation();
  const { cart } = useSelector((state) => state.ecommerce);

  useEffect(() => {
    LogEvent('OrderDetails_screen');
  }, []);

  const handleGoBack = () => {
    LogEvent('OrderDetails_click_Back');
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.container}>
      <HeaderComp
        center={[t('orderDetail.title'), styles.headerTitle]}
        left="arrow"
        onLeftClick={handleGoBack}
        addStyle={styles.header}
      />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={5}
      >
        <View style={styles.content}>
          <View style={styles.orderView}>
            <Text style={styles.orderNumberText}>
              {t('checkout.orderNumber')}:{' '}
              <Text style={styles.orderNumber}>2345678</Text>
            </Text>
            <Text style={styles.orderPlacedText}>
              {t('orderDetail.placeOn')} April 6, 2022
            </Text>
            <Text style={styles.orderPlacedText}>
              {t('orderDetail.deliveredOn')} Jan. 3, 2022
            </Text>
          </View>

          <ShippingInfo editable={false} />

          <View style={[styles.summaryView, { alignItems: 'center' }]}>
            <OrderProgressView
              labels={['Ordered', 'Shipped', 'Delivered']}
              currentPosition={0}
            />

            <View style={styles.trackTextView}>
              <Text style={styles.text}>{t('orderDetail.tracking')} # </Text>
              <Text
                style={styles.viewchecklist}
                onPress={() => LogEvent('OrderDetails_click_Tracking')}
              >
                1234567890
              </Text>
            </View>
            <>
              <Text style={styles.text}>{t('orderDetail.startPrep')}</Text>
              <TouchableOpacity
                onPress={() => {
                  LogEvent('OrderDetails_click_View');
                  navigation.navigate('PretestChecklist', {
                    isFromCheckList: true,
                  });
                }}
              >
                <Text style={styles.viewchecklist}>
                  {t('orderDetail.viewChecklist')}
                </Text>
              </TouchableOpacity>
            </>
          </View>

          {cart.map((item, index) => (
            <CartItem
              key={index.toString()}
              index={index}
              noBorder={cart.length - 1 === item}
              productData={item}
              editable={false}
              showBuyAgain
            />
          ))}

          <View style={styles.summaryView}>
            <Text style={styles.orderSummaryText}>
              {t('cart.orderSummary')}
            </Text>
            <View style={styles.totalView}>
              <Text style={styles.subTotalText}>{t('cart.subtotal')}</Text>
              <Text style={styles.summaryPriceText}>$9</Text>
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

          <View style={styles.summaryView}>
            <Text style={styles.subTotalText}>
              {t('orderDetail.payment')}: Visa {t('orderDetail.endingOn')} 5555
            </Text>
          </View>

          <View style={[styles.summaryView, { borderBottomWidth: 0 }]}>
            <Text style={[styles.subTotalText, { textAlign: 'center' }]}>
              {t('orderDetail.forSupport')}
            </Text>
            <Text
              style={[
                styles.orderSummaryText,
                { textAlign: 'center', color: colors.primaryBlue },
              ]}
              onPress={() => LogEvent('OrderDetails_click_Support')}
            >
              {t('orderDetail.email')}
            </Text>
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
    paddingBottom: wp('8%'),
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
  orderNumberText: {
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyDark2,
    marginTop: 15,
    marginBottom: 8,
  },
  orderNumber: { fontFamily: 'Museo_700', fontSize: 18 },
  orderPlacedText: {
    fontFamily: 'Museo_300',
    fontSize: 12,
    lineHeight: 22,
    color: colors.greyDark2,
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
  orderView: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryButtonBorder,
  },
  trackTextView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  viewchecklist: {
    color: colors.primaryBlue,
    fontSize: 14,
    fontFamily: 'Museo_700',
    lineHeight: 22,
  },
  text: {
    fontSize: 14,
    color: colors.greyDark2,
    fontFamily: 'Museo_500',
    lineHeight: 22,
  },
});
