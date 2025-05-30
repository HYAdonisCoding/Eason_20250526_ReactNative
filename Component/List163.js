import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  PixelRatio,
  SafeAreaView,
} from 'react-native';
//   https://m.163.com/touch/news/
// https://static.ws.126.net/163/wap/f2e/ssr/static/media/logo-site-red.0146014c30353f1f25c6.png



const List163 = props => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.list_item}>
      <Text style={styles.list_item_font}>{props.title}</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#0ff',
    // flexDirection: 'row',
  },
  list_item: {
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#Ff0067',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  list_item_font: {
    fontSize: 16,
  },
});

export default List163;
