import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { LogEvent } from '../../analytics';
import {
  cleanAnswers,
  getUploadTest,
  saveTestNameAndUuid,
} from '../../store/modularTestFlow/slice';
import DependentsList from '../Dependents/DependentsList';
import ScanBarCode from '../ScanBarCode';
import CheckIcon from '../../components/Svg/checkIcon';
import { fetchObservations } from '../../store/user/slice';

const SaveTest = () => {
  const [testName, setTestName] = useState();
  const [uuid, setUuid] = useState();

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { answers } = useSelector((state) => state.modularTestFlow);

  useEffect(() => {
    dispatch(getUploadTest());
  }, [dispatch]);

  useFocusEffect(() => {
    if (answers.length === 3 && testName && uuid) {
      setTimeout(() => {
        navigation.pop(1);
      }, 2000);
    }
  });

  // choose test
  if (!testName) {
    LogEvent('TimelineChooseTest_screen');
    return (
      <ScanBarCode
        onSelectTest={(test) => {
          setTestName(test);
        }}
        skipBarcodeScanner
      />
    );
  }

  const navigateExit = () => {
    dispatch(cleanAnswers());
    dispatch(fetchObservations());
    navigation.pop(2);
  };

  const handleSelectUser = (userUuid) => {
    setUuid(userUuid);
    LogEvent('TimelineChooseUser_click_Add');
    dispatch(
      saveTestNameAndUuid({
        testName: `${testName}™ COVID-19 Antigen Self-Test`,
        userUuid,
      })
    );
    navigation.navigate('ModularTestFlow', { navigateExit });
  };

  const handleGoBack = () => {
    LogEvent('TimelineChooseUser_click_Add');
    navigation.goBack();
  };

  // choose user
  if (!uuid && answers.length !== 3) {
    LogEvent('TimelineChooseUser_screen');
    return (
      <DependentsList
        title={t('dependentsList.title')}
        onSelectUser={handleSelectUser}
        header={t('dependentsList.header')}
        headerLeft={null}
        headerRight={['x', () => handleGoBack()]}
        hideArrows
        addNewStyle='list'
        includeSelf
        testName={testName}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.iconContainer}>
          <CheckIcon width={67} height={67} />
        </View>
        <Text style={styles.text}>{t('screens.sendTest.savedTitle')}</Text>
      </View>
    </View>
  );
};

export default SaveTest;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    alignItems: 'center',
  },
  iconContainer: {
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
  text: {
    marginTop: 20,
    fontFamily: 'Museo_700',
    fontSize: 20,
    lineHeight: 34,
  },
});
