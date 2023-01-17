import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import { colors } from '../theme';
import CheckmarkSvg from './Svg/checkMarkThinSvg';
import Routine from './Routine';
import { cleanInvitesList, sendConsents } from '../store/user/slice';
import LoaderComp from './LoaderComp';
import {LogEvent} from '../analytics';

export default ({isSchool, onCancel, onContinue}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [currentOrg, setCurrentOrg] = useState(null);

  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const users = useSelector(s => s.user.users);
  const routines = useSelector(s => s.user.routines);
  const invitationList = useSelector(s => s.user.invitationList)
  const organizationDetails = useSelector((state) => state.bulkTesting.organizationDetails);

  const currOrg = isSchool ? organizationDetails : currentOrg || false;

  useEffect(() => {
    if(invitationList.length !== 0) {
      setCurrentOrg({
        ...invitationList[currIndex].organization.data,
        meta: JSON.parse(invitationList[currIndex].organization.data.meta)
      })
    }
  },[invitationList, currIndex])

  const setNext = async (apply) => {
    if (invitationList.length >= currIndex + 1) {
      setIsLoading(true);
    }
    const res = await dispatch(
      sendConsents({
        userId: users[0],
        orgId: currentOrg?.uuid,
        org_membership: apply,
        org_share_data: apply,
        inviteId: invitationList[currIndex].uuid
      })
    );

    if (invitationList.length < currIndex + 1) {
      setCurrIndex((state) => state + 1);
      return;
    }
    // if (Object.keys(usersLookup).length < currUserIndex + 1) {
    //   setCurrUserIndex((state) => state + 1);
    //   setCurrIndex(0);
    //   return;
    // }
    if (res?.type.includes('fulfilled')) {
      if(invitationList.length <= currIndex + 1) {
        dispatch(cleanInvitesList())
      }
      setIsLoading(false);
    }
  };

  return (
    <Modal visible={isSchool || invitationList.length !== 0}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.head}>
            <View style={styles.imageWrapper}>
              <Image
                source={{
                  uri: currentOrg?.meta.orgMetaData.logo,
                }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.greenCircle}>
                <CheckmarkSvg color="white" width={18} height={13.5} />
              </View>
            </View>
            <Text style={styles.name}>{currentOrg?.name}</Text>
            <Text
              style={styles.subText}
            >{t('organizationInvite.subTitle', {name: currentOrg?.name})}</Text>
          </View>
          <View style={styles.body}>
            {routines?.length > 0 && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.boldText}>Active routines</Text>
                  <TouchableOpacity
                    onPress={() => {
                      LogEvent('OnboardingOrgConsent_click_SeeMore');
                      switchInvitePopUp(false);
                      navigation.navigate('Organization', {
                        id: currOrg.uuid,
                      });
                    }}
                  >
                    <Text style={styles.link}>See more</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.routineContainer}>
                  {(routines || []).map((item) => (
                    <Routine color="#FFFFFF" item={item} />
                  ))}
                </View>
              </>
            )}
            <Text style={{ ...styles.boldText, marginBottom: 16 }}>
              Sharing settings
            </Text>
            <Text
              style={styles.subText}
            >{t('organizationInvite.sharingSubtitle', {name: currentOrg?.name})}</Text>
          </View>
          {/* <Button */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 'auto',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                LogEvent('OnboardingOrgConsent_click_NoThanks')
                if(isSchool) {
                  onCancel();
                } else {
                  Alert.alert(
                    t('organizationInvite.leaveTitle'),
                    t('organizationInvite.leaveSubtitle'),
                    [
                      {
                        text: t('organizationInvite.leaveCancel'),
                      },
                      {
                        text: t('organizationInvite.leaveSubmit'),
                        onPress: () => {
                          setNext(false);
                        },
                      },
                    ]
                  );
                }
              }}
              style={{
                borderWidth: 1,
                borderColor: colors.greyGrey,
                borderRadius: 16,
                paddingVertical: 16,
                paddingHorizontal: 24,
                marginRight: 16,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{ ...styles.btnText, color: colors.greyMidnight }}
              >
                {t('organizationInvite.cancelButton')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                LogEvent('OnboardingOrgConsent_click_Continue');
                if(isSchool) {
                  onContinue();
                } else {
                  setNext(true);
                }
              }}
              style={{
                borderRadius: 16,
                paddingVertical: 16,
                paddingHorizontal: 24,
                backgroundColor: colors.primaryBlue,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ ...styles.btnText, color: 'white' }}>
                {t('organizationInvite.submitButton')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {isLoading && (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <LoaderComp />
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontSize: 14,
    fontFamily: 'Museo_700',
  },
  routineContainer: {
    paddingVertical: 17,
  },
  link: {
    fontSize: 14,
    color: '#0B56A3',
    fontFamily: 'Museo_700',
  },
  boldText: {
    color: colors.greyDark2,
    fontSize: 18,
    fontFamily: 'Museo_700',
  },
  body: {
    paddingTop: 32,
    width: '100%',
  },
  subText: {
    color: '#ADADAD',
    fontSize: 14,
    fontFamily: 'Museo_500',
  },
  name: {
    color: colors.greyMidnight,
    fontSize: 20,
    fontFamily: 'Museo_700',
    marginBottom: 8,
    lineHeight: 34,
  },
  head: {
    borderBottomColor: colors.greyExtraLight,
    borderBottomWidth: 1,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 32,
    paddingTop: 14,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: 40,
    paddingTop: 68,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  closeBtn: {
    marginLeft: 'auto',
  },
  imageWrapper: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: colors.greyUltraLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  image: {
    height: 40,
    width: 40,
  },
  greenCircle: {
    height: 35,
    width: 35,
    borderRadius: 35,
    backgroundColor: colors.statusGreen,
    position: 'absolute',
    right: -10.5,
    top: -10.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
