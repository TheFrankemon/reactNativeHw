import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';

export default class CollectionItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var item = this.props.item

    return (
      <TouchableOpacity style={styles.collectionItem} onPress={() => ToastAndroid.show(item.title, ToastAndroid.SHORT)}>
        <Image style={styles.image} source={{ uri: item.image }}/>
        <View style={styles.collectionLabels}>
          <Text style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.set}>
            {item.set}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  collectionItem: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 3
  },
  collectionLabels: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5
  },
  image: {
    width: 80,
    height: 80,
    margin: 5
  },
  title: {
    fontSize: 18,
    color: '#2196F3',
    marginBottom: 15,
  },
  set: {
    fontSize: 16,
    color: '#9E9E9E'
  }
});