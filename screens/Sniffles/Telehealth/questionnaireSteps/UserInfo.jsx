import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BlueButton } from '../../../../components/Buttons/BlueButton';
import UserInfoForm from '../../../../components/UserInfoForm';
import { snifflesFieldNames } from '../../../../store/sniffles/slice';
import { updateUser } from '../../../../store/user/slice';
import { isEmail, isZipCode } from '../../../../utilis/validations';

function UserInfo({ userInfo, onChangeState, userId }) {
  const { usersLookup } = useSelector((state) => state.user) || {};
  const user = usersLookup[userId];
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    ...userInfo,
    ...user,
    height: userInfo.height || user?.height,
    weight: user?.weight || userInfo.weight,
    firstName: user?.first_name,
    lastName: user?.last_name,
    phoneNumber: user?.phone?.number,
    zipcode: userInfo?.zipcode || user?.location?.zipcode || '',
    address_1: userInfo.address_1 || user?.location?.address_1,
    address_2: userInfo.address_2 || user?.location?.address_2,
    city: userInfo.city || user?.location?.city,
    state_id: userInfo.state_id || user?.location?.state,
  });
  const addressEdit = !(
    user?.location?.city &&
    user?.location?.zipcode &&
    user?.location?.state &&
    user?.location?.address_1
  );
  const measureEdit = !(user?.weight && user?.height);

  const [checked, setChecked] = useState(false);
  const [measureChecked, setMeasureChecked] = useState(false);

  const {
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
  } = data;

  const isNotEmpty =
    email &&
    city &&
    height &&
    weight &&
    zipcode &&
    lastName &&
    firstName &&
    phoneNumber &&
    stateId &&
    address1;

  const isValid = isNotEmpty && isEmail(email) && isZipCode(zipcode);

  const onPressNext = () => {
    updateUserAddress();
    onChangeState(data, snifflesFieldNames.USER_INFO, true);
  };

  const updateUserAddress = () => {
    const requestData = {
      uuid: data?.uuid,
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
    <ScrollView
      keyboardDismissMode='on-drag'
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps='handled'
    >
      <UserInfoForm
        data={data}
        setData={setData}
        withBorder={false}
        centerNoteText={t('screens.sniffles.snifflesTelehealth.questions.userInfo.note')}
        checked={checked}
        setChecked={setChecked}
        addressEdit={addressEdit}
        setMeasureChecked={setMeasureChecked}
        measureChecked={measureChecked}
        measureEdit={measureEdit}
      />
      <BlueButton title='Next' disabled={!isValid} action={onPressNext} style={styles.button} />
    </ScrollView>
  );
}

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
});
