import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, View, Text, Platform, StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';
import ImagePickerContainer from '../screens/Paxlovid/components/ImagePickerContainer';

const FormIdentifyTemplate = ({
  translationPath,
  card,
  selfie,
  setSelfie,
  setCard,
  analyticName = '',
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const openImagePickerCard = () => {
    navigation.navigate('FilePicker', {
      type: 'insurance',
      onImagePicked: (image) => setCard(image),
      maskType: 'card',
      maskTitle: t(`${translationPath}.cardMask`),
      title: t(`${translationPath}.cardPickerTitle`),
      needToResize: false,
      analyticName,
    });
  };
  const openImagePickerSelfie = () => {
    navigation.navigate('FilePicker', {
      onImagePicked: (image) => setSelfie(image),
      maskType: 'selfie',
      title: t(`${translationPath}.selfiePickerTitle`),
      needToResize: false,
      analyticName,
    });
  };

  const onCardPress = () => {
    if (card) {
      navigation.navigate('FilePreview', {
        media: { ...card, mime_type: 'image' },
        type: 'insurance',
        analyticName: 'Sniffles_Async_CardDet',
        header: t(`${translationPath}.cardPreviewTitle`),
        removeCard: () => setCard(null),
        openImagePicker: openImagePickerCard,
      });
    } else {
      openImagePickerCard();
    }
  };

  const onSelfiePress = () => {
    if (selfie) {
      navigation.navigate('FilePreview', {
        media: { ...selfie, mime_type: 'image' },
        type: 'insurance',
        analyticName: 'Sniffles_Async_CardDet',
        header: t(`${translationPath}.selfiePreviewTitle`),
        removeCard: () => setSelfie(null),
        openImagePicker: openImagePickerSelfie,
      });
    } else {
      openImagePickerSelfie();
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{t(`${translationPath}.title`)}</Text>
        <Text style={styles.subtitle}>{t(`${translationPath}.subtitle`)}</Text>
        <ImagePickerContainer
          title={card ? t(`${translationPath}.viewIdCard`) : t(`${translationPath}.cardButton`)}
          image={card}
          onPress={onCardPress}
        />
        <ImagePickerContainer
          title={selfie ? t(`${translationPath}.viewSelfie`) : t(`${translationPath}.selfieButton`)}
          image={selfie}
          onPress={onSelfiePress}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default FormIdentifyTemplate;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 25,
  },
  title: {
    fontFamily: 'Museo_700',
    fontSize: 24,
    lineHeight: 36,
    marginTop: 30,
  },
  subtitle: {
    fontFamily: 'Museo_300',
    fontSize: 13,
    lineHeight: 22,
    color: colors.greyDark,
    marginVertical: 20,
  },
});
