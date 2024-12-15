import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/types';
import styles from './TransactionDetails.styles';


type TransactionDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'TransactionDetails'>;
type TransactionDetailsRouteProp = RouteProp<RootStackParamList, 'TransactionDetails'>;

interface TransactionDetailsProps {
  navigation: TransactionDetailsNavigationProp;
  route: TransactionDetailsRouteProp;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ route } : any) => {
  const { transaction } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.amount}>{transaction.amount.toFixed(2)}</Text>
      <Text style={styles.details}>Description: {transaction.description}</Text>
      <Text style={styles.details}>Date: {transaction.date}</Text>
      <Text style={styles.details}>Type: {transaction.type}</Text>
    </View>
  );
};



export default TransactionDetails;
