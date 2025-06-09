import React from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import {styles} from './style';

import {getStyles} from '../../utils';
import {Icon} from '../Icon';
import {IconName} from '../Icon/listIcon';

type ButtonVariant = 'filled' | 'outline';

interface Props extends TouchableOpacityProps {
  label: string;
  iconName?: IconName;
  iconColor?: string;
  textColor?: string;
  variant?: ButtonVariant;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export function Button(props: Props) {
  const {
    label,
    onPress,
    iconName,
    iconColor,
    textColor,
    variant = 'filled',
    style,
    labelStyle,
    ...otherProps
  } = props;

  const isFilled = variant === 'filled';
  const {color} = getStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.base, isFilled ? styles.filled : styles.outline, style]}
      {...otherProps}>
      {iconName && (
        <Icon
          name={iconName}
          color={iconColor || (isFilled ? color.iconLight : color.buttonBase)}
          size={16}
        />
      )}
      <Text
        style={[
          styles.label,
          {color: textColor || (isFilled ? color.iconLight : color.buttonBase)},
          labelStyle,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
