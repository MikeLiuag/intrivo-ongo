import React, { View, StyleSheet } from 'react-native';
import { colors } from '../../../theme';
import parseForVars from '../utils/parser';
import FormattedText from './formattedText';

const ContentsBlock = ({ contents = [], vars = {} }) => {
  console.log('*** CONTENTS', vars);
  if (contents.length > 0)
    return contents.map((content) => (
      <View key={content.text}>
        {content.type === 'primary' ? (
          <FormattedText style={styles.description}>
            {parseForVars(content.text, vars)}
          </FormattedText>
        ) : null}
        {content.type === 'warning' ? (
          <View style={styles.warningContainer}>
            <FormattedText style={styles.warning}>{parseForVars(content.text, vars)}</FormattedText>
          </View>
        ) : null}
      </View>
    ));
  return null;
};

const styles = StyleSheet.create({
  description: {
    marginHorizontal: 10,
    fontFamily: 'Museo_300',
    fontSize: 16,
    color: colors.greyDark,
    lineHeight: 25,
    marginTop: 25,
  },
  warningContainer: {
    borderWidth: 1,
    borderColor: '#B00020',
    borderRadius: 8,
    padding: 16,
    backgroundColor: 'rgba(176, 0, 32, 0.1)',
    marginTop: 35,
    marginHorizontal: 10,
  },
  warning: {
    color: '#B00020',
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ContentsBlock;
