import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.333 8l-1.88 1.88L17.56 16l-6.107 6.12 1.88 1.88 8-8-8-8z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
