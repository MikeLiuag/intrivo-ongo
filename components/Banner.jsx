import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Pressable, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { LogEvent } from '../analytics';
import { colors } from '../theme';
import CalendarIcon from './Svg/calendarIcon';
import CloseSvg from './Svg/close';
import { fonts } from '../theme/fonts';
import { DEEPLINK_SCHEME } from '../utilis/axios';
import { openLink } from '../utilis/link';

const Banner = ({ banner, close, show }) => {
  const navigation = useNavigation();
  const getListAction = (refItem) => {
    const url = refItem?.url || banner?.reference?.url;
    const type = refItem?.type || banner?.reference.type;

    LogEvent('Home_click_Banner_More', banner?.title);
    switch (type) {
      case 'link':
        return openLink(navigation, true, {
          url,
          useWebView: false,
        });
      case 'webview':
        return openLink(navigation, false, {
          url,
          useWebView: true,
        });
      case 'deeplink':
        return Linking.openURL(`${DEEPLINK_SCHEME}://${url}`);
      default:
        return null;
    }
  };

  const getContainerStyle = () => {
    switch (banner?.style) {
      case 'warn':
        return styles.testContainer;
      case 'sniffles_observation':
        return styles.appointmentContainer;
      default:
        return styles.container;
    }
  };

  const getBtns = () => {
    switch (banner?.style) {
      case 'sniffles_observation':
        return (
          <View style={styles.btnsWrapper}>
            {banner?.reference.map((item) => {
              if (item.style === 'button')
                return (
                  <TouchableOpacity style={styles.btnContainer} key={item.caption}>
                    <Text style={styles.btnText}>{item.caption}</Text>
                  </TouchableOpacity>
                );
              return (
                <Text
                  key={item.caption}
                  onPress={() => getListAction(item)}
                  style={[styles?.learnMore, styles.verticalMargin]}
                >
                  {item.caption}
                </Text>
              );
            })}
          </View>
        );
      default:
        return (
          <Text onPress={() => getListAction()} style={styles?.learnMore}>
            {banner?.reference?.caption}
          </Text>
        );
    }
  };

  const getIcon = () => {
    switch (banner?.style) {
      case 'sniffles_observation': {
        return (
          <View style={styles.iconWrapper}>
            <CalendarIcon width={20} height={20} color='#333333' />
          </View>
        );
      }
      default:
        return null;
    }
  };

  return show ? (
    <View style={[styles.container, getContainerStyle()]}>
      {getIcon()}
      <View style={styles.contentContainer}>
        <View style={styles.colums}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{banner?.title}</Text>
            <Text style={styles.subtitle}>{banner?.description}</Text>
            {getBtns()}
          </View>
          <Pressable style={styles.closeContainer} onPress={() => close(banner?.id)}>
            <CloseSvg width={14} height={14} />
          </Pressable>
        </View>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: 20,
    backgroundColor: 'rgba(125,203,242, 0.2)',
    borderColor: colors.primaryLightBlue,
    borderWidth: 1,
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: 'row',
  },
  btnContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: colors.secondaryButtonBorder,
    borderRadius: 14,
    backgroundColor: colors.white,
  },
  btnText: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
    color: colors.greyDark2,
  },
  verticalMargin: { marginBottom: 5 },
  contentContainer: { flex: 1 },
  iconWrapper: {
    marginRight: 10,
  },
  testContainer: {
    backgroundColor: 'rgba(240, 186, 169, 0.2)',
    borderColor: colors.primaryPeach,
  },
  appointmentContainer: {
    backgroundColor: 'rgba(246, 195, 76, 0.2)', // as design there is HEX with 20% opacity
    borderColor: colors.primaryPeach,
    borderWidth: 0,
    paddingHorizontal: 16,
  },
  btnsWrapper: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 16,
  },
  colums: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
  },
  closeContainer: {
    marginTop: 5,
  },
  title: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
  },
  subtitle: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 16,
    marginVertical: 7,
  },
  learnMore: {
    color: colors.primaryBlue,
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
  },
});

export default Banner;
