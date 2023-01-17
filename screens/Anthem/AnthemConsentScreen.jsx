import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckBox } from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { colors } from '../../theme';
import HeaderComp from '../../components/HeaderComp';
import CloseIcon from '../../components/Svg/close';
import { LogEvent } from '../../analytics';

// const anthemImage = require('../../assets/anthem.png');

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
export default ({ onAction } = () => null) => {
  const { t } = useTranslation();
  const [isSelected, setSelected] = useState(false);
  const [isDisabled, setIsdDisabled] = useState(true);
  const [contentHeight, setContentHeight] = useState(null);
  const [layoutHeight, setLayoutHeight] = useState(null);

  const navigation = useNavigation();

  const enableSomeButton = () => {
    setIsdDisabled(false);
  };
  const handleButtonClick = () => {
    LogEvent('AnthemConsentScreenNext');
    onAction();
  };

  const handleRightClick = () => {
    Alert.alert(t('exitAlert.Title'), t('exitAlert.Text'), [
      {
        text: t('yesNo.Yes'),
        onPress: () => {
          navigation.navigate('Dashboard');
        },
      },
      {
        text: t('yesNo.No'),
        style: 'cancel',
      },
    ]);
  };

  useEffect(() => {
    LogEvent('AnthemConsentScreenLoad');
  }, []);

  // if the text for the warning fits in the view completely, enable the button on load
  useEffect(() => {
    if (contentHeight && layoutHeight && contentHeight <= layoutHeight)
      enableSomeButton();
  }, [contentHeight, layoutHeight]);

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.screen}>
      <View style={{ paddingHorizontal: 24, marginTop: 20 }}>
        <HeaderComp
          center={[
            t('anthem.Title'),
            { fontSize: 16, color: 'black', fontFamily: 'Museo_700' },
          ]}
          right={[<CloseIcon width={14} height={14} />, handleRightClick]}
          addStyle={styles.profileHeader}
        />
      </View>
      <View style={styles.container}>
        <LinearGradient
          colors={['#F3F6FC', '#F3F6FC']}
          start={{ x: 0.1, y: 0.5 }}
          end={{ x: 0.1, y: 0.9 }}
        >
          <View style={{ height: '100%' }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              onContentSizeChange={(w, h) => setContentHeight(h)}
              onLayout={({ nativeEvent }) =>
                setLayoutHeight(nativeEvent?.layout?.height || null)
              }
              onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                  enableSomeButton();
                }
              }}
              scrollEventThrottle={400}
            >
              {/* <Image
                style={styles.anthemimage}
                resizeMode="contain"
                source={anthemImage}
              /> */}
              <Text style={styles.description}>{t('anthem.Description')}</Text>
            </ScrollView>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.Container}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            title={isDisabled ? t('warning.Scroll') : t('warning.CheckBoxText')}
            titleProps={{ allowFontScaling: false }}
            checked={isSelected}
            containerStyle={{
              backgroundColor: 'transparent',
              borderWidth: 0,
            }}
            checkedColor={colors.primaryBlue}
            disabled={isDisabled}
            uncheckedColor={isDisabled ? '#D3D3D3' : 'black'}
            onPress={() => setSelected(!isSelected)}
            textStyle={styles.checkboxtext}
          />
        </View>

        <View style={styles.buttonContainer}>
          <BlueButton
            title={t('anthem.Button')}
            action={handleButtonClick}
            disabled={!isSelected}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F6FC',
  },
  container: {
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Museo_700',
    fontSize: 38,
    alignItems: 'center',
    alignSelf: 'center',
    color: '#136FAB',
  },
  description: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 30,
    color: colors.greyDark2,
    marginBottom: wp('50%'),
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.311,
    marginTop: 72,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    width: '100%',
    backgroundColor: '#F3F6FC',
  },
  Container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#F3F6FC',
  },
  checkboxContainer: {
    width: wp('100%'),
    paddingHorizontal: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  checkboxtext: {
    color: colors.greyDark2,
    fontFamily: 'Museo_500',
    fontSize: 16,
  },
  anthemimage: {
    width: wp('40%'),
    height: hp('5%'),
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
});
