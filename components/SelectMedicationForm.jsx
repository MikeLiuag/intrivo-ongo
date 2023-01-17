// SelectMedicationForm.jsx
import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View, Text, SectionList, StyleSheet } from 'react-native';
import SectionListAlphabetKeys from '../screens/Paxlovid/components/SectionListAlphabetKeys';
import { MEDICATIONS } from '../screens/Paxlovid/constants';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import CheckMarkExtraThinSvg from './Svg/checkMarkExtraThinSvg';
import { createDictionaryFromArray, filterArrayByString } from '../utilis/helpers';
import SelectButton from './Buttons/SelectButton';
import SearchInput from './SearchInput';

const SelectMedicationForm = ({
  title: formTitle,
  subtitle: formSubtitle,

  onResetForm,
  onChangeSelectedList,
}) => {
  const sectionListRef = useRef(null);
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState('');
  const [selectedMedications, setSelectedMedications] = useState([]);

  const medicationNames = MEDICATIONS.map((item) => item.displayName);

  const filteredMedications = filterArrayByString(medicationNames, searchValue);
  const medicationsDictionary = createDictionaryFromArray(filteredMedications);
  const medicationKeys = medicationsDictionary.map(({ title }) => title);

  const onChange = ({ nativeEvent }) => setSearchValue(nativeEvent.text);

  const onPressItem = useCallback(
    (isSelected, item) => {
      if (isSelected) {
        const newSelected = selectedMedications.filter((el) => el !== item);
        setSelectedMedications(newSelected);
        return onChangeSelectedList(newSelected);
      }
      const newSelected = [...selectedMedications, item];
      setSelectedMedications(newSelected);
      return onChangeSelectedList(newSelected);
    },
    [selectedMedications, onChangeSelectedList]
  );

  const scrollToSection = (sectionTitle) => {
    const sectionIndex = medicationsDictionary.findIndex(({ title }) => title === sectionTitle);

    if (sectionIndex !== -1) {
      sectionListRef.current?.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedMedications.includes(item);
    const marginLeft = isSelected ? 13 : 31;
    const iconColor = isSelected ? colors.primaryBlue : colors.inactiveGrey;

    return (
      <Pressable onPress={() => onPressItem(isSelected, item)} style={styles.medicationContainer}>
        <View style={styles.medicationTextContainer}>
          {isSelected && <View style={styles.selectIndicator} />}
          <Text style={[styles.medicationText, { marginLeft }]}>{item}</Text>
        </View>
        <CheckMarkExtraThinSvg width={17} height={18} color={iconColor} />
      </Pressable>
    );
  };

  const renderKeys = () => (
    <SectionListAlphabetKeys data={medicationKeys} onItemSelect={scrollToSection} />
  );

  const resetSelectedMedications = () => {
    onResetForm();
    setSelectedMedications([]);
  };

  const renderListHeaderComponent = () => (
    <SelectButton
      checkmark={false}
      buttonStyle={styles.radioButton}
      titleStyle={styles.radioButtonTitle}
      active={!selectedMedications.length}
      action={resetSelectedMedications}
      title={t('paxlovid.eligibility.medicationSelect.noneOfMeds')}
    />
  );

  const renderList = () => (
    <View style={styles.listContainer}>
      <SectionList
        ref={sectionListRef}
        renderItem={renderItem}
        sections={medicationsDictionary}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={renderListHeaderComponent}
        onScrollToIndexFailed={() => {}}
      />
      <View style={styles.keysContainer}>{renderKeys()}</View>
    </View>
  );

  return (
    <View style={styles.container}>
      {!!formTitle && <Text style={styles.title}>{formTitle}</Text>}
      {!!formSubtitle && <Text style={styles.subTitle}>{formSubtitle}</Text>}
      <SearchInput withIcon onChange={onChange} containerStyle={styles.inputContainer} />
      {renderList()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    marginTop: 18,
    marginHorizontal: 25,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 25,
  },
  keysContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medicationContainer: {
    flex: 1,
    height: 76,
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
  medicationText: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
    color: colors.greyDark2,
  },
  keyText: {
    fontFamily: fonts.familyBold,
    color: colors.primaryBlue,
  },
  radioButton: {
    margin: 0,
    marginTop: 16,
    borderWidth: 1,
    paddingLeft: 18,
    borderRadius: 16,
    justifyContent: 'center',
  },
  radioButtonTitle: {
    color: colors.greyDark2,
  },
  selectIndicator: {
    height: '100%',
    width: 18,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: colors.primaryBlue,
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: colors.secondaryButtonBorder,
  },
  medicationTextContainer: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.familyBold,
    color: colors.black,
    lineHeight: 36,
    marginHorizontal: 20,
    marginTop: 20,
  },
  subTitle: {
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyLight,
    color: colors.greyMed,
    lineHeight: 22,
    marginHorizontal: 20,
  },
});

export default SelectMedicationForm;
