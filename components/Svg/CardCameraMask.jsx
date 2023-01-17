import * as React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const CARD_MASK_WIDTH = 320;
export const CARD_MASK_HEIGHT = 212;

function CardCameraMask({ conteinerStyle, textStyle, description }) {
  return (
    <View style={conteinerStyle}>
      <Text style={textStyle}>{description || 'Top of card'}</Text>
      <Svg
        width={CARD_MASK_WIDTH}
        height={CARD_MASK_HEIGHT}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <Path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M139.662 0H16C7.163 0 0 7.163 0 16v78.265h4V16C4 9.373 9.373 4 16 4h123.662V0zm0 208H16c-6.627 0-12-5.373-12-12v-78.773H0V196c0 8.837 7.163 16 16 16h123.662v-4zm38.795 4v-4h124.956c6.628 0 12-5.373 12-12v-78.773h4V196c0 8.837-7.163 16-16 16H178.457zm0-208V0h124.956c8.837 0 16 7.163 16 16v78.265h-4V16c0-6.627-5.372-12-12-12H178.457z'
          fill='#fff'
        />
      </Svg>
    </View>
  );
}

export default CardCameraMask;
