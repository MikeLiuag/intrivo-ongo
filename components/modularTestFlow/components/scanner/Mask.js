import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, {
  Mask,
  Rect,
  Path,
  Text as SvgText
} from 'react-native-svg';
import Mock from './Mock';
import {
  WINDOW_WIDTH, WINDOW_HEIGHT, CAPTURE_CONTROL_SIZE, CAPTURE_SIZE
} from '../../utils/constants';

const SvgMask = ({ mockOpacity, mockScale, mockRotate }) => {
  // Take as much height as possible
  const availableHeight = WINDOW_HEIGHT - CAPTURE_CONTROL_SIZE - CAPTURE_SIZE * 3;
  const maskHeight = availableHeight;
  const maskWidth = maskHeight / 3.5;

  const maskCenterX = WINDOW_WIDTH / 2;
  const maskCenterY = WINDOW_HEIGHT / 2 - CAPTURE_CONTROL_SIZE;

  const maskFontSize = maskWidth / 10;

  const frameWidth = (maskWidth * 0.8);
  const frameHeight = (maskHeight * 0.9);
  const frameRadius = maskWidth / 10;

  // Draw mask square
  const pathTopRight = `M ${maskCenterX + (maskWidth - frameWidth) / 2 + frameRadius} ${maskCenterY - maskHeight / 2
  } L ${maskCenterX + maskWidth / 2 - frameRadius} ${maskCenterY - maskHeight / 2
  } A ${frameRadius},${frameRadius} 0 0 1 ${maskCenterX + maskWidth / 2},${maskCenterY - maskHeight / 2 + frameRadius
  } L ${maskCenterX + maskWidth / 2} ${maskCenterY - (maskHeight - frameHeight) / 2 - frameRadius}`;

  const pathBottomRight = `M ${maskCenterX + maskWidth / 2} ${maskCenterY + (maskHeight - frameHeight) / 2 + frameRadius
  } L ${maskCenterX + maskWidth / 2} ${maskCenterY + maskHeight / 2 - frameRadius
  } A ${frameRadius},${frameRadius} 0 0 1 ${maskCenterX + maskWidth / 2 - frameRadius},${maskCenterY + maskHeight / 2
  } L ${maskCenterX + (maskWidth - frameWidth) / 2 + frameRadius} ${maskCenterY + maskHeight / 2}`;

  const pathBottomLeft = `M ${maskCenterX - (maskWidth - frameWidth) / 2 - frameRadius} ${maskCenterY + maskHeight / 2
  } L ${maskCenterX - maskWidth / 2 + frameRadius} ${maskCenterY + maskHeight / 2
  } A ${frameRadius},${frameRadius} 0 0 1 ${maskCenterX - maskWidth / 2},${maskCenterY + maskHeight / 2 - frameRadius
  } L ${maskCenterX - maskWidth / 2} ${maskCenterY + (maskHeight - frameHeight) / 2 + frameRadius}`;

  const pathTopLeft = `M ${maskCenterX - maskWidth / 2} ${maskCenterY - (maskHeight - frameHeight) / 2 - frameRadius
  } L ${maskCenterX - maskWidth / 2} ${maskCenterY - maskHeight / 2 + frameRadius
  } A ${frameRadius},${frameRadius} 0 0 1 ${maskCenterX - maskWidth / 2 + frameRadius},${maskCenterY - maskHeight / 2
  } L ${maskCenterX - (maskWidth - frameWidth) / 2 - frameRadius} ${maskCenterY - maskHeight / 2}`;

  return (
    <Svg style={styles.mask}>
      <Mask id="myMask">
        <Rect x="0" y="0" width="100%" height="100%" fill="white" />
        <Rect x={maskCenterX - maskWidth / 2} y={maskCenterY - maskHeight / 2} width={maskWidth} height={maskHeight} fill="black" rx={frameRadius} ry={frameRadius} />
      </Mask>

      <Rect x="0" y="0" width="100%" height="100%" fill="#000000" opacity="0.0" mask="url(#myMask)" />

      <Path id="lineTopRight" d={pathTopRight} stroke="white" strokeWidth="6" fill="none" />
      <Path id="lineBottomRight" d={pathBottomRight} stroke="white" strokeWidth="6" fill="none" />
      <Path id="lineBottomLeft" d={pathBottomLeft} stroke="white" strokeWidth="6" fill="none" />
      <Path id="lineTopLeft" d={pathTopLeft} stroke="white" strokeWidth="6" fill="none" />

      <SvgText x={maskCenterX} y={maskCenterY} fill="#5955af" fontSize={maskFontSize} fontWeight="bold" textAnchor="middle" />

      <Mock
        mockOpacity={mockOpacity}
        mockScale={mockScale}
        mockRotate={mockRotate}
        maskCenterX={maskCenterX}
        maskCenterY={maskCenterY}
        maskWidth={maskWidth}
        maskHeight={maskHeight}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain'
  }
});

export default SvgMask;
