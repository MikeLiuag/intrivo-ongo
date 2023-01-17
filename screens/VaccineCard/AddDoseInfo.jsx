import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';

import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { BlueButton } from '../../components/Buttons/BlueButton';
import HeaderComp from '../../components/HeaderComp';
import InputLeftLabel from '../../components/InputLeftLabel';
import CheckIcon from '../../components/Svg/checkIcon';

import { colors } from '../../theme';
import { addDoseInfo, editDose, removeDoseInfo } from '../../store/user/slice';
import DotsIcon from '../../components/Svg/dotsIcon';
import ArrowDown from '../../components/Svg/arrowDown';
import useIsFloatingKeyboard from '../../utilis/keyboard';

import { LogEvent } from '../../analytics';
import PickerDropdown from '../../components/Picker';

const DatePicker = Platform.OS !== 'web' ? require('react-native-date-picker').default : View;

const TODAY = new Date();
const DEFAULT_DATE = TODAY.toISOString().slice(0, 10);

const regex = /^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/;

const dose = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
];

const vaccine = [
  { label: 'Pfizer/BioNTech', value: 'Pfizer/BioNTech' },
  { label: 'Moderna', value: 'Moderna' },
  { label: 'Janssen/Johnson & Johnson', value: 'Janssen/Johnson & Johnson' },
  { label: 'AstraZeneca', value: 'AstraZeneca' },
  { label: 'Sinopharm/BIBP', value: 'Sinopharm/BIBP' },
  { label: 'Sinovac', value: 'Sinovac' },
  {
    label: 'COVISHIELD/Serum Institute of India',
    value: 'COVISHIELD/Serum Institute of India',
  },
  {
    label: 'COVAXIN/Bharat Biotech, India',
    value: 'COVAXIN/Bharat Biotech, India',
  },
];

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const AddDoseInfo = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { uuid } = route.params;

  const [showDatePicker, setShowDatePicker] = useState(false);

  // modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMenuModalVisible, setMenuModalVisible] = useState(false);

  const { editable } = route.params;
  const doseInfo = route.params.data;

  // fix for keyboard
  const floating = useIsFloatingKeyboard();

  const { usersLookup } = useSelector((s) => s.user);
  const immunizationId = usersLookup[uuid].immunization.uuid;

  const [data, setData] = useState({
    immunization_type: 'covid_19',
    dose_number: '',
    date: '',
    manufacturer: '',
    lot_number: '',
    performer: '',
    location: '',
    immunization_status_id: immunizationId,
  });

  useEffect(() => {
    LogEvent('VaccineCardAdd_screen');
    if (editable && doseInfo) {
      setData(doseInfo);
    }
    // disabling due to needing to hotfix. AH
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (selectedDate) => {
    setShowDatePicker(false);
    setData((current) => ({
      ...current,
      date: selectedDate.toISOString().slice(0, 10),
    }));
  };

  const onSave = async () => {
    LogEvent('VaccineCardAdd_click_Save');
    if (editable) {
      const res = await dispatch(
        editDose({
          uuid: data.uuid,
          data,
          userId: uuid,
        })
      );
      if (res?.type.includes('fulfilled')) {
        setIsModalVisible(true);
        await sleep(2000);
        navigation.goBack();
      }
    } else {
      const res = await dispatch(
        addDoseInfo({
          uuid,
          data,
        })
      );
      if (res?.type.includes('fulfilled')) {
        setIsModalVisible(true);
        await sleep(2000);
        navigation.goBack();
      }
    }
  };

  const handleRemove = async () => {
    LogEvent('VaccineCardAdd_click_Remove');
    setMenuModalVisible(false);
    const res = await dispatch(removeDoseInfo({ uuid, immunizationId, doseId: data.uuid }));
    if (res?.type.includes('fulfilled')) {
      navigation.goBack();
    }
  };

  const handleCancel = () => {
    LogEvent('VaccineCardAdd_click_Cancel');
    setMenuModalVisible(false);
  };

  const handleLot = (value) => {
    if (data.lot_number.length === 1 && value === '') {
      setData((current) => ({
        ...current,
        lot_number: '',
      }));
    } else if (regex.test(value))
      setData((current) => ({
        ...current,
        lot_number: value,
      }));
  };

  const handleBack = () => {
    LogEvent('VaccineCardAdd_click_Back');
    navigation.goBack();
  };

  const handleMenu = () => {
    LogEvent('VaccineCardAdd_click_Menu');
    setMenuModalVisible((v) => !v);
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.screen}>
      <View style={styles.headerContainer}>
        <HeaderComp
          center={[
            editable ? t('vaccine.edit.header') : t('vaccine.add.header'),
            { fontSize: 16, color: 'black', fontFamily: 'Museo_700' },
          ]}
          left='arrow'
          onLeftClick={handleBack}
          addStyle={{ marginTop: Platform.OS === 'ios' ? 0 : 20 }}
          right={editable ? [<DotsIcon />, handleMenu] : []}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
        enabled={!floating}
      >
        <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
          <View style={styles.doseInfoContainer}>
            <PickerDropdown
              value={data.dose_number}
              style={{ marginBottom: 16 }}
              items={dose}
              placeholder='Dose #'
              onChange={(label) => setData((current) => ({ ...current, dose_number: label }))}
            />
            <DatePicker
              modal
              textColor='#000'
              onConfirm={onChange}
              onCancel={() => {
                setShowDatePicker(false);
              }}
              date={new Date(data.date || DEFAULT_DATE)}
              mode='date'
              confirmTextIOS='Done'
              open={showDatePicker}
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dosePicker}>
              {data.date ? (
                <Text
                  allowFontScaling={false}
                  style={{
                    position: 'absolute',
                    left: '4%',
                    top: Platform.OS === 'ios' ? '66%' : '59%',
                    fontSize: 16,
                  }}
                >
                  {format(new Date(data.date), 'MMMM dd, yyyy')}
                </Text>
              ) : null}
              <ArrowDown style={{ position: 'absolute', right: '6%' }} />
              <Text
                allowFontScaling={false}
                style={
                  data.date
                    ? {
                        position: 'absolute',
                        left: wp('3.5%'),
                        top: Platform.OS === 'ios' ? '10.3%' : '15%',
                        color: '#999',
                        fontSize: 13,
                      }
                    : {
                        position: 'absolute',
                        left: wp('3.5%'),
                        top: Platform.OS === 'ios' ? '56%' : '49%',
                        color: '#999',
                        fontSize: 16,
                      }
                }
              >
                {t('vaccine.add.date')}
              </Text>
            </TouchableOpacity>
            <PickerDropdown
              value={data.manufacturer}
              items={vaccine}
              placeholder='Vaccine type'
              onChange={(value) => setData((current) => ({ ...current, manufacturer: value }))}
            />
            <InputLeftLabel
              value={data.lot_number}
              placeholder='Lot #'
              action={handleLot}
              notTrimWhenKeyboardIsHide
            />
            <Text style={styles.additionalFields}>{t('vaccine.add.subtitle')}</Text>
            <InputLeftLabel
              value={data.performer}
              placeholder={t('vaccine.add.healthcare')}
              action={(value) => setData((current) => ({ ...current, performer: value }))}
              notTrimWhenKeyboardIsHide
            />
            <InputLeftLabel
              value={data.location}
              placeholder={t('vaccine.add.clinic')}
              action={(value) => setData((current) => ({ ...current, location: value }))}
              notTrimWhenKeyboardIsHide
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <BlueButton
            title='Save'
            action={onSave}
            disabled={
              data.date.length === 0 ||
              data.manufacturer?.length === 0 ||
              data.lot_number.length === 0 ||
              data.dose_number.length === 0 ||
              ((!data.performer || data.performer?.length === 0) &&
                (!data.location || data.location.length === 0))
            }
          />
        </View>
        {/* Saved modal */}
        <Modal isVisible={isModalVisible} style={{ margin: 0 }}>
          <View style={styles.modalView}>
            <View style={styles.modalCenter}>
              <View style={styles.modalIconView}>
                <CheckIcon width={67} height={67} />
              </View>
              <Text style={styles.modalText}>{t('vaccine.add.compModal')}</Text>
            </View>
          </View>
        </Modal>
        {/* Menu modal */}
        <Modal
          isVisible={isMenuModalVisible}
          style={{ margin: 0 }}
          onBackdropPress={() => setMenuModalVisible(false)}
        >
          <View style={styles.menuModal}>
            <TouchableOpacity onPress={() => handleRemove()}>
              <View style={styles.menuRow}>
                <Text allowFontScaling={false} style={styles.redText}>
                  {t('vaccine.button.remove')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel}>
              <View style={styles.menuSecondRow}>
                <Text allowFontScaling={false} style={styles.rowTextCancel}>
                  {t('vaccine.button.cancel')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddDoseInfo;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    marginHorizontal: 16,
    marginBottom: 12,
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  doseInfoContainer: {
    flex: 1,
    marginTop: 30,
  },
  dosePicker: {
    width: '100%',
    height: 76,
    position: 'relative',
    textAlign: 'center',
    borderWidth: 1,
    paddingHorizontal: Platform.OS === 'ios' ? hp('1.5%') : 0,
    paddingTop: hp('2.6%'),
    fontSize: 20,
    borderColor: colors.greyLight,
    borderRadius: hp('2%'),
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  modalIconView: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    shadowColor: '#666666',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  modalText: {
    marginTop: 20,
    fontFamily: 'Museo_700',
    fontSize: 20,
    lineHeight: 34,
  },
  modalView: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 30,
    width: '100%',
    height: hp('100%'),
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCenter: {
    alignItems: 'center',
    marginBottom: hp('15%'),
  },
  menuModal: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    height: 'auto',
    bottom: 0,
  },
  menuRow: {
    marginRight: 24,
    marginLeft: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderColor: '#D6D6D6',
    borderWidth: 1,
  },
  menuSecondRow: {
    marginRight: 24,
    marginLeft: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderColor: '#D6D6D6',
    borderWidth: 1,
  },
  redText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EB5757',
  },
  rowTextCancel: {
    fontSize: 16,
    fontWeight: '500',
  },
  additionalFields: {
    fontSize: 14,
    fontFamily: 'Museo_500',
    color: colors.black,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 5 : 15,
  },
});
