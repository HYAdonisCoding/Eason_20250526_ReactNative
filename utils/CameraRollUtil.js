import {Platform, PermissionsAndroid, Alert} from 'react-native';
import CameraRoll from '@react-native-camera-roll/camera-roll';

/**
 * 保存图片到相册
 * @param {string} uri 图片的本地路径或网络地址
 * @returns {Promise<boolean>} 是否保存成功
 */
export async function saveImageToCameraRoll(uri) {
  console.log('CameraRoll:', CameraRoll);
  try {
    // Android 需要动态权限
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: '存储权限',
          message: '需要存储权限才能保存图片到相册',
          buttonNeutral: '稍后再问',
          buttonNegative: '取消',
          buttonPositive: '允许',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('提示', '未获得存储权限，无法保存图片');
        return false;
      }
    }
    await CameraRoll.save(uri, {type: 'photo'});
    Alert.alert('保存成功', '图片已保存到相册');
    return true;
  } catch (e) {
    Alert.alert('保存失败', e.message || '图片保存失败');
    return false;
  }
}

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

/**
 * 选择图片（从相册）
 * @param {Object} options 可选配置
 * @returns {Promise<{uri: string, fileName: string, type: string}|null>}
 */
export async function pickImage(options = {}) {
  return new Promise((resolve, reject) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        ...options,
      },
      response => {
        if (response.didCancel) {
          resolve(null);
        } else if (response.errorCode) {
          Alert.alert('选图失败', response.errorMessage || '未知错误');
          resolve(null);
        } else {
          const asset = response.assets && response.assets[0];
          resolve(asset || null);
        }
      },
    );
  });
}

/**
 * 拍照
 * @param {Object} options 可选配置
 * @returns {Promise<{uri: string, fileName: string, type: string}|null>}
 */
export async function takePhoto(options = {}) {
  // Android 需要相机权限
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: '相机权限',
        message: '需要相机权限才能拍照',
        buttonNeutral: '稍后再问',
        buttonNegative: '取消',
        buttonPositive: '允许',
      },
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('提示', '未获得相机权限');
      return null;
    }
  }
  return new Promise((resolve, reject) => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
        ...options,
      },
      response => {
        if (response.didCancel) {
          resolve(null);
        } else if (response.errorCode) {
          Alert.alert('拍照失败', response.errorMessage || '未知错误');
          resolve(null);
        } else {
          const asset = response.assets && response.assets[0];
          resolve(asset || null);
        }
      },
    );
  });
}

// 可放在任意业务组件中
import {useActionSheet} from '@expo/react-native-action-sheet';
import {compress} from 'react-native-compressor';

export function useImagePickerActionSheet(onResult) {
  const {showActionSheetWithOptions} = useActionSheet();

  const compressImageIfNeeded = async asset => {
    if (!asset?.uri) return asset;
    try {
      // 只压缩图片类型
      if (asset.type && asset.type.startsWith('image/')) {
        const compressedUri = await compress.image(asset.uri, {
          compressionMethod: 'auto',
          maxSize: 200 * 1024, // 200k
        });
        return {...asset, uri: compressedUri};
      }
      return asset;
    } catch (e) {
      // 压缩失败则返回原图
      return asset;
    }
  };
  const showPicker = () => {
    console.log('useImagePickerActionSheet');
    showActionSheetWithOptions(
      {
        options: ['拍照', '从相册选择', '取消'],
        cancelButtonIndex: 2,
      },
      async buttonIndex => {
        let result = null;
        if (buttonIndex === 0) {
          result = await takePhoto();
        } else if (buttonIndex === 1) {
          result = await pickImage();
        }
        if (result && onResult) {
          const compressed = await compressImageIfNeeded(result);
          onResult(compressed);
        }
      },
    );
  };

  return showPicker;
}
