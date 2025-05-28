/**
 * @format
 */

import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
import {name as appName} from './app.json';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {List} from './Component/FirstComponent';

var Component = () => {
  return (
    <View style={styles.componentContainer}>
      <Text style={styles.textContainer}>Hello, World!</Text>
    </View>
  );
}
const Eason = () => {
  return (
    <View style={styles.container}>
      <Component/>  
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
  alignItems: 'center',         // 水平居中
  justifyContent: 'center',     // 垂直居中
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
        <Stack.Screen name="首页" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => App);