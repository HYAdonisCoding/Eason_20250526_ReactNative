import React, {useRef, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from './output.json';
import {CartContext} from './ShoppingCartView';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';

const ShoppingView = ({navigation}) => {
  const lastOffsetY = useRef(0);

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > lastOffsetY.current + 10) {
      // 上滑，隐藏导航栏
      navigation.setOptions({headerShown: false});
    } else if (offsetY < lastOffsetY.current - 10) {
      // 下滑，显示导航栏
      navigation.setOptions({headerShown: true});
    }
    lastOffsetY.current = offsetY;
  };

  //   加入购物车
  const {cart, setCart, cartCount, setCartCount, setCartBadgeVisible} = useContext(CartContext);


  const add_to_cart = item => {
    const idx = cart.findIndex(i => i.id === item.id);
    let newCart;
    if (idx > -1) {
      // 已有，数量+1
      newCart = cart.map((i, index) =>
        index === idx ? {...i, count: (i.count || 1) + 1} : i,
      );
    } else {
      // 没有，新增一条，数量为1
      newCart = [...cart, {...item, count: 1}];
    }
    setCart(newCart);
    setCartCount(newCart.reduce((sum, i) => sum + (i.count || 1), 0));
    AsyncStorage.setItem('cart', JSON.stringify(newCart));
    setCartBadgeVisible(true); // 有新商品加入时显示badge
  };

  var Item = ({item}) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity activeOpacity={0.8} style={{alignItems: 'center'}}>
          <Image
            source={{uri: item.img}}
            style={styles.cardImage}
            resizeMode="cover"
            onError={e => console.log('图片加载失败:', item.img, e.nativeEvent)}
          />
          <Text style={styles.cardName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.cardPrice}>￥{item.price}</Text>
          <Text style={styles.cardAttribute}>{item.attribute}</Text>
          <Text style={styles.cardCommit}>{item.commit}条评价</Text>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={add_to_cart.bind(this, item)}>
            <Text style={styles.cartButtonText}>加入购物车</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={data}
        renderItem={({item}) => <Item item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        numColumns={2} // 关键
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    padding: 12,
    width: 170,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 8,
  },
  cardName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
    minHeight: 36,
  },
  cardPrice: {
    fontSize: 16,
    color: '#aa7AFF',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardAttribute: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  cardCommit: {
    fontSize: 12,
    color: '#bbb',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  separator: {
    height: 0,
  },
  cartButton: {
    marginTop: 8,
    backgroundColor: '#aa7AFF',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ShoppingView;
