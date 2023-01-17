import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, View, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HeaderComp from '../../components/HeaderComp';
import CloseIcon from '../../components/Svg/close';
import InputLeftLabel from '../../components/InputLeftLabel';
import { BlueButton } from '../../components/Buttons/BlueButton';
import LoaderComp from '../../components/LoaderComp';
import CompletedScreen from '../../components/CompletedScreen';
import { colors } from '../../theme';
import { createEmployee } from '../../store/bulkTesting/slice';
import PickerDropdown from '../../components/Picker';

const AddEmployee = ({ route }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { selectedTab, hasRoutines } = route.params;
  const { users, usersLookup, organizationsLookup } = useSelector((state) => state.user);
  const userType =
    organizationsLookup?.[usersLookup[users[0]]?.organizations[0]?.uuid]?.meta?.orgMetaData
      ?.translations?.en?.userNoun?.key_one;

  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    identifier: '',
    email: '',
    phone: '',
    group: '',
    invite: false,
  });
  const [inputErrors, setInputErrors] = useState({
    email: false,
    phone: false,
  });
  const [groupList, setGroupList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isSavedModalVisible, setSavedModalVisible] = useState(false);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  const { groups } = useSelector((state) => state.bulkTesting);
  useEffect(() => {
    const formattedGroups = [];
    groups.forEach((group) => {
      formattedGroups.push({ label: group.name, value: group.uuid });
    });
    setGroupList(formattedGroups);
    setData({ ...data, group: route.params?.selectedGroupId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  const isValidData =
    data.first_name?.length < 1 ||
    data.last_name?.length < 1 ||
    data.identifier?.length < 1 ||
    !data.group ||
    data.group?.length < 1;

  const onSave = async () => {
    if (
      (data.email.length === 0 || /\S+@\S+\.\S+/.test(data.email)) &&
      (data.phone.length === 0 || data.phone.length === 10)
    ) {
      setLoading(true);
      const response = await dispatch(
        createEmployee({
          data,
          selectedTab,
          hasRoutines,
          translations: t,
        })
      );
      setLoading(false);
      if (response.type?.includes('fulfilled')) {
        setSavedModalVisible(true);
        setTimeout(() => {
          setSavedModalVisible(false);
          navigation.goBack();
        }, 2000);
      }
    }
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoiding}
      >
        <HeaderComp
          addStyle={styles.headerStyle}
          center={[t('bulkTesting.addEmployee.title', { userType }), styles.headerTitle]}
          right={[<CloseIcon width={14} height={14} />, () => navigation.goBack()]}
        />
        <ScrollView style={styles.mainContainer} keyboardShouldPersistTaps='handled'>
          <InputLeftLabel
            placeholder={t('bulkTesting.addEmployee.firstName')}
            value={data.first_name}
            action={(value) => setData((current) => ({ ...current, first_name: value }))}
          />
          <InputLeftLabel
            placeholder={t('bulkTesting.addEmployee.lastName')}
            value={data.last_name}
            action={(value) => setData((current) => ({ ...current, last_name: value }))}
          />
          <InputLeftLabel
            placeholder={t('bulkTesting.addEmployee.employeeId', {
              userType: userType?.charAt(0).toUpperCase() + userType?.slice(1),
            })}
            value={data.identifier}
            action={(value) => setData((current) => ({ ...current, identifier: value }))}
          />
          <InputLeftLabel
            placeholder={t('bulkTesting.addEmployee.email')}
            value={data.email}
            error={!emailInputRef.current?.isFocused() && inputErrors.email}
            action={(value) => {
              setData((current) => ({ ...current, email: value }));
              setInputErrors((current) => {
                if (value.length === 0 || /\S+@\S+\.\S+/.test(value)) {
                  return {
                    ...current,
                    email: false,
                  };
                }
                return {
                  ...current,
                  email: 'Please enter a valid email address',
                };
              });
            }}
            autoCompleteType='email'
            textContentType='emailAddress'
            keyboardType='email-address'
            inputRef={emailInputRef}
          />
          <InputLeftLabel
            placeholder={t('bulkTesting.addEmployee.phone')}
            value={data.phone}
            error={!phoneInputRef.current?.isFocused() && inputErrors.phone}
            action={(value) => {
              setData((current) => ({ ...current, phone: value }));
              setInputErrors((current) => ({
                ...current,
                phone:
                  value.length > 0 && value.length !== 10
                    ? 'Please enter a 10 digit phone number'
                    : false,
              }));
            }}
            textContentType='telephoneNumber'
            autoCompleteType='tel'
            keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'phone-pad'}
            inputRef={phoneInputRef}
          />
          <PickerDropdown
            value={data.group}
            placeholder={t('bulkTesting.addEmployee.group')}
            items={groupList}
            onChange={(value) => {
              setData((current) => ({ ...current, group: value }));
            }}
          />
          <View>
            {/* <CheckBox
          title={t('bulkTesting.addEmployee.invite')}
          titleProps={{ allowFontScaling: false }}
          checked={data.invite}
          containerStyle={{
            backgroundColor: 'transparent',
            borderWidth: 0,
          }}
          checkedColor={colors.primaryBlue}
          uncheckedColor={colors.greyLight}
          onPress={() => setData((current) => ({ ...current, invite: !data.invite }))}
          textStyle={styles.invite}
        /> */}
          </View>
        </ScrollView>
        <BlueButton
          title={`${t('bulkTesting.addEmployee.save')} ${userType}`}
          action={onSave}
          style={{ marginHorizontal: 24, marginBottom: 30 }}
          styleText={styles.whiteText}
          disabled={isValidData}
        />
      </KeyboardAvoidingView>
      {isLoading && <LoaderComp />}
      <CompletedScreen
        title={t('bulkTesting.addEmployee.saved', { userType })}
        visible={isSavedModalVisible}
      />
    </SafeAreaView>
  );
};

export default AddEmployee;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
    paddingBottom: hp('2%'),
    backgroundColor: colors.greyWhite,
  },
  headerStyle: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  headerTitle: {
    fontFamily: 'Museo_500',
    fontSize: 16,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  invite: {
    fontFamily: 'Museo_500',
    fontSize: 16,
  },
});
