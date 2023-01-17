import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { colors } from '../theme';
import RightIconSvg from './Svg/ResultScreen/RightIconSvg';
import Icon from './Icon';

// feel free to add new types, or add custom props to make custom enums
export default ({
  data,
  type,
  divide,
  style,
  arrow = true,
  containerStyle,
  disableTopRoundBorder = false,
}) => {
  const filteredData = data.filter((f) => !f.hidden);

  const getCircleMargin = () => {
    if (type === 'inAll') return 24;
    return 16;
  };

  const getBackGroundColor = () => {
    if (type === 'inAll' || type === 'image') return 'white';
    return colors.primaryPavement;
  };

  const getMarginBot = () => {
    if (type === 'inAll') return 0;
    return 16;
  };

  const getBorderRadiusBot = (index) => {
    if (type === 'inAll') return index >= filteredData.length - 1 ? 16 : getBorderRadius();
    return getBorderRadius();
  };

  const getBorderRadiusTop = (index) => {
    if (type === 'inAll') {
      if (index === 0 && !disableTopRoundBorder) {
        return 16;
      }
      return getBorderRadius();
    }
    return getBorderRadius();
  };

  const getBorderRadius = () => {
    if (type === 'inAll' && !divide) return 0;
    return 16;
  };

  const getBorder = (index) => {
    if (type === 'inAll')
      return {
        width: index >= filteredData.length - 1 ? 0 : 1,
        color: '#D8E1F8',
      };
    return { width: style?.borderWidth || 0 };
  };

  const getIconBackgroundColor = () => {
    if (type === 'inAll') return colors.primaryPavement;
    return colors.greyWhite;
  };

  return (
    <View style={containerStyle}>
      {filteredData.map((item, index) => {
        const {
          icon,
          title,
          onClick,
          hidden,
          leftIcon,
          image,
          description,
          disabled,
          disabledText,
          isProfileCircle,
          isReversedTitle,
        } = item;
        if (!hidden)
          return (
            <TouchableOpacity
              key={title}
              onPress={onClick}
              disabled={disabled}
              style={{
                backgroundColor: getBackGroundColor(),
                padding: 16,
                paddingRight: 32,
                borderTopLeftRadius: getBorderRadiusTop(index),
                borderTopRightRadius: getBorderRadiusTop(index),
                borderBottomLeftRadius: getBorderRadiusBot(index),
                borderBottomRightRadius: getBorderRadiusBot(index),
                flexDirection: 'row',
                marginBottom: index !== data.length - 1 ? getMarginBot() : 0,
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: getBorder(index).width,
                borderBottomColor: getBorder(index).color,
                ...style,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                {image ? (
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: getIconBackgroundColor(),
                      borderRadius: isProfileCircle ? 20 : 8,
                    }}
                  >
                    <Icon type='url' url={image} size={24} isGradient={false} />
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: disabled
                        ? colors.greyLight
                        : item.profileColor || getIconBackgroundColor(),
                      width: 40,
                      height: 40,
                      borderRadius: isProfileCircle ? 20 : 8,
                      marginRight: getCircleMargin(),
                      alignItems: 'center',
                      justifyContent: 'center',
                      ...item.iconStyle,
                    }}
                  >
                    {icon}
                  </View>
                )}
                <View
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    flexDirection: isReversedTitle ? 'column-reverse' : 'column',
                    ...item.titleContainerStyle,
                  }}
                >
                  <Text
                    style={[
                      {
                        color: disabled ? colors.greyLight : style?.color || colors.greyDark2,
                        fontSize: style?.fontSize || 16,
                        fontFamily: style?.fontFamily || 'Museo_500',
                      },
                      item.titleStyle,
                    ]}
                  >
                    {title}
                  </Text>
                  {description ? (
                    <Text
                      style={[
                        {
                          fontFamily: 'Museo_300',
                          fontSize: 14,
                          color: colors.greyDark,
                        },
                        item.descriptionStyle,
                      ]}
                    >
                      {description}
                    </Text>
                  ) : null}
                  {disabledText && disabled && (
                    <Text
                      style={{
                        fontFamily: 'Museo_300',
                        fontSize: 14,
                        color: colors.greyLight,
                      }}
                    >
                      {disabledText}
                    </Text>
                  )}
                </View>
                {leftIcon && <View>{leftIcon}</View>}
              </View>
              {arrow && <RightIconSvg />}
            </TouchableOpacity>
          );
        return null;
      })}
    </View>
  );
};
