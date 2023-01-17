import React, { useEffect, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-native-elements';
import Tesk from '../components/Task';
import Routine from '../components/Routine';
import { colors } from '../theme';
import InvitePopUp from '../components/InvitePopUp';
import OrganizationConsentPopUp from '../components/OrganizationConsentPopUp';
import UpdateVaccineStatusPopUp from '../components/UpdateVaccineStatusPopUp';
import RightIconSvg from '../components/Svg/ResultScreen/RightIconSvg';
import { LogEvent } from '../analytics';
import {
  closeBanner,
  setNagativeTestComplete,
  setShowReviewScreen,
  setShowTooltip,
} from '../store/app/slice';
import { snifflesFieldNames } from '../store/sniffles/slice';
import Icon from '../components/Icon';
import CareCard from '../components/CareCard';
import HomeCard from '../components/HomeCard';
import RowButton from '../components/RowButton';
import BannersContainer from '../components/BannersContainer';
import IconButton from '../components/IconButton';
import { IS_DEV } from '../utilis/axios';
import TrackCard from '../components/TrackCard';
import { AppointmentBanner } from '../components/longCovid';
import { checkAppointmentStatus } from '../store/user/slice';
import { fonts } from '../theme/fonts';
import TabbarSpacer from '../components/TabbarSpacer';

const Carousel = Platform.OS !== 'web' ? require('react-native-reanimated-carousel').default : View;

const PADDING_SIDES = 24;
const SHOW_NOTIFICATION = IS_DEV;

const CodeImg = require('../assets/code.png');
const SnifflesImg = require('../assets/HomeScreen/sniffles-assessment.png');
const StartTestImg = require('../assets/HomeScreen/start-test-small.png');
const HospitalImg = require('../assets/hospital.png');

export default ({ navigation, route }) => {
  const {
    params: { headerStyle, headerFont },
  } = route;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const tooltipRef = useRef();
  const showTooltip = useSelector((s) => s.app.showTooltip);

  const {
    users,
    isAnyUserMemberOfOrg,
    routineStatuses = [],
    tasks,
    usersLookup,
    isOrgAdmin,
    organizationsLookup,
  } = useSelector((state) => state.user) || {};

  const snifflesState = useSelector((state) => state.sniffles);
  const { inProgress } = snifflesState;

  const { snifflesAssessmentOptionB: optionB } = useSelector(({ app }) => app.firebase);

  const {
    notifications: { newNotificationsCount },
  } = useSelector((state) => state.app) || 0;

  const isNegativeTestComplete = useSelector((state) => state.app.isNagativeTestComplete);

  const user = users[0] && usersLookup[users[0]];
  const userType =
    organizationsLookup?.[user?.organizations[0]?.uuid]?.meta?.orgMetaData?.translations?.en
      ?.userNoun?.key_other;

  const { wildCardImageLinks, banners, sniffleNegativeResultTile } = useSelector((s) => s.app);
  const name = user?.first_name ?? undefined;
  // switch the line below once organizations are properly being fetched
  const isOrg = isAnyUserMemberOfOrg;
  const hasRoutines = routineStatuses?.length > 0;

  // log event stuff
  const orgLog = isOrg ? 'Org' : '';
  const routineLog = hasRoutines ? 'Routines' : '';

  const careHome = useSelector((state) => state.app.careHome);

  const showCareHome = user?.organizations?.length === 0 && !isOrg && !isOrgAdmin && careHome;

  const iconButtons = [
    {
      title: t('screens.home.buttons.test'),
      icon: (
        <Image
          source={{ uri: 'https://assets.intrivo.com/sniffle_assessment/testing%403x.png' }}
          style={{ width: 17, height: 17 }}
        />
      ),
      onClick: () => {
        LogEvent(`${orgLog}Home${routineLog}_click_StartTest`);
        onStartTest();
      },
    },
    {
      title: t('screens.home.buttons.care'),
      icon: <Image source={HospitalImg} style={{ width: 20, height: 20 }} />,
      onClick: () => {
        LogEvent(`${orgLog}Home${routineLog}_click_GetCare`);
        navigation.navigate('CareList');
      },
    },
    {
      title: t('screens.home.buttons.buy'),
      icon: <Icon type='MaterialIcons' name='shopping-cart' size={20} isGradient />,
      onClick: () => {
        LogEvent(`${orgLog}Home${routineLog}_click_BuyTest`);
        navigation.navigate('TestingDetails');
      },
    },
  ];

  const onStartTest = () => {
    LogEvent(`${orgLog}Home${routineLog}_click_StartTest`);
    navigation.navigate('Intrivo', { slideFromBottom: true });
  };

  const onStartSniffle = () => {
    LogEvent(`${orgLog}Sniffles_Home${routineLog}_click_Start`);
    navigation.navigate('TestRulingOut');
  };

  const onViewOptions = () => {
    LogEvent(`${orgLog}Sniffles_Home${routineLog}_click_ViewOptions`);
    LogEvent(`${orgLog}Home${routineLog}_click_Sniffle_ViewOptions`);
    if (optionB) {
      navigation.navigate('SnifflesAssessmentQuestionnaire', {
        skipToStep: 4,
        optionB: true,
        showReset: true,
      });
    } else {
      navigation.navigate('IntroToSolutionsV2', { flow: 'A', showReset: true });
    }
  };

  useEffect(() => {
    LogEvent(`${orgLog}Home${routineLog}_screen`);
  }, [orgLog, routineLog]);

  useEffect(() => {
    if (showTooltip) {
      setTimeout(() => {
        // comment to disable tooltip
        tooltipRef.current?.toggleTooltip();
        dispatch(setShowTooltip(false));
      }, 500);
    }
  }, [dispatch, showTooltip]);

  useEffect(() => {
    if (isFocused && isNegativeTestComplete) {
      dispatch(setShowReviewScreen('negativeTest'));
      dispatch(setNagativeTestComplete(false));
    }
  }, [isFocused, isNegativeTestComplete, dispatch]);

  useEffect(() => {
    dispatch(checkAppointmentStatus());
  }, [dispatch]);

  // flatten the pending appointments for all users
  const pendingAppointment = users
    .reduce(
      (acc, cur) => [...acc, ...(usersLookup[cur].pendingAppointment || []).filter((e) => e)],
      []
    )
    .sort((a, b) => new Date(a?.scheduled_time) - new Date(b?.scheduled_time));

  const pendingAppointmentRequest = users.reduce(
    (acc, cur) => [
      ...acc,
      ...(usersLookup[cur].pendingAppointmentRequest || []).filter(
        (e) => e && e?.purpose !== 'sniffles_observation'
      ),
    ],
    []
  );

  const overdueTasks = [];
  const upcomingTasks = [];
  const todayTasks = [];

  (tasks || [])?.forEach((task) => {
    const today = new Date();
    const due = new Date(task.date);

    let status = null;
    if (!task.date) status = null;
    else if (today.toDateString() === due.toDateString()) status = 'Due today';
    else if (due - today < 0) status = 'Overdue';
    else status = 'Upcoming';

    switch (status) {
      case 'Due today':
        todayTasks.push({ ...task, status });
        break;
      case 'Overdue':
        overdueTasks.push({ ...task, status });
        break;
      case 'Upcoming':
        upcomingTasks.push({ ...task, status });
        break;
      default:
        console.warn('No due date');
    }
  });

  const sortedUserId = users && users[0];
  let vaccinedata;
  // eslint-disable-next-line no-restricted-syntax
  for (const key in usersLookup) {
    if (key) {
      const value = usersLookup[key];
      if (key === sortedUserId) {
        vaccinedata = value;
      }
    }
  }

  const handleCloseBanner = (bannerId) => {
    LogEvent(`${orgLog}Home${routineLog}_click_Banner_Close`, banners[0].title);
    dispatch(closeBanner(bannerId));
  };

  const onClickProfile = () => {
    navigation.navigate('ProfileList');
  };

  const onClickNotification = () => navigation.navigate('NotificationsScreen');

  const windowWidth = Dimensions.get('window').width;
  const renderCardCarouselItem = ({ item }) => (
    <View
      style={{
        height: 200,
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Image
        style={{
          ...styles.cardCarousel,
          flex: 1,
          aspectRatio: 1.5,
        }}
        source={{ uri: item }}
        resizeMode='contain'
      />
    </View>
  );

  const renderTasks = (taskGroup) =>
    taskGroup.map((item) => (
      <Tesk backgroundColor={colors.greyWhite} navigation={navigation} data={item} />
    ));

  const renderVaccineButton = () => (
    <TouchableOpacity
      onPress={() => {
        LogEvent(`${orgLog}Home${routineLog}_click_Vaccine`);
        navigation.navigate('VaccineEdit');
      }}
      style={{
        ...styles.initialSection,
        marginTop: 16,
      }}
    >
      <View style={styles.modalRow}>
        <View style={styles.imageBackground}>
          <Icon type='MaterialCommunityIcons' name='cloud-upload' size={24} isGradient />
        </View>
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <Text style={styles.rowHeader}>{t('screens.home.vaccine.title')}</Text>
          <Text style={styles.secondText}>{t('screens.home.vaccine.subtitle')}</Text>
        </View>
        <View style={styles.arrowIcon}>
          <RightIconSvg />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEasyAccessButton = () => (
    <TouchableOpacity
      onPress={() => {
        LogEvent(`${orgLog}Home${routineLog}_click_Bulk`);
        navigation.navigate('Employees');
      }}
      style={{
        ...styles.initialSection,
        marginTop: 20,
      }}
    >
      <View style={styles.modalRow}>
        <View style={styles.imageBackground}>
          <Icon type='MaterialIcons' name='person-pin-circle' size={26} isGradient />
        </View>
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <Text style={styles.rowHeader}>{t('bulkTesting.cta.title')}</Text>
          <Text style={styles.secondText}>{t('bulkTesting.cta.subTitle', { userType })}</Text>
        </View>
        <View style={styles.arrowIcon}>
          <RightIconSvg />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderBanners = () => (
    <>
      {pendingAppointment.map((b) => (
        <AppointmentBanner show appointment={b} />
      ))}
      {pendingAppointmentRequest.map((b) => (
        <AppointmentBanner show appointmentRequest={b} />
      ))}
      <BannersContainer closeBanner={handleCloseBanner} />
    </>
  );

  const renderCard = () =>
    sniffleNegativeResultTile ? (
      <HomeCard
        title={t('screens.home.sniffles.title')}
        description={t('screens.home.sniffles.subtitle')}
        buttonTitle={
          inProgress ? t('screens.home.sniffles.button2') : t('screens.home.sniffles.button1')
        }
        image={SnifflesImg}
        onClick={inProgress ? onViewOptions : onStartSniffle}
      />
    ) : (
      <HomeCard
        title={t('screens.home.covid_test.title')}
        titleStyle={styles.testHomeCardTitle}
        buttonTitle={t('screens.home.covid_test.button')}
        image={StartTestImg}
        onClick={onStartTest}
      />
    );

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1 }}>
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={[headerStyle, styles.containerHeader]}>
          <Text style={[headerFont, styles.headerText]}>{name ? `👋 ${name}!` : '👋!'}</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={onClickProfile} style={{ marginRight: 5 }}>
              <Icon type='MaterialIcons' name='perm-identity' size={24} color={colors.greyDark2} />
            </TouchableOpacity>

            {SHOW_NOTIFICATION && (
              <>
                <TouchableOpacity onPress={onClickNotification}>
                  {newNotificationsCount > 0 && (
                    <View style={styles.notificationCount}>
                      <Text style={styles.notificationCountTxt}>{newNotificationsCount}</Text>
                    </View>
                  )}
                  <Icon
                    type='MaterialIcons'
                    name='notifications-none'
                    size={20}
                    color={colors.greyDark2}
                  />
                </TouchableOpacity>
                <View style={styles.tooltipContainer}>
                  <Tooltip
                    ref={tooltipRef}
                    withOverlay
                    backgroundColor={colors.white}
                    overlayColor='rgba(41,41,41,0.4)'
                    popover={
                      <View style={styles.tooltip}>
                        <Text style={styles.tooltipHeader}>{t('tabBar.tooltip.header')}</Text>
                        <Text style={styles.tooltipDesscription}>
                          {t('tabBar.tooltip.description')}
                        </Text>
                      </View>
                    }
                    height={150}
                    width={207}
                  />
                </View>
              </>
            )}
          </View>
        </View>
        {renderBanners()}

        {IS_DEV && <TrackCard />}
        {isOrgAdmin && renderEasyAccessButton()}
        {isOrg && hasRoutines ? (
          <View style={{ paddingTop: 22 }}>
            {wildCardImageLinks?.length ? (
              <Carousel
                data={wildCardImageLinks}
                renderItem={renderCardCarouselItem}
                sliderWidth={windowWidth}
                itemWidth={windowWidth * 0.75}
              />
            ) : null}
          </View>
        ) : (
          renderCard()
        )}

        <View style={styles.row}>
          {iconButtons.map(({ title, icon, onClick }, index) => (
            <IconButton
              style={{
                marginRight: index < iconButtons.length - 1 ? 16 : 0,
                flex: 1,
              }}
              iconStyle={{ borderRadius: 8 }}
              title={title}
              icon={icon}
              onClick={onClick}
            />
          ))}
        </View>

        {/* {shopLink !== null && !isOrg && renderShopButton()} */}
        {hasRoutines > 0 && (
          <>
            <View style={{ paddingTop: 0, paddingHorizontal: PADDING_SIDES }}>
              <Text style={styles.sectionHeading}>{t('screens.home.activity')}</Text>
            </View>
            {!vaccinedata?.immunization?.document ? renderVaccineButton() : null}
            {todayTasks.length > 0 || overdueTasks.length > 0 || upcomingTasks.length > 0 ? (
              <>
                <View style={{ paddingHorizontal: PADDING_SIDES }}>
                  {overdueTasks.length > 0 && renderTasks(overdueTasks)}
                  {todayTasks.length > 0 && renderTasks(todayTasks)}
                  {upcomingTasks.length > 0 && renderTasks(upcomingTasks)}
                </View>
              </>
            ) : null}
            {!(todayTasks.length > 0 || overdueTasks.length > 0 || upcomingTasks.length > 0) &&
            vaccinedata?.immunization?.document ? (
              <View style={styles.emptyActivity}>
                <Text style={styles.emptyText}>{t('screens.home.emptyOrg.title')}</Text>
                <Text style={styles.emptyText}>
                  {t('screens.home.emptyOrg.subtitle')}
                  <Text style={{ color: colors.primaryBlue }} onPress={onStartTest}>
                    {t('screens.home.emptyOrg.button')}
                  </Text>
                </Text>
              </View>
            ) : null}
            {hasRoutines ? (
              <>
                <View
                  style={{
                    paddingVertical: 22,
                    paddingHorizontal: PADDING_SIDES,
                  }}
                >
                  <Text style={styles.sectionHeading}>{t('screens.home.routine')}</Text>
                </View>
                <View style={{ paddingHorizontal: PADDING_SIDES }}>
                  {(routineStatuses || []).map((item) => (
                    <Routine color='#FFFFFF' item={item} navigation={navigation} />
                  ))}
                </View>
              </>
            ) : null}
          </>
        )}

        <RowButton
          style={{
            marginHorizontal: 24,
            marginTop: 24,
          }}
          title={t('screens.home.buttons.code')}
          titleStyle={{ fontSize: fonts.sizeNormal, fontFamily: fonts.familyBold }}
          icon={<Image source={CodeImg} style={{ width: 17, height: 17 }} />}
          onClick={() => {
            LogEvent(`${orgLog}Home${routineLog}_click_RedeemCode`);
            navigation.navigate('EventCode');
          }}
        />

        {showCareHome && <CareCard />}
        <View style={styles.footer} />
        <TabbarSpacer />
      </ScrollView>
      <InvitePopUp />
      <OrganizationConsentPopUp />
      <UpdateVaccineStatusPopUp />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  headerText: {
    marginEnd: 10,
  },
  arrowIcon: {
    alignItems: 'flex-end',
  },
  initialSection: {
    marginLeft: PADDING_SIDES,
    marginRight: PADDING_SIDES,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  boxImageContainer: { flex: 1, marginBottom: 24 },
  boxImage: {
    flex: 1,
    width: '100%',
    height: undefined,
    aspectRatio: 1.64,
  },
  row: {
    marginHorizontal: 24,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalRow: {
    borderRadius: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imageBackground: {
    backgroundColor: colors.primaryPavement,
    height: 40,
    width: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  rowHeader: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    color: colors.greyDark2,
  },
  cardCarousel: {
    borderRadius: 16,
  },
  sectionHeading: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    lineHeight: 24,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#ADADAD',
  },
  footer: {
    minHeight: 80,
  },
  secondText: {
    fontSize: 14,
    color: colors.greyMed,
    fontFamily: 'Museo_500',
  },
  emptyActivity: {
    paddingHorizontal: PADDING_SIDES,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 60,
  },
  emptyText: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyGrey,
  },
  testHomeCardTitle: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Museo_700',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationCount: {
    position: 'absolute',
    width: 22,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.statusRed,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    left: 10,
    top: -10,
    zIndex: 2,
  },
  notificationCountTxt: {
    fontFamily: 'Museo_700',
    fontSize: 12,
    color: colors.white,
    textAlign: 'center',
  },
  tooltipContainer: {
    position: 'absolute',
    right: 10,
    top: 24,
  },
  tooltip: {
    alignItems: 'center',
    padding: 16,
  },
  tooltipHeader: {
    fontFamily: fonts.familyBold,
    color: colors.black,
    fontSize: 17,
    textAlign: 'center',
  },
  tooltipDesscription: {
    fontFamily: fonts.familyNormal,
    color: colors.black,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 12,
  },
});
