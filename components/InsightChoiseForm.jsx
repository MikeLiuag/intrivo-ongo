import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import { BlueButton } from './Buttons/BlueButton';
import Select from './modularTestFlow/components/buttons/select';

const InsightChoiseForm = ({ choosedOption, options, onSelectOption, insight, onPressNext }) => (
  <View style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      {options.map(
        (value) =>
          (!choosedOption || value === choosedOption) && (
            <Select
              title={value}
              active={value === choosedOption}
              action={() => onSelectOption(value === choosedOption ? null : value)}
            />
          )
      )}
    </View>
    {choosedOption && (
      <View style={styles.insightContainer}>
        <Text style={styles.insightTitle}>💡{insight.title}</Text>
        <Text style={styles.insightDescription}>{insight.description}</Text>
        <Text style={styles.insightSource}>
          Source: <Text style={styles.insightLink}>{insight.sourceName}</Text>
        </Text>
      </View>
    )}
    <BlueButton
      style={styles.bottomButton}
      title='Next'
      disabled={!choosedOption}
      action={onPressNext}
    />
  </View>
);

export default InsightChoiseForm;

const styles = StyleSheet.create({
  insightContainer: {
    marginHorizontal: -24,
    backgroundColor: colors.white,
    width: wp('100%'),
    height: hp('28%'),
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },
  insightTitle: {
    fontWeight: '600',
    fontStyle: 'italic',
    fontSize: fonts.sizeLarge,
    lineHeight: 26,
  },
  insightDescription: {
    fontFamily: fonts.familyLight,
    fontSize: fonts.sizeSmall,
    lineHeight: 21,
    color: colors.greyDark,
    marginVertical: 18,
  },
  insightSource: {
    textAlign: 'right',
    fontFamily: fonts.familyLight,
    fontSize: fonts.sizeSmall,
    lineHeight: 14,
    color: colors.greyDark,
  },
  insightLink: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeSmall,
    lineHeight: 14,
    color: colors.primaryBlue,
  },
  bottomButton: {
    marginBottom: 20,
  },
});
