/****
 * AMapScreen - 使用 WebView 加载高德地图 Web JS SDK 的组件
 * 
 * 功能说明：
 * - 使用高德地图 API 渲染基础地图
 * - 添加页面美化样式，包括标题栏和容器边框
 * - 避免使用原生 SDK，适用于测试和国内环境地图展示
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const AMapScreen = () => {
  // 定义 HTML 内容，包含页面结构和样式
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>高德地图示例</title>
      <style>
        /* 页面整体样式，设置背景色和字体 */
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          background-color: #f0f0f0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        }
        /* 顶部标题栏样式 */
        #header {
          background-color: #007AFF;
          color: white;
          padding: 12px;
          text-align: center;
          font-size: 18px;
          font-weight: bold;
        }
        /* 地图容器样式，带边框和圆角 */
        #container {
          height: calc(100% - 48px);
          margin: 12px;
          border: 2px solid #007AFF;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }
        #locateBtn {
          position: absolute;
          top: 60px;
          right: 20px;
          z-index: 999;
          padding: 10px 14px;
          background-color: #ffffff;
          border: 1px solid #007AFF;
          border-radius: 8px;
          font-size: 14px;
          color: #007AFF;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }
      </style>
      <!-- 引入高德地图 JS API -->
      <script src="https://webapi.amap.com/maps?v=2.0&key=49d85fb8d9e416820a1b314d27d2f7c9"></script>
    </head>
    <body>
      <!-- 页面顶部标题 -->
      <div id="header">高德地图示例</div>
      <!-- 地图展示容器 -->
      <div id="container">
        <button id="locateBtn">📍 定位我</button>
      </div>
      <script>
        // 初始化地图对象，设置缩放级别和中心点坐标
        var map = new AMap.Map('container', {
          zoom: 11,
          center: [116.397428, 39.90923]
        });

        // 点击地图时添加标记
        map.on('click', function(e) {
          new AMap.Marker({
            position: e.lnglat,
            map: map
          });
        });

        // 点击按钮定位
        document.getElementById('locateBtn').addEventListener('click', function() {
          AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
              enableHighAccuracy: true,
              timeout: 10000,
            });
            geolocation.getCurrentPosition(function(status, result) {
              if (status === 'complete') {
                map.setCenter(result.position);
                new AMap.Marker({
                  position: result.position,
                  map: map
                });
              } else {
                alert('定位失败: ' + result.message);
              }
            });
          });
        });
      </script>
    </body>
    </html>
  `;

  // 返回 WebView 组件，加载上述 HTML 内容
  return <WebView originWhitelist={['*']} source={{ html }} style={styles.container} />;
};

// 样式定义，容器占满屏幕
const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default AMapScreen;