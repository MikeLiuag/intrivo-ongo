import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Fish = (props) => (
  <Svg
    width={20}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m19.05 14.56-17.97.94L1 14l17.98-.94.07 1.5ZM19 16.48H1v1.5h18v-1.5ZM20 2v7c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0h16c1.1 0 2 .9 2 2Zm-2 1c-1.68 0-3.04.98-3.21 2.23-.64-.73-2.73-2.73-6.54-2.73-4.67 0-6.75 3-6.75 3s2.08 3 6.75 3c3.81 0 5.9-2 6.54-2.73C14.96 7.02 16.32 8 18 8V3Z"
      fill="#323232"
    />
  </Svg>
)

export default Fish