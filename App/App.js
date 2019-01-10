/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text, TouchableHighlight, Modal } from 'react-native';
import { Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import firebase from  'react-native-firebase';
import CollectionItem from './components/CollectionItem';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      isLoading: true,
      modalVisible: false,
      nameInputValue: ''
    }

    this.itemsRef = this.getRef().child('ownCards');
  }

  setModalVisible(visible) {
    console.log('visible value is: ' + visible);
    this.setState({modalVisible: visible});
  }

  renderItem = ({item}) => {
    return (
      <CollectionItem item={item}></CollectionItem>
    )
  }

  renderSeparator = () => {
    return (
      <View style={styles.separator}>
      </View>
    )
  }

  getRef() {
    return firebase.database().ref();
  }

  componentDidMount() {
    // await firebase.database().ref('ownCards/1').set({
    //   title: 'Dark Magician'
    // });

    this.getItems(this.itemsRef);
  }

  getItems(itemsRef) {
    itemsRef.on('value', (snapshot) => {
      let items = [];
      snapshot.forEach(child => {
        items.push({
          title: child.val().title,
          image: child.val().image,
          price: child.val().price,
          rarity: child.val().rarity,
          set: child.val().set,
          type: child.val().type,
          _key: child.key
        })
      });

      this.setState({
        dataSource: items,
        isLoading: false,
        nameInputValue: ''
      })
    })
  }

  render() {
    return (
      this.state.isLoading
      ?
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#330066" animating></ActivityIndicator>
      </View>
      :
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(_item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <TouchableHighlight style={styles.actionButton} onPress={() => { this.setModalVisible(true); }}>
          <Text style={styles.actionButtonLabel}>+</Text>
        </TouchableHighlight>
        <View style={styles.modalContent}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>New Card</Text>
                <TouchableHighlight onPress={() => { this.setModalVisible(false); }}>
                  <Icon name='close' color='#00aced'/>
                </TouchableHighlight>
              </View>
              <View>
                <FormLabel>Card Name</FormLabel>
                <FormInput
                  onChangeText={value => this.setState({ nameInputValue: value })}
                  containerStyle={styles.inputField}/>
                <FormValidationMessage>Error message</FormValidationMessage>
                <FormLabel>Card Price</FormLabel>
                <FormInput
                  onChangeText={value => this.setState({ nameInputValue: value })}
                  keyboardType='numeric'
                  containerStyle={styles.inputField}/>
                <FormValidationMessage>Error message</FormValidationMessage>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444444'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'gray'
  },
  actionButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#00BCD4'
  },
  actionButtonLabel: {
    fontSize: 36,
    color: 'white',
    marginBottom: 5
  },
  modalContent: {
    marginTop: 22
  },
  modalHeader: {
    flexDirection: 'row'
  },
  modalTitle: {
    fontSize: 24,
    color: '#444444'
  },
  inputField: {
    borderBottomWidth: 2,
    borderBottomColor: '#00BCD4'
  }
});
