/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import UnsavedResultItem from '../../components/UnsavedResultItem';
import Test from '../../components/Task';
import { colors } from '../../theme';
import { LogEvent } from '../../analytics';
import AddTest from '../../components/Svg/AddTest';
import HintUploadTest from '../../components/HintUploadTest';
import { fetchPastResults } from '../../store/app/slice';
import { IS_DEV } from '../../utilis/axios';
import { Appointment, Questionnaire, Observation } from '../../components/TimeLine';
import { fetchActivities } from '../../store/user/slice';
import { getUserQuestionnaire } from '../../store/modularTestFlow/slice';
import { setMedicationState } from '../../store/medicationFlow/slice';
import TabbarSpacer from '../../components/TabbarSpacer';

const RESULT_TYPES = {
  observation: 'observation',
  questionnaire: 'user_questionnaire',
  appointment: 'appointment',
};

export default ({
  route: {
    params: { headerFont, headerStyle },
  },
  navigation,
}) => {
  const {
    users,
    observations,
    activities = [],
    usersLookup,
    isLoadingTasks,
    tasksToDisplay: tasks = [],
  } = useSelector((state) => state.user) || {};
  const { isLoadingPastResults } = useSelector((state) => state.app) || {};
  const { snifflesAssessmentOptionB: optionB } = useSelector(({ app }) => app.firebase);
  const { t } = useTranslation();
  // const [overdueTasks, setOverdueTasks] = useState(null);
  // const [upcomingTasks, setUpcomingTasks] = useState(null);
  // const [observation, setObservation] = useState([]);
  const unsavedList = usersLookup && users[0] && usersLookup[users[0]].unsavedObservations;

  const dispatch = useDispatch();

  const overdueTasks = [];
  const upcomingTasks = [];

  useEffect(() => {
    LogEvent('Timeline_screen');
    dispatch(fetchActivities());
  }, []);

  const onRefresh = React.useCallback(() => {
    dispatch(fetchActivities());
  });

  tasks.forEach((task) => {
    if (task.status === 'OD') {
      overdueTasks.push(t);
    }
    if (task.status === 'UPC' || task.status === 'NS' || task.status === 'IN') {
      upcomingTasks.push(t);
    }
  });

  if (
    !observations?.length &&
    !upcomingTasks?.length &&
    !activities?.length &&
    !isLoadingTasks &&
    !isLoadingPastResults
  ) {
    return (
      <SafeAreaView
        edges={['right', 'top', 'left']}
        style={{ flex: 1, backgroundColor: colors.background }}
      >
        <View style={headerStyle}>
          <Text style={headerFont}>{t('screens.timeline.title')}</Text>
        </View>

        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultText}>{t('screens.timeline.noResults')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handlePlust = () => {
    LogEvent('Timeline_click_Add');
    navigation.navigate('SaveTest');
  };

  const onPaxlovidClicked = (observation) => {
    const { id, uuid, medicationRequestId } = observation;
    if (medicationRequestId && observation?.id) {
      if (uuid === users[0]) {
        LogEvent('Timeline_Mainuser_Click_Orderdetails');
      } else {
        LogEvent('Timeline_Depuser_Click_Orderdetails');
      }
      navigation.navigate('PrescriptionList');
    } else {
      if (uuid === users[0]) {
        LogEvent('Timeline_Mainuser_Click_Eligibility');
      } else {
        LogEvent('Timeline_Depuser_Click_Eligibility');
      }
      navigation.navigate('PaxlovidIntro', { userId: uuid, observationId: id, observation });
    }
  };

  const logEventType = (statusText) => {
    LogEvent(`Timeline_click_${statusText}Result`);
  };

  const handlePressOnOnservation = (data, statusText, statusColor) => {
    logEventType(statusText);
    navigation.navigate('TestResultScreen', {
      data: {
        ...data,
        patient: data.userName,
        color: statusColor,
      },
      slideFromBottom: true,
    });
  };

  const handlePressOnQuizResult = (data) => {
    dispatch(getUserQuestionnaire(data.data.id))
      .unwrap()
      .then((questionnaire) => {
        navigation.navigate('LongCovidResult', {
          data: questionnaire,
          from: 'timeline',
        });
      });
  };

  const onSnifflesClicked = (id) => {
    LogEvent('Timeline_click_symptoms');
    const user = usersLookup[id];
    const currentUser = usersLookup[users[0]];

    const userInfo = {
      id,
      fullName: user.fullName,
      firstName: user.first_name,
      lastName: user.last_name,
      dob: user.dob,
      email: currentUser?.email,
      phoneNumber: currentUser?.phone?.number,
    };
    dispatch(setMedicationState({ value: id, fieldName: 'userId' }));
    dispatch(setMedicationState({ value: userInfo, fieldName: 'userInfo' }));
    if (optionB) {
      navigation.navigate('SnifflesAssessmentQuestionnaire', {
        skipToStep: 4,
        optionB: true,
        flow: 'B',
      });
      return;
    }
    navigation.navigate('IntroToSolutionsV2', { flow: 'B' });
  };

  const renderPastResultItem = (item) => {
    const { user_id: userId } = item;
    const fullName = usersLookup[userId]?.fullName;

    switch (item.activity_type) {
      case RESULT_TYPES.observation:
        return (
          <Observation
            data={item}
            fullName={fullName}
            onPressPaxlovid={onPaxlovidClicked}
            onPressSniffles={() => onSnifflesClicked(userId)}
            onPressObservation={handlePressOnOnservation}
          />
        );
      case RESULT_TYPES.questionnaire:
        if (item.name === 'Sniffles' || item.name === 'Sniffles questionnaire') {
          return null;
        }
        return <Questionnaire data={item} onPress={handlePressOnQuizResult} />;

      case RESULT_TYPES.appointment:
        return (
          <Appointment
            data={item}
            fullName={fullName}
            onCtaClick={(status, observation) => {
              dispatch(
                setMedicationState({
                  value: item?.userId || users[0],
                  fieldName: 'userId',
                })
              );
              if (status === 'paxlovid') {
                onPaxlovidClicked(observation);
              } else if (status === 'sniffles_medication') {
                navigation.navigate('MedicationIntro');
              } else if (status === 'sniffles_telehealth') {
                navigation.navigate('SnifflesTelehealthIntro', { userId });
              }
            }}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoadingTasks && isLoadingPastResults}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={[headerStyle, { flexDirection: 'row', justifyContent: 'space-between' }]}>
          <Text style={headerFont}>{t('screens.timeline.title')}</Text>
          {IS_DEV && observations.length > 0 && (
            <TouchableOpacity onPress={handlePlust}>
              <AddTest />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.container}>
          {!!overdueTasks?.length && (
            <>
              <View style={styles.separatorSection}>
                <Text style={styles.separatorText}>{t('screens.timeline.overdue')}</Text>
              </View>
              {overdueTasks.map((item) => (
                <Test navigation={navigation} data={item} backgroundColor={colors.greyWhite} />
              ))}
            </>
          )}
          {!!upcomingTasks?.length && (
            <>
              <View style={styles.separatorSection}>
                <Text style={styles.separatorText}>{t('screens.timeline.upcoming')}</Text>
              </View>
              {upcomingTasks.map((item) => (
                <Test navigation={navigation} data={item} backgroundColor={colors.greyWhite} />
              ))}
            </>
          )}
          {(!!unsavedList?.length || !!activities?.length) && (
            <>
              <View style={styles.separatorSection}>
                <Text style={styles.separatorText}>{t('screens.timeline.past')}</Text>
              </View>
              {(unsavedList || [])
                .filter(({ result }) => result !== null)
                .map((item, index) => (
                  <View
                    key={item.id}
                    style={{
                      paddingBottom: 16,
                      width: '100%',
                    }}
                  >
                    <UnsavedResultItem observation={item} index={index} />
                  </View>
                ))}
              {(activities || [])
                .filter(({ result }) => result !== null)
                .map((item) => renderPastResultItem(item))}
            </>
          )}
        </View>
        <TabbarSpacer />
      </ScrollView>
      <HintUploadTest />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: wp('6.4%'),
    marginRight: wp('6.4%'),
    alignItems: 'center',
    marginBottom: wp('6.4%'),
  },
  indicatorView: {
    height: '100%',
    width: '100%',
    marginTop: '50%',
  },
  separatorSection: {
    width: '100%',
    justifyContent: 'flex-start',
    marginTop: hp('3%'),
    marginBottom: 16,
  },
  separatorText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ADADAD',
    letterSpacing: 1,
  },
  noTestsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
    marginVertical: hp('3%'),
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultText: {
    color: '#ADADAD',
    fontSize: 12,
    fontFamily: 'Museo_700',
    lineHeight: 24,
  },
});
