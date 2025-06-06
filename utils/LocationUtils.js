// LocationUtils.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, Platform, Button } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const AMAP_KEY = '49d85fb8d9e416820a1b314d27d2f7c9';
const BASE_URL = 'https://restapi.amap.com/v3';

const LocationUtils = {
  /**
   * 地理编码（地址 => 经纬度）
   * @param {string} address - 要查询的地址（支持中文）
   * @returns {Promise<{lng: string, lat: string}>}
   */
  geocode: async (address) => {
    try {
      const response = await axios.get(`${BASE_URL}/geocode/geo`, {
        params: {
          key: AMAP_KEY,
          address,
        },
      });

      if (response.data.status === '1' && response.data.geocodes.length > 0) {
        const location = response.data.geocodes[0].location;
        const [lng, lat] = location.split(',');
        return { lng, lat };
      } else {
        throw new Error('地址解析失败');
      }
    } catch (error) {
      console.error('Geocode Error:', error.message);
      throw error;
    }
  },

  /**
   * 逆地理编码（经纬度 => 地址）
   * @param {string} lng - 经度
   * @param {string} lat - 纬度
   * @returns {Promise<string>} - 返回格式化地址
   */
  reverseGeocode: async (lng, lat) => {
    try {
      const response = await axios.get(`${BASE_URL}/geocode/regeo`, {
        params: {
          key: AMAP_KEY,
          location: `${lng},${lat}`,
        },
      });

      if (response.data.status === '1' && response.data.regeocode) {
        return response.data.regeocode.formatted_address;
      } else {
        throw new Error('坐标解析失败');
      }
    } catch (error) {
      console.error('Reverse Geocode Error:', error.message);
      throw error;
    }
  },
};
export const LocationComponent = () => {
  const [location, setLocation] = useState(null);

  const requestPermission = async () => {
    if (Platform.OS === 'ios') {
      return true; // iOS 会自动提示授权
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: '位置权限',
        message: 'App需要访问您的位置',
        buttonNeutral: '稍后再问',
        buttonNegative: '拒绝',
        buttonPositive: '允许',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords);
      },
      error => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>当前位置：</Text>
      {location ? (
        <>
          <Text>经度: {location.longitude}</Text>
          <Text>纬度: {location.latitude}</Text>
        </>
      ) : (
        <Text>正在获取位置...</Text>
      )}
      <Button title="刷新位置" onPress={getCurrentLocation} />
    </View>
  );
};
export default LocationUtils;