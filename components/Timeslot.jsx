import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, Linking, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import SlotPicker from '../screens/Sniffles/components/SlotPicker';
import snifflesStyles from '../screens/Sniffles/styles';
import { formats, iso8601ToFormatted } from '../utilis/dateTime';

const translationsPath = 'templates.timeslots';

const getDatesAndSlotsFromResponse = (timeslots = []) => {
  const dates = [];

  timeslots.forEach(({ datetime }) => {
    const date = iso8601ToFormatted(datetime, formats.iso8601);

    if (!dates.includes(date)) {
      dates.push(date);
    }
  });

  const slots = Object.fromEntries([...dates].map((date) => [date, []]));

  dates.forEach((date) => {
    timeslots.forEach(({ datetime }) => {
      const dateSlot = iso8601ToFormatted(datetime, formats.iso8601);
      if (date === dateSlot) {
        slots[date].push(datetime);
      }
    });
  });

  return [dates, slots];
};

const Timeslot = ({
  timeslots,
  location,
  selectedDay,
  onDayPress,
  selectedTime,
  onTimePress,
  isLoading,
}) => {
  const { t } = useTranslation();

  const { deliverySupportPhone } = useSelector(({ app: { firebase } }) => firebase);

  const [showCalendar, setShowCalendar] = useState(false);

  const [dates, slots] = getDatesAndSlotsFromResponse(timeslots);

  const onPressShowCalendar = () => {
    onDayPress(null);
    onTimePress(null);
    setShowCalendar(true);
  };

  const onPressLink = () => Linking.openURL(`tel:${deliverySupportPhone}`);

  const renderDaysPicker = () => (
    <View style={styles.dayContainer}>
      {dates.map(
        (item, index) =>
          index <= 2 && (
            <SlotPicker
              key={item}
              date={item}
              typePicker='day'
              onPress={onDayPress}
              selected={item === selectedDay}
            />
          )
      )}
    </View>
  );

  const renderDaysOrCalendar = () =>
    showCalendar ? (
      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          markedDates={{
            [selectedDay]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: colors.calendarSelected,
              selectedTextColor: colors.white,
            },
          }}
          minDate={timeslots[0].datetime}
          maxDate={timeslots.slice(-1).pop().datetime}
          onDayPress={(day) => onDayPress(day.dateString)}
          hideDayNames
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            textDayFontFamily: fonts.familyLight,
            dayTextColor: colors.calendarDayText,
            todayTextColor: colors.calendarDayText,
            textDisabledColor: colors.calendarDisableText,
          }}
        />
      </View>
    ) : (
      renderDaysPicker()
    );

  const renderMiddleText = (hasAvailableSlots) =>
    hasAvailableSlots ? (
      <View>
        <Text style={styles.timeTitle}>{t(`${translationsPath}.availableTime`)}</Text>
        <Text style={[styles.timeTitle, { fontSize: fonts.sizeNormal }]}>
          {t(`${translationsPath}.timeZone`)}
        </Text>
      </View>
    ) : (
      <View>
        <Text style={styles.timeTitle}>{t(`${translationsPath}.noAvailableTimes`)}</Text>
        <View style={styles.line} />
        <Text style={styles.contactUs}>{t(`${translationsPath}.contactUs.title`)}</Text>
        <Text style={styles.contactUs}>
          {t(`${translationsPath}.contactUs.subtitleFirst`)}
          <Text style={{ color: colors.primaryBlue }} onPress={onPressLink}>
            {deliverySupportPhone}
          </Text>
          {t(`${translationsPath}.contactUs.subtitleLast`)}
        </Text>
      </View>
    );

  const renderTimeslots = () =>
    selectedDay && (
      <>
        {renderMiddleText(slots[selectedDay]?.length > 0)}
        <View style={styles.timeContainer}>
          {slots[selectedDay]?.map((item) => (
            <SlotPicker
              key={item}
              date={item}
              typePicker='time'
              selected={item === selectedTime}
              onPress={() => onTimePress(item)}
            />
          ))}
        </View>
      </>
    );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator color='black' />
      </View>
    );
  }

  const renderContent = () => (
    <>
      <Text style={snifflesStyles.subtitle}>{t(`${translationsPath}.title`, { location })}</Text>
      {renderDaysOrCalendar()}
      {renderTimeslots()}
      {!showCalendar && (
        <Text style={styles.link} onPress={onPressShowCalendar}>
          {t(`${translationsPath}.viewCalendar`)}
        </Text>
      )}
    </>
  );

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {timeslots.length > 0 ? renderContent() : null}
    </ScrollView>
  );
};

export default Timeslot;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  calendar: {
    backgroundColor: 'transparent',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    marginVertical: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyExtraLight,
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  textContainer: {
    justifyContent: 'center',
    marginVertical: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    marginTop: 25,
  },
  timeTitle: {
    fontFamily: fonts.familyLight,
    fontSize: fonts.sizeLarge,
    lineHeight: 21,
    color: colors.greyMed,
    textAlign: 'center',
  },
  link: {
    textAlign: 'center',
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    color: colors.primaryBlue,
    marginTop: 15,
  },
  line: {
    borderWidth: 1,
    borderColor: colors.greyLight,
    marginVertical: 30,
  },
  contactUs: {
    fontFamily: fonts.familyLight,
    fontSize: fonts.sizeSmall,
    lineHeight: 21,
    textAlign: 'center',
    color: colors.greyDark,
  },
});
