import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Alert} from 'react-native';
import ViewShot, {captureRef} from 'react-native-view-shot';

import {styles} from './style';

export type CanvasCaptureRef = {
  exportToJPG: () => Promise<string | null>; // returns image URI
};

type Props = {
  children: React.ReactNode;
  quality?: number; // 0 - 1
  saveToGallery?: boolean;
};

export const CanvasCapture = forwardRef<CanvasCaptureRef, Props>(
  ({children, quality = 0.9, saveToGallery = false}, ref) => {
    const viewShotRef = useRef<ViewShot>(null);

    // Expose methods to parent via ref, here exportToJPG to capture and optionally save
    useImperativeHandle(ref, () => ({
      exportToJPG: async () => {
        try {
          // Capture the view referenced by viewShotRef as a JPEG image with given quality
          const uri = await captureRef(viewShotRef, {
            format: 'jpg',
            quality,
          });
          // If configured, save the captured image to device gallery
          if (saveToGallery) {
            await CameraRoll.saveAsset(uri, {type: 'photo'});
            Alert.alert('Success', 'Success Save Meme');
          }

          return uri;
        } catch {
          Alert.alert('Fail', 'Failed to save meme please try again');
          return null;
        }
      },
    }));

    // Render the ViewShot wrapping the children elements to capture

    return (
      <ViewShot
        ref={viewShotRef}
        options={{format: 'jpg', quality}}
        style={styles.container}>
        {children}
      </ViewShot>
    );
  },
);
