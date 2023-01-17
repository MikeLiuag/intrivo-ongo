import React, { useState, useEffect } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Pressable,
  Switch,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';

// import * as Updates from 'expo-updates';

import ToggleSwitch from 'toggle-switch-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { AuthenticationType, supportedAuthenticationTypesAsync } from 'expo-local-authentication';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { currentBuild, currentVersion, applicationName } from '../utilis/constants';
import InfoIcon from '../components/Svg/infoIcon';
import { LogEvent } from '../analytics';

import HeaderComp from '../components/HeaderComp';
import { colors } from '../theme';
import { switchBio } from '../store/app/slice';
import { IS_DEV } from '../utilis/axios';

export default () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { deleteRequestedDate } = useSelector((state) => state.app);
  const bioSetting = useSelector((state) => state.app?.bioSetting) ?? null;
  const updateVersion = useSelector((state) => state.app?.updateVersion) ?? null;
  const instanceId = useSelector((state) => state.app.instanceId) ?? null;
  const reportingPopup = useSelector((s) => s.app.reportingPopup);
  const [bioType, setBioType] = useState(null);
  // const pushToken = useSelector((state) => state.app?.pushToken) ?? null;
  const navigation = useNavigation();
  const [value, switchValue] = useState(bioSetting || false);
  const [showUpdateVersion, setShowUpdateVersion] = useState(false);

  const { usersLookup } = useSelector((s) => s.user);
  const listToDisplay = Object.values(usersLookup);
  const primaryUser = listToDisplay[0];
  const { user_agreements: userAgreement } = primaryUser;
  const shareResultAgreement = userAgreement.data.filter(
    (item) => item.agreement_subject === 'Share results'
  )[0];

  const switchHandler = (tog) => {
    switchValue(tog);
    dispatch(switchBio());
  };

  const bioString = (type) => {
    if (type === 'FINGERPRINT') {
      return Platform.OS === 'android' ? 'Fingerprint' : 'TouchID';
    }
    return 'Face ID';
  };

  // determine what type of biometrics the user has
  const checkBioType = async () => {
    const types = await supportedAuthenticationTypesAsync();
    if (types.length !== 0) {
      const type = AuthenticationType[types[0]];
      setBioType(type);
    }
  };

  useEffect(() => {
    LogEvent(`ProfileSettings_screen`);
    checkBioType();
  }, []);

  const handleBack = () => {
    LogEvent('ProfileSettings_click_Back');
    navigation.goBack();
  };

  const handleEditPass = () => {
    LogEvent('ProfileSettings_click_EditPassword');
    navigation.navigate('ForgetScreenPassword', { fromProfile: true });
  };

  const handleEditReporting = () => {
    LogEvent('ProfileSettings_click_EditReporting');
    navigation.navigate('NIHStack', {
      fromProfile: true,
      agreementId: shareResultAgreement?.agreement_uuid,
    });
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderComp
        center={[
          t('screens.accSettings.title'),
          { fontSize: 16, color: 'black', fontFamily: 'Museo_700' },
        ]}
        onLeftClick={handleBack}
        left='arrow'
        addStyle={styles.profileHeader}
      />
      <View style={styles.viewContainer}>
        <View style={styles.itemContainer}>
          <View>
            <Text style={styles.placeholderText}>{t('placeholder.pass')}</Text>
            <Text style={styles.valueText}> *******************</Text>
          </View>
          <TouchableOpacity
            onPress={handleEditPass}
            hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
          >
            <Text style={styles.editText}>{t('screens.accSettings.edit')}</Text>
          </TouchableOpacity>
        </View>
        {reportingPopup ? (
          <View style={styles.itemContainer}>
            <View>
              <Text style={styles.placeholderText}>{t('screens.accSettings.reporting')}</Text>
              <Text style={styles.valueText}>
                {shareResultAgreement?.user_agreement_option
                  ? shareResultAgreement?.user_agreement_option?.data?.subject
                  : t('screens.accSettings.noSelection')}
              </Text>
            </View>
            <TouchableOpacity
              hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
              onPress={handleEditReporting}
            >
              <Text style={styles.editText}>{t('screens.accSettings.edit')}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {/* <Text style={styles.editText}>Edit</Text> */}
      </View>
      {bioType && (
        <View style={styles.faceIdContainer}>
          <Text style={styles.faceIdText}>{bioString(bioType)}</Text>
          <Switch
            value={value}
            onColor='#34C759'
            offColor={colors.greyGrey}
            onValueChange={switchHandler}
          />
        </View>
      )}
      {/* <View style={styles.viewContainer}>
        <InputLeftLabel value={pushToken} placeholder="Push Token" />
      </View> */}
      <View style={styles.footer}>
        <Text onPress={() => setShowUpdateVersion(IS_DEV && true)}>
          {t('screens.accSettings.version')} - {currentVersion} ({currentBuild}){' '}
          {IS_DEV ? `[${applicationName}]` : ''}
        </Text>
        {deleteRequestedDate ? (
          <View style={styles.deleteRequested}>
            <InfoIcon width={32} height={32} />
            <View style={styles.deleteRequestedContent}>
              <Text style={styles.deleteRequestedTitle}>
                {t('screens.accSettings.requestedDeleteTitle')}
              </Text>
              <Text style={styles.deleteRequestedRegular}>
                {t('screens.accSettings.requestedDeleteContent1', {
                  date: format(new Date(deleteRequestedDate), 'MMM dd, yyyy'),
                })}
                <Text style={styles.deleteRequestedRegular}>
                  {t('screens.accSettings.requestedDeleteContent2')}
                </Text>
                {t('screens.accSettings.requestedDeleteContent3')}
              </Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.buttonDeleteAccount}
            hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
            onPress={() => {
              LogEvent('ProfileSettings_click_DeleteAccount');
              navigation.navigate('DeleteAccount', { isMainUser: true });
            }}
          >
            <Text style={styles.deleteAccount}>{t('screens.accSettings.deleteAccount')}</Text>
          </TouchableOpacity>
        )}
        {showUpdateVersion && updateVersion && (
          <Pressable onPress={() => Clipboard.setString(updateVersion)}>
            <Text style={styles.updateVersion}>Update version: {updateVersion}</Text>
          </Pressable>
        )}
        {showUpdateVersion && (
          <Pressable onPress={() => Clipboard.setString(instanceId)}>
            <Text style={styles.updateVersion}>Instance Id: {instanceId}</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    width: '76%',
    textAlign: 'center',
  },
  viewContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
    justifyContent: 'center',
  },
  faceIdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  faceIdText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Museo_700',
  },
  editText: {
    fontSize: 16,
    fontFamily: 'Museo_700',
    color: colors.primaryBlue,
  },
  footer: {
    marginVertical: hp('10%'),
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 20,
  },
  buttonDeleteAccount: {
    paddingTop: 10,
  },
  deleteAccount: {
    fontSize: 14,
    fontFamily: 'Museo_700',
    color: colors.primaryBlue,
    lineHeight: 18,
    padding: 5,
  },
  deleteRequested: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 15,
    marginHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.statusRed,
  },
  deleteRequestedContent: {
    flex: 1,
    marginLeft: 10,
  },
  deleteRequestedTitle: {
    fontSize: 14,
    fontFamily: 'Museo_700',
    color: colors.greyMidnight,
    lineHeight: 20,
  },
  deleteRequestedRegular: {
    fontSize: 14,
    fontFamily: 'Museo_300',
    color: colors.greyMed,
    lineHeight: 20,
  },
  deleteRequestedBold: {
    fontSize: 14,
    fontFamily: 'Museo_700',
    color: colors.greyMed,
    lineHeight: 20,
  },
  updateVersion: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Museo_500',
  },
  itemContainer: {
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomColor: colors.borderBottomColor,
    borderBottomWidth: 1,
  },
  placeholderText: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Museo_700',
    color: colors.black,
  },
  valueText: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Museo_500',
    color: colors.greyMed,
    marginTop: 7,
  },
});
