import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Linking from 'expo-linking';
import { useTranslation } from 'react-i18next';
import HeaderComp from '../../components/HeaderComp';
import RoundButton from '../../components/Buttons/RoundButton';
import CloseIcon from '../../components/Svg/close';
import RowButton from '../../components/RowButton';
import { colors } from '../../theme/index';
import { DEEPLINK_SCHEME } from '../../utilis/axios';
import { openLink } from '../../utilis/link';

const { width } = Dimensions.get('window');

const CareItem = ({ navigation, route }) => {
  const {
    params: { subdata, others, title, onClickOtherService },
  } = route;
  const { t } = useTranslation();

  const handleClose = () => {
    navigation.navigate('Home');
  };

  const goBack = () => {
    navigation.goBack();
  };

  const onClickSubcategory = (item) => {
    const { subtype, url } = item;
    switch (subtype) {
      case 'deeplink':
        return Linking.openURL(`${DEEPLINK_SCHEME}://${url}`);
      case 'webview':
        return openLink(navigation, false, { url, useWebView: true });
      case 'link':
        return openLink(navigation, true, { url, useWebView: false });
      default:
        return null;
    }
  };

  const onClickOther = (item) => {
    navigation.goBack();
    onClickOtherService(item);
  };

  const renderSubCategories = () => (
    <View style={styles.subcategorContainer}>
      {subdata &&
        subdata.map((item) => (
          <RowButton
            style={{
              marginTop: 16,
            }}
            title={item.title}
            icon={<Image source={{ uri: item.icon }} style={{ width: 24, height: 24 }} />}
            onClick={() => onClickSubcategory(item)}
          />
        ))}
    </View>
  );

  const getButtonWidth = () => {
    if (width < 340) {
      return (width - 70) / 2;
    }
    return (width - 80) / 3;
  };

  const renderOtherServices = () => (
    <View style={styles.othersContainer}>
      <Text style={styles.subheaderTitle}>{t('careSolutions.list.otherServices')}</Text>
      <View style={styles.row}>
        {others &&
          others.map((item) => (
            <RoundButton
              key={item.id}
              style={{
                backgroundColor: colors.primaryPavement,
                padding: 20,
                borderRadius: 16,
                marginHorizontal: 5,
                marginBottom: 16,
                width: getButtonWidth(),
                height: 80,
              }}
              title={item.title}
              action={() => onClickOther(item)}
            />
          ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={{ flex: 1, backgroundColor: colors.greyWhite }}
    >
      <HeaderComp
        center={[title, styles.headerTitle]}
        right={[<CloseIcon width={14} height={14} />, handleClose]}
        onLeftClick={goBack}
        left='arrow'
        addStyle={styles.header}
      />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps='handled'
        scrollEventThrottle={5}
      >
        <View style={styles.content}>
          {renderSubCategories()}
          {renderOtherServices()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CareItem;

const styles = StyleSheet.create({
  header: {
    paddingTop: 8,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Museo_700',
    lineHeight: 19,
    color: colors.greyDark2,
  },
  scrollContainer: { flex: 1 },
  scrollContentContainer: { flexGrow: 1 },
  content: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 24,
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    flexWrap: 'wrap',
  },
  subcategorContainer: {},
  subheaderTitle: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
    color: colors.greyMed,
  },
  othersContainer: {
    marginTop: 24,
  },
});
