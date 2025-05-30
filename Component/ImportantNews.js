import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  PixelRatio,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';

const ImportantNews = props => {
  const show = title => {
    Alert.alert(title);
  };
  var news = [];
  for (var i in props.news) {
    var text = (
      <Text
        onPress={() => show(props.news[i])}
        numberOfLines={2}
        style={styles.news_item}>
        {props.news[i]}
      </Text>
    );
    news.push(text);
  }
  return (
    <View style={styles.flex}>
      <Text style={styles.news_title}>今日要闻</Text>
      {news}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#0ff',
  },
  flex: {
    flex: 1,
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
  news_title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 15,
    color: '#cd1d1c',
  },
  news_item: {
    lineHeight: 20,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,

  },
});

export default ImportantNews;
