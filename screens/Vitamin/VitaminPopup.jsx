import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import HeaderComp from '../../components/HeaderComp';
import OnGoSvg from '../../components/Svg/OnGoSvg';
import { colors } from '../../theme';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { LogEvent } from '../../analytics';

const VitaminPopup = ({
    route,
}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const type = route?.params?.type;

  useEffect(() => {
    LogEvent(`Test_${type}_VDPopUp_screen`);
  }, []);

  const handleSkip = () => {
    LogEvent(`Test_${type}_VDPopup_click_NotNow`);
    navigation.navigate('Home');
  }

  const handleExplore = () => {
      LogEvent(`Test_${type}_VDPopUp_click_Explore`)
      navigation.navigate('Vitamin',{type})
  }

  const handleClose = () => {
      LogEvent(`Test_${type}_VDPopUp_click_Close`);
      navigation.navigate('Home')
  }

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1, backgroundColor: '#fff' }}>
          <HeaderComp
            right={['x', handleClose]}
            addStyle={styles.header}
          />
          <ScrollView style={styles.container}>
            <View style={styles.internalFirstContainer}>
              <OnGoSvg />
              <Text style={styles.headerTitle}>
                {t('screens.vitamin.title')}
              </Text>
            </View>
            <View style={styles.internalSecondContainer}>
                <Text style={styles.rowText}>
                    <Text style={{fontFamily: 'Museo_700'}}>{t('screens.vitamin.paragraphTitle')}</Text>
                    {t('screens.vitamin.firstParagraph')}
                </Text>
                <Text style={styles.rowText}>{t('screens.vitamin.secondParagraph')}</Text>
                <Text style={styles.rowText}>{t('screens.vitamin.thridParagraph')}</Text>
                <Text style={styles.linkText}>{t('screens.vitamin.firstLink')}</Text>
                <Text style={styles.linkText}>{t('screens.vitamin.secondLink')}</Text>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
              <BlueButton
                action={handleSkip}
                title={t('screens.vitamin.buttons.notNow')}
                style={styles.leftButton}
                styleText={styles.leftText}
              />
              <BlueButton
                action={handleExplore}
                title={t('screens.vitamin.buttons.learn')}
                styleText={styles.rightText}
                style={styles.rightButton}
              />
          </View>
    </SafeAreaView>
  );
};

export default VitaminPopup;

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === 'ios' ? 0 : 20,
    marginHorizontal: 26,
  },
  container: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: 32,
  },
  internalFirstContainer: {
    flex: 1,
    marginBottom: 20,
  },
  internalSecondContainer: {
    flex: 5,
    marginTop: 15,
  },
  headerTitle: {
    fontFamily: 'Museo_700',
    fontSize: 20,
    lineHeight: 24,
    marginVertical: 26,
  },
  rowText: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 28,
    color: colors.greyDark,
    marginBottom: 30,
  },
  footerText: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 28,
    color: colors.greyDark,
    marginTop: 25,
  },
  buttonContainer: {
      flexDirection: 'row',
      marginHorizontal: 24,
      marginBottom: 46
  },
  leftText: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
    color: colors.greyMidnight
  },
  leftButton: {
      flex: 1,
      marginRight: 8,
      backgroundColor: '#fff',
      borderColor: colors.greyLight
  },
  rightButton: {
      flex: 1,
      marginLeft: 8
  },
  rightText: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
    color: '#fff'
  },
  linkText: {
    fontFamily: 'Museo_500',
    fontSize: 10,
    lineHeight: 12,
    color: colors.greyDark
  }
});
