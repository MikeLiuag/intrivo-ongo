import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle cx="10.5" cy="10.5" r="10.5" fill="#EB5757"/>
      <Circle cx="10.5" cy="14.5" r="1.5" fill="white"/>
      <Path d="M9.09357 5.49708C9.04286 4.68582 9.68716 4 10.5 4C11.3128 4 11.9571 4.68582 11.9064 5.49708L11.5624 11.0019C11.5273 11.563 11.0621 12 10.5 12C9.9379 12 9.47268 11.563 9.43762 11.0019L9.09357 5.49708Z" fill="white"/>
    </Svg>
  );
}

export default SvgComponent;
