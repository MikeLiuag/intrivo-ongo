import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import EmptyEvents from '../../components/EmptyEvent';
import HeaderComp from '../../components/HeaderComp';
import { colors } from '../../theme';
import EventsList from '../../components/EventsList';
import EventButtonSvg from '../../components/Svg/eventButton';
import { getEvents, hideToast } from '../../store/events/slice';
import SuccessToast from '../../components/SuccessToast';
import LoaderComp from '../../components/LoaderComp';
import { LogEvent } from '../../analytics';
import { fonts } from '../../theme/fonts';
import { BlueButton } from '../../components/Buttons/BlueButton';

const HomeEvents = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { showToast } = useSelector((state) => state.events);
  const currentEvent = useSelector((state) => state.events.currentEvent);

  useEffect(() => {
    if (currentEvent?.code === '') {
      navigation.navigate('EventInfo', { item: currentEvent });
    }
  }, [currentEvent, navigation]);

  useEffect(() => {
    LogEvent('TGLanding_screen');
    async function getEventList() {
      setLoading(true);
      await dispatch(getEvents({}));
      setLoading(false);
    }
    getEventList();
  }, [dispatch]);

  const { events } = useSelector((state) => state.events) || {};

  const onEventPress = (item) => {
    LogEvent(item.is_promoter ? 'TGLanding_click_HostEvents' : 'TGrLanding_click_GuestEvents');
    navigation.navigate('EventInfo', { item });
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onPressCreateOrJoin = () => {
    LogEvent('TGLanding_click_CreateJoin');
    setModalVisible(true);
  };

  const renderCreateOrJoinButton = () => (
    <BlueButton
      showLoading={false}
      style={{ minHeight: 44 }}
      styleText={{ fontSize: 16 }}
      action={onPressCreateOrJoin}
      title={t('event.eventsList.newEvent')}
    />
  );

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.screen}>
      {showToast && <SuccessToast onPress={() => dispatch(hideToast())} />}
      <HeaderComp
        left='arrow'
        onLeftClick={onBack}
        center={[t('event.eventsList.title'), styles.headerTitle]}
        addStyle={styles.header}
      />
      <ScrollView style={styles.mainContainer}>
        {events.length === 0 ? (
          <EmptyEvents renderCreateOrJoinCTA={renderCreateOrJoinButton} />
        ) : (
          <EventsList
            data={events}
            onEventPress={onEventPress}
            renderCreateOrJoinCTA={renderCreateOrJoinButton}
          />
        )}
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        style={{ margin: 0 }}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              LogEvent('TGLanding_click_Create');
              navigation.navigate('CreateEvent');
            }}
            style={styles.modalRowFirst}
          >
            <View style={styles.modalImageContainer}>
              <EventButtonSvg create color='#ffffff' />
            </View>
            <View style={styles.modalTextContainer}>
              <Text style={styles.rowHeader}>{t('event.eventsType.create.title')}</Text>
              <Text style={styles.rowSubtitle}>{t('event.eventsType.create.subtitle')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              LogEvent('TGLanding_click_Join');
              navigation.navigate('EventCode');
            }}
            style={styles.modalRow}
          >
            <View style={styles.modalImageContainer}>
              <EventButtonSvg color='#ffffff' />
            </View>
            <View style={styles.modalTextContainer}>
              <Text style={styles.rowHeader}>{t('event.eventsType.join.title')}</Text>
              <Text style={styles.rowSubtitle}>{t('event.eventsType.join.subtitle')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      {isLoading && <LoaderComp />}
    </SafeAreaView>
  );
};

export default HomeEvents;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  modalView: {
    position: 'absolute',
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    bottom: 0,
  },
  modalRowFirst: {
    marginRight: wp('6.4%'),
    marginLeft: wp('6.4%'),
    borderRadius: 16,
    backgroundColor: colors.primaryPavement,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('3%'),
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
  },
  modalRow: {
    marginRight: wp('6.4%'),
    marginLeft: wp('6.4%'),
    borderRadius: 16,
    backgroundColor: colors.primaryPavement,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 56,
    padding: 16,
  },
  modalTextContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 16,
  },
  rowHeader: {
    fontFamily: fonts.familyBold,
    fontSize: 16,
  },
  rowSubtitle: {
    fontFamily: fonts.familyNormal,
    fontSize: 14,
    color: colors.greyMed,
  },
  modalImageContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    width: 40,
    height: 40,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 15,
    marginTop: 5,
  },
  headerTitle: {
    fontSize: 16,
    color: colors.greyMidnight,
    fontFamily: fonts.familyBold,
  },
});
