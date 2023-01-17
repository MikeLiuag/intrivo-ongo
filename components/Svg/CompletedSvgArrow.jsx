import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { ActivityIndicator } from 'react-native';

function CompletedSvgArrow({ loading, ...props }) {
  return (
    <Svg
      width={67}
      height={67}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {!loading ? (
        <Path
          d="M27.626 42.572l-8.293-8.349-2.824 2.823 11.117 11.191 23.866-24.024-2.805-2.823-21.061 21.182z"
          fill="#fff"
        />
      ) : (
        <ActivityIndicator
          color="white"
          size="large"
          style={{ height: '100%' }}
        />
      )}
    </Svg>
  );
}

export default CompletedSvgArrow;
