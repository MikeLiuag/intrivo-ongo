import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import LowVitamin from './Svg/LowVitamin';
import IncreaseMidVitamin from './Svg/IncreaseMidVitamin';
import { colors } from '../theme';
import IncreaseLowVitamin from './Svg/IncreaseLowVitamin';
import IncreaseHighVitamin from './Svg/IncreaseHighVitamin';

const QuizSpeedometer = ({ score, subtitle }) => {
  const { t } = useTranslation();

  const returnIndicatorText = () => {
    if (score <= 2) {
      return t('screens.vitamiDQuiz.result.chanceLow');
    }
    if (score <= 6) {
      return t('screens.vitamiDQuiz.result.chanceMid');
    }
    return t('screens.vitamiDQuiz.result.chanceIncreased');
  };
  const returnCorrectType = () => {
    if (score <= 4) {
      return <IncreaseLowVitamin />;
    }
    if (score <= 6) {
      return <IncreaseMidVitamin />;
    }
    return <IncreaseHighVitamin />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        {score < 2 ? <LowVitamin /> : returnCorrectType()}
        <Text style={styles.indicatorText}>{returnIndicatorText().toUpperCase()}</Text>
      </View>
      <View style={styles.line} />
      <Text style={styles.text}>
        {returnIndicatorText()}
        {subtitle}
      </Text>
    </View>
  );
};

export default QuizSpeedometer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 40,
    marginTop: 40,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicatorText: {
    color: colors.primaryBlue,
    fontFamily: 'Museo_500',
    fontSize: 20,
    lineHeight: 28,
    marginTop: 18,
  },
  line: {
    height: 1,
    width: '85%',
    marginVertical: 16,
    backgroundColor: colors.greyExtraLight,
  },
  text: {
    color: colors.greyGrey,
  },
});
