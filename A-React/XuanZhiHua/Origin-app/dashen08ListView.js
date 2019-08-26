import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity
} from 'react-native';
import Car from '../json/Car.json';


export default class dashen08ListView extends Component {
  constructor() {
    super();
    // COPY!
    // dataBlob:数据, sectionID:分组ID, rowID:行ID, highlightRow:是否高亮选中行的信息
    let getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };
    let getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID + ':' + rowID];
    };
    this.state = {
      dataSource: new ListView.DataSource({
        getSectionData: getSectionData, // 获取组中数据
        getRowData: getRowData, // 获取行中的数据
        rowHasChanged: (r1, r2) => r1 !== r2, // 任意两个都不同才执行
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2 // 头部A, B, C
      })
    }
  }

  // 复杂的操作:数据请求 或者 异步操作(定时器)
  componentDidMount() {
    this.loadDataFromJSON();
  }

  loadDataFromJSON() {
    // 数据外壳, {}
    let dataBlob = {};
    // 总数据, {data: {target}}
    let jsonData = Car.data;
    // car array, {data: {car: [target], title}}
    let cars = [];
    // 分组ID,
    let sectionIDs = [];
    // 行ID,
    let rowIDs = [];

    for (let i = 0; i < jsonData.length; i++) {
      // 每一组, i充当sectionIDs
      sectionIDs.push(i);
      // 模拟二维数组装内容,行ID
      rowIDs[i] = [];
      // jsonData:总数据 -> jsonData[i]: 每一组 -> jsonData[i].cars每组里的每个cars
      cars = jsonData[i].cars;
      // dataBlob: 数据外壳{} -> dataBlob[sectionIDs]: 进入到每个组 ->  jsonData[i].title: 每一组title
      dataBlob[i] = jsonData[i].title;

      for (let j = 0; j < cars.length; j++) {
        // rowID:行ID
        rowIDs[i].push(j);
        // 把每一行中的内容放入dataBlob对象中
        // sectionIDs: i,  user.md5: j
        dataBlob[i + ':' + j] = cars[j];
      }
    }

    // rowData:数据, sectionID:分组ID, rowID:行ID, highlightRow:是否高亮选中行的信息
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
    });
  }

  render() {
    return (
        <View style={styles.outerViewStyle}>
          <View style={styles.headerViewStyle}>
            <Text style={styles.headerStyle}>SeeMyGo品牌</Text>
          </View>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              renderSectionHeader={this.renderSectionHeader}  // 头部a,b,c
          />
        </View>
    );
  }

  // 每一行的数据
  renderRow(rowData) {
    return (
        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.rowStyle}>
            <Image
                style={styles.rowImageStyle}
                source={{uri: rowData.icon}}
            />
            <Text style={styles.textStyle}>{rowData.name}</Text>
          </View>
        </TouchableOpacity>
    );
  }

  // 每一组中的头部字母
  renderSectionHeader(sectionData) {
    return (
        <View style={styles.sectionHeaderViewStyle}>
          <Text style={styles.textStyle}>
            {sectionData}
          </Text>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  outerViewStyle: {
    //占满窗口
    flex: 1
  },
  headerViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    backgroundColor: 'orange',
  },
  rowStyle: {
    // 设置主轴的方向
    flexDirection: 'row',
    // 侧轴方向居中
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 0.5,
  },
  rowImageStyle: {
    width: 70,
    height: 70,
  },
  sectionHeaderViewStyle: {
    justifyContent: 'center',
    height: 25,
    backgroundColor: '#e8e8e8',
  },
  headerStyle: {
    fontSize: 25,
    color: '#fff',
  },
  textStyle: {
    marginLeft: 5,
    color: '#f00',
  }
});


