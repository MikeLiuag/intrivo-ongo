import React, { useCallback, useState } from 'react';
import { ScrollView, Pressable, StyleSheet, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckIconActive from '../../../assets/svgs/squareCheckMarkActive.svg';
import CheckIconInactive from '../../../assets/svgs/squareCheckMark.svg';
import { colors } from '../../../theme';
import { fonts } from '../../../theme/fonts';
import SelectButton from '../../../components/Buttons/SelectButton';

const MultipleChoiceForm = ({ choosedOptions = [], fieldName, onSelectOption, options }) => {
  const [noneSelected, setNone] = useState(false);

  const onPressItem = useCallback(
    (isSelected, item) => {
      const newDiseases = isSelected
        ? choosedOptions?.filter((el) => el !== item)
        : [...choosedOptions, item];
      if (newDiseases.length > 0) {
        setNone(false);
      }
      if (newDiseases.length === 0) {
        return onSelectOption(undefined, fieldName);
      }
      return onSelectOption(newDiseases, fieldName);
    },
    [choosedOptions, onSelectOption, fieldName]
  );

  const handleNone = () => {
    setNone(true);
    onSelectOption([], fieldName);
  };

  const renderItem = (item) => {
    const isSelected = choosedOptions?.includes(item);
    const Icon = isSelected ? CheckIconActive : CheckIconInactive;
    const isLastElement = options[options.length - 1] === item;
    const marginBottom = isLastElement ? 15 : 0;

    return (
      <Pressable
        key={item}
        onPress={() => onPressItem(isSelected, item)}
        style={[styles.itemContainer, { marginBottom }]}
      >
        <Text style={[styles.itemText]}>{item}</Text>
        <Icon />
      </Pressable>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {options.map(renderItem)}
      <SelectButton
        title='None of the above'
        active={noneSelected}
        action={handleNone}
        buttonStyle={styles.selectButton}
        borders
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -16,
  },
  itemContainer: {
    flex: 1,
    height: 85,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    marginTop: 16,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.secondaryButtonBorder,
    paddingRight: 25,
  },
  itemText: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
    color: colors.greyDark2,
    marginLeft: 24,
  },
  selectButton: {
    height: 85,
    marginBottom: 20,
    margin: 0,
    paddingLeft: 12.5,
    borderRadius: 16,
    borderColor: colors.secondaryButtonBorder,
    borderWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
  },
});

export default MultipleChoiceForm;
