import React from 'react';
import { View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import QuizLoader from '../../QuizLoader';
import LeftArrowSvg from '../../Svg/arrowLeft';
import CloseSvg from '../../Svg/close';
import parseForVars from '../utils/parser';
import FormattedText from './formattedText';

const ARROW_SIZE = 20;
const X_SIZE = 14;

const Header = ({
  onExit,
  onBack,
  styles: styleProp,
  title,
  hideBackButton = false,
  enableBackButton = true,
  compInsteadTitle,
  progres,
  vars,
}) => {
  const renderAlert = () => {
    const alertTitleText = 'Are you sure you want to exit?';
    const alertSubtitleText = '';
    Alert.alert(alertTitleText, alertSubtitleText, [
      {
        text: 'Yes',
        onPress: onExit,
      },
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={[styles.header, styleProp]}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={onBack} disabled={!enableBackButton}>
          {!hideBackButton && <LeftArrowSvg width={ARROW_SIZE} height={ARROW_SIZE} />}
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        {title && !compInsteadTitle ? (
          <FormattedText style={styles.title}>{parseForVars(title, vars)}</FormattedText>
        ) : null}
        {compInsteadTitle && <QuizLoader progres={progres} />}
      </View>
      <TouchableOpacity onPress={renderAlert} style={styles.closeContainer}>
        <CloseSvg width={X_SIZE} height={X_SIZE} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 10,
    marginHorizontal: 12,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 30,
    color: '#000000',
    flexWrap: 'wrap',
    fontFamily: 'Museo_700',
  },
  closeContainer: {
    marginHorizontal: 12,
  },
});
