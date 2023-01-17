import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Dimensions, Platform, View } from 'react-native';
import { Camera } from 'expo-camera';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImageManipulator from 'expo-image-manipulator';
import { CameraType } from 'expo-camera/build/Camera.types';
import { useFocusEffect } from '@react-navigation/native';
import CaptureControl from './CaptureControl';
import CameraCheck from '../../screens/CameraCheck';
import VaccineMask from '../VaccinateMask';
import TestMask from '../TestMask';
import { CARD_MASK_HEIGHT, CARD_MASK_WIDTH } from '../Svg/CardCameraMask';

const IS_ANDROID = Platform.OS === 'android';
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;

const CAMERA_WIDTH = WINDOW_WIDTH;
const CAMERA_HEIGHT = (WINDOW_WIDTH / 3) * 4;

// We make a formula for the ratio of the camera screen to the mask.
// Camera height to 1 as mask height to unknown.
// Therefore, we multiply the height of the mask by 1 and divide by the height of the camera,
// so we get the ratio of the height of the mask to the height of the camera
// same for width
const MASK_WIDTH_PERCENTAGE = CARD_MASK_WIDTH / CAMERA_WIDTH;
const MASK_HEIGHT_PERCENTAGE = CARD_MASK_HEIGHT / CAMERA_HEIGHT;

// Previously, we equated the height of the camera to 1
// and found the ratio of the height of the mask to the height of the camera.
// Now we subtract from 1 the height of the mask and divide it in half (because the mask is in the middle of the camera screen).
// From this, we get the indentation from the top of the camera to the mask
const LEFT_MARGIN_PERCENTAGE = (1 - MASK_WIDTH_PERCENTAGE) / 2;
const TOP_MARGIN_PERCENTAGE = (1 - MASK_HEIGHT_PERCENTAGE) / 2;

const resizePhoto = async (photo) => {
  let photoWidth = photo.width;
  let photoHeight = photo.height;

  // It seems that android reverses height and width in portrait mode
  if (IS_ANDROID) {
    photoWidth = photo.height;
    photoHeight = photo.width;
  }

  // Algorithm requires that picture is of width 500, so no reason to send larger picture.
  const resizeWidth = 500;
  let resizeObject = {};
  if (resizeWidth < photoWidth) {
    resizeObject = {
      resize: {
        width: resizeWidth,
      },
    };
  } else {
    resizeObject = {
      resize: {
        width: photoWidth,
        height: photoHeight,
      },
    };
  }

  const cropObject = {
    crop: {
      originX: photoWidth * LEFT_MARGIN_PERCENTAGE,
      originY: photoHeight * TOP_MARGIN_PERCENTAGE,
      width: photoWidth * MASK_WIDTH_PERCENTAGE,
      height: photoHeight * MASK_HEIGHT_PERCENTAGE,
    },
  };

  const manipulateArray = [cropObject, resizeObject];
  const resizedPhoto = await ImageManipulator.manipulateAsync(photo.uri, manipulateArray, {
    compress: 1,
    format: 'png',
    base64: true,
  });
  return resizedPhoto;
};

const Scanner = ({
  onCaptureImage = () => null,
  onCancel,
  maskType,
  testMask,
  needToResize,
  quality = 1.0,
  maskDescription,
  leftButtonTitle,
  resetAfterCapture,
  imageLoading,
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [captureEnabled, setCaptureEnabled] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (processing) {
        setProcessing(false);
      }
    }, [processing])
  );

  const onCameraPermission = () => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  };

  // Camera
  // https://stackoverflow.com/questions/58634905/camera-preview-in-expo-is-distorted
  const cameraRef = useRef();
  // const [imagePadding, setImagePadding] = useState(0);
  const [cameraRatio, setRatio] = useState('4:3'); // default is 4:3
  const [isFlashlight, setIsFlashlight] = useState(false);

  const resetAfterSuccessCapture = () => {
    cameraRef.current.resumePreview();
    setCaptureEnabled(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        setProcessing(true);
        const options = { quality, base64: true, skipProcessing: true };
        const photo2 = await cameraRef.current.takePictureAsync(options);
        cameraRef.current.pausePreview();
        if (needToResize) {
          const resizedPhoto2 = await resizePhoto(photo2, maskType);
          setCaptureEnabled(false);
          setProcessing(false);
          onCaptureImage(resizedPhoto2);
        } else {
          setCaptureEnabled(false);
          setProcessing(false);
          onCaptureImage(photo2);
        }
        if (resetAfterCapture) resetAfterSuccessCapture();
      } catch (err) {
        cameraRef.current.resumePreview();
        setProcessing(false);
        console.log(err, '*** take pickture error');
      }
    }
  };

  const changeFlashlight = () => {
    setIsFlashlight((s) => !s);
  };

  if (hasPermission === false) return <CameraCheck onCameraPermission={onCameraPermission} />;
  return (
    <View
      style={{
        backgroundColor: '#222222',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {testMask && <TestMask />}
      {hasPermission ? (
        <Camera
          ratio={cameraRatio}
          style={styles.cameraConitaner}
          ref={cameraRef}
          type={maskType === 'selfie' ? CameraType.front : CameraType.back}
          autoFocus={Camera.Constants.AutoFocus.on}
          flashMode={isFlashlight ? 'on' : 'off'}
        >
          {maskType && <VaccineMask description={maskDescription} type={maskType} />}
        </Camera>
      ) : (
        <View style={[styles.cameraConitaner, { backgroundColor: 'black' }]} />
      )}
      <CaptureControl
        captureEnabled={captureEnabled && !imageLoading}
        takePicture={takePicture}
        onCancel={onCancel}
        onFlashlight={changeFlashlight}
        isFlashlight={isFlashlight}
        title={testMask}
        leftButtonTitle={leftButtonTitle}
        bottomViewStyle={styles.captureViewStyle}
      />

      <Spinner visible={processing} textContent='Processing...' textStyle={{ color: 'white' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  cameraConitaner: {
    marginTop: (WINDOW_HEIGHT - CAMERA_HEIGHT) / 2,
    width: CAMERA_WIDTH,
    height: CAMERA_HEIGHT,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureViewStyle: {
    flexDirection: 'column-reverse',
    height: '20%',
    paddingBottom: 25,
    justifyContent: 'space-between',
  },
});

export default Scanner;
