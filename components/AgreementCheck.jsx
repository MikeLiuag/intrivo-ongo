import React, { createElement, useState } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { parseHtmlForTags } from '../helpers/functions';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import { openLink } from '../utilis/link';

const AgreementCheck = ({
  agreementText,
  style = {},
  preScrollText,
  postScrollText,
  isChecked = false,
  onChecked = null,
}) => {
  const [isReachedBottom, setIsReachedBottom] = useState(isChecked);
  const [checked, setChecked] = useState(isChecked);
  const [screenHeight, setScreenHeight] = useState(0);

  const checkable = checked || isReachedBottom;

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize, height }) => {
    const paddingToBottom = 60;
    return (
      Math.ceil(layoutMeasurement?.height + contentOffset?.y) >=
        contentSize?.height - paddingToBottom || height < screenHeight
    );
  };

  return (
    <View
      style={[styles.container, style]}
      onLayout={({ nativeEvent }) => setScreenHeight(nativeEvent.layout.height)}
    >
      <ScrollView
        onContentSizeChange={(w, h) => setIsReachedBottom(isCloseToBottom({ height: h }))}
        onMomentumScrollEnd={(event) => {
          setIsReachedBottom(isCloseToBottom(event.nativeEvent));
        }}
        style={[styles.textContainer, { paddingRight: 6 }]}
      >
        <Text style={styles.text}>
          {parseHtmlForTags(agreementText, {
            b: styles.agreementTitle,
            a: styles.agreementTitle,
          }).map((e) => {
            if (e.attributes) {
              return createElement(
                Text,
                {
                  style: e.style,
                  onPress: () => {
                    openLink(null, false, { url: e.attributes.href, useWebView: false });
                  },
                },
                e.child
              );
            }
            return createElement(Text, { style: e.style }, e.child);
          })}
        </Text>
      </ScrollView>
      <CheckBox
        title={checkable ? postScrollText : preScrollText}
        containerStyle={styles.checkboxContainer}
        textStyle={[styles.checkboxText, !checkable ? styles.disabled : {}]}
        titleProps={{ allowFontScaling: false }}
        checked={checked}
        onPress={() => {
          if (checkable) {
            onChecked(!checked);
            setChecked(!checked);
          }
        }}
        checkedIcon='check-square'
        checkedColor='#2A4D9B'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  agreementTitle: {
    fontFamily: fonts.familyBold,
    color: colors.black,
  },
  text: {
    color: '#666666',
    fontFamily: 'Museo_300',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
  },
  textContainer: {
    marginTop: 16,
  },
  disabled: {
    color: 'grey',
  },
  checkboxContainer: {
    margin: 0,
    marginTop: 24,
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  checkboxText: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default AgreementCheck;
