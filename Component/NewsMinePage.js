import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Vibration,
  Platform,
  Alert,
} from 'react-native';
import {useImagePickerActionSheet} from '../utils/CameraRollUtil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Shake from 'react-native-shake';
import Sound from 'react-native-sound';

const defaultAvatar = require('../assets/person.png');
const AVATAR_KEY = 'USER_AVATAR_URI';
const NICKNAME_KEY = 'USER_NICKNAME';

// import LocationUtils from './LocationUtils';

// // 示例：地址转经纬度
// LocationUtils.geocode('北京市朝阳区望京SOHO')
//   .then(({ lng, lat }) => {
//     console.log('经纬度:', lng, lat);
//   })
//   .catch(console.error);

// // 示例：经纬度转地址
// LocationUtils.reverseGeocode('116.481488', '39.990464')
//   .then((address) => {
//     console.log('地址:', address);
//   })
//   .catch(console.error);

var BaseInfoView = ({
  avatar,
  defaultAvatar,
  showImagePicker,
  changeNickName,
  nickName,
  modalVisible,
  setModalVisible,
  inputNickName,
  setInputNickName,
  handleNickNameSave,
  styles,
}) => {
  return (
    <View style={styles.baseInfoContainer}>
      <TouchableOpacity
        onPress={showImagePicker}
        activeOpacity={0.8}
        style={styles.avatarBox}>
        <Image
          source={avatar || defaultAvatar}
          style={styles.avatar}
          resizeMode="contain"
        />
        <Text style={styles.avatarTip}>点击更换头像</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={changeNickName}
        style={styles.nickBox}>
        <Text style={styles.nickLabel}>昵称：</Text>
        <Text style={styles.nickName}>{nickName}</Text>
      </TouchableOpacity>
      {/* 昵称输入弹窗 */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalMask}>
          <View style={styles.modalContent}>
            <Text style={{fontSize: 16, marginBottom: 10}}>修改昵称</Text>
            <TextInput
              value={inputNickName}
              onChangeText={setInputNickName}
              style={styles.input}
              placeholder="请输入昵称"
              autoFocus
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 16,
              }}>
              <Button title="取消" onPress={() => setModalVisible(false)} />
              <View style={{width: 12}} />
              <Button title="保存" onPress={handleNickNameSave} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const NewsMinePage = () => {
  const [avatar, setAvatar] = useState(null);
  const [nickName, setNickName] = useState('Visitors');
  const [modalVisible, setModalVisible] = useState(false);
  const [inputNickName, setInputNickName] = useState('');
  // 播放音效
  const shakeSoundAndVibrate = () => {
    // 震动
    if (Platform.OS === 'ios') {
      Vibration.vibrate(); // VibrationIOS 已合并到 Vibration
    } else {
      Vibration.vibrate(400);
    }
    // 播放音效
    const shakeSound = new Sound(
      require('../assets/shakesound.mp3'),
      Sound.MAIN_BUNDLE,
      error => {
        if (!error) {
          shakeSound.play();
        }
      },
    );
    // 你可以加弹窗或其它逻辑
    Alert.alert('摇一摇', '你触发了摇一摇！');
  };
  useEffect(() => {
    const subscription = Shake.addListener(() => {
      shakeSoundAndVibrate();
    });
    return () => {
      subscription.remove();
    };
  }, []);
  // 加载本地存储的头像和昵称
  useEffect(() => {
    (async () => {
      const uri = await AsyncStorage.getItem(AVATAR_KEY);
      if (uri) setAvatar({uri});
      const savedNick = await AsyncStorage.getItem(NICKNAME_KEY);
      if (savedNick) setNickName(savedNick);
    })();
  }, []);

  // 选择图片后设置为头像并持久化
  const showImagePicker = useImagePickerActionSheet(async img => {
    if (img && img.uri) {
      setAvatar({uri: img.uri});
      await AsyncStorage.setItem(AVATAR_KEY, img.uri);
    }
  });

  // 优化后的修改昵称方法
  const changeNickName = () => {
    console.log('点击昵称');
    setInputNickName(nickName);
    setModalVisible(true);
  };

  const handleNickNameSave = async () => {
    setNickName(inputNickName);
    await AsyncStorage.setItem(NICKNAME_KEY, inputNickName);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <BaseInfoView
        avatar={avatar}
        defaultAvatar={defaultAvatar}
        showImagePicker={showImagePicker}
        changeNickName={changeNickName}
        nickName={nickName}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        inputNickName={inputNickName}
        setInputNickName={setInputNickName}
        handleNickNameSave={handleNickNameSave}
        styles={styles}
      />
      <TouchableOpacity
        style={{alignItems: 'center', marginTop: 20}}
        activeOpacity={0.7}
        onPress={() => {
          shakeSoundAndVibrate();
        }}>
        <Text style={{color: '#aa7AFF', fontSize: 16}}>支持摇一摇体验彩蛋</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  baseInfoContainer: {
    padding: 20,
    paddingBottom: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  avatarBox: {
    alignItems: 'center',
    marginBottom: 18,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#aa7AFF',
    backgroundColor: '#f6f6f6',
  },
  avatarTip: {
    marginTop: 10,
    color: '#888',
    fontSize: 10,
    textAlign: 'center',
  },
  nickBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7fa',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
    paddingVertical: 12, // 增大可点击高度
    marginLeft: 20,
  },
  nickLabel: {
    color: '#666',
    fontSize: 16,
    marginRight: 6,
  },
  nickName: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalMask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 260,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
});

export default NewsMinePage;
