import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const TimelineSvg = () => (
  <Svg width={18} height={18} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <Path
      d='M16 12v4H2v-4h14Zm1-2H1c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1ZM4 15.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5ZM16 2v4H2V2h14Zm1-2H1C.45 0 0 .45 0 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1ZM4 5.5c-.82 0-1.5-.67-1.5-1.5S3.18 2.5 4 2.5s1.5.68 1.5 1.5S4.83 5.5 4 5.5Z'
      fill='#F6C34C'
    />
  </Svg>
);

export default TimelineSvg;
