import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../../theme';
import {
  convertDateStringToLocalTimezoneObject,
  convertDateObjectToDateString,
  DEFAULT_DOB,
} from '../../helpers/functions';
import ArrowDown from '../../components/Svg/arrowDown';
import { BlueButton } from '../../components/Buttons/BlueButton';
import SelectButton from '../../components/Buttons/SelectButton';
import { setUserInfo } from '../../store/paxlovid/slice';
import PaxFlowWrapper from './components/PaxFlowWrapper';
import paxlovidStyles, { dimensions } from './styles';
import { fonts } from '../../theme/fonts';
import { iso8601ToFormatted } from '../../utilis/dateTime';
import { SYMPTOMS } from './constants';
import { LogEvent } from '../../analytics';

const SymptomSelection = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { observationSymptoms, eligibilityFormUserInfo } = useSelector((state) => state.paxlovid);

  const [datePickerType, setDatePickerType] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const [data, setData] = useState({
    symptoms:
      SYMPTOMS.filter((s) =>
        observationSymptoms?.map((i) => i.replace(/\n/g, ' '))?.includes(s.displayName)
      ) || [],
    symptomsBeginDate: eligibilityFormUserInfo.symptomsBeginDate,
    lastPositiveDate: eligibilityFormUserInfo.lastPositiveDate,
  });

  const DEFAULT_DATE = format(new Date(), 'yyyy-MM-dd');
  const DATE_FORMAT = 'MMMM dd, yyyy';

  const getStartDate = () => {
    let startDate = DEFAULT_DATE;
    if (datePickerType === 'dob') {
      startDate = data.dob || DEFAULT_DOB;
    } else if (datePickerType === 'symptom_start_date') {
      startDate = data.symptomsBeginDate || DEFAULT_DATE;
    } else if (datePickerType === 'last_positive_date') {
      startDate = data.lastPositiveDate || DEFAULT_DATE;
    }
    return startDate;
  };

  const onDateChange = (selectedDate) => {
    const dateFormatted = convertDateObjectToDateString(selectedDate);
    setShowDatePicker(false);
    if (datePickerType === 'dob') {
      setData((s) => ({ ...s, dob: dateFormatted }));
    } else if (datePickerType === 'symptom_start_date') {
      setData((s) => ({ ...s, symptomsBeginDate: dateFormatted }));
    } else {
      setData((s) => ({ ...s, lastPositiveDate: dateFormatted }));
    }
  };

  const onSymptomChecked = (symptom) => {
    if (symptom.name === 'none_of_the_above') {
      setData((s) => ({ ...s, symptoms: [] }));
    } else {
      const checkedSymptoms = [...data.symptoms];
      if (checkedSymptoms.includes(symptom)) {
        checkedSymptoms.splice(checkedSymptoms.indexOf(symptom), 1);
      } else {
        checkedSymptoms.push(symptom);
      }
      setData((s) => ({ ...s, symptoms: checkedSymptoms }));
    }
  };

  const onPressNext = () => {
    LogEvent('PE_Basicinfo_Click_Next');
    dispatch(setUserInfo({ ...eligibilityFormUserInfo, ...data }));
    navigation.navigate('EligibilityVaccinationStatus');
  };

  const onExitFromPaxFlow = () => {
    LogEvent('PE_Basicinfo_Click_Close');
  };

  const renderSelection = (item) => {
    const isNone = item.name === 'none_of_the_above';
    return (
      <SelectButton
        title={item.displayName}
        buttonStyle={styles.symptomButton}
        titleStyle={styles.symptomTitle}
        checkmark={!isNone}
        active={isNone ? data.symptoms.length === 0 : data.symptoms.includes(item)}
        action={() => onSymptomChecked(item)}
      />
    );
  };

  const onBack = () => LogEvent('PE_Basicinfo_Click_Back');

  return (
    <PaxFlowWrapper onExit={onExitFromPaxFlow} onBack={onBack}>
      <ScrollView style={paxlovidStyles.content} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.symptomsHeader}>
          <Text style={styles.symptomsHeaderText}>
            {t('paxlovid.eligibility.userInfo.patientSymptomsHeader')}
          </Text>
        </View>

        {isEditing ? (
          <View>
            {SYMPTOMS.map(renderSelection)}
            <Text style={styles.label}>
              {t('paxlovid.eligibility.userInfo.patientSymptomStartPlaceholder')}
            </Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => {
                setDatePickerType('symptom_start_date');
                setShowDatePicker(true);
              }}
            >
              <Text allowFontScaling={false} style={styles.inputValue}>
                {iso8601ToFormatted(data.symptomsBeginDate, DATE_FORMAT)}
              </Text>
              <ArrowDown style={styles.inputArrow} />
              <Text
                allowFontScaling={false}
                style={[styles.inputLabel, !data.symptomsBeginDate && styles.placeholderLabel]}
              >
                {t('paxlovid.eligibility.userInfo.date')}
              </Text>
            </TouchableOpacity>
            <Text style={styles.label}>
              {t('paxlovid.eligibility.userInfo.patientSymptomLastPositivePlaceholder')}
            </Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => {
                setDatePickerType('last_positive_date');
                setShowDatePicker(true);
              }}
            >
              <Text allowFontScaling={false} style={styles.inputValue}>
                {data.lastPositiveDate
                  ? iso8601ToFormatted(data.lastPositiveDate, DATE_FORMAT)
                  : ''}
              </Text>
              <ArrowDown style={styles.inputArrow} />
              <Text
                allowFontScaling={false}
                style={[styles.inputLabel, !data.lastPositiveDate && styles.placeholderLabel]}
              >
                {t('paxlovid.eligibility.userInfo.date')}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              textColor='#000'
              open={showDatePicker}
              date={convertDateStringToLocalTimezoneObject(getStartDate())}
              onConfirm={onDateChange}
              onCancel={() => {
                setShowDatePicker(false);
              }}
              mode='date'
              maximumDate={new Date()}
            />
          </View>
        ) : (
          <View>
            <View style={styles.symptomsEditHeader}>
              <Text style={styles.label}>{t('paxlovid.eligibility.userInfo.patientSymptoms')}</Text>
              {!isEditing && (
                <Pressable onPress={setEditing}>
                  <Text style={styles.edit}>{t('paxlovid.eligibility.userInfo.edit')}</Text>
                </Pressable>
              )}
            </View>
            {data.symptoms.length > 0 ? (
              <>
                {data.symptoms.map((item) => (
                  <Text style={styles.infoValue}>{`•  ${item.displayName}`}</Text>
                ))}
                <View style={styles.patientItemTopContainer}>
                  <Text style={styles.infoLabel}>
                    {t('paxlovid.eligibility.userInfo.patientSymptomStart')}
                  </Text>
                  <Text style={styles.infoValue}>
                    {iso8601ToFormatted(data.symptomsBeginDate, DATE_FORMAT) ??
                      t('paxlovid.eligibility.userInfo.dateNotAvailable')}
                  </Text>
                </View>
                <View style={styles.patientItemContainer}>
                  <Text style={styles.infoLabel}>
                    {t('paxlovid.eligibility.userInfo.patientSymptomLastPositive')}
                  </Text>
                  <Text style={styles.infoValue}>
                    {iso8601ToFormatted(data.lastPositiveDate, DATE_FORMAT)}
                  </Text>
                </View>
              </>
            ) : (
              <Text style={styles.infoLabel}>{t('paxlovid.eligibility.userInfo.noSymptom')}</Text>
            )}
          </View>
        )}
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <BlueButton
            title={t('paxlovid.eligibility.userInfo.submit')}
            action={onPressNext}
            style={styles.buttonPrimary}
            styleText={styles.buttonPrimaryTitle}
          />
        </View>
      </ScrollView>
    </PaxFlowWrapper>
  );
};

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
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
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
    top: null,
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

export default SymptomSelection;
