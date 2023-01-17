import { StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { fonts } from '../../theme/fonts';

const dimensions = {
  pageMarginHorizontal: 25,
  pageMarginVertical: 25,
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: dimensions.pageMarginHorizontal,
  },
  selectButton: {
    margin: 0,
    marginBottom: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderBottomColor: null,
    borderColor: '#EFEFEF',
    backgroundColor: colors.greyWhite,
  },
  selectButtonTitle: {
    color: colors.greyDark2,
  },
  subtitle: {
    fontFamily: fonts.familyLight,
    fontSize: fonts.sizeNormal,
    lineHeight: 19.5,
    color: colors.greyDark2,
    paddingVertical: 6,
  },
});

export default styles;
export { dimensions };
