import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '../../../theme';
import { fonts } from '../../../theme/fonts';
import { formats, iso8601ToFormatted } from '../../../utilis/dateTime';

const MARGIN = 78;

const SlotPicker = ({ date, typePicker, selected, onPress }) => {
  const formatDate = () => {
    if (typePicker === 'time') {
      return iso8601ToFormatted(date, formats.timeslotsTime);
    }
    return iso8601ToFormatted(date, formats.timeslots);
  };

  const getBackgroundColor = () => {
    if (selected) {
      return colors.primaryBlue;
    }
    if (typePicker === 'day') {
      return colors.white;
    }
    return colors.primaryPavement;
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(date)}
      style={[styles.container, { backgroundColor: getBackgroundColor() }]}
    >
      <Text style={[styles.text, { color: selected ? colors.white : colors.black }]}>
        {formatDate()}
      </Text>
    </TouchableOpacity>
  );
};

export default SlotPicker;

const styles = StyleSheet.create({
  container: {
    width: (Dimensions.get('screen').width - MARGIN) / 3,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 16,
  },
  text: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    lineHeight: 20,
  },
});
