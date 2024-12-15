import React, { useCallback, useState, useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity, SectionList, StyleSheet, RefreshControl, Image } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

import sampleTransactions from './data/sampleTransactions.json';


interface Transaction {
  id: number;
  amount: number;
  date: string;
  description: string;
  type: string;
}

const groupByDate = (transactions: Transaction[]) => {
  const groupedtransactions = transactions.reduce((acc: {[key: string]: Transaction[]}, transaction) => {
    const date = transaction.date;
    if(!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {});

  const sortedGroupedTransactions = Object.entries(groupedtransactions).sort(([a], [b]) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });
  return sortedGroupedTransactions;
};

const HomeScreen = ({navigation} : {navigation: any}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amountVisible, setAmountVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const authenticateToReveal = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    try {
      const {biometryType} = await rnBiometrics.isSensorAvailable();
      if (biometryType) {
        const { success } = await rnBiometrics.simplePrompt({
          promptMessage: 'Authenticate to view amounts',
        });
        if (success) {
          setAmountVisible(true);
        } else{
          Alert.alert('Authentication Failed');
        }
      } else {
        Alert.alert('Unsupported', 'Biometric authentication not available.');
      }
    } catch (error) {
      console.error('Biometric error:', error);
      Alert.alert('Error', 'Something went wrong during authentication.');
    }
  };


  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate fetching new data
    setTimeout(() => {
      setTransactions(prev => [
        ...prev,
        { id: 21, amount: -20.00, date: '2024-12-22', description: 'Coffee', type: 'debit' },
      ]);
      setRefreshing(false);
    }, 2000);
  }, []);

  const groupedTransactions = groupByDate(transactions).map(([date, data]) => {
    return ({
    title: date,
    data: data,
    });
  });

  useEffect(() => {
    setTransactions(sampleTransactions);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.revealButton} onPress={amountVisible ? () => setAmountVisible(false) : authenticateToReveal}>
        <Image source={amountVisible ? require('./assets/hide.png') : require('./assets/show.png')}/>
      </TouchableOpacity>
      <SectionList
        sections={groupedTransactions}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.transactionItem}
            onPress={() => navigation.navigate('TransactionDetails', {transaction: item})}
          >
            <Text>{item.description}</Text>
            <Text>{amountVisible ? `${item.amount > 0 ? '+' : ''}${item.amount.toFixed(2)}` : '****' }</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },

  transactionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  revealButton: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'flex-end',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
    backgroundColor: '#eee',
  },
});

export default HomeScreen;
