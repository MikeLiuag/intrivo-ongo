import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={35}
      height={35}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.547 9.88L18.667 8l-8 8 8 8 1.88-1.88L14.44 16l6.107-6.12z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
