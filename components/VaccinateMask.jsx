import React from 'react';
import { StyleSheet } from 'react-native';

import CardCameraMask from './Svg/CardCameraMask';
import SelfieCameraMask from './Svg/SelfieCameraMask';

const TEXT_HEIGHT = 40;

const VaccineMask = ({ type, description }) =>
  type === 'card' ? (
    <CardCameraMask
      description={description}
      conteinerStyle={styles.container}
      textStyle={styles.text}
    />
  ) : (
    <SelfieCameraMask conteinerStyle={styles.container} textStyle={styles.text} />
  );

export default VaccineMask;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    zIndex: 2,
  },
  text: {
    position: 'absolute',
    color: '#fff',
    fontFamily: 'Museo_700',
    fontSize: 13,
    lineHeight: 16,
    top: -TEXT_HEIGHT,
  },
});
