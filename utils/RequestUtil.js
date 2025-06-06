// RequestUtil.js
const DEFAULT_TIMEOUT = 10000; // 10 秒超时

class RequestUtil {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  setHeader(key, value) {
    this.defaultHeaders[key] = value;
  }

  async request(method, url, data = null, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || DEFAULT_TIMEOUT);

    const headers = {
      ...this.defaultHeaders,
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...(options.headers || {}),
    };

    const config = {
      method,
      headers,
      signal: controller.signal,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(this.baseURL + url, config);
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      clearTimeout(timeoutId);
      throw this._handleError(error);
    }
  }

  _handleError(error) {
    if (error.name === 'AbortError') {
      return new Error('请求超时');
    }
    return new Error(error.message || '未知错误');
  }

  get(url, params = {}, options = {}) {
    const query = new URLSearchParams(params).toString();
    const fullUrl = query ? `${url}?${query}` : url;
    return this.request('GET', fullUrl, null, options);
  }

  post(url, data = {}, options = {}) {
    return this.request('POST', url, data, options);
  }

  put(url, data = {}, options = {}) {
    return this.request('PUT', url, data, options);
  }

  delete(url, data = {}, options = {}) {
    return this.request('DELETE', url, data, options);
  }
}

export const UploadFile = () => {
  const handlePickAndUpload = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      const uploadUrl = 'https://your.api/upload';
      const result = await uploadFile(res, uploadUrl);
      Alert.alert('上传成功', JSON.stringify(result));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('取消选择');
      } else {
        console.error(err);
        Alert.alert('上传失败', err.message);
      }
    }
  };

  return (
    <View style={{padding: 20}}>
      <Button title="选择并上传文件" onPress={handlePickAndUpload} />
    </View>
  );
};

const request = new RequestUtil('https://your-api.com'); // 修改为你的后端地址
export default request;