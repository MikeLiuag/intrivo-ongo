import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import HeaderComp from '../../components/HeaderComp';
import InputLeftLabel from '../../components/InputLeftLabel';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { colors } from '../../theme';
import { resetPassword } from '../../store/app/slice';
import useIsFloatingKeyboard from '../../utilis/keyboard';
import { LogEvent } from '../../analytics';

export default ({ navigation, route }) => {
  const { email, code } = route?.params || {};

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [newpassword, setNewPassword] = useState('');
  const [newpasswordVisible, setNewPasswordVisible] = useState(true);
  const [newPasswordError, setNewPasswordError] = useState(false);

  const error = useSelector((state) => state.app.globalError);

  // fix for keyboard
  const floating = useIsFloatingKeyboard();

  useEffect(() => {
    LogEvent('ForgotPassNew_screen');
  }, []);

  useEffect(() => {
    if (error?.message === 'Verification code is incorrect') {
      navigation.pop(1);
    }
  }, [error, navigation]);

  const ButtonHandler = async () => {
    LogEvent('ForgotPassNew_click_Set');
    if (password.length < 1) {
      setPasswordError(true);
    } else if (newpassword.length < 1) {
      setNewPasswordError(true);
    } else if (password !== newpassword) {
      setNewPasswordError('Passwords do not match');
    } else {
      dispatch(resetPassword({ email, code, password }));
    }
  };

  const hasUppercase = /[A-Z]/g;
  const hasNumber = /\d/g;
  const hasSpecialCharacter = /[-!$%^&*()@#_+|~=`{}[\]:";'<>?,./]/;
  const length = /^.{8,}$/;
  const validNumber = [hasUppercase, hasNumber, hasSpecialCharacter, length]
    .map((item) => item.test(password))
    .filter((item) => !!item).length;
  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.container}>
      <View style={styles.profileHeader}>
        <HeaderComp
          left="arrow"
          onLeftClick={() => {
            LogEvent('ForgotPassNew_click_Back');
            navigation.pop(2);
          }}
        />
      </View>
      <LinearGradient
        colors={['#ffffff', '#F3F6FC']}
        start={{ x: 0, y: 0 }}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          enabled={!floating}
        >
          <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.TitleView}>
              <Text style={styles.TextTitle1}>
                {t('screens.newPass.firstRow')}
              </Text>
              <Text style={styles.TextTitle2}>
                {t('screens.newPass.secondRow')}
              </Text>
            </View>
            <View style={styles.passwordContainer}>
              <InputLeftLabel
                error={passwordError}
                placeholder="Password"
                // textContentType="password"
                value={password}
                secureTextEntry={passwordVisible}
                action={(value) => {
                  setPassword(value);
                  setPasswordError(false);
                }}
                hideShow
                hideShowAction={() => setPasswordVisible(!passwordVisible)}
                showPassword={passwordVisible}
              />
              <View style={styles.passwordIndicators}>
                {[...Array(4).keys()].map((item) => (
                  <View
                    style={validNumber > item ? styles.valid : styles.invalid}
                  />
                ))}
              </View>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text allowFontScaling={false} style={styles.passwordInfo}>
                    {t('screens.newPass.char')}
                  </Text>
                  <Text allowFontScaling={false} style={styles.passwordInfo}>
                    {t('screens.newPass.symb')}
                  </Text>
                </View>
                <View style={styles.col}>
                  <Text allowFontScaling={false} style={styles.passwordInfo}>
                    {t('screens.newPass.upper')}
                  </Text>
                  <Text allowFontScaling={false} style={styles.passwordInfo}>
                    {t('screens.newPass.numb')}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.passwordContainer}>
              <InputLeftLabel
                error={newPasswordError}
                placeholder={t('screens.newPass.placeholder')}
                // textContentType="password"
                value={newpassword}
                secureTextEntry={newpasswordVisible}
                action={(value) => {
                  setNewPassword(value);
                  setNewPasswordError(false);
                }}
                hideShow
                hideShowAction={() =>
                  setNewPasswordVisible(!newpasswordVisible)
                }
                showPassword={newpasswordVisible}
              />
            </View>
            <View style={styles.ViewBlueButton}>
              <BlueButton
                title={t('screens.newPass.button')}
                action={ButtonHandler}
                disabled={
                  !password ||
                  !newpassword ||
                  validNumber < 4 ||
                  password !== newpassword
                }
              />
            </View>
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyWhite,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.greyWhite,
    marginHorizontal: 10,
  },
  headerBtn: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
  },
  TitleView: {
    alignItems: 'center',
    marginTop: 30,
  },
  TextTitle1: {
    fontSize: 18,
    fontFamily: 'Museo_500',
    color: colors.greyDark2,
  },
  TextTitle2: {
    fontSize: 18,
    fontFamily: 'Museo_500',
    color: colors.greyDark2,
  },
  ViewDiscrption: {
    alignItems: 'center',
    marginTop: 10,
  },
  TextDiscrption: {
    fontSize: 13,
    color: colors.greyGrey,
  },
  ViewBlueButton: {
    paddingHorizontal: wp('4%'),
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 24,
    marginTop: 20,
  },
  passwordContainer: {
    // justifyContent: 'center',
    paddingHorizontal: wp('4%'),
    marginTop: 20,
  },
  row: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 40,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
  },
  passwordInfo: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 28,
    letterSpacing: 0.2,
    color: colors.greyMed,
  },
  valid: {
    width: wp('20%'),
    backgroundColor: colors.primaryBlue,
    height: 7,
    marginRight: 4,
    borderRadius: 10,
  },
  invalid: {
    width: wp('20%'),
    backgroundColor: colors.primaryBlue,
    opacity: 0.3,
    height: 7,
    marginRight: 4,
    borderRadius: 10,
  },
  passwordIndicators: {
    marginTop: 24,
    width: wp('90%'),
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    height: 7,
    flexDirection: 'row',
  },
});
