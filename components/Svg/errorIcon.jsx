import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26" {...props}>
      <Path
        fill="#EB5757"
        d="M13 0A13 13 0 00.25 15.536a12.995 12.995 0 003.558 6.655 12.996 12.996 0 0020-1.967A13.007 13.007 0 0017.974.989 13.008 13.008 0 0013 0zm0 23.399A10.4 10.4 0 012.6 13a10.295 10.295 0 012.197-6.37l14.572 14.573A10.283 10.283 0 0113 23.399zm8.201-4.03L6.63 4.797A10.293 10.293 0 0113 2.6a10.396 10.396 0 0110.399 10.399 10.284 10.284 0 01-2.198 6.37z"
      />
    </Svg>
  );
}

export default SvgComponent;
