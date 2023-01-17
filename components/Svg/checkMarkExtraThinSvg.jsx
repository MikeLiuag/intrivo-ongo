import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default ({ color, ...props }) => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 26 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3.81058 10.9031L11.6331 17.8411L22.4548 3.1411"
      stroke={color || '#fff'}
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
