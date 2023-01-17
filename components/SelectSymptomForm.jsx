import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import { colors } from '../theme';
import {
  convertDateStringToLocalTimezoneObject,
  convertDateObjectToDateString,
} from '../helpers/functions';
import ArrowDown from './Svg/arrowDown';
import SelectButton from './Buttons/SelectButton';
import { fonts } from '../theme/fonts';
import { formats, iso8601ToFormatted } from '../utilis/dateTime';
import { SYMPTOMS, SYMPTOM_NONE } from '../screens/Paxlovid/constants';
import { dimensions } from '../theme/dimensions';
import ChipsButton from './Buttons/ChipsButton';

const translationPrefix = 'paxlovid.eligibility.userInfo.';

const DEFAULT_DATE = format(new Date(), formats.iso8601);

const initialData = {
  symptoms: null,
  lastPositiveTestDate: DEFAULT_DATE,
  symptomStartDate: '',
};

const SelectSymptomForm = ({
  symptoms,
  symptomStartDate,
  lastPositiveTestDate,
  title,
  editable,
  subtitle,
  onChangeData,
  withLastPositiveTestPicker,
  symptomsList = null,
  buttonType = null,
}) => {
  const { t } = useTranslation();
  const isChips = buttonType === 'chips';
  const [data, setData] = useState({ ...initialData, symptoms, symptomStartDate });
  const [isEditing, setIsEditing] = useState(!!editable || false);
  const [datePickerType, setDatePickerType] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const datePickerValue =
    datePickerType === 'lastPositiveTestDate' ? lastPositiveTestDate : symptomStartDate;

  const handleChangeSymptoms = (newSymptoms) => {
    const newData = { ...data, symptoms: newSymptoms };
    setData(newData);
    onChangeData(newData);
  };

  const handleDateChange = (selectedDate) => {
    const formattedDate = convertDateObjectToDateString(selectedDate);
    const newData = { ...data, [datePickerType]: formattedDate };

    setData(newData);
    onChangeData(newData);
    setIsDatePickerVisible(false);
  };

  const onPressSymptom = (symptom) => {
    let newSymptoms = [symptom];

    if (symptoms?.length) {
      newSymptoms = symptoms?.includes(symptom)
        ? symptoms?.filter((s) => s !== symptom)
        : [...symptoms, symptom];
    }

    handleChangeSymptoms(newSymptoms.filter((s) => !s?.none));
  };

  const onPressNoneOption = (symptom) => {
    setIsDatePickerVisible(false);
    handleChangeSymptoms([{ ...symptom, none: true }]);
  };

  const onPressDatePicker = (pickerType) => {
    setDatePickerType(pickerType);
    setIsDatePickerVisible(true);
  };

  const renderSymptoms = () =>
    (symptomsList || SYMPTOMS).map((symptom) => {
      const { name, displayName } = symptom;
      const isNone = name === SYMPTOM_NONE.name;
      const isActive = symptoms?.filter((r) => r?.displayName === displayName).length > 0;

      if (isChips && !isNone) {
        return (
          <ChipsButton
            active={isActive}
            checkmark={!isNone}
            title={displayName}
            action={() => (isNone ? onPressNoneOption(symptom) : onPressSymptom(symptom))}
          />
        );
      }

      return (
        <SelectButton
          withIndicator
          active={isActive}
          checkmark={!isNone}
          title={displayName}
          titleStyle={styles.symptomTitle}
          buttonStyle={styles.symptomButton}
          action={() => (isNone ? onPressNoneOption(symptom) : onPressSymptom(symptom))}
        />
      );
    });

  const renderLastPositiveTestPicker = () =>
    withLastPositiveTestPicker && (
      <>
        <Text style={styles.label}>
          {t(`${translationPrefix}patientSymptomLastPositivePlaceholder`)}
        </Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => onPressDatePicker('lastPositiveTestDate')}
        >
          <Text allowFontScaling={false} style={styles.inputValue}>
            {iso8601ToFormatted(lastPositiveTestDate, formats.fullLongDate)}
          </Text>
          <ArrowDown style={styles.inputArrow} />
          <Text allowFontScaling={false} style={styles.inputLabel}>
            {t(`${translationPrefix}date`)}
          </Text>
        </TouchableOpacity>
      </>
    );

  const renderDatePickers = () => (
    <View style={styles.datePickersContainer}>
      <Text style={styles.label}>{t(`${translationPrefix}patientSymptomStartPlaceholder`)}</Text>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => onPressDatePicker('symptomStartDate')}
      >
        <Text allowFontScaling={false} style={styles.inputValue}>
          {iso8601ToFormatted(symptomStartDate, formats.fullLongDate)}
        </Text>
        <ArrowDown style={styles.inputArrow} />
        <Text allowFontScaling={false} style={styles.inputLabel}>
          {t(`${translationPrefix}date`)}
        </Text>
      </TouchableOpacity>
      {renderLastPositiveTestPicker()}
      {isDatePickerVisible && (
        <DatePicker
          open
          modal
          mode='date'
          maximumDate={new Date()}
          textColor={colors.black}
          onConfirm={handleDateChange}
          onCancel={() => setIsDatePickerVisible(false)}
          date={convertDateStringToLocalTimezoneObject(datePickerValue) || new Date()}
        />
      )}
    </View>
  );

  const renderNonEditingView = () => (
    <View>
      <View style={styles.symptomsEditHeader}>
        <Text style={styles.label}>{t(`${translationPrefix}patientSymptoms`)}</Text>
        <Pressable onPress={() => setIsEditing(true)}>
          <Text style={styles.edit}>{t(`${translationPrefix}edit`)}</Text>
        </Pressable>
      </View>
      <Text style={styles.infoLabel}>{t(`${translationPrefix}noSymptom`)}</Text>
    </View>
  );

  const renderEditingView = () => (
    <View>
      <View style={isChips && styles.optionsContainer}>{renderSymptoms()}</View>
      {!!data?.symptoms?.length && !data?.symptoms[0]?.none && renderDatePickers()}
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {!!title && <Text style={styles.title}>{title}</Text>}
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {(isEditing ? renderEditingView : renderNonEditingView)()}
    </ScrollView>
  );
};

export default SelectSymptomForm;

const styles = StyleSheet.create({
  symptomsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontFamily: fonts.familyBold,
    color: colors.black,
    fontSize: 24,
    lineHeight: 36,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: fonts.familyLight,
    color: colors.greyDark2,
    fontSize: fonts.sizeSmall,
    marginBottom: 14,
  },
  symptomsEditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
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
  datePickersContainer: {
    marginTop: 20,
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: colors.secondaryButtonBorder,
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
    top: '15%',
    color: colors.calendarDisableText,
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
    top: '50%',
    fontSize: fonts.sizeLarge,
  },
  symptomButton: {
    margin: 0,
    marginBottom: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderBottomColor: null,
    borderColor: colors.greyExtraLight2,
    backgroundColor: colors.greyWhite,
    width: '100%',
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
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
});
