import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NIHReporting from './NIHReporting';
import NIHLearn from './NIHLearn';
import ReportResult from './ReportResult';

const Stack = createStackNavigator();

const NIHStack = (props) => (
  <Stack.Navigator
    initialRouteName={NIHReporting}
    initialParams={props}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      key='NIHReporting'
      name='NIHReporting'
      component={NIHReporting}
      initialParams={props}
    />
    <Stack.Screen key='NIHLearn' name='NIHLearn' component={NIHLearn} initialParams={props} />
    <Stack.Screen
      key='ReportResult'
      name='ReportResult'
      component={ReportResult}
      initialParams={props}
    />
  </Stack.Navigator>
);

export default NIHStack;
