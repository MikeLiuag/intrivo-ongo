import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors } from '../../theme';
import { fonts } from '../../theme/fonts';

const RoundButton = ({ title, action, style, styleText }) => (
  <TouchableOpacity
    style={{
      ...styles.container,
      ...style,
    }}
    onPress={action}
  >
    <Text style={{ ...styles.text, ...styleText }}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.secondaryButtonBorder,
    paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Museo_500',
    fontSize: fonts.sizeNormal,
    lineHeight: 16,
    color: colors.greyDark2,
    textAlign: 'center',
  },
});

export default RoundButton;
