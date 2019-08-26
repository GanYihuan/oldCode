import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ListView,
    TouchableOpacity,
    AlertIOS,
} from 'react-native';
import shareData from '../json/shareData.json';


let {width} = Dimensions.get('window');
let cols = 3;
let cellWH = 100;
let vMargin = (width - cellWH * cols) / (cols + 1);
let hMargin = 25;


export default class dashen07ListView extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows(shareData.data)
      // shareData.data => Array
    }
  }

  render() {
    return (
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            contentContainerStyle={styles.listViewStyle}
        />
    );
  }

  // rowData:数据, sectionID:分组ID, rowID:行ID, highlightRow:是否高亮选中行的信息
  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              AlertIOS.alert('GanYihuan')
            }}
        >
          <View style={styles.innerViewStyle}>
            <Image
                style={styles.iconStyle}
                source={{uri: rowData.icon}}
            />
            <Text>{rowData.title}</Text>
          </View>
        </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  listViewStyle: {
    // 改变主轴的方向
    flexDirection: 'row',
    // 多行显示
    flexWrap: 'wrap',
  },
  iconStyle: {
    width: 80,
    height: 80,
  },
  innerViewStyle: {
    alignItems: 'center',
    width: cellWH,
    height: cellWH,
    marginLeft: vMargin,
    marginTop: hMargin,
  }
});


