import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { snifflesFieldNames } from '../../store/medicationFlow/slice';
import AddMedications from './components/AddMedictaions';

const InUseMedicationSelect = ({ onChangeState, activeMedications = [] }) => {
  const { t } = useTranslation();

  const [medications, setMedications] = useState(
    activeMedications?.length > 0
      ? activeMedications?.map((val) => ({ name: val }))
      : [{ name: '' }]
  );

  const onNext = () => {
    const data = medications.filter((r) => r?.name).map((r) => r.name);
    onChangeState(data, snifflesFieldNames.ACTIVE_MEDICATIONS, true);
  };

  const isDisabled =
    !medications || medications?.length === 0 || medications?.filter((r) => r?.name).length === 0;

  return (
    <>
      <ScrollView style={styles.containerStyle} keyboardShouldPersistTaps='always'>
        <AddMedications
          data={medications}
          onChange={setMedications}
          placeholder={t('screens.medicationFlow.typical.placeholder.medication')}
          addButtonTitle={t('screens.medicationFlow.buttons.addMedication')}
        />
      </ScrollView>
      <BlueButton style={styles.bottomButton} title='Next' disabled={isDisabled} action={onNext} />
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexGrow: 1,
  },
  bottomButton: { marginBottom: 20 },
});

export default InUseMedicationSelect;
