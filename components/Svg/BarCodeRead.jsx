import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function BarCodeRead({ isRead, ...props }) {
  return (
    <Svg
      width={230}
      height={230}
      viewBox="0 0 178 176"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M77.83 0H16C7.163 0 0 7.163 0 16v62h4V16C4 9.373 9.373 4 16 4h61.83V0zm0 171.42H16c-6.627 0-12-5.372-12-12V97H0v62.42c0 8.837 7.163 16 16 16h61.83v-4zm21.62 4v-4H162c6.627 0 12-5.372 12-12V97h4v62.42c0 8.837-7.163 16-16 16H99.45zM99.45 4V0H162c8.837 0 16 7.163 16 16v62h-4V16c0-6.627-5.373-12-12-12H99.45z"
        fill="#fff"
      />
      {isRead && (
        <Path
          d="M4 36.393L27.95 47 62 4"
          stroke="#fff"
          strokeWidth={8}
          x={55}
          y={55}
          strokeLinecap="round"
        />
      )}
    </Svg>
  );
}

export default BarCodeRead;
