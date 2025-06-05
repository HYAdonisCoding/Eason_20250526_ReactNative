import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsHomePage, {Detail} from './NavigatorJump';
import SearchView, {SearchHeader} from './SearchView';
import NewsSearchView from './NewsSearchView';
import NewsMinePage from './NewsMinePage';
import MessagePage from './MessagePage';
import ShoppingCartView from './ShoppingCartView';
import ShoppingView from './ShoppingView';
import { CartProvider, CartContext } from './ShoppingCartView';
import { useNavigationState } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height - 70;
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#aa7AFF', // 统一返回按钮和标题颜色
        // 你还可以统一设置标题样式
        headerTitleStyle: {color: '#aa7AFF'},
      }}>
      <Stack.Screen
        name="首页"
        component={NewsHomePage}
        options={({navigation}) => ({
          headerRight: () => (
            <TouchableOpacity
              style={{marginLeft: 16}}
              onPress={() => {
                navigation.getParent()?.setOptions({
                  tabBarStyle: {display: 'none'},
                });
                navigation.navigate('新浪微博');
              }}>
              <Text style={{fontSize: 16, color: '#aa7AFF'}}>微博</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen
        name="新浪微博"
        component={NewsSearchView}
        options={{
          title: '新浪微博',
          headerTitleAlign: 'center',
          //   presentation: 'push', // push\modal 或 'fullScreenModal'
        }}
      />
    </Stack.Navigator>
  );
}

const TabBar = () => {
  const { cartCount,cartBadgeVisible } = useContext(CartContext);
  // 获取当前tab路由名
  const navigationState = useNavigationState(state => state);
const currentRouteName =
  navigationState && navigationState.routes
    ? navigationState.routes[navigationState.index].name
    : '';
  const getInitialState = () => {
    return {
      selectedTab: 'home',
    };
  };
  const select = tabName => {
    this.setState({selectedTab: tabName});
  };
  return (
    
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#aa7AFF', // 选中时文字颜色
          tabBarInactiveTintColor: '#888', // 未选中时文字颜色
        }}>
        <Tab.Screen
          name="首页Tab"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={
                  focused
                    ? require('../assets/house.fill.png')
                    : require('../assets/house.png')
                }
                style={{
                  width: size ?? 24,
                  height: size ?? 24,
                  tintColor: color, // 图标颜色也跟随文字
                }}
                resizeMode="contain" // 关键：完整显示图片
              />
            ),
            tabBarLabel: '首页',
          }}
        />

        <Tab.Screen
          name="消息"
          component={MessagePage}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={
                  focused
                    ? require('../assets/message.fill.png')
                    : require('../assets/message.png')
                }
                style={{
                  width: size ?? 24,
                  height: size ?? 24,
                  tintColor: color, // 图标颜色也跟随文字
                }}
                resizeMode="contain" // 关键：完整显示图片
              />
            ),
            tabBarLabel: '消息',
          }}
        />

        {/* <Tab.Screen
          name="搜索"
          component={SearchView}
          options={{
            headerTitle: () => <SearchHeader />,
            headerTitleAlign: 'center',
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={
                  focused
                    ? require('../assets/magnifyingglass.circle.fill.png')
                    : require('../assets/magnifyingglass.circle.png')
                }
                style={{
                  width: size ?? 24,
                  height: size ?? 24,
                  tintColor: color, // 图标颜色也跟随文字
                }}
                resizeMode="contain" // 关键：完整显示图片
              />
            ),
            tabBarLabel: '搜索',
          }}
        /> */}

        <Tab.Screen
          name="浏览"
          component={ShoppingView}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={
                  focused
                    ? require('../assets/sparkles.tv.fill.png')
                    : require('../assets/sparkles.tv.png')
                }
                style={{
                  width: size ?? 24,
                  height: size ?? 24,
                  tintColor: color, // 图标颜色也跟随文字
                }}
                resizeMode="contain" // 关键：完整显示图片
              />
            ),
            tabBarLabel: '浏览',
          }}
        />

        <Tab.Screen
          name="购物车"
          component={ShoppingCartView}
          options={{
            tabBarBadge: cartBadgeVisible && cartCount > 0 ? cartCount : undefined,
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={
                  focused
                    ? require('../assets/cart.badge.clock.fill.png')
                    : require('../assets/cart.badge.clock.png')
                }
                style={{
                  width: size ?? 24,
                  height: size ?? 24,
                  tintColor: color, // 图标颜色也跟随文字
                }}
                resizeMode="contain" // 关键：完整显示图片
              />
            ),
            tabBarLabel: '购物车',
          }}
        />

        <Tab.Screen
          name="我的"
          component={NewsMinePage}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={
                  focused
                    ? require('../assets/person.fill.png')
                    : require('../assets/person.png')
                }
                style={{
                  width: size ?? 24,
                  height: size ?? 24,
                  tintColor: color, // 图标颜色也跟随文字
                }}
                resizeMode="contain" // 关键：完整显示图片
              />
            ),
            tabBarLabel: '我的',
          }}
        />
      </Tab.Navigator>
    
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  message: {
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  message_title: {
    fontSize: 18,
    color: '#18b5ff',
    marginBottom: 5,
  },
  list: {
    height: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabBar;
