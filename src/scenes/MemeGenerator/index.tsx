import React, {useRef, useState} from 'react';
import {Keyboard, SafeAreaView, View} from 'react-native';

import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  BottomActionBar,
  BottomSheetAction,
  CanvasCaptureRef,
  CanvasView,
  DraggableElement,
  DraggableElementRef,
} from '../../components';
import {createTapHandler, imagePickerHandler} from '../../helper';
import {CanvasElement, RBSheetRef} from '../../types';
import {getStyles} from '../../utils';
import {styles} from './style';

const initialPosition = 60;
const space = 10;

export default function MemeGenerator() {
  const {canvasSize} = getStyles();

  const [elements, setElements] = useState<Array<CanvasElement>>([]);
  const [backgroundImage, setBackgroundImage] = useState<
    {uri: string} | undefined
  >(undefined);
  // Track which element is currently selected
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Ref for bottom sheet to open/close actions
  const bottomSheetRef = useRef<RBSheetRef>(null);

  const captureRef = useRef<CanvasCaptureRef>(null);

  /**
   * Array of refs for each <DraggableElement /> component.
   * This lets us programmatically control each element, e.g., calling .blur() or checking isEditing().
   * It's kept in sync with the `elements` array using `.map()` below.
   */

  const elementRefs = useRef<React.RefObject<DraggableElementRef | null>[]>([]);

  const openSheet = () => {
    bottomSheetRef.current?.open();
  };
  const closeSheet = () => {
    bottomSheetRef.current?.close();
  };

  // Add a new text element to the canvas
  const addText = () => {
    setElements(prev => [
      ...prev,
      {
        type: 'text',
        content: 'Type Here',
        initialX: initialPosition,
        initialY: initialPosition,
      },
    ]);
    closeSheet();
  };

  // Add a new Image element to the canvas
  const addImage = async () => {
    const result = await imagePickerHandler();

    if (result && 'uri' in result && result.uri) {
      setElements(prev => [
        ...prev,
        {
          type: 'image',
          content: {uri: result.uri},
          initialX: initialPosition,
          initialY: initialPosition,
        },
      ]);
    }
    closeSheet();
  };

  // Replace canvas background image
  const handleChangeTemplate = async () => {
    const result = await imagePickerHandler();

    if (result && 'uri' in result) {
      setBackgroundImage({uri: result.uri || ''});
    }
    closeSheet();
  };

  // Capture/export the current canvas to JPG
  const handleExport = async () => {
    await captureRef.current?.exportToJPG();
  };

  // Delete all canvas elements and reset background
  const handleDeleteAllElement = () => {
    setElements([]);
    setBackgroundImage(undefined);
    closeSheet();
  };

  // Dismiss keyboard and blur all elements when tapping outside
  const handleTapOutside = () => {
    Keyboard.dismiss();

    // Blur all active elements
    elementRefs.current.forEach(ref => {
      if (ref.current?.isEditing()) {
        ref.current.blur();
      }
    });

    setSelectedIndex(null);
  };

  // Delete currently selected element
  const handleDeleteElement = () => {
    if (selectedIndex !== null) {
      setElements(prev => prev.filter((_, i) => i !== selectedIndex));
      elementRefs.current.splice(selectedIndex, 1); // clean up ref
      setSelectedIndex(null);
    }
  };

  // Copy the currently selected element and add it slightly offset
  const handleCopyElement = () => {
    if (selectedIndex !== null) {
      const elementToCopy = elements[selectedIndex];
      console.log(elementToCopy.initialX);
      setElements(prev => [
        ...prev,
        {
          ...elementToCopy,
          initialX: (elementToCopy.initialX || initialPosition) + space,
          initialY: (elementToCopy.initialY || initialPosition) + space,
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.flex}>
        <GestureHandlerRootView style={styles.flex}>
          <GestureDetector gesture={createTapHandler(handleTapOutside)}>
            <CanvasView
              backgroundImage={backgroundImage}
              captureRef={captureRef}>
              {elements.map((el, index) => {
                if (!elementRefs.current[index]) {
                  // Ensure each element has its own ref for programmatic control
                  elementRefs.current[index] =
                    React.createRef<DraggableElementRef>();
                }
                const elRef = elementRefs.current[index];

                return (
                  <DraggableElement
                    ref={elRef}
                    key={index}
                    element={el}
                    initialX={(el.initialX ?? initialPosition) + index * space} // make sure there are space when generate next element
                    initialY={(el.initialY ?? initialPosition) + index * space}
                    canvasWidth={canvasSize.width} // for now canvas size using const size
                    canvasHeight={canvasSize.height}
                    isSelected={selectedIndex === index}
                    onSelect={() => setSelectedIndex(index)}
                    onDelete={handleDeleteElement}
                    onCopy={handleCopyElement}
                  />
                );
              })}
            </CanvasView>
          </GestureDetector>
        </GestureHandlerRootView>
      </View>

      <BottomActionBar
        onOpenSheet={openSheet}
        onChangeTemplate={handleChangeTemplate}
        onExport={handleExport}
      />

      <BottomSheetAction
        ref={bottomSheetRef}
        onAddText={addText}
        onAddImage={addImage}
        onDeleteAll={handleDeleteAllElement}
      />
    </SafeAreaView>
  );
}
