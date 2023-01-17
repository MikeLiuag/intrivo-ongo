import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { BlueButton } from '../../components/Buttons/BlueButton';
import MultiChoiceForm from './components/MultiChoiceForm';
import { SERIOUS_SYMPTOMS } from './constants';
import AlternativeCareOptions from '../../components/AlternativeCareOptions';
import RedWarning from '../../components/Svg/RedWarning';
import { LogEvent } from '../../analytics';

const translationPath = 'screens.medicationFlow.preSymptoms';
const analyticSeekMed = 'Sniffles_Async_SeekMed';

const SeriousSymptomsCheck = ({ onPressNext }) => {
  const options = SERIOUS_SYMPTOMS;

  const [isCompletedModalVisible, setIsCompletedModalVisible] = useState(false);
  const [seriousSymptoms, setSeriousSymptoms] = useState();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const nextEnabled = seriousSymptoms?.length > 0;

  const onPressCheck = () => {
    if (
      seriousSymptoms?.length > 1 ||
      (seriousSymptoms?.length === 1 && !seriousSymptoms[0]?.none)
    ) {
      LogEvent('Sniffles_Async_ElimOne_click_Next');
      setIsCompletedModalVisible(true);
    } else {
      onPressNext();
    }
  };

  const onModalClose = (type) => {
    LogEvent(`${analyticSeekMed}_click_${type}`);
    navigation.navigate('CareList');
    setIsCompletedModalVisible(false);
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
        <MultiChoiceForm
          options={options}
          selectedOptions={seriousSymptoms}
          onSelectOption={setSeriousSymptoms}
        />
      </ScrollView>
      <BlueButton
        title='Next'
        style={{ marginBottom: 20 }}
        action={onPressCheck}
        disabled={!nextEnabled}
      />
      {isCompletedModalVisible && (
        <AlternativeCareOptions
          visible={isCompletedModalVisible}
          title={t(`${translationPath}.warning.title`)}
          descr={t(`${translationPath}.warning.description`)}
          buttonTitle={t(`${translationPath}.warning.button`)}
          SvgComponent={RedWarning}
          background
          result={0}
          onClose={() => onModalClose('Close')}
          onPressButton={() => onModalClose('Done')}
          analyticName={analyticSeekMed}
        />
      )}
    </>
  );
};

export default SeriousSymptomsCheck;
