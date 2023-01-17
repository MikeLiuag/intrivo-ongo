import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { updateUser, changePhone } from '../../store/user/slice';
import { BlueButton } from '../../components/Buttons/BlueButton';
import InputLeftLabel from '../../components/InputLeftLabel';

import { states } from '../../utilis/mock';
import HeaderComp from '../../components/HeaderComp';
import CompletedScreen from '../../components/CompletedScreen';
import GooglePlacesInput from '../../components/GooglePlacesInput';
import { LogEvent } from '../../analytics';
import useIsFloatingKeyboard from '../../utilis/keyboard';
import PickerDropdown from '../../components/Picker';

const zipRegex = /^((\w{2,}[-\s.])+\w{2,})$|^(\w{4,})$/;

export default ({ navigation, route }) => {
  const { users, usersLookup } = useSelector((s) => s.user);
  const { t } = useTranslation();

  useEffect(() => {
    LogEvent('ProfileBasicInfo_screen');
  }, []);

  const userData = route.params?.uuid ? usersLookup[route.params.uuid] : usersLookup[users[0]];

  const userPhone = userData?.phone?.number;

  const phoneVerified = route.params?.phoneVerified;

  const dispatch = useDispatch();

  const [oldPhonenumber, setOldPhonenumber] = useState('');

  const [inputErrors, setInputErrors] = useState({
    first_name: false,
    last_name: false,
    email: false,
    address_1: false,
    city: false,
    zipcode: false,
    phone: false,
  });

  const [isSavedModalVisible, setSavedModalVisible] = useState(false);

  // fix for keyboard
  const floating = useIsFloatingKeyboard();

  const ModalOn = useCallback(
    (res) => {
      if (res?.meta?.requestStatus === 'fulfilled' || phoneVerified) {
        setSavedModalVisible(true);
        setTimeout(() => navigation.navigate('Dashboard'), 2000);
      }
    },
    [navigation, phoneVerified]
  );

  const [data, setData] = useState({
    uuid: userData?.uuid,
    first_name: userData?.first_name,
    middle_name: userData?.middle_name,
    last_name: userData?.last_name,
    email: userData?.email,
    state_id: userData?.location?.state,
    address_1: userData?.location?.address_1,
    address_2: userData?.location?.address_2,
    city: userData?.location?.city,
    zipcode: userData?.location?.zipcode,
    phone: userPhone,
    fromBasicInfo: true,
  });

  const isValidUser =
    data.first_name?.length < 1 ||
    data.last_name?.length < 1 ||
    !/\S+@\S+\.\S+/.test(data.email) ||
    !zipRegex.test(data.zipcode) ||
    data.phone?.length < 1;

  const submitHandler = () => {
    if (isValidUser) {
      setInputErrors((current) => ({
        ...current,
        first_name: data.first_name.length < 1,
        last_name: data.last_name.length < 1,
        email: data.email.length < 1,
        address_1: data.address_1.length < 1,
        city: data.city.length < 1,
        zipcode: zipRegex.test(data.zipcode),
        phone: data.phone.length < 1,
      }));
    } else {
      LogEvent('ProfileBasicInfo_click_Save');
      const number = data.phone;
      if (!data.state_id) {
        data.state_id = '';
      }
      dispatch(updateUser(data)).then((res) => {
        if (number !== userPhone) {
          dispatch(changePhone({ number }));
        }
        ModalOn(res);
      });
    }
  };

  useEffect(() => {
    if (phoneVerified) ModalOn();
  }, [ModalOn, phoneVerified]);

  const handleBack = () => {
    LogEvent('ProfileBasicInfo_click_Back');
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, paddingBottom: hp('2%'), backgroundColor: '#ffffff' }}
        enabled={!floating}
      >
        <HeaderComp
          center={[t('profile.basicInfo.header'), styles.headerTitle]}
          left='arrow'
          onLeftClick={handleBack}
          addStyle={styles.profileHeader}
        />
        <LinearGradient colors={['#ffffff', '#ffffff']} start={{ x: 0, y: 0 }} style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'
          >
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
                  autoCompleteType='name'
                  textContentType='name'
                />
                <InputLeftLabel
                  value={data.middle_name}
                  action={(value) =>
                    setData((current) => ({
                      ...current,
                      middle_name: value,
                    }))
                  }
                  placeholder={t('userCommon.middle')}
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
                  autoCompleteType='name'
                  textContentType='familyName'
                />
                <InputLeftLabel
                  error={inputErrors.email}
                  value={data.email}
                  action={(email) => {
                    setData((current) => ({ ...current, email }));
                    setInputErrors((current) => {
                      if (/\S+@\S+\.\S+/.test(email)) {
                        return {
                          ...current,
                          email: false,
                        };
                      }
                      return {
                        ...current,
                        email: true,
                      };
                    });
                  }}
                  placeholder={t('placeholder.email')}
                  autoCompleteType='email'
                  textContentType='emailAddress'
                  keyboardType='email-address'
                />
                <GooglePlacesInput
                  placeholder={t('placeholder.address1')}
                  value={data.address_1 || ''}
                  action={(value) => {
                    setData((current) => ({
                      ...current,
                      ...value,
                    }));
                    setInputErrors((current) => ({
                      ...current,
                      address_1: false,
                    }));
                  }}
                />
                <InputLeftLabel
                  value={data.address_2}
                  action={(value) => {
                    setData((current) => ({
                      ...current,
                      address_2: value,
                    }));
                  }}
                  placeholder={t('placeholder.address2')}
                  textContentType='streetAddressLine2'
                  autoCompleteType='street-address'
                />
                <InputLeftLabel
                  error={inputErrors.city}
                  value={data.city}
                  action={(city) => {
                    setData((current) => ({ ...current, city }));
                    setInputErrors((current) => ({
                      ...current,
                      city: false,
                    }));
                  }}
                  placeholder={t('placeholder.city')}
                  textContentType='addressCity'
                  autoCompleteType='street-address'
                />

                <PickerDropdown
                  items={states}
                  value={data.state_id}
                  placeholder={t('placeholder.state')}
                  onChange={(value) => setData((current) => ({ ...current, state_id: value }))}
                />
                <InputLeftLabel
                  error={inputErrors.zipcode}
                  value={data.zipcode}
                  action={(zipcode) => {
                    setData((current) => ({ ...current, zipcode }));
                    setInputErrors((current) => ({
                      ...current,
                      zipcode: false,
                    }));
                  }}
                  placeholder={t('placeholder.zipCode')}
                  autoCompleteType='postal-code'
                  textContentType='postalCode'
                />
                <InputLeftLabel
                  error={inputErrors.phone}
                  value={data.phone}
                  action={(phone) => {
                    if (oldPhonenumber.length === 0) {
                      setOldPhonenumber(data.phone);
                    }

                    setData((current) => ({ ...current, phone }));
                    setInputErrors((current) => ({
                      ...current,
                      phone: !phone.includes('+') ? 'Must include country code' : false,
                    }));
                  }}
                  placeholder={t('placeholder.phone')}
                  textContentType='telephoneNumber'
                  autoCompleteType='tel'
                  keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'phone-pad'}
                />
              </View>
              <View style={{ marginVertical: hp('3%') }}>
                <BlueButton
                  title={t('button.save')}
                  action={submitHandler}
                  disabled={isValidUser}
                />
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
      <CompletedScreen title={t('profile.basicInfo.compModal')} visible={isSavedModalVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4%'),
    justifyContent: 'space-between',
    height: '100%',
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
    backgroundColor: '#ffffff',
    paddingVertical: hp('2.5%'),
    marginHorizontal: wp('4%'),
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
});
