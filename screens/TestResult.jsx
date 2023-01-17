import React, { useEffect } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
// components
import { useTranslation } from 'react-i18next';
import HeaderComp from '../components/HeaderComp';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import NegativeSvgHead from '../components/Svg/ResultScreen/NegativeSvgHead';

import SelectorComponent from '../components/SelectorComponent';
import IconButton from '../components/IconButton';
import PositiveSvgHead from '../components/Svg/ResultScreen/PositiveSvgHead';
import InvalidSvgHead from '../components/Svg/ResultScreen/InvalidSvgHead';
import { LogEvent } from '../analytics';
import Icon from '../components/Icon';
import { openLink } from '../utilis/link';
import { iso8601ToDate, formats, iso8601ToFormatted } from '../utilis/dateTime';

const TreatmentImg = require('../assets/treatment.png');

export default function TestResultScreen({
  route: {
    params: { data, slideFromBottom },
  },
}) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { result, name, patient, date, symptoms } = data;

  const symptomsForDisplay = symptoms.map((s) => s.name.concat(' '));

  const sniffleNegativeResultTile = useSelector((state) => state.app.sniffleNegativeResultTile);

  useEffect(() => {
    LogEvent('PastTest', data.id);
  }, [data.id]);

  const returnStatusText = () => {
    if (result === 0) return 'Negative';
    if (result === 1) return 'Positive';
    return 'Invalid';
  };

  const returnStatusColor = () => {
    if (result === 0) return colors.statusGreen;
    if (result === 1) return colors.statusRed;
    return colors.statusOrange;
  };

  const returnWarningText = () => {
    const warning = t('screens.testResult.warning.text');
    return <Text style={styles.warning}>{warning}</Text>;
  };

  const returnNextText = () => {
    if (result === 0) return t('screens.testResult.next.negativeTitle');
    return t('screens.testResult.next.title');
  };

  const returnHead = () => {
    if (result === 0) return <NegativeSvgHead />;
    if (result === 1) return <PositiveSvgHead />;
    return <InvalidSvgHead />;
  };

  const resultLogEvent = (title) => {
    switch (result) {
      case 1:
        LogEvent(`Positive_${title}`);
        break;
      case 0:
        LogEvent(`Negative_${title}`);
        break;
      default:
        LogEvent(`Invalid_${title}`);
        break;
    }
  };

  const getTime = () =>
    `${iso8601ToDate(date).toLocaleTimeString(undefined, {
      timeZoneName: 'short',
    })}`;

  const getTestName = () =>
    data.testName
      .replace('COVID-19 Antigen Self-Test', '')
      .replace('COVID-19 Antigen Home Test', '');

  const iconButtons = [
    // ...returnExtraMenuOptions(),
    {
      title: t('screens.testResult.next.care'),
      icon: <Icon type='Ionicons' name='md-navigate' size={24} isGradient />,
      onClick: () => {
        resultLogEvent('Care');
        navigation.navigate('CareList', { showBack: true });
      },
    },
    {
      title: t('screens.testResult.next.cdc'),
      icon: <Icon type='MaterialIcons' name='clean-hands' size={24} isGradient />,
      onClick: () => {
        resultLogEvent('CDC');
        openLink(navigation, false, {
          url:
            result === 1
              ? 'https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/index.html'
              : 'https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/index.html',
          useWebView: true,
        });
      },
    },
    {
      title: t('screens.testResult.next.another'),
      icon: <Icon type='MaterialIcons' name='coronavirus' size={24} isGradient />,
      onClick: () => {
        resultLogEvent('AnotherTest');
        navigation.navigate('Intrivo');
      },
    },
  ];

  return (
    <SafeAreaView
      // edges={['right', 'left']}
      style={{ flex: 1, backgroundColor: '#ffffff' }}
    >
      <HeaderComp
        left={slideFromBottom ? 'x' : 'arrow'}
        // color="white"
        center={[
          'Test result',
          {
            color: colors.greyMidnight,
            fontSize: 16,
            fontFamily: 'Museo_700',
          },
        ]}
        addStyle={{ paddingHorizontal: 24, paddingVertical: 20 }}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          {returnHead()}
          <View style={styles.basicInfoContainer}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <View style={{ flex: 1, minWidth: 200 }}>
                <Text style={styles.testName}>{name}</Text>
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: returnStatusColor(),
                    ...styles.statusBox,
                  }}
                >
                  <Text style={styles.statusText}>{returnStatusText()}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.patientName}>{patient}</Text>
          </View>
          {result === 0 && <View style={styles.warningContainer}>{returnWarningText()}</View>}
          <View style={styles.btnsContainer}>
            <Text style={{ ...styles.blockTitle, marginBottom: 16 }}>{returnNextText()}</Text>
            {result === 0 && (
              <SelectorComponent
                style={{
                  marginBottom: 16,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                  backgroundColor: colors.primaryPavement,
                }}
                data={[
                  ...(sniffleNegativeResultTile && symptoms.length
                    ? [
                        {
                          title: t(
                            `screens.testResult.next.${
                              result === 1 ? 'treatmentPositive' : 'treatmentNegative'
                            }`
                          ),
                          description: t(
                            `screens.testResult.next.${
                              result === 1 ? 'treatmentDescPositive' : 'treatmentDescNegative'
                            }`
                          ),
                          descriptionStyle: {
                            color: colors.primaryBlue,
                            fontFamily: fonts.familyBold,
                          },
                          isProfileCircle: true,
                          icon: <Image source={TreatmentImg} style={{ width: 24, height: 24 }} />,
                          onClick: () => {
                            navigation.navigate('AssessmentInfoVB');
                          },
                          hideRightIcon: true,
                        },
                      ]
                    : []),

                  {
                    title: t('screens.testResult.next.vaccine'),
                    description: t('screens.testResult.next.vaccineDesc'),
                    icon: (
                      <Icon type='MaterialCommunityIcons' name='shield-plus' size={24} isGradient />
                    ),
                    onClick: () => {
                      resultLogEvent('Vaccine');
                      navigation.navigate('VaccineLanding', {
                        result,
                      });
                    },
                    isProfileCircle: true,
                    descriptionStyle: {
                      color: colors.primaryBlue,
                      fontFamily: fonts.familyBold,
                    },
                  },
                ]}
                arrow={false}
              />
            )}
            <View style={styles.row}>
              {iconButtons.map(({ title, icon, onClick }, index) => (
                <IconButton
                  style={{
                    marginRight: index < iconButtons.length - 1 ? 16 : 0,
                    height: 125,
                    flex: 1,
                  }}
                  title={title}
                  icon={icon}
                  onClick={onClick}
                />
              ))}
            </View>
          </View>
          <View style={styles.symptomsContainer}>
            <Text style={styles.blockTitle}>{t('screens.testResult.sympt')}</Text>
            {symptoms.length ? (
              symptomsForDisplay.map((s) => (
                <Text key={s} style={styles.symp}>
                  {s}
                </Text>
              ))
            ) : (
              <Text style={styles.symp}>{t('screens.testResult.noSympt')}</Text>
            )}
          </View>
          <View style={[styles.symptomsContainer, { marginTop: 24 }]}>
            <Text style={styles.blockTitle}>{t('screens.testResult.testType')}</Text>
            <Text style={styles.dateText}>{getTestName()}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.blockTitle}>{t('screens.testResult.date')}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <Text style={styles.dateText}>
                {iso8601ToFormatted(date, formats.longDateWithDayOfWeek)}
              </Text>
              <Text style={styles.dateText}>{getTime()}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  basicInfoText: {
    color: colors.greyMed,
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Museo_300',
  },
  infoContainer: {
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: colors.primaryPavement,
    borderRadius: 16,
  },
  titleStatus: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Museo_700',
  },
  resultHead: {
    height: 268,
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'space-between',
    paddingBottom: 31,
    alignItems: 'center',
  },
  dateText: {
    color: colors.greyGrey,
    fontSize: 14,
    fontFamily: 'Museo_300',
  },
  dateContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: 24,
  },
  btnsContainer: {
    paddingVertical: 23,
    paddingHorizontal: 24,
  },
  symptomsContainer: {
    // paddingVertical: 16,
    paddingBottom: 32,
    marginHorizontal: 24,
    borderBottomColor: colors.greyExtraLight,
    borderBottomWidth: 1,
  },
  blockTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Museo_700',
    marginBottom: 8,
  },
  symp: {
    color: colors.greyGrey,
    fontSize: 14,
    fontFamily: 'Museo_500',
  },
  statusCircle: {
    width: 102,
    height: 102,
    borderRadius: 102,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  basicInfoContainer: {
    padding: 24,
  },
  testName: {
    color: colors.greyDark2,
    fontSize: 18,
    fontFamily: 'Museo_900',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  patientName: {
    color: colors.greyGrey,
    fontSize: 12,
    marginBottom: 8,
    fontFamily: 'Museo_500',
  },
  statusBox: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  statusText: {
    color: 'white',
    fontFamily: 'Museo_500',
    fontSize: 14,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },

  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingLeft: 30,
    paddingTop: 24,
  },

  warningContainer: {
    padding: 16,
  },
  warning: {
    color: colors.greyMed,
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 24,
  },
  warningHeader: {
    color: '#B00020',
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 24,
  },
});
