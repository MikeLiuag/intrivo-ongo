import React, { useState, useRef, useEffect } from 'react';
import { Animated, Platform, Text, View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import Spinner from 'react-native-loading-spinner-overlay';
import CaptureControl from '../components/scanner/CaptureControl';
import Mask from '../components/scanner/Mask';
import RetryMessage from '../components/scanner/RetryMessage';
import { prepareRatio, resizePhoto } from '../utils/functions';
import { apiPostPicture } from '../utils/api';
import parseForVars from '../utils/parser';

const TakePhotoV1 = ({ args, vars, onAction = () => null }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [mockOpacity] = useState(new Animated.Value(0));
  const [mockScale] = useState(new Animated.Value(1));
  const [mockRotate] = useState(new Animated.Value(-1));
  const [retryMessageOpacity] = useState(new Animated.Value(1));
  const [captureEnabled, setCaptureEnabled] = useState(false);
  const [retryMessageText, setRetryMessageText] = useState('');

  // State machine values
  const [numberOfRetries, setNumberOfRetries] = useState(1);

  // Camera
  // https://stackoverflow.com/questions/58634905/camera-preview-in-expo-is-distorted
  const cameraRef = useRef();
  const [imagePadding, setImagePadding] = useState(0);
  const [cameraRatio, setRatio] = useState('4:3'); // default is 4:3
  const [isRatioSet, setIsRatioSet] = useState(false);

  const showAnimation = numberOfRetries === 1;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [setHasPermission]);

  const onCameraReady = async () => {
    if (!isRatioSet && Platform.OS === 'android') {
      const ratios = await cameraRef.current.getSupportedRatiosAsync();
      const { remainder, desiredRatio } = await prepareRatio(ratios);
      // set the preview padding and preview ratio
      setImagePadding(remainder / 2);
      setRatio(desiredRatio);

      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }

    setIsCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 1.0, base64: true, skipProcessing: true };
      const photo2 = await cameraRef.current.takePictureAsync(options);
      setProcessing(true);
      setCaptureEnabled(false);
      cameraRef.current.pausePreview();
      const resizedPhoto2 = await resizePhoto(photo2);

      onAction({ image: { base64: resizedPhoto2.base64 } });
    }
  };

  if (hasPermission === null) {
    return <View style={styles.view} />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.view}>
      <Camera
        ratio={cameraRatio}
        style={{ flex: 1, marginTop: imagePadding, marginBottom: imagePadding }}
        ref={cameraRef}
        type={Camera.Constants.Type.back}
        flashMode={Camera.Constants.FlashMode.on}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.warn('camera error', error);
        }}
        visible={false}
      />

      {args.capture_frame === 'ongo' ? (
        <Mask mockOpacity={mockOpacity} mockScale={mockScale} mockRotate={mockRotate} />
      ) : (
        <View style={styles.view} />
      )}

      <RetryMessage retryMessageOpacity={retryMessageOpacity} retryMessageText={retryMessageText} />

      <CaptureControl
        mockOpacity={mockOpacity}
        mockScale={mockScale}
        mockRotate={mockRotate}
        remainingLabel={parseForVars(args.left_text, vars)}
        isCameraReady={isCameraReady}
        captureEnabled={captureEnabled}
        setCaptureEnabled={setCaptureEnabled}
        retryMessageOpacity={retryMessageOpacity}
        setRetryMessageText={setRetryMessageText}
        instructions={args.instructions}
        showAnimation={showAnimation}
        takePicture={takePicture}
      />

      <Spinner visible={processing} textContent='Processing...' textStyle={{ color: 'white' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});

export default TakePhotoV1;
