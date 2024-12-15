import React, { useCallback, useState, useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity, SectionList, RefreshControl, Image, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import sampleTransactions from '../../data/sampleTransactions.json';
import { Transaction, RootStackParamList } from '../../types/types';
import { RouteProp } from '@react-navigation/native';
import TransactionItem from '../../components/TransactionItem';
import { authenticateWithBiometrics } from '../../utils/biometricAuth';
import { groupByDate } from '../../utils/transactionUtils';
import styles from './TransactionsHistory.styles';


type TransactionsHistoryNavigationProp = StackNavigationProp<RootStackParamList, 'TransactionsHistory'>;
type TransactionsHistoryRouteProp = RouteProp<RootStackParamList, 'TransactionsHistory'>;

interface TransactionsHistoryProps {
  navigation: TransactionsHistoryNavigationProp;
  route: TransactionsHistoryRouteProp;
}

const TransactionsHistory: React.FC<TransactionsHistoryProps> = ({navigation}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amountVisible, setAmountVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  const authenticateToReveal = async () => {
    const success = await authenticateWithBiometrics('Authenticate to view amounts');
      if (success) {
        setAmountVisible(true);
      } else{
        Alert.alert('Authentication Failed');
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

  const filterTransactions = useCallback((query: string) => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTransactions(filtered);
  }, [transactions]);


  useEffect(() => {
    try{
      setTransactions(sampleTransactions);
      setFilteredTransactions(sampleTransactions);
    } catch (error) {
      console.error('Failed to load:', error);
    }
  }, []);

  useEffect(() => {
    // Whenever the search query changes, filter the transactions
    filterTransactions(searchQuery);
  }, [filterTransactions, searchQuery]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.revealButton} onPress={amountVisible ? () => setAmountVisible(false) : authenticateToReveal}>
        <Image source={amountVisible ? require('../../assets/hide.png') : require('../../assets/show.png')}/>
      </TouchableOpacity>
      <TextInput
        style={styles.searchBar}
        placeholder="Search transactions"
        value={searchQuery}
        onChangeText={setSearchQuery}  // Update search query on text change
      />
      <SectionList
        sections={groupByDate(filteredTransactions)}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({item}) => (
          <TransactionItem
            transaction={item}
            amountVisible={amountVisible}
            onPress={() => navigation.navigate('TransactionDetails', { transaction: item })}
          />
        )}
      />
    </View>
  );
};

export default TransactionsHistory;
