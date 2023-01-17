import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';

const Insight = ({ insight, onLinkPress, visible, additionalContainerStyle }) => {
  const bounceValue = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (!visible) {
      Animated.spring(bounceValue, {
        toValue: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(bounceValue, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [bounceValue, visible]);

  return (
    <Animated.View
      style={[
        styles.infoContainer,
        additionalContainerStyle,
        { transform: [{ translateY: bounceValue }] },
      ]}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text style={{ fontSize: 38 }}>💡</Text>
        <View style={{ flexShrink: 1 }}>
          <Text style={styles.infoTitle}>{insight.title}</Text>
          <Text style={styles.infoDescription}>{insight.text}</Text>
          {insight?.source_title && (
            <Text style={styles.infoSource}>
              Source:
              <Text
                style={styles.infoLink}
                onPress={() => insight?.source_url && onLinkPress(insight.source_url)}
              >
                {insight.source_title}
              </Text>
            </Text>
          )}
        </View>
      </View>
      <View style={{ flex: 1 }} />
    </Animated.View>
  );
};

export default Insight;

const styles = StyleSheet.create({
  infoContainer: {
    position: 'absolute',
    marginHorizontal: -24,
    bottom: -50,
    left: 0,
    padding: 16,
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderColor: colors.greyExtraLight,
    paddingBottom: 120,
    width: Dimensions.get('window').width,
  },
  infoTitle: {
    fontWeight: '600',
    fontStyle: 'italic',
    fontSize: 15,
    lineHeight: 26,
  },
  infoDescription: {
    fontFamily: fonts.familyLight,
    fontSize: fonts.sizeSmall,
    lineHeight: 21,
  },
  infoSource: {
    fontFamily: fonts.familyLight,
    fontSize: fonts.sizeSmall,
    lineHeight: 13,
    color: colors.greyDark,
    textAlign: 'right',
  },
  infoLink: {
    fontFamily: fonts.familyNormal,
    color: colors.primaryBlue,
  },
});
