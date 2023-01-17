import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { LogEvent } from '../../analytics';
import { colors } from '../../theme';
import { BlueButton } from '../Buttons/BlueButton';

const GuestInfo = ({
  event,
  join,
  time,
  host,
  discount,
  onDiscount,
  discountUrl,
}) => {
  const { t } = useTranslation();

  const textBasedOnDiscount = (url) =>
    url !== null
      ? 'event.eventsType.join.joinedInfo.discountHost'
      : 'event.eventsType.join.joinedInfo.discountHostNone';


  const handleDiscount = () => {
    LogEvent(!discountUrl ? 'TGGuestEventDetails_click_GetTest' : 'TGGuestEventDetails_click_GetFREETest')
    onDiscount();
  }
  return (
    <>
      <View style={styles.line} />
      {join ? (
        <View style={styles.firstContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.invateText}>
              {discountUrl !== undefined &&
                t(textBasedOnDiscount(discountUrl), {
                  host: event?.promoter_name?.first_name,
                })}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <BlueButton
              title={
                !discountUrl
                  ? 'Get your On/Go test'
                  : 'Get your FREE On/Go test'
              }
              style={styles.button}
              styleText={styles.textButton}
              action={handleDiscount}
            />
            <Text style={styles.discountText}>
              {t('event.eventsType.join.joinedInfo.discountInfo', {
                time: event.test_time_window,
              })}
            </Text>
          </View>
        </View>
      ) : null}
      {!join && (
        <View style={styles.container}>
          <Text style={styles.title}>
            {!join ? null : t('event.eventsType.join.joinedInfo.title')}
          </Text>
          <Text style={styles.subTitle}>
            {t(
              !join
                ? 'event.eventsType.join.info.subtitle'
                : 'event.eventsType.join.joinedInfo.subtitle',
              {
                host: event.promoter_name.first_name,
                time: event.test_time_window,
                eventName: event.description,
              }
            )}
          </Text>
        </View>
      )}
    </>
  );
};

export default GuestInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
  },
  firstContainer: {
    marginTop: 22,
  },
  title: {
    fontFamily: 'Museo_700',
    fontSize: 18,
    lineHeight: 24,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 24,
    marginTop: 14,
    color: colors.greyDark,
  },
  invateText: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 24,
    color: colors.greyDark,
  },
  line: {
    borderColor: colors.greyExtraLight,
    borderWidth: 1,
    height: 1,
    marginTop: 32,
  },
  button: {
    marginTop: 14,
  },
  textButton: {
    lineHeight: 19,
    fontSize: 16,
    fontFamily: 'Museo_700',
  },
  buttonContainer: {
    marginTop: 24,
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: colors.primaryPavement,
    borderRadius: 16,
  },
  discountText: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 24,
    color: colors.greyDark,
    marginTop: 16,
  },
});
