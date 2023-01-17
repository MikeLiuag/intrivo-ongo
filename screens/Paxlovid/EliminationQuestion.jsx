import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import PaxFlowWrapper from './components/PaxFlowWrapper';
import paxStyles, { dimensions } from './styles';
import { LogEvent } from '../../analytics';
import { ELIMINATION_DISEASE } from './constants';
import SelectButton from '../../components/Buttons/SelectButton';
import { colors } from '../../theme';
import { fonts } from '../../theme/fonts';

function EliminationQuestion({ navigation }) {
  const { t } = useTranslation();

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    LogEvent('PE_ElimQues_screen');
  }, []);

  const onPressNext = () => {
    LogEvent('PE_ElimQues_Click_Next');
    if (selected !== 'none_of_the_above') {
      navigation.navigate('CareOptionsContainer', {
        careOptionsType: 'paxlovid_alternative_treatment',
        translationsPath: 'paxlovid.alternativeTreatment',
        type: 'Elimination',
        analyticsName: 'PE_ElimWarn',
      });
    } else {
      navigation.navigate('EligibilityFormUserInfo');
    }
  };

  const onExitFromPaxFlow = () => LogEvent('PE_ElimQues_Click_Close');

  const onBack = () => LogEvent('PE_ElimQues_Click_Back');

  return (
    <PaxFlowWrapper
      onPressButton={onPressNext}
      buttonTitle='paxlovid.eligibility.medicationStatus.submit'
      buttonDisabled={selected === null}
      headerTitle={' '}
      onExit={onExitFromPaxFlow}
      onBack={onBack}
    >
      <View styles={paxStyles.content}>
        <Text style={styles.statusSubtitle}>{t('paxlovid.elimanation.title')}</Text>
        {ELIMINATION_DISEASE.map((item) => (
          <SelectButton
            title={item.displayName}
            buttonStyle={styles.selectButton}
            titleStyle={styles.selectButtonTitle}
            active={selected === item.name}
            action={() => setSelected(item.name)}
          />
        ))}
      </View>
    </PaxFlowWrapper>
  );
}

export default EliminationQuestion;

const styles = StyleSheet.create({
  statusSubtitle: {
    fontSize: 24,
    fontFamily: fonts.familyBold,
    color: colors.black,
    lineHeight: 36,
    marginVertical: 20,
    marginHorizontal: dimensions.pageMarginHorizontal,
  },
  selectButton: {
    margin: 0,
    marginBottom: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderBottomColor: null,
    borderColor: '#EFEFEF',
    backgroundColor: colors.greyWhite,
    marginHorizontal: dimensions.pageMarginHorizontal,
  },
  selectButtonTitle: {
    color: colors.greyDark2,
  },
});
