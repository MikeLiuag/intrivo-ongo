import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import HeaderComp from '../../components/HeaderComp';
import VitaminBackground from '../../components/Svg/VitaminBackground';
import { colors } from '../../theme';
import CareRow from '../../components/CareRow';
import Sun from '../../components/Svg/vitaminIcon/Sun';
import Fish from '../../components/Svg/vitaminIcon/Fish';
import Food from '../../components/Svg/vitaminIcon/Food';
import Plate from '../../components/Svg/vitaminIcon/Plate';
import Drink from '../../components/Svg/vitaminIcon/Drink';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { LogEvent } from '../../analytics';
import { setShowReviewScreen } from '../../store/app/slice';

const Vitamin = ({ route }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isFromCheckList = route.params?.isFromCheckList;
  const dispatch = useDispatch();

  const { type } = route?.params;

  useEffect(() => {
    if (isFromCheckList) {
      LogEvent(`TnT_AboutVD_screen`);
    } else if (type) {
      LogEvent(`Test_${type}_VDLearnMore_screen`);
    } else {
      LogEvent(`VitDMore_screen`);
    }

    return () => {
      if(!isFromCheckList){
        dispatch(setShowReviewScreen(true));
      }
    };
  }, []);

  const handleClose = () => {
    if (isFromCheckList) {
      LogEvent(`TnT_AboutVD_click_Close`);
    } else if (type) {
      LogEvent(`Test_${type}_VDLearnMore_click_Close`);
    } else {
      LogEvent(`VitDMore_click_Close`);
    }
    navigation.navigate('Home');
  };

  const handleButton = () => {
    if (type) {
      LogEvent(`Test_${type}_VDLearnMore_click_Home`);
    } else {
      LogEvent(`VitDMore_click_BackHome`);
    }
    navigation.navigate('Home');
  };

  const goBack = () =>{
    if (isFromCheckList) {
      LogEvent(`TnT_AboutVD_click_Back`);
    }
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderComp
        left={isFromCheckList ? 'arrow' : null}
        onLeftClick={goBack}
        right={['x', handleClose]}
        addStyle={styles.header}

      />
      <VitaminBackground style={styles.backgroundContainer} />
      <View style={styles.container}>
        <Text style={styles.title}>
          {isFromCheckList
            ? t('screens.vitaminInfo.secondTitle')
            : t('screens.vitaminInfo.title')}
        </Text>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.text}>{t('screens.vitaminInfo.first')}</Text>
          <View style={styles.midleTextContainer}>
            <Text style={styles.text}>{t('screens.vitaminInfo.second')}</Text>
            <View style={styles.pointContainer}>
              <Text style={styles.text}>{t('screens.vitaminInfo.p1')}</Text>
              <Text style={styles.text}>{t('screens.vitaminInfo.p2')}</Text>
              <Text style={styles.text}>{t('screens.vitaminInfo.p3')}</Text>
            </View>
          </View>
          <Text style={styles.text}>{t('screens.vitaminInfo.thrid')}</Text>
          <View style={styles.rowsContainer}>
            <CareRow
              renderSvg={() => <Sun />}
              text={t('screens.vitaminInfo.rows.1')}
            />
            <CareRow
              renderSvg={() => <Fish />}
              text={t('screens.vitaminInfo.rows.2')}
            />
            <CareRow
              renderSvg={() => <Food />}
              text={t('screens.vitaminInfo.rows.3')}
            />
            <CareRow
              renderSvg={() => <Plate />}
              text={t('screens.vitaminInfo.rows.4')}
            />
            <CareRow
              renderSvg={() => <Drink />}
              text={t('screens.vitaminInfo.rows.5')}
            />
          </View>
          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>
              {t('screens.vitaminInfo.firstLink')}
            </Text>
            <Text style={styles.linkText}>
              {t('screens.vitaminInfo.secondLink')}
            </Text>
          </View>
          {!isFromCheckList ? (
            <BlueButton
              title={t('screens.vitaminInfo.button')}
              action={handleButton}
            />
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Vitamin;

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === 'ios' ? 0 : 20,
    marginHorizontal: 26,
    zIndex: 10,
  },
  container: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: hp('8%'),
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  scrollContainer: {
    marginTop: hp('6%'),
  },
  scrollContent: {
    paddingBottom: hp('2%'),
  },
  title: {
    color: '#fff',
    fontFamily: 'Museo_700',
    fontSize: 20,
    lineHeight: 24,
  },
  rowsContainer: {
    paddingHorizontal: wp('2%'),
  },
  text: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 28,
    color: colors.greyDark,
  },
  midleTextContainer: {
    marginVertical: hp('4%'),
  },
  pointContainer: {
    marginLeft: wp('4%'),
  },
  linkContainer: {
    marginVertical: hp('4%'),
  },
  linkText: {
    fontFamily: 'Museo_500',
    fontSize: 10,
    lineHeight: 12,
    color: colors.greyDark,
  },
});
