import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { BlueButton } from '../../components/Buttons/BlueButton';
// Svg-s
import { updateUser } from '../../store/user/slice';
import ArrowDown from '../../components/Svg/arrowDown';
import { height } from '../../utilis/mock';
import InputLeftLabel from '../../components/InputLeftLabel';
import HeaderComp from '../../components/HeaderComp';
import { colors } from '../../theme';
import SelectorComponent from '../../components/SelectorComponent';
import CompletedScreen from '../../components/CompletedScreen';
import { LogEvent } from '../../analytics';
import {
  convertDateStringToLocalTimezoneObject,
  convertDateObjectToDateString,
  DEFAULT_DOB,
} from '../../helpers/functions';
import Icon from '../../components/Icon';
import { IS_DEV } from '../../utilis/axios';
import PickerDropdown from '../../components/Picker';

const DatePicker = Platform.OS !== 'web' ? require('react-native-date-picker').default : View;

export default ({ navigation, route }) => {
  const { users, usersLookup, insuranceData } = useSelector((s) => s.user);
  const { t } = useTranslation();

  const [isSavedModalVisible, setSavedModalVisible] = useState(false);

  const ModalOn = (res) => {
    if (res.meta.requestStatus === 'fulfilled') {
      setSavedModalVisible(true);
      setTimeout(() => navigation.goBack(), 2000);
    }
  };

  useEffect(() => {
    LogEvent('ProfileHealthProfile_screen');
  }, []);

  const userData = route.params?.uuid ? usersLookup[route.params.uuid] : usersLookup[users[0]];

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHeightPicker, setShowHeightPicker] = useState(false);
  const [data, setData] = useState({
    uuid: userData.uuid,
    dob: userData.dob,
    height: userData.height,
    weight: userData.weight,
  });
  const dispatch = useDispatch();

  const onChange = (selectedDate) => {
    const dobFormatted = convertDateObjectToDateString(selectedDate);

    setShowDatePicker(false);
    setData((s) => ({ ...s, dob: dobFormatted }));
  };

  const onSave = () => {
    LogEvent('ProfileHealthProfile_click_Save');
    dispatch(updateUser(data)).then((res) => ModalOn(res));
  };

  const sortedUserId = users && users[0];
  let vaccinedata;
  // eslint-disable-next-line no-restricted-syntax
  for (const key in usersLookup) {
    if (key) {
      // usersLookup.hasOwnProperty(key)
      const value = usersLookup[key];
      if (key === sortedUserId) {
        vaccinedata = value;
      }
    }
  }

  const handleBack = () => {
    LogEvent('ProfileHealthProfile_click_Back');
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <HeaderComp
        center={[t('profile.health.header'), styles.headerTitle]}
        left='arrow'
        onLeftClick={handleBack}
        addStyle={styles.profileHeader}
      />
      <LinearGradient colors={['#ffffff', '#ffffff']} start={{ x: 0, y: 0 }} style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          // keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View>
              <TouchableOpacity
                style={[styles.inputContainer, styles.row, styles.birthday]}
                onPress={() => {
                  setShowDatePicker(true);
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
                  {t('profile.health.birthday')}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                textColor='#000'
                open={showDatePicker}
                date={convertDateStringToLocalTimezoneObject(data.dob || DEFAULT_DOB)}
                onConfirm={onChange}
                onCancel={() => {
                  setShowDatePicker(false);
                }}
                mode='date'
              />
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
                    placeholder={t('placeholder.height')}
                    containerStyle={styles.heightPicker}
                    items={height}
                    setVisible={(value) => setShowHeightPicker(value)}
                    visible={showHeightPicker}
                    onChange={(value) => setData((current) => ({ ...current, height: value }))}
                  />
                </View>
                <View style={{ width: '48%', paddingRight: '2%' }}>
                  <InputLeftLabel
                    value={data.weight ? data.weight.toString() : undefined}
                    keyboardType='numeric'
                    onValueChange={(val) => setData((current) => ({ ...current, weight: +val }))}
                    action={(val) => setData((current) => ({ ...current, weight: +val }))}
                    placeholder={t('placeholder.weight')}
                    notTrimWhenKeyboardIsHide
                    maxLength={4}
                  />
                </View>
              </View>
              <Text style={styles.vaccineTest}>
                {t('screens.dependent.edit.vaccination.title')}
              </Text>
              <SelectorComponent
                style={{
                  borderWidth: 1,
                  borderColor: colors.greyLight,
                  borderBottomColor: colors.greyLight,
                  borderBottomWidth: 1,
                  fontSize: 16,
                  marginTop: 16,
                }}
                arrow={false}
                type='inAll'
                data={[
                  {
                    title:
                      vaccinedata && vaccinedata.immunization.document?.media?.length > 0
                        ? t('screens.dependent.edit.vaccination.view')
                        : t('screens.dependent.edit.vaccination.upload'),
                    isProfileCircle: true,
                    icon:
                      vaccinedata && vaccinedata.immunization.document?.media?.length > 0 ? (
                        <Icon
                          type='MaterialIcons'
                          name='assignment-turned-in'
                          size={24}
                          isGradient
                        />
                      ) : (
                        <Icon type='MaterialIcons' name='add' size={24} isGradient />
                      ),
                    onClick: () => {
                      if (vaccinedata && vaccinedata.immunization.document?.media?.length > 0) {
                        LogEvent('ProfileHealthProfile_click_View');
                      } else {
                        LogEvent('ProfileHealthProfile_click_Upload');
                      }
                      navigation.navigate('VaccineEdit', { uuid: data.uuid });
                    },
                  },
                ]}
              />
              {IS_DEV && (
                <SelectorComponent
                  style={{
                    borderWidth: 1,
                    borderColor: colors.greyLight,
                    borderBottomColor: colors.greyLight,
                    borderBottomWidth: 1,
                    fontSize: 16,
                    marginTop: 16,
                  }}
                  arrow={false}
                  type='inAll'
                  data={[
                    {
                      title: insuranceData
                        ? t('profile.health.insurance.view')
                        : t('profile.health.insurance.upload'),
                      isProfileCircle: true,
                      icon: (
                        <Icon
                          type='MaterialIcons'
                          name={insuranceData ? 'assignment-turned-in' : 'add'}
                          size={24}
                          isGradient
                        />
                      ),
                      onClick: () => {
                        if (insuranceData) {
                          LogEvent('ProfileHealthProfile_click_PreviewIns');
                        }
                        LogEvent('ProfileHealthProfile_click_UploadIns');
                        navigation.navigate('Insurance', { uuid: data.uuid });
                      },
                    },
                  ]}
                />
              )}
            </View>
            <View style={{ marginVertical: hp('3%') }}>
              <BlueButton title={t('button.save')} action={onSave} />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
      <CompletedScreen title={t('profile.health.compModal')} visible={isSavedModalVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4%'),
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  vaccinePickerText: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    marginLeft: 16,
  },
  vaccineTest: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    marginLeft: 8,
    marginTop: 14,
    color: colors.greyDark2,
  },
  vaccinePicker: {
    width: '100%',
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: hp('8.5%'),
    minHeight: hp('8.5%'),
    borderWidth: 1,
    fontSize: 20,
    borderColor: colors.greyLight,
    borderRadius: hp('2%'),
    backgroundColor: '#fff',
  },
  indicatorView: {
    height: '100%',
    width: '100%',
    marginTop: '50%',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: hp('2.5%'),
    marginHorizontal: wp('4%'),
  },
  measureContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  birthday: {
    position: 'relative',
  },
  inputContainer: {
    width: wp('90%'),
    borderRadius: 16,
    height: 68,
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
  },
});
