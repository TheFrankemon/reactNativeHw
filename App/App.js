/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text, TouchableHighlight, Modal, Picker } from 'react-native';
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
      inputValues: {
        name: '',
        price: null,
        type: '',
        set: '',
        rarity: ''
      }
    }

    this.itemsRef = this.getRef().child('ownCards');
  }

  setModalVisible(visible) {
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

  async saveItem() {
    await firebase.database().ref('ownCards').push({
      title: this.state.inputValues.name,
      price: this.state.inputValues.price,
      type: this.state.inputValues.type,
      set: this.state.inputValues.set,
      rarity: this.state.inputValues.rarity,
      image: 'https://www.yugiohcardmaker.net/ycmaker/createcard.jpg'
    });

    this.setModalVisible(false);
  }

  componentDidMount() {
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
                <FormLabel>Card name</FormLabel>
                <FormInput
                  onChangeText={value => this.setState((prevState) => ({
                    inputValues: Object.assign({}, prevState.inputValues, {name: value})
                  }))}
                  containerStyle={styles.inputField}/>
                <FormLabel>Card price</FormLabel>
                <FormInput
                  onChangeText={value => this.setState((prevState) => ({
                    inputValues: Object.assign({}, prevState.inputValues, {price: value})
                  }))}
                  keyboardType='numeric'
                  containerStyle={styles.inputField}/>
                <FormLabel>Card type</FormLabel>
                <View style={[styles.inputField, styles.picker]}>
                  <Picker
                    selectedValue={this.state.inputValues.type}
                    onValueChange={(itemValue, itemIndex) => this.setState((prevState) => ({
                      inputValues: Object.assign({}, prevState.inputValues, {type: itemValue})
                    }))}>
                    <Picker.Item label="Normal" value="Normal"/>
                    <Picker.Item label="Effect" value="Effect"/>
                    <Picker.Item label="Ritual" value="Ritual"/>
                    <Picker.Item label="Fusion" value="Fusion"/>
                    <Picker.Item label="Synchro" value="Synchro"/>
                    <Picker.Item label="XYZ" value="XYZ"/>
                    <Picker.Item label="Link" value="Link"/>
                    <Picker.Item label="Token" value="Token"/>
                    <Picker.Item label="Spell" value="Spell"/>
                    <Picker.Item label="Trap" value="Trap"/>
                  </Picker>
                </View>
                <FormLabel>Card set</FormLabel>
                <FormInput
                  onChangeText={value => this.setState((prevState) => ({
                    inputValues: Object.assign({}, prevState.inputValues, {set: value})
                  }))}
                  containerStyle={styles.inputField}/>
                <FormLabel>Card rarity</FormLabel>
                <View style={[styles.inputField, styles.picker]}>
                  <Picker
                    selectedValue={this.state.inputValues.rarity}
                    onValueChange={(itemValue, itemIndex) => this.setState((prevState) => ({
                      inputValues: Object.assign({}, prevState.inputValues, {rarity: itemValue})
                    }))}>
                    <Picker.Item label="Common Rare" value="Common Rare"/>
                    <Picker.Item label="Rare" value="Rare"/>
                    <Picker.Item label="Super Rare" value="Super Rare"/>
                    <Picker.Item label="Ultra Rare" value="Ultra Rare"/>
                    <Picker.Item label="Secret Rare" value="Secret Rare"/>
                    <Picker.Item label="Ultimate Rare" value="Ultimate Rare"/>
                    <Picker.Item label="Gold Rare" value="Gold Rare"/>
                    <Picker.Item label="Ghost Rare" value="Ghost Rare"/>
                  </Picker>
                </View>
              </View>
              <TouchableHighlight style={styles.modalActionButton} onPress={() => { this.saveItem(); }}>
                <Icon name='save' color='white'/>
              </TouchableHighlight>
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
  modalActionButton: {
    position: 'absolute',
    bottom: -100,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 20
  },
  modalTitle: {
    fontSize: 24,
    color: '#444444'
  },
  inputField: {
    borderBottomWidth: 2,
    borderBottomColor: '#00BCD4'
  },
  picker: {
    marginHorizontal: 15
  },
});
