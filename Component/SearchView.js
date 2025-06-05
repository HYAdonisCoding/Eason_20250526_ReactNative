import React, {useState, useLayoutEffect} from 'react';
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
import {saveImageToCameraRoll} from '../utils/CameraRollUtil';
import { SCREEN_WIDTH } from '../utils/ScreenUtil';



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

// 图片组件
// 图片相关
// --- 组件外部 ---
const localImages = {
  '飞龙在天1.jpeg': require('../assets/飞龙在天1.jpeg'),
  '飞龙在天2.jpeg': require('../assets/飞龙在天2.jpeg'),
  '飞龙在天3.jpeg': require('../assets/飞龙在天3.jpeg'),
};

const MyLocalImage = ({imgsLocalName}) => {
  const imgSource = localImages[imgsLocalName];
  if (!imgSource) {
    return (
      <View
        style={[
          styles.image,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={{color: '#999'}}>图片未找到</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onLongPress={() => {
        Alert.alert('保存图片', '是否保存该图片到相册？', [
          {text: '取消', style: 'cancel'},
          {
            text: '确定',
            onPress: () => {
              console.log('currentImg net', Image.resolveAssetSource(imgSource).uri);
              // 本地图片需先获取真实路径
              saveImageToCameraRoll(Image.resolveAssetSource(imgSource).uri);
            },
          },
        ]);
      }}>
      <Image
        source={imgSource}
        resizeMode="contain"
        style={styles.image}
        accessibilityLabel="搜索结果图片"
      />
    </TouchableOpacity>
  );
};

const LocalImgView = React.memo(
  ({imgsLocal, imgIndexLocal, prevImgLocal, nextImgLocal}) => {
    const hasImages = imgsLocal && imgsLocal.length > 0;
    const currentImgName = hasImages ? imgsLocal[imgIndexLocal] : null;
    return (
      <View style={{alignItems: 'center'}}>
        {hasImages ? (
          <MyLocalImage imgsLocalName={currentImgName} />
        ) : (
          <View
            style={[
              styles.image,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text style={{color: '#999'}}>暂无图片</Text>
          </View>
        )}
        <View style={{width: '100%', alignItems: 'center'}}>
          <Text style={{color: '#888', fontSize: 14, marginBottom: 4}}>
            {hasImages ? `${imgIndexLocal + 1} / ${imgsLocal.length}` : '0 / 0'}
          </Text>
          <View style={styles.bottomBar}>
            <TouchableHighlight
              onPress={prevImgLocal}
              underlayColor={'#005BBB'}
              activeOpacity={0.8}
              style={[styles.bottomBarItem, {backgroundColor: '#007AFF'}]}
              disabled={!hasImages || imgsLocal.length === 1}>
              <Text style={{color: '#fff', fontSize: 18}}>上一张</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={nextImgLocal}
              underlayColor={'#388E3C'}
              activeOpacity={0.8}
              style={[styles.bottomBarItem, {backgroundColor: '#4CAF50'}]}
              disabled={!hasImages || imgsLocal.length === 1}>
              <Text style={{color: '#fff', fontSize: 18}}>下一张</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  },
);

const NetworkImgView = React.memo(({imgs, imgIndex, prevImg, nextImg}) => {
  const hasImages = imgs && imgs.length > 0;
  const currentImg = hasImages ? imgs[imgIndex] : null;
  const [imgError, setImgError] = React.useState(false);

  return (
    <View style={{alignItems: 'center'}}>
      {hasImages ? (
        <TouchableOpacity
          activeOpacity={0.9}
          onLongPress={() => {
            Alert.alert('保存图片', '是否保存该图片到相册？', [
              {text: '取消', style: 'cancel'},
              {
                text: '确定',
                onPress: () => {
                  console.log('currentImg net', currentImg);
                  
                  saveImageToCameraRoll(currentImg);
                },
              },
            ]);
          }}>
          <Image
            source={{uri: currentImg}}
            resizeMode="contain"
            style={styles.image}
            accessibilityLabel="网络图片"
            onError={() => setImgError(true)}
            onLoadStart={() => setImgError(false)}
          />
        </TouchableOpacity>
      ) : (
        <View
          style={[
            styles.image,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={{color: '#999'}}>暂无图片</Text>
        </View>
      )}
      {imgError && (
        <Text style={{color: 'red', marginTop: 8}}>图片加载失败</Text>
      )}
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text style={{color: '#888', fontSize: 14, marginBottom: 4}}>
          {hasImages ? `${imgIndex + 1} / ${imgs.length}` : '0 / 0'}
        </Text>
        <View style={styles.bottomBar}>
          <TouchableHighlight
            onPress={prevImg}
            underlayColor={'#005BBB'}
            activeOpacity={0.8}
            style={[styles.bottomBarItem, {backgroundColor: '#007AFF'}]}
            disabled={!hasImages || imgs.length === 1}>
            <Text style={{color: '#fff', fontSize: 18}}>上一张</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={nextImg}
            underlayColor={'#388E3C'}
            activeOpacity={0.8}
            style={[styles.bottomBarItem, {backgroundColor: '#4CAF50'}]}
            disabled={!hasImages || imgs.length === 1}>
            <Text style={{color: '#fff', fontSize: 18}}>下一张</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
});

function SearchView({navigation, route}) {
  useLayoutEffect(() => {
    // 返回时恢复TabBar
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [navigation]);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [imgIndexLocal, setImgIndexLocal] = useState(0);
  const prevImgLocal = () =>
    setImgIndexLocal(idx => (idx - 1 + imgsLocal.length) % imgsLocal.length);
  const nextImgLocal = () =>
    setImgIndexLocal(idx => (idx + 1) % imgsLocal.length);

  const imgs = [
    'https://reactnative.dev/img/tiny_logo.png',
    'https://reactnative.dev/docs/assets/p_cat2.png',
    'https://avatars.githubusercontent.com/u/17538734?v=4',
  ];
  const imgsLocal = ['飞龙在天1.jpeg', '飞龙在天2.jpeg', '飞龙在天3.jpeg'];
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
        {/* // SearchView 组件内部 */}
        <LocalImgView
          imgsLocal={imgsLocal}
          imgIndexLocal={imgIndexLocal}
          prevImgLocal={prevImgLocal}
          nextImgLocal={nextImgLocal}
        />
        <NetworkImgView
          imgs={imgs}
          imgIndex={imgIndex}
          prevImg={() =>
            setImgIndex(idx => (idx - 1 + imgs.length) % imgs.length)
          }
          nextImg={() => setImgIndex(idx => (idx + 1) % imgs.length)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH - 40, // 保证图片宽度自适应父容器
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 16,
    marginBottom: 10,
    marginHorizontal: 10, // 两侧间距
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch', // 让子元素撑满宽度
    paddingHorizontal: 10, // 控制所有内容两侧间距
  },
  bottomBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // 两端对齐
    width: '100%', // 或 '100%'，根据你的页面宽度调整
    alignSelf: 'center',
    backgroundColor: '#f0f0f0',
  },
  bottomBarItem: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
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

  suggestionItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
});

export default SearchView;
export {SearchHeader};
