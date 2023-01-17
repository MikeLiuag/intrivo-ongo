import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { colors } from '../../../theme';
import { fonts } from '../../../theme/fonts';

const warningImage = require('../../../assets/warning.png');

const DisclaimerV1 = ({ args }) => (
  <View style={styles.container}>
    <Text style={styles.subtitle}>{args?.subtitle}</Text>
    <View style={styles.disclaimerContainer}>
      <Image source={warningImage} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.disclaimerTitle}>{args.disclaimer.title}</Text>
        <FlatList
          data={args.disclaimer.points}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <Text style={styles.disclaimerPoint}>• {item.title}</Text>}
        />
      </View>
    </View>
  </View>
);

export default DisclaimerV1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  subtitle: {
    fontFamily: fonts.familyBold,
    fontSize: 24,
    paddingHorizontal: 24,
    marginTop: 20,
    textAlign: 'left',
  },
  disclaimerContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.primaryPavement,
    borderColor: colors.greyExtraLight,
    borderWidth: 1,
    marginHorizontal: 24,
    flexDirection: 'row',
    borderRadius: 8,
    marginTop: 20,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  disclaimerTitle: {
    fontWeight: '600',
    fontStyle: 'italic',
    fontSize: fonts.sizeLarge,
    lineHeight: 26,
    marginBottom: 12,
  },
  disclaimerPoint: {
    fontFamily: fonts.familyLight,
    fontSize: fonts.sizeNormal,
    lineHeight: 24,
    color: colors.black,
  },
});
