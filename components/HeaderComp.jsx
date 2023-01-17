import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import LeftArrow from './Svg/arrowLeftIcon';
import CloseSvg from './Svg/close';

const HeaderComp = ({
  left,
  onLeftClick,
  center: [title, titleStyle] = [],
  centerComp,
  right: [rightComp, onRightClick, rightBtnStyle] = [],
  closeRight: [closeRightComp, onCloseRightClick, closeRightBtnStyle] = [],
  addStyle,
  color,
}) => {
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  const returnLeft = () => {
    switch (left) {
      case 'arrow':
        return <LeftArrow color={color || '#323232'} />;
      case 'x':
        return <CloseSvg width={14} height={14} color={color || '#323232'} />;
      default:
        return null;
    }
  };

  const returnRight = () => {
    switch (rightComp) {
      case 'x':
        return <CloseSvg width={14} height={14} color={color || '#323232'} />;
      default:
        return rightComp;
    }
  };

  return (
    <View style={{ ...addStyle, ...styles.profileHeader }}>
      <View
        style={{
          flex: 1,
        }}
      >
        {!!left && (
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            style={{
              ...styles.leftStyle,
            }}
            onPress={onLeftClick || goBack}
          >
            {returnLeft()}
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flex: 10, alignItems: 'center' }}>
        {!!title && !centerComp && (
          <Text
            allowFontScaling={false}
            style={{
              ...titleStyle,
              textAlign: 'center',
            }}
          >{`${title}`}</Text>
        )}
        {centerComp && <View style={styles.compStyle}>{centerComp()}</View>}
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        {!!rightComp && (
          <TouchableOpacity
            style={{ ...styles.rightStyle, ...rightBtnStyle }}
            onPress={onRightClick}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            {returnRight()}
          </TouchableOpacity>
        )}
        {!!closeRightComp && (
          <TouchableOpacity
            style={[styles.rightStyle, closeRightBtnStyle]}
            onPress={onCloseRightClick}
          >
            {closeRightComp}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftStyle: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 35,
    minWidth: 35,
    position: 'relative',
    zIndex: 1,
  },
  rightStyle: {
    alignSelf: 'flex-end',
    minHeight: 35,
    minWidth: 35,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  compStyle: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});

export default HeaderComp;
