import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { BlueButton } from '../../components/Buttons/BlueButton';
import UserInfoForm from '../../components/UserInfoForm';
import { getServiceAvailability } from '../../store/medicationFlow/slice';
import { dimensions } from './styles';
import { updateUser } from '../../store/user/slice';

const translationPath = 'screens.medicationFlow';
function MedicationUserInfo({ onChangeState, userInfo, userId, onPressNext: onNext }) {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { users, usersLookup } = useSelector((state) => state.user) || {};
  const user = usersLookup[userId || users[0]];

  if (!userId) {
    navigation.pop(2);
  }

  const [data, setData] = useState({
    firstName: userInfo?.firstName || user?.first_name,
    lastName: userInfo?.lastName || user?.last_name,
    dob: userInfo?.dob || user?.dob,
    height: userInfo?.height || user?.height || '',
    weight: Math.round(userInfo?.weight || user?.weight) || '',
    email: userInfo?.email || user?.email || '',
    phoneNumber: userInfo?.phoneNumber || user?.phone?.number || '',
    zipcode: userInfo?.zipcode || user?.location?.zipcode || '',
    state_id: userInfo?.state_id || user?.location?.state,
    address_1: userInfo?.address_1 || user?.location?.address_1,
    address_2: userInfo?.address_2 || user?.location?.address_2,
    city: userInfo?.city || user?.location?.city,
  });
  const addressEdit = !(
    user?.location?.city &&
    user?.location?.zipcode &&
    user?.location?.state &&
    user?.location?.address_1
  );
  const measureEdit = !(user?.weight && user?.height);

  const onPressNext = () => {
    updateUserState();
  };

  const updateUserState = () => {
    onChangeState(data, 'userInfo');
    dispatch(getServiceAvailability(data))
      .unwrap()
      .then((res) => {
        if (res?.eligible === true) {
          onNext();
        } else {
          navigation.navigate('CareOptionsContainer', {
            careOptionsType: 'sniffles_async_not_available',
            translationsPath: 'templates.serviceAvailability',
            type: 'Elimination',
            analyticsName: 'Sniffles_Async_Unavailable',
          });
        }
      });

    const requestData = {
      uuid: userId,
      state_id: data?.state_id,
      address_1: data?.address_1,
      address_2: data?.address_2,
      city: data?.city,
      zipcode: data?.zipcode,
      height: data?.height,
      weight: Math.round(data?.weight),
    };
    dispatch(updateUser(requestData));
  };

  return (
    <>
      <ScrollView
        style={{ paddingHorizontal: 24, marginBottom: 16 }}
        keyboardShouldPersistTaps='handled'
      >
        <UserInfoForm
          title={t(`${translationPath}.userInfo.header`)}
          data={data}
          setData={setData}
          withBorder={false}
          addressEdit={addressEdit}
          measureEdit={measureEdit}
        />
      </ScrollView>
      <BlueButton
        style={{ marginHorizontal: dimensions.pageMarginHorizontal, marginBottom: 20 }}
        title='Next'
        disabled={
          data?.firstName?.length === 0 ||
          data?.lastName?.length === 0 ||
          data?.dob?.length === 0 ||
          !data?.height ||
          !data?.weight ||
          data?.email?.length === 0 ||
          data?.phoneNumber?.length === 0 ||
          !/^((\w{2,}[-\s.])+\w{2,})$|^(\w{4,})$/.test(data?.zipcode) ||
          !data?.address_1 ||
          !data?.city ||
          !data?.state_id
        }
        action={onPressNext}
      />
    </>
  );
}

export default MedicationUserInfo;
