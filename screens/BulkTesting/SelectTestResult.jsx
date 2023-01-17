import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { BlueButton } from '../../components/Buttons/BlueButton';
import HeaderComp from '../../components/HeaderComp';
import SelectorComponent from '../../components/SelectorComponent';
import { colors } from '../../theme';
import CheckIcon from '../../components/Svg/checkIcon';
import { postEmployeeObservations } from '../../store/bulkTesting/slice';
import LoaderComp from '../../components/LoaderComp';

const SelectTestResult = ({ route }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { employee, groupId, selectedTab, hasRoutines } = route.params;
  const [selectedResult, setSelectedResult] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const { observationTypes } = useSelector((state) => state.app);
  const { isAddRecordLoading } = useSelector((state) => state.bulkTesting);
  const { users, usersLookup, organizationsLookup } = useSelector((state) => state.user);
  const userType =
    organizationsLookup?.[usersLookup[users[0]]?.organizations[0]?.uuid]?.meta?.orgMetaData
      ?.translations?.en?.userNoun?.key_one;

  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        navigation.pop(2);
      }, 2000);
    }
  }, [isModalVisible, navigation]);

  const handleResult = () => {
    switch (selectedResult) {
      case 'Negative':
        return 0;
      case 'Positive':
        return 1;
      default:
        return 6;
    }
  };

  const handleButton = async () => {
    const { uuid: observationId } = observationTypes['covid-19-rapid-antigen-test'];
    const observationData = {
      observation_type_id: observationId,
      name: 'On Site COVID-19 Rapid Antigen Test',
      started_at: new Date(),
      ended_at: new Date(),
      description: 'Self-test app',
    };
    const data = {
      barcode: null,
      symptomsArray: [],
      result_data: {
        barcode: null,
        result: null,
        value: null,
        success: null,
        imageId: null,
      },
      questionnaire_data: {
        result: handleResult(),
      },
    };
    await dispatch(
      postEmployeeObservations({
        employeeId: employee.uuid,
        groupId,
        selectedTab,
        observation: {
          observationData,
          data,
        },
        hasRoutines,
        translations: t,
      })
    );
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComp
        center={[t('bulkTesting.selectTest.title'), styles.headerTitle]}
        right={['x', () => navigation.navigate('Home')]}
        addStyle={styles.header}
      />
      <View style={styles.container}>
        <View
          style={[
            styles.rowContainer,
            {
              borderColor:
                selectedResult === 'Negative' ? colors.primaryBlue : colors.greyExtraLight,
            },
          ]}
        >
          <SelectorComponent
            type='inAll'
            arrow={false}
            data={[
              {
                title: 'Negative',
                onClick: () => setSelectedResult('Negative'),
                profileColor: '#49C37C',
                icon: <Text style={styles.iconText}>-</Text>,
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.rowContainer,
            {
              borderColor:
                selectedResult === 'Positive' ? colors.primaryBlue : colors.greyExtraLight,
            },
          ]}
        >
          <SelectorComponent
            type='inAll'
            arrow={false}
            data={[
              {
                title: 'Positive',
                onClick: () => setSelectedResult('Positive'),
                profileColor: '#EB5757',
                icon: <Text style={styles.iconText}>+</Text>,
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.rowContainer,
            {
              borderColor:
                selectedResult === 'Invalid' ? colors.primaryBlue : colors.greyExtraLight,
            },
          ]}
        >
          <SelectorComponent
            type='inAll'
            arrow={false}
            data={[
              {
                title: 'Invalid',
                description: (
                  <Text style={{ fontSize: 12 }}>
                    {t('bulkTesting.selectTest.invalidWarning', {
                      userType: userType
                        ? userType.charAt(0).toUpperCase() + userType.slice(1)
                        : '',
                    })}
                  </Text>
                ),
                onClick: () => setSelectedResult('Invalid'),
                profileColor: '#F48034',
                icon: <Text style={styles.iconText}>!</Text>,
              },
            ]}
          />
        </View>
      </View>
      <BlueButton
        style={styles.button}
        styleText={styles.buttonText}
        title={t('bulkTesting.selectTest.button')}
        action={handleButton}
        disabled={!selectedResult}
      />
      <Modal visible={isModalVisible} style={{ margin: 0 }}>
        <View style={styles.modalView}>
          <View style={styles.modalCenter}>
            <View style={styles.modalIconView}>
              <CheckIcon width={67} height={67} />
            </View>
            <Text style={styles.modalText}>{t('bulkTesting.selectTest.modal')}</Text>
          </View>
        </View>
      </Modal>
      {isAddRecordLoading && <LoaderComp />}
    </SafeAreaView>
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
    paddingHorizontal: 24,
    marginTop: 30,
  },
  button: {
    marginHorizontal: 24,
    marginBottom: 30,
  },
  rowContainer: {
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 16,
  },
  iconText: {
    fontFamily: 'Museo_700',
    fontSize: 20,
    lineHeight: 28,
    color: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Museo_700',
  },
  modalText: {
    marginTop: 20,
    fontFamily: 'Museo_700',
    fontSize: 20,
    lineHeight: 34,
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
    marginBottom: hp('15%'),
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
});

export default SelectTestResult;
