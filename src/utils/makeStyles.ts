// utils/makeStyles.ts
import {StyleSheet} from 'react-native';
import {
  CANVAS,
  FONT_SIZES,
  FUNCTIONAL_COLORS,
  ICON_SIZES,
  SPACING,
} from '../constants';

type Theme = {
  color: typeof FUNCTIONAL_COLORS;
  spacing: typeof SPACING;
  icons: typeof ICON_SIZES;
  fonts: typeof FONT_SIZES;
  canvasSize: typeof CANVAS;
};

export function getStyles() {
  return {
    color: FUNCTIONAL_COLORS,
    spacing: SPACING,
    icons: ICON_SIZES,
    fonts: FONT_SIZES,
    canvasSize: CANVAS,
  };
}

export function makeStyles<T extends StyleSheet.NamedStyles<T>>(
  stylesFn: (theme: Theme) => T,
): T {
  return StyleSheet.create(stylesFn(getStyles()));
}
