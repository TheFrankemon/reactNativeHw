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
      <TouchableOpacity style={styles.collectionItem} onPress={() => ToastAndroid.show(item.book_title, ToastAndroid.SHORT)}>
        <Image style={styles.image} source={{ uri: item.image }}/>
        <View style={styles.collectionLabels}>
          <Text style={styles.title}>
            {item.book_title}
          </Text>
          <Text style={styles.author}>
            {item.author}
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
    color: 'green',
    marginBottom: 15,
  },
  author: {
    fontSize: 16,
    color: 'red'
  }
});