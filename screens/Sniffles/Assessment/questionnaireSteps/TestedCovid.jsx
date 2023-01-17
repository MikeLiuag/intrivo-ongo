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

const translationsPath = 'screens.sniffles.assessmentQuestion.question4';

const yesIcon = require('../../../../assets/YesIcon.png');
const noIcon = require('../../../../assets/NoIcon.png');

const TestedCovid = ({ onChangeState, isTestedOfCovid }) => {
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
    source_url:
      'https://www.fda.gov/medical-devices/safety-communications/home-covid-19-antigen-tests-take-steps-reduce-your-risk-false-negative-fda-safety-communication#:~:text=The%20FDA%20recommends%20repeat%20testing,you%20have%20COVID%2D19%20symptoms.',
  };

  const choosedOption = () => {
    if (isTestedOfCovid !== null) {
      return isTestedOfCovid ? options[0].title : options[1].title;
    }
    return null;
  };

  const onSelectOption = (value) => {
    let selectedAnswer = null;
    if (isTestedOfCovid !== null) {
      selectedAnswer = isTestedOfCovid ? options[0].title : options[1].title;
    }
    if (selectedAnswer !== null && selectedAnswer === value) {
      onChangeState(null, snifflesFieldNames.IS_TESTED_OF_COVID);
    } else {
      onChangeState(value === options[0].title, snifflesFieldNames.IS_TESTED_OF_COVID);
    }
  };

  const onButtonPress = () => {
    onChangeState(null, null, true);
  };

  const onLinkPress = (link) => {
    LogEvent('Sniffles_QuizA_Q4_click_Source');
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
      <BlueButton title='Next' action={onButtonPress} disabled={isTestedOfCovid === null} />
    </View>
  );
};

export default TestedCovid;
