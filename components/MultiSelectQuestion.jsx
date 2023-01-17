import React, { useCallback, useState } from 'react';
import { ScrollView, Pressable, StyleSheet, Text, View } from 'react-native';
import CheckIconActive from '../assets/svgs/squareCheckMarkActive.svg';
import CheckIconInactive from '../assets/svgs/squareCheckMark.svg';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import SelectButton from './Buttons/SelectButton';

const MultiSelectQuestion = ({
  choosedOptions = [],
  fieldName,
  onSelectOption,
  options,
  title,
  subtitle,
}) => {
  const [noneSelected, setNone] = useState(false);

  const onPressItem = useCallback(
    (isSelected, item) => {
      const newDiseases = isSelected
        ? choosedOptions?.filter((el) => el.value !== item.value)
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
    const isSelected = !!choosedOptions?.find((e) => e.value === item.value);
    const Icon = isSelected ? CheckIconActive : CheckIconInactive;
    const isLastElement = options[options.length - 1].value === item.value;
    const marginBottom = isLastElement ? 15 : 0;

    return (
      <Pressable
        key={item.value}
        onPress={() => onPressItem(isSelected, item)}
        style={[styles.itemContainer, { marginBottom }]}
      >
        <View style={{ flex: 1 }}>
          <Text style={[styles.itemText]}>{item.displayName}</Text>
          {item?.subtitle && (
            <Text style={[styles.itemText, styles.itemSubtitle]}>{item.subtitle}</Text>
          )}
        </View>

        <Icon />
      </Pressable>
    );
  };

  return (
    <>
      {title && <Text style={[styles.title, { marginBottom: subtitle ? 6 : 20 }]}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -16,
    marginBottom: 10,
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
    lineHeight: 24,
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
  itemSubtitle: {
    fontSize: fonts.sizeSmall,
    fontFamily: fonts.familyNormal,
    color: colors.greyDark,
    lineHeight: 18,
  },
});

export default MultiSelectQuestion;
