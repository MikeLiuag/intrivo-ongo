import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../../../theme';
import { saveInsuranceInformation } from '../../../store/user/slice';
import InsuranceForm from '../../../components/InsuranceForm';
import { fonts } from '../../../theme/fonts';
import { BlueButton } from '../../../components/Buttons/BlueButton';
import {
  createUserInsurance,
  setLongCovidState,
  uploadInsuranceCard,
} from '../../../store/longCovid/slice';
import { LogEvent } from '../../../analytics';
import { getUploadImageObjectFromFile } from '../../../utilis/helpers';

const Insurance = ({ userInfo, insuranceInfo, onChangeState }) => {
  const {
    insuranceName,
    firstName,
    lastName,
    relationship,
    memberId,
    birthDay,
    frontCard,
    backCard,
  } = insuranceInfo;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const state = useSelector(({ longCovid }) => longCovid);

  useEffect(() => {
    LogEvent('LCOVID_Virtual_CardDet_screen');
  }, []);

  const [saveData, setSaveData] = useState(false);

  const disableButton =
    !firstName.length ||
    !lastName.length ||
    !insuranceName.length ||
    !memberId.length ||
    !birthDay.length ||
    !insuranceName.length ||
    !relationship.length ||
    !frontCard ||
    !backCard;

  const openPreview = (params) => navigate('FilePreview', params);
  const openImagePicker = (params) => navigate('FilePicker', params);

  const saveToProfile = () => {
    dispatch(
      saveInsuranceInformation({
        data: {
          ...insuranceInfo,
          userId: userInfo.id,
        },
        saveData,
      })
    );
  };

  const onPressNext = () => {
    const cardFrontObj = getUploadImageObjectFromFile(frontCard);
    const cardBackObj = getUploadImageObjectFromFile(backCard);
    const postData = new FormData();

    postData.append('document_type', 'insurance_card');
    postData.append('media[0][file]', cardFrontObj);
    postData.append('media[0][subtype]', 'insurance_card_front');
    postData.append('media[1][file]', cardBackObj);
    postData.append('media[1][subtype]', 'insurance_card_back');

    dispatch(uploadInsuranceCard({ id: userInfo.id, data: postData }))
      .unwrap()
      .then((result) => {
        const insuranceData = {
          document_id: result.uuid,
          insurance_provider_id: insuranceInfo.id,
          insurance_name: insuranceInfo.insuranceName,
          member_id: memberId,
          policy_holder_first_name: firstName,
          policy_holder_last_name: lastName,
          policy_holder_middle_name: '',
          relationship_to_policy_holder: relationship,
          policy_holder_dob: birthDay,
        };

        // TODO saveToProfile();
        onChangeState(insuranceData, 'userInsurance');
        onChangeState(false, 'termsAndConditionsAccepted', true);
      });
  };

  const onChangeData = (newInfo) => onChangeState(newInfo, 'insuranceInfo');

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.description}>{t('screens.telehealth.insurance.title')}</Text>
      <InsuranceForm
        data={insuranceInfo}
        setData={onChangeData}
        openPreview={openPreview}
        openImagePicker={openImagePicker}
      />
      <BlueButton
        title='Next'
        style={styles.button}
        action={onPressNext}
        disabled={disableButton}
      />
    </KeyboardAwareScrollView>
  );
};

export default Insurance;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    flexGrow: 1,
  },
  description: {
    fontFamily: fonts.familyLight,
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyDark,
    marginBottom: 16,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginTop: 20,
    padding: 0,
    marginBottom: -12,
  },
  checkboxText: {
    fontFamily: fonts.familyLight,
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyDark,
  },
  button: {
    marginTop: 50,
  },
});
