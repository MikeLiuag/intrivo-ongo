import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker';
import { Tooltip } from 'react-native-elements';
import { differenceInYears } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import InputLeftLabel from '../../components/InputLeftLabel';
import { colors } from '../../theme';
import Icon from '../../components/Icon';
import { height, states } from '../../utilis/mock';
import {
  convertDateStringToLocalTimezoneObject,
  convertDateObjectToDateString,
  DEFAULT_DOB,
} from '../../helpers/functions';
import ArrowDown from '../../components/Svg/arrowDown';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { setUserInfo } from '../../store/paxlovid/slice';
import { setGlobalErrors } from '../../store/app/slice';
import PaxFlowWrapper from './components/PaxFlowWrapper';
import paxlovidStyles, { dimensions } from './styles';
import { fonts } from '../../theme/fonts';
import { iso8601ToFormatted, dateToIso8601, iso8601ToDate } from '../../utilis/dateTime';
import { SYMPTOMS } from './constants';
import { LogEvent } from '../../analytics';
import PickerDropdown from '../../components/Picker';
import GooglePlacesInput from '../../components/GooglePlacesInput';

const DEFAULT_DATE = dateToIso8601(new Date());
const DATE_FORMAT = 'MMMM dd, yyyy';

const medicationPlaceholder = require('../../assets/medicationPlaceholder.png');

