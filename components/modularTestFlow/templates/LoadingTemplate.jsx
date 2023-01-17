import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingTemplate = ({ onAction = () => null }) => {
  useEffect(() => onAction(), [onAction]);

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default LoadingTemplate;
