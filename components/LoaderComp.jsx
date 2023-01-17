import React, { useEffect, useRef } from 'react';
import { View, StatusBar, Animated, Modal, StyleSheet, Easing } from 'react-native';
// import { Easing } from 'react-native-reanimated';
import { colors } from '../theme';

import Loader1 from './Svg/LoaderSVGs/Loader1';
import Loader2 from './Svg/LoaderSVGs/Loader2';
import Loader3 from './Svg/LoaderSVGs/Loader3';
import Loader4 from './Svg/LoaderSVGs/Loader4';

const LoaderComp = ({ visible = true, onRequestClose = null }) => {
  const rotateAnim1 = useRef(new Animated.Value(0)).current;
  const rotateAnim2 = useRef(new Animated.Value(0)).current;
  const rotateAnim3 = useRef(new Animated.Value(0)).current;
  const rotateAnim4 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim1, {
          toValue: 100,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotateAnim2, {
          toValue: 100,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotateAnim3, {
          toValue: 100,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotateAnim4, {
          toValue: 100,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotateAnim4, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotateAnim3, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotateAnim2, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotateAnim1, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ])
    ).start();
  }, [rotateAnim1, rotateAnim2, rotateAnim3, rotateAnim4]);

  const transRotate1 = rotateAnim1.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '180deg'],
  });
  const transRotate2 = rotateAnim2.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '180deg'],
  });
  const transRotate3 = rotateAnim3.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '180deg'],
  });
  const transRotate4 = rotateAnim4.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Modal visible={visible} onRequestClose={onRequestClose} transparent>
      <StatusBar translucent backgroundColor={colors.primaryGhost} barStyle='dark-content' />
      <View style={styles.backModal}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            padding: '20%',
          }}
        >
          <Animated.View style={{ transform: [{ rotateY: transRotate4 }] }}>
            <Loader1 />
          </Animated.View>
          <Animated.View style={{ transform: [{ rotateY: transRotate3 }] }}>
            <Loader2 />
          </Animated.View>
          <Animated.View
            style={{
              transform: [{ rotateY: transRotate2 }],
            }}
          >
            <Loader3 />
          </Animated.View>
          <Animated.View style={{ transform: [{ rotateY: transRotate1 }] }}>
            <Loader4 />
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backModal: {
    backgroundColor: colors.primaryGhost,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(LoaderComp);
