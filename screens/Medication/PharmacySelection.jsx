import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import PharmacySelectionComp from '../../components/PharmacySelectionComp';
import { snifflesFieldNames } from '../../store/medicationFlow/slice';

const PharmacySelection = ({ selectedPharmacy, onChangeState, userInfo }) => {
  const { pharmaciesList, eligibilityFormUserInfo } = useSelector(({ paxlovid }) => paxlovid);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <PharmacySelectionComp
        selectedParmacy={selectedPharmacy}
        setSelectedParmacy={(option) => onChangeState(option, snifflesFieldNames.SELECTED_PHARMACY)}
        pharmaciesList={pharmaciesList}
        eligibilityFormUserInfo={eligibilityFormUserInfo}
        analyticName='Sniffles_Async_Pharma'
        zipcode={userInfo?.zipcode || ''}
      />
    </ScrollView>
  );
};

export default PharmacySelection;
