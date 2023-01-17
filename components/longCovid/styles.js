import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const longCovidStyles = StyleSheet.create({
  container: {
    marginVertical: 16,
    backgroundColor: colors.greyWhite,
    padding: 24,
    borderRadius: 16,
  },
  connectContainer: {
    paddingTop: 0,
    marginTop: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  chartContainer: {
    marginTop: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 0,
  },
  buttonContainer: { flexDirection: 'row', alignItems: 'center', padding: 16, marginTop: 16 },
  title: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 19,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 19,
  },
  line: {
    borderWidth: 1,
    borderColor: colors.greyExtraLight,
    marginTop: 10,
  },
  description: {
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyMidnight,
  },
  link: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 22,
    color: colors.primaryBlue,
    marginTop: 20,
    textAlign: 'center',
  },
  pointText: {
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 5,
    color: colors.greyDark,
  },
  footerText: {
    marginTop: 16,
    fontFamily: 'Museo_300',
    fontSize: 12,
    lineHeight: 14,
    color: colors.greyDark,
    textAlign: 'right',
  },
  blueButton: {
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  image: {
    width: 26,
    height: 26,
  },
  rowTextContainer: {
    marginLeft: 16,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryPavement,
    borderRadius: 8,
    padding: 8,
  },
  chartDescription: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    color: colors.greyGrey,
  },
  chartButtonText: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 21,
    flex: 1,
    color: colors.black,
  },
  chartTitle: {
    fontFamily: 'Museo_700',
    fontSize: 24,
    lineHeight: 42,
    color: colors.black,
  },
  chartSubtitle: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    color: colors.greyGrey,
    textAlign: 'center',
  },
  chartResultRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  chartCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
    marginTop: 5,
  },
  chartResultText: {
    fontFamily: 'Museo_300',
    fontSize: 12,
    lineHeight: 22,
    color: colors.black,
  },
  chartResultTextBold: {
    fontFamily: 'Museo_700',
    fontSize: 12,
    lineHeight: 22,
    color: colors.black,
  },
  chartFooterContainer: {
    marginTop: 30,
  },
  footerTitle: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    lineHeight: 22,
    color: colors.greyGrey,
  },
  disclaimerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  disclaimerTitle: {
    fontFamily: 'Museo_300',
    fontSize: 12,
    lineHeight: 14,
    color: colors.greyMidnight,
  },
  disclaimerImage: { width: '30%', height: 40 },
  blueText: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    lineHeight: 21,
    color: colors.primaryBlue,
  },
  pieContainer: { width: 150, alignItems: 'center', marginRight: 5 },
});

export default longCovidStyles;
