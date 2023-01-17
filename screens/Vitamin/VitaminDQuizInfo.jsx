import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import HeaderComp from '../../components/HeaderComp';
import { colors } from '../../theme';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { cleanAnswers, getQuiz } from '../../store/modularTestFlow/slice';
import VitaminDBackground from '../../components/VitaminDBackground';
import { LogEvent } from '../../analytics';

const VitaminDQuiz = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    LogEvent('VitDQuizIntro_screen');
    dispatch(getQuiz());
  }, [dispatch]);

  const handleSkip = () => {
    LogEvent('VitDQuizIntro_click_NotNow');
    navigation.navigate('Home');
  };

  const navigateExit = () => {
    dispatch(cleanAnswers());
    navigation.navigate('Home');
  };

  const handleExplore = () => {
    LogEvent('VitDQuizIntro_click_Start');
    navigation.navigate('ModularTestFlow', { navigateExit });
  };

  const handleClose = () => {
    LogEvent('VitDQuizIntro_click_Close');
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderComp right={['x', handleClose]} addStyle={styles.header} />
      <VitaminDBackground />
      <View style={{ flex: 1 }} />
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.textContainer}>
          <Text style={styles.headerTitle}>{t('screens.vitamiDQuiz.info.title')}</Text>
          <Text style={styles.rowText}>{t('screens.vitamiDQuiz.info.firstParagraph')}</Text>
          <Text style={styles.rowBolderText}>{t('screens.vitamiDQuiz.info.secondParagraph')}</Text>
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <BlueButton
          action={handleSkip}
          title={t('screens.vitamiDQuiz.info.buttons.notNow')}
          style={styles.leftButton}
          styleText={styles.leftText}
        />
        <BlueButton
          action={handleExplore}
          title={t('screens.vitamiDQuiz.info.buttons.start')}
          styleText={styles.rightText}
          style={styles.rightButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default VitaminDQuiz;

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === 'ios' ? 0 : 20,
    marginHorizontal: 26,
    zIndex: 4,
  },
  container: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: 32,
  },
  internalFirstContainer: {
    flex: 1,
    marginBottom: 20,
  },
  internalSecondContainer: {
    flex: 5,
    marginTop: 15,
  },
  headerTitle: {
    fontFamily: 'Museo_700',
    fontSize: 20,
    lineHeight: 24,
    marginVertical: 26,
    textAlign: 'center',
  },
  rowText: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    lineHeight: 28,
    color: colors.greyDark,
    marginBottom: 30,
    textAlign: 'center',
  },
  rowBolderText: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 28,
    color: colors.greyDark,
    marginBottom: 30,
    textAlign: 'center',
  },
  footerText: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 28,
    color: colors.greyDark,
    marginTop: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 30,
  },
  leftText: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
    color: colors.greyMidnight,
  },
  leftButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#fff',
    borderColor: colors.greyLight,
  },
  rightButton: {
    flex: 1,
    marginLeft: 8,
  },
  rightText: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
    color: '#fff',
  },
  linkText: {
    fontFamily: 'Museo_500',
    fontSize: 10,
    lineHeight: 12,
    color: colors.greyDark,
  },
  textContainer: {
    // flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});
