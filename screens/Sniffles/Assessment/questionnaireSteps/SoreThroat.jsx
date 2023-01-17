import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { LogEvent } from '../../../../analytics';
import { BlueButton } from '../../../../components/Buttons/BlueButton';
import Insight from '../../../../components/Insight';
import SingleChoiceFormWithHideAnswers from '../../../../components/SingleChoiceFormWithHideAnswers';
import { snifflesFieldNames } from '../../../../store/sniffles/slice';
import { openLink } from '../../../../utilis/link';

const translationsPath = 'screens.sniffles.assessmentQuestion.question2';

const yesIcon = require('../../../../assets/YesIcon.png');
const noIcon = require('../../../../assets/NoIcon.png');

const SoreThroat = ({ onChangeState, isSoreThroat }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const options = [
    { title: t(`${translationsPath}.option1`), icon: yesIcon },
    { title: t(`${translationsPath}.option2`), icon: noIcon },
  ];

  const insight = {
    title: t(`${translationsPath}.insight.title`),
    text: t(`${translationsPath}.insight.text`),
    source_title: t(`${translationsPath}.insight.sourceTitle`),
    source_url: 'https://www.cdc.gov/groupastrep/diseases-public/strep-throat.html',
  };

  const choosedOption = () => {
    if (isSoreThroat !== null) {
      return isSoreThroat ? options[0].title : options[1].title;
    }
    return null;
  };

  const onSelectOption = (value) => {
    let selectedAnswer = null;
    if (isSoreThroat !== null) {
      selectedAnswer = isSoreThroat ? options[0].title : options[1].title;
    }
    if (selectedAnswer !== null && selectedAnswer === value) {
      onChangeState(null, snifflesFieldNames.IS_SORE_THROAT);
    } else {
      onChangeState(value === options[0].title, snifflesFieldNames.IS_SORE_THROAT);
    }
  };

  const onButtonPress = () => {
    onChangeState(null, null, true);
  };

  const onLinkPress = (link) => {
    LogEvent('Sniffles_QuizA_Q2_click_Source');
    openLink(navigation, false, { url: link, useWebView: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <SingleChoiceFormWithHideAnswers
        options={options}
        choosedOption={choosedOption()}
        onSelectOption={onSelectOption}
        note={null}
      />
      <Insight insight={insight} onLinkPress={onLinkPress} visible={choosedOption() !== null} />
      <BlueButton title='Next' action={onButtonPress} disabled={isSoreThroat === null} />
    </View>
  );
};

export default SoreThroat;
