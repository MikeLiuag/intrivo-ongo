import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import MultiChoiceForm from './components/MultiChoiceForm';
import { APPLY_CONDITIONS } from './constants';
import { BlueButton } from '../../components/Buttons/BlueButton';

const translationPath = `screens.medicationFlow.applyConditions`;
const analyticSeekTreat = 'Sniffles_Async_SeekTreat';

const ApplyConditionsCheck = ({ onPressNext }) => {
  const options = APPLY_CONDITIONS;
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [applyConditions, setApplyConditions] = useState([]);

  const nextEnabled = applyConditions?.length > 0;

  const onPressCheck = () => {
    if (
      applyConditions?.length > 1 ||
      (applyConditions?.length === 1 && !applyConditions[0]?.none)
    ) {
      navigation.navigate('CareOptionsContainer', {
        careOptionsType: 'sniffles_async_alternative_treatment',
        translationsPath: 'templates.alternativeTreatment',
        type: 'Elimination',
        analyticsName: analyticSeekTreat,
      });
    } else {
      onPressNext();
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: 20 }}>
        <MultiChoiceForm
          options={options}
          selectedOptions={applyConditions}
          onSelectOption={setApplyConditions}
          note={t(`${translationPath}.sticky`)}
        />
      </ScrollView>
      <BlueButton
        title='Next'
        style={{ marginBottom: 20 }}
        action={onPressCheck}
        disabled={!nextEnabled}
      />
    </>
  );
};

export default ApplyConditionsCheck;
