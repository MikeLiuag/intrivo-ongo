import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CompletedScreen from '../../CompletedScreen';

const TestCompleteV1 = ({ onAction }) => {
  const [isModal, setModal] = useState({ visible: true, result: 0 });
  return (
    <View style={styles.container}>
      {isModal.visible && (
        <CompletedScreen
          visible={isModal.visible}
          result={isModal.result}
          animated
          setModal={() => onAction()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TestCompleteV1;
