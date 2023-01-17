import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default ({color, ...props}) => (
  <Svg
    width={18}
    height={14}
    viewBox="0 0 18 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6 11.17L1.83 7 .41 8.41 6 14 18 2 16.59.59 6 11.17z"
      fill={color || "#fff"}
    />
  </Svg>
);
