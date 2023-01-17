import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, TouchableOpacity, Image, Text, Platform } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker';
import ArrowDown from './Svg/arrowDown';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import InputLeftLabel from './InputLeftLabel';
import { formats, iso8601ToFormatted } from '../utilis/dateTime';
import {
  convertDateObjectToDateString,
  convertDateStringToLocalTimezoneObject,
  DEFAULT_DOB,
} from '../helpers/functions';
import PickerDropdown from './Picker';

const CARD_SIDES = {
  front: 'frontCard',
  back: 'backCard',
};

const image = require('../assets/plus.png');

const translationPath = 'screens.telehealth.insurance.placeholders';

const relationshipItems = [
  { label: 'Self', value: 'self' },
  { label: 'Spouse', value: 'spouse' },
  { label: 'Child', value: 'child' },
  { label: 'Other', value: 'other' },
];

const InsuranceForm = ({ data, setData, openPreview, openImagePicker }) => {
  const { t } = useTranslation();

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleFrontOfCard = () => {
    if (data.frontCard) {
      openPreview({
        media: { mime_type: 'image', ...data.frontCard },
        type: 'insurance',
        header: t('screens.telehealth.insurance.preview.front'),
        removeCard: () => onRemoveCard(CARD_SIDES.front),
        analyticName: 'LCOVID_Virtual_CardDet',
        openImagePicker: () =>
          openImagePicker({
            type: 'insurance',
            onImagePicked: setImage(CARD_SIDES.front),
            confirmText: t('screens.telehealth.insurance.confirmSelect'),
          }),
      });
    } else {
      openImagePicker({
        type: 'insurance',
        onImagePicked: setImage(CARD_SIDES.front),
        analyticName: 'LCOVID_Virtual_Upload',
        header: t('screens.telehealth.insurance.preview.front'),
        confirmText: t('screens.telehealth.insurance.confirmSelect'),
      });
    }
  };

  const handleBackOfCard = () => {
    if (data.backCard) {
      openPreview({
        media: { mime_type: 'image', ...data.backCard },
        type: 'insurance',
        header: t('screens.telehealth.insurance.preview.back'),
        removeCard: () => onRemoveCard(CARD_SIDES.back),
        analyticName: 'LCOVID_Virtual_Preview',
        openImagePicker: () =>
          openImagePicker({
            type: 'insurance',
            onImagePicked: setImage(CARD_SIDES.back),
            confirmText: t('screens.telehealth.insurance.confirmSelect'),
          }),
      });
    } else {
      openImagePicker({
        type: 'insurance',
        onImagePicked: setImage(CARD_SIDES.back),
        header: t('screens.telehealth.insurance.preview.back'),
        analyticName: 'LCOVID_Virtual_Upload',
        confirmText: t('screens.telehealth.insurance.confirmSelect'),
      });
    }
  };

  const onRemoveCard = (cardSide) => {
    setData({
      ...data,
      [cardSide]: null,
    });
  };

  const setImage = (cardSide) => (card) => {
    setData({ ...data, [cardSide]: card });
    // uploadCardSide(card, cardSide);
  };

  const renderCardComponentContent = (cardImage) =>
    cardImage ? (
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: cardImage.thumbUri || cardImage.uri }}
          style={styles.image}
          resizeMode='contain'
        />
      </View>
    ) : (
      <View style={styles.iconContainer}>
        <Image source={image} style={styles.icon} />
      </View>
    );

  const CardComponent = ({ text, onPress, cardImage }) => (
    <TouchableOpacity style={styles.cardButton} onPress={onPress}>
      {renderCardComponentContent(cardImage)}
      <Text style={styles.cardText}>{text}</Text>
    </TouchableOpacity>
  );

  const confirmDOB = (value) => {
    setData({
      ...data,
      birthDay: convertDateObjectToDateString(value),
    });
    setDatePickerVisible(false);
  };

  return (
    <View>
      <InputLeftLabel
        value={data.insuranceName}
        action={(value) =>
          setData({
            ...data,
            insuranceName: value,
          })
        }
        placeholder={t(`${translationPath}.insuranceName`)}
      />
      <InputLeftLabel
        value={data.firstName}
        action={(value) =>
          setData({
            ...data,
            firstName: value,
          })
        }
        placeholder={t(`${translationPath}.firstName`)}
      />
      <InputLeftLabel
        value={data.lastName}
        action={(value) =>
          setData({
            ...data,
            lastName: value,
          })
        }
        placeholder={t(`${translationPath}.lastName`)}
      />
      <TouchableOpacity style={styles.inputContainer} onPress={() => setDatePickerVisible(true)}>
        <Text allowFontScaling={false} style={styles.inputValue}>
          {iso8601ToFormatted(data.birthDay, formats.fullLongDate)}
        </Text>
        <ArrowDown style={styles.inputArrow} />
        <Text allowFontScaling={false} style={styles.inputLabel}>
          {t(`${translationPath}.birthDay`)}
        </Text>
      </TouchableOpacity>
      <PickerDropdown
        value={data.relationship}
        style={styles.picker}
        onChange={(label) =>
          setData({
            ...data,
            relationship: label,
          })
        }
        placeholder={t(`${translationPath}.relationship`)}
        items={relationshipItems}
      />
      <InputLeftLabel
        value={data.memberId}
        action={(value) =>
          setData({
            ...data,
            memberId: value,
          })
        }
        placeholder={t(`${translationPath}.id`)}
      />
      <View style={styles.cardContainer}>
        <CardComponent
          text={t(`${translationPath}.front`)}
          onPress={handleFrontOfCard}
          cardImage={data.frontCard}
          side={CARD_SIDES.front}
        />
        <View style={styles.spacer} />
        <CardComponent
          text={t(`${translationPath}.back`)}
          onPress={handleBackOfCard}
          cardImage={data.backCard}
          side={CARD_SIDES.back}
        />
      </View>
      <DatePicker
        modal
        mode='date'
        open={isDatePickerVisible}
        date={convertDateStringToLocalTimezoneObject(DEFAULT_DOB)}
        onConfirm={(value) => confirmDOB(value)}
        onCancel={() => setDatePickerVisible(false)}
        maximumDate={new Date()}
      />
    </View>
  );
};

export default InsuranceForm;

const styles = StyleSheet.create({
  picker: {
    maxHeight: hp('8.5%'),
    minHeight: hp('8.5%'),
    backgroundColor: '#fff',
  },
  cardContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  spacer: {
    width: 14,
  },
  cardButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderColor: colors.greyLight,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 14,
    height: 14,
  },
  image: {
    width: 80,
    height: 40,
  },
  iconContainer: {
    flex: 1,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryPavement,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imageContainer: {
    flex: 1,
  },
  cardText: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
    lineHeight: 19,
  },
  inputContainer: {
    borderRadius: 16,
    height: 68,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: colors.greyLight,
    marginTop: 10,
    marginBottom: 15,
    borderWidth: 1,
    backgroundColor: colors.greyWhite,
  },
  inputLabel: {
    position: 'absolute',
    left: '3.5%',
    color: colors.black,
    fontSize: fonts.sizeSmall,
    top: Platform.select({ ios: '10.3%', android: '15%' }),
  },
  inputArrow: { position: 'absolute', right: '4%' },
  inputValue: {
    marginLeft: 12,
    marginTop: 6,
    color: colors.greyMidnight,
    fontSize: fonts.sizeLarge,
  },
});
