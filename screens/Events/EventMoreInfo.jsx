import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlueButton } from '../../components/Buttons/BlueButton';
import StepRow from '../../components/Event/StepRow';

import EmptyEventSvg from '../../components/Svg/emtyEvents';
import PeopleEventSvg from '../../components/Svg/peopleEvent';
import HeaderComp from '../../components/HeaderComp';
import { colors } from '../../theme';
import { LogEvent } from '../../analytics';

const EventMoreInfo = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    LogEvent('TGLearnMore_screen');
  }, []);

  const handleClose = () => {
    LogEvent('TGLearnMore_click_Close');
    navigation.goBack();
  };

  const handleBack = () => {
    LogEvent('TGLearnMore_click_Back');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <HeaderComp
          center={[
            t('event.moreInfo.header'),
            {
              fontSize: 16,
              color: 'black',
              fontFamily: 'Museo_700',
              lineHeight: 30,
              marginLeft: -15,
            },
          ]}
          right={['x', handleClose]}
        />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.imageContainer}>
            <EmptyEventSvg />
            <View style={{ position: 'absolute', left: 56 }}>
              <PeopleEventSvg />
            </View>
          </View>
          <Text style={styles.title}>{t('event.moreInfo.title')}</Text>
          <Text style={styles.subtitle}>{t('event.moreInfo.subtitle')}</Text>
          <Text style={{ ...styles.subtitle, marginTop: 20 }}>
            {t('event.moreInfo.stepTitle')}
          </Text>
          <View style={styles.stepContainer}>
            <StepRow step="1" text={t('event.moreInfo.steps.1')} />
            <StepRow step="2" text={t('event.moreInfo.steps.2')} />
            <StepRow step="3" text={t('event.moreInfo.steps.3')} />
          </View>
          <Text style={styles.subtitle}>{t('event.moreInfo.footer')}</Text>
        </View>
      </ScrollView>
      <BlueButton
        title={t('event.moreInfo.button')}
        action={handleBack}
        style={styles.button}
        styleText={styles.buttonText}
      />
    </SafeAreaView>
  );
};

export default EventMoreInfo;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  imageContainer: {
    width: 295,
    height: 181,
    borderRadius: 25,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  infoContainer: {
    paddingVertical: 26,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  title: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 16,
  },
  subtitle: {
    marginTop: 5,
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyMed,
  },
  stepContainer: {
    marginVertical: 26,
  },
  button: {
    marginTop: 10,
    marginHorizontal: 24,
    backgroundColor: '#fff',
    borderColor: colors.greyLight,
  },
  buttonText: {
    color: colors.greyDark2,
    fontSize: 16,
    lineHeight: 19,
  },
});
