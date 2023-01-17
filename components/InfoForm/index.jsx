import React, { useEffect, useState, useRef } from 'react';

import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';
import { format } from 'date-fns';
import ArrowDown from '../Svg/arrowDown';
import InputLeftLabel from '../InputLeftLabel';
import { colors } from '../../theme';
import {
  convertDateStringToLocalTimezoneObject,
  convertDateObjectToDateString,
  DEFAULT_DOB,
} from '../../helpers/functions';
import Arrow from '../Svg/arrow';
// import DatePicker from 'react-native-date-picker';
const DatePicker = Platform.OS !== 'web' ? require('react-native-date-picker').default : View;

const InfoForm = ({ data, setData, isDependant, dependentNumber }) => {
  const { t } = useTranslation();
  const [yourInfo, setYourInfo] = useState(
    !isDependant ? data.yourInfo : data.dependentInfo[dependentNumber]
  );
  // const [date, setDate] = useState(false);
  const [show, setShow] = useState(false);
  const nameInputRef = useRef(null);
  const [disclosureVisible, setDisclosureVisible] = useState(false);

  // useEffect(() => {
  //   setDate(false);
  // }, [dependentNumber]);

  useEffect(() => {
    const isEmpty = Object.values(yourInfo).every((x) => x === null || x === '');
    if (isEmpty) nameInputRef.current.focus();
  }, [yourInfo]);

  const onChange = (selectedDate) => {
    setShow(false);
    const currentDate = convertDateObjectToDateString(selectedDate);
    // setDate(currentDate);
    setYourInfo((current) => ({
      ...current,
      birthday: currentDate,
    }));
  };

  // useEffect(() => {
  //   setYourInfo(
  //     !isDependant ? data.yourInfo : data.dependentInfo[dependentNumber]
  //   );
  // }, [dependentNumber]);

  useEffect(() => {
    if (!isDependant) setData(yourInfo);
    else {
      const copy = [...data.dependentInfo];
      copy[dependentNumber] = yourInfo;
      setData(copy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yourInfo]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerInfoDisclosureCTA}
        onPress={() => setDisclosureVisible(true)}
      >
        <Text style={styles.infoDisclosureCTA}>{t('introSteps.7.infoDisclosureCTA')}</Text>
      </TouchableOpacity>
      <InputLeftLabel
        value={yourInfo?.name}
        action={(value) => {
          setYourInfo((current) => ({ ...current, name: value }));
        }}
        onFocus={() => setShow(false)}
        placeholder={t('placeholder.firstName')}
        textContentType='givenName'
        autoFocus
        autoCompleteType='name'
        inputRef={nameInputRef}
        trim
        notTrimWhenKeyboardIsHide
      />
      <InputLeftLabel
        value={yourInfo?.lastName}
        onFocus={() => setShow(false)}
        action={(value) => {
          setYourInfo((current) => ({ ...current, lastName: value }));
        }}
        placeholder={t('placeholder.lastName')}
        textContentType='familyName'
        autoCompleteType='name'
        trim
        notTrimWhenKeyboardIsHide
      />
      <TouchableOpacity
        style={[styles.inputContainer, styles.row, styles.birthday]}
        onPress={() => {
          setShow(!show);
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            position: 'absolute',
            left: '4%',
            top: Platform.OS === 'ios' ? '56%' : '47%',
            fontSize: 16,
          }}
        >
          {yourInfo.birthday
            ? format(convertDateStringToLocalTimezoneObject(yourInfo.birthday), 'MMMM dd, yyyy')
            : ''}
        </Text>
        <ArrowDown style={{ position: 'absolute', right: '4%' }} />
        <Text
          allowFontScaling={false}
          style={{
            position: 'absolute',
            left: wp('3.5%'),
            top: yourInfo.birthday
              ? Platform.select({
                  ios: '10.3%',
                  android: '12%',
                })
              : Platform.select({
                  ios: '43%',
                  android: '33%',
                }),
            color: yourInfo.birthday
              ? '#999'
              : Platform.select({
                  ios: '#ccc',
                  android: '#aaa',
                }),
            fontSize: yourInfo.birthday ? 13 : 16,
          }}
        >
          {t('placeholder.birthday')}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        textColor='#000'
        onConfirm={onChange}
        onCancel={() => {
          setShow(false);
        }}
        // locale="en-US"
        date={convertDateStringToLocalTimezoneObject(yourInfo.birthday || DEFAULT_DOB)}
        mode='date'
        open={show}
        maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      />
      <Modal
        visible={disclosureVisible}
        animationIn='slideInDown'
        animationOut='slideOutUp'
        transparent
        style={styles.modalDisclosure}
        onRequestClose={() => setDisclosureVisible(false)}
      >
        <View style={styles.containerDisclosure}>
          <TouchableOpacity
            style={styles.disclosureBack}
            onPress={() => setDisclosureVisible(false)}
          >
            <Arrow width={20} height={20} />
          </TouchableOpacity>
          <Text style={styles.disclosureContent}>
            {t('introSteps.7.infoDisclosureDescription1')}
            <Text style={styles.disclosureContentBold}>
              {t('introSteps.7.infoDisclosureDescription2')}
            </Text>
            {t('introSteps.7.infoDisclosureDescription3')}
          </Text>
        </View>
      </Modal>
    </View>
  );
};

InfoForm.defaultProps = {
  data: {},
  isDependant: false,
  dependentNumber: 0,
};

export default InfoForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  containerInfoDisclosureCTA: {
    flexWrap: 'wrap',
    alignSelf: 'center',
    marginBottom: 20,
  },
  infoDisclosureCTA: {
    fontFamily: 'Museo_700',
    color: colors.primaryBlue,
    fontSize: 14,
    lineHeight: 28,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  birthday: {
    position: 'relative',
    paddingLeft: Platform.OS === 'ios' ? wp('3.5%') : wp('1.5%'),
    paddingTop: Platform.OS === 'ios' ? wp('2%') : wp('0.5%'),
    maxHeight: hp('8.5%'),
    minHeight: hp('8.5%'),
    marginVertical: hp('1%'),
  },
  inputContainer: {
    width: wp('90%'),
    borderRadius: 16,
    height: Platform.OS === 'ios' ? 78 : 65,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.greyLight,
    marginBottom: Number(hp('1%')),
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  heightPicker: {
    width: '100%',
    height: Platform.OS === 'ios' ? hp('8.5%') : hp('8.5%'),
    position: 'relative',
    textAlign: 'center',
    borderWidth: 1,
    paddingHorizontal: Platform.OS === 'ios' ? hp('1.5%') : hp('0.53%'),
    paddingTop: hp('2.5%'),
    paddingBottom: 6,
    fontSize: 20,
    borderColor: colors.greyLight,
    borderRadius: wp('4%'),
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  inputMeasuresContainer: {
    width: wp('44%'),
    borderRadius: 10,
    height: 60,
    position: 'relative',
    marginRight: Number(wp('1%')),
    marginLeft: Number(wp('1%')),
    textAlign: 'center',
    borderColor: '#D8E1F8',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  calendarPicker: {
    backgroundColor: 'transparent',
    position: 'absolute',
    justifyContent: 'flex-end',
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  modalDisclosure: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    margin: 0,
    alignSelf: 'flex-start',
  },
  containerDisclosure: {
    height: '100%',
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? Number(wp('15%')) : Number(wp('5%')),
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: colors.greyWhite,
  },
  disclosureBack: {
    marginBottom: 20,
  },
  disclosureContent: {
    fontFamily: 'Museo_300',
    color: colors.greyMed,
    fontSize: 14,
    lineHeight: 22,
  },
  disclosureContentBold: {
    fontFamily: 'Museo_700',
    color: colors.greyMed,
    fontSize: 14,
    lineHeight: 22,
  },
});
