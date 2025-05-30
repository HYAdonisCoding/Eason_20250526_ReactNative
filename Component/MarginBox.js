import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BoxStyles = StyleSheet.create({
  box: {
    width: 300,
    height: 300,
    backgroundColor: '#43CD80',
    borderRadius: 10,
    margin: 40,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    position: 'absolute',
    top: 10,
    left: 60,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(72, 184, 122, 0.7)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(67,205,128,0.7)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  left: {
    position: 'absolute',
    top: 40,
    bottom: 40,
    left: 0,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(67,205,128,0.7)',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  right: {
    position: 'absolute',
    top: 40,
    bottom: 40,
    right: 0,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(67,205,128,0.7)',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  centerBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 100,
    height: 100,
    marginLeft: -50,
    marginTop: -50,
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  centerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  marginBox: {
    marginTop: 100,
    alignItems: 'center',
  },
});

const Box = props => (
  <View style={BoxStyles.box}>
    <View style={BoxStyles.top}>
      <Text style={BoxStyles.text}>top</Text>
    </View>
    <View style={BoxStyles.left}>
      <Text style={BoxStyles.text}>left</Text>
      {props.children}
    </View>
    <View style={BoxStyles.right}>
      <Text style={BoxStyles.text}>right</Text>
    </View>
    <View style={BoxStyles.bottom}>
      <Text style={BoxStyles.text}>bottom</Text>
    </View>
    {/* 中间红色 margin */}
    <View style={BoxStyles.centerBox}>
      <Text style={BoxStyles.centerText}>margin</Text>
    </View>
  </View>
);

const MargginBox = props => (
  <View style={BoxStyles.marginBox}>
    <Box>{props.children}</Box>
  </View>
);

const BoxContainer = () => <MargginBox />;

export default BoxContainer;