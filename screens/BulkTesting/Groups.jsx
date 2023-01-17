import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import GroupItem from '../../components/BulkTesting/GroupItem';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComp from '../../components/HeaderComp';
import CloseIcon from '../../components/Svg/close';
import LoaderComp from '../../components/LoaderComp';
import { getGroups } from '../../store/bulkTesting/slice';

const Groups = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const groups = useSelector((state) => state.bulkTesting.groups);

  useEffect(() => {
    dispatch(getGroups());
  }, [])

  const onItemPress = (item) => {
    navigation.navigate('Employees', {group: item});
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.screen}>
      <HeaderComp
        center={[t('bulkTesting.groups.title'), styles.headerTitle]}
        right={[<CloseIcon width={14} height={14} />, () => navigation.goBack()]}
      />
      <FlatList 
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => 
          <GroupItem data={item} onPress={() => onItemPress(item)} />                  
        }
      />
    </SafeAreaView>
  );
};

export default Groups;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  headerTitle: {
    fontFamily: 'Museo_500',
    fontSize: 16,
  },
});
