import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import SelectButton from '../../../components/Buttons/SelectButton';
import { colors } from '../../../theme';
import { fonts } from '../../../theme/fonts';
import { parseHtmlForTags } from '../../../helpers/functions';
import ChipsButton from '../../../components/Buttons/ChipsButton';

const NONE = 'None of the above';
const NOT_SURE = 'Not sure';

const MultiChoiceForm = ({
  options,
  selectedOptions,
  onSelectOption,
  hasNote,
  note,
  buttonType = null,
}) => {
  const isChips = buttonType === 'chips';
  const hasNone = options?.filter((option) => option?.displayName === NONE)?.length;
  const noneOption =
    hasNone > 0 ? options?.filter((option) => option?.displayName === NONE)[0] : {};

  const onPressSymptom = (option) => {
    if (option?.displayName === NOT_SURE) {
      onSelectOption([option]);
    } else if (option?.displayName === NONE) {
      onSelectOption([{ ...option, none: true }]);
    } else {
      let newOptions = [option];
      if (selectedOptions?.length) {
        newOptions =
          selectedOptions?.filter((r) => r === option)?.length > 0
            ? selectedOptions.filter((s) => s !== option)
            : [...selectedOptions, option];
      }
      const results = newOptions.filter(
        (s) => s?.displayName !== NOT_SURE && s?.displayName !== NONE
      );
      onSelectOption(
        hasNone > 0 && results?.length === 0 ? [{ ...noneOption, none: true }] : results
      );
    }
  };

  const renderSymptoms = () =>
    options.map((option) => {
      const isNone = option?.displayName === NONE;
      const isNotSure = option?.displayName === NOT_SURE;
      const isActive =
        selectedOptions?.filter((r) => r?.displayName === option?.displayName).length > 0;

      if (isChips && !isNone && !isNotSure) {
        return (
          <ChipsButton
            active={isActive}
            checkmark={!isNone && !isNotSure}
            title={option?.displayName}
            action={() => onPressSymptom(option)}
          />
        );
      }

      return (
        <SelectButton
          withIndicator
          active={isActive}
          checkmark={!isNone && !isNotSure}
          title={option?.displayName}
          subTitle={option?.description}
          subTitleStyle={styles?.subtitle}
          titleStyle={styles.symptomTitle}
          buttonStyle={styles.symptomButton}
          action={() => onPressSymptom(option)}
        />
      );
    });

  const renderNote = () =>
    hasNote &&
    note && (
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>
          {parseHtmlForTags(note, {
            b: { fontFamily: fonts.familyBold, color: colors.primaryBlue },
          }).map((e) => React.createElement(Text, { style: e.style }, e.child))}
        </Text>
      </View>
    );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <View style={isChips && styles.optionsContainer}>{renderSymptoms()}</View>
        {renderNote()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  symptomButton: {
    margin: 0,
    marginBottom: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderBottomColor: null,
    borderColor: colors.greyExtraLight2,
    backgroundColor: colors.greyWhite,
    width: '100%',
  },
  noteContainer: {
    borderWidth: 1,
    borderColor: colors.primaryBlue,
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'rgba(42, 77, 155, 0.1)',
    marginVertical: 8,
  },
  noteText: {
    fontFamily: fonts.fami,
    fontSize: fonts.sizeLarge,
    lineHeight: 24,
    color: colors.primaryBlue,
  },
  symptomTitle: {
    color: colors.greyDark2,
  },
  subtitle: {
    color: colors.greyGrey,
    fontSize: fonts.sizeSmall,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
});

export default MultiChoiceForm;
