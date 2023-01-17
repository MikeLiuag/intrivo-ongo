import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ width, height, style, color }) {
  return (
    <Svg
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 20 22'
      xmlns='http://www.w3.org/2000/svg'
      style={style}
    >
      <Path
        d='M15.4167 12.0002H10V17.4168H15.4167V12.0002ZM14.3333 0.0834961V2.25016H5.66667V0.0834961H3.5V2.25016H2.41667C1.21417 2.25016 0.260833 3.22516 0.260833 4.41683L0.25 19.5835C0.25 20.7752 1.21417 21.7502 2.41667 21.7502H17.5833C18.775 21.7502 19.75 20.7752 19.75 19.5835V4.41683C19.75 3.22516 18.775 2.25016 17.5833 2.25016H16.5V0.0834961H14.3333ZM17.5833 19.5835H2.41667V7.66683H17.5833V19.5835Z'
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
