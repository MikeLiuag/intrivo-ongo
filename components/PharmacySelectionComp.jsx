import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { LogEvent } from '../analytics';
import { setPharmaciesList } from '../store/paxlovid/slice';
import { fonts } from '../theme/fonts';
import LocationCard from './LocationCard';
import SearchInput from './SearchInput';

const translationPath = 'paxlovid.eligibility.pharmacySelection';

const PharmacySelectionComp = ({
  selectedParmacy,
  setSelectedParmacy,
  pharmaciesList,
  eligibilityFormUserInfo,
  zipcode,
  analyticName = '',
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isTyping, setIsTyping] = useState(false);

  const [searchValue, setSearchValue] = useState(zipcode || eligibilityFormUserInfo?.zipcode || '');

  useEffect(() => {
    if (searchValue && !isTyping) {
      dispatch(setPharmaciesList(searchValue));
    }
  }, [searchValue, isTyping, dispatch]);

  const onChange = useCallback(
    ({ nativeEvent }) => {
      setIsTyping(true);
      setSearchValue(nativeEvent.text);
      setTimeout(() => setIsTyping(false), 1000);
    },
    [setSearchValue]
  );

  const onPressLocation = useCallback(
    (id, isSelected) => {
      if (isSelected) {
        setSelectedParmacy(null);
      } else {
        LogEvent(`${analyticName}_click_Choose`);
        setSelectedParmacy(pharmaciesList.find((e) => e.id === id));
      }
    },
    [analyticName, setSelectedParmacy, pharmaciesList]
  );

  const renderPharmaciesList = () =>
    pharmaciesList.map((item, index) => (
      <LocationCard
        isSelectable
        key={item.id}
        index={index}
        locationData={item}
        onPress={onPressLocation}
        isSelected={selectedParmacy?.id === item.id}
        phoneNumberIsDisabled
      />
    ));

  return (
    <View style={styles.container}>
      <SearchInput
        maxLength={5} // remove when search by city and state will be available
        value={searchValue}
        onChange={onChange}
        keyboardType='number-pad' // remove when search by city and state will be available
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        label={!!searchValue && t(`${translationPath}.inputPlaceholder`)}
        placeholder={t(`${translationPath}.inputPlaceholder`)}
      />
      <ScrollView style={styles.scrollView}>{renderPharmaciesList()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputContainer: {
    // marginTop: 19,
    // marginHorizontal: 25,
  },
  input: {
    height: 60,
    borderRadius: 16,
    paddingLeft: 16,
    fontSize: fonts.sizeLarge,
  },
  scrollView: {
    marginVertical: 10,
  },
});

export default PharmacySelectionComp;

/*
props======
selectedParmacy: object with selected pharmacy
setSelectedParmacy: callback to save selected pharmacy
pharmaciesList: array with  pharmacies
eligibilityFormUserInfo: userinfo from store
zipcode: nubmer with prefilled zipcode from parent comp
exmaple =======
    <PharmacySelectionComp
        selectedParmacy={selectedParmacy}
        setSelectedParmacy={setSelectedParmacy}
        pharmaciesList={pharmaciesList}
        eligibilityFormUserInfo={eligibilityFormUserInfo}
        zipcode={zipcode}
      />
*/
