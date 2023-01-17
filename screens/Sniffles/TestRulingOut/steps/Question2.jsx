import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import TestResultButtons from '../../../../components/TestResultButtons';

const translationsPath = 'screens.sniffles.testRulingOut.questions';

const Question2 = ({ onChangeState, covidTestResult }) => {
  const { t } = useTranslation();
  const options = [
    {
      title: t(`${translationsPath}.question2.answer1`),
      activeColor: '#49C37C',
      buttonStyle: { borderTopLeftRadius: 16, borderTopRightRadius: 16 },
    },
    {
      title: t(`${translationsPath}.question2.answer2`),
      activeColor: '#EB5757',
    },
    {
      title: t(`${translationsPath}.question2.answer3`),
      activeColor: '#F48034',
      buttonStyle: { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
    },
  ];

  const onSelectOption = (value) => {
    onChangeState(value, 'covidTestResult');
  };

  return (
    <View style={styles.container}>
      <TestResultButtons
        buttons={options}
        selected={covidTestResult}
        onSelectOption={onSelectOption}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 54,
  },
});
export default Question2;
