import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { BlueButton } from '../../../components/Buttons/BlueButton';
import { getTimeSlots, snifflesFieldNames } from '../../../store/sniffles/slice';
import Timeslot from '../../../components/Timeslot';
import { formats, iso8601ToFormatted } from '../../../utilis/dateTime';
import { colors } from '../../../theme';
import WarningScreen from '../../../components/WarningScreen';

const warningTranslationPath = 'screens.sniffles.questions.location';

const Scheduling = ({ onChangeState, userLocation, onBack }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { freeDates: timeslots, userId } = useSelector(({ sniffles }) => sniffles);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(!timeslots.length);

  const [warningVisible, setWarningVisible] = useState(false);

  useEffect(() => {
    if (timeslots.length) {
      setSelectedDay(iso8601ToFormatted(timeslots[0].datetime, formats.iso8601));
    }
  }, [timeslots]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getTimeSlots({
        userId,
      })
    )
      .unwrap()
      .then(({ slots, warning }) => {
        if (slots.length === 0) {
          navigation.push('CareOptionsContainer', {
            careOptionsType: 'sniffles_poc_no_availability',
            translationsPath: 'templates.timeslotsNoAvailability',
            analyticsName: 'Sniffles_POC_ComingSoon',
            type: 'Elimination',
          });
        } else if (warning) {
          setWarningVisible(true);
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch, navigation, timeslots.length, userId, userLocation.state_id]);

  const onDayPress = (day) => {
    setSelectedDay(day);
    setSelectedTime(null);
  };

  const onTimePress = (time) => {
    setSelectedTime(time);
  };

  const onNextPress = () => {
    const { id } = timeslots.find((item) => item.datetime === selectedTime);
    onChangeState({ date: selectedTime, id }, snifflesFieldNames.SELECTED_DATE, true);
  };

  const onPressModalButton = () => {
    setWarningVisible(false);
  };

  const onPressModalClose = () => {
    navigation.navigate('Home');
  };

  const onPressModalAdditionalButton = () => {
    navigation.navigate('CareOptionsContainer', {
      careOptionsType: 'sniffles_poc_limited',
      translationsPath: 'templates.californiaCareOptions',
      analyticsName: 'Sniffles_POC',
      type: 'Other',
    });
    setWarningVisible(false);
  };

  const onPressBackModal = () => {
    onBack();
    setWarningVisible(false);
  };

  const onLinkPress = () => {
    navigation.navigate('FilePreview', {
      media: { uri: 'https://www.fda.gov/media/145696/download' },
      header: ' ',
      onGoBack: () => setWarningVisible(true),
    });
    setWarningVisible(false);
  };

  if (warningVisible) {
    return (
      <WarningScreen
        warningColor={colors.primaryBlue}
        onClose={onPressModalClose}
        onBack={onPressBackModal}
        blueButtonTitle={t(`${warningTranslationPath}.warningButtonRight`)}
        onBlueButtonPress={onPressModalButton}
        whiteButtonTitle={t(`${warningTranslationPath}.warningButtonLeft`)}
        onWhiteButtonPress={onPressModalAdditionalButton}
        title={t(`${warningTranslationPath}.warningTitle`)}
        descr={t(`${warningTranslationPath}.warningDescription`)}
        question={t(`${warningTranslationPath}.warningQuestion`)}
        onLinkPress={onLinkPress}
        linkTitle={t(`${warningTranslationPath}.linkName`)}
        linkStyle={{ marginBottom: 15 }}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Timeslot
        timeslots={timeslots}
        isLoading={loading}
        location={userLocation?.zipcode}
        selectedDay={selectedDay}
        selectedTime={selectedTime}
        onDayPress={onDayPress}
        onTimePress={onTimePress}
        analyticsName='Sniffles_POC'
      />
      <BlueButton
        title='Next'
        disabled={!selectedDay || !selectedTime}
        action={onNextPress}
        style={{ marginTop: 16 }}
      />
    </View>
  );
};

export default Scheduling;
