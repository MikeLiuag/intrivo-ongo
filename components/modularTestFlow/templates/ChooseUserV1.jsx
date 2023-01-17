import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import Select from '../components/buttons/select';
import { colors } from '../../../theme';
import InputLeftLabel from '../../InputLeftLabel';

const ChooseUserV1 = ({ props, onAction = () => null, multi = false }) => {
  const [answers, setAnswers] = useState(null);
  const { usersLookup } = useSelector((s) => s.user);
  const [noneSelected, setNone] = useState(false);
  const [otherFullName, setOtherFullName] = useState('');

  useEffect(() => {
    const array = [];
    Object.keys(usersLookup).forEach((key) => array.push(usersLookup[key]));
    setAnswers(array);
  }, [usersLookup]);

  const handleSelect = (s) => {
    if (noneSelected) setNone(false);
    const array = [];
    Object.keys(usersLookup).forEach((key) => array.push(usersLookup[key]));
    const selectedUsersArray = array.map((item) => {
      if (item.uuid === s.uuid) {
        return { ...item, selected: !item.selected };
      }
      return item;
    });
    setAnswers(selectedUsersArray);
    const selectedUser = selectedUsersArray.filter((item) => item.selected);
    onAction({
      selected: selectedUsersArray.length > 0,
      user: selectedUser,
      key: props.key,
    });
  };

  const handleNone = () => {
    const array = [];
    Object.keys(usersLookup).forEach((key) => array.push(usersLookup[key]));
    setAnswers(array);
    setNone(true);
    setOtherFullName('');
    onAction({
      selected: false,
      key: props.key,
    });
  };

  const arrayWithNull = () => {
    if (answers) {
      const array = [...answers];
      array.push({ uuid: 1 });
      return array;
    }
    return [];
  };

  const renderItem = ({ item, index }) => {
    if (index !== answers.length) {
      return (
        <Select
          key={item.uuid}
          title={item.fullName}
          active={item.selected}
          action={() => handleSelect(item)}
        />
      );
    }
    return <Select title={props.null_option} active={noneSelected} action={() => handleNone()} />;
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.subtitle, { textAlign: props.question ? 'left' : 'center' }]}>
        {props.subtitle}
      </Text>
      {props.question && <Text style={styles.question}>{props.question}</Text>}
      {props.additional_information && (
        <Text style={styles.additional}>{props.additional_information}</Text>
      )}
      <View style={styles.symptomsContainer}>
        <FlatList
          key='-'
          style={{ flex: 1 }}
          data={arrayWithNull()}
          keyExtractor={(item) => item.uuid}
          ListFooterComponent={
            noneSelected ? (
              <View style={styles.inputContainer}>
                <InputLeftLabel
                  placeholder='Enter first and last name'
                  value={otherFullName}
                  action={(value) => {
                    setOtherFullName(value);
                    onAction({
                      selected: !!value,
                      user: value,
                      key: props.key,
                    });
                  }}
                />
              </View>
            ) : null
          }
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default ChooseUserV1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  subtitle: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  question: {
    fontFamily: 'Museo_700',
    fontSize: 24,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  additional: {
    paddingHorizontal: 24,
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 19,
    color: colors.greyDark2,
    marginTop: 6,
  },
  symptomsContainer: {
    flex: 1,
    marginTop: 32,
    marginLeft: wp('4%'),
    marginRight: wp('4%'),
  },
  iconText: {
    fontFamily: 'Museo_700',
    fontSize: 20,
    lineHeight: 28,
    color: '#fff',
  },
  borderStyle: {
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 16,
  },
  inputContainer: {
    marginHorizontal: 8,
  },
});
