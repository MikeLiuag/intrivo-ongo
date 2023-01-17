import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Slider } from 'react-native-elements';
import { colors } from '../../theme';
import { fonts } from '../../theme/fonts';

const VerticalSlider = ({ containerStyle, onChange, options = [] }) => {
  const [sliderValue, setSliderValue] = useState(0);

  const onSlidingComplete = (value) => {
    onChange(options[value]);
  };

  const onSlide = (value) => {
    setSliderValue(value);
  };

  const renderOptions = () =>
    options.map((option, index) => {
      const isLastItem = index === options.length - 1;
      const borderBottomWidth = isLastItem ? 0 : 1;
      const textColor = index === sliderValue ? colors.primaryBlue : colors.greyGrey;

      return (
        <TouchableOpacity
          onPress={() => {
            onSlide(index);
            onChange(options[index]);
          }}
          key={option}
          style={[styles.optionContainer, { borderBottomWidth }]}
        >
          <Text style={[styles.optionText, { color: textColor }]}>{option}</Text>
        </TouchableOpacity>
      );
    });

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.sliderContainer}>
        <View style={{ flex: 1 }}>{renderOptions()}</View>
        <Slider
          value={sliderValue}
          step={1}
          minimumValue={0}
          orientation='vertical'
          style={styles.slider}
          onValueChange={onSlide}
          thumbStyle={styles.indicator}
          trackStyle={styles.sliderTrack}
          maximumValue={options.length - 1}
          onSlidingComplete={onSlidingComplete}
          maximumTrackTintColor={colors.primaryPavement}
          minimumTrackTintColor={colors.primaryPavement}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: { marginVertical: 15, marginLeft: 40, marginRight: 20 },
  sliderContainer: {
    height: 300,
    flexDirection: 'row',
    paddingVertical: 32,
    paddingHorizontal: 22,
    borderRadius: 16,
    elevation: 5,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowColor: colors.greyGrey,
    backgroundColor: colors.white,
  },
  sliderTrack: {
    borderRadius: 100,
    width: 11,
  },
  optionContainer: {
    flex: 1,
    paddingLeft: 7,
    justifyContent: 'center',
    borderBottomColor: colors.greyExtraLight,
  },
  optionText: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
  },
  indicator: {
    height: 33,
    width: 33,
    backgroundColor: colors.primaryBlue,
    borderRadius: 100,
    borderColor: colors.white,
    borderWidth: 2,
    marginRight: -85,
  },
});

export default VerticalSlider;
