import React, { useCallback, useState, useEffect } from 'react';
import { Modal, StyleSheet, View, Text, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlueButton } from './Buttons/BlueButton';
import LoaderComp from './LoaderComp';
import { colors } from '../theme';
import { fetchClientAgreement, sendConsents, setUserAgreementSetting } from '../store/user/slice';
import AgreementCheck from './AgreementCheck';

export default () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [consent, setConsent] = useState('');

  const dispatch = useDispatch();
  const { users, usersLookup, organizationsLookup } = useSelector((s) => s.user);

  const [currIndex, setCurrIndex] = useState(0);

  const user = users[0] && usersLookup[users[0]];
  const currOrg = organizationsLookup?.[user?.organizations[currIndex]?.uuid] || false;
  const isConsent = user?.organizations[currIndex]?.hasConsent || false;
  const isMandatory =
    organizationsLookup?.[user?.organizations[currIndex]?.uuid]?.meta?.vaccineMetaData
      ?.isMandatory || false;
  const isAgreed = user?.organizations[currIndex]?.hasShareData;

  const eulaAgreement = user?.user_agreements?.data?.filter((item) =>
    item.collection_names.includes('eula')
  )[0];

  const isVisible = currOrg && isConsent && isMandatory && !isAgreed;
  const isEulaVisible = eulaAgreement?.status === 'pending';
  const hideTestResult =
    organizationsLookup?.[user?.organizations[currIndex]?.uuid]?.meta?.orgMetaData
      ?.hideTestResult || false;

  const getAgreementDetail = useCallback(async () => {
    if (isEulaVisible) {
      const response = await dispatch(
        fetchClientAgreement({ agreementId: eulaAgreement?.agreement_uuid })
      );
      const { payload } = response;
      if (response?.type.includes('fulfilled')) {
        const { data } = payload;
        setConsent(data);
      }
    }
  }, [eulaAgreement, isEulaVisible, dispatch]);

  useEffect(() => {
    getAgreementDetail();
  }, [isEulaVisible, getAgreementDetail]);

  const sendConsent = async (apply) => {
    if (user?.organizations.length >= currIndex + 1) {
      setIsLoading(true);
    }
    const res = await dispatch(
      sendConsents({
        userId: user.uuid,
        orgId: user?.organizations[currIndex].uuid,
        org_membership: user?.organizations[currIndex]?.hasConsent,
        org_share_data: apply,
      })
    );

    if (user?.organizations.length < currIndex + 1) {
      setCurrIndex((state) => state + 1);
      return;
    }
    // if (Object.keys(usersLookup).length < currUserIndex + 1) {
    //   setCurrUserIndex((state) => state + 1);
    //   setCurrIndex(0);
    //   return;
    // }
    if (res?.type.includes('fulfilled')) {
      setIsLoading(false);
    }
  };

  const acceptEulaAgreement = async () => {
    const requestData = {
      data: {
        agreement_id: eulaAgreement.agreement_uuid,
        option_value: 'accept',
      },
    };
    await dispatch(setUserAgreementSetting({ requestData }));
  };

  const agreementContent = {
    eula: {
      title: t(`updateConsent.title`),
      content: consent?.content || t(`introSteps.5.subtitle`),
      postScrollText:
        eulaAgreement?.user_agreement_option?.data?.subject || t('warning.CheckBoxText'),
    },
    vaccine: {
      title: t(`organizationConsent.title`),
      content: t(`organizationConsent.consent`),
      postScrollText: hideTestResult
        ? `${t('organizationConsent.acceptHideResult')} ${
            organizationsLookup?.[user?.organizations[currIndex]?.uuid]?.name
          }`
        : `${t('organizationConsent.acceptShowResult')} ${
            organizationsLookup?.[user?.organizations[currIndex]?.uuid]?.name
          }`,
    },
  };

  const selectContent = isEulaVisible ? agreementContent.eula : agreementContent.vaccine;

  return (
    <Modal visible={isVisible || isEulaVisible}>
      <SafeAreaView style={styles.containerContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{selectContent?.title}</Text>
        </View>
        <AgreementCheck
          agreementText={selectContent?.content}
          style={styles.containerScroll}
          preScrollText={t('warning.Scroll')}
          postScrollText={selectContent?.postScrollText}
          isChecked={isChecked}
          onChecked={(checked) => setChecked(checked)}
        />
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <BlueButton
            disabled={!isChecked}
            title='Continue'
            style={styles.button}
            action={async () => {
              if (isEulaVisible) {
                acceptEulaAgreement();
              } else {
                sendConsent(true);
              }
            }}
          />
        </View>
      </SafeAreaView>

      {isLoading && (
        <View style={styles.containerLoader}>
          <LoaderComp />
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    paddingTop: Platform.OS === 'ios' ? 78 : 28,
    paddingBottom: 24,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 78 : 28,
    left: 20,
    minHeight: 35,
    minWidth: 35,
    elevation: 10,
    zIndex: 10,
  },
  containerContent: {
    flex: 1,
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: hp('50%'),
    paddingTop: 24,
  },
  title: {
    fontFamily: 'Museo_700',
    fontSize: 26,
    lineHeight: 32,
    color: colors.greyMidnight,
    marginEnd: wp('3%'),
  },
  containerScroll: {
    flex: 1,
    paddingHorizontal: wp('5%'),
  },
  consentText: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    lineHeight: 24,
    color: colors.greyDark,
  },
  containerFooter: {
    flex: 1,
    width: wp('100%'),
    justifyContent: 'flex-end',
  },
  checkboxText: {
    color: colors.greyMidnight,
    fontFamily: 'Museo_700',
    fontSize: 16,
    marginRight: 20,
  },
  scrollText: {
    color: colors.greyGrey,
    fontFamily: 'Museo_500',
    fontSize: 16,
    marginLeft: wp('8%'),
    marginTop: hp('1.5%'),
    marginBottom: hp('2%'),
  },
  button: {
    width: wp('86%'),
    marginHorizontal: wp('4%'),
    marginVertical: hp('2%'),
  },
  containerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 10,
    paddingHorizontal: wp('5%'),
  },
});
