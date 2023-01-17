import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';
import RadioButton from './Buttons/RadioButton';

const TestResultButtons = ({ buttons, onSelectOption, selected, style }) => (
  <View style={[styles.container, style]}>
    <View style={styles.buttonWrapper}>
      {buttons &&
        buttons.map(({ title, activeColor, buttonStyle }) => (
          <RadioButton
            title={title}
            action={() => onSelectOption(title)}
            active={selected === title}
            activeColor={activeColor}
            style={buttonStyle}
          />
        ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.greyExtraLight2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    elevation: 3,
    padding: 10,
  },
  buttonWrapper: {},
});

export default TestResultButtons;
