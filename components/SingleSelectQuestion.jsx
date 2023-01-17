import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SelectButton from './Buttons/SelectButton';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';

const SingleSelectQuestion = ({
  title,
  subtitle,
  options,
  containerStyle,
  selected = null,
  onSelected = () => {},
}) => (
  <View style={[styles.container, { ...containerStyle }]}>
    <Text style={[styles.title, { marginBottom: subtitle ? 6 : 20 }]}>{title}</Text>
    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    {options.map((option) => (
      <SelectButton
        title={option}
        buttonStyle={styles.selectButton}
        titleStyle={styles.selectButtonTitle}
        active={selected === option}
        action={() => onSelected(option)}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: fonts.familyBold,
    color: colors.black,
    lineHeight: 36,
    marginVertical: 20,
  },
  subtitle: {
    fontFamily: fonts.familyLight,
    fontSize: 13,
    color: colors.greyDark2,
    lineHeight: 20,
    marginBottom: 14,
  },
  selectButton: {
    margin: 0,
    marginBottom: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderBottomColor: null,
    borderColor: colors.greyExtraLight2,
    backgroundColor: colors.greyWhite,
  },
  selectButtonTitle: {
    color: colors.greyDark2,
  },
});

export default SingleSelectQuestion;
