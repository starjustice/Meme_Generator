import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Image, LayoutChangeEvent, Text, TextInput} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {styles} from './style';

import {Icon} from '../../core-ui';
import {createTapHandler} from '../../helper';
import {CanvasElement} from '../../types';
import {clamp, getStyles} from '../../utils';

export type DraggableElementRef = {
  blur: () => void;
  isEditing: () => boolean;
};

type Props = {
  element: CanvasElement;
  canvasWidth?: number;
  canvasHeight?: number;
  onDelete: () => void;
  onCopy: () => void;
  onSelect?: () => void;
  isSelected?: boolean;
  initialX?: number;
  initialY?: number;
};

export const DraggableElement = forwardRef<DraggableElementRef, Props>(
  (props, ref) => {
    const {
      element,
      element: {type, content},
      initialX = 0,
      initialY = 0,
      canvasWidth = 0,
      canvasHeight = 0,
      onDelete,
      onCopy,
      onSelect,
      isSelected = false,
    } = props;

    const {icons} = getStyles();

    const [isEditing, setIsEditing] = useState(false);
    const [textValue, setTextValue] = useState(
      typeof content === 'string' ? content : '',
    );

    const inputRef = useRef<TextInput>(null);
    const [elementSize, setElementSize] = useState({width: 100, height: 100});

    const translateX = useSharedValue(initialX);
    const translateY = useSharedValue(initialY);
    const elementWidth = useSharedValue(100);
    const elementHeight = useSharedValue(100);
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);
    const startWidth = useSharedValue(100);
    const startHeight = useSharedValue(100);

    // Memoize the extracted style properties for a text element.
    // This avoids unnecessary recalculations unless `type` or `element` changes.
    const textStyle = useMemo(() => {
      if (type !== 'text') {
        return undefined;
      }

      if ('style' in element) {
        const {fontSize, color, fontWeight, fontStyle} = element.style || {};

        return {
          fontSize,
          color,
          fontWeight,
          fontStyle,
        };
      }
      return undefined;
    }, [type, element]);

    useImperativeHandle(ref, () => ({
      // Method to blur the input (end editing mode)
      blur: () => {
        inputRef.current?.blur(); // blur input if it exists
        setIsEditing(false); // turn off editing mode
      },
      // Method to check if element is in editing mode
      isEditing: () => isEditing,
    }));

    // Track the layout size of the element to constrain drag boundaries
    const onLayout = (e: LayoutChangeEvent) => {
      const {width, height} = e.nativeEvent.layout;
      setElementSize({width, height}); // used for drag boundary limits
    };

    // Handle double tap to enable editing (text input mode)
    const handleTextPress = React.useCallback(() => {
      setIsEditing(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }, []);

    // Gesture for single tap – used to select the element
    const singleTapGesture = Gesture.Tap()
      .numberOfTaps(1)
      .onStart(() => {
        if (onSelect) {
          runOnJS(onSelect)();
        }
      });

    // Gesture for double tap – used to enter edit mode
    const doubleTapGesture = Gesture.Tap()
      .numberOfTaps(2)
      .onStart(() => {
        runOnJS(handleTextPress)();
      });

    // Ensure single tap doesn't trigger if double tap is detected
    singleTapGesture.requireExternalGestureToFail(doubleTapGesture);

    // Gesture for dragging the element
    const panGesture = Gesture.Pan()
      .onStart(() => {
        if (!isEditing) {
          startX.value = translateX.value;
          startY.value = translateY.value;
        }
      })
      .onUpdate(e => {
        if (!isEditing) {
          // Define the maximum draggable range (stay inside canvas bounds)
          const maxTranslateX = canvasWidth - elementSize.width; // max right drag
          const maxTranslateY = canvasHeight - elementSize.height; // max bottom drag

          // Calculate new position using clamp to stay within canvas
          let nextX = clamp(startX.value + e.translationX, 0, maxTranslateX);
          let nextY = clamp(startY.value + e.translationY, 0, maxTranslateY);

          translateX.value = nextX;
          translateY.value = nextY;
        }
      })
      .runOnJS(true);

    // Gesture for resizing the element
    const resizeGesture = Gesture.Pan()
      .onStart(() => {
        startWidth.value = elementWidth.value;
        startHeight.value = elementHeight.value;
      })
      .onUpdate(e => {
        // Calculate maximum width/height based on current position
        const maxWidth = canvasWidth - translateX.value;
        const maxHeight = canvasHeight - translateY.value;

        // Resize based on gesture, clamped to [40, maxWidth/Height]
        elementWidth.value = clamp(
          startWidth.value + e.translationX,
          40,
          maxWidth,
        );

        elementHeight.value = clamp(
          startHeight.value + e.translationY,
          40,
          maxHeight,
        );
      })
      .runOnJS(true);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
      width: elementWidth.value,
      height: elementHeight.value,
      zIndex: isEditing
        ? 1000 // bring to front while editing
        : type === 'text'
        ? 900 // text gets higher zIndex
        : 10,
    }));

    const handleBlur = () => {
      setIsEditing(false);
    };

    // Enable pan gesture only when the element is selected
    const wrappedPanGesture = isSelected
      ? panGesture
      : Gesture.Pan().onUpdate(() => {}); // no-op pan if not selected;

    // Compose all gestures:
    // - Race: only the faster of single or double tap wins
    // - Simultaneous: pan allowed alongside tap
    const composedGesture = Gesture.Simultaneous(
      Gesture.Race(doubleTapGesture, singleTapGesture),
      wrappedPanGesture,
    );

    return (
      <GestureDetector gesture={composedGesture}>
        <Animated.View
          style={[
            styles.container,
            (isSelected || isEditing) && styles.selectedBox,
            animatedStyle,
          ]}
          onLayout={onLayout}>
          {type === 'text' ? (
            isEditing ? (
              <TextInput
                ref={inputRef}
                value={textValue}
                onChangeText={setTextValue}
                onBlur={handleBlur}
                style={[styles.text, styles.input, textStyle]}
                placeholder="Type here..."
                multiline
              />
            ) : (
              <Text style={[styles.text, textStyle]}>{textValue}</Text>
            )
          ) : (
            <Image source={content} style={styles.image} resizeMode="contain" />
          )}

          {isSelected && (
            <>
              {/* Note for tap not use TouchableOpacity because it overlap with other gesture drag and resize */}
              <GestureDetector gesture={createTapHandler(onCopy)}>
                <Animated.View style={[styles.controlButton, styles.copyIcon]}>
                  <Icon style={styles.buttonText} name="Copy" size={icons.m} />
                </Animated.View>
              </GestureDetector>

              <GestureDetector gesture={createTapHandler(onDelete)}>
                <Animated.View
                  style={[styles.controlButton, styles.deleteIcon]}>
                  <Icon
                    style={styles.buttonText}
                    name="Delete"
                    size={icons.m}
                  />
                </Animated.View>
              </GestureDetector>

              {/* Resize box */}
              <GestureDetector gesture={resizeGesture}>
                <Animated.View style={styles.resizeHandle} />
              </GestureDetector>
            </>
          )}
        </Animated.View>
      </GestureDetector>
    );
  },
);
