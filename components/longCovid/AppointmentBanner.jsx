import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { LogEvent } from '../../analytics';
import { colors } from '../../theme';
import { fonts } from '../../theme/fonts';
import { joinLiveSessionThunk } from '../../store/user/slice';
import { iso8601ToDateLongFull, iso8601ToDate } from '../../utilis/dateTime';
import { setZoomSession } from '../../store/app/slice';
import ClockSvg from '../Svg/Clock';
import ArrowRight from '../Svg/arrowRightIcon';

const FIVE_MINUTES_IN_MILLISECOND = 300000;

const translationPath = 'screens.home.banner';

const AppointmentBanner = ({ appointment = null, appointmentRequest = {} }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { usersLookup } = useSelector((s) => s.user);

  const [lessThen5Minutes, setLessThen5Minutes] = useState(false);

  const user = appointment
    ? usersLookup[appointment?.user_id]
    : usersLookup[appointmentRequest?.user_id];

  const userName = `${user?.first_name} ${user?.last_name}`;
  const purpose =
    appointment?.live_session?.data?.session_purpose || // Sniffles telehealth
    appointment?.purpose || // Sniffles getlabs appointment
    appointmentRequest?.purpose; // Sniffles/long covid appointment requests

  let analyticName = '';
  if (purpose === 'sniffles_consultation') analyticName = 'Sniffles_Virtual_';
  if (purpose === 'sniffles_observation') analyticName = 'Sniffles_POC_';

  useEffect(() => {
    if (appointment && (purpose === 'consultation' || purpose === 'sniffles_consultation')) {
      const timeNow = Date.now();
      const appoimentTime = iso8601ToDate(appointment.scheduled_time).getTime();
      setLessThen5Minutes(appoimentTime - timeNow < FIVE_MINUTES_IN_MILLISECOND);
      const timeToStart = appoimentTime - FIVE_MINUTES_IN_MILLISECOND - timeNow;
      const delayTimer = setTimeout(() => setLessThen5Minutes(true), timeToStart);
      return () => {
        clearTimeout(delayTimer);
      };
    }
    return () => {};
  }, [appointment, purpose]);

  const onPressAppointmentDetails = useCallback(
    () =>
      navigation.navigate('AppointmentDetails', {
        appointment,
        userId: appointment?.user_id,
        purpose,
      }),
    [navigation, appointment, purpose]
  );

  const getTitle = () => {
    if (purpose === 'sniffles_observation') {
      return t(`${translationPath}.type.testing`);
    }
    return t(`${translationPath}.type.virtual`);
  };

  const getTime = () => {
    if (appointment) {
      if (lessThen5Minutes) {
        return t(`${translationPath}.time.now`);
      }
      return iso8601ToDateLongFull(appointment?.scheduled_time);
    }
    return t(`${translationPath}.time.pending`);
  };

  const onAppointmentPress = () => {
    onPressAppointmentDetails();
  };

  const onPressGetStarted = () => {
    if (!lessThen5Minutes) return;
    LogEvent(`${analyticName}HomeBanner_Click_Start`);
    dispatch(
      joinLiveSessionThunk({
        userId: appointment?.user_id,
        sessionId: appointment?.live_session?.data?.id,
      })
    )
      .unwrap()
      .then(async (result) => {
        const zoomRoom = result.live_session_users[0].meta.room;
        const { meeting_number: meetingId, password, signature: jwt } = zoomRoom;
        dispatch(
          setZoomSession({
            meetingId,
            password,
            jwt,
            userName,
            appointmentId: appointment?.id,
            purpose,
          })
        );
      });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onAppointmentPress}>
      <View style={styles.row}>
        <ClockSvg />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{getTitle()}</Text>
          <Text style={appointment ? styles.subtitle : styles.subtitleItalic}>{getTime()}</Text>
        </View>
        <ArrowRight color={colors.white} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 24,
    marginTop: 20,
    borderWidth: 0,
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.statusGreen,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  closeContainer: {
    marginTop: 5,
  },
  title: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    lineHeight: 16,
    color: colors.white,
  },
  titleName: {
    fontFamily: fonts.familyNormal,
    fontSize: 16,
  },
  subtitle: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeSmall,
    lineHeight: 14,
    color: colors.white,
  },
  subtitleItalic: {
    fontFamily: 'Museo_500_Italic',
    fontSize: fonts.sizeSmall,
    lineHeight: 14,
    color: colors.white,
  },
  subtitlePrimary: {
    fontFamily: fonts.familyNormal,
    fontSize: 14,
    lineHeight: 16,
    marginVertical: 7,
    marginBottom: 19,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
  },
  actionWrapper: {
    alignSelf: 'flex-start',
    flex: 1,
  },
  actionContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  getStartedContainer: {
    paddingVertical: 12.5,
    paddingHorizontal: 22.5,
    borderRadius: 14,
    marginRight: 16,
    backgroundColor: colors.greyWhite,
  },
  getHelp: {
    fontFamily: fonts.familyBold,
    fontSize: 14,
    lineHeight: 17,
    color: colors.primaryBlue,
  },
  getStarted: {
    fontFamily: fonts.familyBold,
    fontSize: 14,
    lineHeight: 19,
    color: colors.greyMidnight,
  },
  scheduleLater: {
    fontFamily: fonts.familyNormal,
    fontSize: 14,
    lineHeight: 19,
    color: colors.primaryBlue,
  },
  icon: {
    marginRight: 10,
  },
  detailsButton: {
    fontFamily: fonts.familyBold,
    color: colors.primaryBlue,
  },
});

export default AppointmentBanner;
