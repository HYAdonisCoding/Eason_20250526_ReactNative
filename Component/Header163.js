import React from 'react';
import { View, Image, Text, StyleSheet, PixelRatio, SafeAreaView } from 'react-native';
//   https://m.163.com/touch/news/
// https://static.ws.126.net/163/wap/f2e/ssr/static/media/logo-site-red.0146014c30353f1f25c6.png

const Header = () => (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.flex}>
        <Text style={styles.text}>
            <Text style={styles.text_1}>䋞易</Text>
            <Text style={styles.text_2}>新闻</Text>
            <Text>有态度°</Text>
        </Text>
        
    </View>
    </SafeAreaView>
    
);

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#ff0', // 保持与header一致
        flexDirection: 'row',
    },
    flex: {
        height: 44,
        borderBottomColor: '#CD1D1C',
        borderBottomWidth: 3/PixelRatio.get(),
        backgroundColor: '#ff0',
        flex: 1,
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 60,
        width: 160,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text_1: {
        color: '#CD1D1C',
    },
    text_2: {
        color: '#fff',
        backgroundColor: '#CD1D1C',
    },
});

export default Header;
