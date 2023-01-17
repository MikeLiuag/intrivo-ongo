import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PaxFlowWrapper from './components/PaxFlowWrapper';
import { setBreastFeedingStatus } from '../../store/paxlovid/slice';
import SingleSelectQuestion from '../../components/SingleSelectQuestion';
import paxStyles, { dimensions } from './styles';
import { LogEvent } from '../../analytics';
import { iso8601ToFormatted } from '../../utilis/dateTime';
import ArrowDown from '../../components/Svg/arrowDown';
import {
  convertDateObjectToDateString,
  convertDateStringToLocalTimezoneObject,
} from '../../helpers/functions';
import { fonts } from '../../theme/fonts';
import { colors } from '../../theme';

const translationPath = 'paxlovid.eligibility';
const DATE_FORMAT = 'MMMM dd, yyyy';
const DEFAULT_DATE = format(new Date(), 'yyyy-MM-dd');

function EligibilityFormBreastFeeding({ navigation }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const options = [
    t(`${translationPath}.pregnantSelect.options.0`),
    t(`${translationPath}.pregnantSelect.options.1`),
    t(`${translationPath}.pregnantSelect.options.2`),
    t(`${translationPath}.pregnantSelect.options.3`),
  ];
  const [breastFeeding, setBreastFeeding] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [lastMenstrualPeriodDate, setLastMenstrualPeriodDate] = useState(null);

  useEffect(() => {
    LogEvent('PE_Pregnancy_screen');
  }, []);

  const validationCheck = () => {
    if (breastFeeding && breastFeeding !== options[0] && lastMenstrualPeriodDate === null) {
      return true;
    }
    if (breastFeeding === null) {
      return true;
    }
    return false;
  };

  const onPressNext = () => {
    LogEvent('PE_Pregnancy_Click_Next');
    const data = {
      status: breastFeeding === options[0] || breastFeeding === options[2],
      date: lastMenstrualPeriodDate,
    };
    dispatch(setBreastFeedingStatus(data));
    navigation.navigate('EligibilityMedicationStatus');
  };

  const onExitFromPaxFlow = () => {
    LogEvent('PE_Pregnancy_Click_Close');
  };

  const onBack = () => LogEvent('PE_Pregnancy_Click_Back');

  const onDateChange = (selectedDate) => {
    const dateFormatted = convertDateObjectToDateString(selectedDate);
    setShowDatePicker(false);
    setLastMenstrualPeriodDate(dateFormatted);
  };

  return (
    <PaxFlowWrapper
      onExit={onExitFromPaxFlow}
      onBack={onBack}
      onPressButton={onPressNext}
      buttonTitle='paxlovid.eligibility.vaccinationStatus.submit'
      buttonDisabled={validationCheck()}
    >
      <ScrollView>
        <SingleSelectQuestion
          title={t(`${translationPath}.pregnantSelect.title`)}
          containerStyle={paxStyles.content}
          options={options}
          selected={breastFeeding}
          onSelected={(option) => setBreastFeeding(option)}
        />
        {breastFeeding && breastFeeding !== options[0] ? (
          <View style={{ marginHorizontal: 24 }}>
            <Text style={styles.label}>{t(`${translationPath}.pregnantSelect.periodDate`)}</Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => {
                setShowDatePicker(true);
              }}
            >
              <Text allowFontScaling={false} style={styles.inputValue}>
                {lastMenstrualPeriodDate
                  ? iso8601ToFormatted(lastMenstrualPeriodDate, DATE_FORMAT)
                  : ''}
              </Text>
              <ArrowDown style={styles.inputArrow} />
              <Text
                allowFontScaling={false}
                style={[styles.inputLabel, lastMenstrualPeriodDate && styles.placeholderLabel]}
              >
                {t('paxlovid.eligibility.userInfo.date')}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              textColor='#000'
              open={showDatePicker}
              date={convertDateStringToLocalTimezoneObject(DEFAULT_DATE)}
              onConfirm={onDateChange}
              onCancel={() => {
                setShowDatePicker(false);
              }}
              mode='date'
              maximumDate={new Date()}
            />
          </View>
        ) : null}
      </ScrollView>
    </PaxFlowWrapper>
  );
}

export default EligibilityFormBreastFeeding;

const styles = StyleSheet.create({
  symptomsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  symptomsHeaderText: {
    fontFamily: fonts.familyBold,
    color: colors.black,
    fontSize: 24,
    lineHeight: 36,
  },
  symptomsEditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  edit: {
    color: colors.primaryBlue,
    fontFamily: fonts.familyBold,
  },
  label: {
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyNormal,
    color: colors.greyDark2,
  },
  infoValue: {
    color: colors.greyMed,
    fontFamily: fonts.familyLight,
  },
  border: {
    width: '100%',
    height: 1,
    marginVertical: 24,
    backgroundColor: colors.secondaryButtonBorder,
  },

  inputLabel: {
    position: 'absolute',
    left: wp('3.5%'),
    top: Platform.OS === 'ios' ? '10.3%' : '15%',
    color: '#999',
    fontSize: fonts.sizeSmall,
  },
  placeholderLabel: {
    top: 10,
  },
  inputContainer: {
    borderRadius: 16,
    height: 68,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.greyLight,
    marginTop: 10,
    marginBottom: 15,
    borderWidth: 1,
    backgroundColor: colors.greyWhite,
  },
  inputValue: {
    position: 'absolute',
    left: '4%',
    top: Platform.OS === 'ios' ? '56%' : '49%',
    fontSize: fonts.sizeLarge,
  },
  symptomButton: {
    margin: 0,
    marginBottom: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderBottomColor: null,
    borderColor: '#EFEFEF',
    backgroundColor: colors.greyWhite,
  },
  symptomTitle: {
    color: colors.greyDark2,
  },
  buttonPrimary: {
    marginTop: 20,
    marginBottom: dimensions.pageMarginVertical,
  },
  buttonPrimaryTitle: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyWhite,
  },
  inputArrow: { position: 'absolute', right: '4%' },
  patientItemTopContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  patientItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    color: colors.greyMed,
    fontFamily: fonts.familyBold,
  },
});
