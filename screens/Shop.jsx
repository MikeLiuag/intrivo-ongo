import React, { useState, useCallback, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
// import WalletCard from '../components/Svg/WalletCard';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-native-reanimated-carousel';
import Ongo from '../components/Svg/Ongo';
import { getQRToken } from '../store/user/slice';
import ArrowDown from '../components/Svg/arrowDown';
import CloseSvg from '../components/Svg/close';
import { colors } from '../theme';
import { QR_CODE_URL } from '../utilis/axios';
import { LogEvent } from '../analytics';
import { openLink } from '../utilis/link';
import { iso8601ToFormatted, iso8601ToDateLong, getFromNow } from '../utilis/dateTime';
import HeaderComp from '../components/HeaderComp';

// const Carousel = Platform.OS !== 'web' ? require('react-native-reanimated-carousel').default : View;

const infoIcon = require('../assets/info_outline_24px.png');

const QR_ENABLED = true;
const QR_URL = `${QR_CODE_URL}/share`;

const Shop = ({
  route: {
    params: { headerStyle, headerFont },
  },
  navigation,
}) => {
  const { t } = useTranslation();

  const globalError = useSelector((state) => state.app.globalError) ?? null;
  const dispatch = useDispatch();
  const { observations, users, usersLookup } = useSelector((s) => s.user);
  const cardInfo = users.map((u) => ({
    ...usersLookup[u],
    qrUrl: usersLookup[u].qrToken ? `${QR_URL}/${usersLookup[u].qrToken}` : null,
  }));
  const [selectedIndex, setSelected] = useState(0);
  const [selectedUuid, setSelectedUuid] = useState(users?.[0] || null);
  // observation has
  const sortedObservationsForUser = observations
    .filter((o) => o.uuid === cardInfo[selectedIndex]?.uuid)
    .sort((a, b) => a.date < b.date);
  const mostRecentObservation =
    sortedObservationsForUser && sortedObservationsForUser.length > 0
      ? sortedObservationsForUser[0]
      : null;
  const mostRecentObservationDate = mostRecentObservation?.date;
  const [isModal, switchModal] = useState(false);

  useEffect(() => {
    LogEvent('Passport_screen');
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!globalError && QR_ENABLED) dispatch(getQRToken({ uuid: selectedUuid }));
    }, [selectedUuid, dispatch, globalError])
  );

  const { document = null, doseInfo } = usersLookup?.[selectedUuid]?.immunization || {};
  const [isShow] = useState(false);

  const handleClick = () => {
    LogEvent('Passport_click_Info');
    Alert.alert(t('screens.shop.alert.title'), t('screens.shop.alert.subtitle'));
  };

  const returnColor = (result) => {
    if (result === 0) return colors.statusGreen;
    if (result === 1) return colors.statusRed;
    return colors.statusOrange;
  };

  const returnStatus = (result) => {
    if (result === 0) return 'Negative';
    if (result === 1) return 'Positive';
    return 'Invalid';
  };

  const getLastDose = () => {
    if (doseInfo?.length > 1) {
      let lastDose;
      doseInfo.map((item) => {
        if (!lastDose || item.dose_number > lastDose.dose_number) {
          lastDose = item;
        }
        return item;
      });
      return lastDose.date;
    }
    return doseInfo[0]?.date;
  };

  const renderCard = ({ item }) => (
    <View style={styles.cardShadow}>
      <View style={styles.cardBack}>
        {QR_ENABLED ? (
          <TouchableOpacity
            hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
            style={{
              justifyContent: 'center',
              marginVertical: 10,
              alignSelf: 'flex-end',
              right: 20,
            }}
            onPress={() => handleClick()}
          >
            <Image source={infoIcon} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>
        ) : (
          <View style={{ marginVertical: 10, right: 20 }} />
        )}
        <View
          style={{
            alignSelf: 'center',
            backgroundColor: '#2A4D9B',
          }}
        >
          {/* <QrCode /> */}
          {item.qrUrl && QR_ENABLED ? (
            <View style={{ alignSelf: 'center' }}>
              <QRCode
                size={hp('17%')}
                value={item.qrUrl}
                color='#F6C34C'
                backgroundColor='#2A4D9B'
              />
            </View>
          ) : null}
          <Text
            allowFontScaling
            style={{
              fontSize: 16,
              color: 'white',
              textAlign: 'center',
              marginTop: 10,
              flexWrap: 'wrap',
              fontFamily: 'Museo_700',
            }}
          >{`${item?.first_name || ''} ${item?.last_name || ''}`}</Text>
        </View>
        {mostRecentObservation && selectedUuid === item.uuid && (
          <TouchableOpacity
            style={{
              marginTop: 20,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              borderRadius: 12,
              padding: 10,
              backgroundColor: 'rgb(73,98,155)',
              flexWrap: 'wrap',
            }}
            onPress={() => {
              LogEvent('Passport_click_TestStatus');
              navigation.navigate('TestResultScreen', {
                data: {
                  ...mostRecentObservation,
                  patient: mostRecentObservation?.userName,
                  color: returnColor(mostRecentObservation?.result),
                },
                slideFromBottom: true,
              });
            }}
          >
            <View>
              <Text style={{ color: '#fff', fontFamily: 'Museo_900', flexWrap: 'wrap' }}>
                {t('screens.shop.test')}
                {/* mostRecentObservation.name */}
              </Text>
              <Text style={{ color: '#fff', flexWrap: 'wrap', fontFamily: 'Museo_500' }}>
                {iso8601ToDateLong(mostRecentObservationDate)} (
                {getFromNow(mostRecentObservationDate)})
              </Text>
            </View>
            <View
              style={{
                backgroundColor: returnColor(mostRecentObservation?.result),
                borderRadius: 10,
                justifyContent: 'center',
                paddingHorizontal: 10,
                minHeight: 30,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Museo_700',
                }}
              >
                {returnStatus(mostRecentObservation?.result)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {document?.media && selectedUuid === item.uuid && (
          <TouchableOpacity
            style={{
              marginVertical: 20,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              borderRadius: 12,
              padding: 10,
              backgroundColor: 'rgb(73,98,155)',
              flexWrap: 'wrap',
            }}
            onPress={() => {
              LogEvent('Passport_click_VaccineStatus');
              navigation.navigate('FilePreview', {
                media: document?.media[0],
                analyticName: 'Passport',
              });
            }}
          >
            <View>
              <Text
                style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, fontFamily: 'Museo_500' }}
              >
                {t('screens.shop.vaccine')}
              </Text>
              {doseInfo && doseInfo.length > 0 && (
                <Text style={{ color: '#fff', fontFamily: 'Museo_500' }}>
                  {iso8601ToFormatted(getLastDose(), 'MMM dd, yyyy')}
                </Text>
              )}
            </View>
            <View
              style={{
                backgroundColor: colors.statusGreen,
                borderRadius: 10,
                justifyContent: 'center',
                paddingHorizontal: 10,
                minHeight: 30,
              }}
            >
              <Text style={{ color: '#fff', fontFamily: 'Museo_700' }}>
                {t('screens.shop.vaccStatus')}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          <Ongo />
          <Text
            allowFontScaling={false}
            style={{ fontSize: 14, color: 'white', fontFamily: 'Museo_500', marginTop: 5 }}
          >
            {t('screens.shop.fda')}
          </Text>
        </View>
      </View>
    </View>
  );

  function onShare() {
    openLink(navigation, false, {
      url: `${cardInfo[selectedIndex].qrUrl}?hideText=true`,
      viewshot: true,
      title: `${cardInfo[selectedIndex]?.first_name || ''} ${
        cardInfo[selectedIndex]?.last_name || ''
      } Health Passport`,
      useWebView: true,
    });
  }

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1 }}>
      <HeaderComp left='arrow' addStyle={{ marginTop: Platform.OS === 'android' ? 10 : 0 }} />
      <ScrollView>
        <View style={{ ...styles.header, ...headerStyle, flexWrap: 'wrap' }}>
          <View>
            <View style={styles.profileHeader}>
              <Text style={headerFont}>{t('screens.shop.passport')}</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                LogEvent('Passport_click_DependentDropdown');
                switchModal(!isModal);
              }}
              hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
              style={{
                marginBottom: 24,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  marginRight: 11,
                  color: '#666666',
                  fontFamily: 'Museo_700',
                }}
              >{`${cardInfo[selectedIndex]?.first_name || ''} ${
                cardInfo[selectedIndex]?.last_name || ''
              }`}</Text>
              <ArrowDown height={7} width={12} />
            </TouchableOpacity>
          </View>
          {QR_ENABLED && cardInfo[selectedIndex]?.qrUrl && (
            <TouchableOpacity
              style={{
                backgroundColor: '#2A4D9B',
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 15,
                padding: 10,
              }}
              onPress={() => {
                LogEvent('Passport_click_Share');
                onShare();
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 16,
                  color: '#F6C34C',
                  fontFamily: 'Museo_500',
                }}
              >
                {t('screens.shop.share')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.container}>
          {!!cardInfo.length && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Carousel
                loop={false}
                height={500}
                width={wp('88%')}
                data={cardInfo}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => {
                  setSelected(index);
                  setSelectedUuid(cardInfo[index].uuid);
                }}
                renderItem={renderCard}
              />
            </View>
          )}
          {!!cardInfo.length && (
            <View
              style={{
                flexDirection: 'row',
                marginTop: -10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {!!cardInfo.length &&
                cardInfo.map((item, index) => (
                  <View
                    key={`${item.uuid}-point`}
                    style={{
                      backgroundColor: index === selectedIndex ? '#2A4D9B' : '#D6D6D6',
                      height: 12,
                      width: 12,
                      borderRadius: 12,
                      marginHorizontal: 4,
                      marginTop: 10,
                      marginBottom: 30,
                    }}
                  />
                ))}
            </View>
          )}
        </View>
      </ScrollView>
      <Modal visible={isShow} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingHorizontal: 24,
            paddingVertical: 40,
          }}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                padding: 15,
                position: 'absolute',
              }}
              onPress={() => handleClick()}
            >
              <CloseSvg width={wp('4%')} height={wp('4%')} />
            </TouchableOpacity>
            <Text
              style={{
                color: '#333333',
                fontSize: 18,
                marginBottom: 14,
                marginTop: 12,
                fontFamily: 'Museo_700',
              }}
            >
              {t('screens.shop.alert.title')}
            </Text>
          </View>

          <View style={styles.descriptionview}>
            <Text style={styles.ondescription}>{t('screens.shop.alert.subtitle')}</Text>
          </View>
        </View>
      </Modal>

      <Modal visible={isModal} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingHorizontal: 24,
            paddingVertical: 48,
          }}
        >
          <TouchableOpacity
            style={{ alignSelf: 'flex-start', padding: 15, marginLeft: -15 }}
            onPress={() => switchModal(!isModal)}
          >
            <CloseSvg width={wp('4%')} height={wp('4%')} />
          </TouchableOpacity>
          <Text
            style={{
              color: '#333333',
              fontSize: 24,
              fontWeight: '600',
              marginTop: 24,
              marginBottom: 14,
              fontFamily: 'Museo_500',
            }}
          >
            {t('screens.shop.modal.title')}
          </Text>
          <ScrollView>
            {cardInfo.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  setSelected(index);
                  setSelectedUuid(cardInfo[index].uuid);
                  switchModal(false);
                  // getQrCode(index);
                }}
                key={`${item.uuid}-view-card`}
                style={{
                  width: '100%',
                  backgroundColor: '#F2F7F9',
                  marginVertical: 8,
                  borderRadius: 16,
                  alignItems: 'center',
                  padding: 16,
                  flexDirection: 'row',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#F6C34C',
                    width: 48,
                    height: 48,
                    borderRadius: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: 'white',
                      fontFamily: 'Museo_500',
                    }}
                  >{`${item.first_name?.slice(0, 1)}${item.last_name?.slice(0, 1) || ''}`}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      marginLeft: 16,
                      fontSize: 16,
                      color: '#333333',
                      fontFamily: 'Museo_500',
                    }}
                  >{`${item.first_name || ''} ${item.last_name || ''}${
                    index === 0 ? ' (me)' : ''
                  }`}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Shop;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('6%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
    // height: hp("70%"),
    flex: 1,
  },
  shopTitle: {
    fontSize: 18,
    color: '#999',
    marginVertical: hp('3%'),
  },
  header: {
    // paddingTop: hp('2.5%'),
    // marginTop: hp('3.1%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: wp('8%'),
    paddingHorizontal: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Museo_500',
    // fontWeight: '500',
  },
  cardBack: {
    backgroundColor: '#2A4D9B',
    height: 480,
    justifyContent: 'center',
    borderRadius: 16,
  },
  cardShadow: {
    borderRadius: 16,
    // backgroundColor: 'transparent',
    shadowColor: '#555',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 5,
    padding: 10,
    width: wp('88%'),
  },
  ongotitleview: {
    backgroundColor: '#DDEEE7',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
    borderRadius: 20,
    borderColor: '#B6E3CA',
    borderWidth: 2,
  },
  ongotitle: {
    width: wp('75%'),
    fontSize: 16,
    fontWeight: '900',
    marginTop: 10,
    marginLeft: 20,
    color: '#393A39',
  },
  ondescription: {
    fontSize: 15,
    marginBottom: 10,
    color: '#444',
    lineHeight: 25,
    fontFamily: 'Museo_500',
  },
  descriptionview: {
    marginLeft: 20,
    marginTop: 10,
  },
  closeimage: {
    width: wp('4%'),
    height: hp('4%'),
    marginTop: 4,
    tintColor: '#666666',
  },
});
