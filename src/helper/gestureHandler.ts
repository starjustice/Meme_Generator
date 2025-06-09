import {Gesture} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';

/**
 *  function to create a tap gesture handler that runs a JS callback.
 *
 * @param callback - A function to execute when the tap gesture starts.
 * @returns A configured Tap gesture.
 */

export const createTapHandler = (callback: () => void) =>
  Gesture.Tap().onStart(() => runOnJS(callback)?.());
