export interface Transaction {
  id: number;
  amount: number;
  date: string;
  description: string;
  type: string;
}

export type RootStackParamList = {
  AuthScreen: undefined;
  TransactionsHistory: undefined;
  TransactionDetails: { transaction: Transaction };
};