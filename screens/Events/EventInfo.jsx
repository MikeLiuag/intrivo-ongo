/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { format } from 'date-fns';
import { LogEvent } from '../../analytics';
import { BlueButton } from '../../components/Buttons/BlueButton';
import GuestInfo from '../../components/Event/GuestInfo';
import HostInfo from '../../components/Event/HostInfo';
import HeaderComp from '../../components/HeaderComp';
// svg
import DotsIcon from '../../components/Svg/dotsIcon';
import CheckIcon from '../../components/Svg/checkIcon';
import EventCardIcon from '../../components/Svg/eventCard';
import EventBackground from '../../components/Svg/eventBackground';

import { colors } from '../../theme';
import {
  deleteEvent,
  getEventDetails,
  getEventMembers,
  joinEvent,
  removeMember,
} from '../../store/events/slice';
import { DISCOUNT_URLS_KEY, getFromLocalStorage } from '../../utilis/localStorage';
import useIsFloatingKeyboard from '../../utilis/keyboard';
import { openLink } from '../../utilis/link';
import { iso8601ToFormatted, formats } from '../../utilis/dateTime';

const EventInfo = ({ route }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { item } = route.params;
  const { users, usersLookup } = useSelector((state) => state.user) || {};

  const { events } = useSelector((state) => state.events);
  const { showToast } = useSelector((state) => state.events);

  const { shopLink } = useSelector((s) => s.app);

  const [details, setDetails] = useState(item);
  const [isModalJoin, setModalJoin] = useState(false);
  const [isDotsModal, setIsDotsModal] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [discountUrl, setDiscountUrl] = useState(undefined);
  const [shareText, setShareText] = useState(
    t('event.eventInfo.inviteText', {
      description: details.description,
      date: iso8601ToFormatted(details.start_time, formats.fullLongDate),
      time: iso8601ToFormatted(details.start_time, formats.time12Hour),
      code: details.code,
      testTime: details.test_time_window,
      discount: 30,
      promoCode: '30together',
      user: users && users[0] ? usersLookup[users[0]]?.first_name : '',
    })
  );

  // fix for keyboard
  const floating = useIsFloatingKeyboard();

  const isUserJoined = () => events.filter((event) => event.uuid === item.uuid).length !== 0;

  const typeOfEvent = () => {
    if (isUserJoined()) {
      if (item.is_promoter) {
        return 'HostEventDetails';
      }
      return 'GuestEventDetails';
    }
    return 'JoinConfirm';
  };

  useEffect(() => {
    LogEvent(`TG${typeOfEvent()}_screen`);
    if (isUserJoined()) {
      getDataFromServer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showToast) {
      navigation.goBack();
    }
  }, [showToast, navigation]);

  const getDiscountUrl = async () => {
    const discountUrlData = await getFromLocalStorage(DISCOUNT_URLS_KEY);
    if (discountUrlData && discountUrlData[item.uuid]) {
      return discountUrlData[item.uuid];
    }
    return null;
  };
  const getDataFromServer = async () => {
    if (item.is_promoter) {
      dispatch(getEventMembers(item.uuid));
    }
    const response = await dispatch(getEventDetails(item.uuid));
    if (!item.is_promoter) {
      const discountUrlResp = await getDiscountUrl();
      setDiscountUrl(discountUrlResp);
    }
    setDetails(response.payload);
  };

  useEffect(() => {
    if (isModalJoin) {
      setTimeout(() => {
        setModalJoin(false);
      }, 2000);
    }
  }, [isModalJoin]);

  const buttonTitle = () => {
    if (details.is_promoter) {
      return t('event.eventInfo.shareEvent');
    }
    return t('event.eventInfo.joinEvent');
  };

  const handleButton = async () => {
    if (details.is_promoter) {
      LogEvent(`TG${typeOfEvent()}_click_Share`);
      const subject = `${usersLookup[users[0]]?.first_name} has invited you to ${
        details.description
      }`;
      await Share.share(
        {
          message: shareText,
        },
        {
          dialogTitle: subject,
          subject,
        }
      );
    } else {
      LogEvent(`TG${typeOfEvent()}_click_YesJoin`);
      setModalJoin(true);
      await dispatch(joinEvent(item.uuid));
      const discountUrlResp = await getDiscountUrl();
      setDiscountUrl(discountUrlResp);
    }
  };

  const createTwoButtonAlertDeleteEvent = () =>
    Alert.alert(t('event.eventInfo.deleteAlertTitle'), t('event.eventInfo.deleteAlertSubtitle'), [
      {
        text: t('event.eventInfo.deleteAlertCancel'),
        onPress: () => {
          setIsDotsModal(false);
          setIsTextVisible(true);
        },
        style: 'cancel',
      },
      {
        text: t('event.eventInfo.deleteAlertConfirm'),
        onPress: () => onConfirmDelete(),
      },
    ]);

  const createTwoButtonAlertLeaveEvent = () =>
    Alert.alert(t('event.eventInfo.leaveTitle'), t('event.eventInfo.leaveSubtitle'), [
      {
        text: 'NO',
        onPress: () => {
          setIsDotsModal(false);
          setIsTextVisible(true);
        },
        style: 'cancel',
      },
      { text: 'YES', onPress: () => onConfirmLeave() },
    ]);

  const handleDelete = () => {
    setIsTextVisible(false);
    createTwoButtonAlertDeleteEvent();
  };

  const handleLeave = () => {
    LogEvent(`TG${typeOfEvent()}_click_Leave`);
    setIsTextVisible(false);
    createTwoButtonAlertLeaveEvent();
  };

  const onConfirmDelete = async () => {
    const response = await dispatch(deleteEvent(details.uuid));
    if (response?.type.includes('fulfilled')) {
      navigation.goBack();
    }
  };

  const onConfirmLeave = () => {
    dispatch(
      removeMember({
        eventId: item.uuid,
        memberId: users[0],
      })
    );
    setIsDotsModal(false);
    setIsTextVisible(true);
    if (showToast) {
      navigation.goBack();
    }
  };

  const openWebview = () => {
    if (discountUrl) {
      openLink(navigation, false, { url: discountUrl, useWebView: true });
    } else {
      openLink(navigation, false, { url: shopLink, useWebView: true });
    }
  };

  const handleBack = (link) => {
    LogEvent(link ? `TG${typeOfEvent()}_click_BackLink` : `TG${typeOfEvent()}_click_BackNav`);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <EventBackground style={styles.background} />
      <View style={styles.header}>
        <HeaderComp
          left='arrow'
          onLeftClick={() => handleBack(false)}
          center={[
            details.description,
            {
              fontSize: 16,
              color: 'black',
              fontFamily: 'Museo_700',
              lineHeight: 30,
              marginLeft: -15,
            },
          ]}
          right={
            isUserJoined()
              ? !details.is_promoter
                ? [
                    <DotsIcon />,
                    () => {
                      LogEvent(`TG${typeOfEvent()}_click_Menu`);
                      setIsDotsModal(true);
                    },
                  ]
                : []
              : []
          }
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{ flex: 1, justifyContent: 'flex-start' }}
        enabled={!floating}
      >
        <ScrollView style={{ flex: 1, paddingHorizontal: 24 }}>
          <View style={styles.infoContainer}>
            <View style={styles.imageContainer}>
              <EventCardIcon big host />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.textRow}>
                <Text style={styles.text}>{t('event.eventInfo.date')}</Text>
                <Text style={styles.subtext}>
                  {format(new Date(details.start_time), 'MMM dd, yyyy')}
                </Text>
              </View>
              <View style={styles.secondTextRow}>
                <Text style={styles.text}>{t('event.eventInfo.time')}</Text>
                <Text style={styles.subtext}>
                  {iso8601ToFormatted(details.start_time, formats.time12Hour)}
                </Text>
              </View>
              {!details.is_promoter && (
                <View style={styles.secondTextRow}>
                  <Text style={styles.text}>{t('event.eventInfo.host')}</Text>
                  <Text style={styles.subtext}>{details.promoter}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={{ marginVertical: 15 }}>
            {details.is_promoter ? (
              <HostInfo data={details} shareText={shareText} onTextChanged={setShareText} />
            ) : (
              <GuestInfo
                event={details}
                time={details.test_time_window}
                join={isUserJoined()}
                host={details.promoter_name?.first_name ? details.promoter_name?.first_name : ''}
                discountUrl={discountUrl}
                discount='30together'
                onDiscount={openWebview}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {(!isUserJoined() || details.is_promoter) && (
        <BlueButton
          title={buttonTitle()}
          action={handleButton}
          style={{ marginHorizontal: 24, marginTop: 15 }}
          styleText={styles.whiteText}
        />
      )}
      {(item.is_promoter || isUserJoined()) && (
        <Text style={styles.linkText} onPress={() => handleBack(true)}>
          {t('event.eventInfo.back')}
        </Text>
      )}
      {/* Join modal */}
      <Modal isVisible={isModalJoin} style={{ margin: 10 }}>
        <View style={styles.modalView}>
          <View style={styles.modalCenter}>
            <View style={styles.modalIconView}>
              <CheckIcon width={67} height={67} />
            </View>
            <Text style={styles.modalText}>{t('event.eventsType.join.final')}</Text>
          </View>
        </View>
      </Modal>
      {/* Three dot's menu */}
      <Modal isVisible={isDotsModal} style={{ margin: 0 }}>
        {isTextVisible && (
          <View style={styles.menuModalView}>
            <TouchableOpacity
              onPress={() => (details.is_promoter ? handleDelete() : handleLeave())}
              style={styles.menuModalRowFirst}
            >
              <Text allowFontScaling={false} style={styles.menuTextLeave}>
                {details.is_promoter
                  ? t('event.eventInfo.deleteEvent')
                  : t('event.eventInfo.leaveEvent')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                LogEvent(`TG${typeOfEvent()}_click_Cancel`);
                setIsDotsModal(false);
              }}
              style={styles.menuModalRow}
            >
              <Text allowFontScaling={false} style={styles.rowTextCancel}>
                {t('event.eventInfo.cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default EventInfo;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 15,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 20,
    padding: 5,
    borderRadius: 14,
    backgroundColor: '#fff',
  },
  imageText: {
    color: '#fff',
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
  },
  textContainer: {
    flex: 1,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  text: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 20,
    color: colors.greyDark,
  },
  whiteText: {
    color: '#fff',
    fontFamily: 'Museo_700',
    fontSize: 16,
  },
  subtext: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 14,
    color: colors.greyGrey,
  },

  title: {
    fontFamily: 'Museo_700',
    fontSize: 18,
    lineHeight: 24,
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
  linkText: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 20,
    color: colors.primaryBlue,
  },
  menuModalView: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    height: 'auto',
    bottom: 0,
  },
  menuModalRowFirst: {
    marginRight: 24,
    marginLeft: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderColor: '#D6D6D6',
    borderWidth: 1,
  },
  menuModalRow: {
    marginRight: 24,
    marginLeft: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderColor: '#D6D6D6',
    borderWidth: 1,
  },
  menuTextLeave: {
    fontSize: 16,
    fontFamily: 'Museo_700',
    color: colors.statusRed,
  },
  rowTextCancel: {
    fontSize: 16,
    fontFamily: 'Museo_700',
  },
  background: {
    position: 'absolute',
    top: 0,
  },
});
