import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ModalWrapper from './ModalWrapper';
import CircleModalBackground from '../Svg/backgroundCircleTopRight';
import RectModalBackground from '../Svg/backgroundRectTopLeft';
import { setAppModalData, setAppModalVisible } from '../../store/app/slice';
import { colors } from '../../theme';
import { BlueButton } from '../Buttons/BlueButton';
import { fonts } from '../../theme/fonts';

const translationPath = 'modals.telehealthCallReady';

const AppModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    app: { isAppModalVisible, isAuthed, appModaldata = {} },
    user: { users, usersLookup },
  } = useSelector(({ app, user }) => ({ app, user }));
  const user = (users[0] && usersLookup[users[0]]) || {};

  const onPressModalBackground = () => {
    dispatch(setAppModalVisible(false));
    dispatch(setAppModalData({}));
  };

  const onPressGetStarted = (callback) => {
    onPressModalBackground();
    callback();
  };

  const renderContent = () => {
    const { title = '', body = '', cta = [] } = appModaldata;

    return (
      <TouchableOpacity activeOpacity={1} style={styles.container}>
        <View style={styles.circleSvg}>
          <CircleModalBackground />
        </View>
        <View style={styles.rectangleSvg}>
          <RectModalBackground />
        </View>
        <View>
          <Text style={styles.title}>{title || t(`${translationPath}.title`)}</Text>
          <Text style={styles.description}>
            {body || `${user?.first_name}, ${t(`${translationPath}.description`)}`}
          </Text>
        </View>
        {cta.length ? (
          <View style={styles.buttonContainer}>
            {cta.map(({ text = '', callback = {} }, idx) => (
              <BlueButton
                title={text || t(`${translationPath}.buttonTitle`)}
                action={() => onPressGetStarted(callback)}
                style={[
                  styles.button,
                  idx === cta.length - 1 && {
                    marginRight: 0,
                  },
                ]}
                key={text}
              />
            ))}
          </View>
        ) : (
          <BlueButton title={t(`${translationPath}.buttonTitle`)} onPress={onPressGetStarted} />
        )}
      </TouchableOpacity>
    );
  };

  const isShow = useMemo(() => isAuthed && isAppModalVisible, [isAuthed, isAppModalVisible]);

  return isShow ? (
    <ModalWrapper onPressBackground={onPressModalBackground}>{renderContent()}</ModalWrapper>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    width: '80%',
    paddingTop: 30,
    borderRadius: 10,
    paddingBottom: 20,
    marginHorizontal: 55,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: fonts.familyBold,
    color: colors.greyMidnight,
  },
  description: {
    marginTop: 16,
    lineHeight: 22,
    marginBottom: 36,
    color: colors.greyDark,
    fontFamily: fonts.familyNormal,
  },
  circleSvg: { position: 'absolute', right: 0 },
  rectangleSvg: { position: 'absolute', top: 50 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginRight: 10,
    // "&:last-child": {
    //   padding: 0
    // },
  },
});

export default AppModal;
