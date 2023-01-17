import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function GalleryIconSvg() {
  return (
    <Svg width={48} height={48} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle cx={24} cy={24} r={24} fill="#1279BD" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33 17v14c0 1.1-.9 2-2 2H17c-1.1 0-2-.9-2-2V17c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zM23 28.51l-2.1-2.53a.493.493 0 00-.78.02l-2.49 3.2c-.26.33-.03.81.39.81h11.99a.5.5 0 00.4-.8l-3.51-4.68c-.2-.27-.6-.27-.8-.01L23 28.51z"
        fill="#fff"
      />
    </Svg>
  );
}

export default GalleryIconSvg;
