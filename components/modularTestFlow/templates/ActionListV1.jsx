import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../../theme';
import { fonts } from '../../../theme/fonts';

const ActionListV1 = ({ args, onAction }) => {
  const [selectedAction, setSelectedAction] = useState(null);
  const onActionPress = (action) => {
    setSelectedAction(action);
    onAction({
      selected: true,
      answer: action,
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{args.subtitle}</Text>
      <FlatList
        style={{ flex: 1 }}
        data={args.actions}
        key={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.actionContainer,
              { borderColor: selectedAction === item ? colors.primaryBlue : colors.greyExtraLight },
            ]}
            onPress={() => onActionPress(item)}
          >
            <View style={styles.iconContainer}>
              <Image source={{ uri: item.icon }} resizeMode='center' style={styles.icon} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ActionListV1;

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
  actionContainer: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderWidth: 1,
    marginVertical: 8,
    marginHorizontal: 24,
    borderRadius: 16,
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.primaryPavement,
    borderRadius: 8,
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 16,
  },
  title: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    lineHeight: 21,
    color: colors.greyMidnight,
  },
  text: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeSmall,
    lineHeight: 18,
    color: colors.greyGrey,
  },
});
