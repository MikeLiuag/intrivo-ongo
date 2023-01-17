import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, ScrollView } from 'react-native';
import { LogEvent } from '../../../../analytics';
import { BlueButton } from '../../../../components/Buttons/BlueButton';
import Insight from '../../../../components/Insight';
import SingleChoiceFormWithHideAnswers from '../../../../components/SingleChoiceFormWithHideAnswers';
import { snifflesFieldNames } from '../../../../store/sniffles/slice';
import { fonts } from '../../../../theme/fonts';
import { openLink } from '../../../../utilis/link';
import { colors } from '../../../../theme';

const translationsPath = 'screens.sniffles.assessmentQuestion.question1';

const yesIcon = require('../../../../assets/YesIcon.png');
const noIcon = require('../../../../assets/NoIcon.png');
const notSureIcon = require('../../../../assets/NotSureIcon.png');

export default function Fever({ onChangeState, fever, onSelectFeverOption }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const options = [
    { title: t(`${translationsPath}.option1`), icon: yesIcon },
    { title: t(`${translationsPath}.option2`), icon: noIcon },
    { title: t(`${translationsPath}.option3`), icon: notSureIcon },
  ];

  const insight = {
    title: t(`${translationsPath}.insight.title`),
    text: t(`${translationsPath}.insight.text`),
    source_title: t(`${translationsPath}.insight.sourceTitle`),
    source_url: 'https://www.cdc.gov/flu/symptoms/coldflu.htm',
  };

  const onSelectOption = (value) => {
    if (fever) {
      onChangeState(null, snifflesFieldNames.FEVER);
    } else {
      onChangeState(value, snifflesFieldNames.FEVER);
      onSelectFeverOption();
    }
  };

  const onButtonPress = () => {
    onChangeState(null, null, true);
  };

  const onLinkPress = async (link) => {
    LogEvent('Sniffles_QuizA_Q1_click_Source');
    openLink(navigation, false, { url: link, useWebView: true });
  };

  const renderForm = () => (
    <>
      <ScrollView>
        <SingleChoiceFormWithHideAnswers
          options={options}
          choosedOption={fever}
          onSelectOption={onSelectOption}
        />
      </ScrollView>
    </>
  );

  const renderContent = () => renderForm();

  return (
    <View style={{ flex: 1 }}>
      {renderContent()}
      <Insight insight={insight} onLinkPress={onLinkPress} visible={fever !== null} />
      <BlueButton
        title='Next'
        action={onButtonPress}
        style={styles.button}
        disabled={fever === null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  temperatureButtonTitle: {
    fontFamily: fonts.familyBold,
  },
  temperatureButton: {
    borderWidth: 1,
    borderColor: colors.secondaryButtonBorder,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryButtonBorder,
    marginTop: '10%',
  },
  temperatureButtonTitleContainer: {
    marginLeft: 0,
  },
});
