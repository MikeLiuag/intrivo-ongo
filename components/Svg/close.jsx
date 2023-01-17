import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ color, ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 12 12"
      {...props}
    >
      <Path
        fill={color || '#000000'}
        d="M10.536 11.75L.251 1.462a.854.854 0 010-1.21.854.854 0 011.21 0l10.287 10.286a.858.858 0 010 1.213.857.857 0 01-1.212-.001z"
      />
      <Path
        fill={color || '#000000'}
        d="M.251 11.75a.858.858 0 010-1.213L10.536.251a.858.858 0 011.213 0 .854.854 0 010 1.21L1.462 11.75a.857.857 0 01-1.211 0z"
      />
    </Svg>
  );
}

export default SvgComponent;
