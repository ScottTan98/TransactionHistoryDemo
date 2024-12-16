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

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ route }) => {
  const { transaction } = route.params;

  return (
    <>
      <View style={styles.summaryContainer}>
        <Text style={styles.amount}>{transaction.amount.toFixed(2)} {transaction.currency}</Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{transaction.type}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Transaction details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Description</Text>
          <Text style={styles.detailValue}>{transaction.description}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}>{transaction.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Currency</Text>
          <Text style={styles.detailValue}>{transaction.currency}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Transaction Type</Text>
          <Text style={styles.detailValue}>{transaction.type}</Text>
        </View>
      </View>
    </>
  );
};



export default TransactionDetails;
