import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { getPastVisitSummary } from '../store/user/slice';
import { colors } from '../theme';
import { formats, iso8601ToFormatted } from '../utilis/dateTime';
import Icon from './Icon';
import { LogEvent } from '../analytics';

const translationPath = 'profile.carePlan.pastConsultaion';

export const PastConsultItem = ({ data: item }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [visitDoc, setVisitDoc] = useState([]);

  const fetchData = useCallback(async () => {
    const userId = item.user.uuid;
    const response = await dispatch(getPastVisitSummary({ userId, sessionId: item.uuid }));
    const { payload } = response;
    if (response?.type.includes('fulfilled')) {
      setVisitDoc([...payload]);
    }
  }, [dispatch, item]);

  useEffect(() => {
    fetchData();
  }, [fetchData, item]);

  const onAfterVisit = async () => {
    const doc = visitDoc[0].media[0];
    doc.uri = doc.url;
    if (item?.session_purpose === 'sniffles_consultation') {
      LogEvent('ProfileSnifflesCarePlanPastC_click_After');
    } else {
      LogEvent('ProfileLCOVIDCarePlanPast_click_AfterVisit');
    }
    navigation.navigate('FilePreview', {
      media: doc,
      header: ' ',
    });
  };

  const renderHeaderTitle = () => {
    if (item?.session_purpose === 'consultation') return t(`${translationPath}.virtualLongCovid`);
    if (item?.session_purpose === 'sniffles_consultation')
      return t(`${translationPath}.virtualSniffles`);
    return '';
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemHeader}>
        <View style={styles.iconWrapper}>
          <Icon type='MaterialIcons' name='favorite' size={16} isGradient />
        </View>

        <View style={styles.textContent}>
          <Text style={styles.headerTitle}>{renderHeaderTitle()}</Text>
          <Text style={styles.dateText}>
            {item.user.first_name} {item.user.last_name}
          </Text>
          <Text style={styles.dateText}>
            {iso8601ToFormatted(item.created_at, formats.fullLongDate)}
          </Text>
        </View>
      </View>

      <View style={styles.bottomButton}>
        <TouchableOpacity onPress={() => onAfterVisit(item)} disabled={visitDoc.length === 0}>
          <Text style={[styles.blueButtonText, visitDoc.length === 0 && styles.disableButtonText]}>
            {t(`${translationPath}.afterVisitSummary`)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  disableButtonText: {
    color: colors.greyGrey,
  },
  textContent: { marginHorizontal: 16 },
  bottomButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PastConsultItem;
