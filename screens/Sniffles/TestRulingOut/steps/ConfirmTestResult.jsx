import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlueButton } from '../../../../components/Buttons/BlueButton';
import Select from '../../../../components/modularTestFlow/components/buttons/select';
import { Observation } from '../../../../components/TimeLine';
import { colors } from '../../../../theme';
import { NONE_OF_THE_ABOVE } from '../../../Medication/constants';
import { LogEvent } from '../../../../analytics';

const ConfirmTestResult = ({ positiveResults, showWarning }) => {
  const { t } = useTranslation();
  const { reset } = useNavigation();

  const [selectedObservation, setSelectedObservation] = useState();
  const isNoneSelected = selectedObservation === NONE_OF_THE_ABOVE;

  const onPressNext = () => {
    LogEvent(`Sniffles_Home_Q3A_click_Next`);
    if (isNoneSelected) {
      return showWarning();
    }

    return reset({
      index: 0,
      routes: [
        { name: 'Dashboard' },
        { name: 'PaxlovidIntro', params: { userId: null, observationId: selectedObservation } },
      ],
    });
  };

  const renderRecentResults = () =>
    positiveResults.map((item) => {
      const isSelected = selectedObservation === item.id;
      const borderColor = isSelected ? colors.primaryBlue : colors.white;

      return (
        <Observation
          fullName={item?.userName}
          data={{ ...item, showPaxlovidCTA: false }}
          onPressObservation={() => setSelectedObservation(item.id)}
          containerStyle={[styles.observationContainer, { borderColor }]}
        />
      );
    });

  const renderNoneOption = () => (
    <Select
      active={isNoneSelected}
      containerStyle={styles.noneOption}
      action={() => setSelectedObservation(NONE_OF_THE_ABOVE)}
      title={t('screens.sniffles.testRulingOut.questions.question4.noneOption')}
    />
  );

  return (
    <>
      <ScrollView style={styles.container}>
        {renderRecentResults()}
        {renderNoneOption()}
      </ScrollView>
      <BlueButton title='Next' disabled={!selectedObservation} action={onPressNext} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  observationContainer: {
    borderWidth: 1,
  },
  noneOption: {
    marginHorizontal: 0,
  },
});

export default ConfirmTestResult;
