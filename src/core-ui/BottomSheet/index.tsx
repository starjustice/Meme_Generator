import React, {forwardRef} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RBSheetRef} from '../../types';
import {styles} from './style';

type Props = {
  height?: number;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  closeOnPressMask?: boolean;
};

export const BottomSheet = forwardRef<RBSheetRef, Props>(
  ({height, children, containerStyle, closeOnPressMask = true}, ref) => {
    return (
      <RBSheet
        ref={ref}
        height={height}
        openDuration={250}
        closeOnPressMask={closeOnPressMask}
        customStyles={{
          container: [styles.container, containerStyle],
        }}>
        {children}
      </RBSheet>
    );
  },
);
