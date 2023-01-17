import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text } from 'react-native';
import { LogEvent } from '../../../../analytics';
import { BlueButton } from '../../../../components/Buttons/BlueButton';
import Insight from '../../../../components/Insight';
import { snifflesFieldNames } from '../../../../store/sniffles/slice';
import { fonts } from '../../../../theme/fonts';
import { openLink } from '../../../../utilis/link';
import { colors } from '../../../../theme';
import TemperatureInputForm from '../../../../components/TemperatureInputForm';

const translationsPath = 'screens.sniffles.assessmentQuestion.question1';

export default function TemperatureQuestion({
  onChangeState,
  temperature,
  measurementUnit,
  isNotSureFever,
}) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const temperatureNextIsDisabled = !temperature || !measurementUnit;

  const insight = {
    title: t(`${translationsPath}.insight.title`),
    text: t(`${translationsPath}.insight.text`),
    source_title: t(`${translationsPath}.insight.sourceTitle`),
    source_url: 'https://www.cdc.gov/flu/symptoms/coldflu.htm',
  };

  const onButtonPress = () => {
    onChangeState(null, null, true);
  };

  const onLinkPress = (link) => {
    openLink(navigation, false, { url: link, useWebView: true });
  };

  const onPressEnterManually = () => LogEvent('Sniffles_QuizA_Q1_ScanResult_click_Enter');

  const renderTemperatureInputForm = () => {
    const cancelButtonTitle = isNotSureFever
      ? '.temperatureForm.enterManuallyButton'
      : '.temperatureForm.cancelButton';

    return (
      <TemperatureInputForm
        temperature={temperature}
        withWarning={isNotSureFever}
        measurementUnit={measurementUnit}
        onPressEnterManually={onPressEnterManually}
        cancelButtonTitle={t(translationsPath + cancelButtonTitle)}
        onChangeData={(value) => onChangeState(value, snifflesFieldNames.TEMPERATURE)}
        onChangeMeasurementUnit={(value) =>
          onChangeState(value, snifflesFieldNames.TEMPERATURE_MEASUREMENT_UNIT)
        }
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{t(`${translationsPath}.temperatureForm.title`)}</Text>
      {renderTemperatureInputForm()}
      <Insight insight={insight} onLinkPress={onLinkPress} visible={!temperatureNextIsDisabled} />
      <BlueButton
        title='Next'
        action={onButtonPress}
        style={styles.button}
        disabled={temperatureNextIsDisabled}
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
  title: {
    fontFamily: fonts.familyBold,
    fontSize: 24,
    lineHeight: 36,
    marginBottom: 12,
    textAlign: 'center',
  },
});
