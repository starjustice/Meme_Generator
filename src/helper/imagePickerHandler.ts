import {Alert} from 'react-native';
import {pickImage} from './pickImage';

/**
 * Handles image picking with extension filtering and permission/error alerts.
 *
 * @param extensions - List of allowed image file extensions. Defaults to common types.
 * @returns The picked image result or undefined if an error/cancel occurs.
 */

export async function imagePickerHandler(
  extensions: string[] = ['jpg', 'jpeg', 'png', 'svg'],
) {
  const result = await pickImage(extensions);

  switch (result.error) {
    case 'format':
      Alert.alert(
        'Failed!',
        `Please upload image with a suitable format in ${extensions.join(
          ', ',
        )}`,
        [{text: 'Got it'}],
      );
      return;
    case 'denied':
      Alert.alert(
        'Photo Permissions Required',
        "Please adjust your phone's settings to allow the app to access your photos.",
        [{text: 'Got it'}],
      );
      return;
    case 'cancelled':
      return;
  }

  return result;
}
