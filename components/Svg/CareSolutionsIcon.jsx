import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = ({color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={54}
    viewBox="0 0 105 108"
  >
    <Path
      fill={color}
      d="M54 40.6c-9.6 4.1-18.8 8-20.4 8.7l-2.9 1.3 8.2 3.4c8.9 3.6 9.6 4.3 13.2 13.7 1.3 3.5 2.6 6.3 3 6.3.3 0 3.2-6.4 6.4-14.3 3.2-7.8 7.1-17 8.6-20.5 1.5-3.4 2.5-6.2 2.1-6.1-.4 0-8.6 3.4-18.2 7.5z"
    />
  </Svg>
);

export default SvgComponent;
