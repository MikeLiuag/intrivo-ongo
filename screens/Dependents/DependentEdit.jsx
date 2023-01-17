import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import Modal from 'react-native-modal';
import {
  addDependent,
  // replaceVaccineCard,
  updateUser,
} from '../../store/user/slice';
import { BlueButton } from '../../components/Buttons/BlueButton';
import InputLeftLabel from '../../components/InputLeftLabel';

// Svg-s
import { height } from '../../utilis/mock';
import ArrowDown from '../../components/Svg/arrowDown';
import HeaderComp from '../../components/HeaderComp';
import { colors } from '../../theme';
import CompletedScreen from '../../components/CompletedScreen';
import SelectorComponent from '../../components/SelectorComponent';
import {
  convertDateStringToLocalTimezoneObject,
  convertDateObjectToDateString,
  DEFAULT_DOB,
} from '../../helpers/functions';
import useIsFloatingKeyboard from '../../utilis/keyboard';
import { LogEvent } from '../../analytics';
import DotsIcon from '../../components/Svg/dotsIcon';
import Icon from '../../components/Icon';
import PickerDropdown from '../../components/Picker';

const DatePicker = Platform.OS !== 'web' ? require('react-native-date-picker').default : View;

export default ({ navigation, route }) => {
  const { uuid } = route.params || {};
  const { usersLookup } = useSelector((s) => s.user);
  const { t } = useTranslation();
  const { testName } = route.params;

  const user = usersLookup[uuid] || null;

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isSavedModalVisible, setSavedModalVisible] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  // fix for keyboard
  const floating = useIsFloatingKeyboard();

  const [inputErrors, setInputErrors] = useState({
    first_name: false,
    last_name: false,
    middle_name: false,
    dob: false,
  });

  const [data, setData] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
    middle_name: user?.middle_name,
    dob: user?.dob,
    height: user?.height,
    weight: Math.round(user?.weight),
  });

  useEffect(() => {
    if (uuid) {
      LogEvent('ProfileDependentsInfo_screen');
    } else {
      LogEvent('ProfileDependentsAdd_screen');
    }
  }, [uuid]);

  const ModalOn = (res) => {
    if (res.meta.requestStatus === 'fulfilled') {
      setSavedModalVisible(true);
      setTimeout(() => navigation.goBack(), 2000);
    }
  };

  const submitHandler = () => {
    if (testName) {
      LogEvent(`Test-${testName}-Dependent_click_Save`);
    }
    if (!saveLoading) {
      setSaveLoading(true);
      if ((data.first_name || '').length < 1 || (data.last_name || '').length < 1 || !data.dob) {
        setInputErrors((current) => ({
          ...current,
          first_name: (data.first_name || '').length < 1,
          last_name: (data.last_name || '').length < 1,
          dob: !data.dob,
        }));
      } else {
        if (uuid) {
          LogEvent('ProfileDependentsInfo_click_Save');
          dispatch(
            updateUser({
              ...data,
              uuid,
            })
          ).then((res) => ModalOn(res));
          return;
        }
        LogEvent('ProfileDependentsAdd_click_Save');
        dispatch(
          addDependent({
            ...data,
            sex: 'X',
            relationship_id: 1,
          })
        ).then((res) => ModalOn(res));
      }
    }
  };

  const onChange = (selectedDate) => {
    setShow(false);
    const dobFormatted = convertDateObjectToDateString(selectedDate);
    setData((s) => ({ ...s, dob: dobFormatted }));
  };

  const handleGoBack = () => {
    if (testName) {
      LogEvent(`Test-${testName}-Dependent_click_Back`);
    }
    if (uuid) {
      LogEvent('ProfileDependentsInfo_click_Back');
    } else {
      LogEvent('ProfileDependentsAdd_click_Back');
    }
    navigation.goBack();
  };

  // const handleRemove = () => {
  //   Alert.alert(t('exitAlert.Title'), t('alertMessage.removeVaccinationCard'), [
  //     {
  //       text: t('yesNo.Yes'),
  //       onPress: () => {
  //         dispatch(
  //           replaceVaccineCard({
  //             uuid,
  //             immunizationId: user.immunization.uuid,
  //             documentId: user.immunization.document.uuid,
  //             doseInfo: user.immunization.doseInfo,
  //           })
  //         );
  //       },
  //     },
  //     {
  //       text: t('yesNo.No'),
  //       style: 'cancel',
  //     },
  //   ]);
  // };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, paddingBottom: hp('2%'), backgroundColor: '#ffffff' }}
        enabled={!floating}
      >
        <HeaderComp
          center={
            user
              ? [`${data.first_name} ${data.last_name}`, styles.headerTitle]
              : [t('screens.dependent.edit.add'), styles.headerTitleSmall]
          }
          left='arrow'
          onLeftClick={handleGoBack}
          right={
            user
              ? [
                  <DotsIcon />,
                  () => {
                    LogEvent('ProfileDependentsInfo_click_Menu');
                    setDeleteModalVisible(true);
                  },
                  styles.headerBtn,
                ]
              : []
          }
          addStyle={styles.profileHeader}
        />
        <LinearGradient colors={['#ffffff', '#FFFFFF']} start={{ x: 0, y: 0 }} style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
              <View>
                <InputLeftLabel
                  error={inputErrors.first_name}
                  value={data.first_name}
                  action={(value) => {
                    setData((current) => ({
                      ...current,
                      first_name: value,
                    }));

                    setInputErrors((current) => ({
                      ...current,
                      first_name: false,
                    }));
                  }}
                  placeholder={t('userCommon.first')}
                  notTrimWhenKeyboardIsHide
                />
                <InputLeftLabel
                  error={inputErrors.middle_name}
                  value={data.middle_name}
                  action={(value) => {
                    setData((current) => ({
                      ...current,
                      middle_name: value,
                    }));

                    setInputErrors((current) => ({
                      ...current,
                      middle_name: false,
                    }));
                  }}
                  placeholder={t('userCommon.middle')}
                  notTrimWhenKeyboardIsHide
                />
                <InputLeftLabel
                  error={inputErrors.last_name}
                  value={data.last_name}
                  action={(value) => {
                    setData((current) => ({
                      ...current,
                      last_name: value,
                    }));

                    setInputErrors((current) => ({
                      ...current,
                      last_name: false,
                    }));
                  }}
                  placeholder={t('userCommon.last')}
                  notTrimWhenKeyboardIsHide
                />
                {inputErrors.dob ? (
                  <Text style={{ color: colors.statusRed }}>
                    {t('screens.dependent.edit.date')}
                  </Text>
                ) : null}
                <TouchableOpacity
                  style={[
                    styles.inputContainer,
                    styles.row,
                    styles.birthday,
                    inputErrors.dob ? { borderColor: colors.statusRed, borderWidth: 1 } : {},
                  ]}
                  onPress={() => {
                    setShow(true);
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      position: 'absolute',
                      left: '4%',
                      top: Platform.OS === 'ios' ? '56%' : '49%',
                      fontSize: 16,
                    }}
                  >
                    {data.dob
                      ? format(convertDateStringToLocalTimezoneObject(data.dob), 'MMMM dd, yyyy')
                      : ''}
                  </Text>
                  <ArrowDown style={{ position: 'absolute', right: '4%' }} />
                  <Text
                    allowFontScaling={false}
                    style={{
                      position: 'absolute',
                      left: wp('3.5%'),
                      top: Platform.OS === 'ios' ? '10.3%' : '15%',
                      color: '#999',
                      fontSize: 13,
                    }}
                  >
                    {t('screens.dependent.edit.birthday')}
                  </Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  onConfirm={onChange}
                  onCancel={() => {
                    setShow(false);
                  }}
                  date={convertDateStringToLocalTimezoneObject(data.dob || DEFAULT_DOB)}
                  mode='date'
                  textColor='#000'
                  open={show}
                  maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                />
                {!user && (
                  <Text style={styles.optionalText}> {t('screens.dependent.edit.optional')}</Text>
                )}

                <View style={styles.measureContainer}>
                  <View
                    style={{
                      width: '48%',
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <PickerDropdown
                      value={data.height}
                      placeholder={t('userCommon.height')}
                      containerStyle={styles.heightPicker}
                      items={height}
                      setVisible={(value) => setVisible(value)}
                      visible={visible}
                      onChange={(value) => setData((current) => ({ ...current, height: value }))}
                    />
                  </View>
                  <View style={{ width: '48%' }}>
                    <InputLeftLabel
                      onFocus={() => setShow(false)}
                      value={data.weight ? data.weight.toString() : undefined}
                      keyboardType='numeric'
                      onValueChange={(val) => setData((current) => ({ ...current, weight: +val }))}
                      action={(val) => setData((current) => ({ ...current, weight: +val }))}
                      placeholder={t('userCommon.weight')}
                      maxLength={4}
                    />
                  </View>
                </View>
                {user ? (
                  <View style={styles.vaccineContainer}>
                    <Text style={styles.vaccineTest}>
                      {t('screens.dependent.edit.vaccination.title')}
                    </Text>
                    <SelectorComponent
                      style={styles.selectVaccineContainer}
                      arrow={false}
                      type='inAll'
                      data={[
                        {
                          title:
                            user?.immunization?.document && user?.immunization?.document?.media[0]
                              ? t('screens.dependent.edit.vaccination.view')
                              : t('screens.dependent.edit.vaccination.upload'),
                          profileColor: colors.primaryPavement,
                          isProfileCircle: true,
                          icon:
                            user?.immunization?.document &&
                            user?.immunization?.document?.media[0] ? (
                              <Icon
                                type='MaterialIcons'
                                name='assignment-turned-in'
                                size={24}
                                isGradient
                              />
                            ) : (
                              <Icon type='MaterialIcons' name='add' size={24} isGradient />
                            ),
                          // hide for now
                          // leftIcon:
                          //   user?.vaccinationData &&
                          //   user?.vaccinationData.base64File ? (
                          //     <TouchableOpacity
                          //       style={styles.removeButton}
                          //       onPress={handleRemove}
                          //     >
                          //       <Text style={styles.removeText}>Remove</Text>
                          //     </TouchableOpacity>
                          //   ) : null,
                          onClick: () => {
                            if (
                              user?.immunization?.document &&
                              user?.immunization?.document?.media[0]
                            )
                              LogEvent('ProfileDependentsInfo_click_View');
                            else LogEvent('ProfileDependentsInfo_click_Upload');
                            navigation.navigate('VaccineEdit', {
                              uuid,
                            });
                          },
                        },
                      ]}
                    />
                  </View>
                ) : null}
              </View>
              <View style={{ marginVertical: hp('3%') }}>
                <BlueButton
                  title={t('screens.dependent.edit.button')}
                  action={submitHandler}
                  disabled={
                    (data.first_name || '').length < 1 ||
                    (data.last_name || '').length < 1 ||
                    !data.dob
                  }
                />
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
      <CompletedScreen
        title={t('screens.dependent.edit.modalTitle')}
        visible={isSavedModalVisible}
      />
      <Modal
        isVisible={isDeleteModalVisible}
        style={{ margin: 0 }}
        onBackdropPress={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => {
              setDeleteModalVisible(false);
              LogEvent('ProfileDependentsInfo_click_Delete');
              navigation.navigate('DeleteAccount', { isMainUser: false, uuid });
            }}
          >
            <View style={styles.modalRowFirst}>
              <Text allowFontScaling={false} style={styles.rowText}>
                {t('screens.dependent.edit.modal.delete')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              LogEvent('ProfileDependentsInfo_click_Cancel');
              setDeleteModalVisible(false);
            }}
          >
            <View style={styles.modalRow}>
              <Text allowFontScaling={false} style={styles.rowTextCancel}>
                {t('screens.dependent.edit.modal.cancel')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerBtn: {
    marginRight: wp('4%'),
  },
  container: {
    paddingHorizontal: wp('4%'),
    justifyContent: 'space-between',
    height: '100%',
  },
  rowText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.statusRed,
  },
  rowTextCancel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.greyDark2,
  },
  modalView: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    height: hp('23%'),
    bottom: 0,
  },
  modalRowFirst: {
    marginRight: wp('6.4%'),
    marginLeft: wp('6.4%'),
    borderRadius: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('5%'),
    marginBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderColor: '#D6D6D6',
    borderWidth: 1,
  },
  modalRow: {
    marginRight: wp('6.4%'),
    marginLeft: wp('6.4%'),
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
  heightPicker: {
    width: '100%',
  },
  measureContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  birthday: {
    position: 'relative',
  },
  inputContainer: {
    width: '100%',
    borderRadius: 16,
    maxHeight: hp('8.5%'),
    minHeight: hp('8.5%'),
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#D6D6D6',
    marginBottom: Number(hp('1%')),
    borderWidth: 1,
    backgroundColor: '#fff',
    marginVertical: hp('1%'),
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: hp('2.5%'),
    marginHorizontal: wp('3.5%'),
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerTitleSmall: {
    fontSize: 16,
    fontFamily: 'Museo_500',
  },
  patternBottom: {
    flexDirection: 'row',
  },
  patternTop: {
    alignItems: 'flex-end',
  },
  patternSection: {
    marginTop: hp('14%'),
  },
  doneText: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: '500',
    color: '#2A4D9B',
  },
  doneSection: {
    marginTop: hp('21.5%'),
    width: '100%',
    alignItems: 'center',
  },
  modalSavedView: {
    position: 'absolute',
    backgroundColor: '#FECD46',
    borderRadius: 30,
    width: '100%',
    height: hp('100%'),
    bottom: 0,
  },
  vaccineContainer: {
    marginTop: 14,
  },
  vaccineTest: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    marginLeft: 8,
    color: colors.greyDark2,
  },
  selectVaccineContainer: {
    borderWidth: 1,
    borderColor: colors.greyLight,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
    fontSize: 16,
    marginTop: 16,
  },
  removeButton: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: colors.statusRed,
  },
  removeText: {
    color: colors.statusRed,
    fontFamily: 'Museo_900',
  },
  optionalText: {
    color: colors.greyGrey,
    marginVertical: 10,
    marginLeft: 5,
    fontSize: 14,
    fontFamily: 'Museo_500',
  },
});
