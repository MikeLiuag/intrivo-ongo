import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '../../theme';

const OrderProgressView = ({ labels, currentPosition }) => {
  const middleLables = labels.slice(1, -1);

  return (
    <View style={styles.container}>
      <View style={styles.stepView}>
        <View style={styles.firstStep}>
          <View
            style={
              currentPosition >= 0 ? styles.activeCircle : styles.inActiveCircle
            }
          />
          <View
            style={
              currentPosition >= 0 ? styles.activeLine : styles.inActiveLine
            }
          />
        </View>

        <Text style={[styles.labelText, styles.leftText]}>{labels[0]}</Text>
      </View>
      {middleLables.map((item, index) => (
        <View style={styles.stepView} key={item}>
          <View style={styles.middleStep}>
            <View
              style={
                currentPosition - 1 >= index
                  ? styles.activeLine
                  : styles.inActiveLine
              }
            />
            <View
              style={
                currentPosition - 1 >= index
                  ? styles.activeCircle
                  : styles.inActiveCircle
              }
            />
            <View
              style={
                currentPosition - 1 >= index
                  ? styles.activeLine
                  : styles.inActiveLine
              }
            />
          </View>

          <Text style={styles.labelText}>{item}</Text>
        </View>
      ))}

      <View style={styles.stepView}>
        <View style={styles.lastStep}>
          <View
            style={
              currentPosition === labels.length - 1
                ? styles.activeLine
                : styles.inActiveLine
            }
          />
          <View
            style={
              currentPosition === labels.length - 1
                ? styles.activeCircle
                : styles.inActiveCircle
            }
          />
        </View>

        <Text style={[styles.labelText, styles.rightText]}>
          {labels[labels.length - 1]}
        </Text>
      </View>
    </View>
  );
};

export default OrderProgressView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  stepView: {
    justifyContent: 'center',
  },
  firstStep: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleStep: { flexDirection: 'row', alignItems: 'center' },
  lastStep: { flexDirection: 'row', alignItems: 'center', paddingRight: 10 },
  activeCircle: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryBlue,
  },
  activeLine: {
    height: 8,
    width: 50,
    backgroundColor: colors.primaryBlue,
  },
  inActiveCircle: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: colors.secondaryButtonBorder,
  },
  inActiveLine: {
    height: 8,
    width: 50,
    backgroundColor: colors.secondaryButtonBorder,
  },
  labelText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 12,
    color: colors.greyDark2,
    fontFamily: 'Museo_500',
  },
  leftText: {
    textAlign: 'left',
  },
  rightText: {
    textAlign: 'right',
  },
});
