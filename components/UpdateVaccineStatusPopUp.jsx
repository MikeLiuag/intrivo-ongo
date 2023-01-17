import React, { useState, useEffect, createElement } from 'react';
import { Modal, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { BlueButton } from './Buttons/BlueButton';
import LoaderComp from './LoaderComp';
import { colors } from '../theme';
import { updateVaccineStatus } from '../store/user/slice';
import CompletedScreen from './CompletedScreen';

export default () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [checkedItem, setCheckedItem] = useState();
  const [isSavedModalVisible, setSavedModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { users, organizationsLookup, usersLookup } = useSelector((s) => s.user);

  const [currIndex, setCurrIndex] = useState(0);
  const user = users[0] && usersLookup[users[0]];
  const currOrg = organizationsLookup?.[user?.organizations[currIndex]?.uuid] || false;
  const isConsent = user?.organizations[currIndex]?.hasConsent || false;
  const isAgreed = user?.organizations[currIndex]?.hasShareData;
  const isMandatory =
    organizationsLookup?.[user?.organizations[currIndex]?.uuid]?.meta?.vaccineMetaData
      ?.isMandatory || false;
  const immunizationStatus = user?.immunization?.uuid;
  const isVisible = currOrg && isConsent && isAgreed && isMandatory && !immunizationStatus;

  const sendConsent = async (apply) => {
    const res = await dispatch(
      updateVaccineStatus({
        uuid: users[0],
        postData: {
          immunization_status: checkedItem.value,
          immunization_type: 'covid_19',
        },
      })
    );
    if (res?.type.includes('fulfilled')) {
      if (
        checkedItem === t('updateVaccineStatus.notVaccinated') ||
        checkedItem === t('updateVaccineStatus.dontShare')
      ) {
        setSavedModalVisible(true);
      }
      setTimeout(() => {
        if (
          checkedItem === t('updateVaccineStatus.notVaccinated') ||
          checkedItem === t('updateVaccineStatus.dontShare')
        ) {
          setSavedModalVisible(false);
        } else {
          navigation.navigate('FilePicker', {
            uuid: users[0],
            isFromOrgConsent: true,
            analyticName: 'VaccineCard',
            maskType: 'card',
            title: t('vaccine.picker.title'),
            needToResize: true,
          });
        }
      }, 2000);
    }
  };

  return (
    <Modal visible={isVisible}>
      <Text style={styles.title}>{t(`updateVaccineStatus.title`)}</Text>
      <FlatList
        data={[
          {
            title: t('updateVaccineStatus.vaccinated'),
            value: 'fully_vaccinated',
          },
          {
            title: t('updateVaccineStatus.partiallyVaccinated'),
            value: 'partially_vaccinated',
          },
          {
            title: t('updateVaccineStatus.notVaccinated'),
            value: 'not_vaccinated',
          },
          {
            title: t('updateVaccineStatus.dontShare'),
            value: 'not_shared',
          },
        ]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.containerItem} onPress={() => setCheckedItem(item)}>
            <Text style={styles.labelItem}>{item.title}</Text>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                borderWidth: 1,
                borderColor:
                  checkedItem && checkedItem.value === item.value
                    ? colors.primaryBlue
                    : colors.greyExtraLight,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  height: 18,
                  width: 18,
                  borderRadius: 10,
                  backgroundColor:
                    checkedItem && checkedItem.value === item.value
                      ? colors.primaryBlue
                      : 'transparent',
                  borderWidth: 1,
                  borderColor:
                    checkedItem && checkedItem.value === item.value
                      ? colors.primaryBlue
                      : colors.greyExtraLight,
                }}
              />
            </View>
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          paddingBottom: 24,
          alignItems: 'center',
        }}
      >
        <BlueButton
          disabled={!checkedItem || (checkedItem && !checkedItem.value)}
          title='Continue'
          style={styles.button}
          action={async () => {
            sendConsent(true);
          }}
        />
      </View>
      {isLoading && (
        <View style={styles.containerLoader}>
          <LoaderComp />
        </View>
      )}
      <CompletedScreen title={t('updateVaccineStatus.statusSaved')} visible={isSavedModalVisible} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 78,
    left: 20,
    minHeight: 35,
    minWidth: 35,
    elevation: 10,
    zIndex: 10,
  },
  title: {
    fontFamily: 'Museo_700',
    fontSize: 26,
    lineHeight: 32,
    color: colors.greyMidnight,
    marginTop: 78,
    marginBottom: 24,
    marginStart: wp('5%'),
    marginEnd: wp('3%'),
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp('7%'),
    marginTop: wp('5%'),
    marginLeft: wp('5%'),
    marginRight: wp('5%'),
    borderColor: colors.greyExtraLight,
    borderWidth: 1,
    borderRadius: wp('5%'),
  },
  labelItem: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 22,
    color: colors.greyDark2,
  },
  button: {
    width: wp('86%'),
    marginHorizontal: wp('4%'),
    marginBottom: hp('4%'),
  },
  containerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
