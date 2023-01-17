import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

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
});

export default styles;
export { dimensions };
