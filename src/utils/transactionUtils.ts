import { Transaction } from '../types/types';

export const groupByDate = (transactions: Transaction[]) => {
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
  return sortedGroupedTransactions.map(([date, transactionsData]) => ({
    title: date,
    data: transactionsData,
  }));
};