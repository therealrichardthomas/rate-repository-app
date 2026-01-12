import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Menu, Modal, Portal, Button } from 'react-native-paper';
import { useState } from 'react';
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
    padding: 10
  },
  buttonText: {
    color: 'black',
    fontWeight: 'normal'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;
const renderItem = ({item}) => (<RepositoryItem {...item} />);

export const MenuModal = ({ onSelect, currentPrinciple }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);


  return (
    <View >
      <Pressable style={styles.dropdown} onPress={openMenu}>
        <Button style={styles.buttonStyle} labelStyle={styles.buttonText}>{currentPrinciple}</Button>
        <Text style={{marginRight: 10}}>⏷</Text>
      </Pressable>
        <Portal>
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

export const RepositoryListContainer = ({ repositories, onSelect, currentPrinciple }) => {
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (<MenuModal onSelect={onSelect} currentPrinciple={currentPrinciple} />)}
      />
  )
}

const RepositoryList = () => {
  const [principle, setPrinciple] = useState('Latest repositories');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [orderBy, setOrderBy] = useState('CREATED_AT');

  const { repositories } = useRepositories(orderBy, orderDirection);

  const handleSelection = (selection) => {
    const { order, direction, principle } = selection;
    setOrderBy(order);
    setOrderDirection(direction);
    setPrinciple(principle);
  };
  
  return (
    <RepositoryListContainer repositories={repositories} onSelect={handleSelection} currentPrinciple={principle} />
  );
};

export default RepositoryList;