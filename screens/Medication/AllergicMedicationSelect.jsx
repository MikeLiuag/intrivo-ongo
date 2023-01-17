import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../theme/fonts';
import { colors } from '../../theme';
import AddMedications from './components/AddMedictaions';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { snifflesFieldNames } from '../../store/medicationFlow/slice';

const AllergicMedicationSelect = ({ onChangeState, allergicMedications = [] }) => {
  const { t } = useTranslation();

  const [medications, setMedications] = useState(
    allergicMedications?.length > 0
      ? allergicMedications?.map((val) => ({ name: val }))
      : [{ name: '' }]
  );

  const onNext = () => {
    const data = medications.filter((r) => r?.name).map((r) => r.name);
    onChangeState(data, snifflesFieldNames.ALLERGIC_MEDICATIONS, true);
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
  title: {
    fontSize: 24,
    fontFamily: fonts.familyBold,
    color: colors.black,
    lineHeight: 36,
    marginVertical: 20,
  },
  bottomButton: { marginBottom: 20 },
});

export default AllergicMedicationSelect;
