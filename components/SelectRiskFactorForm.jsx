import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { colors } from '../theme';
import SelectButton from './Buttons/SelectButton';
import { fonts } from '../theme/fonts';
import { RISK_FACTORS, RISK_FACTORS_NONE } from '../screens/Paxlovid/constants';

const SelectRiskFactorForm = ({ title, onChangeData, containerStyle }) => {
  const [riskFactors, setRiskFactors] = useState([]);
  const riskFactorsNames = riskFactors.map(({ name }) => name);

  const handleChangeData = (newData) => {
    setRiskFactors(newData);
    onChangeData(newData);
  };

  const onPressSymptom = (riskFactorName, isSelected) => {
    const newRiskFactors = isSelected
      ? riskFactors.filter(({ name }) => name !== riskFactorName)
      : [...riskFactors, RISK_FACTORS.find(({ name }) => name === riskFactorName)];

    handleChangeData(newRiskFactors);
  };

  const onPressNoneOption = () => handleChangeData([]);

  const renderSymptoms = () =>
    RISK_FACTORS.map(({ name, displayName }) => {
      const isNone = name === RISK_FACTORS_NONE.name;
      const isActive = isNone ? !riskFactors.length : riskFactorsNames.includes(name);

      return (
        <SelectButton
          withIndicator
          active={isActive}
          checkmark={!isNone}
          title={displayName}
          buttonStyle={styles.itemButton}
          action={() => (isNone ? onPressNoneOption() : onPressSymptom(name, isActive))}
        />
      );
    });

  return (
    <ScrollView contentContainerStyle={containerStyle}>
      {!!title && <Text style={styles.title}>{title}</Text>}
      {renderSymptoms()}
    </ScrollView>
  );
};

export default SelectRiskFactorForm;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    lineHeight: 36,
    marginBottom: 20,
    color: colors.black,
    fontFamily: fonts.familyBold,
  },
  itemButton: {
    margin: 0,
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 16,
    borderBottomColor: null,
    backgroundColor: colors.greyWhite,
    borderColor: colors.greyExtraLight2,
  },
});
