import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Timeslot from '../../components/Timeslot';
import { BlueButton } from '../../components/Buttons/BlueButton';
import CloseIcon from '../../components/Svg/close';
import { colors } from '../../theme';
import { fonts } from '../../theme/fonts';
import { rescheduleSniffleAppointment } from '../../store/sniffles/slice';
import HeaderComp from '../../components/HeaderComp';
import { formats, iso8601ToFormatted } from '../../utilis/dateTime';

const translationPrefix = 'screens.appointmentDetails';

const RescheduleAppointment = () => {
  const { t } = useTranslation();
  const { goBack, reset } = useNavigation();
  const dispatch = useDispatch();
  const {
    appointment: {
      user_id: userId,
      id: appointmentId,
      location: { zipcode: locationZipcode },
    },
  } = useRoute().params;
  const { freeDates } = useSelector(({ sniffles }) => sniffles);

  useEffect(() => {
    if (freeDates.length) {
      setSelectedDay(iso8601ToFormatted(freeDates[0].datetime, formats.iso8601));
    }
  }, [freeDates]);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const onDayPress = (day) => {
    setSelectedDay(day);
    setSelectedTime(null);
  };

  const handleClose = () => {
    reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  };

  const rescheduleAppointment = () => {
    const { id } = freeDates.find((item) => item.datetime === selectedTime);
    dispatch(
      rescheduleSniffleAppointment({
        userId,
        appointmentId,
        data: {
          data: {
            scheduled_time: selectedTime,
            scheduled_time_slot_id: id,
          },
        },
      })
    )
      .unwrap()
      .then(goBack);
  };

  const showConfirmationAlert = () => {
    Alert.alert(
      t(`${translationPrefix}.rescheduleAlert.title`),
      t(`${translationPrefix}.rescheduleAlert.subtitle`, {
        date: iso8601ToFormatted(selectedTime, formats.longDateWithTimeAndFullMonth),
      }),
      [{ text: 'No' }, { text: 'Yes', onPress: rescheduleAppointment }]
    );
  };

  const onPressConfirm = () => {
    if (selectedTime) return showConfirmationAlert();

    return goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComp
        right={[<CloseIcon width={14} height={14} />, handleClose]}
        onLeftClick={goBack}
        left='arrow'
        addStyle={styles.profileHeader}
      />
      <Text style={styles.title}>{t(`${translationPrefix}.rescheduleTitle`)}</Text>
      <Timeslot
        location={locationZipcode} // replace with actual zipcode (US only)
        timeslots={freeDates}
        onDayPress={onDayPress}
        selectedDay={selectedDay}
        selectedTime={selectedTime}
        isLoading={!freeDates.length}
        onTimePress={setSelectedTime}
      />
      <BlueButton
        title={t(`${translationPrefix}.rescheduleButton`)}
        disabled={!selectedDay || !selectedTime}
        action={onPressConfirm}
        style={{ marginBottom: 16, marginTop: 16 }}
      />
    </SafeAreaView>
  );
};

export default RescheduleAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: colors.primaryGhost,
  },
  title: {
    fontFamily: fonts.familyBold,
    fontSize: 24,
    lineHeight: 36,
  },
});
