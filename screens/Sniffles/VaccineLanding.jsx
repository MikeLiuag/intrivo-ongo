import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogEvent } from '../../analytics';
import HeaderComp from '../../components/HeaderComp';
import CloseIcon from '../../components/Svg/close';
import { colors } from '../../theme';
import { fonts } from '../../theme/fonts';
import { openLink } from '../../utilis/link';

const walmartIcon = require('../../assets/WalmartIcon.png');
const CVSIcon = require('../../assets/CVSIcon.png');
const WalgreensIcon = require('../../assets/WalgreensIcon.png');

const translationPath = 'screens.sniffles.vaccinesLanding';

const CLOSE_SIZE = 14;

const VaccinesButton = ({ text, image, link, onPress }) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={() => onPress(text, link)}>
    <View style={styles.imageContainer}>
      <Image source={image} resizeMode='contain' style={{ width: 24 }} />
    </View>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const VaccineLanding = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();

  useEffect(() => {
    LogEvent('Vaccine_Options_screen');
  }, []);

  const handleClose = () => {
    LogEvent('Vaccine_Options_click_Close');
    navigation.navigate('Home');
  };
  const onLinkPress = (text, link) => {
    LogEvent(`Vaccine_Options_click_${text}`);
    openLink(navigation, true, { url: link, target: text, useWebView: false });
  };
  const onBackPress = () => {
    LogEvent('Vaccine_Options_click_Back');
    if (route?.params?.userId) {
      navigation.navigate('Home');
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderComp
        center={[t(`${translationPath}.title`), styles.headerTitle]}
        left='arrow'
        onLeftClick={onBackPress}
        right={[<CloseIcon width={CLOSE_SIZE} height={CLOSE_SIZE} />, handleClose]}
        addStyle={styles.header}
      />
      <View style={styles.container}>
        <Text style={styles.subtitle}>{t(`${translationPath}.description`)}</Text>
        <VaccinesButton
          text='Walgreens'
          image={WalgreensIcon}
          link='https://www.walgreens.com/topic/pharmacy/immunization-services-appointments.jsp'
          onPress={onLinkPress}
        />
        <VaccinesButton
          text='CVS pharmacy'
          image={CVSIcon}
          link='https://www.cvs.com/immunizations/get-vaccinated'
          onPress={onLinkPress}
        />
        <VaccinesButton
          text='Walmart'
          image={walmartIcon}
          link='https://www.walmart.com/cp/flu-shots-immunizations/1228302?povid=HWS_ServicesNav_Pharmacy_Immunizations'
          onPress={onLinkPress}
        />
      </View>
    </SafeAreaView>
  );
};

export default VaccineLanding;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingRight: 10,
  },
  headerTitle: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
    lineHeight: 19,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  subtitle: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeNormal,
    lineHeight: 20,
    color: colors.greyDark,
    marginBottom: 26,
  },
  buttonContainer: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginVertical: 8,
    borderColor: colors.greyExtraLight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryPavement,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
    lineHeight: 19,
  },
});
