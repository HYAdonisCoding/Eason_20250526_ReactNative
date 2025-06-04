import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsHomePage, {Detail} from './NavigatorJump';
import SearchView, {SearchHeader} from './SearchView';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height - 70;
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="首页" component={NewsHomePage} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        
      />
    </Stack.Navigator>
  );
}

const TabBar = () => {
  const getInitialState = () => {
    return {
      selectedTab: 'home',
    };
  };
  const select = tabName => {
    this.setState({selectedTab: tabName});
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#aa7AFF', // 选中时文字颜色
          tabBarInactiveTintColor: '#888', // 未选中时文字颜色
        }}>
        <Tab.Screen
          name="首页"
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
          component={() => <Text>消息</Text>}
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

        <Tab.Screen
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
        />

        <Tab.Screen
          name="我的"
          component={() => <Text>我的</Text>}
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
    </NavigationContainer>
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
