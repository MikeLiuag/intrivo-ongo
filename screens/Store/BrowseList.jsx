import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Alert } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComp from '../../components/HeaderComp';
import Icon from '../../components/Icon';
import { colors } from '../../theme';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { fetchProductList } from '../../store/ecommerce/slice';
import CloseIcon from '../../components/Svg/close';
import { LogEvent } from '../../analytics';

export default ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.ecommerce);
  const productList = useSelector((state) => state.ecommerce.productList);

  useEffect(() => {
    dispatch(fetchProductList());
    LogEvent('Plist_screen');
  }, []);

  const handleRightClick = () => {
    LogEvent('Plist_click_Close');
    Alert.alert(t('exitAlert.Title'), t('exitAlert.Text'), [
      {
        text: t('yesNo.Yes'),
        onPress: () => {
          navigation.navigate('Dashboard');
        },
      },
      {
        text: t('yesNo.No'),
        style: 'cancel',
      },
    ]);
  };

  function onRightIconClick() {
    LogEvent('Plist_click_CartIcon');
    navigation.navigate('Cart');
  }

  const handleGoBack = () => {
    LogEvent('Plist_click_Back');
    navigation.goBack();
  }

  function renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: Array.isArray(item?.image) ? item.image[0] : item.image,
          }}
          style={styles.productImage}
          resizeMode="contain"
        />
        <Text style={styles.testTextStyle}>{item.title}</Text>
        <Text style={styles.subTitle}>{item.subTitle}</Text>
        <Text style={styles.priceStyle}>${item.price}</Text>

        <BlueButton
          title={t('store.learn')}
          styleText={styles.cartButtonText}
          style={styles.buttonStyle}
          action={() => {
            LogEvent(`Plist_click_OnGoOne_More`)
            navigation.navigate('ProductInfo', { product: item.id });
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.container}>
      <HeaderComp
        center={[t('store.title'), styles.headerTitle]}
        left="arrow"
        onLeftClick={handleGoBack}
        addStyle={styles.header}
        right={[
          <View style={styles.imageBackground}>
            <Icon
              type="MaterialIcons"
              name="shopping-cart"
              size={24}
              isGradient
            />
            {cart?.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeCount}>{cart?.length}</Text>
              </View>
            )}
          </View>,
          onRightIconClick,
          styles.rightBtnStyle,
        ]}
        closeRight={[
          <CloseIcon width={14} height={14} />,
          handleRightClick,
          styles.closeBtnStyle,
        ]}
      />
      <LinearGradient
        colors={['#ffffff', '#ffffff']}
        start={{ x: 0, y: 0 }}
        style={{ flex: 1 }}
      >
        <FlatList
          data={productList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  content: {
    paddingHorizontal: wp('8%'),
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: hp('2.5%'),
    marginHorizontal: wp('4%'),
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  rightBtnStyle: { marginRight: 35 },
  closeBtnStyle: { position: 'absolute' },
  imageBackground: {
    backgroundColor: colors.greyExtraLight,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadge: {
    height: 20,
    width: 20,
    backgroundColor: colors.statusRed,
    position: 'absolute',
    right: -7,
    top: -8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeCount: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    fontWeight: '600',
    color: colors.greyWhite,
  },
  priceStyle: {
    fontStyle: 'normal',
    fontFamily: 'Museo_900',
    fontSize: 16,
    color: colors.greyDark2,
    marginVertical: 15,
    lineHeight: 17,
  },
  testTextStyle: {
    fontFamily: 'Museo_900',
    fontSize: 14,
    color: colors.greyDark2,
    marginTop: 20,
    lineHeight: 17,
  },

  learnMoreText: {
    color: colors.greyWhite,
    fontSize: 16,
    fontFamily: 'Museo_700',
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 10,
  },
  subTitle: {
    fontSize: 14,
    color: colors.greyMed,
    fontFamily: 'Museo_500',
    lineHeight: 22,
    marginTop: 5,
  },
  itemContainer: {
    backgroundColor: '#F2F7F9',
    marginBottom: 20,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: wp('8%'),
  },
  productImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  buttonStyle: {
    height: 60,
    marginTop: 10,
  },
});
