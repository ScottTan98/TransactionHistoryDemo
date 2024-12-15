import React from 'react';
import { View, Text, TouchableOpacity, Alert} from 'react-native';
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

    const handleBiometricAuth = async () => {
        const success = await authenticateWithBiometrics('Authenticate with Face ID / Touch ID');

        if (success) {
            navigation.navigate('TransactionsHistory');
        } else {
            Alert.alert('Authentication Failed');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transaction History Module</Text>
        <TouchableOpacity style={styles.button} onPress={handleBiometricAuth}>
            <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        </View>
  );
};

export default AuthScreen;
