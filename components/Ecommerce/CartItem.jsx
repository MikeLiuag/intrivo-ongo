import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { colors } from '../../theme';
import Icon from '../Icon';
import {
  deleteProduct,
  increaseProductQuantity,
} from '../../store/ecommerce/actions';

const ongoOneLogo = require('../../assets/HomeScreen/ongo-box.png');

const CartItem = ({
  noBorder,
  index,
  productData,
  editable = true,
  showBuyAgain = false,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  function increaseQuantity() {
    dispatch(
      increaseProductQuantity({ index, quantity: productData?.quantity + 1 })
    );
  }

  function decreaseQuantity() {
    dispatch(
      increaseProductQuantity({ index, quantity: productData?.quantity - 1 })
    );
  }

  function deleteItem() {
    dispatch(deleteProduct(index));
  }

  return (
    <View style={[styles.container, !noBorder && styles.bottomBorder]}>
      <View>
        <Image
          source={ongoOneLogo}
          style={styles.itemImage}
          resizeMode="contain"
        />
        {!editable && (
          <View style={styles.badge}>
            <Text style={styles.whiteText}>{productData?.quantity}</Text>
          </View>
        )}
      </View>

      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={styles.testTextStyle}>{productData?.product?.title}</Text>
        <Text style={styles.testNumberStyle}>
          ({productData?.product?.numberOfTest} {t('store.test')})
        </Text>

        {editable && (
          <>
            <Text style={styles.priceStyle}>${productData?.product?.price}</Text>
            <View
              style={{
                marginVertical: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={styles.quantityView}>
                <TouchableOpacity
                  style={[styles.quantityBlueContainer]}
                  onPress={() => {
                    if (productData?.quantity > 1) decreaseQuantity();
                  }}
                >
                  <Icon
                    type="MaterialCommunityIcons"
                    name="minus"
                    size={24}
                    color={colors.greyWhite}
                  />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontFamily: 'Museo_700' }}>
                  {productData?.quantity}
                </Text>
                <TouchableOpacity
                  style={[styles.quantityBlueContainer]}
                  onPress={() => {
                    increaseQuantity();
                  }}
                >
                  <Icon
                    type="MaterialCommunityIcons"
                    name="plus"
                    size={24}
                    color={colors.greyWhite}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  deleteItem();
                }}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name="delete-outline"
                  size={24}
                  color={colors.primaryBlue}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
        {showBuyAgain && (
          <TouchableOpacity>
            <Text style={styles.learnMoreText}>Buy Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 30,

    paddingBottom: 20,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#D5D5D5',
  },
  itemImage: {
    width: 110,
    height: 110,
    backgroundColor: '#F8F8FC',
    borderRadius: 20,
  },
  priceStyle: {
    fontStyle: 'normal',
    fontFamily: 'Museo_900',
    fontSize: 16,
    color: colors.greyDark2,
    marginTop: 10,
    lineHeight: 22,
  },
  testTextStyle: {
    fontStyle: 'normal',
    fontFamily: 'Museo_500',
    fontSize: 14,
    fontWeight: '400',
    color: colors.greyDark2,
  },
  testNumberStyle: {
    fontStyle: 'normal',
    fontFamily: 'Museo_500',
    fontSize: 12,
    fontWeight: '400',
    color: colors.greyDark2,
    marginTop: 4,
  },
  quantityBlueContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 130,
  },
  whiteText: {
    fontSize: 14,
    fontFamily: 'Museo_500',
    color: colors.greyWhite,
  },
  badge: {
    backgroundColor: colors.primaryBlue,
    height: 25,
    width: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -5,
    top: -5,
  },
  learnMoreText: {
    color: colors.iconGradientStart,
    fontSize: 14,
    fontFamily: 'Museo_700',
    lineHeight: 17,
    marginTop: 10,
  },
});
