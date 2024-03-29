import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SettingsSvg(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.502 10c0 .34-.03.66-.07.98l2.11 1.65c.19.15.24.42.12.64l-2 3.46c-.12.22-.38.31-.61.22l-2.49-1c-.52.39-1.08.73-1.69.98l-.38 2.65c-.03.24-.24.42-.49.42h-4c-.25 0-.46-.18-.49-.42l-.38-2.65c-.61-.25-1.17-.58-1.69-.98l-2.49 1c-.22.08-.49 0-.61-.22l-2-3.46a.505.505 0 01.12-.64l2.11-1.65a7.93 7.93 0 01-.07-.98c0-.33.03-.66.07-.98L.462 7.37a.493.493 0 01-.12-.64l2-3.46c.12-.22.38-.31.61-.22l2.49 1c.52-.39 1.08-.73 1.69-.98l.38-2.65c.03-.24.24-.42.49-.42h4c.25 0 .46.18.49.42l.38 2.65c.61.25 1.17.58 1.69.98l2.49-1c.22-.08.49 0 .61.22l2 3.46c.12.22.07.49-.12.64l-2.11 1.65c.04.32.07.64.07.98zm-11 0c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5-3.5 1.57-3.5 3.5z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SettingsSvg;
