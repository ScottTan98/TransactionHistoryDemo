import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  summaryContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  tag: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#495057',
    textTransform: 'capitalize',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 15,
    borderRadius: 12,
    padding: 16,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 14,
    color: '#212529',
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default styles;
