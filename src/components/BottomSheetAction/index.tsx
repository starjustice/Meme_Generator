// src/components/BottomSheetAction.tsx
import React, {forwardRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

import {styles} from './style';

import {Button} from '../../core-ui';
import {RBSheetRef} from '../../types';

type Props = {
  onAddText: () => void;
  onAddImage: () => void;
  onDeleteAll: () => void;
};

export const BottomSheetAction = forwardRef<RBSheetRef, Props>((props, ref) => {
  const {onAddText, onAddImage, onDeleteAll} = props;

  return (
    <RBSheet
      ref={ref}
      height={240}
      openDuration={250}
      closeOnPressMask={true}
      customStyles={{
        container: styles.container,
      }}>
      <Button
        label="Add Text"
        onPress={onAddText}
        style={styles.option}
        iconName="Text"
      />
      <Button
        label="Add Image"
        onPress={onAddImage}
        style={styles.option}
        iconName="Photo"
      />
      <Button
        label="Delete All"
        onPress={onDeleteAll}
        style={styles.option}
        iconName="Delete"
      />
    </RBSheet>
  );
});
