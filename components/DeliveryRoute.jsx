/* eslint-disable camelcase */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import { getLocationsFromDeliveryJob } from '../utilis/helpers';

const translationPath = 'paxlovid.deliveryStatus';

const DeliveryRoute = ({ containerStyle, deliveryInfo, isCompleted }) => {
  const { pickUpLocation, dropOffLocation } = getLocationsFromDeliveryJob(deliveryInfo);
  const { t } = useTranslation();

  const renderIndicators = () => {
    const flexDirection = isCompleted ? 'column-reverse' : 'column';
    return (
      <View style={[styles.indicatorsContainer, { flexDirection }]}>
        <View style={styles.point}>
          <View style={styles.innerPoint} />
        </View>
        <View style={styles.indicatorsLine} />
        <View style={styles.point} />
      </View>
    );
  };

  const renderLocations = () =>
    [pickUpLocation, dropOffLocation].map(({ addressLine1, city, state, zipcode }, index) => {
      const isTopLocation = index === 0;

      const title = isTopLocation ? '.pickup' : '.dropoff';

      return (
        <View>
          <Text style={styles.locationTitle}>{t(translationPath + title)}</Text>
          <Text style={styles.locationText}>{addressLine1}</Text>
          <Text style={styles.locationText}>
            {city}, {state} {zipcode}
          </Text>
        </View>
      );
    });

  return (
    <View style={[styles.container, containerStyle]}>
      {renderIndicators()}
      <View style={styles.locationsContainer}>{renderLocations()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 7,
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 32,
  },
  title: {
    fontFamily: fonts.familyBold,
  },
  indicatorsContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  indicatorsLine: {
    width: 1,
    height: '100%',
    backgroundColor: colors.borderGrey,
  },
  point: {
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: colors.primaryGhost,
    borderWidth: 2,
    borderColor: colors.borderGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerPoint: {
    width: 11,
    height: 11,
    borderRadius: 100,
    backgroundColor: colors.primaryBlue,
  },
  locationsContainer: {
    justifyContent: 'space-between',
    height: '100%',
    marginLeft: 16,
  },
  locationTitle: {
    fontFamily: fonts.familyBold,
    lineHeight: 25,
    fontSize: fonts.sizeNormal,
  },
  locationText: {
    fontFamily: fonts.familyNormal,
    color: colors.greyGrey,
    fontSize: fonts.sizeNormal,
  },
});

export default DeliveryRoute;
