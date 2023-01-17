import React from 'react';
import { View, StyleSheet } from 'react-native';

const QuizLoader = ({ progres }) => (
  <View style={styles.line}>
    <View style={styles.lineBar}>
      <View style={[styles.loadBar, { width: progres }]} />
    </View>
  </View>
);

export default QuizLoader;

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 100,
  },
  lineBar: {
    height: 10,
    flex: 1,
    backgroundColor: 'rgba(242, 247, 249, 1)',
    borderRadius: 10,
  },
  loadBar: {
    height: 10,
    backgroundColor: 'rgba(125, 203, 242, 1)',
    borderRadius: 10,
  },
  sun: {
    fontSize: 18,
    lineHeight: 18,
    marginLeft: 12,
  },
});
