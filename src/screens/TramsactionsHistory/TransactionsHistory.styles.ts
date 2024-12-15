import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    marginBottom: 16,
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

export default styles;
