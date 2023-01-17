import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../theme';
import { LogEvent } from '../analytics';
import { setDeepLink } from '../store/app/slice';
import HomeSvg from './Svg/tabbar/HomeSvg';
import HomeActiveSvg from './Svg/tabbar/HomeActiveSvg';
import TimelineSvg from './Svg/tabbar/TimelineSvg';
import TimelineActiveSvg from './Svg/tabbar/TimelineActiveSvg';
import CareSvg from './Svg/tabbar/CareSvg';
import CareActiveSvg from './Svg/tabbar/CareActiveSvg';
import ShopingSvg from './Svg/tabbar/ShopingSvg';

const MARGIN_HORIZONTAL = 24;

function TabBar({ state, navigation }) {
  const { to: DeepLinkTo, toParams } = useSelector((s) => s.app.deepLink);
  const dispatch = useDispatch();

  const [barState, setBarState] = useState({
    0: true,
    1: false,
    2: false,
    3: false,
  });

  useEffect(() => {
    setBarState({
      [state.index]: true,
    });
  }, [state.index]);

  useEffect(() => {
    if (DeepLinkTo) {
      navigation.navigate(DeepLinkTo, toParams);
    }
    return () => dispatch(setDeepLink({ to: null, toParams: null }));
  }, [DeepLinkTo, dispatch, navigation, toParams]);

  const onPress = (route, index) => {
    if (!barState[index]) {
      navigation.navigate(route);
    }
    if (route === 'Home') {
      navigation.reset({
        routes: [{ name: 'Home' }],
        routeNames: ['Home'],
      });
    }
    LogEvent(route, 'TabBar');
  };

  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        accessibilityRole='button'
        onPress={() => onPress('Home', 0)}
        style={[
          styles.tabBarBtn,
          { backgroundColor: barState[0] ? 'rgba(255,255,255,0.1)' : colors.primaryBlue },
        ]}
        hitSlop={{ left: 10, right: 10 }}
      >
        {barState[0] ? <HomeActiveSvg /> : <HomeSvg />}
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole='button'
        onPress={() => onPress('Timeline', 1)}
        style={[
          styles.tabBarBtn,
          { backgroundColor: barState[1] ? 'rgba(255,255,255,0.1)' : colors.primaryBlue },
        ]}
        hitSlop={{ left: 10, right: 10 }}
      >
        {barState[1] ? <TimelineActiveSvg /> : <TimelineSvg />}
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole='button'
        onPress={() => onPress('CareList', 2)}
        style={[
          styles.tabBarBtn,
          { backgroundColor: barState[2] ? 'rgba(255,255,255,0.1)' : colors.primaryBlue },
        ]}
        hitSlop={{ left: 10, right: 10 }}
      >
        {barState[2] ? <CareActiveSvg /> : <CareSvg />}
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole='button'
        onPress={() => onPress('TestingDetails', 3)}
        style={[
          styles.tabBarBtn,
          { backgroundColor: barState[3] ? 'rgba(255,255,255,0.2)' : colors.primaryBlue },
        ]}
        hitSlop={{ left: 10, right: 10 }}
      >
        <ShopingSvg />
      </TouchableOpacity>
    </View>
  );
}

export default TabBar;

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  tabBar: {
    position: 'absolute',
    bottom: hp('2.5%'),
    width: wp('100%') - MARGIN_HORIZONTAL * 2,
    flexDirection: 'row',
    backgroundColor: colors.primaryBlue,
    paddingHorizontal: 24,
    height: hp('8%'),
    marginHorizontal: MARGIN_HORIZONTAL,
    borderRadius: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabBarBtn: {
    height: 48,
    width: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