const EligibilityFormUserInfo = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { uuid, observationSymptoms, eligibilityFormUserInfo } = useSelector(
    (state) => state.paxlovid
  );
  const { users, usersLookup } = useSelector((s) => s.user);
  const user = usersLookup[uuid || users[0]];

  const [showHeightPicker, setShowHeightPicker] = useState(false);
  const [datePickerType, setDatePickerType] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [data, setData] = useState({
    firstName: user?.first_name,
    lastName: user?.last_name,
    dob: user?.dob,
    height: user?.height || '',
    weight: Math.round(user?.weight) || '',
    email: user?.email || '',
    phone: user?.phone?.number || '',
    zipcode: user?.location?.zipcode || '',
    symptoms: SYMPTOMS.filter((s) => observationSymptoms?.includes(s.displayName)) || [],
    symptomsBeginDate: eligibilityFormUserInfo.symptomsBeginDate,
    lastPositiveDate: eligibilityFormUserInfo.lastPositiveDate,
    state_id: user?.location?.state,
    address_1: user?.location?.address_1,
    address_2: user?.location?.address_2,
    city: user?.location?.city,
  });

  useEffect(() => {
    LogEvent('PE_Basicinfo_screen');
  }, []);

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

  const onPressNext = () => {
    LogEvent('PE_Basicinfo_Click_Next');
    const age = differenceInYears(new Date(), iso8601ToDate(data.dob));
    if (age >= 18 || (age >= 12 && data.weight >= 88)) {
      dispatch(setUserInfo(data));
      navigation.navigate('EligibilityFormIdentify');
    } else {
      dispatch(
        setGlobalErrors({
          message: t('paxlovid.eligibility.userInfo.elibilityError.title'),
          subtitle: t('paxlovid.eligibility.userInfo.elibilityError.message'),
          status: '',
        })
      );
    }
  };

  const onExitFromPaxFlow = () => {
    LogEvent('PE_Basicinfo_Click_Close');
  };

  const onBack = () => LogEvent('PE_Basicinfo_Click_Back');

  return (
    <PaxFlowWrapper
      onExit={onExitFromPaxFlow}
      onBack={onBack}
      onPressButton={onPressNext}
      headerTitle={t('paxlovid.eligibility.formTitle')}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardShouldPersistTaps='handled'
      >
        <ScrollView style={paxlovidStyles.content}>
          <View style={styles.drugContainer}>
            <Image source={medicationPlaceholder} style={styles.drugImage} />
            <View style={styles.containerDrugName}>
              <View>
                <Text style={styles.label}>{t('paxlovid.eligibility.userInfo.drugName')}</Text>
                <Text style={styles.drugNameValue}>
                  {t('paxlovid.eligibility.userInfo.drugNameValue')}
                </Text>
              </View>
              <View style={{ justifyContent: 'flex-end' }}>
                <Tooltip
                  withOverlay={false}
                  backgroundColor={colors.greyDark2}
                  containerStyle={{ borderRadius: 0 }}
                  popover={
                    <Text style={styles.tooltipText}>
                      {t('paxlovid.eligibility.userInfo.tooltip')}
                    </Text>
                  }
                  height={140}
                  width={160}
                >
                  <Icon type='MaterialIcons' name='info' size={20} color={colors.primaryBlue} />
                </Tooltip>
              </View>
            </View>
          </View>

          <View style={styles.border} />
          <Text style={styles.headerTitle}>{t('paxlovid.eligibility.userInfo.header')}</Text>

          <Text style={styles.patientInfo}>{t('paxlovid.eligibility.userInfo.patientInfo')}</Text>
          <InputLeftLabel
            value={data.firstName}
            action={(val) => setData((current) => ({ ...current, firstName: val }))}
            placeholder={t('paxlovid.eligibility.userInfo.placeholderFirstName')}
          />
          <InputLeftLabel
            value={data.lastName}
            action={(val) => setData((current) => ({ ...current, lastName: val }))}
            placeholder={t('paxlovid.eligibility.userInfo.placeholderLastName')}
          />
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => {
              setDatePickerType('dob');
              setShowDatePicker(true);
            }}
          >
            <Text allowFontScaling={false} style={styles.inputValue}>
              {iso8601ToFormatted(data.dob, DATE_FORMAT)}
            </Text>
            <ArrowDown style={styles.inputArrow} />
            <Text allowFontScaling={false} style={styles.inputLabel}>
              {t('paxlovid.eligibility.userInfo.placeholderDob')}
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
          <View style={styles.measureContainer}>
            <PickerDropdown
              value={data.height}
              placeholder={t('paxlovid.eligibility.userInfo.placeholderHeight')}
              containerStyle={styles.heightPicker}
              items={height}
              setVisible={(value) => setShowHeightPicker(value)}
              visible={showHeightPicker}
              onChange={(value) => setData((current) => ({ ...current, height: value }))}
            />
            <View style={styles.weightPicker}>
              <InputLeftLabel
                value={data.weight ? data.weight.toString() : undefined}
                keyboardType='numeric'
                autoCompleteType='off'
                onValueChange={(val) => setData((current) => ({ ...current, weight: +val }))}
                action={(val) => setData((current) => ({ ...current, weight: +val }))}
                placeholder={t('paxlovid.eligibility.userInfo.placeholderWeight')}
                notTrimWhenKeyboardIsHide
                maxLength={4}
              />
            </View>
          </View>
          <View style={styles.containerInput}>
            <InputLeftLabel
              customStyle={styles.inputStyle}
              value={data.email}
              action={(val) => setData((current) => ({ ...current, email: val }))}
              placeholder={t('paxlovid.eligibility.userInfo.placeholderEmail')}
              autoCapitalize='none'
              autoCompleteType='email'
              textContentType='emailAddress'
              keyboardType='email-address'
            />
            <Tooltip
              withOverlay={false}
              backgroundColor={colors.greyDark2}
              containerStyle={{ borderRadius: 0 }}
              popover={
                <Text style={styles.tooltipText}>
                  {t('paxlovid.eligibility.userInfo.tooltipContact')}
                </Text>
              }
              height={75}
              width={157}
            >
              <Icon type='MaterialIcons' name='info' size={20} color={colors.primaryBlue} />
            </Tooltip>
          </View>
          <GooglePlacesInput
            placeholder={t('placeholder.address1')}
            value={data.address_1 || ''}
            action={(value) => {
              setData((current) => ({
                ...current,
                ...value,
              }));
            }}
          />
          <InputLeftLabel
            value={data.address_2}
            action={(val) => setData((current) => ({ ...current, address_2: val }))}
            placeholder={t('placeholder.addredd2Optional')}
          />
          <InputLeftLabel
            value={data.city}
            action={(val) => setData((current) => ({ ...current, city: val }))}
            placeholder={t('placeholder.city')}
          />
          <PickerDropdown
            value={data.state_id}
            placeholder={t('placeholder.state')}
            items={states}
            onChange={(value) => {
              setData((current) => ({
                ...current,
                state_id: value,
              }));
            }}
          />
          <View style={styles.containerInput}>
            <InputLeftLabel
              customStyle={styles.inputStyle}
              value={data.phone}
              action={(val) => setData((current) => ({ ...current, phone: val }))}
              placeholder={t('paxlovid.eligibility.userInfo.placeholderPhone')}
              textContentType='telephoneNumber'
              autoCompleteType='tel'
              keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'phone-pad'}
            />
            <Tooltip
              withOverlay={false}
              backgroundColor={colors.greyDark2}
              containerStyle={{ borderRadius: 0 }}
              popover={
                <Text style={styles.tooltipText}>
                  {t('paxlovid.eligibility.userInfo.tooltipContact')}
                </Text>
              }
              height={75}
              width={157}
            >
              <Icon type='MaterialIcons' name='info' size={20} color={colors.primaryBlue} />
            </Tooltip>
          </View>
          <View style={styles.containerInput}>
            <InputLeftLabel
              customStyle={styles.inputStyle}
              value={data.zipcode}
              action={(val) => setData((current) => ({ ...current, zipcode: val }))}
              placeholder={t('paxlovid.eligibility.userInfo.placeholderZipcode')}
            />
            <Tooltip
              withOverlay={false}
              backgroundColor={colors.greyDark2}
              containerStyle={{ borderRadius: 0 }}
              popover={
                <Text style={styles.tooltipText}>
                  {t('paxlovid.eligibility.userInfo.tooltipZipcode')}
                </Text>
              }
              height={141}
              width={157}
            >
              <Icon type='MaterialIcons' name='info' size={20} color={colors.primaryBlue} />
            </Tooltip>
          </View>

          <BlueButton
            title={t('paxlovid.eligibility.userInfo.submit')}
            action={onPressNext}
            style={styles.buttonPrimary}
            disabled={
              data.firstName.length === 0 ||
              data.lastName.length === 0 ||
              data.dob.length === 0 ||
              !data.height ||
              !data.weight ||
              data.email.length === 0 ||
              data.phone.length === 0 ||
              !/^((\w{2,}[-\s.])+\w{2,})$|^(\w{4,})$/.test(data.zipcode) ||
              !data.address_1 ||
              !data.city ||
              !data.state_id
            }
            styleText={styles.buttonPrimaryTitle}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </PaxFlowWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },

  containerDrugName: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  drugContainer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  drugImage: {
    height: 40,
    width: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: fonts.familyBold,
    color: colors.black,
    lineHeight: 36,
    marginBottom: 20,
  },
  tooltipContainer: {
    justifyContent: 'flex-end',
  },

  patientInfo: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyDark2,
    marginBottom: 20,
  },
  label: {
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyBold,
    color: colors.greyGrey,
  },
  drugNameValue: {
    fontSize: fonts.sizeExtraLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyMidnight,
  },
  border: {
    width: '100%',
    height: 1,
    marginVertical: 24,
    backgroundColor: colors.secondaryButtonBorder,
  },
  patientItemTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  patientItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  infoLabel: {
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyBold,
    color: colors.greyMed,
    lineHeight: 22,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: fonts.familyLight,
    color: colors.greyMed,
    lineHeight: 22,
  },
  inputLabel: {
    position: 'absolute',
    left: wp('3.5%'),
    top: Platform.OS === 'ios' ? '10.3%' : '15%',
    color: '#999',
    fontSize: fonts.sizeSmall,
  },
  inputArrow: { position: 'absolute', right: '4%' },
  measureContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heightPicker: {
    width: '50%',
  },
  weightPicker: { width: '48%', paddingRight: '2%' },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputStyle: {
    width: '90%',
    minWidth: '90%',
  },
  symptomsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  edit: {
    fontSize: fonts.sizeLarge,
    fontFamily: 'Museo_700',
    color: colors.primaryBlue,
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
  tooltipText: {
    fontFamily: fonts.familyNormal,
    color: colors.greyWhite,
    fontSize: fonts.sizeSmall,
    textAlign: 'center',
  },
  statePicker: { width: '100%' },
});

export default EligibilityFormUserInfo;
