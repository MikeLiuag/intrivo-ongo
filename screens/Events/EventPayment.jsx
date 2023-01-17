import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import { useStripe } from '@stripe/stripe-react-native';
import { BlueButton } from '../../components/Buttons/BlueButton';
import HeaderComp from '../../components/HeaderComp';
import { colors } from '../../theme';
import CheckIcon from '../../components/Svg/checkIcon';
import { discountCode } from '../../store/events/slice';
import { LogEvent } from '../../analytics';

const calculateDiscountAmount = ({
  quantity = 0,
  defaultPrice = 24.99,
  discount = 0,
}) => (Math.round(defaultPrice * discount * quantity * -1) / 100).toFixed(2);

const calculateDefaultAmount = ({ quantity = 0, defaultPrice = 24.99 }) =>
  (Math.round(defaultPrice * quantity * 100) / 100).toFixed(2);

const EventPayment = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { event: data } = route.params;

  const { payments } = useSelector((state) => state.events) || {};

  const [isModalVisible, setModalVisible] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [isShownOnce, setShownOnce] = useState(false);

  useEffect(() => {
    LogEvent('TGCreatePayment_screen');
    initialisePaymentSheet();
  }, []);

  useEffect(() => {
    if (clientSecret && !isShownOnce) {
      setShownOnce(true);
      setTimeout(() => {
        onPay();
      }, 500);
    }
  }, [clientSecret]);

  const initialisePaymentSheet = async () => {
    if (payments) {
      setClientSecret(payments.client_secret);
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: payments.client_secret,
        customFlow: false,
        merchantDisplayName: 'On/Go',
      });
      if (!error) {
        setPaymentSheetEnabled(true);
      }
    }
  };

  const onPay = async () => {
    if (!clientSecret) {
      return;
    }
    const { error } = await presentPaymentSheet({
      clientSecret,
    });

    if (error) {
      if (error.code !== 'Canceled') {
        alert(`Error code: ${error.message}`);
        setPaymentSheetEnabled(false);
      }
    } else {
      LogEvent('TGCreatePayment_click_Confirm');
      onPaymentSuccess();
    }
  };

  const onPaymentSuccess = async () => {
    const response = await dispatch(
      discountCode({
        eventId: data.uuid,
        data: {
          data: {
            invitation_count: data.amountTest,
            entitled_product_id: 'on_go_one_test_kit',
            payment_record: {
              payment_intent_id: payments.id,
              vendor: 'stripe',
            },
          },
        },
      })
    );
    if (response?.type.includes('fulfilled')) {
      setModalVisible(true);
    }
  };

  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        setModalVisible(false);
        navigation.replace('EventInfo', { item: data });
      }, 2000);
    }
  }, [isModalVisible]);

  const handleBack = () => {
    LogEvent('TGCreatePayment_click_Back');
    navigation.goBack();
  };

  const handleClose = () => {
    LogEvent('TGCreatePayment_click_Close');
    navigation.navigate('Home');
  };

  const handleEdit = () => {
    LogEvent('TGCreatePayment_click_Edit');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <HeaderComp
          left="arrow"
          onLeftClick={handleBack}
          right={['x', handleClose]}
        />
      </View>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoHeader}>
              $
              <Text style={{ fontSize: 40 }}>
                {(Math.round(payments?.amount) / 100).toFixed(2)}
              </Text>
            </Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>
                {route.params.event.amountTest} {t('event.payment.test')}
                <Text style={styles.link} onPress={handleEdit}>
                  {' '}
                  {t('event.payment.edit')}
                </Text>
              </Text>
              {data.defaultPrice && (
                <Text style={styles.infoText}>
                  $
                  {calculateDefaultAmount({
                    defaultPrice: data.defaultPrice,
                    quantity: data.amountTest,
                  })}
                </Text>
              )}
            </View>
            {data.discountPercentage && (
              <>
                <View style={styles.line} />
                <View style={styles.infoRow}>
                  <Text style={styles.infoText}>
                    {t('event.payment.discount')} ({data.discountPercentage}%)
                  </Text>
                  <Text style={styles.infoText}>
                    $
                    {calculateDiscountAmount({
                      defaultPrice: data.defaultPrice,
                      discount: data.discountPercentage,
                      quantity: data.amountTest,
                    })}
                  </Text>
                </View>
              </>
            )}
            <View style={styles.line} />
          </View>
          <Text style={styles.paymentHeader}>
            {t('event.payment.standard')}
          </Text>
        </View>
        <BlueButton
          disabled={!paymentSheetEnabled}
          action={onPay}
          title={t('event.payment.button')}
          styleText={styles.whiteText}
          style={{ marginBottom: 30 }}
        />
      </View>
      <Modal isVisible={isModalVisible} style={{ margin: 10 }}>
        <View style={styles.modalView}>
          <View style={styles.modalCenter}>
            <View style={styles.modalIconView}>
              <CheckIcon width={67} height={67} />
            </View>
            <Text style={styles.modalText}>
              {t('event.eventsType.create.final')}
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default EventPayment;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  infoContainer: {
    alignContent: 'center',
  },
  line: {
    borderWidth: 1,
    borderColor: colors.greyLight,
    marginVertical: 12,
  },
  infoHeader: {
    fontFamily: 'Museo_700',
    fontSize: 20,
    lineHeight: 43,
    alignSelf: 'center',
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 24,
    color: colors.greyMed,
  },
  link: {
    color: colors.primaryBlue,
    fontFamily: 'Museo_700',
  },
  paymentHeader: {
    alignSelf: 'center',
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 21,
    color: colors.greyMed,
  },
  whiteText: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
  },
  modalView: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 30,
    width: '100%',
    height: hp('100%'),
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCenter: {
    alignItems: 'center',
  },
  modalText: {
    marginTop: 20,
    fontFamily: 'Museo_500',
    fontSize: 20,
    lineHeight: 34,
  },
  modalIconView: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    shadowColor: '#666666',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    elevation: 5,
  },
});
