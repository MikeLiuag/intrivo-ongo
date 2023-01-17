import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { BlueButton } from '../../components/Buttons/BlueButton';
import HeaderComp from '../../components/HeaderComp';
import InputLeftLabel from '../../components/InputLeftLabel';
import ArrowDown from '../../components/Svg/arrowDown';
import { colors } from '../../theme';
import { createEvent } from '../../store/events/slice';
import LoaderComp from '../../components/LoaderComp';
import EventDetailsSvg from '../../components/Svg/eventDetail';

import { LogEvent } from '../../analytics';
import { iso8601ToFormatted, formats } from '../../utilis/dateTime';

const DatePicker = Platform.OS !== 'web' ? require('react-native-date-picker').default : View;

const CreateEvent = ({ route }) => {
  const [data, setData] = useState({
    name: '',
    date: '',
    time: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isLoading] = useState(false);

  const { promoCode } = route.params || {};

  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    LogEvent('TGCreate_screen');
  }, []);

  const onDateChange = (selectedDate) => {
    setShowDatePicker(false);
    setData((s) => ({ ...s, date: selectedDate, time: null }));
  };

  const onTimeChange = (selectedTime) => {
    setShowTimePicker(false);
    setData((s) => ({ ...s, date: selectedTime, time: selectedTime }));
  };

  const saveEvent = async () => {
    LogEvent('TGCreate_click_Continue');
    const dateTime = `${new Date(data.date).toISOString().substring(0, 19)}Z`;
    const response = await dispatch(
      createEvent({
        promoCode,
        data: {
          description: data.name,
          start_time: dateTime,
          end_time: dateTime,
        },
      })
    );
    if (response?.type.includes('fulfilled')) {
      navigation.navigate('TestQuantity', {
        event: response.payload,
      });
    }
  };

  const isValidData = data.name?.length < 1 || !data.date || !data.time;

  const handleBack = () => {
    LogEvent('TGCreate_click_Back');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <HeaderComp
          left='arrow'
          onLeftClick={handleBack}
          center={[
            t('event.createEvent.title'),
            {
              fontSize: 16,
              color: 'black',
              fontFamily: 'Museo_700',
              lineHeight: 30,
              marginLeft: -15,
            },
          ]}
        />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={{ alignItems: 'center' }}>
            <EventDetailsSvg />
          </View>
          <Text style={styles.moreTitle}>{t('event.createEvent.moreTitle')}</Text>
          <Text style={styles.moreSubtitle}>
            {t('event.createEvent.moreSubtitle')}
            <Text
              style={styles.moreSubtitleLink}
              onPress={() => {
                LogEvent('TGCreate_click_More');
                navigation.navigate('EventMoreInfo');
              }}
            >
              {t('event.createEvent.moreSubtitleLink')}
            </Text>
          </Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitle}>{t('event.createEvent.question')}</Text>
          <InputLeftLabel
            placeholder={t('event.createEvent.name')}
            value={data.name}
            action={(value) => setData((current) => ({ ...current, name: value }))}
            notTrimWhenKeyboardIsHide
          />
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => {
              Keyboard.dismiss();
              setShowDatePicker(true);
            }}
          >
            <Text allowFontScaling={false} style={styles.inputValue}>
              {data.date ? iso8601ToFormatted(data.date?.toISOString(), formats.fullLongDate) : ''}
            </Text>
            <ArrowDown style={styles.downArrow} />
            <Text allowFontScaling={false} style={styles.inputTitle}>
              {t('event.createEvent.date')}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            textColor='#000'
            onConfirm={onDateChange}
            onCancel={() => {
              setShowDatePicker(false);
            }}
            date={new Date()}
            mode='date'
            confirmTextIOS='Done'
            open={showDatePicker}
            locale='en'
            // maximumDate={new Date().setFullYear(new Date().getFullYear())}
          />
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => {
              Keyboard.dismiss();
              setShowTimePicker(true);
            }}
          >
            <Text allowFontScaling={false} style={styles.inputValue}>
              {data.time ? iso8601ToFormatted(data.date.toISOString(), formats.time12Hour) : ''}
            </Text>
            <ArrowDown style={styles.downArrow} />
            <Text allowFontScaling={false} style={styles.inputTitle}>
              {t('event.createEvent.time')}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            textColor='#000'
            onConfirm={onTimeChange}
            onCancel={() => {
              setShowTimePicker(false);
            }}
            date={data.date || new Date()}
            mode='time'
            confirmTextIOS='Done'
            open={showTimePicker}
          />
          <View style={styles.noteContainer}>
            <Text style={styles.noteTextBold}>
              {t('event.createEvent.limitTitle')}
              <Text style={styles.noteText}>{t('event.createEvent.limitSubtitle')}</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      <BlueButton
        title={t('event.createEvent.button')}
        action={saveEvent}
        style={{ marginHorizontal: 24, marginBottom: 10 }}
        styleText={styles.whiteText}
        disabled={isValidData}
      />

      {isLoading && <LoaderComp />}
    </SafeAreaView>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    paddingVertical: 18,
    paddingHorizontal: 26,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 24,
    marginHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    borderRadius: 16,
    height: 74,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.greyLight,
    marginBottom: 8,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  inputTitle: {
    position: 'absolute',
    left: wp('3.5%'),
    top: Platform.OS === 'ios' ? '10.3%' : '15%',
    color: '#999',
    fontSize: 13,
  },
  inputValue: {
    position: 'absolute',
    left: '4%',
    top: Platform.OS === 'ios' ? '56%' : '49%',
    fontSize: 16,
  },
  downArrow: {
    position: 'absolute',
    right: '4%',
  },
  fieldContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  whiteText: {
    fontFamily: 'Museo_500',
    fontSize: 16,
  },
  fieldTitle: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 24,
    color: colors.greyMed,
  },
  moreTitle: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 16,
    marginTop: 16,
  },
  moreSubtitle: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 4,
    color: colors.greyMed,
  },
  moreSubtitleLink: {
    color: colors.primaryBlue,
  },
  noteContainer: {
    marginTop: 24,
  },
  noteTextBold: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyMed,
  },
  noteText: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyMed,
  },
});
