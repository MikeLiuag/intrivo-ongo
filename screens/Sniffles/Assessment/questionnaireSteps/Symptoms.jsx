import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { LogEvent } from '../../../../analytics';
import { BlueButton } from '../../../../components/Buttons/BlueButton';
import Insight from '../../../../components/Insight';
import VerticalSlider from '../../../../components/VerticalSlider';
import { snifflesFieldNames } from '../../../../store/sniffles/slice';
import { openLink } from '../../../../utilis/link';

const translationsPath = 'screens.sniffles.assessmentQuestion.question3';

const Symptoms = ({ onChangeState, durationOfSymptoms }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const options = [
    t(`${translationsPath}.option1`),
    t(`${translationsPath}.option2`),
    t(`${translationsPath}.option3`),
    t(`${translationsPath}.option4`),
  ];

  const insight = {
    title: t(`${translationsPath}.insight.title`),
    text: t(`${translationsPath}.insight.text`),
    source_title: t(`${translationsPath}.insight.sourceTitle`),
    source_url: 'https://newsinhealth.nih.gov/2022/01/it-flu-covid-19-allergies-or-cold',
  };

  const onButtonPress = () => {
    if (!durationOfSymptoms) {
      onChangeState(options[0], snifflesFieldNames.DURATION_OF_SYMPTOMS, true);
    }
    onChangeState(null, null, true);
  };

  const onLinkPress = (link) => {
    LogEvent('Sniffles_QuizA_Q3_click_Source');
    openLink(navigation, false, { url: link, useWebView: true });
  };

  const onValueChange = (value) => onChangeState(value, snifflesFieldNames.DURATION_OF_SYMPTOMS);

  return (
    <View style={{ flex: 1 }}>
      <VerticalSlider
        options={options}
        containerStyle={{ marginBottom: 30 }}
        onChange={onValueChange}
      />
      <Insight insight={insight} onLinkPress={onLinkPress} visible={durationOfSymptoms !== null} />
      <BlueButton title='Next' action={onButtonPress} disabled={durationOfSymptoms === null} />
    </View>
  );
};

export default Symptoms;
