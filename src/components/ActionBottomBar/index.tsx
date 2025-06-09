import React from 'react';
import {View} from 'react-native';

import {styles} from './style';

import {Button} from '../../core-ui';

type Props = {
  onOpenSheet: () => void;
  onExport: () => void;
  onChangeTemplate: () => void;
};

export function BottomActionBar(props: Props) {
  const {onOpenSheet, onExport, onChangeTemplate} = props;
  return (
    <View style={styles.container}>
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
      <Button
        label="Template"
        iconName="Template"
        onPress={onChangeTemplate}
        variant="outline"
      />
    </View>
  );
}
