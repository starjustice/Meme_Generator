import Slider from '@react-native-community/slider';
import React, {forwardRef} from 'react';
import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';

import {TEXT_COLOR} from '../../constants';
import {BottomSheet, Button} from '../../core-ui';
import {CanvasElement, RBSheetRef} from '../../types';
import {getStyles} from '../../utils';
import {styles} from './style';

type Props = {
  onFontVariant: () => void;
  onFontStyle: () => void;
  onFontColor: (color: string) => void;
  onFontSize: (size: number) => void;
  selectedElement?: CanvasElement | null;
  onOpacityImage?: (opacity: number) => void;
};

export const BottomSheetStyle = forwardRef<RBSheetRef, Props>(
  (
    {
      onFontVariant,
      onFontStyle,
      onFontSize,
      onFontColor,
      selectedElement,
      onOpacityImage,
    },
    ref,
  ) => {
    const {fonts, color} = getStyles();

    const isTextElement = selectedElement?.type === 'text';
    const textStyle = isTextElement ? selectedElement.style : undefined;

    const boldButtonStyle =
      textStyle?.fontWeight === 'bold' ? styles.activeStyle : undefined;

    const italicButtonStyle =
      textStyle?.fontStyle === 'italic' ? styles.activeStyle : undefined;

    const getColorCircleStyle = (textColor: string): StyleProp<ViewStyle> => [
      styles.colorCircle,
      {backgroundColor: textColor},
      textStyle?.color === textColor && styles.activeColor,
    ];

    return (
      <BottomSheet ref={ref}>
        <View style={styles.container}>
          {selectedElement?.type === 'image' ? (
            <View>
              <Text style={styles.fontSizeLabel}>{`Opacity Image ${Math.round(
                (selectedElement?.opacity ?? 1) * 100,
              )}%`}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={selectedElement?.opacity ?? 1}
                onSlidingComplete={value => onOpacityImage?.(value)}
                minimumTrackTintColor={color.sliderTrack}
                maximumTrackTintColor={color.sliderTrack}
              />
            </View>
          ) : (
            <>
              {/* Font size */}
              <View style={styles.sliderWrapper}>
                <Text style={styles.fontSizeLabel}>{`Font Size ${Math.round(
                  textStyle?.fontSize ?? fonts.l,
                )} pt`}</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={fonts.s}
                  maximumValue={fonts.xxl}
                  value={textStyle?.fontSize ?? fonts.l}
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
                  style={boldButtonStyle}
                  labelStyle={styles.bold}
                />

                <Button
                  label="Italic"
                  onPress={onFontStyle}
                  iconName="ItalicText"
                  style={italicButtonStyle}
                  labelStyle={styles.italic}
                />
              </View>
              {/* Color Picker  */}
              <View style={styles.colorPickerWrapper}>
                {Object.values(TEXT_COLOR).map(textColor => (
                  <TouchableOpacity
                    key={textColor}
                    style={getColorCircleStyle(textColor)}
                    onPress={() => onFontColor(textColor)}
                  />
                ))}
              </View>
            </>
          )}
        </View>
      </BottomSheet>
    );
  },
);
