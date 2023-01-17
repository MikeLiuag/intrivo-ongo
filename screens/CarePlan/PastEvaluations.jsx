import React, { useEffect } from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { colors } from '../../theme';
import HeaderComp from '../../components/HeaderComp';
import CloseIcon from '../../components/Svg/close';
import Icon from '../../components/Icon';
import { formats, iso8601ToFormatted } from '../../utilis/dateTime';
import { firstCharToUpperCase } from '../../utilis/strings';
import { statusColors, statusText } from './constant';
import { LogEvent } from '../../analytics';
import { resetToDashboard } from '../../utilis/navigationHelper';

const translationPath = 'profile.carePlan.treatmentEvaluation';

const PastEvaluations = () => {
  const navigation = useNavigation();
  const { params: { purpose, evaluations = [] } = {} } = useRoute();
  const isSniffles = purpose === 'sniffles';

  const { t } = useTranslation();
  const { usersLookup } = useSelector((state) => state.user) || {};

  useEffect(() => {
    LogEvent(`ProfileSnifflesCarePlanPast_screen`);
  }, []);

  const handleRightClick = () => {
    Alert.alert(t('exitAlert.Title'), t('exitAlert.Text'), [
      {
        text: t('yesNo.Yes'),
        onPress: () => {
          LogEvent(`ProfileSnifflesCarePlanPastE_click_Close`);
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
    LogEvent(`ProfileSnifflesCarePlanPastE_click_Back`);
    navigation.goBack();
  };

  const onViewDetailsTreatment = (evaluation) => {
    LogEvent(`ProfileSnifflesCarePlanPastE_click_View`);
    navigation.navigate('TreatmentEvalutions', { evaluation });
  };

  const renderItem = ({ item }) => {
    const userName = `${usersLookup[item?.user_id].first_name} ${
      usersLookup[item?.user_id].last_name
    }`;
    const title = isSniffles ? 'snifflesTreatment' : 'covidTreatment';

    return (
      <View style={styles.item}>
        <View style={styles.itemHeader}>
          <View style={styles.iconWrapper}>
            <Icon type='MaterialIcons' name='playlist-add-check' size={16} isGradient />
          </View>
          <View style={{ flex: 1, marginHorizontal: 16 }}>
            <Text style={styles.itemTitle}>{t(`${translationPath}.${title}`)}</Text>
            <Text style={styles.dateText}>{userName}</Text>
            <Text style={styles.dateText}>
              {iso8601ToFormatted(item?.created_at, formats?.fullLongDate)}
            </Text>
          </View>
          <Text style={[styles.statusText, statusColors[item.status]]}>
            {firstCharToUpperCase(statusText[item?.status])}
          </Text>
        </View>
        <View style={styles.itemContent}>
          <TouchableOpacity onPress={() => onViewDetailsTreatment(item)}>
            <Text style={styles.blueButtonText}>{t(`${translationPath}.viewDetails`)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.conitaner}>
      <HeaderComp
        center={[t(`${translationPath}.past`), styles.headerTitle]}
        addStyle={styles.header}
        left='arrow'
        onLeftClick={goBack}
        right={[<CloseIcon width={14} height={14} />, handleRightClick]}
      />
      <FlatList data={evaluations} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </SafeAreaView>
  );
};

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
    color: colors.greyDark2,
    fontFamily: 'Museo_700',
    lineHeight: 19,
  },

  item: {
    marginHorizontal: 24,
    borderColor: colors.greyExtraLight2,
    borderRadius: 16,
    marginVertical: hp('1%'),
    backgroundColor: colors.white,
    padding: 24,
    borderWidth: 1,
  },
  itemHeader: {
    paddingBottom: 16,
    borderColor: colors.greyExtraLight2,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 14,
    color: colors.greyDark2,
    fontFamily: 'Museo_700',
    lineHeight: 17,
  },
  itemContent: {
    paddingTop: 24,
  },
  iconWrapper: {
    backgroundColor: colors.primaryPavement,
    borderRadius: 6,
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBox: {
    paddingVertical: 16,
    borderColor: colors.greyExtraLight2,
    borderBottomWidth: 1,
    marginBottom: 16,
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
    color: colors.greyGrey,
    fontFamily: 'Museo_500',
  },
  statusText: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Museo_700',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.greyMed,
    fontFamily: 'Museo_500',
    marginTop: 5,
  },
  blueButtonText: {
    fontSize: 14,
    lineHeight: 17,
    color: colors.primaryBlue,
    fontFamily: 'Museo_700',
  },
});

export default PastEvaluations;
