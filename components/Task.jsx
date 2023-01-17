import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { colors } from '../theme';
import { mapTaskSlug } from '../utilis/configs';
import { useTranslation } from 'react-i18next';
import Icon from './Icon';

export default ({ data, navigation, backgroundColor }) => {
  const { t } = useTranslation();
  const { users } = useSelector((s) => s.user);

  const taskDefinition = mapTaskSlug[data?.slug] || null;

  const onlyMainUser = !users || !data.users || (data.users.length === 1 && data.users[0].uuid === users[0]);

  const getFontColor = (status) => {
    switch (status) {
      case 'Overdue':
        return colors.statusRed;
      case 'Due today':
        return colors.statusOrange;
      default:
        return colors.greyMed;
    }
  };

  // const getIconColor = (status) => {
  //   if (status === 'UPC' || status === 'NS' || status === 'IN') {
  //     return colors.primaryBlue;
  //   }
  //   return colors.greyWhite;
  // };

  // const getIconBackgroundColor = (status) => {
  //   if (status === 'Overdue') {
  //     return colors.statusOrange;
  //   }
  //   if (status === 'UPC' || status === 'NS' || status === 'IN') {
  //     if (backgroundColor === colors.primaryPavement) {
  //       return colors.greyWhite;
  //     }
  //     return colors.primaryPavement;
  //   }
  //   if (status === 'FAIL') {
  //     return colors.statusRed;
  //   }
  //   if (status === 'PASS') {
  //     return colors.statusGreen;
  //   }
  //   return colors.primaryPavement;
  // };

  const getDate = (date, status) => {
    if (!date) return undefined;

    if(status === 'Overdue') return t('screens.home.task.dueToday');

    const today = new Date();
    const isToday = new Date(date).toDateString() === today.toDateString();
    if (isToday) return null; // status already takes care of this

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const isTomorrow =
      new Date(date).toDateString() === tomorrow.toDateString();
    if (isTomorrow) return t('screens.home.task.dueTomorrow');

    return `Due ${date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    })}`;
  };

  const getStatusString = () => {
    if (data.status === 'Overdue') return 'Overdue';
    if (data.status === 'UPC') return 'Upcoming';
    if (data.status === 'NS') return 'Not Started';
    return data.status;
  };

  if (taskDefinition === null) return null;

  const getUserStatus = (date) => {
    const today = new Date();
    const due = new Date(date);

    if (!date) return null;
    else if (today.toDateString() === due.toDateString())  return t('screens.home.task.today');
    else if (due - today < 0) return t('screens.home.task.overdue');
    else return t('screens.home.task.upcoming');
  };

  const userItem = ({ item }) => (
    <View style={styles.containerUser}>
      <View style={styles.containerProfile}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileText}>
            {`${item.first_name.charAt(0)}${item.last_name.charAt(0)}`}
          </Text>
        </View>
        <Text style={styles.name}>
          {`${item.first_name} ${item.last_name}`}
        </Text>
      </View>
      <Text
        style={[styles.statusBold, {color: getFontColor(getUserStatus(item.date))}]}>
        {getUserStatus(item.date)}
        <Text style={styles.statusRegular}>
          {getDate(item.date, getUserStatus(item.date)) ? ` | ${getDate(item.date, getUserStatus(item.date))}` : ''}
        </Text>
      </Text>
    </View>
  );

  return (
    <View style={{ ...styles.testBody, backgroundColor }}>
      <View style={styles.testSection}>
        <View style={styles.leftSection}>
          <View
            style={{
              ...styles.iconBackground,
              backgroundColor: colors.primaryPavement,
            }}
          >
            <Icon
              type={'MaterialIcons'}
              name={'coronavirus'}
              size={24}
              isGradient={true}
            />
          </View>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.testName}>
            {taskDefinition?.displayName || ''}
          </Text>
          {onlyMainUser && (
            <View style={styles.statusSection}>
              <Text style={{ flex: 1 }}>
                <Text
                  style={{
                    ...styles.testResult,
                    color: getFontColor(data.status),
                  }}
                >
                  {getStatusString()}
                </Text>
                {!!getStatusString() && !!getDate(data.date, data.status) && (
                  <Text style={styles.testSeparator}> | </Text>
                )}
                <Text style={styles.testDate}>{getDate(data.date, data.status)}</Text>
              </Text>
            </View>
          )}
        </View>
      </View>
      {!onlyMainUser ? (
        <FlatList
          style={styles.containerUsers}
          data={data.users}
          renderItem={userItem}
          keyExtractor={item => item.id}
        />
      ) : null}
      {data.status !== 'Upcoming' && (
        <View style={styles.buttonSection}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(taskDefinition.navigationName);
            }}
            style={styles.btnWrapper}
          >
            <Text style={styles.btnText}>{taskDefinition?.ctaText || ''}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  userName: {
    color: colors.greyMed,
    fontSize: 12,
    fontFamily: 'Museo_500',
  },
  userAv: {
    height: 24,
    width: 24,
    borderRadius: 24,
    backgroundColor: colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avWithName: { flexDirection: 'row', alignItems: 'center' },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  usersSection: {
    borderTopWidth: 1,
    borderTopColor: colors.greyExtraLight,
    paddingTop: 16,
    marginTop: 24,
  },
  testBody: {
    width: '100%',
    borderRadius: 16,
    marginTop: hp('1.5%'),
    flexDirection: 'column',
    paddingTop: wp('6.4%'),
    paddingLeft: wp('4.2%'),
    paddingRight: wp('4.2%'),
    paddingBottom: wp('5%'),
  },
  buttonSection: {
    marginTop: 24,
  },
  btnWrapper: {
    backgroundColor: colors.primaryBlue,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16.8,
  },
  testSection: {
    flexDirection: 'row',
    flex: 1,
  },
  testSeparator: {
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 22,
    color: '#999999',
  },
  testResult: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 22,
    // letterSpacing: 0.7,
  },
  testDate: {
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 22,
    // letterSpacing: 0.7,
    color: '#999999',
  },
  iconBackground: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryPavement,
    borderRadius: 8,
  },
  leftSection: {
    marginRight: 16,
  },
  rightSection: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  statusSection: {
    flexDirection: 'row',
  },

  clientSection: {
    flexDirection: 'row',
    marginLeft: wp('7%'),
    marginTop: 2,
  },
  imageSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: wp('6%'),
    marginBottom: hp('1.9%'),
    marginTop: 8,
  },
  image: {
    width: wp('6,4%'),
    height: wp('6,4%'),
    marginRight: 4,
  },
  testName: {
    fontSize: 16,
    fontFamily: 'Museo_700',
    lineHeight: 17,
    marginBottom: wp('1%'),
    color: colors.greyDark2,
  },
  dateSection: {
    borderRadius: 6,
  },
  clientIndicator: {
    backgroundColor: '#26A9E0',
    width: 12,
    height: 12,
    borderRadius: 50,
    marginRight: 6,
  },
  clientName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#999999',
  },
  containerUsers: {
    marginTop: 10,
    paddingTop: 7,
    borderTopWidth: 1,
    borderTopColor: colors.greyExtraLight,
  },
  containerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 7,
    paddingBottom: 7,
  },
  containerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryYellow,
  },
  profileText: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    lineHeight: 15,
    color: colors.greyWhite,
  },
  name: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    lineHeight: 22,
    color: colors.greyMed,
  },
  containerStatus: {
    width: 68,
    height: 27,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  statusBold: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 17,
  },
  statusRegular: {
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 17,
    color: colors.greyMed,
  },
});
