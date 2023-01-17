import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { snifflesFieldNames } from '../../store/medicationFlow/slice';
import { LogEvent } from '../../analytics';
import BinaryChoiceForm from '../../components/BinaryChoiceForm';

const translationPath = 'screens.medicationFlow';

const MedicationAllergyStatus = ({ onChangeState, isAllergic, onPressNext, skipSteps }) => {
  const { t } = useTranslation();

  const options = useMemo(
    () => [t(`${translationPath}.typical.yesNo.yes`), t(`${translationPath}.typical.yesNo.no`)],
    [t]
  );

  const onNext = () => {
    if (isAllergic === options[0]) {
      onPressNext();
    } else if (isAllergic === options[1]) {
      LogEvent('Sniffles_Async_Q5_click_Next');
      skipSteps(2);
    }
  };

  const choosedOption = () => {
    if (isAllergic !== null) {
      return isAllergic;
    }
    return null;
  };

  const onSelectOption = (value, fieldName) => {
    onChangeState(value, fieldName);
  };

  return (
    <>
      <View style={{ flexGrow: 1 }}>
        <BinaryChoiceForm
          choosedOption={choosedOption()}
          onSelectOption={onSelectOption}
          fieldName={snifflesFieldNames.IS_ALLERGIC}
        />
      </View>
      <BlueButton style={styles.bottomButton} title='Next' disabled={!isAllergic} action={onNext} />
    </>
  );
};

const styles = StyleSheet.create({
  bottomButton: { marginBottom: 20 },
});

export default MedicationAllergyStatus;
