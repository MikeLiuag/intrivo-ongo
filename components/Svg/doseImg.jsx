import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DoseImg(props) {
  return (
    <Svg
      width={18}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 2h-4.18C11.4.84 10.3 0 9 0 7.7 0 6.6.84 6.18 2H2C.9 2 0 2.9 0 4v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM3.7 12.7l2.59 2.59c.39.39 1.03.39 1.41 0l6.59-6.59a.996.996 0 10-1.41-1.41L7 13.17l-1.89-1.88A.996.996 0 103.7 12.7z"
        fill="#fff"
      />
    </Svg>
  )
}

export default DoseImg;
