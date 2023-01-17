import * as React from 'react';
import Svg, { Path, G, Rect, Circle, Defs, ClipPath } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function helpIcon({
  size = 40,
  backgroundColor = '#1279BD',
  color = '#fff',
  ...props
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={20} cy={20} r={20} fill={backgroundColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27 9.709H13a2 2 0 00-2 2v14c0 1.1.9 2 2 2h4l2.29 2.29c.39.39 1.02.39 1.41 0l2.3-2.29h4c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm-6 14v2h-2v-2h2zm1.17-4.83l.9-.92c.57-.57.93-1.37.93-2.25a4.002 4.002 0 00-7.84-1.13c-.16.56.24 1.12.82 1.12h.3c.39 0 .7-.27.83-.64.27-.78 1.02-1.35 1.89-1.35 1.1 0 2 .9 2 2 0 .55-.22 1.05-.58 1.41l-1.24 1.26c-.61.62-1.03 1.43-1.14 2.34-.07.52.33.98.85.98h.31c.44 0 .79-.33.85-.76.13-.96.54-1.47 1.12-2.06z"
        fill={color}
      />
      <Defs>
        <ClipPath id="prefix__clip0">
          <Rect x={-48} y={-561} width={375} height={812} rx={32} fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default helpIcon;
