import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import HeaderComp from '../components/HeaderComp';
import { colors } from '../theme';
import { LogEvent } from '../analytics';
import Icon from '../components/Icon';

export default ({ navigation }) => {
  const { t } = useTranslation();
  useEffect(() => {
    LogEvent('TnT_Checklist_screen');
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.container}>
      <HeaderComp
        center={['Vitamin D Test', styles.headerTitle]}
        left="arrow"
        onLeftClick={handleGoBack}
        addStyle={styles.header}
      />
      <View style={{top:-45,width:'100%',  alignItems: 'center',  }}>
        <Text style={styles.headerSubTitle}>{t('pretestChecklist.title')}</Text>
        <TouchableOpacity
          style={[styles.trackButton]}
          onPress={() => {
            LogEvent('TnT_Track');
            navigation.navigate('OrderDetail');
          }}
        >
          <Text style={styles.trackText}>
            {t('pretestChecklist.trackYourOrder')}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={5}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{t('pretestChecklist.whatToDo')}</Text>
          <View style={styles.boxContainer}>
            <View style={styles.boxHeader}>
              <Text style={styles.boxTitle}>
                {t('pretestChecklist.content1')}
              </Text>
              <Text>💦</Text>
            </View>
            <View style={styles.whileBox}>
              <Text style={styles.description}>
                {t('pretestChecklist.description1')}
              </Text>
            </View>
          </View>

          <View style={styles.boxContainer}>
            <View style={styles.boxHeader}>
              <Text style={styles.boxTitle}>
                {t('pretestChecklist.content2')}
              </Text>
              <Text>✋</Text>
            </View>
            <View style={styles.whileBox}>
              <Text style={styles.description}>
                {t('pretestChecklist.description2')}
              </Text>
            </View>
          </View>

          <View style={styles.boxContainer}>
            <View style={styles.boxHeader}>
              <Text style={styles.boxTitle}>
                {t('pretestChecklist.content3')}
              </Text>
              <Text>📦</Text>
            </View>
            <View style={styles.whileBox}>
              <Text style={styles.description}>
                {t('pretestChecklist.description3')}
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{t('pretestChecklist.resources')}</Text>

          <TouchableOpacity
            style={[styles.boxContainer, styles.rowFlex]}
            onPress={() => {
              LogEvent('TnT_Checklist_click_Learn');
              navigation.navigate('Vitamin', { isFromCheckList: true });
            }}
          >
            <View style={styles.resourceView}>
              <View style={styles.iconContainer}>
                <Icon
                  type="MaterialCommunityIcons"
                  name="school"
                  size={24}
                  isGradient
                />
              </View>
              <Text style={styles.learn}>
                {t('pretestChecklist.learnVitamin')}
              </Text>
            </View>
            <Icon
              type="MaterialCommunityIcons"
              name="chevron-right"
              size={24}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scrollContainer: { flex: 1,marginTop:-20 },
  scrollContentContainer: { flexGrow: 1 },
  content: {
    paddingHorizontal: wp('8%'),
    paddingBottom: wp('8%'),
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: hp('2.5%'),
    marginHorizontal: wp('4%'),
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    color: colors.black,
    fontFamily: 'Museo_700',
    textAlign: 'center',
  },
  headerSubTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.greyMed,
    fontFamily: 'Museo_300',
    textAlign: 'center',
  },
  trackButton: {
    marginTop: 10,
  },
  trackText: {
    fontSize: 14,
    fontFamily: 'Museo_700',
    color: colors.primaryBlue,
  },
  title: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
    color: colors.greyDark2,
    marginVertical: 25,
  },
  boxContainer: {
    backgroundColor: '#F2F7F9',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxTitle: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 17,
    color: colors.greyDark2,
  },
  whileBox: {
    backgroundColor: colors.greyWhite,
    borderRadius: 8,
    padding: 16,
    marginTop: 14,
  },
  description: {
    fontFamily: 'Museo_300',
    fontSize: 12,
    lineHeight: 18,
    color: colors.black,
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.greyWhite,
  },
  learn: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
    color: colors.greyDark2,
    marginHorizontal: 10,
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  resourceView: { flexDirection: 'row', alignItems: 'center' },
});
