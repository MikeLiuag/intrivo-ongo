import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HeartSvg(props) {
  return (
    <Svg
      width={35}
      height={35}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -2 35 30"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.58 18.08l.01.012-12.777 11.627L3.995 17.432C-.107 13.785-.174 7.397 3.85 3.664a9.3 9.3 0 0112.979.325l.415.426c3.545-4.57 10.299-4.998 14.391-.906 3.877 3.877 3.731 10.206-.32 13.9l-.737.671z"
        fill="#fff"
      />
    </Svg>
  )
}

export default HeartSvg
