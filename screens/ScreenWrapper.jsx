import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComp from '../components/HeaderComp';
import CloseIcon from '../components/Svg/close';
import DotsIcon from '../components/Svg/dotsIcon';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import { dimensions } from '../theme/dimensions';
import QuizLoader from '../components/QuizLoader';

const ScreenWrapper = ({
  title,
  subtitle,
  progress,
  children,
  navStyle,
  backgroundColor = colors.primaryGhost,
  onBack,
  onExit,
  onPopupMenu,
}) => {
  const renderHeader = () => {
    if (navStyle === 'popup') {
      return (
        <HeaderComp
          left={(onExit || onBack) && 'x'}
          onLeftClick={onExit || onBack}
          addStyle={styles.header}
          center={[title, styles.headerTitle]}
          right={onPopupMenu && [<DotsIcon width={14} height={14} />, onPopupMenu]}
        />
      );
    }

    return (
      <HeaderComp
        left={onBack && 'arrow'}
        onLeftClick={onBack}
        addStyle={styles.header}
        center={[title, styles.headerTitle]}
        centerComp={progress ? () => <QuizLoader progres={progress} /> : null}
        right={onExit && [<CloseIcon width={14} height={14} />, onExit]}
      />
    );
  };

  const renderHeaderSubtitle = () =>
    subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : <></>;

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor }}>
      <View style={{ paddingVertical: 8 }}>
        {renderHeader()}
        {renderHeaderSubtitle()}
      </View>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingLeft: dimensions.pageMarginHorizontal / 2,
    paddingRight: dimensions.pageMarginHorizontal,
    marginTop: Platform.OS === 'android' ? 10 : 0,
  },
  headerTitle: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyDark2,
  },
  title: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyDark2,
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
  },
  titleContainer: {
    marginTop: dimensions.pageMarginVertical,
    marginHorizontal: dimensions.pageMarginHorizontal,
  },
});

export default ScreenWrapper;
