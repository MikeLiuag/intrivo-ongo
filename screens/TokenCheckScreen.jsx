import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRemoteConfigsAndGetPersistedData } from '../store/app/slice';

import LoaderComp from '../components/LoaderComp';

// display the loader while the app sets up
//  get data that is persisted (token) and check if valid
export default () => {
  const dispatch = useDispatch();

  const minimumVersion = useSelector((s) => s.app.minimumVersion);

  useEffect(() => {
    dispatch(fetchRemoteConfigsAndGetPersistedData());
  }, [dispatch]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LoaderComp />
    </View>
  );
};
