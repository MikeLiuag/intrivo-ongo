/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import LogoSvg from '../assets/logo';
import { colors } from '../theme';
import BurgerMenu from './Svg/WebSvgs/BurgerMenu';
import TimelineIcon from './Svg/TabTimelineIcon';
import WalletIcon from './Svg/TabWalletIcon';
import ProfileIcons from './Svg/TabProfileIcon';
import CloseBtnSvg from './Svg/WebSvgs/CloseBtnSvg';
import SelectorComponent from './SelectorComponent';

import UploadVaccineCircle from './Svg/uploadvaccinecircle';
import CoronaIcon from './Svg/coronaIcon';
import ShopCartIcon from './Svg/shopCart';
import { falseBioSetting, logoutUser } from '../store/app/slice';
import { customPlatform } from '../utilis/scaling';
import { openLink } from '../utilis/link';
// import { horizontalScale as hS } from '../../utilis/scaling';

const icons = [
  // { comp: HomeIcon, nav: 'Home', title: 'Home' },
  { comp: TimelineIcon, nav: 'Timeline', title: 'Timeline' },
  { comp: WalletIcon, nav: 'Wallet', title: 'Passport' },
  { comp: ProfileIcons, nav: 'ProfileList', title: 'Profile' },
];

export default ({ children: Comp, navigation, isOpen, onOpen, isMobile, screen, ...props }) => {
  const windowHeight = useWindowDimensions().height;
  const { shopLink, hideTopNavBar } = useSelector((s) => s.app);
  const isAuthed = useSelector((state) => state.app?.isAuthed) ?? null;
  const { usersLookup, users } = useSelector((state) => state.user) || {};
  const dispatch = useDispatch();
  console.log(screen, hideTopNavBar);

  const userDoneInfo = usersLookup?.[users[0]]?.dob;

  useEffect(() => {
    if (!isAuthed) {
      onOpen(false);
    }
  }, [isAuthed, onOpen]);

  const hideContent = !(isMobile && isOpen) || !isMobile;

  const onNav = (nav, navprops) => {
    onOpen(false);
    navigation.navigate(nav, navprops);
  };
  return (
    <View style={{ width: '100%', height: '100%' }}>
      {screen !== 'LandingScreen' && screen !== 'LoginScreen' && !hideTopNavBar && (
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            height: 72,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          {isAuthed && userDoneInfo && (
            <View style={{ width: '33%' }}>
              <TouchableOpacity style={{ marginLeft: 38 }} onPress={() => onOpen(!isOpen)}>
                {!isOpen ? <BurgerMenu /> : <CloseBtnSvg />}
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              width: '33%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (isAuthed) onNav('Dashboard');
              }}
            >
              <LogoSvg width={108} height={34} />
            </TouchableOpacity>
          </View>
          {isAuthed && userDoneInfo && (
            <View style={{ width: '33%' }}>
              <View
                style={{
                  marginLeft: 'auto',
                  flexDirection: 'row',
                  paddingRight: 28,
                }}
              >
                {icons.map(({ comp: Item, nav }) => (
                  <TouchableOpacity key={nav} style={{ marginLeft: 18 }} onPress={() => onNav(nav)}>
                    <Item color={colors.primaryBlue} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          height: '100%',
          maxHeight: !hideTopNavBar && windowHeight,
          width: '100%',
        }}
      >
        {isOpen && (
          <View
            style={{
              width: isMobile ? '100%' : 407,
              height: '100%',
              backgroundColor: 'white',
              // position: 'absolute',
              paddingHorizontal: 40,
              paddingTop: 28,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              {icons.map(({ comp: Item, nav, title }) => (
                <TouchableOpacity
                  key={nav}
                  style={{
                    backgroundColor: colors.primaryGhost,
                    paddingHorizontal: 16,
                    paddingTop: 13,
                    paddingBottom: 19,
                    borderRadius: 16,
                    alignItems: 'center',
                    width: `${
                      100 / icons.length -
                      9 / icons.length - // 18 margins
                      1
                    }%`,
                  }}
                  onPress={() => onNav(nav)}
                >
                  <Item color={colors.primaryBlue} />
                  <Text
                    style={{
                      marginTop: 13,
                      fontFamily: 'Museo_500',
                      fontSize: 16,
                      color: colors.greyDark2,
                    }}
                  >
                    {title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: colors.greyExtraLight,
                marginVertical: 22,
              }}
            />
            <SelectorComponent
              arrow={false}
              style={{ paddingLeft: 24, fontSize: 14 }}
              data={[
                {
                  title: 'COVID-19 Self-Test',
                  icon: <CoronaIcon color='#ffffff' />,
                  onClick: () => {
                    onNav('Intrivo');
                  },
                },
                {
                  title: 'Upload vaccine card',
                  icon: <UploadVaccineCircle color='#ffffff' />,
                  onClick: () => {
                    onNav('VaccineEdit', {
                      slideFromBottom: true,
                    });
                  },
                },
                // { // archived
                //   title: 'TeleHealth',
                //   icon: <UploadVaccineCircle color='#ffffff' />,
                //   onClick: () => {
                //     onNav('TeleHealth');
                //   },
                // },
              ]}
            />
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: colors.greyExtraLight,
                marginVertical: 22,
              }}
            />
            <SelectorComponent
              arrow={false}
              style={{ paddingLeft: 24, fontSize: 14 }}
              data={[
                {
                  title: 'Purchase tests',
                  icon: <ShopCartIcon color='#ffffff' />,
                  onClick: () => {
                    openLink(navigation, true, { url: shopLink, useWebView: false });
                  },
                },
              ]}
            />
            <View style={{ alignItems: 'center', marginTop: 30 }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(falseBioSetting());
                  dispatch(logoutUser());
                }}
              >
                <Text
                  style={{
                    color: colors.primaryBlue,
                    fontSize: 14,
                    fontFamily: 'Museo_700',
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginTop: 30 }}
                onPress={() =>
                  openLink(navigation, false, {
                    url: 'https://www.intrivo.com/privacy-policy',
                    useWebView: false,
                  })
                }
              >
                <Text
                  style={{
                    color: colors.greyGrey,
                    fontSize: 14,
                    fontFamily: 'Museo_700',
                  }}
                >
                  Privacy policy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {hideContent && (
          <View
            style={{
              maxHeight: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              // maxWidth: '100%',
              backgroundColor: colors.primaryGhost,
              paddingVertical: !isMobile ? 36 : 0,
            }}
          >
            <View
              style={{
                width: '100%',
                maxWidth: 480,
                paddingVertical: 20,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <View style={styles.contentContainer}>
                <Comp {...props} navigation={navigation} isMobile={isMobile} />
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
    // : <></>
    // <></>
  );
};

const generalStyles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    maxHeight: '100%',
    overflow: 'hidden',
    width: '100%',
  },
});

const mobileStyles = StyleSheet.create({
  contentContainer: {
    minHeight: Dimensions.get('window').height * 0.5,
  },
});

const desktopStyles = StyleSheet.create({
  contentContainer: {
    minHeight: 500,
  },
});

const styles = customPlatform((type, returnStyle) => {
  switch (type) {
    case 'web':
      return returnStyle(generalStyles, desktopStyles);
    case 'web-mobile':
      return returnStyle(generalStyles, mobileStyles);
    default:
      return returnStyle(generalStyles);
  }
});
