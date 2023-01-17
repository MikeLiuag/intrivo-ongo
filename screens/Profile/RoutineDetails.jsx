import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Image,
  Switch,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import HeaderComp from '../../components/HeaderComp';
import { colors } from '../../theme';
import Test from '../../components/Task';
import useIsFloatingKeyboard from '../../utilis/keyboard';
import { LogEvent } from '../../analytics';
import { iso8601ToFormatted } from '../../utilis/dateTime';

const SegmentedControl =
  Platform.OS !== 'web'
    ? require('@react-native-segmented-control/segmented-control').default
    : View;

export default ({ route, navigation }) => {
  const { uuid, statusColor, statusBackgroundColor } = route?.params;

  const {
    organizationsLookup = {},
    routinesLookup = {},
    tasks: tasksArray = [],
  } = useSelector((s) => s.user);
  const routine = routinesLookup[uuid] || {};
  const tasks = (tasksArray || []).filter((t) => t.routineId === uuid) || [];
  const organization = organizationsLookup[routine?.organizationId || null];

  const { t } = useTranslation();

  const [tabIndex, setTabIndex] = useState(0);
  const [switches, setSwitches] = useState({ 1: true, 2: true });

  // fix for keyboard
  const floating = useIsFloatingKeyboard();

  useEffect(() => {
    LogEvent('ProfileRoutinesDetails_screen');
  }, []);

  const overdueTasks = [];
  const upcomingTasks = [];
  const pastTasks = [];

  tasks.forEach((task) => {
    if (task.initial_status === 'OD') {
      overdueTasks.push(task);
    }
    if (
      task.initial_status === 'UPC' ||
      task.initial_status === 'NS' ||
      task.initial_status === 'IN'
    ) {
      upcomingTasks.push(task);
    }
    if (
      task.initial_status === 'PT' ||
      task.initial_status === 'PASS' ||
      task.initial_status === 'FAIL'
    ) {
      pastTasks.push(task);
    }
  });

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const toggleSwitch = (number) => {
    setSwitches({ ...switches, [number]: !switches[number] });
  };

  const renderTasks = () =>
    tasks.map((task) => (
      <Test backgroundColor={colors.primaryPavement} navigation={navigation} data={task} />
    ));

  const handleBack = () => {
    LogEvent('ProfileRoutinesDetails_click_Back');
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, paddingBottom: hp('2%'), backgroundColor: '#ffffff' }}
        enabled={!floating}
      >
        <HeaderComp
          center={[routine.name, styles.headerTitle]}
          left='arrow'
          onLeftClick={handleBack}
          // right={[<DotsIcon />]}
          addStyle={styles.profileHeader}
        />
        <LinearGradient colors={['#ffffff', '#FFFFFF']} start={{ x: 0, y: 0 }} style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.image}
                  source={{
                    uri: routine.image,
                  }}
                />
                {routine.status_style !== 'default' && (
                  <View
                    style={{
                      ...styles.routineAction,
                      backgroundColor: statusBackgroundColor,
                    }}
                  >
                    <Text
                      style={{
                        ...styles.routineActionText,
                        color: statusColor,
                      }}
                    >
                      {routine.formatted_status}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.descriptionContainer}>
                <View style={styles.descriptionRow}>
                  <Text style={styles.descriptionLabel}>{t('profile.routine.date')}</Text>
                  <Text style={styles.descriptionText}>
                    {iso8601ToFormatted(routine.created_at, 'MMM d, yyyy')}
                  </Text>
                </View>
                <View style={styles.descriptionRow}>
                  <Text style={styles.descriptionLabel}>{t('profile.routine.org')}</Text>
                  <Text style={styles.descriptionText}>{organization?.name}</Text>
                </View>
              </View>
              <SegmentedControl
                values={['About', 'Status']}
                segmentedControlBackgroundColor={colors.primaryPavement}
                activeSegmentBackgroundColor={colors.greyWhite}
                selectedIndex={tabIndex}
                onChange={handleTabsChange}
                activeTextColor={colors.primaryBlue}
                textColor={colors.greyGrey}
                width={wp('86%')}
                tileStyle={{
                  marginTop: 8,
                  marginBottom: 8,
                }}
                containerStyle={{
                  height: 50,
                  borderRadius: 8,
                  marginTop: 10,
                }}
                textStyle={{
                  fontWeight: '300',
                  fontSize: 14,
                }}
              />
              {tabIndex === 0 ? (
                <>
                  <Text style={styles.subHeader}>{t('profile.routine.description.title')}</Text>
                  <Text style={styles.descriptionParagraph}>
                    {t('profile.routine.description.description')}
                  </Text>
                  <View style={styles.seperatorLine} />
                  <Text style={styles.subHeader}>{t('profile.routine.sharing.title')}</Text>
                  <View style={styles.descriptionRow}>
                    <Text style={styles.descriptionLabel}>{t('profile.routine.antigen')}</Text>
                    <Switch
                      disabled
                      trackColor={{
                        false: colors.greyDark,
                        true: colors.statusGreen,
                      }}
                      thumbColor={colors.greyWhite}
                      ios_backgroundColor='#3e3e3e'
                      onValueChange={() => toggleSwitch(1)}
                      value={switches[1]}
                    />
                  </View>
                  <View style={styles.descriptionRow}>
                    <Text style={styles.descriptionLabel}>{t('profile.routine.pcr')}</Text>
                    <Switch
                      disabled
                      trackColor={{
                        false: colors.greyDark,
                        true: colors.statusGreen,
                      }}
                      thumbColor={colors.greyWhite}
                      ios_backgroundColor='#3e3e3e'
                      onValueChange={() => toggleSwitch(2)}
                      value={switches[2]}
                    />
                  </View>
                </>
              ) : (
                <>
                  {overdueTasks.length > 0 ? (
                    <>
                      <View style={{ marginTop: 32 }}>
                        <Text style={styles.sectionHeading}>{t('profile.routine.overdue')}</Text>
                      </View>
                      {renderTasks(overdueTasks)}
                    </>
                  ) : null}

                  {upcomingTasks.length > 0 ? (
                    <>
                      <View style={{ marginTop: 32 }}>
                        <Text style={styles.sectionHeading}>{t('profile.routine.upcoming')}</Text>
                      </View>
                      {renderTasks(upcomingTasks)}
                    </>
                  ) : null}

                  {pastTasks.length > 0 ? (
                    <>
                      <View style={{ marginTop: 32 }}>
                        <Text style={styles.sectionHeading}>{t('profile.routine.past')}</Text>
                      </View>
                      {renderTasks(pastTasks)}
                    </>
                  ) : null}
                </>
              )}
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: wp('7%'),
    marginRight: wp('7%'),
    flexDirection: 'column',
    height: '100%',
    marginBottom: 50,
  },
  sectionHeading: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    lineHeight: 24,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#ADADAD',
  },
  routineAction: {
    width: 90,
    height: 27,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -15,
  },
  routineActionText: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 17,
  },
  descriptionParagraph: {
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 24,
    color: colors.greyGrey,
  },
  subHeader: {
    fontFamily: 'Museo_700',
    fontSize: 18,
    lineHeight: 26,
    color: colors.greyDark,
    marginTop: 24,
    marginBottom: 14,
  },
  descriptionContainer: {
    marginTop: 40,
  },
  descriptionRow: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionLabel: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: colors.greyDark,
  },
  descriptionText: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 14,
    color: '#ADADAD',
  },
  seperatorLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#EBEBEB',
    marginTop: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  profileHeader: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Museo_700',
    width: '76%',
    textAlign: 'center',
  },
});
