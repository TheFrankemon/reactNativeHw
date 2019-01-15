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
                <FormLabel>Card name</FormLabel>
                <FormInput
                  onChangeText={value => this.setState({inputValues: {name: value}})}
                  containerStyle={styles.inputField}/>
                <FormLabel>Card price</FormLabel>
                <FormInput
                  onChangeText={value => this.setState({inputValues: {price: value}})}
                  keyboardType='numeric'
                  containerStyle={styles.inputField}/>
                <FormLabel>Card type</FormLabel>
                <Picker
                  selectedValue={this.state.inputValues.type}
                  // style={{ height: 50, width: 100 }}
                  style={{ borderBottomColor: 'red', borderBottomWidth: 1 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({inputValues: {type: itemValue}})}>
                  <Picker.Item label="Normal" value="normal"/>
                  <Picker.Item label="Effect" value="effect"/>
                  <Picker.Item label="Ritual" value="ritual"/>
                  <Picker.Item label="Fusion" value="fusion"/>
                  <Picker.Item label="Synchro" value="synchro"/>
                  <Picker.Item label="XYZ" value="xyz"/>
                  <Picker.Item label="Link" value="link"/>
                  <Picker.Item label="Token" value="token"/>
                  <Picker.Item label="Spell" value="spell"/>
                  <Picker.Item label="Trap" value="trap"/>
                </Picker>
                <FormLabel>Card set</FormLabel>
                <FormInput
                  onChangeText={value => this.setState({inputValues: {set: value}})}
                  containerStyle={styles.inputField}/>
                <FormLabel>Card rarity</FormLabel>
                <Picker
                  selectedValue={this.state.inputValues.rarity}
                  // style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({inputValues: {rarity: itemValue}})}>
                  <Picker.Item label="Common Rare" value="common"/>
                  <Picker.Item label="Rare" value="rare"/>
                  <Picker.Item label="Super Rare" value="super-rare"/>
                  <Picker.Item label="Ultra Rare" value="ultra-rare"/>
                  <Picker.Item label="Secret Rare" value="secret-rare"/>
                  <Picker.Item label="Ultimate Rare" value="ultimate-rare"/>
                  <Picker.Item label="Gold Rare" value="gold-rare"/>
                  <Picker.Item label="Ghost Rare" value="ghost-rare"/>
                </Picker>
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
  }
});
