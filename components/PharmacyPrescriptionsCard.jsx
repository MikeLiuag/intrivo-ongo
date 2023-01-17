import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, Image, Linking, Pressable } from 'react-native';
import { Divider, CheckBox } from 'react-native-elements';
import { parse, format } from 'date-fns';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import { BlueButton } from './Buttons/BlueButton';
import { isCurrentTimeBetween, iso8601ToFormatted, formats } from '../utilis/dateTime';
import { formatPhoneNumber } from '../utilis/strings';
import MedicationIcon from '../assets/svgs/medication.svg';
import { openMap } from '../utilis/link';

const mapViewIcon = require('../assets/map_view.png');

const PharmacyPrescriptionsCard = ({
  pharmacy,
  prescriptions,
  onScheduleDelivery,
  onTrackDelivery,
}) => {
  const { t } = useTranslation();
  const [selectedPrescriptions, setSelectedPrescriptions] = useState({});

  const {
    location: {
      address_1: address1 = '',
      address_2: address2 = '',
      city = '',
      state = '',
      country_code: countryCode = 'US',
    } = {},
  } = pharmacy || {};

  const schedulablePrescriptions = prescriptions.filter((p) => !p.delivery_job?.data);

  const onCheckChanged = (prescription) => {
    if (selectedPrescriptions[prescription?.id]) {
      const newRes = selectedPrescriptions;
      delete newRes[prescription?.id];
      setSelectedPrescriptions({
        ...newRes,
      });
    } else {
      setSelectedPrescriptions({
        ...selectedPrescriptions,
        [prescription?.id]: {
          id: prescription?.id,
          name: prescription?.product_name,
        },
      });
    }
  };

  const PrescriptionCard = ({ prescription }) => {
    const deliveryJob = prescription.delivery_job?.data;
    return (
      <View style={styles.prescriptionCard}>
        <View style={styles.iconContainer}>
          <MedicationIcon />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{prescription.product_name}</Text>
          <Text style={styles.description}>{`Prescribed on: ${iso8601ToFormatted(
            prescription.authored_on,
            formats.shortDate
          )}`}</Text>
        </View>
        {!deliveryJob ? (
          <CheckBox
            checkedIcon='check-square'
            checkedColor='#2A4D9B'
            checked={selectedPrescriptions[prescription.id]}
            onPress={() => onCheckChanged(prescription)}
          />
        ) : (
          <Pressable style={styles.trackCta} onPress={() => onTrackDelivery(deliveryJob)}>
            <Text style={styles.trackText}>Track</Text>
          </Pressable>
        )}
      </View>
    );
  };

  const opensAt = '08:00';
  const displayedOpensAt = format(parse(opensAt, 'HH:mm', new Date()), 'h a');

  const closesAt = '16:00';
  const displayedClosesAt = format(parse(closesAt, 'HH:mm', new Date()), 'h a');

  const isScheduleAvailable = isCurrentTimeBetween(opensAt, closesAt);

  const onScheduleDeliveryClick = () => {
    onScheduleDelivery(selectedPrescriptions);
  };

  return (
    <View style={styles.pharmacyPrescriptions}>
      <View style={styles.pharmacyCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{pharmacy.name}</Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(`tel:${formatPhoneNumber(pharmacy.phone_number)}`)}
          >
            {formatPhoneNumber(pharmacy.phone_number)}
          </Text>
          <Text style={styles.description}>{`${address1}, ${city}, ${state}`}</Text>
        </View>
        <Pressable
          onPress={() => {
            openMap({
              address1,
              address2,
              city,
              state,
              country: countryCode,
            });
          }}
        >
          <Image source={mapViewIcon} style={styles.mapViewIcon} />
        </Pressable>
      </View>

      <Divider orientation='horizontal' color={colors.greyGrey} />
      {prescriptions.map((p) => (
        <PrescriptionCard prescription={p} />
      ))}
      {schedulablePrescriptions.length > 0 && (
        <>
          <Divider orientation='horizontal' color={colors.greyGrey} />
          <BlueButton
            title={t('Schedule delivery')}
            action={onScheduleDeliveryClick}
            style={styles.buttonContainer}
            disabled={!isScheduleAvailable || Object.keys(selectedPrescriptions).length === 0}
            styleText={styles.buttonPrimaryTitle}
          />
          <Text style={styles.avalailabilityText}>
            {`Delivery requests available between ${displayedOpensAt} and ${displayedClosesAt} local time`}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    lineHeight: 24,
  },
  description: {
    maxWidth: 280,
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeSmall,
    lineHeight: 20,
  },
  link: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeSmall,
    lineHeight: 22,
    color: colors.primaryBlue,
  },
  trackCta: {
    width: 48,
    alignContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  trackText: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    color: colors.primaryBlue,
  },
  pharmacyPrescriptions: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
  },
  pharmacyCard: {
    padding: 16,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  mapViewIcon: {
    width: 48,
    height: 48,
  },
  prescriptionCard: {
    padding: 16,
    paddingRight: 4,
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F2F7F9',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
  },
  buttonContainer: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
  buttonPrimaryTitle: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyWhite,
  },
  avalailabilityText: {
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: fonts.familyLight,
    color: colors.greyGrey,
    fontSize: fonts.sizeSmall,
    paddingHorizontal: 25,
  },
});

export default PharmacyPrescriptionsCard;
