import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import Select from '../components/buttons/select';
import Icon from '../../Icon';
import { colors } from '../../../theme';
import parseForVars from '../utils/parser';
import FormattedText from '../components/formattedText';
import { iso8601ToFormatted, formats } from '../../../utilis/dateTime';

const DatePicker = Platform.OS !== 'web' ? require('react-native-date-picker').default : View;

const MonthlyCalendarV1 = ({ args, vars, onAction = () => null }) => {
  const [date, setDate] = useState('');
  const [selected, setSelected] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const maxDate = args?.calendar?.date_range_to
    ? new Date(parseForVars(args.calendar.date_range_to, vars)).toISOString().slice(0, 10)
    : undefined;
  const minDate = args?.calendar?.date_range_from
    ? new Date(parseForVars(args.calendar.date_range_from, vars)).toISOString().slice(0, 10)
    : undefined;

  const handleNotSure = () => {
    setSelected('NotSure');
    setDate('');
    onAction({ calendar: { selected: true, selected_date: null } });
  };

  const handleOnChangeDay = (day) => {
    if (selected !== 'Date') setSelected('Date');
    setDate(day);
    const dateObj = new Date(day.timestamp);
    onAction({ calendar: { selected: true, selected_date: dateObj.toISOString() } });
  };

  const onTimeChange = (time) => {
    setShowTimePicker(false);
    setSelectedTime(time);
    onAction({
      calendar: {
        selected: date?.timestamp > 0,
        selected_date: date?.timestamp,
        selected_time: iso8601ToFormatted(time, formats.time12Hour),
      },
    });
  };

  const renderCalendarHeader = (headerRef) => (
    <View style={styles.calendarHeader}>
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => {
          headerRef.addMonth(-1);
        }}
      >
        <Icon type='MaterialIcons' name='keyboard-arrow-left' size={24} color='#222222' />
      </TouchableOpacity>

      <Text style={styles.calendarMonth}>{format(new Date(headerRef.month), 'MMMM yyyy')}</Text>
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => {
          headerRef.addMonth(1);
        }}
      >
        <Icon type='MaterialIcons' name='keyboard-arrow-right' size={24} color='#222222' />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {args.subtitle && (
        <FormattedText style={styles.subtitle}>{parseForVars(args.subtitle, vars)}</FormattedText>
      )}
      <View style={styles.wrapper}>
        <Calendar
          style={{
            backgroundColor: 'transparent',
          }}
          markedDates={{
            [date.dateString]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: '#2A4D9B',
              selectedTextColor: 'white',
            },
          }}
          maxDate={maxDate}
          minDate={minDate}
          onDayPress={handleOnChangeDay}
          hideDayNames
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            textDayFontFamily: 'Museo_300',
            dayTextColor: '#222730',
            todayTextColor: '#222730',
            textDisabledColor: '#999999',
          }}
          customHeader={renderCalendarHeader}
        />
        <View style={styles.border} />
        {args.show_time_picker && (
          <>
            {!args.time_picker_header && (
              <FormattedText baseStyle={styles.timeTitle}>
                {parseForVars(args.time_picker_header, vars)}
              </FormattedText>
            )}
            <TouchableOpacity style={styles.timeContainer} onPress={() => setShowTimePicker(true)}>
              <Text style={styles.pickerTitle}>Time of testing</Text>
              <Text style={styles.time}>
                {selectedTime ? iso8601ToFormatted(selectedTime, formats.time12Hour) : ''}
              </Text>
              <DatePicker
                modal
                textColor='#000'
                onConfirm={onTimeChange}
                onCancel={() => {
                  setShowTimePicker(false);
                }}
                date={new Date()}
                mode='time'
                confirmTextIOS='Done'
                open={showTimePicker}
              />
            </TouchableOpacity>
          </>
        )}
        {args.calendar?.null_value && (
          <Select
            title={args.calendar.null_value}
            active={selected === 'NotSure'}
            action={handleNotSure}
            disableLeftBackground
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 24,
    marginTop: 20,
  },
  wrapper: {
    marginTop: wp('3%'),
    padding: wp('4%'),
  },
  border: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    margin: 16,
  },
  arrow: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarMonth: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    borderRadius: 16,
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 24,
    height: 60,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: colors.greyLight,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  timeTitle: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    color: colors.greyGrey,
    marginBottom: 10,
  },
  pickerTitle: {
    fontFamily: 'Museo_500',
    fontSize: 10,
    color: colors.greyGrey,
  },
  time: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    color: colors.greyMidnight,
    marginTop: 9,
  },
});

export default MonthlyCalendarV1;
