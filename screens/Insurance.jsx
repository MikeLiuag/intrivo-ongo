import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { colors } from '../theme';
import { BlueButton } from '../components/Buttons/BlueButton';
import { saveInsuranceInformation } from '../store/user/slice';
import InsuranceForm from '../components/InsuranceForm';
import ScreenWrapper from './ScreenWrapper';
import { fonts } from '../theme/fonts';
import { LogEvent } from '../analytics';

const Insurance = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { navigate, goBack } = useNavigation();

  const [showMenu, setShowMenu] = useState(false);
  const { insuranceData, users } = useSelector((state) => state.user);
  const [data, setData] = useState({
    insuranceName: insuranceData?.insuranceName || '',
    firstName: insuranceData?.firstName || '',
    lastName: insuranceData?.lastName || '',
    relationship: insuranceData?.relationship || '',
    birthDay: insuranceData?.birthDay || '',
    id: insuranceData?.memberId || '',
    frontCard: insuranceData?.frontCard || null,
    backCard: insuranceData?.backCard || null,
  });

  const [saveData, setSaveData] = useState(false);

  const disableButton =
    !data.frontCard ||
    !data.backCard ||
    !data.lastName.length ||
    !data.birthDay.length ||
    !data.firstName.length ||
    !data.relationship.length ||
    !data.insuranceName.length;

  useEffect(() => {
    LogEvent('ProfileInsuranceInfo_screen');
  }, []);

  const handleClose = () => {
    LogEvent('ProfileInsuranceInfo_click_Close');
    goBack();
  };

  const openPreview = (params) => navigate('FilePreview', params);

  const openImagePicker = (params) => navigate('FilePicker', params);

  const handleNext = () => {
    LogEvent('ProfileInsuranceInfo_click_Save');
    dispatch(
      saveInsuranceInformation({
        data: {
          ...data,
          userId: route.params.userId,
        },
        saveData,
      })
    );

    goBack();
  };

  const handleMenu = () => {
    LogEvent('ProfileInsuranceInfo_click_Menu');
    setShowMenu((prev) => !prev);
  };

  return (
    <ScreenWrapper
      navStyle='popup'
      title={t('screens.telehealth.insurance.profileHeader')}
      onExit={handleClose}
      onPopupMenu={handleMenu}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.container}>
          <InsuranceForm
            data={data}
            userId={users[0]}
            setData={setData}
            openPreview={openPreview}
            openImagePicker={openImagePicker}
          />
          <View style={styles.footer}>
            <BlueButton
              action={handleNext}
              title={t('button.save')}
              disabled={disableButton}
              styleText={styles.buttonText}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal isVisible={showMenu} style={{ margin: 0 }} onBackdropPress={() => setShowMenu(false)}>
        <View style={styles.menuModal}>
          <TouchableOpacity onPress={null} style={styles.menuRow}>
            <Text allowFontScaling={false} style={styles.redText}>
              {t('vaccine.button.remove')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowMenu(false)} style={styles.menuSecondRow}>
            <Text allowFontScaling={false} style={styles.rowTextCancel}>
              {t('vaccine.button.cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

export default Insurance;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  description: {
    fontFamily: fonts.familyLight,
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyDark,
    marginBottom: 16,
  },
  button: {
    flex: 1,
  },
  buttonText: {
    fontFamily: fonts.familyBold,
    fontSize: 16,
    lineHeight: 19,
  },
  line: {
    borderWidth: 1,
    borderColor: colors.greyExtraLight,
    marginVertical: 24,
  },
  ring: {
    width: Number(wp('10%')),
    height: Number(wp('10%')),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: colors.white,
    borderRadius: Number(wp('100%')),
  },
  innerRing: {
    width: Number(wp('6%')),
    height: Number(wp('6%')),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
    shadowRadius: 2.22,
    shadowOpacity: 0.22,
    borderRadius: Number(wp('100%')),
  },
  skipButton: {
    margin: hp('1%'),
    borderRadius: Number(wp('3%')),
    borderWidth: 1,
    borderColor: colors.greyExtraLight2,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: 24,
  },
  skipText: {
    flex: 1,
    fontFamily: fonts.familyBold,
    fontSize: 16,
    lineHeight: 24,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginTop: 20,
    padding: 0,
  },
  chechboxText: {
    fontFamily: fonts.familyLight,
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyMed,
  },
  menuModal: {
    position: 'absolute',
    backgroundColor: colors.white,
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
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderColor: colors.greyLight,
    borderWidth: 1,
  },
  menuSecondRow: {
    marginRight: 24,
    marginLeft: 24,
    borderRadius: 16,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderColor: colors.greyLight,
    borderWidth: 1,
  },
  redText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.statusRed,
  },
  rowTextCancel: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 20,
  },
});
