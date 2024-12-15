import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const AuthScreen = ({navigation} : {navigation: any}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleBiometricAuth = async () => {
        const rnBiometrics = new ReactNativeBiometrics();

        const { available, biometryType } = await rnBiometrics.isSensorAvailable();

        if(available && (biometryType === 'FaceID' || biometryType === 'TouchID')) {
            rnBiometrics
                .simplePrompt({promptMessage: 'Authenticate with Face ID / Touch ID'})
                .then(resultObject => {
                    const { success } = resultObject;

                    if (success) {
                        setIsAuthenticated(true);
                        navigation.navigate('HomeScreen');
                    } else {
                        Alert.alert('Authentication Failed');
                    }
                })
                .catch(() => {
                    Alert.alert('Authentication Error');
                });
        } else {
            Alert.alert('Biometric Authentication Not Available');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {isAuthenticated
                    ? 'Welcome to the Secure App!'
                    : 'Please Authenticate to Continue'}
            </Text>
        <Button
            title="Authenticate with Biometrics"
            onPress={handleBiometricAuth}
        />
        </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });

export default AuthScreen;
