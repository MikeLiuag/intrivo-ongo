import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Tooltip } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import CompletedScreen from '../components/CompletedScreen';
import Icon from '../components/Icon';
import InputLeftLabel from '../components/InputLeftLabel';
import PickerDropdown from '../components/Picker';
import { createDeliveryJob } from '../store/user/slice';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import { iso8601ToFormatted, formats } from '../utilis/dateTime';
import { states } from '../utilis/mock';
import CheckedIcon from '../assets/svgs/checkbox_blue.svg';
import { LogEvent } from '../analytics';
import { dimensions } from '../theme/dimensions';
import { BlueButton } from '../components/Buttons/BlueButton';
import ScreenWrapper from './ScreenWrapper';
import { resetTimeline } from '../utilis/navigationHelper';
import GooglePlacesInput from '../components/GooglePlacesInput';

const initialState = {
  address1: '',
  address2: '',
  city: '',
  stateId: '',
  zipcode: '',
};

const translationPath = 'paxlovid.scheduleDelivery';

const ScheduleDelivery = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    params: { userId, pharmacy, prescriptions, analyticName = '' },
  } = route;
  const { usersLookup } = useSelector(({ user }) => user);
  const currentUser = usersLookup[userId];

  const [deliveryData, setDeliveryData] = useState(initialState);
  const [deliveryId, setDeliveryId] = useState();
  const { address1, address2, city, stateId, zipcode } = deliveryData;

  const isFormValid = address1 && city && stateId && zipcode;
  const [isCompletedModalVisible, setIsCompletedModalVisible] = useState(false);
  const [isConfirmedWithPharmacy, setIsConfirmedWithPharmacy] = useState(false);

  useEffect(() => {
    if (analyticName) {
      LogEvent(`${analyticName}_screen`);
    }
  }, [analyticName]);

  const onChangeData = (fieldName, value) =>
    setDeliveryData((prevState) => ({ ...prevState, [fieldName]: value }));

  const onModalClose = () => {
    setIsCompletedModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [
        { name: 'Dashboard' },
        {
          name: 'DeliveryStatus',
          params: {
            userId,
            deliveryId: deliveryId?.uuid,
            showPopupOnClose: true,
          },
        },
      ],
    });
  };

  const onSuccessSchedule = () => {
    setIsCompletedModalVisible(true);
  };

  const onPressSchedule = async () => {
    LogEvent(`${analyticName}_click_Schedule`);
    dispatch(
      createDeliveryJob({
        userId,
        pickUpLocation: {
          ...pharmacy?.location,
          phone_number: pharmacy?.phone_number,
          name: pharmacy?.name,
        },
        dropOffLocation: deliveryData,
        prescriptions: prescriptions?.map((r) => ({ id: r?.id, product_type: 'prescription' })),
      })
    )
      .unwrap()
      .then((result) => {
        setDeliveryId(result);
        onSuccessSchedule(result.payload);
      });
  };

  const onPressCheckbox = useCallback(() => {
    setIsConfirmedWithPharmacy((prevState) => {
      if (prevState) setDeliveryData(initialState);

      return !prevState;
    });
  }, [setIsConfirmedWithPharmacy]);

  const onExitFromPaxFlow = () => {
    LogEvent(`${analyticName}_click_Close`);
    resetTimeline(navigation);
  };

  const onBack = () => {
    LogEvent(`${analyticName}_click_Back`);
    navigation.goBack();
  };

  const renderUserInfo = () => (
    <View style={styles.userInfoContainer}>
      <View>
        <Text style={styles.userInfoText}>{t('paxlovid.eligibility.userInfo.patientInfo')}</Text>
        <Text style={styles.userInfoLabel}>
          {t(`${translationPath}.name`)}:{' '}
          <Text style={styles.userInfo}>{currentUser?.fullName || ''}</Text>
        </Text>
        <Text style={styles.userInfoLabel}>
          {t(`${translationPath}.birthday`)}:{' '}
          <Text style={styles.userInfo}>
            {iso8601ToFormatted(currentUser?.dob, formats.fullLongDate) || ''}
          </Text>
        </Text>
        <Text style={styles.userInfoLabel}>
          {t(`${translationPath}.phoneNumber`)}:{' '}
          <Text style={styles.userInfo}>{currentUser?.phone?.number || ''}</Text>
        </Text>
      </View>
      <Tooltip
        height={85}
        width={157}
        withOverlay={false}
        backgroundColor={colors.greyDark2}
        containerStyle={{ borderRadius: 5 }}
        popover={<Text style={styles.tooltipText}>{t(`${translationPath}.hint`)}</Text>}
      >
        <Icon type='MaterialIcons' name='info' size={20} color={colors.primaryBlue} />
      </Tooltip>
    </View>
  );

  const renderInputForm = () => {
    const statePickerBackgroundColor = isConfirmedWithPharmacy
      ? colors.white
      : colors.secondaryButtonBorder;

    return (
      <View style={styles.inputFormContainer}>
        <Text style={styles.addressInfoLabel}>{t(`${translationPath}.addressInfo`)}</Text>
        {/* <InputLeftLabel
          value={address1}
          editable={isConfirmedWithPharmacy}
          placeholder={t('placeholder.address1')}
          action={(value) => onChangeData('address1', value)}
        /> */}
        <GooglePlacesInput
          placeholder={t('placeholder.address1')}
          value={address1 || ''}
          action={(value) => {
            const data = {
              address1: value.address_1,
              address2: value.address_2,
              stateId: value.state_id,
              zipcode,
              city,
            };
            setDeliveryData((current) => ({
              ...current,
              ...data,
            }));
          }}
        />
        <InputLeftLabel
          value={address2}
          editable={isConfirmedWithPharmacy}
          placeholder={t('placeholder.addredd2Optional')}
          action={(value) => onChangeData('address2', value)}
        />
        <InputLeftLabel
          value={city}
          editable={isConfirmedWithPharmacy}
          placeholder={t('placeholder.city')}
          action={(value) => onChangeData('city', value)}
        />
        <PickerDropdown
          items={states}
          disabled={!isConfirmedWithPharmacy}
          value={stateId}
          placeholder={t('placeholder.state')}
          onChange={(value) => onChangeData('stateId', value)}
          style={[styles.statePicker, { backgroundColor: statePickerBackgroundColor }]}
        />
        <InputLeftLabel
          maxLength={5}
          value={zipcode}
          keyboardType='numeric'
          editable={isConfirmedWithPharmacy}
          placeholder={t('placeholder.zipCodeOnly')}
          action={(value) => onChangeData('zipcode', value)}
        />
      </View>
    );
  };

  const renderCheckbox = () => (
    <View style={styles.pharmacyConfirmationContainer}>
      <Text style={styles.checkboxQuestion}>{t(`screens.scheduleDelivery.checkboxQuestion`)}</Text>
      {prescriptions?.length > 0
        ? prescriptions.map((r) => <Text style={styles.checkboxQuestion}> • {r?.name}: </Text>)
        : null}
      <TouchableOpacity style={styles.checkboxContainer} onPress={onPressCheckbox}>
        <View style={styles.unchekedIcon}>{isConfirmedWithPharmacy && <CheckedIcon />}</View>
        <Text style={styles.checkboxLabel}>{t(`${translationPath}.checkboxLabel`)}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSubHeader = () => (
    <Text style={styles.title}>
      {!isConfirmedWithPharmacy
        ? t('screens.medicationFlow.prescription.subtitle.0')
        : t('screens.medicationFlow.prescription.subtitle.1')}
    </Text>
  );

  return (
    <ScreenWrapper
      buttonDisabled={!isFormValid}
      buttonTitle={t(`${translationPath}.schedule`)}
      headerTitle={t(`${translationPath}.headerTitle`)}
      onPressButton={onPressSchedule}
      onExit={onExitFromPaxFlow}
      onBack={onBack}
      title={t('paxlovid.scheduleDelivery.headerTitle')}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='always'
        >
          {renderSubHeader()}
          {renderCheckbox()}
          {renderUserInfo()}
          {renderInputForm()}
        </ScrollView>
        <BlueButton
          style={styles.bottomButton}
          title='Next'
          disabled={!isFormValid}
          action={onPressSchedule}
        />
      </KeyboardAvoidingView>
      {isCompletedModalVisible && (
        <CompletedScreen
          visible={isCompletedModalVisible}
          title={t(`${translationPath}.successMessageTitle`)}
          animated
          result={2}
          background
          onClose={onModalClose}
        />
      )}
    </ScreenWrapper>
  );
};

