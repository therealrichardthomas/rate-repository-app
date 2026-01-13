import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { Menu, Modal, Portal, Button } from 'react-native-paper';
import React, { useState } from 'react';
import theme from '../theme';
import Text from './Text';
import RepositoryItem from './RepositoryItem'

import useRepositories from '../hooks/useRepositories';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  selectText: {
    color: theme.colors.textSecondary,
  },
  itemStyle: {
    width: '100%',
    maxWidth: '100%',
  },
  dropdown: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonStyle: {
    paddingVertical: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'normal',
    marginHorizontal: 0,
    marginVertical: 0,
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  search: {
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 30,
    flexGrow: 1,
    borderRadius: 5
  },
  searchIcon: {
    zIndex: 30, 
    position: 'absolute', 
    top: 3.5,
    left: 8, 
    fontSize: 25, 
    transform: [{scaleX: -1}],
  },
  clearIcon: {
    zIndex: 30, 
    position: 'absolute', 
    top: 5,
    right: 8, 
    fontSize: 15, 
    transform: [{scaleX: -1}],
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 15,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;
const renderItem = ({item}) => (<RepositoryItem {...item} />);

export const MenuModal = ({ onSelect, currentPrinciple }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);


  return (
    <View style={{paddingVertical: 5}}>
      <Pressable style={styles.dropdown} onPress={openMenu}>
        <Button style={styles.buttonStyle} labelStyle={styles.buttonText}>{currentPrinciple}</Button>
        <Text style={{marginRight: 10}}>⏷</Text>
      </Pressable>
      <Portal style={{padding: 10}}>
        <Modal
          visible={visible}
          onDismiss={closeMenu}
          contentContainerStyle={styles.modalContainer}>
            <Menu.Item onPress={() => {}} disabled title="Select an item..." titleStyle={styles.selectText} />
            <Menu.Item onPress={() => {
                onSelect({order: 'CREATED_AT', direction: 'DESC', principle: 'Latest repositories'});
                closeMenu();
              }} title="Latest repositories" style={styles.itemStyle} />
            <Menu.Item onPress={() => {
                onSelect({order: 'RATING_AVERAGE', direction: 'DESC', principle: 'Highest rated repositories'})
                closeMenu();
              }} title="Highest rated repositories" style={styles.itemStyle} />
            <Menu.Item onPress={() => {
                onSelect({order: 'RATING_AVERAGE', direction: 'ASC', principle: 'Lowest rated repositories'})
                closeMenu();
              }} title="Lowest rated repositories" style={styles.itemStyle} />

        </Modal>
      </Portal>
    </View>
  )

}

export class RepositoryListContainer extends React.Component{
  renderHeader = () => {
    const { repositories, onSelect, currentPrinciple, search, setSearch } = this.props;
    
    return (
      <View style={styles.header}>
        <View style={styles.searchContainer} >
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput 
            style={styles.search}
            value={search}
            onChangeText={setSearch}
            placeholder='Search'
            autoCapitalize='none'
            autoCorrect={false}
            />
          <Text onPress={() => setSearch('')} style={styles.clearIcon}>✖️</Text>
        </View>
        <MenuModal onSelect={onSelect} currentPrinciple={currentPrinciple} />
      </View>
    );
  };
  
  render() {
    const { repositories } = this.props;
    const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    )
  }
}

const RepositoryList = () => {
  const [principle, setPrinciple] = useState('Latest repositories');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [orderBy, setOrderBy] = useState('CREATED_AT');

  const [searchKeyword, setSearchKeyword] = useState('');

  const { repositories } = useRepositories(orderBy, orderDirection, searchKeyword);

  const handleSelection = (selection) => {
    const { order, direction, principle } = selection;
    setOrderBy(order);
    setOrderDirection(direction);
    setPrinciple(principle);
  };
  
  return (
    <RepositoryListContainer repositories={repositories} onSelect={handleSelection} currentPrinciple={principle} search={searchKeyword} setSearch={setSearchKeyword} />
  );
};

export default RepositoryList;