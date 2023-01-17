import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 17.792l-1.208-1.1C4.5 12.8 1.667 10.233 1.667 7.083 1.667 4.517 3.683 2.5 6.25 2.5A4.99 4.99 0 0110 4.242 4.99 4.99 0 0113.75 2.5c2.567 0 4.583 2.017 4.583 4.583 0 3.15-2.833 5.717-7.125 9.617L10 17.792z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
