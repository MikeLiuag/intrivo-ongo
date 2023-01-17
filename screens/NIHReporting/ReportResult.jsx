import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Accordion from 'react-native-collapsible/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../../theme';
import HeaderComp from '../../components/HeaderComp';
import Icon from '../../components/Icon';
import { BlueButton } from '../../components/Buttons/BlueButton';
import NIHReportForm from '../../components/NIHReportForm';
import { LogEvent } from '../../analytics';
import { updateUser } from '../../store/user/slice';
import CompletedScreen from '../../components/CompletedScreen';
import { iso8601ToDateLong } from '../../utilis/dateTime';

const zipRegex = /^((\w{2,}[-\s.])+\w{2,})$|^(\w{4,})$/;

const ReportResult = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { type } = route.params;
  const [activeSections, setActiveSections] = useState([0]);
  const { usersLookup } = useSelector((s) => s.user);

  // add the main user to the list to display
  const listToDisplay = Object.values(usersLookup);
  const primaryUser = listToDisplay[0];
  const tempData = {};

  listToDisplay.forEach((item, index) => {
    tempData[item.uuid] = {
      sex: item?.sex,
      race: item?.race?.data?.uuid,
      ethinicity: item.ethnicity?.data?.uuid,
    };
    if (index === 0) {
      tempData[listToDisplay[0].uuid] = {
        zipcode: primaryUser?.location?.zipcode,
        state_id: primaryUser?.location?.state,
        address: primaryUser?.location?.address_1,
        city: primaryUser?.location?.city,
        sex: primaryUser?.sex,
        race: primaryUser?.race?.data?.uuid,
        ethinicity: primaryUser.ethnicity?.data?.uuid,
      };
    }
  });

  const [reportData, setReportData] = useState({ ...tempData });

  const [isSavedModalVisible, setSavedModalVisible] = useState(false);

  useEffect(() => {
    if (type === 'report_all') {
      LogEvent('ProfileSettingsReportingAll_screen');
    } else {
      LogEvent('ProfileSettingsReportingSome_screen');
    }
  }, [type]);

  const updateSections = (activeSection) => {
    setActiveSections([...activeSection]);
  };

  const formatPhonenumber = (text) => {
    const formattedText = text?.slice(-10);
    return `${formattedText?.substr(0, 3)}-${formattedText?.substr(3, 3)}-${formattedText?.substr(
      6
    )}`;
  };

  const renderHeader = (section, index, isActive) => (
    <View style={[styles.sectionHeader, isActive && styles.activeSectionHeader]}>
      <Text style={styles.sectionTitle}>
        {section?.first_name} {section?.last_name}
      </Text>
      <Icon
        type='MaterialCommunityIcons'
        name={isActive ? 'minus' : 'plus'}
        size={24}
        color={colors.black}
      />
    </View>
  );

  const renderContent = (section, index) => (
    <View style={styles.sectionContent}>
      {type === 'report_all' ? (
        <>
          <Text style={styles.sectionTitle}>
            {t('placeholder.birthday')}:{' '}
            <Text style={styles.itemText}>{iso8601ToDateLong(section?.dob)}</Text>
          </Text>
          {index === 0 ? (
            <>
              <Text style={styles.sectionTitle}>
                {t('placeholder.phoneNumber')}:{' '}
                <Text style={styles.itemText}>{formatPhonenumber(section?.phone?.number)}</Text>
              </Text>
              <Text style={styles.sectionTitle}>
                {t('placeholder.emailOnly')}: <Text style={styles.itemText}>{section?.email}</Text>
              </Text>
            </>
          ) : null}
        </>
      ) : (
        <View>
          <Text style={styles.instructionText}>{t('reporting.instruction2')}</Text>
          <Text style={[styles.sectionTitle, styles.birthdayText]}>
            {t('placeholder.birthday')}:{' '}
            <Text style={[styles.itemText, styles.birthdayText]}>
              {iso8601ToDateLong(section?.dob)}
            </Text>
          </Text>
        </View>
      )}

      <NIHReportForm
        type={type}
        index={index}
        data={{ ...reportData[listToDisplay[index].uuid] }}
        onChangeData={(data) => {
          const tempReportData = reportData;
          tempReportData[listToDisplay[index].uuid] = { ...data };
          setReportData({ ...tempReportData });
        }}
      />
    </View>
  );

  const ModalOn = useCallback(
    (res) => {
      if (res) {
        setSavedModalVisible(true);
        setTimeout(() => navigation.goBack(), 2000);
      }
    },
    [navigation]
  );

  const saveReportData = async () => {
    const listData = Object.values(reportData);

    if (type === 'report_all') {
      LogEvent('ProfileSettingsReportingAll_click_Save');
    } else {
      LogEvent('ProfileSettingsReportingSome_click_Save');
    }

    listData.forEach(async (item, index) => {
      const data = {
        city: item.city,
        zipcode: item.zipcode,
        sex: item.sex,
        uuid: listToDisplay[index].uuid,
        raceId: item.race,
        ethnicityId: item.ethinicity,
        address_1: item.address,
        state_id: item?.state_id,
      };
      await dispatch(updateUser(data));
    });
    ModalOn(true);
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.conitaner}>
      <HeaderComp
        center={[
          type === 'report_all' ? t('reporting.option1') : t('reporting.option2'),
          styles.headerTitle,
        ]}
        left='arrow'
        addStyle={styles.header}
        onLeftClick={() => {
          if (type === 'report_all') {
            LogEvent('ProfileSettingsReportingAll_click_Back');
          } else {
            LogEvent('ProfileSettingsReportingSome_click_Back');
          }
          navigation.goBack();
        }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          <Text style={styles.text}>
            {type === 'report_all'
              ? t('reporting.reportResultDescription')
              : t('reporting.resultsAnonymouslyDescription')}
            {'\n\n'}
            {t('reporting.instruction')}
          </Text>
          <View style={{ marginTop: 20 }}>
            <Accordion
              sections={listToDisplay}
              activeSections={activeSections}
              renderHeader={renderHeader}
              renderContent={renderContent}
              onChange={updateSections}
              underlayColor={colors.greyWhite}
            />
            <View style={styles.separator} />
          </View>
          <View style={styles.footer}>
            <BlueButton
              title={t('button.save')}
              styleText={styles.blueButtonText}
              style={styles.blueButton}
              disabled={!zipRegex.test(reportData[listToDisplay[0].uuid].zipcode)}
              action={() => {
                saveReportData();
              }}
            />
          </View>
        </View>
      </ScrollView>
      <CompletedScreen title={t('reporting.informationSaved')} visible={isSavedModalVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conitaner: {
    flex: 1,
    backgroundColor: colors.primaryGhost,
  },
  header: {
    paddingTop: 12,
    paddingLeft: 12,
  },
  headerTitle: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Museo_700',
  },
  content: {
    marginHorizontal: 25,
    marginTop: 24,
    flex: 1,
  },
  title: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyMed,
    fontFamily: 'Museo_700',
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyMed,
    fontFamily: 'Museo_300',
    letterSpacing: 0.2,
  },
  sectionHeader: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.secondaryButtonBorder,
    alignItems: 'center',
    marginBottom: 20,
  },
  activeSectionHeader: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Museo_500',
    color: colors.greyDark2,
    lineHeight: 22,
  },
  sectionContent: {
    paddingBottom: 20,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Museo_300',
    color: colors.greyDark2,
    lineHeight: 22,
  },
  separator: {
    height: 1,
    backgroundColor: colors.secondaryButtonBorder,
  },
  heightPicker: {
    width: wp('42%'),
    height: 60,
    position: 'relative',
    textAlign: 'center',
    borderWidth: 1,
    paddingHorizontal: Platform.OS === 'ios' ? hp('1.5%') : hp('0.7%'),
    paddingTop: hp('2.6%'),
    fontSize: 20,
    borderColor: colors.greyLight,
    borderRadius: hp('2%'),
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginVertical: hp('1%'),
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  blueButton: { height: 60, marginTop: 40, borderRadius: 16 },
  blueButtonText: {
    fontSize: 16,
    color: colors.greyWhite,
    fontFamily: 'Museo_700',
    lineHeight: 19,
  },
  instructionText: {
    color: colors.greyMed,
    fontSize: 13,
    fontFamily: 'Museo_300_Italic',
    lineHeight: 16,
  },
  birthdayText: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default ReportResult;
