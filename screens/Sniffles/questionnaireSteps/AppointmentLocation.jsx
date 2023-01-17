import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { BlueButton } from '../../../components/Buttons/BlueButton';
import LocationForm from '../../../components/LocationForm';
import { snifflesFieldNames } from '../../../store/sniffles/slice';
import styles from '../styles';

const AppointmentLocation = ({
  onChangeState,
  userLocation: { address_1: address1, address_2: address2, city, state_id: stateId, zipcode } = {},
  userId,
}) => {
  const { t } = useTranslation();

  const { usersLookup } = useSelector(({ user }) => user);
  const userCurrentLocation = userId ? usersLookup[userId].location : {};
  const [checked, setChecked] = useState(false);

  const [location, setLocation] = useState({
    address_1: address1 || userCurrentLocation.address_1,
    address_2: address2 || userCurrentLocation.address_2,
    city: city || userCurrentLocation.city,
    state_id: stateId || userCurrentLocation.state,
    zipcode: zipcode || userCurrentLocation.zipcode,
  });

  const onPressNext = () => {
    if (checked) {
      Alert.alert(
        t(`screens.medicationFlow.userInfo.alertTitle`),
        t(`screens.medicationFlow.userInfo.alertMessage`),
        [
          {
            text: t('yesNo.Yes'),
            onPress: () => {
              onChangeState(location, snifflesFieldNames.USER_LOCATION, true);
              updateUserAddress();
            },
          },
          {
            text: t('yesNo.No'),
            style: 'cancel',
            onPress: () => {
              onChangeState(location, snifflesFieldNames.USER_LOCATION, true);
            },
          },
        ]
      );
    } else {
      onChangeState(location, snifflesFieldNames.USER_LOCATION, true);
    }
  };

  const updateUserAddress = () => {
    const requestData = {
      uuid: userId,
      state_id: location?.state_id,
      address_1: location?.address_1,
      address_2: location?.address_2,
      city: location?.city,
      zipcode: location?.zipcode,
    };
    onChangeState(requestData, snifflesFieldNames.UPDATE_USER_INFO);
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.subtitle}>{t('screens.sniffles.questions.location.subtitle')}</Text>
          <LocationForm
            data={location}
            setData={setLocation}
            checked={checked}
            setChecked={setChecked}
          />
        </View>
        <BlueButton
          style={styles.bottomButton}
          title='Next'
          disabled={
            !location.address_1 || !location.city || !location.state_id || !location.zipcode
          }
          action={onPressNext}
        />
      </ScrollView>
    </>
  );
};

export default AppointmentLocation;
