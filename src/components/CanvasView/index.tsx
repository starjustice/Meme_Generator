import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {styles} from './style';

import {clamp} from '../../utils';
import {CanvasCapture, CanvasCaptureRef} from '../CanvasCapture';

type Props = {
  backgroundImage?: number | {uri: string};
  children?: React.ReactNode;
  captureRef: React.RefObject<CanvasCaptureRef | null>;
};

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export function CanvasView(props: Props) {
  const {backgroundImage, children, captureRef} = props;

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  // Gesture to handle dragging (panning) the element around
  const panGesture = Gesture.Pan()
    .onStart(() => {
      // When pan starts, save the current translation position as the start point
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate(event => {
      // Calculate max allowed translation (drag) distance on X and Y axis
      // Assume screen center is origin, limit movement to within half screen minus 100 pixels margin
      const maxTranslateX = screenWidth / 2 - 100; // e.g. 400px screen width -> maxTranslateX = 200 - 100 = 100px
      const maxTranslateY = screenHeight / 2 - 100; // e.g. 800px screen height -> maxTranslateY = 400 - 100 = 300px

      // Update translateX and translateY using the gesture translation, clamped to the bounds
      translateX.value = clamp(
        prevTranslationX.value + event.translationX, // new position based on previous plus gesture movement
        -maxTranslateX, // minimum allowed value (-100 in example)
        maxTranslateX, // maximum allowed value (100 in example)
      );

      translateY.value = clamp(
        prevTranslationY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY,
      );
    })
    .onEnd(event => {
      // On gesture end, save the last translation value as previous for next drag start
      prevTranslationX.value = event.translationX;
      prevTranslationY.value = event.translationY;
    })
    .runOnJS(true);

  // Gesture to handle pinch-to-zoom scaling
  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      // Update scale by multiplying saved scale by current pinch scale factor
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      // Save the final scale value when pinch ends
      savedScale.value = scale.value;
    });

  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  // Animated style to apply translation and scale transformations
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.gestureArea, animatedStyle]}>
          <CanvasCapture ref={captureRef} saveToGallery>
            <View style={styles.canvas}>
              {backgroundImage && (
                <Image
                  source={backgroundImage}
                  style={StyleSheet.absoluteFill}
                  resizeMode="cover"
                />
              )}
              <View style={StyleSheet.absoluteFill}>{children}</View>
            </View>
          </CanvasCapture>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
