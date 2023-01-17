import * as React from 'react';
import Svg, { Rect } from 'react-native-svg';

const BurgerMenu = () => (
  <Svg width={33} height={27} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Rect width={32.508} height={5.832} rx={2} fill="#224BA0" />
    <Rect y={10.584} width={32.508} height={5.832} rx={2} fill="#224BA0" />
    <Rect y={21.168} width={32.508} height={5.832} rx={2} fill="#224BA0" />
  </Svg>
);

export default BurgerMenu;
