import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml, {
  defaultSystemFonts,
  HTMLElementModel,
  HTMLContentModel,
} from 'react-native-render-html';
import { colors } from '../../../theme';

const formatTime = (tSecs, formatString = 'h:mm') => {
  const mins = Math.floor(tSecs / 60);
  const hours = Math.floor(mins / 60);

  switch (formatString) {
    case 's':
      return `${tSecs}`;
    case 'ss':
      return `${tSecs > 9 ? '' : 0}${tSecs}`;
    case 'm:ss':
      return `${mins > 0 ? mins : ''}:${tSecs - mins * 60 > 9 ? '' : 0}${tSecs - mins * 60}`;
    case 'mm:ss':
      return `${mins > 9 ? mins : '0'.concat(mins)}:${tSecs - mins * 60 > 9 ? '' : 0}${
        tSecs - mins * 60
      }`;
    case 'm':
      return `${mins}`;
    case 'mm':
      return `${mins > 9 ? mins : '0'.concat(mins)}`;
    case 'h:mm':
      return `${hours > 0 ? hours : ''}:${mins - hours * 60 > 9 ? '' : 0}${mins - hours * 60}`;
    case 'hh:mm':
      return `${hours > 9 ? hours : '0'.concat(hours)}:${mins - hours * 60 > 9 ? '' : 0}${
        mins - hours * 60
      }`;
    case 'h:mm:ss':
      return `${hours > 0 ? hours.concat(':') : ''}${mins - hours * 60 > 9 ? '' : 0}${
        mins - hours * 60
      }:${tSecs - (mins - hours * 60) * 60 > 9 ? '' : 0}${tSecs - (mins - hours * 60) * 60}`;
    case 'hh:mm:ss':
      return `${hours > 9 ? hours : '0'.concat(hours)}:${mins - hours * 60 > 9 ? '' : 0}${
        mins - hours * 60
      }:${tSecs - hours * 3600 - (mins - hours * 60) * 60 > 9 ? '' : 0}${
        tSecs - hours * 3600 - (mins - hours * 60) * 60
      }`;
    default:
      return tSecs;
  }
};

const FormattedText = React.memo(({ children, onVideoLinkPress, style }) => {
  const { width } = useWindowDimensions();
  if (children === undefined || children === null) return null;
  if (typeof children !== 'string')
    throw new Error(`FormattedText must of type string: ${typeof children} ${children}`);

  const systemFonts = [...defaultSystemFonts, 'Museo_300', 'Museo_500', 'Museo_700'];

  let href = '';
  const customHTMLElementModels = {
    'video-tag': HTMLElementModel.fromNativeModel({
      tagName: 'video-tag',
      mixedUAStyles: {
        fontFamily: 'Museo_700',
        color: colors.primaryBlue,
      },
      reactNativeProps: {
        text: {
          onPress: () => {
            onVideoLinkPress(href);
          },
        },
      },
      contentModel: HTMLContentModel.textual,
      getReactNativeProps: (element) => {
        href = element.attributes.href;
      },
    }),
    // <time-display>100</time-display> => 1:40
    'time-display': HTMLElementModel.fromNativeModel({
      tagName: 'time-display',
      contentModel: HTMLContentModel.textual,
    }),
  };

  const TimeDisplay = ({ TDefaultRenderer, tnode, ...props }) =>
    tnode.data !== 'undefined' ? (
      // recommended way to override components accordign to React native render html
      // eslint-disable-next-line react/jsx-props-no-spreading
      <TDefaultRenderer tnode={tnode} {...props}>
        {formatTime(tnode.data, tnode.attributes?.format)}
      </TDefaultRenderer>
    ) : null;

  const renderers = {
    'time-display': TimeDisplay,
  };

  return (
    <RenderHtml
      contentWidth={width}
      baseStyle={style}
      source={{
        html: children,
      }}
      systemFonts={systemFonts}
      customHTMLElementModels={customHTMLElementModels}
      renderers={renderers}
    />
  );
});
export default FormattedText;
