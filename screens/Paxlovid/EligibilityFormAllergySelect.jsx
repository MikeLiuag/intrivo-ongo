import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../theme';
import PaxFlowWrapper from './components/PaxFlowWrapper';
import { setAllergies } from '../../store/paxlovid/slice';
import { fonts } from '../../theme/fonts';
import { LogEvent } from '../../analytics';
import AddMedications from '../Medication/components/AddMedictaions';

function EligibilityFormAllergySelect({ navigation }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    LogEvent('PE_MedAllergy2_screen');
  }, []);

  const { selectedAllergies } = useSelector((state) => state.paxlovid);
  const [allergy, setAllergy] = useState(
    selectedAllergies?.length > 0
      ? selectedAllergies?.map((val) => ({ name: val }))
      : [{ name: '' }]
  );

  const onPressNext = () => {
    LogEvent('PE_MedAllergy2_Click_Next');
    const data = allergy.filter((r) => r?.name).map((r) => r.name);
    dispatch(setAllergies(data));
    navigation.navigate('EligibilityRiskFactorStatus');
  };

  const onExitFromPaxFlow = () => {
    LogEvent('PE_MedAllergy2_Click_Close');
  };

  const onBack = () => {
    LogEvent('PE_MedAllergy2_Click_Back');
  };

  const isDisabled =
    !allergy || allergy?.length === 0 || allergy?.filter((r) => r?.name).length === 0;
  return (
    <PaxFlowWrapper
      onExit={onExitFromPaxFlow}
      onBack={onBack}
      onPressButton={onPressNext}
      buttonDisabled={isDisabled}
      buttonTitle='paxlovid.eligibility.userInfo.submit'
      title='paxlovid.eligibility.medicationSelect.medications'
    >
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>{t('paxlovid.eligibility.allergySelect.title')}</Text>
        <AddMedications
          data={allergy}
          onChange={(item) => {
            setAllergy([...item]);
          }}
          placeholder={t('screens.medicationFlow.typical.placeholder.medication')}
          addButtonTitle={t('screens.medicationFlow.buttons.addMedication')}
        />
      </View>
    </PaxFlowWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: fonts.familyBold,
    color: colors.black,
    lineHeight: 36,
    marginTop: 20,
  },
});

export default EligibilityFormAllergySelect;
