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
          <View style={styles.topContainer}>
            <Text style={styles.title}>
              {item.title}
            </Text>
            <Text style={styles.price}>
              $ {item.price}
            </Text>
          </View>
          <Text style={styles.type}>
            {item.type}
          </Text>
          <Text style={styles.set}>
            {item.set}
          </Text>
          <Text style={styles.set}>
            {item.rarity}
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
    flexDirection: 'column',
    marginLeft: 5
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10
  },
  image: {
    width: 70,
    height: 100,
    margin: 5
  },
  title: {
    fontSize: 18,
    color: '#2196F3'
  },
  type: {
    color: '#DDDDDD'
  },
  price: {
    fontSize: 22,
    color: 'white'
  },
  set: {
    fontSize: 16,
    color: '#9E9E9E'
  }
});