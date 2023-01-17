import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { LogEvent } from '../../analytics';
import HeaderComp from '../../components/HeaderComp';
import CalendarIcon from '../../components/Svg/calendarIcon';
import {
  cancelSniffleAppointment,
  getAppointmentById,
  getTimeSlots,
} from '../../store/sniffles/slice';
import { colors } from '../../theme';
import { fonts } from '../../theme/fonts';
import {
  formats,
  isLessThan24HoursToDate,
  iso8601ToFormatted,
  getDifferenceInYears,
  iso8601ToDate,
} from '../../utilis/dateTime';
import CloseIcon from '../../components/Svg/close';
import AppointmentSvg from '../../components/Svg/AppointmentSvg';
import { checkUserAppointmentStatus, joinLiveSessionThunk } from '../../store/user/slice';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { setZoomSession } from '../../store/app/slice';

const FIVE_MINUTES_IN_MILLISECOND = 300000;
const translationPath = 'screens.appointmentDetails';

const AppointmentDetails = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { goBack, navigate, reset } = useNavigation();
  const { params } = useRoute();

  const [showMenu, setShowMenu] = useState(false);

  const contactPhoneNumber = useSelector(
    ({
      app: {
        firebase: { deliverySupportPhone },
      },
    }) => deliverySupportPhone
  );
  const pendingPhoneNumber = '(401) 313-4836';

  const { users, usersLookup } = useSelector(({ user }) => user);
  const userId = params.userId || users[0];

  const [appointment, setAppointment] = useState(params?.appointment);

  const scheduledAt = appointment?.scheduled_time;
  const isCancelationAllowed =
    scheduledAt && params?.purpose !== 'sniffles_consultation'
      ? !isLessThan24HoursToDate(scheduledAt)
      : true;
  const { fullName, dob } = usersLookup[userId];

  const age = dob && getDifferenceInYears(dob);
  const timeNow = Date.now();
  const appoimentTime = appointment && iso8601ToDate(appointment?.scheduled_time).getTime();
  const lessThen5Minutes = appoimentTime - timeNow < FIVE_MINUTES_IN_MILLISECOND;

  const updateAppointment = useCallback(() => {
    if (params?.appointment && userId) {
      dispatch(
        getAppointmentById({ appointmentId: params?.appointmentId || appointment?.id, userId })
      )
        .unwrap()
        .then(setAppointment);
    }
  }, [params?.appointment, params?.appointmentId, userId, dispatch, appointment?.id]);

  useFocusEffect(
    useCallback(() => {
      LogEvent('Sniffles_POC_ApptDetails_screen');
      updateAppointment();
    }, [updateAppointment])
  );

  const getTestingOptionValue = () => {
    if (params?.purpose === 'sniffles_consultation') {
      return 'Virtual consult with a medical expert';
    }
    if (appointment?.location?.state === 'CA') {
      return age > 18
        ? t(`${translationPath}.testingAdultCaliforniaOptions`)
        : t(`${translationPath}.testingMinorCaliforniaOptions`);
    }
    return t(`${translationPath}.testingAdultNonCaliforniaOptions`);
  };

  const appointmentData =
    params?.purpose === 'sniffles_observation'
      ? {
          title: t(`${translationPath}.forAppointment`),
          values: [
            t(`${translationPath}.appointmentInfo.1`),
            t(`${translationPath}.appointmentInfo.2`),
            t(`${translationPath}.appointmentInfo.3`),
          ],
        }
      : {
          title: t(`${translationPath}.forAppointment`),
          values: [
            t(`${translationPath}.appointmentVirtualInfo.1`),
            t(`${translationPath}.appointmentVirtualInfo.2`),
          ],
        };

  const onPressReschedule = () => {
    LogEvent('Sniffles_POC_ApptDetails_click_Res');
    dispatch(
      getTimeSlots({
        userId,
        usersLocation: {
          address1: appointment?.location?.address_1,
          address2: appointment?.location?.address_2 || '',
          city: appointment?.location?.city,
          state: appointment?.location?.state,
          zipcode: appointment?.location?.zipcode,
        },
      })
    );

    navigate('RescheduleAppointment', { appointment: { ...appointment, user_id: userId } });
  };

  const onEdit = () => {
    setShowMenu(true);
  };

  const onConfirmCancel = () => {
    dispatch(
      cancelSniffleAppointment({
        userId: params.userId,
        appointmentId: appointment.id,
      })
    )
      .unwrap()
      .then(() => {
        goBack();
        dispatch(checkUserAppointmentStatus({ userId: params.userId }));
      });
  };

  const onPressCancel = () => {
    LogEvent('Sniffles_POC_ApptDetails_click_Cancel');
    Alert.alert(
      t(`${translationPath}.cancelAlert.title`),
      t(`${translationPath}.cancelAlert.subtitle`),
      [{ text: 'No' }, { text: 'Yes, cancel', onPress: onConfirmCancel }]
    );
  };

  const onStartAppointment = () => {
    if (!lessThen5Minutes) return;
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
            userName: fullName,
            appointmentId: appointment?.id,
            purpose: params?.purpose,
          })
        );
      });
  };

  const onPressPhoneNumber = () =>
    Linking.openURL(`tel: ${appointment ? contactPhoneNumber : pendingPhoneNumber}`);

  const renderList = ({ title, values }) => (
    <View style={styles.listContainer}>
      <Text style={styles.bannerTitle}>{title}</Text>
      {values.map((value) => (
        <Text style={styles.listText} key={value}>
          • {value}
        </Text>
      ))}
    </View>
  );

  const renderContactInfo = () => (
    <Text
      style={[styles.listText, { fontSize: fonts.sizeSmall, marginTop: 30, textAlign: 'center' }]}
    >
      {t(`${translationPath}.contactInfo`)}
      <Text onPress={onPressPhoneNumber} style={{ color: colors.primaryBlue }}>
        {contactPhoneNumber}
      </Text>{' '}
      (ext. 5)
    </Text>
  );

  const renderMenu = () => (
    <Modal isVisible={showMenu} style={{ margin: 0 }} onBackdropPress={() => setShowMenu(false)}>
      <View style={styles.menuModal}>
        {params?.purpose === 'sniffles_observation' && (
          <TouchableOpacity
            onPress={() => {
              onPressReschedule();
              setShowMenu(false);
            }}
            style={styles.menuRow}
          >
            <Text allowFontScaling={false} style={styles.menuText}>
              {t(`${translationPath}.menu.reschedule`)}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            onPressCancel();
            setShowMenu(false);
          }}
          style={styles.menuSecondRow}
          disabled={!isCancelationAllowed}
        >
          <Text
            allowFontScaling={false}
            style={[
              styles.menuText,
              { color: isCancelationAllowed ? colors.statusRed : colors.greyGrey },
            ]}
          >
            {t(`${translationPath}.menu.cancel`)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMenu(false)} style={styles.menuSecondRow}>
          <Text allowFontScaling={false} style={styles.menuText}>
            {t(`${translationPath}.menu.close`)}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const renderContent = () => {
    if (!appointment) {
      return (
        <View style={styles.content}>
          <Text style={styles.title}>{getTestingOptionValue()}</Text>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.pendingDescription}>
            {t(`${translationPath}.pending.description1`)}
          </Text>
          <Text style={styles.pendingDescription}>
            {t(`${translationPath}.pending.description2`)}
            <Text onPress={onPressPhoneNumber} style={{ color: colors.primaryBlue }}>
              {pendingPhoneNumber}
            </Text>
          </Text>
          <BlueButton title='Start appointment' disabled style={styles.pendingButton} />
        </View>
      );
    }
    if (params?.purpose === 'sniffles_observation') {
      return (
        <View style={styles.content}>
          <Text style={styles.title}>{getTestingOptionValue()}</Text>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.note}>
            {t(`${translationPath}.testing.note.title`)}
            <Text style={{ fontFamily: fonts.familyLight }}>
              {t(`${translationPath}.testing.note.description`)}
            </Text>
          </Text>
          {renderList(appointmentData)}
          <BlueButton
            title={t(`${translationPath}.testing.button`)}
            style={styles.button}
            styleText={styles.buttonText}
            action={onEdit}
          />
          {renderContactInfo()}
        </View>
      );
    }
    return (
      <View style={styles.content}>
        <Text style={styles.title}>{getTestingOptionValue()}</Text>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={[styles.note, { fontFamily: fonts.familyLight }]}>
          {t(`${translationPath}.virtual.description`)}
        </Text>
        {renderList(appointmentData)}
        <BlueButton
          title={t(`${translationPath}.virtual.buttons.start`)}
          action={onStartAppointment}
          style={{ marginTop: 20 }}
          disabled={!lessThen5Minutes}
        />
        <BlueButton
          title={t(`${translationPath}.virtual.buttons.edit`)}
          style={[styles.button, { marginTop: 16 }]}
          styleText={styles.buttonText}
          action={onEdit}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComp
        addStyle={styles.header}
        center={[t(`${translationPath}.title` || 'paxlovid.eligibility.title'), styles.headerTitle]}
        right={[
          <CloseIcon width={14} height={14} />,
          () => {
            reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            });
          },
        ]}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={styles.backgroundContainer}>
          <AppointmentSvg />
          <View style={styles.dateContainer}>
            <View style={styles.calendarContainer}>
              <CalendarIcon width={24} height={24} color={colors.white} />
            </View>
            <View style={styles.line} />
            <View style={styles.timeContainer}>
              {appointment ? (
                <>
                  <Text style={styles.day}>
                    {iso8601ToFormatted(scheduledAt, formats.longDateWithFullMonthWithouYear)}
                  </Text>
                  <Text style={styles.time}>
                    {iso8601ToFormatted(scheduledAt, formats.time12Hour)}
                  </Text>
                </>
              ) : (
                <Text style={styles.pending}>{t(`${translationPath}.pending.title`)}</Text>
              )}
            </View>
          </View>
        </View>
        {renderContent()}
        {renderMenu()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryGhost,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyMidnight,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 30,
  },
  name: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeSmall,
    lineHeight: 14,
    color: colors.greyGrey,
    marginTop: 8,
  },
  dob: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeSmall,
    color: colors.greyDark2,
    marginTop: 8,
  },
  bannerContainer: {
    backgroundColor: colors.primaryPavement,
    width: '100%',
    padding: 18,
    marginTop: 29,
    borderRadius: 16,
  },
  bannerTitle: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    lineHeight: 16,
    color: colors.greyMidnight,
    marginBottom: 8,
  },
  bannerText: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    color: colors.greyMed,
    lineHeight: 22,
  },
  bannerButtonsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  bannerButtonTitle: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    color: colors.primaryBlue,
    paddingRight: 16,
  },
  listContainer: {
    alignSelf: 'flex-start',
    marginTop: 22,
  },
  timeContainer: {
    justifyContent: 'center',
  },
  listText: {
    fontFamily: fonts.familyLight,
    fontSize: fonts.sizeNormal,
    color: colors.greyMidnight,
    marginLeft: 5,
    lineHeight: 22,
  },
  backgroundContainer: {
    backgroundColor: colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContainer: {
    position: 'absolute',
    backgroundColor: colors.white,
    paddingVertical: 26,
    paddingHorizontal: 32,
    borderRadius: 16,
    flexDirection: 'row',
  },
  day: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeExtraLarge,
    lineHeight: 27,
    color: colors.greyMidnight,
  },
  time: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeNormal,
    lineHeight: 21,
    color: colors.greyGrey,
  },
  line: {
    height: '100%',
    width: 1,
    backgroundColor: colors.greyLight,
    marginHorizontal: 32,
  },
  calendarContainer: {
    backgroundColor: colors.statusGreen,
    justifyContent: 'center',
    padding: 12,
    borderRadius: 16,
  },
  title: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
    lineHeight: 21,
  },
  pending: {
    fontFamily: fonts.familyNoramlItalic,
    fontSize: fonts.sizeExtraLarge,
    lineHeight: 27,
    color: colors.greyMidnight,
  },
  note: {
    marginTop: 30,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    lineHeight: 21,
    color: colors.greyDark2,
  },
  button: {
    backgroundColor: colors.white,
    borderColor: colors.greyLight,
    marginTop: 60,
    marginBottom: 30,
  },
  buttonText: {
    color: colors.black,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
    lineHeight: 18,
  },
  // menu
  menuModal: {
    position: 'absolute',
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    height: 'auto',
    bottom: 0,
    paddingBottom: 20,
    paddingTop: 24,
  },
  menuRow: {
    marginRight: 24,
    marginLeft: 24,
    borderRadius: 16,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderColor: colors.greyLight,
    borderWidth: 1,
  },
  menuSecondRow: {
    marginRight: 24,
    marginLeft: 24,
    borderRadius: 16,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderColor: colors.greyLight,
    borderWidth: 1,
  },
  menuText: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
    lineHeight: 19,
  },
  pendingDescription: {
    fontFamily: fonts.familyLightItalica,
    fontSize: fonts.sizeNormal,
    lineHeight: 20,
    color: colors.greyMed,
    marginTop: 20,
  },
  pendingButton: {
    position: 'absolute',
    bottom: 0,
    left: 24,
    width: '100%',
  },
});
