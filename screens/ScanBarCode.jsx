import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { colors } from '../theme';
import BarCodeRead from '../components/Svg/BarCodeRead';
import HeaderComp from '../components/HeaderComp';
import CameraCheck from './CameraCheck';
import { LogEvent } from '../analytics';
import CloseIcon from '../components/Svg/close';
import TestButton from '../components/Buttons/TestButton';
import { BlueButton } from '../components/Buttons/BlueButton';

// logo
const carestartLogo = require('../assets/HomeScreen/carestart-logo.png');
const ongoLogo = require('../assets/ongo-logo.png');
const ongoOneLogo = require('../assets/ongo-one-logo.png');

// constants for zoom levels
// const ZOOM = {
//   in: 1,
//   out: -1,
//   step: 0.1,
// };

const CHECK_DISPLAY_MS = 1500;
const ANTHEM_FLAG = false;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const ScanBarCode = ({
  onSelectTest = () => null,
  setCameraPermission = () => null,
  skipBarcodeScanner,
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const testsList = useSelector((state) => state.app.testsList);
  const navigation = useNavigation();

  const [selectedTest, setSelectedTest] = useState('');

  const { t } = useTranslation();

  const [skip, switchSkip] = useState(skipBarcodeScanner);

  useEffect(() => {
    if (skipBarcodeScanner) {
      setHasPermission(true);
    }
  }, [skipBarcodeScanner]);

  useEffect(() => {
    LogEvent('TestScan_screen');
    (async () => {
      if (!skipBarcodeScanner) {
        const { status } = await Camera.getCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      }
    })();
  }, [skipBarcodeScanner]);

  const onCameraPermission = () => {
    (async () => {
      if (!skipBarcodeScanner) {
        const { status } = await Camera.getCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      }
    })();
  };

  const barCodeHandler = async ({ data }) => {
    setScanned(true);
    await sleep(CHECK_DISPLAY_MS);
    if (data?.slice(0, 3) === 'R01' && ANTHEM_FLAG) {
      LogEvent('BarcodeScanner', 'ValidCode');
      onSelectTest('Anthem', data);
      setCameraPermission(hasPermission);
      return;
    }
    let barcodeData = '';
    // for datamatrix on/go one
    if (
      data.includes('01006826076602611722102110COV1100069') ||
      data.includes('01008600079304091723020810COV2020061')
    ) {
      barcodeData = data.substring(1, data.length);
    } else {
      barcodeData = data;
    }
    switch (barcodeData) {
      case 'https://app.intrivo.com/':
      case 'https://app.letsongo.com/':
      case 'http://www.accessbio.net/Covid-19AntigenHomeTest': {
        switchSkip(true);
        break;
      }
      case '(01)00850010224312(10)CP21G01(17)122021':
      case '010085001022431210CP21G0117122021':
      case '850010224312':
      case '0850010224312': {
        LogEvent('BarcodeScanner', 'ValidCode');
        onSelectTest('CareStart');
        setCameraPermission(hasPermission);
        break;
      }
      case '(01)00860006191665(10)CP21K02(17)032022':
      case '010086000619166510CP21H0917012022':
      case '860006191665':
      case '0860006191665':
      case 'https://www.intrivo.com/app': {
        LogEvent('BarcodeScanner', 'ValidCode');
        onSelectTest('On/Go');
        setCameraPermission(hasPermission);
        break;
      }
      case '(01)00860006191665(10)CP21H09(17)012022':
      case '01006826076602611722102110COV1100069':
      case '01008600079304091723020810COV2020061':
      case '682607660261':
      case '0682607660261':
      case '0860007930409':
      case '860007930409':
      case '7692005660261':
      case 'https://flowflexcovid.com':
      case 'http://app.letsongo.com/one': {
        LogEvent('BarcodeScanner', 'ValidCode');
        onSelectTest('On/Go One');
        setCameraPermission(hasPermission);
        break;
      }
      default: {
        LogEvent('BarcodeScanner', 'InvalidCode');
        switchSkip(true);
        break;
      }
    }
  };

  if (hasPermission === false) return <CameraCheck onCameraPermission={onCameraPermission} />;

  const handleRightClick = () => {
    if (skipBarcodeScanner) {
      LogEvent('TimelineChooseTest_Close');
    } else {
      LogEvent(skip ? 'TestChooseTest_click_Close' : 'TestScan_click_Close');
    }
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

  const handleButton = () => {
    if (skipBarcodeScanner) {
      LogEvent('TimelineChooseTest_Next');
    } else {
      LogEvent('TestChooseTest_click_Next');
    }
    onSelectTest(selectedTest.slice(0, selectedTest.length - 1));
    setCameraPermission(hasPermission);
  };

  const getListItems = () => {
    if (testsList?.length === 0) {
      return [
        {
          description: 'COVID-19 Self-Test',
          icon: undefined,
          subtype: 'single_option',
          title: 'On/Go™',
          url: '/TestOptions/OnGo',
        },
        {
          description: 'COVID-19 Self-Test',
          icon: undefined,
          subtype: 'single_option',
          title: 'Carestart™',
          url: '/TestOptions/Carestart',
        },
      ];
    }
    // this is needed to add a blank space to the list of tests in case
    //  we have an odd number so the styling looks correct
    if (testsList?.length % 2 !== 0) {
      return [
        ...testsList,
        {
          testItem: true,
        },
      ];
    }
    return testsList;
  };

  const getOldIcon = (title) => {
    switch (title) {
      case 'On/Go™':
        return ongoLogo;
      case 'On/Go One™':
        return ongoOneLogo;
      case 'Carestart™':
        return carestartLogo;
      default:
        return {};
    }
  };

  const items = getListItems();
  const showOldList = testsList?.length === 0;

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.conitaner}>
      <HeaderComp
        center={[
          skip === true ? t('screens.scanBar.headerTest') : t('screens.scanBar.headerQR'),
          { fontSize: 16, color: 'black', fontFamily: 'Museo_700' },
        ]}
        addStyle={{
          paddingTop: 24,
          paddingRight: 24,
          paddingBottom: skip === true ? 0 : 24,
          paddingLeft: 24,
        }}
        right={[<CloseIcon width={14} height={14} />, handleRightClick]}
      />
      {!skip ? (
        <>
          <View
            style={{
              width: '100%',
            }}
          >
            <View
              style={{
                backgroundColor: 'transparent',
                width: '100%',
                height: 286,
                overflow: 'hidden',
              }}
            >
              {hasPermission ? (
                <BarCodeScanner
                  style={styles.cameraConitaner}
                  onBarCodeScanned={scanned ? undefined : barCodeHandler}
                  barCodeScannerSettings={{
                    barCodeTypes: [
                      BarCodeScanner.Constants.BarCodeType.qr,
                      BarCodeScanner.Constants.BarCodeType.datamatrix,
                      BarCodeScanner.Constants.BarCodeType.ean13,
                    ],
                  }}
                  autoFocus={Camera.Constants.AutoFocus.on}
                />
              ) : (
                <View style={[styles.cameraConitaner, { backgroundColor: 'black' }]} />
              )}
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                }}
              >
                <BarCodeRead isRead={scanned} />
              </View>
            </View>
          </View>
          <ScrollView
            style={styles.buttonsContainer}
            contentContainerStyle={styles.scrollContainer}
          >
            <Text style={styles.text1}>{t('screens.scanBar.getStarted')}</Text>

            <Text style={styles.text2}>{t('screens.scanBar.infoQR')}</Text>
            <Text style={styles.donthaveText}>{t('screens.scanBar.manually.title')}</Text>
            <TouchableOpacity
              hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
              onPress={() => {
                switchSkip(true);
                LogEvent('TestScan_click_Manual');
                LogEvent('TestChooseTest_screen');
              }}
            >
              <Text style={styles.starttestText}>{t('screens.scanBar.manually.button')}</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <Text style={styles.testHeader}>{t('screens.scanBar.manually.chooseTest')}</Text>
            <FlatList
              data={items}
              numColumns={showOldList ? 1 : 2}
              style={{ paddingHorizontal: testsList.length > 0 ? 16 : 24 }}
              ke
              renderItem={({ item }) =>
                !item?.testItem ? (
                  <TestButton
                    action={() => setSelectedTest(item.title)}
                    title={item.title}
                    subtitle={item.description}
                    logo={!showOldList && item.icon ? { uri: item.icon } : getOldIcon(item.title)}
                    selected={selectedTest === item.title}
                    oldType={showOldList}
                  />
                ) : (
                  <View style={{ flex: 1 }} />
                )
              }
            />
          </View>
          <BlueButton
            style={styles.blueButton}
            title={t('screens.scanBar.button')}
            disabled={selectedTest === ''}
            action={handleButton}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cameraConitaner: {
    ...StyleSheet.absoluteFillObject,
    height: 600,
    marginTop: -100,
  },
  testHeader: {
    alignSelf: 'center',
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 24,
    color: colors.greyMed,
    marginBottom: 40,
  },
  conitaner: {
    flex: 1,
    backgroundColor: colors.primaryGhost,
    // paddingTop: 90,
    // paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'Museo_900',
    fontSize: 24,
  },
  subtitle: {
    fontSize: 16,
    color: colors.greyMed,
  },
  textContainer: {
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 51,
  },
  buttonsContainer: {
    flex: 1,
    marginTop: 32,
  },
  scrollContainer: { flex: 1, paddingHorizontal: 24 },
  text1: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
  },
  text2: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    color: colors.greyMed,
    lineHeight: 24,
    marginTop: 16,
  },
  cameraTop: {
    backgroundColor: 'black',
    width: '100%',
    height: 138,
    // position: 'absolute',
    top: 0,
  },
  camTitle: {
    position: 'absolute',
    top: 162,
    color: 'white',
    width: '100%',
    textAlign: 'center',
  },
  cameraBotButons: {
    paddingHorizontal: 40,
    backgroundColor: 'black',
    width: '100%',
    height: 210,
    justifyContent: 'center',
    marginTop: 'auto',
  },
  camControlBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonType: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    borderRadius: 16,
  },
  imageBackground: {
    backgroundColor: colors.primaryPavement,
    height: 48,
    width: 48,
    marginRight: 16,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowImage: {
    width: 48,
    height: 48,
  },
  rowHeader: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    color: colors.greyDark2,
  },
  rowText: {
    fontSize: 14,
    fontFamily: 'Museo_500',
    color: colors.greyMed,
  },
  donthaveText: {
    marginTop: 90,
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: 'Museo_900',
    color: colors.greyMed,
    fontSize: 18,
  },
  starttestText: {
    marginTop: 7,
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: 'Museo_900',
    color: colors.primaryBlue,
    fontSize: 18,
  },
  rowContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  blueButton: {
    marginHorizontal: 16,
    marginBottom: 30,
  },
});

export default ScanBarCode;
