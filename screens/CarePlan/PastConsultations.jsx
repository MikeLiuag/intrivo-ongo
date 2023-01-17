import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, Platform, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../theme';
import HeaderComp from '../../components/HeaderComp';
import CloseIcon from '../../components/Svg/close';
import { getUserLiveSessions } from '../../store/user/slice';
import { LogEvent } from '../../analytics';
import LoaderComp from '../../components/LoaderComp';
import { PastConsultItem } from '../../components/PastConsultationItem';
import { resetToDashboard } from '../../utilis/navigationHelper';

const translationPath = 'profile.carePlan.pastConsultaion';

function PastConsultations({ route }) {
  const navigation = useNavigation();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userId, purpose } = route.params;
  const [pastConsultations, setPastConsultations] = useState();
  const [isLoading, setLoading] = useState(true);

  const analyticsName =
    purpose === 'sniffles_consultation'
      ? 'ProfileSnifflesCarePlanPastC'
      : 'ProfileLCOVIDCarePlanPast';

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await dispatch(getUserLiveSessions({ userId, purpose }));
    const { payload } = res;
    if (res?.type.includes('fulfilled')) {
      const filterCompleted = payload.filter(
        (item) => item.status === 'ended' || item.status === 'canceled'
      );
      setPastConsultations(filterCompleted);
    }
    setLoading(false);
  }, [dispatch, userId, purpose]);

  useEffect(() => {
    fetchData();
  }, [fetchData, userId]);

  useEffect(() => {
    LogEvent(`${analyticsName}_screen`);
  }, [analyticsName]);

  const handleRightClick = () => {
    LogEvent(`${analyticsName}_click_Close`);
    Alert.alert(t('exitAlert.Title'), t('exitAlert.Text'), [
      {
        text: t('yesNo.Yes'),
        onPress: () => {
          resetToDashboard(navigation);
        },
      },
      {
        text: t('yesNo.No'),
        style: 'cancel',
      },
    ]);
  };

  const goBack = () => {
    LogEvent(`${analyticsName}_click_Back`);
    navigation.goBack();
  };

  const renderItem = ({ item }) => <PastConsultItem data={item} />;

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.conitaner}>
      <HeaderComp
        center={[t(`${translationPath}.title`), styles.headerTitle]}
        addStyle={styles.header}
        left='arrow'
        onLeftClick={goBack}
        right={[<CloseIcon width={14} height={14} />, handleRightClick]}
      />
      <FlatList
        data={pastConsultations}
        keyExtractor={(item) => item.uuid}
        renderItem={renderItem}
        ListEmptyComponent={
          <View>
            <Text style={styles.noAppointment}>{t(`${translationPath}.noConsultation`)}</Text>
          </View>
        }
      />
      {isLoading ? <LoaderComp /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conitaner: {
    flex: 1,
    backgroundColor: colors.primaryGhost,
  },
  header: {
    paddingTop: 24,
    paddingRight: 24,
    paddingBottom: 12,
    paddingLeft: 24,
  },
  headerTitle: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Museo_700',
  },
  picker: {
    height: 60,
    position: 'relative',
    textAlign: 'center',
    borderWidth: 1,
    paddingHorizontal: Platform.OS === 'ios' ? hp('1.5%') : hp('0.7%'),
    fontSize: 20,
    borderColor: colors.greyExtraLight2,
    borderRadius: 16,
    justifyContent: 'center',
    marginVertical: hp('1%'),
    backgroundColor: colors.white,
    marginHorizontal: 24,
  },
  item: {
    marginHorizontal: 24,
    borderColor: colors.greyExtraLight2,
    borderRadius: 16,
    justifyContent: 'center',
    marginVertical: hp('1%'),
    backgroundColor: colors.white,
    padding: 24,
    borderWidth: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    borderColor: colors.greyExtraLight2,
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingBottom: 16,
  },
  iconWrapper: {
    backgroundColor: colors.primaryPavement,
    borderRadius: 6,
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  upcomingText: {
    fontSize: 12,
    lineHeight: 24,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.greyWhite2,
    fontFamily: 'Museo_900',
  },
  consultTypeText: {
    fontSize: 14,
    lineHeight: 17,
    color: colors.greyDark2,
    fontFamily: 'Museo_500',
    marginTop: 10,
  },
  dateText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyMed,
    fontFamily: 'Museo_500',
    marginTop: 5,
  },
  blueButtonText: {
    fontSize: 14,
    lineHeight: 17,
    color: colors.primaryBlue,
    fontFamily: 'Museo_700',
    marginTop: 5,
  },
  textContent: { marginHorizontal: 16 },
  bottomButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noAppointment: {
    fontSize: 14,
    lineHeight: 17,
    color: colors.greyDark2,
    fontFamily: 'Museo_500',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default PastConsultations;
