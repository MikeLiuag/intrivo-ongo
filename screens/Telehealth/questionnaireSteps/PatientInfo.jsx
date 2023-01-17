import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { differenceInYears } from 'date-fns';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AlertNote from '../../../components/AlertNote';
import { colors } from '../../../theme';
import UserInfoForm from '../../../components/UserInfoForm';
import { BlueButton } from '../../../components/Buttons/BlueButton';
import { updateUser } from '../../../store/user/slice';

function PatientInfo({ userInfo, onChangeState }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { users, usersLookup } = useSelector((state) => state.user) || {};
  const user = usersLookup[userInfo.id || users[0]];
  const isDependent = userInfo.id !== users[0];

  const [data, setData] = useState({
    id: userInfo.id,
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

  const [checked, setChecked] = useState(false);
  const [measureChecked, setMeasureChecked] = useState(false);

  const renderNote = () => {
    const age = differenceInYears(new Date(), new Date(data.dob));
    if (age < 18 && isDependent) {
      return <AlertNote text={t('screens.telehealth.patient.note')} style={styles.alertNote} />;
    }
    return null;
  };

  const onPressNext = () => {
    updateUserAddress();

    onChangeState(data, 'userInfo', true);
  };

  const updateUserAddress = () => {
    const requestData = {
      uuid: data?.id,
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
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {renderNote()}
      <UserInfoForm
        data={data}
        setData={setData}
        withBorder={false}
        checked={checked}
        setChecked={setChecked}
        addressEdit={addressEdit}
        setMeasureChecked={setMeasureChecked}
        measureChecked={measureChecked}
        measureEdit={measureEdit}
      />
      <BlueButton
        style={{ marginVertical: 20 }}
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
    </KeyboardAwareScrollView>
  );
}

export default PatientInfo;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  infoText: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyDark,
  },
  noteText: {
    marginTop: 55,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alertNote: {
    marginBottom: 28,
  },
});
