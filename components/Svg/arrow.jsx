import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ width, height, ...props }) {
  return (
    <Svg
      width={width || 8}
      height={height || 12}
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        // fillRule="evenodd"
        // clipRule="evenodd"
        d="M7 1L1.75 6L7 11"
        stroke="#222222"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;

{
  /* <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1L1.75 6L7 11" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> */
}
