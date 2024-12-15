import React, { useState } from 'react';
import { View, Text, Button, Alert} from 'react-native';
import { authenticateWithBiometrics } from '../../utils/biometricAuth';
import { RootStackParamList } from '../../types/types';
import styles from './AuthScreen.styles';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AuthScreen'>;
type AuthScreenRouteProp = RouteProp<RootStackParamList, 'AuthScreen'>;

interface AuthScreenProps {
    navigation: AuthScreenNavigationProp;
    route: AuthScreenRouteProp;
  }

const AuthScreen: React.FC<AuthScreenProps> = ({navigation} : {navigation: any}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleBiometricAuth = async () => {
        const success = await authenticateWithBiometrics('Authenticate with Face ID / Touch ID');

        if (success) {
            setIsAuthenticated(true);
            navigation.navigate('TransactionsHistory');
        } else {
            Alert.alert('Authentication Failed');
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

export default AuthScreen;
