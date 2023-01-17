import * as React from 'react';
import Svg, { Circle, Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

export default () => (
  <Svg width='67' height='67' viewBox='0 0 67 67' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <Circle cx='33.5' cy='33.5' r='33.5' fill='#CB514C' />
    <Path
      d='M67 34C67 34 53.7023 34 35.2008 34C16.6993 34 8.02306 34 0 34C0 52.2254 14.9985 67 33.5 67C52.0015 67 67 52.2254 67 34Z'
      fill='#2A4D9B'
    />
    <Path
      d='M33 0C33 0 33 13.2977 33 31.7992C33 50.3007 33 58.9769 33 67C14.7746 67 0 52.0015 0 33.5C0 14.9985 14.7746 0 33 0Z'
      fill='#F6C34C'
    />
    <G clip-path='url(#clip0_5598_30449)'>
      <Path
        d='M27.6262 42.5713L19.3329 34.2228L16.5088 37.0457L27.6262 48.2371L51.4918 24.2125L48.6876 21.3896L27.6262 42.5713Z'
        fill='white'
      />
    </G>
    <Defs>
      <ClipPath id='clip0_5598_30449'>
        <Rect width='48' height='48' fill='white' transform='translate(10 10)' />
      </ClipPath>
    </Defs>
  </Svg>
);
