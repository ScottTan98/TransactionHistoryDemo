import React, { useCallback, useState, useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity, SectionList, RefreshControl, Image, TextInput, ActivityIndicator } from 'react-native';
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        { id: 21, amount: -20.00, date: '2024-12-22', description: 'Coffee', type: 'debit', currency: 'MYR' },
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
    // mimic fetch from api
    const fetchTransactions = async () => {
    try{
      const response : Transaction[] = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(sampleTransactions);
        }, 2000); // Simulate a 2-second delay
      });
      setTransactions(response);
      setFilteredTransactions(response);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load:', error);
    }
  };
  fetchTransactions();
  }, []);

  useEffect(() => {
    filterTransactions(searchQuery);
  }, [filterTransactions, searchQuery]);

  return (
    <>
    {isLoading ? <ActivityIndicator/> :
      <View style={styles.container}>
        <View style={styles.searchBarView}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.revealButton} onPress={amountVisible ? () => setAmountVisible(false) : authenticateToReveal}>
            <Image style={styles.iconImage} source={amountVisible ? require('../../assets/hide.png') : require('../../assets/show.png')}/>
          </TouchableOpacity>
        </View>
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
    }
    </>
  );
};

export default TransactionsHistory;
