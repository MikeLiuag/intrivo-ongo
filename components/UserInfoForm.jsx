import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Tooltip } from 'react-native-elements';
import InputLeftLabel from './InputLeftLabel';
import { colors } from '../theme';
import Icon from './Icon';
import { height as heights, states } from '../utilis/mock';
import {
  convertDateStringToLocalTimezoneObject,
  convertDateObjectToDateString,
  DEFAULT_DOB,
} from '../helpers/functions';
import ArrowDown from './Svg/arrowDown';
import PickerDropdown from './Picker';
import { fonts } from '../theme/fonts';
import { formats, iso8601ToFormatted } from '../utilis/dateTime';
import { isEmail, notEmptyString, isZipCode } from '../utilis/validations';
import { convertInchesToFeetInches } from '../utilis/helpers';
import GooglePlacesInput from './GooglePlacesInput';

function UserInfoForm({ data, title, setData, withBorder = true, addressEdit, measureEdit }) {
  const { t } = useTranslation();
  const {
    dob,
    email,
    city,
    height,
    weight,
    zipcode,
    lastName,
    firstName,
    phoneNumber,
    state_id: stateId,
    address_1: address1,
    address_2: address2,
  } = data;
  const stateName = stateId ? states.filter((i) => i.value === stateId)[0] : {};

  const [showHeightPicker, setShowHeightPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editMode, setEditMode] = useState(addressEdit);
  const [measureEditMode, setMeasureEditMode] = useState(measureEdit);

  const Section = ({ info = [] }) => (
    <View style={styles.section}>
      {info.map(({ label, value }) => (
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.label}>
            {t(label)}
            {': '}
          </Text>
          <Text style={styles.valueText}>{value}</Text>
        </View>
      ))}
    </View>
  );

  const onPressEdit = () => {
    setEditMode(!editMode);
  };

  const onPressMeasureEdit = () => {
    setMeasureEditMode(!measureEditMode);
  };

  const renderHeightWeight = () => {
    if (measureEditMode) {
      return (
        <>
          <View style={styles.measureContainer}>
            <PickerDropdown
              value={height}
              placeholder={t('paxlovid.eligibility.userInfo.placeholderHeight')}
              containerStyle={{ width: '50%' }}
              items={heights}
              setVisible={(value) => setShowHeightPicker(value)}
              visible={showHeightPicker}
              onChange={(value) => setData((current) => ({ ...current, height: value }))}
            />
            <View style={styles.weightPicker}>
              <InputLeftLabel
                maxLength={4}
                keyboardType='decimal-pad'
                notTrimWhenKeyboardIsHide
                fieldValidationRule={notEmptyString}
                value={weight && weight.toString()}
                placeholder={t('paxlovid.eligibility.userInfo.placeholderWeight')}
                action={(val) => {
                  setData((current) => ({ ...current, weight: +val }));
                }}
                onValueChange={(val) => {
                  setData((current) => ({ ...current, weight: +val }));
                }}
              />
            </View>
          </View>

          <View style={styles.devider} />
        </>
      );
    }
    return (
      <View style={styles.addressView}>
        <Section
          info={[
            {
              label: t(`paxlovid.eligibility.userInfo.placeholderHeight`),
              value: `${convertInchesToFeetInches(height)}`,
            },
            {
              label: t(`paxlovid.eligibility.userInfo.placeholderWeight`),
              value: `${weight}lbs`,
            },
          ]}
        />
        <TouchableOpacity onPress={onPressMeasureEdit}>
          <Text style={styles.blueButtonText}>{t('paxlovid.eligibility.userInfo.edit')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderUserLocation = () => {
    if (editMode) {
      return (
        <>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <GooglePlacesInput
              placeholder={t('placeholder.address1')}
              value={address1 || ''}
              action={(value) => {
                setData((current) => ({
                  ...current,
                  ...value,
                }));
              }}
            />
            <View style={{ marginTop: 30, marginLeft: 10 }}>
              <Tooltip
                withOverlay={false}
                backgroundColor={colors.greyDark2}
                containerStyle={{ borderRadius: 5, paddingHorizontal: 5 }}
                popover={
                  <Text style={styles.tooltipText}>
                    {t('screens.sniffles.snifflesTelehealth.questions.userInfo.note')}
                  </Text>
                }
                height={94}
                width={173}
              >
                <Icon type='MaterialIcons' name='info' size={20} color={colors.primaryBlue} />
              </Tooltip>
            </View>
          </View>
          <InputLeftLabel
            value={address2}
            action={(val) => setData((current) => ({ ...current, address_2: val }))}
            placeholder={t('placeholder.addredd2Optional')}
            autoCompleteType='postal-address-extended'
          />
          <InputLeftLabel
            value={city}
            fieldValidationRule={notEmptyString}
            action={(val) => setData((current) => ({ ...current, city: val }))}
            placeholder={t('placeholder.city')}
            autoCompleteType='postal-address-locality'
          />
          <PickerDropdown
            value={stateId}
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
              value={zipcode}
              maxLength={5}
              fieldValidationRule={isZipCode}
              keyboardType='numeric'
              action={(val) => setData((current) => ({ ...current, zipcode: val }))}
              placeholder={t('paxlovid.eligibility.userInfo.placeholderZipcode')}
              autoCompleteType='postal-code'
            />
            <Tooltip
              withOverlay={false}
              backgroundColor={colors.greyDark2}
              containerStyle={{ borderRadius: 5 }}
              popover={
                <Text style={styles.tooltipText}>
                  {t('paxlovid.eligibility.userInfo.tooltipZipcode')}
                </Text>
              }
              height={160}
              width={180}
            >
              <Icon type='MaterialIcons' name='info' size={20} color={colors.primaryBlue} />
            </Tooltip>
          </View>
        </>
      );
    }
    return (
      <View style={styles.addressView}>
        <Section
          info={[
            { label: t(`placeholder.address`), value: `${address1} ${address2 || ''}` },
            { label: t(`placeholder.city`), value: `${city}` },
            { label: t(`placeholder.state`), value: stateName?.label },
            { label: t(`placeholder.zipCodeOnly`), value: `${zipcode}` },
          ]}
        />
        <TouchableOpacity onPress={onPressEdit}>
          <Text style={styles.blueButtonText}>{t('paxlovid.eligibility.userInfo.edit')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView>
      {withBorder && <View style={styles.border} />}
      {!!title && <Text style={styles.headerTitle}>{title}</Text>}
      <Text style={styles.userInfoText}>{t('paxlovid.eligibility.userInfo.patientInfo')}</Text>
      <InputLeftLabel
        value={firstName}
        fieldValidationRule={notEmptyString}
        action={(val) => setData((current) => ({ ...current, firstName: val }))}
        placeholder={t('paxlovid.eligibility.userInfo.placeholderFirstName')}
      />
      <InputLeftLabel
        value={lastName}
        fieldValidationRule={notEmptyString}
        action={(val) => setData((current) => ({ ...current, lastName: val }))}
        placeholder={t('paxlovid.eligibility.userInfo.placeholderLastName')}
      />
      <TouchableOpacity style={styles.inputContainer} onPress={() => setShowDatePicker(true)}>
        <Text allowFontScaling={false} style={styles.inputValue}>
          {iso8601ToFormatted(dob, formats.longDateWithFullMonth)}
        </Text>
        <ArrowDown style={styles.inputArrow} />
        <Text allowFontScaling={false} style={styles.inputLabel}>
          {t('paxlovid.eligibility.userInfo.placeholderDob')}
        </Text>
      </TouchableOpacity>
      <DatePicker
        textColor='#000'
        modal
        open={showDatePicker}
        date={convertDateStringToLocalTimezoneObject(dob || DEFAULT_DOB)}
        onConfirm={(newDate) => {
          setData((s) => ({ ...s, dob: convertDateObjectToDateString(newDate) }));
          setShowDatePicker(false);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
        mode='date'
        maximumDate={new Date()}
      />
      <View style={styles.containerInput}>
        <View>
          <InputLeftLabel
            customStyle={styles.inputStyle}
            value={email}
            fieldValidationRule={isEmail}
            action={(val) => setData((current) => ({ ...current, email: val }))}
            placeholder={t('paxlovid.eligibility.userInfo.placeholderEmail')}
            autoCapitalize='none'
            autoCompleteType='email'
            textContentType='emailAddress'
            keyboardType='email-address'
          />
        </View>
        <Tooltip
          withOverlay={false}
          backgroundColor={colors.greyDark2}
          containerStyle={{ borderRadius: 5 }}
          popover={
            <Text style={styles.tooltipText}>
              {t('paxlovid.eligibility.userInfo.tooltipContact')}
            </Text>
          }
          height={110}
          width={157}
        >
          <Icon type='MaterialIcons' name='info' size={20} color={colors.primaryBlue} />
        </Tooltip>
      </View>
      <View style={styles.containerInput}>
        <View>
          <InputLeftLabel
            customStyle={styles.inputStyle}
            value={phoneNumber}
            fieldValidationRule={notEmptyString}
            action={(val) => setData((current) => ({ ...current, phoneNumber: val }))}
            placeholder={t('paxlovid.eligibility.userInfo.placeholderPhone')}
            textContentType='telephoneNumber'
            autoCompleteType='tel'
            keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'phone-pad'}
          />
        </View>
        <Tooltip
          withOverlay={false}
          backgroundColor={colors.greyDark2}
          containerStyle={{ borderRadius: 5 }}
          popover={
            <Text style={styles.tooltipText}>
              {t('paxlovid.eligibility.userInfo.tooltipContact')}
            </Text>
          }
          height={110}
          width={157}
        >
          <Icon type='MaterialIcons' name='info' size={20} color={colors.primaryBlue} />
        </Tooltip>
      </View>
      <View style={styles.devider} />
      {renderHeightWeight()}
      {renderUserLocation()}
    </KeyboardAvoidingView>
  );
}

export default UserInfoForm;

const styles = StyleSheet.create({
  content: { paddingHorizontal: 25 },
  containerDrugName: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
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
  userInfoText: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyDark2,
    marginBottom: 20,
  },
  label: {
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyBold,
    color: colors.greyGrey,
    lineHeight: 22,
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
    top: Platform.select({ ios: '10.3%', default: '15%' }),
    color: '#999',
    fontSize: fonts.sizeSmall,
  },
  inputArrow: { position: 'absolute', right: '4%' },
  measureContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heightPicker: {
    width: '50%',
  },
  weightPicker: { width: '50%', paddingLeft: 10 },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputStyle: {
    width: '95%',
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
    fontFamily: fonts.familyBold,
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
    top: Platform.select({ ios: '56%', default: '49%' }),
    fontSize: fonts.sizeLarge,
  },
  tooltipText: {
    fontFamily: fonts.familyNormal,
    color: colors.greyWhite,
    fontSize: fonts.sizeNormal,
    textAlign: 'center',
  },
  statePicker: { width: '100%' },
  noteText: {
    fontSize: 13,
    fontFamily: fonts.familyNormal,
    color: colors.greyMed,
    margin: 5,
  },
  valueText: {
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyNormal,
    color: colors.greyGrey,
    lineHeight: 22,
  },
  blueButtonText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.primaryBlue,
    fontFamily: fonts.familyBold,
  },
  checkboxContainer: {
    margin: 0,
    marginTop: 16,
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  checkboxText: {
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'normal',
  },
  addressView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 16,
  },
  devider: { borderTopColor: colors.secondaryButtonBorder, borderTopWidth: 1, marginVertical: 16 },
  tooltipHeader: {
    fontFamily: fonts.familyBold,
    color: colors.white,
  },
});
