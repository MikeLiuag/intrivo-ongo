import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function Loader3(props) {
  return (
    <Svg
      width={26}
      height={26}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={13} cy={13} fill="#CB514C" r={13} />
      <Path
        d="M26 13.126H0C0 20.236 5.82 26 13 26s13-5.764 13-12.874z"
        fill="#F0BAA9"
      />
      <Path
        d="M12.874 0v26C5.764 26 0 20.18 0 13S5.764 0 12.874 0z"
        fill="#EC8950"
      />
    </Svg>
  )
}

export default Loader3
