import { Image } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

export const isFileTypeIsSupported = (selectedFile) =>
  selectedFile.uri.endsWith('.jpg') ||
  selectedFile.uri.endsWith('.jpeg') ||
  selectedFile.uri.endsWith('.png');

export const resizeFile = (file, size) =>
  new Promise((resolve) => {
    Image.getSize(file.uri, (width) => {
      ImageManipulator.manipulateAsync(file.uri, [{ resize: { width: width / size } }], {
        compress: 1,
        format: 'png',
      }).then(resolve);
    });
  });
