import Slider from '@react-native-community/slider';
import React, {forwardRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {TEXT_COLOR} from '../../constants';
import {BottomSheet, Button} from '../../core-ui';
import {RBSheetRef, TextElement} from '../../types';
import {getStyles} from '../../utils';
import {styles} from './style';

type Props = {
  onFontVariant: () => void;
  onFontStyle: () => void;
  onFontColor: (color: string) => void;
  onFontSize: (size: number) => void;
  selectedElement?: TextElement;
};

export const BottomSheetStyle = forwardRef<RBSheetRef, Props>(
  (
    {onFontVariant, onFontStyle, onFontSize, onFontColor, selectedElement},
    ref,
  ) => {
    const {fonts, color} = getStyles();
    return (
      <BottomSheet ref={ref}>
        <View style={styles.container}>
          {/* Font size */}
          <View style={styles.sliderWrapper}>
            <Text style={styles.fontSizeLabel}>{`Font Size ${Math.round(
              selectedElement?.style?.fontSize ?? fonts.l,
            )} pt`}</Text>
            <Slider
              style={styles.slider}
              minimumValue={fonts.s}
              maximumValue={fonts.xxl}
              value={selectedElement?.style?.fontSize ?? fonts.l}
              onSlidingComplete={onFontSize}
              minimumTrackTintColor={color.sliderTrack}
              maximumTrackTintColor={color.sliderTrack}
            />
          </View>

          {/* Bold / Italic Toggle */}
          <View style={styles.toggleWrapper}>
            <Button
              label="Bold"
              onPress={onFontVariant}
              iconName="BoldText"
              labelStyle={styles.bold}
            />

            <Button
              label="Italic"
              onPress={onFontStyle}
              iconName="ItalicText"
              labelStyle={styles.italic}
            />
          </View>

          {/* Color Picker */}
          <View style={styles.colorPickerWrapper}>
            {Object.values(TEXT_COLOR).map(textColor => (
              <TouchableOpacity
                key={textColor}
                style={[styles.colorCircle, {backgroundColor: textColor}]}
                onPress={() => onFontColor(textColor)}
              />
            ))}
          </View>
        </View>
      </BottomSheet>
    );
  },
);
