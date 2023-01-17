import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function InfoSVG() {
  return (
    <Svg width={28} height={28} fill='none' xmlns='http://www.w3.org/2000/svg'>
      <Path
        d='M12.667 18h2.666v2.667h-2.666V18Zm0-10.667h2.666v8h-2.666v-8Zm1.32-6.666C6.627.667.667 6.64.667 14s5.96 13.333 13.32 13.333c7.373 0 13.346-5.973 13.346-13.333S21.36.667 13.987.667Zm.013 24C8.107 24.667 3.333 19.893 3.333 14S8.107 3.333 14 3.333 24.667 8.107 24.667 14 19.893 24.667 14 24.667Z'
        fill='#224BA0'
      />
    </Svg>
  );
}

export default InfoSVG;
