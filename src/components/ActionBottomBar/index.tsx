import React from 'react';
import {View} from 'react-native';

import {styles} from './style';

import {Button} from '../../core-ui';
import {getStyles} from '../../utils';

type Props = {
  onOpenSheet: () => void;
  onExport: () => void;
  onChangeTemplate: () => void;
  isSelected?: boolean;
  onStyle?: () => void;
};

export function BottomActionBar(props: Props) {
  const {onOpenSheet, onExport, onChangeTemplate, isSelected, onStyle} = props;
  const {color} = getStyles();
  return (
    <View style={styles.container}>
      {isSelected ? (
        <Button
          label="Text Style"
          onPress={onStyle}
          variant="outline"
          style={styles.buttonTextStyle}
          textColor={color.buttonActive}
        />
      ) : null}
      <Button
        label="Add"
        iconName="Add"
        onPress={onOpenSheet}
        variant="outline"
      />
      <Button
        label="Export"
        iconName="Download"
        onPress={onExport}
        variant="filled"
      />
      {!isSelected ? (
        <Button
          label="Template"
          iconName="Template"
          onPress={onChangeTemplate}
          variant="outline"
        />
      ) : null}
    </View>
  );
}
