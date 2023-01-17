import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { LogEvent } from '../../analytics';
import { BlueButton } from '../../components/Buttons/BlueButton';
import HeaderComp from '../../components/HeaderComp';
import { getPriceForTest } from '../../store/events/slice';
import { colors } from '../../theme';
import useIsFloatingKeyboard from '../../utilis/keyboard';

const LIMIT = 100;

const calculateTotalPrice = ({
  defaultPrice = 24.99,
  discountPercentage = 0,
  quantity = 0,
}) =>
  (
    Math.round(defaultPrice * (1 - discountPercentage / 100) * quantity * 100) /
    100
  ).toFixed(2);

const TestQuantity = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const eventDetails = route?.params?.event || {};

  const [testTotal, setTestTotal] = useState(0);
  const [limitError, setLimitError] = useState(false);

  // fix for keyboard
  const floating = useIsFloatingKeyboard();

  useEffect(() => {
    LogEvent('TGCreateQuantity_screen');
  }, []);

  const handleButton = async () => {
    const response = await dispatch(
      getPriceForTest({
        count: testTotal,
        promoCode: eventDetails.promoCode,
      })
    );
    if (response?.type.includes('fulfilled')) {
      LogEvent('TGCreateQuantity_click_Continue');
      navigation.navigate('EventPayment', {
        event: {
          ...eventDetails,
          amountTest: testTotal,
        },
      });
    }
  };

  const handleBack = () => {
    LogEvent('TGCreateQuantity_click_Back');
    navigation.goBack();
  };

  const handleClose = () => {
    LogEvent('TGCreateQuantity_click_Close');
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        enabled={!floating}
      >
        <View style={styles.header}>
          <HeaderComp
            left="arrow"
            onLeftClick={handleBack}
            center={[
              t('event.quantity.header'),
              {
                fontSize: 16,
                color: 'black',
                fontFamily: 'Museo_700',
                lineHeight: 30,
                marginLeft: -15,
              },
            ]}
            right={['x', handleClose]}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>{t('event.quantity.question')}</Text>
          <Text style={styles.subtitle}>{t('event.quantity.limit')}</Text>
          <View style={styles.mainContainer}>
            <TextInput
              date={testTotal}
              onChangeText={(value) => {
                setLimitError(value > LIMIT);
                setTestTotal(value);
              }}
              autoFocus
              style={[
                styles.textInput,
                {
                  color: limitError ? colors.statusRed : colors.black,
                },
              ]}
              keyboardType="numeric"
            />
            {testTotal && !limitError ? (
              <Text style={styles.totalText}>{`$${calculateTotalPrice({
                discountPercentage: eventDetails.discountPercentage,
                defaultPrice: eventDetails.defaultPrice,
                quantity: testTotal,
              })} ${t('event.quantity.estimated')}`}</Text>
            ) : null}
            {limitError && (
              <Text style={styles.errorText}>
                {t('event.quantity.limitError')}
              </Text>
            )}
          </View>
          <BlueButton
            action={handleButton}
            title={t('event.quantity.button')}
            disabled={testTotal === 0 || !testTotal || limitError}
            style={{
              marginBottom: 20,
            }}
            styleText={styles.whiteText}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TestQuantity;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  title: {
    fontFamily: 'Museo_500',
    lineHeight: 24,
    fontSize: 16,
    alignSelf: 'center',
    color: colors.greyMed,
  },
  subtitle: {
    fontFamily: 'Museo_500',
    lineHeight: 22,
    fontSize: 14,
    alignSelf: 'center',
    color: colors.greyGrey,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontFamily: 'Museo_700',
    fontSize: 40,
    lineHeight: 48,
  },
  totalText: {
    color: colors.greyMed,
    fontFamily: 'Museo_500',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 16,
  },
  errorText: {
    color: colors.statusRed,
    fontFamily: 'Museo_500',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 16,
  },
  whiteText: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
  },
});
