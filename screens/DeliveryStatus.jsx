/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, Image, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../theme';
import CloseIcon from '../components/Svg/close';
import { fonts } from '../theme/fonts';
import { BlueButton } from '../components/Buttons/BlueButton';
import StatusIndicator from '../components/StatusIndicator';
import DeliveryRoute from '../components/DeliveryRoute';
import { getDeliveryJobById } from '../store/user/slice';
import { getDisplayedDeliveryStatus } from '../utilis/helpers';
import { LogEvent } from '../analytics';
import { setShowReviewScreen } from '../store/app/slice';

const medicationPlaceholder = require('../assets/medicationPlaceholder.png');

const translationPath = 'paxlovid.deliveryStatus';
const analyticName = 'Presciptions_DeliveryTrack';

const STATUS_COMPLETE = 'delivered';

const DeliveryStatus = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: { userId, deliveryData, deliveryId, showPopupOnClose },
  } = useRoute();

  const phoneNumber = useSelector(
    ({
      app: {
        firebase: { deliverySupportPhone },
      },
    }) => deliverySupportPhone
  );

  const [{ id: deliveryJobId, status, ...deliveryJobInfo }, setDeliveryInfo] = useState(
    deliveryData || { id: deliveryId, status: 'pending' }
  );

  const isCompleted = status === STATUS_COMPLETE;

  const showFeedbackPopup = () => {
    if (showPopupOnClose) {
      const popupType =
        deliveryJobInfo?.prescriptions[0].product_name === 'paxlovid'
          ? 'paxlovidMedication'
          : 'snifflesMedication';

      dispatch(setShowReviewScreen(popupType));
    }
  };

  const handleRightClick = () => {
    LogEvent(`${analyticName}_click_Close`);
    navigation.goBack();
    showFeedbackPopup();
  };

  const onPressContactUs = () => Linking.openURL(`tel:${phoneNumber}`);

  const refreshDeliveryInfo = useCallback(async () => {
    if (userId && deliveryJobId) {
      LogEvent(`${analyticName}_click_Update`);
      dispatch(getDeliveryJobById({ userId, deliveryJobId }))
        .unwrap()
        .then((payload) => setDeliveryInfo(payload));
    }
  }, [deliveryJobId, dispatch, userId]);

  useEffect(() => {
    refreshDeliveryInfo();
  }, [refreshDeliveryInfo]);

  useEffect(() => {
    LogEvent(`${analyticName}_screen`);
  }, []);

  const renderHeader = () => (
    <View style={styles.row}>
      <Text style={styles.headerTitle}>{t(`${translationPath}.headerTitle`)}</Text>
      <TouchableOpacity style={styles.closeContainer} onPress={handleRightClick}>
        <CloseIcon width={14} height={14} />
      </TouchableOpacity>
    </View>
  );

  const renderStatus = () => (
    <View style={[styles.row, styles.statusContainer]}>
      <Text style={styles.statusTitle}>{t(`${translationPath}.deliveryStatus`)}</Text>
      <StatusIndicator
        color={isCompleted && colors.statusGreen}
        title={getDisplayedDeliveryStatus(status)}
      />
      {/* add optional color and title to indicator */}
    </View>
  );

  const renderDeliveryInfo = () => (
    <DeliveryRoute
      isCompleted={isCompleted}
      containerStyle={styles.deliveryContainer}
      deliveryInfo={{ ...deliveryJobInfo, status }}
    />
  );

  const renderOrderItems = () => (
    <View style={styles.orderItemsContainer}>
      <Text style={styles.statusTitle}>{t(`${translationPath}.orderTitle`)}</Text>
      {deliveryJobInfo?.prescriptions &&
        deliveryJobInfo.prescriptions.map((prescription) => (
          <View style={styles.orderItemContainer}>
            <View style={styles.orderInfo}>
              <Image source={medicationPlaceholder} style={styles.orderItemImage} />
              <View style={styles.orderInfoContainer}>
                <Text style={styles.orderNameTitle}>{t(`${translationPath}.drugName`)}</Text>
                <Text style={styles.orderNameText}>{prescription.product_name}</Text>
              </View>
            </View>
          </View>
        ))}
    </View>
  );

  const renderContactUs = () => (
    <Text style={styles.contactUsText}>
      {t(`${translationPath}.hint1`)}
      <Text style={{ color: colors.primaryBlue }} onPress={onPressContactUs}>
        {' '}
        {phoneNumber}{' '}
      </Text>
      {t(`${translationPath}.hint2`)}
    </Text>
  );

  const renderButton = () => (
    <BlueButton
      style={styles.button}
      action={refreshDeliveryInfo}
      styleText={styles.buttonText}
      title={t(`${translationPath}.buttonTitle`)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderStatus()}
        {renderDeliveryInfo()}
        {renderOrderItems()}
        {renderContactUs()}
        {renderButton()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 25,
    paddingTop: 15,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  closeContainer: {
    paddingLeft: 10,
    paddingRight: 5,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeExtraLarge,
  },
  statusContainer: {
    marginTop: 16,
  },
  statusTitle: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
  },
  deliveryContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGrey,
    marginTop: 30,
  },
  orderItemImage: {
    height: 40,
    width: 40,
  },
  orderItemsContainer: {
    paddingTop: 20,
    paddingBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGrey,
  },
  orderItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 5,
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderInfoContainer: {
    marginLeft: 17,
  },
  orderNameTitle: {
    color: colors.greyGrey,
    lineHeight: 20,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
  },
  orderNameText: {
    color: colors.greyMidnight,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeExtraLarge,
  },
  contactUsText: {
    marginTop: 32,
    textAlign: 'center',
    fontFamily: fonts.familyLight,
    color: colors.greyMed,
    fontSize: fonts.sizeSmall,
  },
  button: {
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
    textAlign: 'center',
  },
});
