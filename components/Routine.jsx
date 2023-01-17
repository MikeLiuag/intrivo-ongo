import React from 'react';
import { 
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';
import DefaultRoutineLogo from '../components/Svg/defaultRoutineLogo';
import { LogEvent } from '../analytics';
import { useSelector } from 'react-redux';

export default ({ item, color, styleProp }) => {
  const navigation = useNavigation();

  const {users} = useSelector((state) => state.user) || {};
  const onlyMainUser = !users || !item.users || (item.users.length === 1 && item.users[0].uuid === users[0]);

  const getColorBackground = (status) => {
    const lcStatus = status.toLowerCase();
    switch (lcStatus) {
      case 'overdue':
      case 'pending':
      case 'expired':
        return colors.statusOrange;
      case 'fail': 
        return colors.statusRed;
      case 'pass':
        return colors.statusGreen;
      case 'due':
        return colors.primaryBlue;
      default:
        return colors.greyGrey;
    }
  };

  const getColorFont = (status) => {
    if (status === 'IN') {
      return '#999999';
    }
    return null;
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
      <View
        style={[
          styles.containerStatus,
          {backgroundColor: getColorBackground(item.status)}
        ]}>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <TouchableOpacity
      key={'routine_'.concat(item.name)}
      style={{
        ...styles.routineContainer,
        backgroundColor: color,
      }}
      // for right now
      disabled
      onPress={() => {
        LogEvent('ProfileRoutines_click_Routine');
        navigation.navigate('RoutineDetails', {
          uuid: item.uuid,
          statusColor: colors.greyWhite, // getColorFont(item.status),
          statusBackgroundColor: getColorBackground(item.status),
        });
      }}
    >
      <View style={styles.containerRoutine}>
        {!!item?.image ? (
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.routineIcon}
            resizeMode="contain"
          />
        ) : <DefaultRoutineLogo width={36} height={36}/>}
        <View style={{ flex: 1, marginLeft: 15, marginRight: 15 }}>
          <Text  
            style={[styleProp?.header, styles.routineHeader]}
            numberOfLines={3}
          >
            {item.name}
          </Text>
          {item.description && (<Text style={styles.routineDescription}>{item.description}</Text>)}
        </View>
        {onlyMainUser && (
          <View
            style={{
              ...styles.routineAction,
              backgroundColor: getColorBackground(item.status),
            }}
          >
            <Text
              style={{
                ...styles.routineActionText,
                color: colors.greyWhite, // getColorFont(item.status),
              }}
            >
              {item.status}
            </Text>
          </View>
        )}
      </View>
      {!onlyMainUser && (
        <FlatList
          style={styles.containerUsers}
          data={item.users}
          renderItem={userItem}
          keyExtractor={item => item.id}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  routineContainer: {
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
  },
  containerRoutine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routineIcon: {
    width: 36,
    height: 36,
    aspectRatio: 1,
    borderRadius: 18,
    overflow: 'hidden',
  },
  routineHeader: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 19.2,
    letterSpacing: 0.005,
    color: '#333333',
  },
  routineDescription: {
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.005,
    color: '#999999',
  },
  routineAction: {
    width: 90,
    height: 27,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routineActionText: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 17,
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
    height: 27,
    minWidth: 68,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 6,
  },
  status: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 17,
    color: colors.greyWhite,
  },
});
