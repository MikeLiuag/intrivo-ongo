import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../theme';
import PaxFlowWrapper from './components/PaxFlowWrapper';
import { setMedications } from '../../store/paxlovid/slice';
import { fonts } from '../../theme/fonts';
import { dimensions } from './styles';
import { LogEvent } from '../../analytics';
import AddMedications from '../Medication/components/AddMedictaions';

const MedicationSelect = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { selectedMedications } = useSelector((state) => state.paxlovid);
  const [medications, setMedication] = useState(
    selectedMedications?.length > 0
      ? selectedMedications?.map((val) => ({ name: val }))
      : [{ name: '' }]
  );

  useEffect(() => {
    LogEvent('PE_Medinfo2_screen');
  }, []);

  const onPressNext = () => {
    LogEvent('PE_Medinfo2_Click_Next');
    const data = medications.filter((r) => r?.name).map((r) => r.name);
    dispatch(setMedications(data));
    navigation.navigate('EligibilityFormAllergy');
  };

  const onExitFromPaxFlow = () => {
    LogEvent('PE_Medinfo2_Click_Close');
  };

  const onBack = () => LogEvent('PE_Medinfo2_Click_Back');

  const isDisabled =
    !medications || medications?.length === 0 || medications?.filter((r) => r?.name).length === 0;
  return (
    <PaxFlowWrapper
      onExit={onExitFromPaxFlow}
      onBack={onBack}
      onPressButton={onPressNext}
      buttonDisabled={isDisabled}
      buttonTitle='paxlovid.eligibility.userInfo.submit'
      title='paxlovid.eligibility.medicationSelect.medications'
    >
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>{t('paxlovid.eligibility.medicationSelect.title')}</Text>
        <AddMedications
          data={medications}
          onChange={(item) => {
            setMedication([...item]);
          }}
          placeholder={t('screens.medicationFlow.typical.placeholder.medication')}
          addButtonTitle={t('screens.medicationFlow.buttons.addMedication')}
        />
      </View>
    </PaxFlowWrapper>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 18,
    marginHorizontal: dimensions.pageMarginHorizontal,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 25,
  },
  keysContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medicationContainer: {
    flex: 1,
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    marginTop: 16,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.secondaryButtonBorder,
    paddingRight: 25,
  },
  medicationText: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
    color: colors.greyDark2,
  },
  keyText: {
    fontFamily: fonts.familyBold,
    color: colors.primaryBlue,
  },
  radioButton: {
    margin: 0,
    marginTop: 16,
    borderWidth: 1,
    paddingLeft: 18,
    borderRadius: 16,
    justifyContent: 'center',
    backgroundColor: colors.greyWhite,
    borderColor: colors.secondaryButtonBorder,
  },
  radioButtonTitle: {
    color: colors.greyDark2,
  },
  selectIndicator: {
    height: '100%',
    width: 18,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: colors.primaryBlue,
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: colors.secondaryButtonBorder,
  },
  medicationTextContainer: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.familyBold,
    color: colors.black,
    lineHeight: 36,
    marginTop: 20,
  },
  subTitle: {
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyLight,
    color: colors.greyMed,
    lineHeight: 22,
    marginHorizontal: 20,
  },
});

export default MedicationSelect;
