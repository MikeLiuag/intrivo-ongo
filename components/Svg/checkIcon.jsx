import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
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
      <Path
        d="M27.626 42.572l-8.293-8.349-2.824 2.823 11.117 11.191 23.866-24.024-2.805-2.823-21.061 21.182z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
