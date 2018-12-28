/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import firebase from  'react-native-firebase';
import CollectionItem from './components/CollectionItem';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      isLoading: true
    }

    this.itemsRef = this.getRef().child('ownCards');
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
      console.log(items);
      this.setState({
        dataSource: items,
        isLoading: false
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
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444444',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'black'
  }
});
