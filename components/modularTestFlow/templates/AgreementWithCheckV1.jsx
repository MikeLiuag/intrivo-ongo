import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FormattedText from '../components/formattedText';
import parseForVars from '../utils/parser';

const AgreementWithCheckV1 = ({ args, vars, onAction = () => null }) => {
  const [isReachedBottom, setIsReachedBottom] = useState(false);
  const [checked, setChecked] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);

  const checkable = checked || isReachedBottom;

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize, height }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement?.height + contentOffset?.y >= contentSize?.height - paddingToBottom ||
      height < screenHeight
    );
  };

  return (
    <View
      style={styles.container}
      onLayout={({ nativeEvent }) => setScreenHeight(nativeEvent.layout.height)}
    >
      <ScrollView
        onContentSizeChange={(w, h) => setIsReachedBottom(isCloseToBottom({ height: h }))}
        onMomentumScrollEnd={(event) => {
          setIsReachedBottom(isCloseToBottom(event.nativeEvent));
        }}
        style={[styles.textContainer, { paddingRight: 6 }]}
      >
        <FormattedText style={styles.text}>{parseForVars(args.agreements, vars)}</FormattedText>
      </ScrollView>
      <CheckBox
        title={checkable ? args.checkbox.post_scroll_text : args.checkbox.pre_scroll_text}
        containerStyle={styles.checkboxContainer}
        textStyle={[styles.checkboxText, !checkable ? styles.disabled : {}]}
        titleProps={{ allowFontScaling: false }}
        checked={checked}
        onPress={() => {
          if (checkable) {
            onAction({ checkbox: { checked: !checked } });
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
  text: {
    color: '#666666',
    fontFamily: 'Museo_300',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
  },
  textContainer: {
    marginTop: 16,
    marginLeft: wp('5%'),
    marginRight: wp('5%'),
  },
  disabled: {
    color: 'grey',
  },
  checkboxContainer: {
    margin: 0,
    marginTop: 24,
    marginLeft: wp('5%'),
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

export default AgreementWithCheckV1;
