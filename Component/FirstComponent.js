import React, {useEffect, useRef, useState} from 'react';
// 创建一个简单的React组件
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

export const List = ({
  items = [
    '北京',
    '天津',
    '上海',
    '广州',
    '深圳',
    '杭州',
    '成都',
    '重庆',
    '天津',
    '南京',
    '武汉',
    '西安',
    '苏州',
    '青岛',
    '沈阳',
    '大连',
    '郑州',
    '长沙',
    '合肥',
    '福州',
    '厦门',
    '济南',
    '哈尔滨',
    '长春',
    '石家庄',
    '昆明',
    '南昌',
    '南宁',
    '贵阳',
    '太原',
    '呼和浩特',
    '乌鲁木齐',
    '兰州',
    '银川',
    '西宁',
    '拉萨',
    '香港',
    '澳门',
    '台北',
    '高雄',
    '新竹',
    '莫斯科',
    '伦敦',
    '纽约',
    '巴黎',
    '东京',
    '首尔',
    '新加坡',
    '悉尼',
    '洛杉矶',
    '温哥华',
  ],
}) => {
  const isFirstRender = useRef(true);
  const [selected, setSelected] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [wikiContent, setWikiContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState('');
  // 创建阶段（首次渲染前）
  useEffect(() => {
    console.log('List 创建阶段');
  }, []);

  // 实例化阶段（首次渲染后）
  useEffect(() => {
    console.log('List 实例化阶段');
    return () => {
      // 销毁阶段
      console.log('List 销毁阶段');
    };
  }, []);

  // 更新阶段（props变化时）
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      console.log('List 更新阶段');
    }
  }, [items]);

  const handlePress = async idx => {
    setSelected(prev => ({
      ...prev,
      [idx]: !prev[idx],
    }));
    const city = items[idx];
    setCurrentCity(city);
    setModalVisible(true);
    setLoading(true);
    // 维基百科中文页面URLhttps://baike.baidu.com/item/%E6%88%90%E9%83%BD%E5%B8%82?fromModule=lemma_search-box
    const url = `https://baike.baidu.com/item/${encodeURIComponent(
      city + '市',
    )}?fromModule=lemma_search-box`;
    // const url = `https://zh.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city)}`;
    console.log(`Fetching data from: ${url}`);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setWikiContent(data.extract || '未找到相关内容');
    } catch (e) {
      setWikiContent('获取失败');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5FCFF'}}>
      <FlatList
        data={items}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => handlePress(index)}>
            <Text
              style={[styles.listItem, selected[index] && styles.selectedItem]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={{fontSize: 18, color: '#007AFF', padding: 16}}>
              关闭
            </Text>
          </TouchableOpacity>
          <ScrollView style={{padding: 16}}>
            <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 10}}>
              {currentCity}市
            </Text>
            {loading ? (
              <ActivityIndicator size="large" color="#43CD80" />
            ) : (
              <Text style={{fontSize: 16, color: '#333'}}>{wikiContent}</Text>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
  },
  listItem: {
    fontSize: 20,
    color: '#fff',
    backgroundColor: '#43CD80', // 葱花绿
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 6,
    marginHorizontal: 10,
    overflow: 'hidden',
    textAlign: 'center',
    elevation: 2, // 安卓阴影
    shadowColor: '#000', // iOS阴影
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  selectedItem: {
    backgroundColor: '#FF9800', // 选中后变橙色
    color: '#fff',
  },
});

// var List = React.createElement({
//     name: 'List',
//     render: function() {
//         return React.createElement(
//         'ul',
//         null,
//         React.createElement('li', null, 'Item 1'),
//         React.createElement('li', null, 'Item 2'),
//         React.createElement('li', null, 'Item 3')
//         );
//     },
//     // 1.创建阶段
//     getDefaultProps: function() {
//         return {
//             items: ['Item 1', 'Item 2', 'Item 3']
//         };
//     },
//     // 2.实例化阶段
//     getInitialState: function() {
//         // 获取this.state的默认值
//         console.log('getInitialState called');
//         return {
//             items: this.props.items
//         };
//     },
//     componentWillMount: function() {
//         // 业务逻辑的处理都应该放在这里，如对state的操作等
//         console.log('List component Will mounte');
//     },
//     render: function() {
//         // 渲染组件的内容 并返回一个虚拟DOM
//         console.log('List component render');
//         return React.createElement(
//             'ul',
//             null,
//             this.state.items.map(function(item, index) {
//                 return React.createElement('li', { key: index }, item);
//             })
//         );
//     },

//     componentDidMount: function() {
//         // 使用render方法返回的虚拟DOM对象来创建真实的DOM结构
//         console.log('componentDidMount called');
//     },
//     // 3.更新阶段
//     componentWillReceiveProps: function(nextProps) {
//         // 当组件接收到新的props时调用或父组件调用setProps()方法时调用
//         console.log('componentWillReceiveProps called');
//         // 可以在这里更新state或执行其他操作
//         this.setState({ items: nextProps.items });
//     },
//     shouldComponentUpdate: function(nextProps, nextState) {
//         // 判断组件是否需要更新
//         console.log('shouldComponentUpdate called');
//         // 如果nextProps或nextState与当前的props或state不同，则返回true，表示需要更新
//         return nextProps.items !== this.props.items || nextState.items !== this.state.items;
//     },
//     componentwillUpdate: function(nextProps, nextState) {
//         // 在组件更新之前调用
//         console.log('componentWillUpdate called');
//     },
//     componentDidUpdate: function(prevProps, prevState) {
//         // 在组件更新之后调用
//         console.log('componentDidUpdate called');
//     },

//     // 4.销毁阶段
//     componentWillUnmount: function() {
//         // 销毁时被调用
//         console.log('componentWillUnmount called');
//     },

// });
