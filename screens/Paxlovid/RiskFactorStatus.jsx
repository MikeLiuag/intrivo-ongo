import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import PaxFlowWrapper from './components/PaxFlowWrapper';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { colors } from '../../theme';
import SelectButton from '../../components/Buttons/SelectButton';
import { setRiskFactorStatus } from '../../store/paxlovid/slice';
import { dimensions } from './styles';
import { fonts } from '../../theme/fonts';
import { RISK_FACTORS, RISK_FACTORS_NONE } from './constants';
import { LogEvent } from '../../analytics';

const RiskFactorStatus = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [checkedRiskFactors, setCheckedRiskFactors] = useState([]);

  useEffect(() => {
    LogEvent('PE_Riskfactors_screen');
  }, []);

  const onExitFromPaxFlow = () => {
    LogEvent('PE_Riskfactors_Click_Close');
  };

  const onBack = () => LogEvent('PE_Riskfactors_Click_Back');

  const onRiskFactorChecked = (riskFactor) => {
    if (riskFactor.name === 'none_of_the_above') {
      setCheckedRiskFactors([RISK_FACTORS_NONE]);
      return;
    }
    const selectedRiskFactors = [...checkedRiskFactors];
    if (selectedRiskFactors.includes(riskFactor)) {
      selectedRiskFactors.splice(selectedRiskFactors.indexOf(riskFactor), 1);
      setCheckedRiskFactors(selectedRiskFactors.filter((r) => r.name !== 'none_of_the_above'));
    } else {
      selectedRiskFactors.push(riskFactor);
      setCheckedRiskFactors(selectedRiskFactors.filter((r) => r.name !== 'none_of_the_above'));
    }
  };

  const onNext = () => {
    LogEvent('PE_Riskfactors_Click_Next');
    dispatch(setRiskFactorStatus(checkedRiskFactors));
    navigation.navigate('PharmacySelection');
  };

  return (
    <PaxFlowWrapper onExit={onExitFromPaxFlow} onBack={onBack}>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.statusSubtitle}>
          {t('paxlovid.eligibility.riskFactorStatus.subtitle')}
        </Text>
        {RISK_FACTORS.map((item) => (
          <SelectButton
            title={item.displayName}
            buttonStyle={styles.selectButton}
            titleStyle={styles.selectButtonTitle}
            checkmark={item.name !== 'none_of_the_above'}
            disableLeftBackground={!checkedRiskFactors.includes(item)}
            active={checkedRiskFactors.includes(item)}
            action={() => onRiskFactorChecked(item)}
          />
        ))}
        <View style={styles.footer}>
          <BlueButton
            style={styles.buttonSecondary}
            styleText={styles.buttonSecondaryTitle}
            title={t('paxlovid.eligibility.riskFactorStatus.skip')}
            action={() => {
              LogEvent('PE_Riskfactors_Click_Skip');
              dispatch(setRiskFactorStatus([]));
              navigation.navigate('PharmacySelection');
            }}
          />
          <BlueButton
            style={styles.buttonPrimary}
            styleText={styles.buttonPrimaryTitle}
            title={t('paxlovid.eligibility.riskFactorStatus.submit')}
            disabled={checkedRiskFactors.length === 0}
            action={onNext}
          />
        </View>
      </ScrollView>
    </PaxFlowWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: dimensions.pageMarginHorizontal,
  },
  statusTitle: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyDark2,
    marginTop: dimensions.pageMarginVertical,
  },
  statusSubtitle: {
    fontSize: 24,
    fontFamily: fonts.familyBold,
    color: colors.black,
    lineHeight: 36,
    marginVertical: 20,
  },
  selectButton: {
    margin: 0,
    marginBottom: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderBottomColor: null,
    borderColor: '#EFEFEF',
    backgroundColor: colors.greyWhite,
  },
  selectButtonTitle: {
    color: colors.greyDark2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    marginBottom: dimensions.pageMarginVertical,
  },
  buttonPrimary: {
    flex: 1,
    marginLeft: 8,
  },
  buttonPrimaryTitle: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyWhite,
  },
  buttonSecondary: {
    flex: 1,
    marginRight: 8,
    backgroundColor: colors.greyWhite,
    borderColor: colors.secondaryButtonBorder,
  },
  buttonSecondaryTitle: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyDark2,
  },
});

export default RiskFactorStatus;
