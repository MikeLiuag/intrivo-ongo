import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, ScrollView, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import { getUserPrescriptionsList } from '../store/user/slice';
import ScreenWrapper from './ScreenWrapper';
import PharmacyPrescriptionsCard from '../components/PharmacyPrescriptionsCard';
import PickerDropdown from '../components/Picker';
import { parseHtmlForTags } from '../helpers/functions';
import { formatPhoneNumber } from '../utilis/strings';
import { LogEvent } from '../analytics';

const analyticName = 'Presciptions_DeliveryInfo';

function PrescriptionList({ navigation }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { users, usersLookup } = useSelector((state) => state.user);
  const { aptPhoneNumber } = useSelector((s) => s.app);

  const [selectedUuid, setSelectedUuid] = useState(users?.[0] || null);
  const pickerUsers = users.map((u) => ({
    label: `${usersLookup[u].first_name} ${usersLookup[u].last_name}`,
    value: u,
  }));
  const [pharmacyPrescriptions, setPharmacyPrescriptions] = useState();

  useEffect(() => {
    LogEvent('ProfilePrescriptions_screen');
  }, []);

  useEffect(() => {
    dispatch(getUserPrescriptionsList(selectedUuid))
      .unwrap()
      .then((result) => {
        setPharmacyPrescriptions(result);
      });
  }, [selectedUuid, dispatch]);

  const onScheduleDelivery = ({ pharmacy, selectedPrescriptions }) => {
    const data = Object.keys(selectedPrescriptions)?.map((r) => ({
      ...selectedPrescriptions[r],
      product_type: 'prescription',
    }));
    navigation.navigate('ScheduleDelivery', {
      userId: selectedUuid,
      pharmacy: pharmacy || {},
      prescriptions: data,
      analyticName,
    });
  };

  const onTrackDelivery = (deliveryJob) => {
    navigation.navigate('DeliveryStatus', {
      userId: selectedUuid,
      deliveryData: deliveryJob,
      deliveryId: deliveryJob.id,
    });
  };

  const phone = aptPhoneNumber.replace(/[^0-9]/g, '');
  const phoneDisplay = formatPhoneNumber(phone);

  const handleBack = () => {
    LogEvent('ProfilePrescriptions_click_Close');
    navigation.goBack();
  };

  return (
    <ScreenWrapper title={t('prescriptionList.title')} onExit={handleBack}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <PickerDropdown
          value={selectedUuid}
          items={pickerUsers}
          onChange={(value) => {
            setSelectedUuid(value);
          }}
          allowEmpty={false}
        />
        {pharmacyPrescriptions &&
          Object.keys(pharmacyPrescriptions).map((k) => {
            const { pharmacy, prescriptions } = pharmacyPrescriptions[k];
            return (
              pharmacy &&
              prescriptions && (
                <PharmacyPrescriptionsCard
                  pharmacy={pharmacy}
                  prescriptions={prescriptions}
                  onScheduleDelivery={(selectedPrescriptions) =>
                    onScheduleDelivery({ pharmacy, selectedPrescriptions })
                  }
                  onTrackDelivery={onTrackDelivery}
                />
              )
            );
          })}
        <Text style={styles.footer} onPress={() => Linking.openURL(`tel:${phone}`)}>
          {parseHtmlForTags(
            t('prescriptionList.footer', { phone, phone_display: phoneDisplay })
          ).map((e) => {
            if (e.name === 'a') {
              return <Text style={styles.link}>{e.child}</Text>;
            }
            return <Text>{e.child}</Text>;
          })}
        </Text>
      </ScrollView>
    </ScreenWrapper>
  );
}

export default PrescriptionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.primaryGhost,
  },
  scrollViewContent: {
    padding: 24,
  },
  prescriptionCard: {
    marginHorizontal: 24,
    marginVertical: 8,
  },
  link: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeSmall,
    color: colors.primaryBlue,
  },
  picker: {
    marginBottom: 16,
  },
  footer: {
    backgroundColor: colors.primaryPavement,
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    fontSize: fonts.sizeSmall,
    color: colors.greyDark,
  },
});
