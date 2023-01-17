import * as React from "react"
import Svg, {
  G,
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const IncreaseHighVitamin = (props) => (
  <Svg
    width={221}
    height={124}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M197 110c0-47.496-38.504-86-86-86s-86 38.504-86 86h172Z"
        fill="#fff"
      />
    </G>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M185 109.618v-.118H36C36 68.355 69.355 35 110.5 35S185 68.355 185 109.5v.118Z"
      fill="url(#b)"
      fillOpacity={0.6}
    />
    <Circle cx={5.5} cy={109.5} r={5.5} fill="#2A4D9B" />
    <Circle cx={215.5} cy={109.5} r={5.5} fill="#EFEFEF" />
    <Circle cx={212.5} cy={85.5} r={5.5} fill="#EFEFEF" />
    <Circle cx={204.5} cy={62.5} r={5.5} fill="#2A4D9B" />
    <Circle cx={190.5} cy={42.5} r={5.5} fill="#2A4D9B" />
    <Circle cx={173.5} cy={25.5} r={5.5} fill="#2A4D9B" />
    <Circle cx={154.5} cy={14.5} r={5.5} fill="#2A4D9B" />
    <Circle cx={134.5} cy={7.5} r={5.5} fill="#2A4D9B" />
    <Circle cx={112.5} cy={5.5} r={5.5} fill="#2A4D9B" />
    <Circle cx={90.5} cy={7.5} r={5.5} fill="#2A4D9B" />
    <Circle cx={67.5} cy={14.5} r={5.5} fill="#2A4D9B" />
    <Circle cx={48.5} cy={25.5} r={5.5} fill="#2A4D9B" />
    <Circle cx={30.5} cy={42.5} r={5.5} fill="#2A4D9B" />
    <Circle cx={17.5} cy={62.5} r={5.5} fill="#2A4D9B" />
    <Circle cx={7.5} cy={85.5} r={5.5} fill="#2A4D9B" />
    <G filter="url(#c)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M108.951 119.564c10.854 1.87 21.132-5.204 22.957-15.799 1.824-10.594-5.495-20.699-16.348-22.568a20.196 20.196 0 0 0-11.388 1.312L95.823 80l.67 8.332a19.013 19.013 0 0 0-3.89 8.664c-1.825 10.594 5.494 20.699 16.348 22.568Z"
        fill="#fff"
      />
    </G>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M99.237 93.889c-3.384 7.257-.244 15.885 7.014 19.269 7.258 3.384 15.885.244 19.269-7.013a14.43 14.43 0 0 0 1.08-8.961l3.405-5.69-6.645-.952a14.455 14.455 0 0 0-4.853-3.667c-7.258-3.384-15.885-.244-19.27 7.014Z"
      fill="#2A4D9B"
    />
    <Defs>
      <LinearGradient
        id="b"
        x1={110.5}
        y1={35}
        x2={110.5}
        y2={109.618}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.336} stopColor="#F2F7F9" />
        <Stop offset={1} stopColor="#F2F7F9" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default IncreaseHighVitamin