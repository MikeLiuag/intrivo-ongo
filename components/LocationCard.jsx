/* eslint-disable camelcase */
import React from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import { formatPhoneNumber } from '../utilis/strings';

const LocationCard = ({
  index,
  onPress,
  isSelected,
  isSelectable,
  renderFooter,
  locationData,
  containerStyle,
  pharmacyNameStyle,
  phoneNumberIsDisabled,
}) => {
  const { address_line_1, address_line_2, city, name, state, zipcode, phone_number, id } =
    locationData;
  const hasStateOrCityOrZipcode = state || city || zipcode;

  const onPressPhoneNumber = () => Linking.openURL(`tel:${formatPhoneNumber(phone_number)}`);

  const renderNumber = () =>
    isSelectable && (
      <View style={styles.numberContainer}>
        <Text style={styles.numberText}>{index + 1}</Text>
      </View>
    );

  const renderSelectedIndicator = () => isSelected && <View style={styles.selectedIndicator} />;

  return (
    <TouchableOpacity
      disabled={!isSelectable}
      onPress={() => onPress(id, isSelected)}
      style={[
        styles.pickupLocationCard,
        isSelectable && { paddingLeft: isSelected ? 0 : 18 },
        containerStyle,
      ]}
    >
      <View style={styles.row}>
        {renderSelectedIndicator()}
        {renderNumber()}
        <View style={styles.locationInfoContainer}>
          <Text style={[styles.pharmacyName, pharmacyNameStyle]}>{name}</Text>
          {address_line_1 && <Text style={styles.addressText}>{address_line_1}</Text>}
          {!!address_line_2 && <Text style={styles.addressText}>{address_line_2}</Text>}
          {hasStateOrCityOrZipcode && (
            <Text style={styles.addressText}>
              {city ? `${city}, ` : ''}
              {state || ''} {zipcode || ''}
            </Text>
          )}
          {phone_number && !phoneNumberIsDisabled && (
            <Pressable onPress={onPressPhoneNumber}>
              <Text style={styles.phoneNumber}>{formatPhoneNumber(phone_number)}</Text>
            </Pressable>
          )}
        </View>
      </View>
      {renderFooter?.()}
    </TouchableOpacity>
  );
};

export default LocationCard;

const styles = StyleSheet.create({
  pickupLocationCard: {
    minHeight: 113,
    marginTop: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.greyExtraLight2,
  },
  row: { flexDirection: 'row', flex: 1 },
  locationInfoContainer: {
    paddingVertical: 21,
    paddingHorizontal: 24,
    flex: 1,
  },
  pharmacyName: {
    fontFamily: fonts.familyBold,
    fontSize: 16,
    lineHeight: 20,
  },
  addressText: {
    fontFamily: fonts.familyLight,
    lineHeight: 20,
  },
  phoneNumber: {
    fontFamily: fonts.familyNormal,
    color: colors.primaryBlue,
    lineHeight: 20,
    marginTop: 5,
  },
  imageContainer: {
    padding: 16,
    marginRight: -24,
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: 4,
  },
  numberContainer: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: colors.primaryRed,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -10,
    marginLeft: 12,
    marginTop: 17,
  },
  numberText: {
    color: colors.white,
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeLarge,
  },
  selectedIndicator: {
    // height: '100%',
    width: 18,
    backgroundColor: colors.primaryBlue,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  spacer: {
    width: 18,
    backgroundColor: colors.primaryBlue,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
});
