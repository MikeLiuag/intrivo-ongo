import * as React from "react"
import Svg, { Path, Ellipse } from "react-native-svg"

const RateHeader = () => (
  <Svg
    width={303}
    height={76}
  >
    <Path fill="#2A4D9B" d="M303 0h-75.75v76H303z" />
    <Path
      d="M303 38c0 20.987-16.957 38-37.875 38S227.25 58.987 227.25 38s16.957-38 37.875-38S303 17.013 303 38ZM151.5 0H75.75v76h75.75z"
      fill="#7DCBF2"
    />
    <Path
      d="M111.789 37.474 75.749 0v76H151.5l-39.711-38.526Z"
      fill="#2A4D9B"
    />
    <Path fill="#F6C34C" d="M75.75 0H0v76h75.75z" />
    <Ellipse cx={37.875} cy={38} rx={37.875} ry={38} fill="#CB514C" />
    <Path fill="#CB514C" d="M227.249 0h-37.507v76h37.507z" />
    <Path fill="#F6C34C" d="M189.007 0H151.5v76h37.507z" />
    <Ellipse cx={189.375} cy={38} rx={37.875} ry={38} fill="#CB514C" />
    <Path
      d="M227.249 38.369H151.5c0 20.783 16.957 37.63 37.875 37.63 20.917 0 37.874-16.847 37.874-37.63Z"
      fill="#F0BAA9"
    />
    <Path
      d="M189.007 0v76C168.292 76 151.5 58.987 151.5 38s16.792-38 37.507-38Z"
      fill="#EC8950"
    />
  </Svg>
)

export default RateHeader