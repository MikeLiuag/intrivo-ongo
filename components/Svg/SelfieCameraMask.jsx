import * as React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const SELFIE_MASK_WIDTH = 320;
export const SELFIE_MASK_HEIGHT = 316;
const SelfieCameraMask = ({ conteinerStyle, textStyle }) => (
  <View style={conteinerStyle}>
    <Text style={textStyle}>Selfie</Text>
    <Svg
      width={SELFIE_MASK_WIDTH}
      height={SELFIE_MASK_HEIGHT}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M139.662 0H16C7.163 0 0 7.163 0 16v124.508h4V16C4 9.373 9.373 4 16 4h123.662V0Zm0 312H16c-6.627 0-12-5.373-12-12V174.735H0V300c0 8.837 7.163 16 16 16h123.662v-4Zm38.795 4v-4h124.956c6.628 0 12-5.373 12-12V174.735h4V300c0 8.837-7.163 16-16 16H178.457Zm0-312V0h124.956c8.837 0 16 7.163 16 16v124.508h-4V16c0-6.627-5.372-12-12-12H178.457Z'
        fill='#fff'
      />
    </Svg>
  </View>
);

export default SelfieCameraMask;
