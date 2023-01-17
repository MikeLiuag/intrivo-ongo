import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { colors } from '../../theme';
import HeaderComp from '../../components/HeaderComp';
import SelectorComponent from '../../components/SelectorComponent';
import Icon from '../../components/Icon';
import { LogEvent } from '../../analytics';

const CarePlanSelector = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { showSniffles, showLongCovids } = useSelector((state) => state.user);

  useEffect(() => {
    LogEvent('ProfileCarePlanSelector_screen');
  }, []);

  const goBack = () => {
    LogEvent('ProfileCarePlanSelector_click_Back');
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.conitaner}>
      <HeaderComp
        center={[t('profile.carePlanSelector.headerTitle'), styles.headerTitle]}
        addStyle={styles.header}
        left='arrow'
        onLeftClick={goBack}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ paddingTop: 24, paddingHorizontal: 24 }}>
          <SelectorComponent
            style={{ paddingLeft: 24, fontSize: 14 }}
            type='inAll'
            data={[
              {
                title: t('profile.carePlanSelector.longCovid'),
                icon: <Icon type='MaterialIcons' name='coronavirus' size={24} isGradient />,
                onClick: () => {
                  LogEvent(`CareplanSelector_click_LongCOVID`);
                  navigation.navigate('CarePlan', {
                    purpose: 'long_covid',
                  });
                },
                hidden: !showLongCovids,
              },
              {
                title: t('profile.carePlanSelector.sniffles'),
                icon: <Icon type='MaterialIcons' name='coronavirus' size={24} isGradient />,
                onClick: () => {
                  LogEvent(`CareplanSelector_click_Sniffles`);
                  navigation.navigate('CarePlan', {
                    purpose: 'sniffles',
                  });
                },
                hidden: !showSniffles,
              },
            ]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conitaner: {
    flex: 1,
    backgroundColor: colors.primaryGhost,
  },
  header: {
    paddingTop: 24,
    paddingRight: 24,
    paddingBottom: 12,
    paddingLeft: 24,
  },
  headerTitle: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Museo_700',
  },
});

export default CarePlanSelector;
