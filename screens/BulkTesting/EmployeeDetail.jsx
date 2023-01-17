import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComp from '../../components/HeaderComp';
import Routine from '../../components/Routine';
import { colors } from '../../theme';
import { BlueButton } from '../../components/Buttons/BlueButton';
import TakePhoto from '../../components/Scanner/index';
import { getEmployeeRoutines, getEmployeeTasks } from '../../store/bulkTesting/slice';

const EmployeeDetail = ({ route }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { employee, groupId, hasRoutines } = route.params;

  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { routines, tasks } = useSelector((state) => state.bulkTesting);

  useEffect(() => {
    async function getDetails() {
      setLoading(true);
      await dispatch(getEmployeeRoutines({ employeeId: employee.uuid, groupId }));
      if (employee.status !== 'PENDING') {
        await dispatch(getEmployeeTasks(employee.uuid));
      }
      setLoading(false);
    }
    if (hasRoutines) {
      getDetails();
    }
  }, [dispatch, employee.status, employee.uuid, groupId, hasRoutines]);

  const getPhoto = async (photo) => {
    setIsCameraEnabled(false);
    navigation.navigate('SelectTestResult', route.params);
  };

  const returnObservationColor = () => {
    if (employee.observationResult === 'negative') return colors.statusGreen;
    if (employee.observationResult === 'positive') return colors.statusRed;
    return colors.statusOrange;
  };
  const returnObservationStatus = () => {
    if (employee.observationResult === 'negative') return t('bulkTesting.employeeDetail.negative');
    if (employee.observationResult === 'positive') return t('bulkTesting.employeeDetail.positive');
    return t('bulkTesting.employeeDetail.invalid');
  };

  return (
    <>
      {isCameraEnabled ? (
        <TakePhoto onCaptureImage={getPhoto} testMask onCancel={() => setIsCameraEnabled(false)} />
      ) : (
        <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1 }}>
          <HeaderComp
            center={[`${employee.first_name} ${employee.last_name}`, styles.headerTitle]}
            left='arrow'
            addStyle={styles.header}
          />
          {hasRoutines ? (
            <View style={styles.container}>
              {!isLoading &&
              routines[employee.uuid]?.length === 0 &&
              tasks[employee.uuid]?.last_tested === '(not available)' &&
              tasks[employee.uuid]?.next_due_start === '(not available)' ? (
                <View style={styles.container}>
                  <Text style={styles.empty}>{t('bulkTesting.employeeDetail.empty')}</Text>
                </View>
              ) : (
                !isLoading && (
                  <View>
                    <FlatList
                      data={routines[employee.uuid]}
                      keyExtractor={(item) => item.uuid}
                      renderItem={({ item }) => (
                        <Routine color='#FFFFFF' item={item} navigation={navigation} />
                      )}
                    />
                    <View style={styles.dateContainer}>
                      <Text style={styles.dateLabel}>
                        {t('bulkTesting.employeeDetail.lastTested')}
                      </Text>
                      <Text style={styles.date}>{tasks[employee.uuid]?.last_tested}</Text>
                    </View>
                    <View style={styles.dateContainer}>
                      <Text style={styles.dateLabel}>
                        {t('bulkTesting.employeeDetail.nextTesting')}
                      </Text>
                      <Text style={styles.date}>{tasks[employee.uuid]?.next_due_start}</Text>
                    </View>
                  </View>
                )
              )}
            </View>
          ) : (
            <View style={styles.container}>
              <View style={styles.observationContainer}>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateLabel}>{t('bulkTesting.employeeDetail.lastTested')}</Text>
                  <Text style={styles.date}>{employee.observationDate}</Text>
                </View>
                <View
                  style={{
                    backgroundColor: returnObservationColor(),
                    borderRadius: 6,
                    paddingHorizontal: 8,
                    paddingVertical: 5,
                    marginBottom: 5,
                  }}
                >
                  <Text style={styles.status}>{returnObservationStatus()}</Text>
                </View>
              </View>
            </View>
          )}
          <BlueButton
            style={styles.button}
            title={t('bulkTesting.employeeDetail.recordTest')}
            styleText={styles.buttonTitle}
            action={() => setIsCameraEnabled(true)}
          />
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 30,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  empty: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    color: colors.greyGrey,
    alignSelf: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabel: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 24,
    color: colors.greyGrey,
  },
  date: {
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 24,
    color: colors.greyMed,
    marginLeft: 5,
  },
  button: {
    marginHorizontal: 24,
    marginBottom: 40,
  },
  buttonTitle: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
  },
  observationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  status: {
    color: 'white',
    fontFamily: 'Museo_500',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default EmployeeDetail;
