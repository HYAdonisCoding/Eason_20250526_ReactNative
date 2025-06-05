import React, {useState} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Dialog from 'react-native-dialog';
import {useActionSheet} from '@expo/react-native-action-sheet';

const MessagePage = () => {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const {showActionSheetWithOptions} = useActionSheet();
  // 获取当前时间字符串
  const getTime = () => {
    const d = new Date();
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')} ${d
      .getHours()
      .toString()
      .padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;
  };

  const handleConfirm = () => {
    if (input.trim()) {
      setHistory([{text: input, time: getTime()}, ...history]);
    }
    setVisible(false);
    setInput('');
  };
  // 处理 ActionSheet 操作
  const handleAction = idx => {
    showActionSheetWithOptions(
      {
        options: ['加重显示', '标红显示', '删除', '取消'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 3,
      },
      buttonIndex => {
        if (buttonIndex === undefined) return;
        if (buttonIndex === 0) {
          // 加重显示
          setHistory(h =>
            h.map((item, i) =>
              i === idx ? {...item, bold: !item.bold} : item,
            ),
          );
        } else if (buttonIndex === 1) {
          // 标红显示
          setHistory(h =>
            h.map((item, i) => (i === idx ? {...item, red: !item.red} : item)),
          );
        } else if (buttonIndex === 2) {
          // 删除
          setHistory(h => h.filter((_, i) => i !== idx));
        }
      },
    );
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
      }}>
      <Dialog.Container visible={visible} contentStyle={styles.dialogContainer}>
        <Dialog.Title style={styles.dialogTitle}>请输入内容</Dialog.Title>
        <Dialog.Input
          placeholder="输入点什么"
          value={input}
          onChangeText={setInput}
          style={styles.dialogInput}
          placeholderTextColor="#bbb"
        />
        <Dialog.Button
          label="取消"
          onPress={() => {
            setVisible(false);
            setInput('');
          }}
          color="#888"
        />
        <Dialog.Button label="确定" onPress={handleConfirm} color="#aa7AFF" />
      </Dialog.Container>
      <ScrollView
        style={{marginTop: 10, width: '90%', alignSelf: 'center'}}
        contentContainerStyle={{paddingBottom: 30}}>
        {history.length === 0 ? (
          <Text
            style={{
              fontSize: 16,
              color: '#888',
              textAlign: 'center',
              marginTop: 40,
            }}>
            你还没有输入内容
          </Text>
        ) : (
          history.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleAction(idx)}
              activeOpacity={0.7}>
              <View style={styles.historyItem}>
                <Text
                  style={[
                    styles.historyText,
                    item.bold && {fontWeight: 'bold'},
                    item.red && {color: 'red'},
                  ]}>
                  {item.text}
                </Text>
                <Text style={styles.historyTime}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          alignItems: 'center',
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderColor: '#eee',
          width: '90%',
          borderRadius: 8,
        }}>
        <Button
          title="开始输入"
          onPress={() => setVisible(true)}
          color="#aa7AFF"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  dialogTitle: {
    color: '#aa7AFF',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  dialogInput: {
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 17,
    color: '#222',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  historyItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  historyText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  historyTime: {
    fontSize: 12,
    color: '#aa7AFF',
    textAlign: 'right',
  },
});

export default function MessagePageWithActionSheet(props) {
  // 用 ActionSheetProvider 包裹
  const MessagePageComponent = MessagePage;
  const {ActionSheetProvider} = require('@expo/react-native-action-sheet');
  return (
    <ActionSheetProvider>
      <MessagePageComponent {...props} />
    </ActionSheetProvider>
  );
}
