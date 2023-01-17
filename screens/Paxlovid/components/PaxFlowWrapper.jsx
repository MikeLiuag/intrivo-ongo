import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import ScreenWrapper from '../../ScreenWrapper';
import { clearSelections } from '../../../store/paxlovid/slice';
import { colors } from '../../../theme';
import { BlueButton } from '../../../components/Buttons/BlueButton';
import { dimensions } from '../styles';
import { fonts } from '../../../theme/fonts';

const PaxFlowWrapper = ({
  title,
  onBack,
  onExit,
  subtitle,
  children,
  buttonTitle,
  buttonDisabled,
  onPressButton,
  headerTitle,
  headerSubtitle,
  backDisabled,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleRightClick = () => {
    onExit?.();
    dispatch(clearSelections());
    navigation.dispatch({
      ...CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Dashboard',
            state: {
              index: 0,
              routes: [
                {
                  name: 'Timeline',
                },
              ],
            },
          },
        ],
      }),
    });
  };

  const goBack = () => {
    onBack?.();
    navigation.goBack();
  };

  const renderButton = () =>
    buttonTitle &&
    onPressButton && (
      <BlueButton
        title={t(buttonTitle)}
        action={onPressButton}
        style={styles.buttonContainer}
        disabled={buttonDisabled}
        styleText={styles.buttonPrimaryTitle}
      />
    );

  const renderTitle = () =>
    title &&
    subtitle && (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t(title)}</Text>
        <Text style={styles.subtitle}>{t(subtitle)}</Text>
      </View>
    );

  return (
    <ScreenWrapper
      title={t(headerTitle || 'paxlovid.eligibility.title')}
      subtitle={t(headerSubtitle)}
      onBack={!backDisabled && goBack}
      onExit={handleRightClick}
    >
      {renderTitle()}
      <View style={styles.body}>
        {children}
        {renderButton()}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryGhost,
  },
  header: {
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyDark2,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.familyBold,
    color: colors.black,
  },
  subtitle: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyLight,
    color: colors.greyGrey,
    lineHeight: 22,
    marginTop: 11,
  },
  headerSubtitle: {
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyLight,
    color: colors.greyGrey,
    alignSelf: 'center',
    lineHeight: 17,
    marginBottom: 8,
  },
  titleContainer: {
    marginTop: dimensions.pageMarginVertical,
    marginHorizontal: 25,
  },
  buttonContainer: {
    marginVertical: 24,
    marginHorizontal: dimensions.pageMarginHorizontal,
  },
  buttonPrimaryTitle: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyWhite,
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default PaxFlowWrapper;
