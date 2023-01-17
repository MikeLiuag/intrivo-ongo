import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { colors } from '../theme/index';
import { sendLocalObservation } from '../store/app/slice';

const warning = require('../assets/warning.png');

const UnsavedResultItem = ({ observation, index } = {}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { users, usersLookup } = useSelector((s) => s.user);
  console.log('*** obser', observation);
  const { name } = observation.observation;
  const date = new Date();
  const result = observation?.observation?.data?.questionnaire_data?.result;

  const returnText = () => {
    if (result === 0) return 'Negative';
    if (result === 1) return 'Positive';
    return 'Invalid';
  };

  const returnColor = () => {
    if (result === 0) return colors.statusGreen;
    if (result === 1) return colors.statusRed;
    return colors.statusOrange;
  };

  const onRefresh = async () => {
    dispatch(sendLocalObservation({ uuid: users[0], observation, index }));
  };

  const getTestName = () => (name ? name.replace('COVID-19 Antigen Self-Test', '') : 'undefined');

  const getTypeName = () => (name ? name.replace(getTestName(), '') : 'undefined');

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <View
          style={{
            flex: 3,
            minWidth: 150,
          }}
        >
          <Text style={styles.name}>{getTypeName()}</Text>
        </View>
        <View
          style={{
            minWidth: 95,
          }}
        >
          <View
            style={{
              backgroundColor: returnColor(),
              borderRadius: 6,
              paddingHorizontal: 8,
              paddingVertical: 5,
              marginBottom: 5,
              alignSelf: 'flex-end',
            }}
          >
            <Text style={styles.status}>{returnText()}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.user}>{usersLookup[observation.uuid].fullName}</Text>
      <Text style={styles.user}>Test name: {getTestName()}</Text>
      <Text style={styles.user}>Date of testing: {format(date, 'MMM dd, yyyy')}</Text>
      <View style={styles.containerUnsavedInfo}>
        <Image style={styles.infoIcon} source={warning} />
        <View style={{ flex: 1 }}>
          <Text style={styles.unsavedTitle}>Results not saved</Text>
          <Text style={styles.unsavedDescription}>
            Check internet connection, and
            <Text onPress={onRefresh} style={styles.refresh}>
              {' '}
              refresh{' '}
            </Text>
            to try again.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 95,
    backgroundColor: '#ededed',
    width: '100%',
    borderRadius: 16,
    padding: 24,
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    color: '#5f5f5f',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  user: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    color: '#82828b',
    fontStyle: 'italic',
    marginTop: 5,
  },
  status: {
    color: 'white',
    fontFamily: 'Museo_500',
    fontSize: 14,
    textAlign: 'center',
  },
  containerUnsavedInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
  },
  infoIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  unsavedTitle: {
    color: colors.greyDark2,
    fontFamily: 'Museo_500',
    fontSize: 14,
  },
  unsavedDescription: {
    color: colors.greyDark2,
    fontFamily: 'Museo_300',
    fontSize: 14,
  },
  refresh: {
    color: '#334c96',
    fontFamily: 'Museo_500',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UnsavedResultItem;
