import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { Icon, Tooltip } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { LogEvent } from '../../../analytics';
import HeaderComp from '../../../components/HeaderComp';
import { BlueButton } from '../../../components/Buttons/BlueButton';
import { getSolutions } from '../../../store/sniffles/slice';
import { colors } from '../../../theme';
import { fonts } from '../../../theme/fonts';
import { DEEPLINK_SCHEME } from '../../../utilis/axios';
import { openLink } from '../../../utilis/link';

const translationPath = 'screens.sniffles.solutions';

const TOOLTIP_WIDTH = 160;
const TOOLTIP_HEIGHT = 100;

const IntroToSolutions = () => {
  const { solutions } = useSelector((state) => state.sniffles);

  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const flowName = route.params.flow;

  useEffect(() => {
    LogEvent(`Sniffles_Quiz${flowName}_Menu_screen`);
  }, [dispatch, flowName]);

  useFocusEffect(
    useCallback(() => {
      dispatch(
        getSolutions({
          type: flowName === 'A' ? 'sniffles_assessment_a' : 'sniffles_assessment_b',
        })
      );
    }, [dispatch, flowName])
  );

  const onBackPress = () => {
    LogEvent(`Sniffles_Quiz${flowName}_Menu_click_Back`);
    navigation.goBack();
  };

  const onClosePress = () => {
    LogEvent(`Sniffles_Quiz${flowName}_Menu_click_Close`);
    navigation.navigate('Home');
  };

  const onItemPress = (item) => {
    let itemType = 'Treat';
    if (item.title === 'Get medical evaluation for Flu/Step') {
      itemType = 'Treat';
    } else if (item.title === 'Get seen by a medical expert') {
      itemType = 'Virtual';
    } else if (item.title === 'Test for Flu, Step, and RSV') {
      itemType = 'Get over the counter treatment';
    } else if (item.title === 'Get over the counter treatment') {
      itemType = 'POC';
    } else if (item.title === 'Schedule vaccines') {
      itemType = 'Vaccine';
    } else if (item.title === 'Buy products, including tests') {
      itemType = 'Buy';
    }
    LogEvent(`Sniffles_Quiz${flowName}_Menu_click_${itemType}`);
    if (item.subtype === 'deeplink') {
      Linking.openURL(`${DEEPLINK_SCHEME}://${item.url}`);
    } else if (item.subtype === 'webview') {
      openLink(navigation, false, { url: item.url, useWebView: true });
    } else if (item.subtype === 'link') {
      openLink(navigation, false, { url: item.url, useWebView: false });
    }
  };

  const formatPrice = (price) => {
    const bracketIndex = (price || '').indexOf('(');
    const formatedPrice = bracketIndex !== -1 ? price.slice(0, bracketIndex) : price;
    const formatedDiscount = bracketIndex !== -1 ? price.slice(bracketIndex) : null;

    return (
      <Text style={styles.price}>
        {formatedPrice}
        {formatedDiscount && <Text style={styles.code}>{formatedDiscount}</Text>}
      </Text>
    );
  };

  if (!solutions) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComp
        left={flowName === 'b' && 'arrow'}
        onLeftClick={onBackPress}
        right={['x', onClosePress]}
        addStyle={styles.header}
      />
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.subtitle}>{t(`${translationPath}.title`)}</Text>
          <Tooltip
            withOverlay={false}
            backgroundColor={colors.greyDark2}
            containerStyle={{ borderRadius: 0 }}
            popover={<Text style={styles.tooltipText}>{t(`${translationPath}.tooltip`)}</Text>}
            height={TOOLTIP_HEIGHT}
            width={TOOLTIP_WIDTH}
          >
            <Icon type='MaterialIcons' name='info' size={24} color={colors.primaryBlue} />
          </Tooltip>
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={solutions}
          key={(item) => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.actionContainer} onPress={() => onItemPress(item)}>
              <View style={styles.iconContainer}>
                <Image source={{ uri: item.icon }} resizeMode='center' style={styles.icon} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                {item.subtitle && <Text style={styles.text}>{item.subtitle}</Text>}
                {formatPrice(item.description)}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default IntroToSolutions;

const styles = StyleSheet.create({
  header: {
    paddingRight: 24,
    paddingLeft: 12,
    paddingTop: 12,
  },
  container: {
    flex: 1,
  },
  subtitle: {
    fontFamily: fonts.familyBold,
    fontSize: 24,
    textAlign: 'left',
  },
  actionContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    marginVertical: 8,
    marginHorizontal: 24,
    borderRadius: 16,
    borderColor: colors.greyExtraLight,
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.primaryPavement,
    borderRadius: 8,
    height: 40,
    width: 40,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 16,
  },
  title: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    lineHeight: 21,
    color: colors.greyMidnight,
  },
  text: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeSmall,
    lineHeight: 18,
    color: colors.greyGrey,
  },
  code: {
    fontFamily: fonts.familyLight,
    fontSize: fonts.sizeSmall,
    color: colors.greyGrey,
  },
  price: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeSmall,
    color: colors.statusGreen,
  },
  infoContainer: {
    paddingHorizontal: 24,
    marginVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    fontFamily: fonts.familyLight,
    fontSize: fonts.sizeSmall,
    lineHeight: 18,
    color: colors.greyMed,
    marginLeft: 10,
  },
  tooltipText: {
    fontFamily: fonts.familyNormal,
    color: colors.greyWhite,
    fontSize: fonts.sizeSmall,
    textAlign: 'center',
  },
});
