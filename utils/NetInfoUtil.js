import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const NetInfoUtil = () => {
  const [netInfo, setNetInfo] = useState(null);

  useEffect(() => {
    // 订阅网络状态变化
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state);
      console.log('网络状态变化:', state);
    });

    // 组件卸载时取消订阅
    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Text>网络类型: {netInfo?.type}</Text>
      <Text>是否已连接: {netInfo?.isConnected ? '是' : '否'}</Text>
    </View>
  );
};

export default NetInfoUtil;