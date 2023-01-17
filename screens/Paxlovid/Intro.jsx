import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import HeaderComp from '../../components/HeaderComp';
import { BlueButton } from '../../components/Buttons/BlueButton';
import BackgroundCircleTopRight from '../../components/Svg/backgroundCircleTopRight';
import BackgroundRectTopLeft from '../../components/Svg/backgroundRectTopLeft';
import CloseIcon from '../../components/Svg/close';
import CheckIcon from '../../components/Svg/checkIcon';
import { colors } from '../../theme';
import { clearSelections, setParams } from '../../store/paxlovid/slice';
import { parseHtmlForTags } from '../../helpers/functions';
import { fonts } from '../../theme/fonts';
import { LogEvent } from '../../analytics';
import { dimensions } from './styles';
import { iso8601ToDate, dateToIso8601 } from '../../utilis/dateTime';
import LandingIntro from '../../components/LandingIntro';

const translationPath = 'paxlovid.intro';

const IntroImage = require('../../assets/paxlovid-intro.png');

function Intro({ navigation, route }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { users, observations } = useSelector(({ user }) => user);
  const paxlovidNewIntroScreen = useSelector((state) => state.app.paxlovidNewIntroScreen);

  const observationId = route?.params?.observationId;
  const observation =
    route?.params?.observation || observations.find((item) => item.id === observationId);

  useEffect(() => {
    if (paxlovidNewIntroScreen) {
      LogEvent('PE_Intro_screen_B');
    } else {
      LogEvent('PE_Intro_screen');
    }
  }, [paxlovidNewIntroScreen]);

  if (!observationId) {
    navigation.replace('TestRulingOut', { paxlovid: true });
    return null;
  }

  dispatch(
    setParams({
      uuid: route?.params?.userId || observation?.uuid || users[0],
      observationId,
      observationSymptoms: observation?.symptoms?.map((e) => e.name),
      eligibilityFormUserInfo: {
        symptomsBeginDate:
          observation?.symptoms?.length > 0 && observation.symptoms[0].started_at
            ? dateToIso8601(iso8601ToDate(observation.symptoms[0].started_at))
            : '',
        lastPositiveDate: observation?.date ? dateToIso8601(iso8601ToDate(observation.date)) : '',
      },
    })
  );

  const handleBack = () => {
    LogEvent('PE_Intro_Click_Close');
    navigation.dispatch({
      ...CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Dashboard',
            state: {
              index: 0,
              routes: [
                {
                  name: 'Timeline',
                },
              ],
            },
          },
        ],
      }),
    });
    dispatch(clearSelections());
  };

  const handleLeftButton = () => {
    LogEvent('PE_Intro_Click_Back');
    navigation.goBack();
  };

  const onCheck = () => {
    if (paxlovidNewIntroScreen) {
      LogEvent('PE_Intro_Click_Checkeligibility_B');
    } else {
      LogEvent('PE_Intro_Click_Checkeligibility');
    }
    navigation.navigate('EliminationQuestion');
  };

  if (paxlovidNewIntroScreen) {
    return (
      <LandingIntro
        title={' '}
        subtitle={t(`${translationPath}.newTitle`)}
        introBullets={[`${translationPath}.subTitle`]}
        headerImage={IntroImage}
        description={t(`${translationPath}.newDescription`)}
        rightButton={{ title: t(`${translationPath}.check`), onAction: onCheck }}
        handleBack={handleBack}
        handleHeaderLeft={handleLeftButton}
        border={false}
        headerBackground={false}
        withoutBulletNumberation
        descriptionTextStyle={styles.bulletTextStyle}
        bulletTextStyle={styles.bulletTextStyle}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComp
        right={[<CloseIcon width={14} height={14} />, handleBack]}
        addStyle={styles.header}
      />
      <View style={styles.containerBackground1}>
        <BackgroundCircleTopRight />
      </View>
      <View style={styles.containerBackground2}>
        <BackgroundRectTopLeft />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.checkContainer}>
            <CheckIcon width={67} height={67} />
          </View>
          <Text style={styles.title}>
            {parseHtmlForTags(t('paxlovid.intro.title'), {
              b: { fontFamily: fonts.familyBold, color: colors.greyMidnight },
            }).map((e) => React.createElement(Text, { style: e.style }, e.child))}
          </Text>
          <View style={styles.border} />
          <Pressable
            onPress={() => {
              navigation.navigate('EligibilityFormUserInfo');
            }}
          >
            <>
              <View style={styles.containerItem}>
                <View style={styles.containerBullet}>
                  <Text style={styles.bullet}>1</Text>
                </View>
                <Text style={styles.itemText}>{t('paxlovid.intro.bullets.1')}</Text>
              </View>
              <View style={styles.containerItem}>
                <View style={styles.containerBullet}>
                  <Text style={styles.bullet}>2</Text>
                </View>
                <Text style={styles.itemText}>{t('paxlovid.intro.bullets.2')}</Text>
              </View>
              <View style={styles.containerItem}>
                <View style={styles.containerBullet}>
                  <Text style={styles.bullet}>3</Text>
                </View>
                <Text style={styles.itemText}>{t('paxlovid.intro.bullets.3')}</Text>
              </View>
            </>
          </Pressable>
          <View style={styles.border} />
          <Text style={styles.description}>{t('paxlovid.intro.description')}</Text>
        </View>

        <View style={styles.footer}>
          <BlueButton
            style={styles.buttonPrimary}
            styleText={styles.buttonPrimaryTitle}
            title={t('paxlovid.intro.check')}
            action={() => {
              LogEvent('PE_Intro_Click_Checkeligibility');
              navigation.navigate('EliminationQuestion');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyWhite,
  },
  header: {
    paddingHorizontal: 24,
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
    lineHeight: 32,
    textAlign: 'center',
    marginTop: 35,
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
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyNormal,
    color: colors.greyMed,
    marginLeft: 15,
  },
  description: {
    flex: 1,
    width: '100%',
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyNormal,
    color: colors.greyGrey,
    lineHeight: 28,
    marginTop: 24,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonPrimary: {
    flex: 1,
    marginHorizontal: dimensions.pageMarginHorizontal,
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
  bulletTextStyle: {
    lineHeight: 25,
    textAlign: 'center',
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyNormal,
    color: colors.greyGrey,
    marginLeft: 24,
    marginRight: 24,
  },
});
