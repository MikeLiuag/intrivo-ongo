import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';
import StepRow from './Event/StepRow';
import EmptyEventSvg from './Svg/emtyEvents';
import PeopleEventSvg from './Svg/peopleEvent';
import { fonts } from '../theme/fonts';

const EmptyEvents = ({ renderCreateOrJoinCTA }) => {
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.imageContainer}>
            <EmptyEventSvg />
            <View style={{ position: 'absolute', left: 56 }}>
              <PeopleEventSvg />
            </View>
          </View>
          <Text style={styles.title}>{t('event.moreInfo.title')}</Text>
          <Text style={styles.subtitle}>{t('event.moreInfo.subtitle')}</Text>
          <Text style={{ ...styles.subtitle, marginTop: 20 }}>{t('event.moreInfo.stepTitle')}</Text>
          <View style={styles.stepContainer}>
            <StepRow step='1' text={t('event.moreInfo.steps.1')} />
            <StepRow step='2' text={t('event.moreInfo.steps.2')} />
            <StepRow step='3' text={t('event.moreInfo.steps.3')} />
          </View>
          <Text style={[styles.subtitle, { marginBottom: 26 }]}>{t('event.moreInfo.footer')}</Text>
          {renderCreateOrJoinCTA?.()}
        </View>
      </View>
    </>
  );
};
export default EmptyEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    paddingVertical: 26,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
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
  title: {
    fontFamily: fonts.familyBold,
    fontSize: 14,
    lineHeight: 16,
  },
  subtitle: {
    marginTop: 5,
    fontFamily: fonts.familyNormal,
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyMed,
  },
  stepContainer: {
    marginVertical: 26,
  },
  button: {
    marginHorizontal: 24,
    backgroundColor: colors.white,
    borderColor: colors.greyLight,
  },
  buttonText: {
    color: colors.greyDark2,
    fontSize: 16,
    lineHeight: 19,
  },
});
