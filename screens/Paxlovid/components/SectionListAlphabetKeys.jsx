import React, { useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { colors } from '../../../theme';
import { fonts } from '../../../theme/fonts';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const INDICATOR_RADIUS = 24;
const ITEM_HEIGHT = SCREEN_HEIGHT * 0.022;

const SectionListAlphabetKeys = ({ data, onItemSelect }) => {
  const [selectedItem, setSelectedItem] = useState(data[0]);
  const [indicatorActive, setIndicatorActive] = useState(false);
  const [dragY, setDragY] = useState(new Animated.Value(0));

  const onPanGestureEvent = ({ nativeEvent: { y } }) => {
    const MAX_TOP = 0;
    const MAX_BOTTOM = (data.length - 1) * ITEM_HEIGHT;

    calculateAndUpdateSelectedItem(y);

    if (y > MAX_TOP && y < MAX_BOTTOM) setDragY(new Animated.Value(y - INDICATOR_RADIUS));
  };

  const calculateAndUpdateSelectedItem = (positionY) => {
    const itemIndex = Math.floor(positionY / ITEM_HEIGHT);

    if (itemIndex >= 0 && itemIndex < data.length) {
      onItemSelected(data[itemIndex], itemIndex);
    }
  };

  const onItemSelected = (newItem) => {
    setSelectedItem((prevState) => {
      if (prevState === newItem) return prevState;

      onItemSelect(newItem);
      return newItem;
    });
  };

  const onPanGestureStateChange = ({ nativeEvent: { state } }) =>
    setTimeout(() => setIndicatorActive(state === State.ACTIVE), 50);

  const renderIndicator = () =>
    indicatorActive ? (
      <Animated.View style={[styles.indicatorContainer, { transform: [{ translateY: dragY }] }]}>
        <View style={styles.indicator}>
          <Text style={styles.indicatorText}>{selectedItem}</Text>
        </View>
      </Animated.View>
    ) : (
      <View style={styles.indicatorContainer} />
    );

  const renderKeys = () =>
    data.map((item) => (
      <TouchableOpacity
        key={item}
        style={{ height: ITEM_HEIGHT }}
        onPress={() => onItemSelected(item)}
      >
        <Text style={styles.keyText}>{item}</Text>
      </TouchableOpacity>
    ));

  return (
    <View style={styles.container}>
      {renderIndicator()}
      <PanGestureHandler
        onGestureEvent={onPanGestureEvent}
        onEnded={() => setSelectedItem(null)}
        onHandlerStateChange={onPanGestureStateChange}
      >
        <View style={styles.keysContainer}>{renderKeys()}</View>
      </PanGestureHandler>
    </View>
  );
};

export default SectionListAlphabetKeys;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'flex-start' },
  keysContainer: { alignItems: 'center' },
  indicatorContainer: {
    width: INDICATOR_RADIUS * 2,
    height: INDICATOR_RADIUS * 2,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -(50 + INDICATOR_RADIUS),
  },
  indicator: {
    position: 'absolute',
    width: INDICATOR_RADIUS * 2,
    height: INDICATOR_RADIUS * 2,
    borderRadius: 100,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: colors.greyDark3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  indicatorText: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeExtraLarge,
    color: colors.primaryBlue,
  },
  keyText: {
    fontFamily: fonts.familyBold,
    color: colors.primaryBlue,
    fontSize: SCREEN_HEIGHT * 0.013,
  },
});
