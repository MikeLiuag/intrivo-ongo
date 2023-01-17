import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { ActivityIndicator } from 'react-native';

function CompletedSaveSvg({ loading, ...props }) {
  return (
    <Svg
      width={67}
      height={67}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={33.5} cy={33.5} r={33.5} fill="#CB514C" />
      <Path
        d="M67 34H0c0 18.225 14.998 33 33.5 33C52.002 67 67 52.225 67 34z"
        fill="#2A4D9B"
      />
      <Path
        d="M33 0v67C14.775 67 0 52.002 0 33.5 0 14.998 14.775 0 33 0z"
        fill="#F6C34C"
      />
    </Svg>
  );
}

export default CompletedSaveSvg;
