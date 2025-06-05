import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../utils/ScreenUtil';

const NewsSearchView = ({navigation, route}) => {
  useLayoutEffect(() => {
    // 返回时恢复TabBar
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [navigation]);
  return (
    <View style={styles.container}>
      <WebView
      // injectedJavaScriptBeforeContentLoaded 测试隐藏按钮
        injectedJavaScript={`
          function hideBtn() {
            var btn = document.querySelector('.nav-right') 
                  || document.querySelector('[class*="nav-right"]');
            if(btn) {
              btn.style.display = 'none';
              window.ReactNativeWebView && window.ReactNativeWebView.postMessage('hideBtn: success');
            } else {
              setTimeout(hideBtn, 300);
              window.ReactNativeWebView && window.ReactNativeWebView.postMessage('hideBtn: retry');
            }
          }
          hideBtn();
          true;
        `}
        onMessage={event => {
          console.log('WebView message:', event.nativeEvent.data);
        }}
        bounces={false}
        source={{uri: 'https://weibo.com/'}}
        style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}></WebView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewsSearchView;
