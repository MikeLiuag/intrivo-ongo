import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { states } from '../utilis/mock';
import GooglePlacesInput from './GooglePlacesInput';
import InputLeftLabel from './InputLeftLabel';
import PickerDropdown from './Picker';

const LocationForm = ({ data, setData, setChecked, checked }) => {
  const { t } = useTranslation();
  return (
    <>
      <GooglePlacesInput
        placeholder={t('placeholder.address1')}
        value={data.address_1 || ''}
        action={(value) => {
          setData((current) => ({
            ...current,
            ...value,
          }));
        }}
      />
      <InputLeftLabel
        value={data.address_2}
        action={(value) => {
          setData((current) => ({
            ...current,
            address_2: value,
          }));
        }}
        placeholder={t('placeholder.addredd2Optional')}
        textContentType='streetAddressLine2'
        autoCompleteType='street-address'
      />
      <InputLeftLabel
        value={data.city}
        action={(city) => {
          setData((current) => ({ ...current, city }));
        }}
        placeholder={t('placeholder.city')}
        textContentType='addressCity'
        autoCompleteType='street-address'
      />
      <PickerDropdown
        value={data.state_id}
        placeholder={t('placeholder.state')}
        items={states}
        onChange={(value) => setData((current) => ({ ...current, state_id: value }))}
      />
      <InputLeftLabel
        value={data.zipcode}
        action={(zipcode) => {
          setData((current) => ({ ...current, zipcode }));
        }}
        placeholder={t('placeholder.zipCode')}
        autoCompleteType='postal-code'
        textContentType='postalCode'
      />
      {setChecked && (
        <CheckBox
          title={t(`placeholder.saveCheckbox`)}
          containerStyle={styles.checkboxContainer}
          textStyle={[styles.checkboxText]}
          titleProps={{ allowFontScaling: false }}
          checked={checked}
          onPress={() => {
            setChecked(!checked);
          }}
          checkedIcon='check-square'
          checkedColor='#2A4D9B'
        />
      )}
    </>
  );
};

export default LocationForm;

const styles = StyleSheet.create({
  checkboxContainer: {
    margin: 0,
    marginTop: 16,
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  checkboxText: {
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'normal',
  },
});
