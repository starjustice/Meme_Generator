// src/components/BottomSheetAction.tsx
import React, {forwardRef} from 'react';

import {styles} from './style';

import {BottomSheet, Button} from '../../core-ui';
import {RBSheetRef} from '../../types';

type Props = {
  onAddText: () => void;
  onAddImage: () => void;
  onDeleteAll: () => void;
};

export const BottomSheetAction = forwardRef<RBSheetRef, Props>((props, ref) => {
  const {onAddText, onAddImage, onDeleteAll} = props;

  return (
    <BottomSheet ref={ref}>
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
    </BottomSheet>
  );
});
