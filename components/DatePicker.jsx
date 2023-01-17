import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { format } from 'date-fns';
import ArrowDown from './Svg/arrowDown';
import { fonts } from '../theme/fonts';
import { colors } from '../theme';
import {
  convertDateStringToLocalTimezoneObject,
  convertDateObjectToDateString,
} from '../helpers/functions';
import { iso8601ToFormatted } from '../utilis/dateTime';

const DEFAULT_DATE_FORMAT = format(new Date(), 'yyyy-MM-dd');

const IntrivoDatePicker = ({
  label,
  onDateChange,
  DATE_FORMAT = DEFAULT_DATE_FORMAT,
  date,
  placeholder,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateChange = (selectedDate) => {
    onDateChange(convertDateObjectToDateString(selectedDate));
    setShowDatePicker(false);
  };

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => {
          setShowDatePicker(true);
        }}
      >
        <Text allowFontScaling={false} style={styles.inputValue}>
          {iso8601ToFormatted(date, DATE_FORMAT)}
        </Text>
        <ArrowDown style={styles.inputArrow} />
        <Text
          allowFontScaling={false}
          style={[styles.inputLabel, !date && styles.placeholderLabel]}
        >
          {placeholder}
        </Text>
        <DatePicker
          modal
          textColor={colors.black}
          open={showDatePicker}
          date={convertDateStringToLocalTimezoneObject(date || DEFAULT_DATE_FORMAT)}
          onConfirm={handleDateChange}
          onCancel={() => {
            setShowDatePicker(false);
          }}
          mode='date'
          maximumDate={new Date()}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyDark2,
    marginBottom: 10,
  },
  inputContainer: {
    borderRadius: 16,
    height: 68,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.greyLight,
    marginTop: 10,
    marginBottom: 15,
    borderWidth: 1,
    backgroundColor: colors.greyWhite,
  },
  inputArrow: {
    position: 'absolute',
    right: '4%',
  },
  inputValue: {
    position: 'absolute',
    left: '4%',
    top: Platform.OS === 'ios' ? '56%' : '49%',
    fontSize: fonts.sizeLarge,
    color: colors.greyMidnight,
  },
  placeholderLabel: {
    top: null,
  },
  inputLabel: {
    position: 'absolute',
    left: wp('3.5%'),
    top: Platform.OS === 'ios' ? '10.3%' : '15%',
    color: '#999',
    fontSize: fonts.sizeSmall,
  },
});

export default IntrivoDatePicker;
