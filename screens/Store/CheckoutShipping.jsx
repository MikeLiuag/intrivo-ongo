import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import HeaderComp from '../../components/HeaderComp';
import { colors } from '../../theme';
import { BlueButton } from '../../components/Buttons/BlueButton';
import CloseIcon from '../../components/Svg/close';
import Carousel from '../../components/IntroSteps/Carousel';
import Icon from '../../components/Icon';
import ContactInfo from '../../components/Ecommerce/ContactInfo';
import ShippingInfo from '../../components/Ecommerce/ShippingInfo';
import { LogEvent } from '../../analytics';

export default ({ navigation }) => {
  const { t } = useTranslation();
  const [shippingMethod, setShippingMethod] = useState(0);
  const [isContactEdit, setIsContactEdit] = useState(false);
  const [isShippingEdit, setIsShippingEdit] = useState(false);
  const [shippingData, setShippingData] = useState({
    first_name: 'Test',
    last_name: 'Last Name',
    state_id: 'HI',
    address_1: 'New Address',
    address_2: 'New Address 2',
    city: 'New',
    zipcode: '1005',
    phoneNumber: '',
  });

  const [contactData, setContactData] = useState({
    email: 'chris.stevenson@gmail.com',
    phoneNumber: '305-555-1234',
  });
  const route = useRoute();

  useEffect(() => {
    LogEvent('Shipping_screen');
    if (route.params?.edit === 'contact') {
      setIsContactEdit(true);
    } else if (route.params?.edit === 'shipping') {
      setIsShippingEdit(true);
    }
  }, [route.params?.edit]);

  const handleRightClick = () => {
    LogEvent('Shipping_click_Close');
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
    LogEvent('Shipping_click_Back');
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
                {t('screens.intro.step')} {1}/{3}
              </Text>
              <Text style={styles.stepText}>{t('checkout.shipping')}</Text>
            </View>
          </View>
          <ContactInfo
            editMode={isContactEdit}
            data={contactData}
            onChangeData={setContactData}
            onClickEdit={() => {
              LogEvent('Shipping_click_EditContact');
              setIsContactEdit(true);
            }}
          />

          <ShippingInfo
            editMode={isShippingEdit}
            data={shippingData}
            onChangeData={setShippingData}
            onClickEdit={() => {
              LogEvent('Shipping_click_EditShipping');
              setIsShippingEdit(true);
            }}
          />

          <View style={styles.shippingMethodContainer}>
            <Text style={styles.sectionTitle}>
              {t('checkout.shippingMethod')}
            </Text>
            <Pressable
              style={styles.shippingMethod}
              onPress={() => {
                setShippingMethod(0);
              }}
            >
              <View style={styles.radioView}>
                <Icon
                  type="MaterialIcons"
                  name={
                    shippingMethod === 0
                      ? 'radio-button-on'
                      : 'radio-button-off'
                  }
                  size={24}
                  color={
                    shippingMethod === 0
                      ? colors.primaryBlue
                      : colors.secondaryButtonBorder
                  }
                />
                <Text style={styles.methodText}>
                  {t('checkout.standardShipping')}
                </Text>
              </View>
              <Text style={styles.methodPriceText}>{t('cart.free')}</Text>
            </Pressable>
            <Pressable
              style={styles.shippingMethod}
              onPress={() => {
                setShippingMethod(1);
              }}
            >
              <View style={styles.radioView}>
                <Icon
                  type="MaterialIcons"
                  name={
                    shippingMethod === 1
                      ? 'radio-button-on'
                      : 'radio-button-off'
                  }
                  size={24}
                  color={
                    shippingMethod === 1
                      ? colors.primaryBlue
                      : colors.secondaryButtonBorder
                  }
                />
                <Text style={styles.methodText}>
                  {t('checkout.expeditedDayShipping', { day: 2 })}
                </Text>
              </View>
              <Text style={styles.methodPriceText}>$8.00</Text>
            </Pressable>
            <Pressable
              style={styles.shippingMethod}
              onPress={() => {
                setShippingMethod(2);
              }}
            >
              <View style={styles.radioView}>
                <Icon
                  type="MaterialIcons"
                  name={
                    shippingMethod === 2
                      ? 'radio-button-on'
                      : 'radio-button-off'
                  }
                  size={24}
                  color={
                    shippingMethod === 2
                      ? colors.primaryBlue
                      : colors.secondaryButtonBorder
                  }
                />
                <Text style={styles.methodText}>
                  {t('checkout.fedExOvernight')}
                </Text>
              </View>
              <Text style={styles.methodPriceText}>$12.00</Text>
            </Pressable>
          </View>
          <View style={styles.footer}>
            <Text style={styles.totalText}>{t('cart.total')}: $9.72</Text>
            <BlueButton
              title={t('checkout.continuePayment')}
              styleText={styles.paymentButtonText}
              style={styles.blueButton}
              action={() => {
                LogEvent('Shipping_click_Continue');
                navigation.navigate('CheckoutPayment', {
                  shippingData,
                  contactData,
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
  topView: {
    alignItems: 'center',
    marginBottom: 20,
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
  shippingMethodContainer: { marginTop: 20 },
  footer: { flex: 1, justifyContent: 'flex-end', marginBottom: 40 },
  blueButton: { height: 60, marginTop: 10, borderRadius: 16 },
});
