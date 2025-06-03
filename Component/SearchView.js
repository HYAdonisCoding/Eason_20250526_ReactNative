import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Keyboard,
  Alert,
  Image,
} from 'react-native';

function SearchHeader({value = '', setValue, canSearch, onSearch}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', width: 300}}>
      <View style={{flex: 1, position: 'relative'}}>
        <TextInput
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
            paddingHorizontal: 36,
            height: 36,
            fontSize: 16,
          }}
          value={value}
          onChangeText={setValue}
          placeholder="请输入搜索内容"
          placeholderTextColor="#999"
          returnKeyType="search"
          onEndEditing={() => {
            if (canSearch) {
              onSearch();
            }
          }}
          onSubmitEditing={() => {
            if (canSearch) {
              onSearch();
            }
          }}
          // clearButtonMode="while-editing"
          keyboardType="default"
          autoFocus
        />
        {/* {value.length > 0 && (
          <TouchableOpacity
            onPress={() => setValue('')}
            style={{
              position: 'absolute',
              right: 8,
              top: 0,
              height: 36,
              justifyContent: 'center',
              alignItems: 'center',
              width: 28,
              backgroundColor: '#4c4c4c'
            }}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Text style={{fontSize: 18, color: '#999'}}>×</Text>
          </TouchableOpacity>
        )} */}
      </View>
      <TouchableHighlight
        disabled={!canSearch}
        onPress={() => {
          if (canSearch) {
            onSearch();
            Alert.alert('搜索', `您搜索的内容是：${value}`, [
              {
                text: '确定',
                onPress: () => console.log('搜索确认'),
              },
            ]);
          }
        }}
        activeOpacity={10}
        underlayColor={'#222'}
        style={{
          marginLeft: 8,
          paddingHorizontal: 12,
          height: 32,
          borderRadius: 6,
          backgroundColor: canSearch ? '#007AFF' : '#ccc',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#fff', fontSize: 16}}>搜索</Text>
      </TouchableHighlight>
    </View>
  );
}

function SearchView({navigation, route}) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const mockSuggestions = [
    'React Native',
    'React',
    'JavaScript',
    'Mobile Development',
    'iOS',
    'Android',
    'Web Development',
    'Programming',
    'Software Engineering',
    'UI/UX Design',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
    'Cloud Computing',
    'DevOps',
    'Blockchain',
  ];
  const canSearch = value.length > 2;

  // 监听输入变化，生成建议
  React.useEffect(() => {
    const all = mockSuggestions
      .filter(item => value && item.toLowerCase().includes(value.toLowerCase()))
      .filter(item => item.toLowerCase() !== value.toLowerCase());
    if (!value) {
      setSuggestions([]);
      return;
    }
    if (value) {
      all.unshift(value);
    }
    setSuggestions(all); // 关键：更新 suggestions
  }, [value]);

  // 搜索
  const handleSearch = () => {
    setSuggestions([]);
  };

  // 选中建议
  const handleSuggestionPress = text => {
    setValue(text);
    setSuggestions([]); // 关键：选中后隐藏建议
  };

  // 动态设置 header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchHeader
          value={value}
          setValue={setValue}
          canSearch={canSearch}
          onSearch={handleSearch}
        />
      ),
      headerTitleAlign: 'center',
    });
  }, [navigation, value, canSearch]);

  // 图片相关
  const imgs = [
    'https://reactnative.dev/img/tiny_logo.png',
    'https://reactnative.dev/docs/assets/p_cat2.png',
    'https://avatars.githubusercontent.com/u/17538734?v=4',
  ];
  const [imgIndex, setImgIndex] = useState(0);

  // 监听输入变化，生成建议
  React.useEffect(() => {
    const all = mockSuggestions
      .filter(item => value && item.toLowerCase().includes(value.toLowerCase()))
      .filter(item => item.toLowerCase() !== value.toLowerCase());
    if (!value) {
      setSuggestions([]);
      return;
    }
    if (value) {
      all.unshift(value);
    }
    setSuggestions(all);
  }, [value]);
  // 图片组件
  const MyImage = ({uri}) => (
    <Image
      source={{uri: uri}}
      resizeMode='contain'
      style={styles.image}
      accessibilityLabel="搜索结果图片"
    />
  );

  // 上一张
  const prevImg = () => {
    setImgIndex(idx => (idx - 1 + imgs.length) % imgs.length);
  };
  // 下一张
  const nextImg = () => {
    setImgIndex(idx => (idx + 1) % imgs.length);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {suggestions.length > 0 && (
          <View style={styles.suggestionBox}>
            <FlatList
              data={suggestions}
              keyExtractor={(item, idx) => item + idx}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => handleSuggestionPress(item)}
                  style={styles.suggestionItem}>
                  <Text style={{fontSize: 16}}>{item}</Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        )}
        <MyImage uri={imgs[imgIndex]} />

        <View style={styles.bottomBar}>
          <TouchableHighlight
            onPress={() => prevImg()}
            underlayColor={'#222'}
            activeOpacity={10}
            style={styles.bottomBarItem}>
            <Text style={{color: '#fff', fontSize: 18}}>上一张 </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => nextImg()}
            underlayColor={'#222'}
            activeOpacity={10}
            style={styles.bottomBarItem}>
            <Text style={{color: '#fff', fontSize: 18}}>下一张 </Text>
          </TouchableHighlight>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
    borderWidth: 1,
        borderColor: '#ccc',
  },
  bottomBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // 两端对齐
    width: 240, // 或 '100%'，根据你的页面宽度调整
    alignSelf: 'center',
  },
  bottomBarItem: {
    backgroundColor: '#4c4c4c',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '45%', // 每个按钮占据一半宽度
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    color: '#333',
    marginTop: 16,
  },
  suggestionBox: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    zIndex: 99,
    maxHeight: 180,
    marginTop: 0, // 让建议框紧贴导航栏
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // paddingTop: 16, // 去掉或设为0
  },
  suggestionItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
});

export default SearchView;
export {SearchHeader};
