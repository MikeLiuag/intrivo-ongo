import React, { useEffect } from 'react';
import { StyleSheet, View, Text, SectionList } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import HeaderComp from '../../components/HeaderComp';
import { colors } from '../../theme';
import OrderItem from '../../components/Ecommerce/OrderItem';
import { LogEvent } from '../../analytics';

export default ({ navigation }) => {
  const { t } = useTranslation();

  useEffect(() => {
    LogEvent('OrderHistory_screen');
  },[])

  function renderItem({ item, section }) {
    return <OrderItem orderData={item} section={section} />;
  }

  const handleGoBack = () => {
    LogEvent('OrderHistory_click_Back');
    navigation.goBack();
  }

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.container}>
      <HeaderComp
        center={[t('orderHistory.title'), styles.headerTitle]}
        left="arrow"
        onLeftClick={handleGoBack}
        addStyle={styles.header}
      />

      <View style={styles.content}>
        <SectionList
          sections={[
            {
              title: t('orderHistory.pending'),
              data: [{ status: 'Arriving', products: ['a'] }],
            },
            {
              title: t('orderHistory.past'),
              data: [
                { status: 'Delivered', products: ['a', 'a', 'b', 'd'] },
                { status: 'Canceled', products: ['a', 'a'] },
                { status: 'Canceled', products: ['a', 'a', 'g'] },
              ],
            },
          ]}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionTitle}>{title}</Text>
          )}
          stickySectionHeadersEnabled={false}
          SectionSeparatorComponent={() => <View style={{ height: 15 }} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scrollContainer: { flex: 1 },
  scrollContentContainer: { flexGrow: 1 },
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
    color: colors.black,
    fontFamily: 'Museo_700',
  },
  sectionTitle: {
    color: colors.greyWhite2,
    fontFamily: 'Museo_900',
    fontSize: 12,
    lineHeight: 24,
    textTransform: 'uppercase',
  },
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
