import { useNavigation } from '@react-navigation/native';
import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { BlueButton } from '../../components/Buttons/BlueButton';
import HeaderComp from '../../components/HeaderComp';
import LocationForm from '../../components/LocationForm';
import { getTimeSlots } from '../../store/sniffles/slice';
import { colors } from '../../theme';
import { fonts } from '../../theme/fonts';
import CloseIcon from '../../components/Svg/close';
import CompletedScreen from '../../components/CompletedScreen';
import AppIconSvgWithTick from '../../components/Svg/AppIconSvgTick';

import { LogEvent } from '../../analytics';
import WarningScreen from '../../components/WarningScreen';
import { openLink } from '../../utilis/link';

const translationPath = 'screens.sniffles.checkLocationAvailability';

const CheckAvailability = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { usersLookup, users } = useSelector(({ user }) => user);
  const userCurrentLocation = users[0] ? usersLookup[users[0]].location : {};
  const [isCompletedModalVisible, setIsCompletedModalVisible] = useState(false);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);

  const [location, setLocation] = useState({
    address_1: userCurrentLocation.address_1 || '',
    address_2: userCurrentLocation.address_2 || '',
    city: userCurrentLocation.city || '',
    state_id: userCurrentLocation.state || '',
    zipcode: userCurrentLocation.zipcode || '',
  });

  useEffect(() => {
    LogEvent(`Sniffles_POC_CheckAvail_screen`);
  }, []);

  const onExit = () => {
    LogEvent('Sniffles_POC_CheckAvail_click_Close');
    navigation.goBack();
  };

  const onBack = () => {
    LogEvent('Sniffles_POC_CheckAvail_click_Back');
    navigation.goBack();
  };

  const timerRef = useRef(null);

  const checkRestrictedStates = () => {
    if (location.state_id === 'CA') {
      setIsWarningModalVisible(true);
    } else {
      setIsCompletedModalVisible(true);
      timerRef.current = setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }
  };

  const onSuccessGettingSlots = (hasAvailableSlots) => {
    if (hasAvailableSlots) {
      checkRestrictedStates();
    } else {
      navigation.navigate('CareOptionsContainer', {
        careOptionsType: 'sniffles_poc_no_availability',
        translationsPath: 'templates.timeslotsNoAvailability',
        analyticsName: 'Sniffles_POC',
      });
    }
  };

  const onPressNext = () => {
    LogEvent('Sniffles_POC_CheckAvail_click_Next');
    dispatch(
      getTimeSlots({
        userId: users[0],
        usersLocation: {
          address1: location.address_1,
          address2: location.address_2,
          city: location.city,
          state: location.state_id,
          zipcode: location.zipcode,
        },
      })
    )
      .unwrap()
      .then((slots) => onSuccessGettingSlots(!!slots.length));
  };

  const onCloseSuccessModal = () => {
    navigation.goBack();
    clearTimeout(timerRef.current);
  };

  const onCloseWarningModal = () => {
    navigation.goBack();
  };

  const onLinkPress = () => {
    openLink(navigation, false, {
      url: 'https://www.fda.gov/media/145696/download',
      useWebView: true,
    });
    setIsWarningModalVisible(false);
  };

  if (isWarningModalVisible) {
    return (
      <WarningScreen
        whiteButtonTitle={t(`${translationPath}.warning.button`)}
        onWhiteButtonPress={onCloseWarningModal}
        onBack={onCloseWarningModal}
        warningColor={colors.primaryBlue}
        title={t(`${translationPath}.warning.title`)}
        descr={t(`${translationPath}.warning.desc`)}
        linkTitle={t(`${translationPath}.warning.linkName`)}
        onLinkPress={onLinkPress}
      />
    );
  }

  if (isCompletedModalVisible) {
    return (
      <CompletedScreen
        visible
        result={2}
        background
        onClose={() => {
          LogEvent('Sniffles_POC_AvailConf_click_Close');
          onCloseSuccessModal();
        }}
        SvgComponent={AppIconSvgWithTick}
        title={t(`${translationPath}.successMessage`)}
        analyticName='Sniffles_POC_AvailConf'
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ ...styles.content, flexGrow: 1 }}
          keyboardShouldPersistTaps='handled'
        >
          <HeaderComp
            left='arrow'
            onLeftClick={onBack}
            addStyle={styles.header}
            right={[<CloseIcon width={14} height={14} />, onExit]}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{t(`${translationPath}.title`)}</Text>
            <Text style={styles.subtitle}>{t(`${translationPath}.subtitle`)}</Text>
            <LocationForm data={location} setData={setLocation} />
          </View>

          <BlueButton
            title='Next'
            action={onPressNext}
            style={styles.button}
            disabled={
              !location.address_1 || !location.city || !location.state_id || !location.zipcode
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: fonts.familyBold,
    fontSize: 24,
    lineHeight: 36,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.familyLight,
    fontSize: fonts.sizeNormal,
    lineHeight: 19.5,
    color: colors.greyDark2,
  },
  button: {
    marginVertical: 24,
  },
});

export default CheckAvailability;
