import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowDown from '../../components/Svg/arrowDown';
import Search from '../../components/Svg/search.svg';
import { useTranslation } from 'react-i18next';
import { colors } from '../../theme';
import EmployeeItem from '../../components/BulkTesting/EmployeeItem';
import { useDispatch, useSelector } from 'react-redux';
import SuccessToast from '../../components/SuccessToast';
import { getEmployees, getGroups, } from '../../store/bulkTesting/slice';
import CloseSvg from '../../components/Svg/close';

const Employees = ({route}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState('incomplete');
  const [searchQuery, setSearchQuery] = useState('');
  const promise = useRef();

  const {showToast} = useSelector(state => state.events);
  const {users, usersLookup, organizationsLookup} = useSelector(state => state.user);
  const {groups, employees, totalEmployees, isEmployeesLoading} = useSelector((state) => state.bulkTesting);
  const selectedGroupId = route.params?.group ? route.params?.group.uuid : groups[0]?.uuid;
  const hasRoutines = 
    route.params?.group ? route.params.group?.routines?.data?.length > 0 : 
    groups[0]?.routines?.data?.length > 0;
  const userType = organizationsLookup?.[usersLookup[users[0]]?.organizations[0]?.uuid]?.meta?.orgMetaData?.translations?.en?.userNoun;

  useEffect(() => {
    dispatch(getGroups());
  }, []);

  useEffect(()=> {
    if(selectedGroupId) {
      setSearchQuery('');
      getEmployeeList(selectedTab || 'incomplete', true);
    }
  }, [selectedGroupId]);

  const getEmployeeList = (type, isFirstPage) => {
    dispatch(
      getEmployees({
        groupId: selectedGroupId, 
        type, 
        searchQuery: '', 
        isFirstPage,
        hasRoutines,
        translations: t,
      })
    );
  };

  const onSearch = (searchKey) => {
    promise?.current?.abort();
    promise.current = dispatch(getEmployees({
      groupId: selectedGroupId,
      type: selectedTab,
      searchQuery: searchKey,
      isFirstPage: true,
      hasRoutines,
      translations: t,
    }));
    setSearchQuery(searchKey);
  };

  const onItemPress = (employee) => {
    navigation.navigate('EmployeeDetail', { 
      employee, 
      groupId: selectedGroupId, 
      selectedTab,
      hasRoutines,
    });
    onSearch('');
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.screen}>
      {showToast && (
        <SuccessToast onPress={() => dispatch(hideToast())}/>
      )}
      <Text style={styles.headerTitle}>
        {t('bulkTesting.employees.title')}
      </Text>
      <Pressable 
        style={styles.groupToggle}
        onPress={() => groups.length > 1 && navigation.navigate('Groups')}>
        <Text style={styles.groupName}>
          {route.params?.group ? route.params?.group.name : groups[0]?.name}
        </Text>
        {groups.length > 1 && <ArrowDown width={10} height={10} color={colors.greyDark}/>}
      </Pressable>
      <View style={styles.searchContainer}>
        <Search height={35} width={35} />
        <TextInput
          value={searchQuery}
          style={styles.searchInput}
          placeholder={t('bulkTesting.employees.searchPlaceholder', {userType: userType?.key_other})}
          onChangeText={onSearch}
        />
        {searchQuery.length > 0 && (
          <Pressable 
            style={styles.closeSvg}
            onPress={() => {
              Keyboard.dismiss();
              onSearch('');
            }}>
            <CloseSvg height={12} width={12} color={colors.primaryBlue}/>
          </Pressable>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          onSearch('');
          navigation.navigate('AddEmployee', {selectedGroupId, selectedTab, hasRoutines})
        }}
      >
        <Text style={styles.addEmployee}>
          {t('bulkTesting.employees.addEmployee', {userType: userType?.key_one})}
        </Text>
      </TouchableOpacity>
      {searchQuery.length === 0 && hasRoutines ? (
        <View style={styles.containerTabBar}>
          <TouchableOpacity
            style={
              selectedTab === 'incomplete' ? 
                styles.containerTabActive : styles.containerTabInactive
            }
            onPress={() => {
              if(selectedTab !== 'incomplete') {
                getEmployeeList('incomplete', true);
              }
              setSelectedTab('incomplete');
            }}
          >
            <Text
              style={
                selectedTab === 'incomplete' ? 
                  styles.textTabActive : styles.textTabInactive
              }
            >
              {t('bulkTesting.employees.incomplete')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              selectedTab === 'complete' ? 
                styles.containerTabActive : styles.containerTabInactive
            }
            onPress={() => {
              if(selectedTab === 'incomplete') {
                getEmployeeList('complete', true);
              }
              setSelectedTab('complete');
            }}
          >
            <Text
              style={
                selectedTab === 'complete' ? 
                  styles.textTabActive : styles.textTabInactive
              }
            >
              {t('bulkTesting.employees.complete')}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {!isEmployeesLoading && (
        <FlatList 
          data={employees[selectedGroupId]}
          keyExtractor={(item) => item.uuid}
          renderItem={({item}) => 
            <EmployeeItem data={item} onPress={() => onItemPress(item)} />
          }
          onEndReached={ () =>
            employees[selectedGroupId]?.length < totalEmployees && getEmployeeList(selectedTab, false)
          }
          onEndReachedThreshold ={0.1}
          ListFooterComponent={
            employees[selectedGroupId]?.length < totalEmployees && 
            <ActivityIndicator color={colors.primaryBlue}/>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Employees;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 22,
  },
  headerTitle: {
    fontFamily: 'Museo_700',
    fontSize: 32,
  },
  groupToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  groupName: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    color: colors.greyDark,
    marginRight: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    padding: 5,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.greyLight,
    backgroundColor: colors.greyWhite,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Museo_500',
    fontSize: 18,
    color: colors.greyDark2,
  },
  addEmployee: {
    fontFamily: 'Museo_700',
    fontSize: 18,
    color: colors.primaryBlue,
    marginTop: 16,
    marginBottom: 16,
  },
  containerTabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: colors.primaryPavement,
  },
  containerTabActive: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.greyWhite,
    elevation: 5,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowColor: colors.greyGrey,
  },
  textTabActive: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    color: colors.primaryBlue,
  },
  containerTabInactive: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textTabInactive: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    color: colors.greyGrey,
  },
  closeSvg: {
    marginRight: 10,
  }
});
