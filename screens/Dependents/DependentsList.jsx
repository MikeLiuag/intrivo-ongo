import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';
import { colors } from '../../theme';
import HeaderComp from '../../components/HeaderComp';
import { LogEvent } from '../../analytics';
import PlusIcon from '../../components/Svg/addPlusIcon';
import SelectorComponent from '../../components/SelectorComponent';
import useIsFloatingKeyboard from '../../utilis/keyboard';
import Icon from '../../components/Icon';

export default ({
  route,
  header: headerFromProps,
  headerLeft: headerLeftFromProps,
  headerRight: headerRightFromProps,
  title: titleFromProps,
  includeSelf: includeSelfFromProps,
  hideArrows: hideArrowsFromProps,
  onSelectUser,
  addNewStyle: addNewStyleFromProps,
  testName,
  from,
  disabledUsers
}) => {
  const navigation = useNavigation();
  const logEventType = from ? from : 'ProfileDependents';
  const {t} = useTranslation();

  useEffect(() => {
    if(addNewStyle === header) LogEvent('ProfileDependents_screen');
  },[])

  const header =
    headerFromProps !== undefined
      ? headerFromProps
      : route?.params?.header ?? t('profile.list.depend');
  const slideFromBottom = route?.params?.slideFromBottom ?? false;
  const addNewStyle =
    addNewStyleFromProps || route?.params?.addNewStyleFromProps || 'header';

  // left component
  const headerLeftSelector = () => {
    if (headerLeftFromProps === null || route?.params?.headerLeft === null)
      return null;
    return headerLeftFromProps || route?.params?.headerLeft || slideFromBottom
      ? 'x'
      : 'arrow';
  };
  const headerLeft = headerLeftSelector();

  // right component
  const headerRightSelector = () => {
    if (headerRightFromProps !== undefined) return headerRightFromProps;
    if (route?.params?.headerRight !== undefined)
      return route.params.headerRight;
    return addNewStyle === 'header'
      ? [<PlusIcon />, () => {
        LogEvent(`${logEventType}_click_Add`)
        navigation.navigate('DependentEdit', {testName})
      }]
      : [];
  };
  const headerRight = headerRightSelector();

  const title = titleFromProps || route?.params?.title;
  const includeSelf =
    includeSelfFromProps || route?.params?.includeSelf || false;
  const hideArrows = hideArrowsFromProps || route?.params?.hideArrows || false;
  const navigateTo = route?.params?.navigateTo || 'DependentInfo';
  const propsToPass = route?.params?.propsToPass || {};

  // fix for keyboard
  const floating = useIsFloatingKeyboard();

  const { users, usersLookup } = useSelector((s) => s.user);

  // add the main user to the list to display
  const listToDisplay = Object.values(usersLookup).slice(includeSelf ? 0 : 1);

  const handleBlack = () => {
    LogEvent(`${logEventType}_click_Back`);
    navigation.goBack();
  }

  const getDisabledText = () => {
    if(from === 'InviteCode') {
      return 'Already part of organization';
    }
  }

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={{ flex: 1, backgroundColor: '#F8F8FC' }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          paddingBottom: hp('2%'),
          backgroundColor: '#F8F8FC',
        }}
        enabled={!floating}
      >
        <HeaderComp
          center={[header, styles.headerTitle]}
          right={headerRight}
          left={headerLeft}
          onLeftClick={handleBlack}
          addStyle={styles.profileHeader}
        />
        {title && <Text style={styles.title}>{title}</Text>}
        <LinearGradient
          colors={['#F8F8FC', '#F8F8FC']}
          start={{ x: 0, y: 0 }}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={{ marginTop: title ? 0 : 48 }}>
              <View style={{ marginHorizontal: 24 }}>
                <SelectorComponent
                  arrow={!hideArrows}
                  style={{
                    paddingLeft: 24,
                    fontSize: 14,
                    fontFamily: 'Museo_700',
                    backgroundColor: 'white',
                    borderColor: colors.greyExtraLight,
                    borderWidth: addNewStyle === 'list' ? 1 : 0,
                    borderBottomColor:
                      addNewStyle !== 'list' ? colors.greyExtraLight : null,
                  }}
                  type={addNewStyle === 'list' ? null : 'inAll'}
                  data={[
                    ...listToDisplay.map((item, index) => ({
                      profileColor: colors.primaryYellow,
                      isProfileCircle: true,
                      title: `${item.fullName}${
                        includeSelf && index === 0 ? ' (me)' : ''
                      }`,
                      icon: (
                        <View style={
                            disabledUsers?.includes(item.uuid)
                              ? styles.disabledIconBackground 
                              : styles.iconBackground
                        }>
                          <Text
                            allowFontScaling={false}
                            style={styles.iconText}
                          >
                            {item.first_name?.slice(0, 1) || ''}
                            {item.last_name?.slice(0, 1) || ''}
                          </Text>
                        </View>
                      ),
                      onClick: () => {
                        LogEvent(
                          `${logEventType}_click_User`,
                          index === 0 ? 'Self' : 'Dependent'
                        );
                        if (onSelectUser) onSelectUser(item.uuid);
                        else
                          navigation.navigate(navigateTo, {
                            uuid: item.uuid,
                            first_name: item.first_name,
                            ...propsToPass,
                          });
                      },
                      disabled: disabledUsers?.includes(item.uuid),
                      disabledText:  getDisabledText()
                    })),
                    {
                      hidden: addNewStyle !== 'list',
                      profileColor: colors.primaryPavement,
                      isProfileCircle: true,
                      title: t('screens.dependent.edit.add'),
                      icon: (
                        <Icon
                          type={'MaterialIcons'}
                          name={'add'}
                          size={24}
                          isGradient={true}
                        />
                      ),
                      onClick: () => {
                        LogEvent(`${logEventType}_click_Add`);
                        if(testName){
                          LogEvent(`Test-${testName}-ChooseUser_click_Add`)
                        }
                        navigation.navigate('DependentEdit', {testName})
                      },
                    },
                  ]}
                />
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'space-between',
  },
  iconText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  disabledIconBackground: {
    borderRadius: 50,
    backgroundColor: colors.greyLight,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBackground: {
    borderRadius: 50,
    backgroundColor: colors.primaryYellow,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight: wp('6.4%'),
  },
  profileRowFirst: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    marginRight: wp('6.4%'),
    marginLeft: wp('6.4%'),
    alignItems: 'center',
    paddingTop: 16,
    paddingLeft: 20,
    paddingBottom: 16,
    borderBottomColor: colors.greyExtraLight,
    borderBottomWidth: 1,
  },
  profileRowLast: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    marginRight: wp('6.4%'),
    marginLeft: wp('6.4%'),
    alignItems: 'center',
    paddingTop: 16,
    paddingLeft: 20,
    paddingBottom: 16,
  },
  profileRowMiddle: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginRight: wp('6.4%'),
    marginLeft: wp('6.4%'),
    alignItems: 'center',
    paddingTop: 16,
    paddingLeft: 20,
    paddingBottom: 16,
    borderBottomColor: colors.greyExtraLight,
    borderBottomWidth: 1,
  },
  profileRowOne: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginRight: wp('6.4%'),
    marginLeft: wp('6.4%'),
    alignItems: 'center',
    paddingTop: 16,
    paddingLeft: 20,
    paddingBottom: 16,
  },
  textSection: {
    width: wp('42%'),
    marginRight: wp('13%'),
  },
  profileText: {
    fontSize: 14,
    fontWeight: '700',
  },
  profileHeader: {
    paddingTop: hp('2.5%'),
    marginHorizontal: wp('6.4%'),
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Museo_700',
    lineHeight: 30,
  },
  title: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    alignSelf: 'center',
    lineHeight: 24,
    color: colors.greyDark,
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 41,
    marginTop: 8,
  },
});
