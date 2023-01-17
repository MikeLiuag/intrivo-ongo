import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import HeaderComp from '../../components/HeaderComp';
import CareRow from '../../components/CareRow';
import OnGoSvg from '../../components/Svg/OnGoSvg';
import { fetchCareList } from '../../store/app/slice';
import { colors } from '../../theme';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { LogEvent } from '../../analytics';
import CompletedScreen from '../../components/CompletedScreen';

const CarePopup = ({
    route,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const careList = useSelector((s) => s.app.careList);
  const careListReady = useSelector(s => s.app.careListReady);
  const [isModalVisible, setModalVisible] = useState(false);

  const type = route?.params?.type?.replace('/','');

  useEffect(() => {
    LogEvent(`Test_${type}_Popup_screen`);
    dispatch(fetchCareList());
  }, [dispatch]);

  const handleSkip = () => {
    LogEvent(`Test_${type}_Popup_click_NotNow`);
    setModalVisible(true);
  }

  const handleExplore = () => {
      LogEvent(`Test_${type}_Popup_click_Explore`)
      navigation.navigate('CareList',{fromPopup: true})
  }

  const handleClose = () => {
      LogEvent(`Test_${type}_Popup_click_Close`);
      navigation.navigate('Home')
  }

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1, backgroundColor: '#fff' }}>
      {!careListReady ? (
        <ActivityIndicator />
      ) : (
        <>
          <HeaderComp
            right={['x', handleClose]}
            addStyle={styles.header}
          />
          <ScrollView style={styles.container}>
            <View style={styles.internalFirstContainer}>
              <OnGoSvg />
              <Text style={styles.headerTitle}>
                {t('screens.carePopup.title')}
              </Text>
              <Text style={styles.subtitle}>
              {t('screens.carePopup.subtitle')}
              </Text>
            </View>
            <View style={styles.internalSecondContainer}>
              <CareRow
                image={careList.data.general[1].image}
                text={t('screens.carePopup.row.1')}
              />
              <CareRow
                image={careList.data.general[2].image}
                text={t('screens.carePopup.row.2')}
              />
              <CareRow
                image={careList.data.general[0].image}
                text={t('screens.carePopup.row.3')}
              />
              <Text style={styles.footerText}>{t('screens.carePopup.footer')}</Text>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
              <BlueButton
                action={handleSkip}
                title={t('screens.carePopup.buttons.notNow')}
                style={styles.leftButton}
                styleText={styles.leftText}
              />
              <BlueButton
                action={handleExplore}
                title={t('screens.carePopup.buttons.explore')}
                styleText={styles.rightText}
                style={styles.rightButton}
              />
          </View>
        </>
      )}
      {isModalVisible && (
        <CompletedScreen
          visible={isModalVisible}
          result={1}
          animated
          setModal={() => navigation.navigate('Home')}
        />
      )}
    </SafeAreaView>
  );
};

export default CarePopup;

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
    flex: 3,
    marginTop: 30,
  },
  headerTitle: {
    fontFamily: 'Museo_700',
    fontSize: 20,
    lineHeight: 24,
    marginVertical: 26,
  },
  subtitle: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 28,
    color: colors.greyDark,
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
  }
});
