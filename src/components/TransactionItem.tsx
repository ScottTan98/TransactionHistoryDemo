import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TransactionItemProps {
  transaction: { id: number; amount: number; description: string; date: string; type: string };
  amountVisible: boolean;
  onPress: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, amountVisible, onPress }) => {
  return (
    <TouchableOpacity style={styles.transactionItem} onPress={onPress}>
      <Text style={styles.textFont}>{transaction.description}</Text>
      <Text style={styles.textFont}>{amountVisible ? `${transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}` : '****'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    padding: 20,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textFont: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionItem;
