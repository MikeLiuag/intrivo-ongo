import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

const RiskContainer = ({ title, description, tips, showTips, sources, onLinkPress }) => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
      {showTips && <Text style={[styles.title, { color: tips.color }]}>{tips.text}</Text>}
    </View>
    <View style={styles.ristContainer}>
      <Text style={{ fontSize: 38 }}>💡</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.description}>{description}</Text>
        {sources && (
          <Text style={styles.source}>
            Sources:{' '}
            {sources.map((item, index) => (
              <>
                <Text
                  style={{ color: colors.primaryBlue, fontFamily: 'Museo_500' }}
                  onPress={() => (item.url ? onLinkPress(item.url) : null)}
                >
                  {item.title}
                </Text>
                {index < sources.length - 1 && <Text>, </Text>}
                {index === sources.length - 2 && <Text>and </Text>}
              </>
            ))}
          </Text>
        )}
      </View>
    </View>
  </View>
);

export default RiskContainer;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 19,
    color: colors.greyDark,
  },
  tipsText: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 19,
  },
  ristContainer: {
    backgroundColor: colors.primaryPavement,
    marginTop: 14,
    padding: 16,
    flexDirection: 'row',
    borderRadius: 8,
  },
  description: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    lineHeight: 21,
    flexShrink: 1,
  },
  source: {
    textAlign: 'right',
    fontFamily: 'Museo_300',
    fontSize: 12,
    lineHeight: 14,
  },
});
