import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Polygon = ({ black }) => (
  <Svg width={31} height={26} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <Path
      d='M13.818 1.615a2 2 0 0 1 3.364 0l13.223 20.553c.856 1.33-.1 3.082-1.682 3.082H2.277c-1.582 0-2.538-1.751-1.682-3.082L13.818 1.615Z'
      fill={black ? 'black' : '#F8F8FC'}
    />
  </Svg>
);

export default Polygon;
