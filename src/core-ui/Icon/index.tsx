import React from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {IconName, Icons} from './listIcon';

import {getStyles} from '../../utils';

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle | TextStyle>;
  onPress?: () => void;
  disabled?: boolean;
};

export function Icon(props: Props) {
  const {color: baseColor, icons} = getStyles();

  const {
    name,
    size = icons.l,
    color = baseColor.iconLight,
    style,
    onPress,
    disabled,
  } = props;

  const IconComponent = Icons[name];
  const icon = <IconComponent width={size} height={size} color={color} />;

  if (onPress) {
    return (
      <TouchableOpacity style={style} onPress={onPress} disabled={disabled}>
        {icon}
      </TouchableOpacity>
    );
  } else {
    return <View style={style}>{icon}</View>;
  }
}
