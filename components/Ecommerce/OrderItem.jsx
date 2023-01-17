import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme';
import Icon from '../Icon';
import RightArrow from '../Svg/arrowRightIcon';
import { LogEvent } from '../../analytics';

const ongoOneLogo = require('../../assets/HomeScreen/ongo-box.png');

const OrderItem = ({ orderData, section }) => {
  const { t } = useTranslation();
  const navigation = useNavigation()
  return (
    <Pressable style={styles.item} onPress={()=>{
      if(section.title === t('orderHistory.pending')) {
        LogEvent('OrderHistory_click_Pending')
      } else {
        LogEvent('OrderHistory_click_Past')
      }
      navigation.navigate('OrderDetail')
    }}>
      <View>
        <Text style={styles.itemHeaderText}>{orderData.status} March 15</Text>
        {section.title === t('orderHistory.pending') && (
          <Text style={styles.dateText}>Monday, APRIL 11</Text>
        )}
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
          }}
        >
          {orderData.products.map((image) => (
            <View style={{ marginRight: 10, paddingRight: 10 }}>
              <Image
                source={ongoOneLogo}
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.quantityBadge}>
                <Text style={styles.quantityText}>2</Text>
              </View>
            </View>
          ))}

          {orderData.products.length > 3 && (
            <View style={{ justifyContent: 'flex-end', marginLeft: 5 }}>
              <Icon
                type="MaterialIcons"
                name="more-horiz"
                size={28}
                color={colors.greyGrey}
              />
            </View>
          )}
        </View>
      </View>
      <RightArrow color={colors.greyGrey} />
    </Pressable>
  );
};
export default OrderItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#F8F8FC',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  itemHeaderText: {
    color: colors.greyDark2,
    fontFamily: 'Museo_300',
    fontSize: 10,
    lineHeight: 12,
  },
  dateText: {
    color: colors.greyDark2,
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 22,
  },
  quantityBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    right: 0,
  },
  quantityText: {
    color: colors.greyWhite,
    fontFamily: 'Museo_300',
    fontSize: 12,
  },
  productImage: {
    width: 40,
    height: 70,
  },
});
