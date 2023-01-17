import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { snifflesFieldNames } from '../../store/medicationFlow/slice';
import { LogEvent } from '../../analytics';
import BinaryChoiceForm from '../../components/BinaryChoiceForm';

const MedicationUseStatus = ({ onChangeState, medicationInUse, skipSteps, onPressNext }) => {
  const { t } = useTranslation();

  const options = useMemo(() => [t('yesNo.Yes'), t('yesNo.No')], [t]);

  const onNext = () => {
    if (medicationInUse === options[0]) {
      onPressNext();
    } else if (medicationInUse === options[1]) {
      LogEvent('Sniffles_Async_Q4_click_Next');
      skipSteps(2);
    }
  };

  const choosedOption = () => {
    if (medicationInUse !== null) {
      return medicationInUse;
    }
    return null;
  };

  const onSelectOption = (value, fieldName) => {
    onChangeState(value, fieldName);
  };

  return (
    <>
      <View style={{ flexGrow: 1, marginTop: 12 }}>
        <BinaryChoiceForm
          choosedOption={choosedOption()}
          onSelectOption={onSelectOption}
          fieldName={snifflesFieldNames.MEDICATION_IN_USE}
        />
      </View>
      <BlueButton
        style={styles.bottomButton}
        title='Next'
        disabled={!medicationInUse}
        action={onNext}
      />
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 24,
  },
  bottomButton: { marginBottom: 20 },
});

export default MedicationUseStatus;
