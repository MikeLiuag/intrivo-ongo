import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme';

const DASH_LENGTH = 3;
const DASH_GAP = 3;
const SCREEN_WIDTH = Dimensions.get('window').width;

const DashedDivider = ({ horizontalMargin }) => {
  const numOfDashes = Math.floor((SCREEN_WIDTH - horizontalMargin * 2) / (DASH_LENGTH + DASH_GAP));
  const dashArray = Array.from({ length: numOfDashes }, (_, i) => i);

  return (
    <View style={styles.container}>
      {dashArray.map((el) => (
        <View key={el} style={styles.dash} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  dash: {
    height: 1,
    width: DASH_LENGTH,
    marginRight: DASH_GAP,
    backgroundColor: colors.secondaryButtonBorder,
  },
});

export default DashedDivider;
