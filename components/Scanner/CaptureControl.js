import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import Flashlight from '../Svg/flashlight';

const ViewContainer = styled.View`
  position: absolute;
  /* bottom: 0; */
  /* justify-content: space-between; */
`;

const ViewTop = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  min-height: 138;
  margin-bottom: auto;
  background-color: #222222;
  padding-left: 31;
`;

const ViewBottom = styled.View`
  flex-direction: row;
  width: 100%;
  /* justify-content: space-around; */
  align-items: center;
  padding-bottom: 50;
  background-color: #222222;
`;

const CaptureButton = styled.TouchableOpacity`
  background-color: #f5f6f5;
  height: 60;
  width: 60;
  border-radius: 60;
  border-color: #000000;
  border-width: 3;
  z-index: 10000;
`;
const CaptureButtonBackground = styled.View`
  background-color: #f5f6f5;
  height: 76;
  width: 76;
  border-radius: 76;
  z-index: 0;
  align-items: center;
  justify-content: center;
`;

const CaptureControl = ({
  takePicture,
  captureEnabled,
  onCancel,
  onFlashlight,
  isFlashlight = false,
  title,
  children,
  leftButtonTitle,
  bottomViewStyle,
  buttonContainerStyle,
}) => {
  const buttonOpacity = captureEnabled ? 1 : 0.5;

  return (
    <ViewContainer style={{ height: '100%', width: '100%' }}>
      <ViewTop>
        <TouchableOpacity onPress={() => onFlashlight()} style={{ flexDirection: 'row', flex: 1 }}>
          <Flashlight color={isFlashlight ? '#fff' : 'grey'} />
          {title && <Text style={styles.title}>Photograph test</Text>}
        </TouchableOpacity>
      </ViewTop>
      {children && <View style={styles.centerContainer}>{children}</View>}
      <ViewBottom style={bottomViewStyle}>
        <TouchableOpacity
          style={[styles.buttonContainer, buttonContainerStyle]}
          onPress={() => onCancel()}
        >
          <Text style={styles.cancelText}>{leftButtonTitle || 'Cancel'}</Text>
        </TouchableOpacity>
        <View style={[styles.buttonContainer, buttonContainerStyle]}>
          <CaptureButtonBackground style={{ opacity: buttonOpacity }}>
            <CaptureButton disabled={!captureEnabled} onPress={takePicture} />
          </CaptureButtonBackground>
        </View>
        <TouchableOpacity
          style={[styles.buttonContainer, buttonContainerStyle]}
          onPress={() => onFlashlight()}
        />
      </ViewBottom>
    </ViewContainer>
  );
};

export default CaptureControl;

const styles = StyleSheet.create({
  cancelText: {
    color: 'white',
    fontFamily: 'Museo_500',
    fontSize: 18,
  },
  centerContainer: { flex: 1 },
  buttonContainer: {
    alignItems: 'center',
  },
  title: {
    marginLeft: 90,
    color: '#fff',
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 30,
  },
});
