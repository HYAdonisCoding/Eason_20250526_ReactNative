/**
 * @format
 */

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {name as appName} from './app.json';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {List} from './Component/FirstComponent';
import HomePage from './Component/HomePage';
import NavigatorJump, {Detail} from './Component/NavigatorJump';
import SearchView, {SearchHeader} from './Component/SearchView';
import BoxContainer from './Component/MarginBox';
import TabBar from './Component/TabBar';

var Component = () => {
  return (
    <View style={styles.componentContainer}>
      <Text style={styles.textContainer}>Hello, World!</Text>
    </View>
  );
};
const Eason = () => {
  return (
    <View style={styles.container}>
      <Component />
      <Image
        source={{uri: 'https://reactnative.dev/docs/assets/p_cat2.png'}}
        style={styles.image}
      />
      <Text style={styles.text}>Eason{'\n'}欢迎来到React Native的世界</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  componentContainer: {
    backgroundColor: '#43CD80', // 葱花绿
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center', // 水平居中
    justifyContent: 'center', // 垂直居中
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
  },
  textContainer: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
});

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return <List />;
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={NavigatorJump}
          options={({navigation}) => ({
            title: '首页',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Search')}
                style={{marginRight: 16}}>
                <Text style={{fontSize: 16, color: '#007AFF'}}>搜索</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{title: '详情'}}
        />
        <Stack.Screen
          name="Search"
          component={SearchView}
          options={{
            headerTitle: () => <SearchHeader />,
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => TabBar);
