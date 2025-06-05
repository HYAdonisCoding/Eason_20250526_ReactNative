import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const CartContext = createContext();
import {useNavigation, useFocusEffect} from '@react-navigation/native';

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartBadgeVisible, setCartBadgeVisible] = useState(true);
  React.useEffect(() => {
    AsyncStorage.getItem('cart').then(res => {
      if (res) {
        const arr = JSON.parse(res);
        setCart(arr);
        setCartCount(arr.length);
      }
    });
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartCount,
        setCartCount,
        cartBadgeVisible,
        setCartBadgeVisible,
      }}>
      {children}
    </CartContext.Provider>
  );
};
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';

const ShoppingCartView = () => {
  const navigation = useNavigation();
  const {cart, setCart, cartCount, setCartCount} = useContext(CartContext);

  const {setCartBadgeVisible} = useContext(CartContext);

  useFocusEffect(
    React.useCallback(() => {
      setCartBadgeVisible(false); // 进入购物车时隐藏badge
    }, []),
  );
  //   console.log(cart);
  // 合并重复商品，只保留一条，并累加count
  function mergeCart(cart) {
    const map = {};
    cart.forEach(item => {
      if (map[item.id]) {
        map[item.id].count = (map[item.id].count || 1) + (item.count || 1);
      } else {
        map[item.id] = {...item, count: item.count || 1};
      }
    });
    return Object.values(map);
  }
  const mergedCart = mergeCart(cart);
  //   console.log(mergedCart);
  const changeCount = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    if (item.count === 1 && delta === -1) {
      Alert.alert('提示', '是否删除该商品？', [
        {text: '取消', style: 'cancel'},
        {
          text: '删除',
          style: 'destructive',
          onPress: () => {
            const newCart = cart.filter(i => i.id !== id);
            setCart(newCart);
            AsyncStorage.setItem('cart', JSON.stringify(newCart));
          },
        },
      ]);
    } else {
      const newCart = cart.map(i => {
        if (i.id === id) {
          const newCount = (i.count || 1) + delta;
          return {...i, count: newCount > 1 ? newCount : 1};
        }
        return i;
      });
      setCart(newCart);
      AsyncStorage.setItem('cart', JSON.stringify(newCart));
    }
  };
  var ProductItem = ({item}) => (
    <View style={styles.cartCard}>
      <Image source={{uri: item.img}} style={styles.cartImage} />
      <View style={styles.cartInfo}>
        <Text style={styles.cartName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.cartRow}>
          <Text style={styles.cartPrice}>￥{item.price}</Text>
          <View style={styles.countBox}>
            <TouchableOpacity onPress={() => changeCount(item.id, -1)}>
              <Text style={styles.countBtn}>-</Text>
            </TouchableOpacity>
            <Text style={styles.cartCount}> {item.count} </Text>
            <TouchableOpacity onPress={() => changeCount(item.id, 1)}>
              <Text style={styles.countBtn}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
  if (mergedCart.length === 0) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={{fontSize: 18, color: '#888', marginBottom: 20}}>
          还没加入过商品，先去浏览吧
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#aa7AFF',
            borderRadius: 20,
            paddingHorizontal: 28,
            paddingVertical: 10,
          }}
          onPress={() => navigation.navigate('浏览')}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
            去浏览
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mergedCart}
        renderItem={({item}) => <ProductItem item={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 10,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 12,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cartImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginRight: 14,
  },
  cartInfo: {
    flex: 1,
    // justifyContent: 'space-between',
  },
  cartName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  cartAttr: {
    fontSize: 13,
    color: '#888',
    marginBottom: 10,
  },
  cartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartPrice: {
    fontSize: 17,
    color: '#aa7AFF',
    fontWeight: 'bold',
  },
  countBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 10,
  },
  countBtn: {
    fontSize: 18,
    color: '#aa7AFF',
    width: 28,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cartCount: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
    minWidth: 24,
    textAlign: 'center',
  },
});

export default ShoppingCartView;
