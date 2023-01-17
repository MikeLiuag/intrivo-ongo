import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-native-elements';
import { useRoute, useNavigation } from '@react-navigation/native';
import HeaderComp from './HeaderComp';
import { BlueButton } from './Buttons/BlueButton';
import BackgroundCircleTopRight from './Svg/backgroundCircleTopRight';
import BackgroundRectTopLeft from './Svg/backgroundRectTopLeft';
import CloseIcon from './Svg/close';
import CheckIcon from './Svg/checkIcon';
import { colors } from '../theme';
import { parseHtmlForTags } from '../helpers/functions';
import { fonts } from '../theme/fonts';
import Icon from './Icon';
import { openLink } from '../utilis/link';
import { LogEvent } from '../analytics';
import SniffleDisclaimer from './SniffleDisclaimer';
import {
  getFromLocalStorage,
  saveToLocalStorage,
  SNIFFLES_DISCLAIMER_KEY,
} from '../utilis/localStorage';

const privacy1 = 'Visit';
const privacyLink = 'On/Go’s privacy policy';

const privacy2 = 'to learn more about how we protect your information.';

const LandingIntro = ({
  title,
  subtitle,
  description,
  introBullets,
  leftButton = {},
  handleBack,
  rightButton = {},
  bulletTextStyle,
  descriptionTextStyle,
  withoutBulletNumberation,
  headerImage = null,
  border = true,
  headerBackground = true,
  handleHeaderLeft,
  tooltipText = null,
  bottomLink: [linkTitle, onPressBottomLink] = [],
  visitTime = null,
  showPrivacyPolicy = false,
  privacyPolicyAnalytic = null,
  isBeta = false,
  showDisclaimer = false,
  skipLink: [skiplinkTitle, onPressSkipLink] = [],
  inLineDisclaimer,
  contentStyle,
}) => {
  const { params } = useRoute();
  const bullets = introBullets || params?.introBullets;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const getDisclaimerStatus = useCallback(async () => {
    const disclaimerStatus = await getFromLocalStorage(SNIFFLES_DISCLAIMER_KEY);
    if (!disclaimerStatus && isBeta && showDisclaimer) {
      setModalVisible(true);
    }
  }, [isBeta, showDisclaimer]);

  useEffect(() => {
    getDisclaimerStatus();
  }, [getDisclaimerStatus]);

  const renderBulletNumber = (value) =>
    !withoutBulletNumberation && (
      <View style={styles.containerBullet}>
        <Text style={styles.bullet}>{value}</Text>
      </View>
    );

  const onPressPrivacyLink = () => {
    openLink(navigation, false, {
      url: 'https://www.letsongo.com/privacy-policy',
      useWebView: true,
    });
  };

  const renderPolicyLink = () => (
    <Text style={styles.modalText}>
      {privacy1}
      <Text onPress={onPressPrivacyLink} style={styles.linkText}>
        {' '}
        {privacyLink}{' '}
      </Text>
      {privacy2}
    </Text>
  );

  const onModalClose = async (isSave) => {
    if (isSave) {
      await saveToLocalStorage(SNIFFLES_DISCLAIMER_KEY, true);
    }
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComp
        onLeftClick={handleHeaderLeft}
        left={handleHeaderLeft ? 'arrow' : null}
        right={[<CloseIcon width={14} height={14} />, handleBack]}
        addStyle={styles.header}
      />
      {headerBackground ? (
        <>
          <View style={styles.containerBackground1}>
            <BackgroundCircleTopRight />
          </View>
          <View style={styles.containerBackground2}>
            <BackgroundRectTopLeft />
          </View>
        </>
      ) : null}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.contentStyle, contentStyle]}>
          <View style={styles.contentContainer}>
            {headerImage ? (
              <Image
                source={headerImage}
                style={{ width: '100%', height: 300 }}
                resizeMode='contain'
              />
            ) : (
              <View style={styles.checkContainer}>
                <CheckIcon width={67} height={67} />
              </View>
            )}
            {isBeta ? (
              <View style={styles.betaView}>
                <Text style={styles.beta}>{t('screens.sniffles.disclaimer.beta')}</Text>
              </View>
            ) : null}
            {title || params?.title ? (
              <Text style={styles.title}>
                {parseHtmlForTags(title || params?.title, {
                  b: { fontFamily: fonts.familyBold, color: colors.greyMidnight },
                }).map((e) => React.createElement(Text, { style: e.style }, e.child))}
              </Text>
            ) : null}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            {border ? <View style={styles.border} /> : null}
            {bullets?.map((bullet, index) => (
              <View style={styles.containerItem} key={bullet}>
                {renderBulletNumber(index + 1)}
                <Text style={[styles.itemText, bulletTextStyle]}>{t(bullet)}</Text>
              </View>
            ))}
            {border ? <View style={styles.border} /> : null}
            {description ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24 }}>
                <Text style={[styles.description, descriptionTextStyle]}>
                  {parseHtmlForTags(description || t('paxlovid.intro.description'), {
                    b: { fontFamily: fonts.familyBold, color: colors.greyGrey },
                  }).map((e) => React.createElement(Text, { style: e.style }, e.child))}
                </Text>
                {tooltipText ? (
                  <Tooltip
                    withOverlay={false}
                    backgroundColor={colors.greyDark2}
                    containerStyle={{ borderRadius: 5 }}
                    popover={
                      <Text style={styles.tooltipText}>
                        {parseHtmlForTags(tooltipText, {
                          b: { fontFamily: fonts.familyBold },
                        }).map((e) => React.createElement(Text, { style: e.style }, e.child))}
                      </Text>
                    }
                    height={82}
                    width={157}
                  >
                    <Icon type='MaterialIcons' name='info' size={20} color={colors.primaryBlue} />
                  </Tooltip>
                ) : null}
              </View>
            ) : null}
            {linkTitle ? (
              <TouchableOpacity style={styles.linkButton} onPress={onPressBottomLink}>
                <Text style={styles.linkText}>{linkTitle}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View>
            {visitTime ? <Text style={styles.visitTimeText}>{visitTime}</Text> : null}
            <View style={styles.footer}>
              {leftButton?.title ? (
                <BlueButton
                  style={styles.buttonSecondary}
                  styleText={styles.buttonSecondaryTitle}
                  title={leftButton?.title}
                  action={leftButton?.onAction}
                />
              ) : null}
              <BlueButton
                disabled={rightButton?.disabled}
                style={styles.buttonPrimary}
                styleText={styles.buttonPrimaryTitle}
                title={rightButton?.title}
                action={rightButton?.onAction}
              />
            </View>
          </View>
        </View>
        {skiplinkTitle ? (
          <TouchableOpacity style={styles.skipLink} onPress={onPressSkipLink}>
            <Text style={styles.linkText}>{skiplinkTitle}</Text>
          </TouchableOpacity>
        ) : null}
        {inLineDisclaimer ? (
          <Text style={[styles.disclaimerText]}>
            {parseHtmlForTags(inLineDisclaimer, {
              b: { fontFamily: fonts.familyBold },
            }).map((e) => React.createElement(Text, { style: e.style }, e.child))}
          </Text>
        ) : null}
        {showPrivacyPolicy && (
          <Pressable
            onPress={() => {
              if (privacyPolicyAnalytic) {
                LogEvent(privacyPolicyAnalytic);
              }
              navigation.push('PrivacyPolicy', {
                policy: [
                  t('screens.telehealth.info.privacyPolicy1'),
                  t('screens.telehealth.info.privacyPolicy2'),
                ],
                renderPressableSection: renderPolicyLink,
              });
            }}
            style={styles.privacyWrap}
          >
            <Text style={styles.privacyText}>
              {t(`screens.sniffles.snifflesTelehealth.intro.privacy`)}
            </Text>
          </Pressable>
        )}
      </ScrollView>
      <SniffleDisclaimer visible={modalVisible} onModalClose={onModalClose} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    flex: 1,
    backgroundColor: colors.greyWhite,
  },
  header: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 24,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 24,
    paddingBottom: 24,
  },
  checkContainer: {
    backgroundColor: 'white',
    width: 102,
    height: 102,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginTop: 20,
  },
  title: {
    fontSize: fonts.sizeExtraLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyGrey,
    lineHeight: 10,
    textAlign: 'center',
    marginTop: 30,
  },
  subtitle: {
    fontSize: fonts.sizeExtraLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyMidnight,
    lineHeight: 32,
    textAlign: 'center',
  },
  border: {
    width: '100%',
    height: 1,
    marginTop: 24,
    backgroundColor: colors.background,
  },
  containerItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  containerBullet: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryBlue,
    borderWidth: 2,
    borderColor: colors.greyWhite,
  },
  bullet: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyWhite,
  },
  itemText: {
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyNormal,
    color: colors.greyMed,
    marginLeft: 15,
  },
  description: {
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyLight,
    color: colors.greyGrey,
    lineHeight: 28,
    marginRight: 5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonPrimary: {
    flex: 1,
    marginHorizontal: 20,
  },
  buttonPrimaryTitle: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyWhite,
  },
  buttonSecondary: {
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
    backgroundColor: colors.greyWhite,
    borderColor: colors.secondaryButtonBorder,
  },
  buttonSecondaryTitle: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyDark2,
  },
  containerBackground1: { position: 'absolute', top: 0, right: 0, zIndex: -5 },
  containerBackground2: { position: 'absolute', top: 10, left: 0 },
  linkButton: {
    marginTop: 30,
  },
  linkText: { color: colors.primaryBlue, fontSize: 14, fontFamily: fonts.familyNormal },
  visitTimeText: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeNormal,
    lineHeight: 25,
    color: colors.greyGrey,
    textAlign: 'center',
    marginBottom: 24,
    marginHorizontal: 24,
  },
  tooltipText: {
    fontFamily: fonts.familyNormal,
    color: colors.greyWhite,
    fontSize: fonts.sizeSmall,
    textAlign: 'center',
  },
  privacyWrap: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: 40,
    paddingTop: 10,
  },
  privacyText: {
    fontFamily: fonts.familyNormal,
    color: colors.greyDark,
  },
  modalText: {
    fontFamily: fonts.familyNormal,
    lineHeight: 22,
    marginTop: 16,
    color: colors.greyMed,
  },
  betaView: {
    position: 'absolute',
    top: 20,
    right: 16,
    borderRadius: 6,
    backgroundColor: colors.primaryBlue,
  },
  beta: {
    color: colors.white,
    paddingHorizontal: 9,
    paddingVertical: 5,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
  },
  skipLink: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  disclaimerText: {
    fontSize: fonts.sizeSmall,
    fontFamily: fonts.familyLight,
    color: colors.greyGrey,
    lineHeight: 15,
    marginTop: 10,
    textAlign: 'center',
    marginHorizontal: 24,
  },
  contentStyle: {
    flex: 1,
  },
});

export default LandingIntro;
