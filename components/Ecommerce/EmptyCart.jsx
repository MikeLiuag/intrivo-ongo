import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../theme';

const ongoOneLogo = require('../../assets/HomeScreen/ongo-box.png');

const EmptyCart = () => {
  const { t } = useTranslation();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      scrollEventThrottle={5}
    >
      <View style={styles.content}>
        <View
          style={[
            {
              height: 120,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#D5D5D5',
            },
          ]}
        >
          <Text
            style={{
              fontStyle: 'normal',
              fontFamily: 'Museo_300',
              fontSize: 16,
              fontWeight: '400',
              color: colors.greyDark2,
              lineHeight: 19,
            }}
          >{t('cart.emptyCart.title')}</Text>
        </View>
        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <Text style={styles.exploreTitle}>{t('cart.emptyCart.startShopping')}</Text>
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 10,
            }}
          >
            <View style={styles.otherImageBackground} />

            <Image
              source={ongoOneLogo}
              style={{ width: 80, height: 150 }}
              resizeMode="cover"
            />
            <Text style={styles.otherProductTitle}>{t('cart.emptyCart.otherProductTitle')}</Text>
            <Text style={styles.subTitle}>{t('cart.emptyCart.otherProductDescription')}</Text>
            <Text style={styles.priceStyle}>$24</Text>
            <TouchableOpacity>
              <Text style={styles.learnMoreText}>{t('store.learn')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4%'),
    justifyContent: 'space-between',
    height: '100%',
  },
  content: {
    paddingHorizontal: wp('8%'),
    height: '100%',
  },
  exploreTitle: {
    fontSize: 16,
    color: colors.greyDark2,
    fontFamily: 'Museo_700',
    lineHeight: 19,
  },
  otherImageBackground: {
    width: 130,
    height: 80,
    backgroundColor: colors.primaryGhost,
    position: 'absolute',
    top: 40,
    borderRadius: 20,
  },
  otherProductTitle: {
    fontSize: 14,
    color: colors.greyDark2,
    fontFamily: 'Museo_900',
    lineHeight: 17,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: colors.greyMed,
    fontFamily: 'Museo_500',
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
    letterSpacing: 0.8,
  },
  learnMoreText: {
    color: colors.iconGradientStart,
    fontSize: 14,
    fontFamily: 'Museo_700',
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 10,
  },
  priceStyle: {
    fontStyle: 'normal',
    fontFamily: 'Museo_900',
    fontSize: 18,
    color: colors.greyDark2,
    marginTop: 10,
    lineHeight: 22,
  },
});
