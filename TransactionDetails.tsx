import React from 'react';
import { View, Text, StyleSheet,} from 'react-native';

const TransactionDetails = ({ route } : any) => {
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  backButton: { color: '#007bff', marginBottom: 16 },
  amount: { fontSize: 32, fontWeight: 'bold', marginBottom: 16 },
  details: { fontSize: 16, marginBottom: 8 },
});

export default TransactionDetails;