export default ScheduleDelivery;

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    marginHorizontal: dimensions.pageMarginHorizontal,
  },
  inputFormContainer: {
    marginTop: 24,
    marginBottom: 35,
  },
  userInfoLabel: {
    fontFamily: fonts.familyBold,
    color: colors.greyDark,
    lineHeight: 22,
  },
  userInfo: {
    fontFamily: fonts.familyLight,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tooltipText: {
    fontFamily: fonts.familyNormal,
    color: colors.greyWhite,
    fontSize: fonts.sizeSmall,
    textAlign: 'center',
  },
  statePicker: {
    marginVertical: 10,
  },
  pharmacyConfirmationContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.orangeOpacity,
    borderWidth: 1,
    borderColor: colors.statusOrange,
    marginBottom: 23,
    borderRadius: 10,
  },
  checkboxQuestion: {
    fontFamily: fonts.familyLight,
    color: colors.greyDark3,
    fontSize: fonts.sizeSmall,
    lineHeight: 21,
  },
  checkboxLabel: {
    fontSize: fonts.sizeSmall,
    fontFamily: fonts.familyBold,
    color: colors.greyDark3,
    lineHeight: 21,
    marginLeft: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  unchekedIcon: {
    width: 21,
    height: 21,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.secondaryButtonBorder,
  },
  title: {
    fontFamily: fonts.familyBold,
    color: colors.black,
    fontSize: 24,
    lineHeight: 36,
    marginBottom: 22,
  },
  userInfoText: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyDark2,
    marginBottom: 20,
  },
  addressInfoLabel: {
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyLight,
    color: colors.greyDark2,
    marginBottom: 10,
  },
  bottomButton: {
    marginHorizontal: dimensions.pageMarginHorizontal,
    marginVertical: 20,
  },
});
