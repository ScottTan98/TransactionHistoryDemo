import ReactNativeBiometrics from 'react-native-biometrics';
import { Alert } from 'react-native';

export const authenticateWithBiometrics = async (promptMessage: string): Promise<boolean> => {
  const rnBiometrics = new ReactNativeBiometrics();
  try {
    const { biometryType } = await rnBiometrics.isSensorAvailable();
    if (biometryType) {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage,
      });
      if (success) {
        return true;
      } else {
        Alert.alert('Authentication Failed');
        return false;
      }
    } else {
      Alert.alert('Unsupported', 'Biometric authentication not available.');
      return false;
    }
  } catch (error) {
    console.error('Biometric error:', error);
    Alert.alert('Error', 'Something went wrong during authentication.');
    return false;
  }
};
