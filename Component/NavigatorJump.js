import React, { useLayoutEffect }  from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const data = [
  { key: '1', title: '让科研人员心无旁骛、潜心钻研' },
  { key: '2', title: '宁夏烧烤店爆炸致31死 15人获刑' },
  { key: '3', title: '马克龙被打脸后说了啥 唇语专家破解' },
  { key: '4', title: '端午节蕴含怎样的“数字密码”' },
  { key: '5', title: '美国对中国产大飞机动手了' },
  { key: '6', title: '在哈佛毕业礼上演讲的中国女孩是谁' },
];

const NewsHomePage = ({ navigation }) => {

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemContainer}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Detail', { title: item.title })}
        >
          <View style={styles.itemInner}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.arrow}>{'\u203A'}</Text>
          </View>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const Detail = ({ navigation, route }) => {
  const { title } = route.params || {};
  useLayoutEffect(() => {
    // 隐藏TabBar
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' },
    });
    // 返回时恢复TabBar
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [navigation]);
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>Detail Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 16,
    color: '#222',
    flex: 1,
  },
  arrow: {
    fontSize: 22,
    color: '#bbb',
    marginLeft: 10,
  },
  separator: {
    height: 4,
    backgroundColor: 'transparent',
  },
  detailContainer: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    elevation: 2,
  },
  text: {
    fontSize: 18,
    marginVertical: 8,
    color: '#333',
  },
});

export default NewsHomePage;
export {Detail}