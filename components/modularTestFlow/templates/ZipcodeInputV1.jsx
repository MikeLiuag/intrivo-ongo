import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Modal, Pressable, Platform } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as Location from 'expo-location';
import { colors } from '../../../theme';
import Search from '../../Svg/search.svg';
import parseForVars from '../utils/parser';
import FormattedText from '../components/formattedText';

async function tryGetLocationAsync() {
  try {
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
    });

    const locationInfo = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (locationInfo[0].country === 'United States' && locationInfo[0].postalCode) {
      return locationInfo[0].postalCode;
    }

    return null;
  } catch (error) {
    console.warn('Error while trying to get location', error);
    return null;
  }
}

const ZipcodeInputV1 = ({ args, vars, onAction = () => null }) => {
  const [zipField, setZipField] = useState('');
  const [didAskZip, setDidAskZip] = useState(false);
  const [showDisclosurePopup, setDisclosurePopup] = useState(false);
  const [permission, setPermission] = useState(null);

  // on first render, get permission status
  useEffect(() => {
    const check = async () => {
      const getPermission = await Location.getForegroundPermissionsAsync();
      setPermission(getPermission?.status);
    };
    check();
  }, []);

  // main logic for showing permission screens
  useEffect(() => {
    const func = async () => {
      switch (permission) {
        case 'undetermined':
          if (Platform.OS === 'ios') {
            const requestPermission = await Location.requestForegroundPermissionsAsync();
            setPermission(requestPermission?.status);
          } else if (Platform.OS === 'android' && !showDisclosurePopup) {
            setDisclosurePopup(true);
          }
          break;
        case 'pending': {
          const requestPermission = await Location.requestForegroundPermissionsAsync();
          setPermission(requestPermission?.status);
          break;
        }
        case 'granted':
          if (!didAskZip) {
            const zip = await tryGetLocationAsync();
            if (zip) {
              setZipField(zip);
              setDidAskZip(true);
              onAction({ zipcode: { value: zip } });
            }
          }
          break;
        default:
          console.warn('Unexpected permission');
      }
    };
    func();
  }, [permission, showDisclosurePopup, didAskZip, onAction]);

  const handleModalResponse = (res) => {
    setDisclosurePopup(false);
    setPermission(res && 'pending'); // res = true -> pending, res = false -> false
  };

  return (
    <View style={styles.container}>
      <FormattedText style={styles.subtitle}>{parseForVars(args.subtitle, vars)}</FormattedText>
      <View style={styles.inputContainer}>
        <Search fill='red' />
        <TextInput
          style={styles.input}
          placeholder={args?.zipcode?.placeholder}
          value={zipField}
          onEndEditing={() => {
            onAction({ zipcode: { value: zipField } });
          }}
          returnKeyType='done'
          onChangeText={(text) => {
            setZipField(text);
            onAction({ zipcode: { value: text } });
          }}
        />
      </View>

      {showDisclosurePopup && (
        <Modal
          animationType='slide'
          transparent
          style={{ backgroundColor: '#000000' }}
          visible={showDisclosurePopup}
        >
          <View style={styles.disclosureBackground}>
            <View style={styles.disclosurePopupContainer}>
              <Text style={styles.disclosureTitle}>zip.DisclosureTitle</Text>
              <Text style={styles.disclosureDescription}>zip.DisclosureDescription</Text>
              <View style={styles.disclosureButtons}>
                <Pressable
                  style={styles.disclosureSkipButton}
                  onPress={() => handleModalResponse(false)}
                >
                  <Text style={styles.disclosureSkip}>zip.DisclosureSkip</Text>
                </Pressable>
                <Pressable
                  style={styles.disclosureAgreeButton}
                  onPress={() => handleModalResponse(true)}
                >
                  <Text style={styles.disclosureAgree}>zip.DisclosureAgree</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 26,
    marginVertical: 35,
    lineHeight: 24,
    color: colors.greyMed,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greyWhite,
    padding: hp('1%'),
    margin: 6,
    borderWidth: 1,
    borderRadius: Number(hp('2%')),
    borderColor: '#d8e1f8',
  },
  input: {
    width: Number(wp('68%')),
    color: colors.greyDark2,
    fontSize: Number(wp('4.6%')),
  },
  magnifier: {
    width: wp('5%'),
    height: wp('5%'),
    marginRight: wp('4%'),
  },
  errorContainer: {
    backgroundColor: '#F2E2E8',
    margin: hp('1%'),
    padding: hp('2%'),
    borderWidth: 1,
    borderRadius: Number(hp('2%')),
    borderColor: '#a8001b',
  },
  error: {
    fontSize: Number(hp('2%')),
    color: '#A8001B',
    lineHeight: Number(hp('3%')),
  },
  disclosureBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: Number(wp('8%')),
    margin: Number(wp('1%')),
  },
  disclosurePopupContainer: {
    marginTop: Number(wp('60%')),
    marginLeft: Number(wp('7%')),
    marginRight: Number(wp('7%')),
    padding: Number(wp('5%')),
    backgroundColor: colors.greyWhite,
    borderRadius: 10,
    elevation: 5,
  },
  disclosureTitle: {
    color: '#000000',
    fontSize: Number(wp('3.5%')),
    fontWeight: 'bold',
    lineHeight: Number(wp('5%')),
  },
  disclosureDescription: {
    color: colors.greyDark,
    fontSize: Number(wp('3.5%')),
    lineHeight: Number(wp('6%')),
  },
  disclosureButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: Number(wp('3%')),
  },
  disclosureSkipButton: {
    width: Number(wp('20%')),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Number(wp('2%')),
  },
  disclosureSkip: {
    color: colors.primaryBlue,
    fontSize: Number(wp('3.5%')),
    fontWeight: 'bold',
  },
  disclosureAgreeButton: {
    width: Number(wp('30%')),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryBlue,
    borderRadius: 10,
  },
  disclosureAgree: {
    color: colors.greyWhite,
    fontSize: Number(wp('3.5%')),
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ZipcodeInputV1;
