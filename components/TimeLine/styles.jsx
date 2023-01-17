import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { colors } from '../../theme';
import { fonts } from '../../theme/fonts';
import { BlueButton } from '../Buttons/BlueButton';
import VirusSvg from '../Svg/VirusSvg';
import LongCovidSvg from '../Svg/LongCovidSvg';
import { formats, iso8601ToFormatted } from '../../utilis/dateTime';

const ongoLogo = require('../../assets/ongo-logo.png');
const carestartLogo = require('../../assets/carestartLogo.png');

const statusColors = [colors.statusGreen, colors.statusRed, colors.statusOrange];

const returnText = (result) => {
  if (result === 0) return 'Negative';
  if (result === 1) return 'Positive';
  return 'Invalid';
};

const getResultStatus = (status) => {
  if (!status) return 2;
  if (status.includes('not_detected')) return 0;
  if (status.includes('detected')) return 1;
  return 2;
};

const returnUserIconName = (fullName = '') => {
  const spaceIndex = fullName.indexOf(' ');
  return `${fullName.charAt(0)}${fullName.charAt(spaceIndex + 1)}`;
};

const displayedTestName = (testName) =>
  testName
    ?.replace('COVID-19 Antigen Self-Test', '')
    ?.replace('COVID-19 Antigen Home Test', '')
    ?.replace('™', '') || '';

export const Container = ({ children, handlePress, style }) => (
  <TouchableOpacity onPress={handlePress} style={[styles.container, style]}>
    {children}
  </TouchableOpacity>
);

export const TestInfo = ({ showVirus, showResult, name, result = 0, date }) => (
  <View style={styles.topContainer}>
    <View style={styles.imageContainer}>
      {showVirus ? <VirusSvg gradient /> : <LongCovidSvg />}
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{name}</Text>
      {showResult ? (
        <Text style={[styles.name, { color: statusColors[result], marginVertical: 6 }]}>
          {returnText(result)}
          <Text style={styles.date}>
            {' '}
            | {date ? iso8601ToFormatted(date, formats.shortDate) : ''}
          </Text>
        </Text>
      ) : (
        <Text style={styles.date}>{iso8601ToFormatted(date, formats.shortDate)}</Text>
      )}
    </View>
  </View>
);

export const TestProviderAndUser = ({ fullName, showIcon, testName }) => (
  <>
    <View style={styles.line} />
    <View style={styles.bottomContainer}>
      <View style={styles.nameContainer}>
        <View style={styles.userIconContainer}>
          <Text style={styles.iconText}>{returnUserIconName(fullName)}</Text>
        </View>
        <Text style={styles.user}>{fullName}</Text>
      </View>
      {showIcon && (
        <View style={styles.nameContainer}>
          <Image
            source={displayedTestName(testName).includes('CareStart') ? carestartLogo : ongoLogo}
            style={styles.image}
          />
          <Text style={styles.user}>{displayedTestName(testName)}</Text>
        </View>
      )}
    </View>
  </>
);

export const PaxlovidCTA = ({ title, onAction }) => (
  <BlueButton
    style={styles.button}
    styleText={styles.buttonFont}
    title={title}
    action={onAction}
    showLoading={false}
  />
);

export const ShowObservations = ({ data }) =>
  data.length > 0 && (
    <>
      <View style={styles.line} />
      {data.map(
        ({ observation_type: title = '', data: { observed_data: { result = 2 } = {} } = {} }) => {
          const isCompleted = result?.includes('detected');
          const isInvalid = result?.includes('invalid');
          const isPending = !isCompleted && !isInvalid;

          const color = isPending ? colors.greyDark : statusColors[getResultStatus(result)];
          const text = isPending ? 'Pending' : returnText(getResultStatus(result));

          return (
            <View style={styles.bottomContainer}>
              <Text style={styles.antigenFont}>{title || ''}</Text>
              <Text style={[styles.name, { color, marginVertical: 8 }]}>{text}</Text>
            </View>
          );
        }
      )}
    </>
  );

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '100%',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  testInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 21,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyExtraLight2,
  },
  infoContainer: {
    marginLeft: 16,
  },
  name: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    lineHeight: 18,
  },
  user: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeSmall,
    color: colors.greyMed,
    marginHorizontal: 12,
    maxWidth: 120,
  },
  date: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeSmall,
    lineHeight: 22,
    color: colors.greyMed,
  },
  testName: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    lineHeight: 17,
    marginBottom: 4,
    color: colors.greyMidnight,
  },
  statusText: {
    fontFamily: fonts.familyBold,
  },
  dateText: {
    fontFamily: fonts.familyLight,
    color: colors.greyMed,
  },
  userAndProviderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    padding: 10,
    backgroundColor: colors.primaryPavement,
    borderRadius: 10,
  },
  line: {
    borderWidth: 1,
    borderColor: colors.greyExtraLight,
    marginVertical: 18,
  },
  userIconContainer: {
    backgroundColor: colors.primaryBlue,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: colors.greyWhite,
    fontFamily: fonts.familyBold,
    fontSize: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
  paxlovid: {
    marginTop: 15,
  },
  userName: {
    fontFamily: fonts.familyNormal,
    color: colors.greyMed,
    marginLeft: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: 24,
  },
  buttonFont: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
  },
  antigenFont: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeNormal,
    color: colors.greyDark2,
  },
});

export default styles;
