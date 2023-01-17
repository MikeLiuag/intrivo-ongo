import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { LogEvent } from '../../analytics';
import { BlueButton } from '../../components/Buttons/BlueButton';
import HeaderComp from '../../components/HeaderComp';
import QuizSpeedometer from '../../components/QuizSpeedometer';
import RiskContainer from '../../components/RiskContainer';
import { colors } from '../../theme';

const image = require('../../assets/school.png');

const QuizResult = ({ props, onAction }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const answers = useSelector((state) => state.modularTestFlow.answers);

  const [totalValue, setTotalValue] = useState(0);
  useEffect(() => {
    if (answers) {
      let value = 0;
      answers.forEach((item) => {
        if (item?.answers) {
          item.answers.forEach((a) => {
            value += a.value;
          });
        }
      });
      setTotalValue(value < 0 ? 0 : value);
      LogEvent(value < 2 ? 'VitDQuizLowResults_screen' : 'VitDQuizIncreasedResults_screen');
    }
  }, [answers, onAction, props.submit_result]);

  const showChronic =
    answers[0]?.answers[0].value > 0 ||
    answers[1]?.answers[0].value > 0 ||
    answers[4]?.answers[0].value > 0 ||
    answers[3]?.answers.filter((a) => a.value > 0).length > 0;

  const handleClose = () => {
    onAction({
      resultTemplate: props.submit_result,
      data: answers,
      skipNavigation: true,
    });
    LogEvent(
      totalValue < 2 ? 'VitDQuizLowResults_click_Close' : 'VitDQuizIncreasedResults_click_Close'
    );
    navigation.navigate('Home');
  };

  const handleSkip = () => {
    onAction({
      resultTemplate: props.submit_result,
      data: answers,
      skipNavigation: true,
    });
    LogEvent(
      totalValue < 2 ? 'VitDQuizLowResults_click_NotNow' : 'VitDQuizIncreasedResults_click_NotNow'
    );
    navigation.navigate('Home');
  };

  const handleLearn = () => {
    onAction({
      resultTemplate: props.submit_result,
      data: answers,
      skipNavigation: true,
    });
    LogEvent(
      totalValue < 2 ? 'VitDQuizLowResults_click_More' : 'VitDQuizIncreasedResults_click_More'
    );
    navigation.navigate('Vitamin');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderComp
        addStyle={styles.header}
        right={['x', handleClose]}
        center={['Vitamin D Risk assessment', styles.headerText]}
      />
      <View style={styles.dateContainer}>
        <Text>{new Date(Date.now()).toDateString()}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <QuizSpeedometer score={totalValue} subtitle={t('screens.vitamiDQuiz.result.chanceText')} />
        <View style={styles.infoContainer}>
          <Text style={styles.ristTitle}>{t('screens.vitamiDQuiz.result.risk.title')}</Text>
          <View style={styles.line} />
          <RiskContainer
            title={t('screens.vitamiDQuiz.result.risk.race.title')}
            description={t('screens.vitamiDQuiz.result.risk.race.description')}
          />
          {showChronic && (
            <RiskContainer
              title={t('screens.vitamiDQuiz.result.risk.chronic.title')}
              description={t('screens.vitamiDQuiz.result.risk.chronic.description')}
            />
          )}
          <RiskContainer
            title={t('screens.vitamiDQuiz.result.risk.lifeStyle.title')}
            description={t('screens.vitamiDQuiz.result.risk.lifeStyle.description')}
          />
        </View>
        <View style={styles.lastContainer}>
          <View style={styles.upperContainer}>
            <Image source={image} resizeMode='center' style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{t('screens.vitamiDQuiz.result.risk.button.title')}</Text>
              <Text style={styles.subtitle}>
                {t('screens.vitamiDQuiz.result.risk.button.subtitle')}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <BlueButton
              title={t('screens.vitamiDQuiz.result.risk.button.notNow')}
              style={{
                flex: 1,
                marginRight: 8,
                backgroundColor: '#fff',
                borderColor: colors.greyLight,
              }}
              styleText={[styles.buttonText, { color: colors.greyMidnight }]}
              action={handleSkip}
            />
            <BlueButton
              title={t('screens.vitamiDQuiz.result.risk.button.learn')}
              style={{
                flex: 1,
                marginLeft: 8,
              }}
              styleText={styles.buttonText}
              action={handleLearn}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuizResult;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
  },
  dateContainer: {
    alignItems: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 24,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
  },
  ristTitle: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 19,
    color: colors.greyDark,
  },
  line: {
    height: 1,
    width: '85%',
    backgroundColor: colors.greyExtraLight,
    marginVertical: 25,
  },
  lastContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 16,
    borderRadius: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  upperContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    marginRight: 18,
  },
  title: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 19,
    color: colors.greyMidnight,
  },
  subtitle: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    lineHeight: 21,
    flexShrink: 1,
  },
  buttonText: {
    fontFamily: 'Museo_500',
    lineHeight: 19,
    fontSize: 16,
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'Museo_700',
    lineHeight: 19,
  },
});
