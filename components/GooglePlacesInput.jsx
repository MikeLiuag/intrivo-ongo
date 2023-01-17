import React, { useEffect, useRef } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import { GOOGLE_PLACE_KEY } from '../utilis/constants';

function GooglePlacesInput({ placeholder = '', value = '', action }) {
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText(value);
  }, [value]);

  const onChangeText = (text = '') => {
    if (text) {
      ref.current?.setAddressText(text);
      action({
        address_1: text,
      });
    }
  };

  const onPress = (data, details = null) => {
    let address1 = '';
    let zipcode;
    let stateId;
    let city;
    let address2 = '';
    details.address_components.forEach((component) => {
      const componentType = component.types[0];

      switch (componentType) {
        case 'street_number': {
          address1 = `${component.long_name} ${address1}`;
          break;
        }
        case 'sublocality_level_1':
        case 'neighborhood': {
          address2 = `${component.long_name} ${address2}`;
          break;
        }
        case 'route':
        case 'archipelago':
        case 'stateId': {
          address1 += component.long_name;
          break;
        }
        case 'postal_code': {
          zipcode = `${component.long_name}`;
          break;
        }
        case 'administrative_area_level_3':
        case 'locality': {
          city = component.long_name;
          break;
        }
        case 'administrative_area_level_1': {
          stateId = component.short_name;
          break;
        }

        default:
          break;
      }
    });
    action({
      address_1: address1,
      address_2: address2,
      state_id: stateId,
      zipcode,
      city,
    });
  };

  return (
    <View style={{ flex: 1, width: '100%', zIndex: 9999999 }}>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={placeholder}
        fetchDetails
        onPress={onPress}
        query={{
          key: GOOGLE_PLACE_KEY,
          language: 'en',
        }}
        listEmptyComponent={null}
        styles={{
          container: {
            flex: 1,
            marginVertical: 10,
            borderColor: colors.secondaryButtonBorder,
            borderWidth: 1,
            borderRadius: 16,
            backgroundColor: colors.white,
          },
          listView: {
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            backgroundColor: colors.white,
          },
          textInputContainer: [
            {
              borderRadius: 16,
              height: hp('7.5%'),
              padding: 5,
              paddingTop: 10,
            },
            value && value.length > 0 ? styles.labelPadding : styles.noLabelPadding,
          ],
          textInput: {
            backgroundColor: colors.greyWhite,
            flex: 1,
            fontSize: 16,
            paddingTop: 20,
          },
          separator: {
            height: 0.5,
            backgroundColor: colors.secondaryButtonBorder,
          },
          row: {
            backgroundColor: '#FFF',
            padding: 13,
            height: 45,
            flexDirection: 'row',
            width: '100%',
            flex: 1,
          },
          poweredContainer: {
            marginBottom: 10,
          },
        }}
        textInputProps={{
          onChangeText,
          clearButtonMode: 'never',
          textContentType: 'streetAddressLine1',
          autoCompleteType: 'street-address',
        }}
        keyboardShouldPersistTaps='handled'
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
        renderRow={(data) => (
          <Text style={{ color: colors.greyMed, fontFamily: fonts.familyNormal }}>
            {data?.description ?? ''}
          </Text>
        )}
      />
      {value && value.length > 0 ? (
        <Text allowFontScaling={false} style={[styles.inputLabel]}>
          {placeholder}
        </Text>
      ) : null}
    </View>
  );
}

export default GooglePlacesInput;

const styles = StyleSheet.create({
  inputLabel: {
    top: 20,
    left: Platform.OS === 'ios' ? wp('3.3%') : wp('4%'),
    position: 'absolute',
    fontSize: 13,
    color: colors.greyGrey,
    zIndex: 999,
  },
  labelPadding: {
    paddingTop: 15,
    paddingBottom: hp('1.5%'),
  },
  noLabelPadding: {
    paddingTop: 5,
    paddingBottom: Platform.OS === 'ios' ? hp('2.75%') : hp('2.25%'),
  },
});
