import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Accordion from 'react-native-collapsible/Accordion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComp from '../../components/HeaderComp';
import Icon from '../../components/Icon';
import { colors } from '../../theme';
import { BlueButton } from '../../components/Buttons/BlueButton';
import CloseSvg from '../../components/Svg/close';
import { addToCart, fetchProduct } from '../../store/ecommerce/slice';
import { clearCurrentProduct } from '../../store/ecommerce/actions';
import { LogEvent } from '../../analytics';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
const { default: Carousel = View, Pagination = View } =
  Platform.OS !== 'web' ? require('react-native-reanimated-carousel') : {};

export default ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [activeSections, setActiveSections] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef(null);
  const [scrollPositionY, setScrollPositionY] = useState();
  const [scrollPositionAccordian, setScrollPositionAccordian] = useState();
  const [isCartAdded, setIsCartAdded] = useState(false);
  const [activePartyPackType, setActivePartyPackType] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [productType] = useState('single1');

  const { cart } = useSelector((state) => state.ecommerce);
  const productInfo = useSelector((state) => state.ecommerce.currentProduct);
  const [localCartCount, setLocalCartCount] = useState(cart?.length);

  const itemName = 'OnGoOne';

  useEffect(() => {
    LogEvent(`PDP_${itemName}_screen`);
    dispatch(fetchProduct(7131483734170));
  }, [dispatch]);

  useEffect(() => {
    if (localCartCount !== cart?.length) {
      setTimeout(() => {
        setIsCartAdded(false);
      }, 3000);
      setIsCartAdded(true);
      setLocalCartCount(cart.length);
    }
  }, [cart.length, localCartCount]);

  const goBack = () => {
    LogEvent(`PDP_${itemName}_click_Back`);
    dispatch(clearCurrentProduct());
    navigation.goBack();
  };

  const renderHeader = (section, index, isActive) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Icon
        type='MaterialCommunityIcons'
        name={isActive ? 'minus' : 'plus'}
        size={24}
        color={colors.black}
      />
    </View>
  );

  const renderContent = (section) => (
    <View style={{ paddingBottom: 10 }}>
      <Text style={styles.sectionContent}>{section.content}</Text>
    </View>
  );

  const sectionLogName = (name) => {
    switch (name) {
      case 'Key features':
        return 'Features';
      case 'Shipping details':
        return 'Shipping';
      case 'Insurance reimbursement':
        return 'Insurance';
      case 'Return policy':
        return 'Return';
      default:
        return '';
    }
  };

  const updateSections = (activeSection) => {
    LogEvent(
      `PDP_${itemName}_click_${sectionLogName(
        productInfo.features[activeSection.length - 1]?.title
      )}`
    );
    setActiveSections([...activeSection]);
  };

  const CarouselItem = ({ item, index }, parallaxProps) => (
    <View style={{ width: wp('100%') }}>
      <Text
        style={{
          position: 'absolute',
          top: 40,
          left: 10,
          color: '#B00020',
          fontFamily: 'Museo_700',
          fontSize: 18,
          transform: [{ rotate: '320deg' }],
        }}
      >
        PLACEHOLDER
      </Text>
      <Image
        source={{ uri: item }}
        style={{ width: wp('50%'), height: 180, marginLeft: wp('18%') }}
        resizeMode='contain'
      />
    </View>
  );

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const onRightIconClick = () => {
    LogEvent(`PDP_${itemName}_click_CartIcon`);
    navigation.navigate('Cart');
  };

  const handleRightClick = () => {
    LogEvent(`PDP_${itemName}_click_Close`);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <HeaderComp
        center={[t('store.title'), styles.headerTitle]}
        left='arrow'
        onLeftClick={goBack}
        addStyle={styles.header}
        right={[
          <View style={styles.imageBackground}>
            <Icon type='MaterialIcons' name='shopping-cart' size={24} isGradient />
            {localCartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeCount}>{localCartCount}</Text>
              </View>
            )}
          </View>,
          onRightIconClick,
          styles.rightBtnStyle,
        ]}
        closeRight={[<CloseSvg width={14} height={14} />, handleRightClick, styles.closeBtnStyle]}
      />
      <LinearGradient colors={['#ffffff', '#ffffff']} start={{ x: 0, y: 0 }} style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps='handled'
          ref={scrollRef}
          onScroll={(event) => {
            setScrollPositionY(event.nativeEvent.contentOffset.y);
          }}
          scrollEventThrottle={5}
        >
          <View style={styles.content}>
            <View style={{ marginBottom: 40 }}>
              <Text style={styles.testTextStyle}>{productInfo?.title}</Text>
              <Text style={styles.testNumberStyle}>
                ({productInfo?.numberOfTest} {t('store.test')})
              </Text>
              <Text style={styles.testNumberStyle}>
                {t('store.startingAt')} <Text style={styles.priceStyle}>${productInfo?.price}</Text>
              </Text>
              <View style={[styles.textImageView, {}]}>
                {productInfo?.image && Array.isArray(productInfo?.image) ? (
                  <Carousel
                    onSnapToItem={(index) => setActiveSlide(index)}
                    sliderWidth={wp('80%')}
                    sliderHeight={300}
                    itemWidth={wp('100%')}
                    data={productInfo?.image}
                    renderItem={CarouselItem}
                    hasParallaxImages
                  />
                ) : (
                  <Image
                    source={{ uri: productInfo?.image }}
                    style={{
                      width: wp('50%'),
                      height: 180,
                      marginLeft: wp('18%'),
                    }}
                    resizeMode='contain'
                  />
                )}
              </View>
              {Array.isArray(productInfo?.image) && (
                <Pagination
                  data={productInfo?.image}
                  activeSlide={activeSlide}
                  dotsLength={productInfo?.image.length}
                  activeDotIndex={activeSlide}
                  containerStyle={{ paddingBottom: 0 }}
                  dotStyle={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: '#2A4D9B',
                  }}
                  inactiveDotStyle={{
                    backgroundColor: '#D5D5D5',
                  }}
                  inactiveDotOpacity={1}
                  inactiveDotScale={1}
                />
              )}
              {productType === 'single' ? (
                <View style={styles.quantityView}>
                  <TouchableOpacity
                    style={[styles.quantityMinusContainer]}
                    onPress={decreaseQuantity}
                  >
                    <Icon
                      type='MaterialCommunityIcons'
                      name='minus'
                      size={24}
                      color={colors.greyWhite}
                    />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 16, fontFamily: 'Museo_700' }}>{quantity}</Text>
                  <TouchableOpacity
                    style={[styles.quantityBlueContainer]}
                    onPress={increaseQuantity}
                  >
                    <Icon
                      type='MaterialCommunityIcons'
                      name='plus'
                      size={24}
                      color={colors.greyWhite}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.partyPackView}>
                  <TouchableOpacity
                    style={[
                      activePartyPackType === 0
                        ? styles.selectedPartPackContainer
                        : styles.partPackContainer,
                    ]}
                    onPress={() => setActivePartyPackType(0)}
                  >
                    <Text
                      style={
                        activePartyPackType === 0
                          ? styles.selectedParyPackText
                          : styles.paryPackText
                      }
                    >
                      20 boxes, 40 tests
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      activePartyPackType === 1
                        ? styles.selectedPartPackContainer
                        : styles.partPackContainer,
                    ]}
                    onPress={() => setActivePartyPackType(1)}
                  >
                    <Text
                      style={
                        activePartyPackType === 1
                          ? styles.selectedParyPackText
                          : styles.paryPackText
                      }
                    >
                      20 boxes, 40 tests
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      activePartyPackType === 2
                        ? styles.selectedPartPackContainer
                        : styles.partPackContainer,
                    ]}
                    onPress={() => setActivePartyPackType(2)}
                  >
                    <Text
                      style={
                        activePartyPackType === 2
                          ? styles.selectedParyPackText
                          : styles.paryPackText
                      }
                    >
                      20 boxes, 40 tests
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {isCartAdded ? (
                <View style={styles.cartButtonContainer}>
                  <Icon
                    type='Ionicons'
                    name='md-checkmark-sharp'
                    size={24}
                    color={colors.greyWhite}
                  />
                  <Text style={styles.cartButtonText}>{t('store.added')}</Text>
                </View>
              ) : (
                <BlueButton
                  title={t('store.addToCart')}
                  styleText={styles.cartButtonText}
                  style={{ height: 60 }}
                  action={() => {
                    LogEvent(`PDP_${itemName}_click_Add`);
                    dispatch(addToCart({ product: productInfo, quantity }));
                  }}
                />
              )}

              <View style={{ marginVertical: 20 }}>
                <Text style={styles.descriptionText}>{productInfo?.description}</Text>
              </View>
              <View
                style={styles.featureView}
                onLayout={(event) => {
                  const { layout } = event.nativeEvent;
                  setScrollPositionAccordian(layout.y - hp('100%') + 260);
                }}
              >
                <Accordion
                  sections={productInfo?.features || []}
                  activeSections={activeSections}
                  renderHeader={renderHeader}
                  renderContent={renderContent}
                  onChange={updateSections}
                  underlayColor={colors.greyWhite}
                  expandMultiple
                />
              </View>
              {productInfo?.otherProduct && productInfo?.otherProduct.title ? (
                <View style={{ marginTop: 30 }}>
                  <Text style={styles.exploreTitle}>{t('store.exploreOther')}</Text>
                  <View
                    style={{
                      alignItems: 'center',
                      paddingVertical: 10,
                    }}
                  >
                    <View style={styles.otherImageBackground} />

                    <Image
                      source={{ uri: productInfo?.otherProduct?.image }}
                      style={{ width: 80, height: 150 }}
                      resizeMode='cover'
                    />
                    <Text style={styles.otherProductTitle}>{productInfo?.otherProduct?.title}</Text>
                    <Text style={styles.subTitle}>{productInfo?.otherProduct?.subTitle}</Text>
                    <Text style={styles.priceStyle}>${productInfo?.otherProduct?.price}</Text>
                    <TouchableOpacity onPress={() => LogEvent(`PDP_${itemName}_click_More`)}>
                      <Text style={styles.learnMoreText}>{t('store.learn')}</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        marginTop: 60,
                        backgroundColor: colors.secondaryButtonBorder,
                        height: 1,
                        width: '100%',
                      }}
                    />
                  </View>
                  <View style={{ marginVertical: 20 }}>
                    <Text style={styles.descriptionText}>
                      {productInfo?.otherProduct?.description}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        </ScrollView>
        {scrollPositionY > scrollPositionAccordian && (
          <View style={{ position: 'absolute', bottom: 40, right: 20 }}>
            <TouchableOpacity
              style={[styles.quantityBlueContainer]}
              onPress={() => {
                scrollRef.current.scrollTo({ y: 0, animated: true });
              }}
            >
              <Icon
                type='MaterialIcons'
                name='keyboard-arrow-up'
                size={24}
                color={colors.greyWhite}
              />
            </TouchableOpacity>
            <Text
              style={[
                {
                  color: colors.iconGradientStart,
                  marginTop: 5,
                  fontSize: 12,
                  fontFamily: 'Museo_900',
                  lineHeight: 17,
                  textAlign: 'center',
                },
              ]}
            >
              {t('store.top')}
            </Text>
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4%'),
    justifyContent: 'space-between',
    height: '100%',
  },
  content: {
    paddingHorizontal: wp('8%'),
    justifyContent: 'space-between',
    height: '100%',
  },
  indicatorView: {
    height: '100%',
    width: '100%',
    marginTop: '50%',
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
  rightBtnStyle: { width: 40, height: 40, left: 5, marginRight: 35 },
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
  closeBtnStyle: { position: 'absolute' },
  cartBadgeCount: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    fontWeight: '600',
    color: colors.greyWhite,
  },
  textImageView: {
    marginTop: 20,
    height: 200,
    backgroundColor: '#F8F8FC',
    borderRadius: 20,
    justifyContent: 'flex-end',
    paddingVertical: 10,
  },
  priceStyle: {
    fontStyle: 'normal',
    fontFamily: 'Museo_900',
    fontSize: 18,
    color: colors.greyDark2,
    marginTop: 10,
    lineHeight: 22,
  },
  testTextStyle: {
    fontStyle: 'normal',
    fontFamily: 'Museo_500',
    fontSize: 18,
    fontWeight: '400',
    color: colors.greyDark2,
  },
  testNumberStyle: {
    fontStyle: 'normal',
    fontFamily: 'Museo_500',
    fontSize: 14,
    fontWeight: '400',
    color: colors.greyDark2,
    marginTop: 4,
  },
  quantityView: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 130,
    alignSelf: 'center',
  },
  quantityBlueContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityMinusContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.greyWhite2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButtonContainer: {
    height: 60,
    borderRadius: 16,
    backgroundColor: colors.primaryYellow,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  partyPackView: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  selectedPartPackContainer: {
    width: wp('22%'),
    padding: 10,
    borderRadius: 16,
    backgroundColor: colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedParyPackText: {
    flex: 1,
    textAlign: 'center',
    color: colors.greyWhite,
    fontFamily: 'Museo_700',
  },
  partPackContainer: {
    width: wp('22%'),
    padding: 10,
    borderRadius: 16,
    backgroundColor: colors.primaryPavement,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paryPackText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Museo_700',
  },
  cartButtonText: {
    fontSize: 18,
    color: colors.greyWhite,
    fontFamily: 'Museo_700',
    marginLeft: 5,
  },
  learnMoreText: {
    color: colors.iconGradientStart,
    fontSize: 14,
    fontFamily: 'Museo_700',
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 10,
  },
  sectionHeader: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.secondaryButtonBorder,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: 'Museo_500',
    color: colors.greyDark2,
    lineHeight: 19,
  },
  sectionContent: {
    fontSize: 14,
    fontFamily: 'Museo_500',
    color: colors.greyDark2,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.greyMed,
    fontFamily: 'Museo_500',
    lineHeight: 22,
    letterSpacing: 0.8,
  },
  featureView: {
    marginVertical: 10,
    borderBottomWidth: 0.75,
    borderBottomColor: colors.secondaryButtonBorder,
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
  },
  subTitle: {
    fontSize: 14,
    color: colors.greyMed,
    fontFamily: 'Museo_500',
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 10,
  },
});
