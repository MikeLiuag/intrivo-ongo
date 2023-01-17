import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 3c0 .55.45 1 1 1h1l3.598 7.59-1.35 2.44c-.73 1.34.23 2.97 1.75 2.97h10.996c.55 0 1-.45 1-1s-.45-1-1-1H7.998l1.1-2h7.447c.75 0 1.41-.41 1.749-1.03l3.579-6.49a.996.996 0 00-.87-1.48H6.208l-.67-1.43A.992.992 0 004.64 2h-1.64C2.45 2 2 2.45 2 3zm5.995 15a2 2 0 000 4C9.098 22 10 21.1 10 20s-.902-2-2.005-2zM16 20a2 2 0 011.995-2c1.103 0 2.005.9 2.005 2s-.902 2-2.005 2A2 2 0 0116 20z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
