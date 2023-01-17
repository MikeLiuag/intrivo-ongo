import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComp from '../components/HeaderComp';
import { parseHtmlForTags } from '../helpers/functions';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import { openLink } from '../utilis/link';

const PrivacyPolicy = ({ route, navigation }) => (
  <SafeAreaView style={styles.screen}>
    <HeaderComp onLeftClick={navigation.goBack} left='arrow' />
    {route.params.policy.map((text) => (
      <Text key={text} style={styles.text}>
        {parseHtmlForTags(text).map((e) => {
          if (e.attributes) {
            return React.createElement(
              Text,
              {
                style: [e.style, styles.linkText],
                onPress: () => {
                  openLink(navigation, false, {
                    url: e.attributes.href,
                    useWebView: true,
                  });
                },
              },
              e.child
            );
          }
          return React.createElement(Text, { style: e.style }, e.child);
        })}
      </Text>
    ))}
    {route.params.renderPressableSection?.()}
  </SafeAreaView>
);

export default PrivacyPolicy;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 24,
  },
  text: {
    fontFamily: fonts.familyNormal,
    lineHeight: 22,
    marginTop: 16,
    color: colors.greyMed,
  },
  linkText: { color: colors.primaryBlue, fontSize: 14, fontFamily: fonts.familyNormal },
});
