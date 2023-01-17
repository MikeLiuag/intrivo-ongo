import React, { createElement, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import HeaderComp from '../../components/HeaderComp';
import { LogEvent } from '../../analytics';
import { parseHtmlForTags } from '../../helpers/functions';

const NIHLearn = ({ navigation, route }) => {
  const { content } = route.params;

  useEffect(() => {
    LogEvent('ShareResults_Learn_screen');
  }, []);

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.conitaner}>
      <HeaderComp
        left='arrow'
        addStyle={styles.header}
        onLeftClick={() => {
          LogEvent('ShareResults_Learn_click_Back');
          navigation.goBack();
        }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          <Text style={styles.text}>
            {parseHtmlForTags(content.replace(/<br\s*[/]?>/gi, '\n')).map((e) =>
              createElement(Text, { style: e.style }, e.child)
            )}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conitaner: {
    flex: 1,
    backgroundColor: colors.primaryGhost,
  },
  header: {
    paddingTop: 12,
    paddingLeft: 12,
  },
  content: {
    marginHorizontal: 25,
    marginTop: 24,
  },
  title: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyMed,
    fontFamily: 'Museo_700',
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyMed,
    fontFamily: 'Museo_300',
    letterSpacing: 0.2,
  },
  italicText: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyMed,
    fontFamily: 'Museo_300_Italic',
  },
});

export default NIHLearn;
