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
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 260,
    marginBottom: 16,
  },
  searchBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginBottom: 20,
    borderBottomColor: '#ccc',
  },
  revealButton: {
    padding: 6,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'flex-end',
  },
  sectionHeader: {
    fontSize: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default styles;
