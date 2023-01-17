import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import TemplateContainer from './templateContainer';
import LoaderComp from '../LoaderComp';

const ModularTestFlow = ({ route }) => {
  const isTemplatesLoading = useSelector((state) => state.modularTestFlow.isTemplatesLoading);
  const templates = useSelector((state) => state.modularTestFlow.templates);
  const hasTemplates = Object.keys(templates).length > 0;
  const { navigateExit } = route.params;

  console.log(route);
  if (hasTemplates) {
    return <TemplateContainer navigateExit={navigateExit} />;
  }

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.screen}>
      {isTemplatesLoading && <LoaderComp />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default ModularTestFlow;
