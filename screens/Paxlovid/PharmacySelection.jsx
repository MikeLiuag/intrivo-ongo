/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPharmacy } from '../../store/paxlovid/slice';
import PaxFlowWrapper from './components/PaxFlowWrapper';
import { LogEvent } from '../../analytics';
import PharmacySelectionComp from '../../components/PharmacySelectionComp';
import { dimensions } from './styles';

const translationPath = 'paxlovid.eligibility.pharmacySelection';

const PharmacySelection = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [selectedParmacy, setSelectedParmacy] = useState(null);
  const { pharmaciesList, eligibilityFormUserInfo } = useSelector(({ paxlovid }) => paxlovid);

  useEffect(() => {
    LogEvent('PE_Pharmacyselector_screen');
  }, []);

  const onPressChooseLocation = () => {
    LogEvent('PE_Pharmacyselector_Click_Chooselocation');
    dispatch(setSelectedPharmacy(selectedParmacy));
    navigation.navigate('EligibilityFormTermsConsent');
  };

  const onExitFromPaxFlow = () => LogEvent('PE_Pharmacyselector_Click_Close');

  const onBack = () => LogEvent('PE_Pharmacyselector_Click_Back');

  return (
    <PaxFlowWrapper
      onExit={onExitFromPaxFlow}
      onBack={onBack}
      buttonDisabled={!selectedParmacy}
      onPressButton={onPressChooseLocation}
      title={t(`${translationPath}.title`)}
      subtitle={t(`${translationPath}.subtitle`)}
      buttonTitle={t(`${translationPath}.buttonTitle`)}
    >
      <View style={{ paddingHorizontal: dimensions.pageMarginHorizontal, marginTop: 10, flex: 1 }}>
        <PharmacySelectionComp
          selectedParmacy={selectedParmacy}
          setSelectedParmacy={setSelectedParmacy}
          pharmaciesList={pharmaciesList}
          eligibilityFormUserInfo={eligibilityFormUserInfo}
        />
      </View>
    </PaxFlowWrapper>
  );
};

export default PharmacySelection;
