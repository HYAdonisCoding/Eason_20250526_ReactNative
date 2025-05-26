/**
 * @format
 */

import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
import {name as appName} from './app.json';
import React from 'react';

const Eason = () => {
  return (
    <View style={styles.container}>
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
});

AppRegistry.registerComponent(appName, () => Eason);