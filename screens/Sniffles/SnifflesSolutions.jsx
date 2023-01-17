import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlueButton } from '../../components/Buttons/BlueButton';
import HeaderComp from '../../components/HeaderComp';
import ActionListV1 from '../../components/modularTestFlow/templates/ActionListV1';
import CloseIcon from '../../components/Svg/close';

const harcodedArgs = [
  {
    icon: 'https://assets.intrivo.com/sniffle_assessment/talk_to_provider%403x.png',
    id: '00002179-2cb7-4865-9d1f-de5a875c8d26',
    text: 'I have questions',
    title: 'Talk to a provider',
  },
  {
    icon: 'https://assets.intrivo.com/sniffle_assessment/testing%403x.png',
    id: '0000a8c9-319d-4c2e-9c44-0bdbcc2a4a9c',
    text: 'from your home',
    title: 'Testing and treatment',
  },
  {
    icon: 'https://assets.intrivo.com/sniffle_assessment/treatment%403x.png',
    id: '0000097e-66c4-456d-8037-c3fc4669658b',
    text: 'delivered to your home',
    title: 'Something for my symptoms',
  },
];

const SnifflesSolutions = () => {
  const navigation = useNavigation();
  const [selectedAction, setSelectedAction] = useState(null);
  const handleClose = () => {
    navigation.pop(2);
  };
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView edges={['right', 'top', 'left', 'bottom']} style={styles.screen}>
      <HeaderComp
        left='arrow'
        onLeftClick={handleBack}
        right={[<CloseIcon width={14} height={14} />, handleClose]}
        addStyle={styles.header}
      />
      <ActionListV1
        args={{
          actions: harcodedArgs,
          title: 'How can we help? ',
        }}
        onAction={setSelectedAction}
      />
      <BlueButton
        title='Submit'
        action={() => navigation.navigate('SnifflesResult')}
        style={styles.button}
        disabled={!selectedAction}
      />
    </SafeAreaView>
  );
};

export default SnifflesSolutions;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 5,
  },
  button: {
    marginHorizontal: 24,
  },
});
