import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Flashlight({ color = '#fff', ...props }) {
  return (
    <Svg
      width={10}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M0 0v11h3v9l7-12H6l4-8H0z" fill={color} />
    </Svg>
  );
}

export default Flashlight;
