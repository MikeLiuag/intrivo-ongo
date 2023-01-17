import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { BlueButton } from '../../../../components/Buttons/BlueButton';
import PharmacySelectionComp from '../../../../components/PharmacySelectionComp';
import { snifflesFieldNames } from '../../../../store/sniffles/slice';

const Pharmacy = ({ onChangeState, userInfo }) => {
  const [selectedParmacy, setSelectedParmacy] = useState(null);
  const { pharmaciesList, eligibilityFormUserInfo } = useSelector(({ paxlovid }) => paxlovid);

  const onPressNext = () =>
    onChangeState(selectedParmacy, snifflesFieldNames.SELECTED_PHARMACY, true);

  useEffect(() => {
    // LogEvent('EVENT');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.pharmacyContainer}>
        <PharmacySelectionComp
          zipcode={userInfo.zipcode}
          selectedParmacy={selectedParmacy}
          setSelectedParmacy={setSelectedParmacy}
          pharmaciesList={pharmaciesList}
          eligibilityFormUserInfo={eligibilityFormUserInfo}
        />
      </View>
      <BlueButton
        title='Next'
        disabled={!selectedParmacy}
        action={onPressNext}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  pharmacyContainer: { flex: 1 },
  button: { marginTop: 20 },
});

export default Pharmacy;
