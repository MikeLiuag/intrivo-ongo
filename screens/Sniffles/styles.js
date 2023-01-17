import { StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { fonts } from '../../theme/fonts';

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: fonts.familyLight,
    fontSize: fonts.sizeNormal,
    lineHeight: 19.5,
    color: colors.greyDark2,
    marginTop: 20,
    marginBottom: 16,
  },
});

export default styles;
