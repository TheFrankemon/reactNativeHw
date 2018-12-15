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
import CollectionItem from './components/CollectionItem';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      isLoading: true
    }
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

  componentDidMount() {
    const url = 'http://www.json-generator.com/api/json/get/ccLAsEcOSq?indent=1'
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.book_array,
          isLoading: false
        })
      })
      .catch((error) => {
        console.log(error);
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
          keyExtractor={(item, index) => index}
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
