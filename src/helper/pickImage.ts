import {launchImageLibrary} from 'react-native-image-picker';

/**
 * Opens the image library for the user to pick a photo and validates the file extension.
 *
 * @param extensions - An optional array of allowed file extensions (default: ['jpg', 'jpeg', 'png']).
 * @returns An object containing the selected image URI, or an error key if the action failed or was invalid.
 */

export async function pickImage(
  extensions: Array<string> | undefined = ['jpg', 'jpeg', 'png', 'svg'],
) {
  try {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.didCancel) {
      return {error: 'cancelled'};
    }

    if (result.errorCode === 'permission') {
      return {error: 'denied'};
    }

    const asset = result.assets?.[0];

    if (asset?.uri) {
      // Extract file extension from file name
      const ext = asset.fileName?.split('.').pop()?.toLowerCase();

      // Check if extension is valid
      if (ext && extensions?.includes(ext)) {
        return {uri: asset.uri};
      } else {
        return {error: 'format'};
      }
    }

    return {error: 'cancelled'};
  } catch {
    return {error: 'denied'};
  }
}
