import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Just template of fallback screen
// not considered for web view
const Fallback = ({ errorInfo }) => (
  <SafeAreaProvider>
    <ScrollView>
      <View>
        <Text>There was an error in loading this page. </Text>
        <Text>{errorInfo && errorInfo.componentStack.toString()}</Text>
      </View>
    </ScrollView>
  </SafeAreaProvider>
);

export default Fallback;
