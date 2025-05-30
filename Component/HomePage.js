import React from 'react';
import {View, Text, StyleSheet, Image, PixelRatio} from 'react-native';
import Header from './Header163'; // Assuming you have a Header component in the same directory
import List163 from './List163'; // Assuming you have a List163 component in the same directory
import ImportantNews from './ImportantNews'; // Assuming you have an ImportantNews component in the same directory

// This is a simple 携程 home page component for a hotel booking app
const XieChengPage = () => (
  <View style={styles.flex}>
    <View style={styles.container}>
      <View style={[styles.item, styles.center]}>
        <Image
          source={{
            uri: 'https://bd-s.tripcdn.cn/modules/basebiz/h5home/hotel.fc17d0f7726132bf2459621923704f0f.png',
          }}
          style={styles.image}
        />
        <Text style={styles.text}>酒店</Text>
      </View>
      <View style={[styles.item, styles.lineLeftRight]}>
        <View style={[styles.center, styles.flex, styles.lineCenter]}>
          <Text style={styles.text}>海外酒店</Text>
        </View>
        <View style={[styles.center, styles.flex]}>
          <Text style={styles.text}>特惠酒店</Text>
        </View>
      </View>
      <View style={styles.item}>
        <View style={[styles.center, styles.flex, styles.lineCenter]}>
          <Text style={styles.text}>团购</Text>
        </View>
        <View style={[styles.center, styles.flex]}>
          <Text style={styles.text}>客栈·公寓</Text>
        </View>
      </View>
    </View>
  </View>
);

const HomePage = () => {
  return (
    <View style={styles.flex}>
      <Header />
      {/* <h4>新华时评丨让精神之光照亮创新之路</h4> */}
      <List163 title="五千年的文明，要尊重，也要弘扬"></List163>
      <List163 title="新华时评丨让精神之光照亮创新之路"></List163>
      <List163 title="智汇中国 智惠上合（和音）"></List163>
      <ImportantNews
        news={[
          '1.哈佛校长在毕业典礼致辞"暗讽"特朗普 3万人起立鼓掌',
          '2.外交部回应美方暂停向中国出售发动机技术：坚决反对',
          '3.古代遇到蝗灾，如何治理？真是靠鸡鸭大军吗？',
          '4.联合国拟大幅削减预算并裁员:美国拖欠会费达15亿美元',
        ]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 125,
    marginLeft: 5,
    marginRight: 5,
    height: 84,
    // flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#Ff0067', // 浅蓝色背景
    padding: 2,
  },
  item: {
    flex: 1,
    height: 80,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  text: {
    fontweight: 'bold',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  lineLeftRight: {
    borderLeftWidth: 1 / PixelRatio.get(),
    borderRightWidth: 1 / PixelRatio.get(),
    borderColor: '#fff',
  },
  lineCenter: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#fff',
  },
});
export default HomePage;
