import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    Image,
    Dimensions,
    ActivityIndicator,
    RefreshControl,
    AlertIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../common/config';
import request from '../common/request';
import Detail from './detail';

var {width} = Dimensions.get("window");
var cachedResults = {
  nextPage: 1,
  items: [],
  total: 0
};

class Item extends Component {
  constructor(props) {
    super(props);
    var row = this.props.row;
    this.state = {
      up: row.voted,
      row: row
    }
  }

  _up() {
    var that = this;
    var up = !this.state.up;
    var row = this.state.row;
    var url = config.api.base + config.api.up;
    var body = {
      id: row._id,
      up: up ? 'yes' : 'no',
      accessToken: 'abcd'
    };

    request.post(url, body)
        .then(function (data) {
          if (data && data.success) {
            that.setState({
              up: up
            })
          } else {
            AlertIOS.alert('点赞失败');
          }
        })
        .catch(function (err) {
          console.log(err);
          AlertIOS.alert('点赞失败');
        })
  }

  render() {
    var row = this.state.row;
    return (
        <TouchableHighlight onPress={this.props.onSelect}>
          <View style={styles.item}>
            <Text style={styles.title}>{row.title}</Text>
            <Image source={{uri: row.thumb}} style={styles.thumb}>
              <Icon name="ios-play" size={28} style={styles.play}/>
            </Image>
            <View style={styles.itemFooter}>
              <View style={styles.handleBox}>
                <Icon name={this.state.up ? 'ios-heart' : 'ios-heart-outline'}
                      size={28} style={[styles.up, this.state.up ? null : styles.down]} onPress={this._up}/>
                <Text style={styles.handleText} onPress={this._up}>喜欢</Text>
              </View>
              <View style={styles.handleBox}>
                <Icon name="ios-happy-outline" size={28} style={styles.commentItem}/>
                <Text style={styles.handleText}>评论</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
    )
  }
}

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows([]),
      isLoadingTail: false,
      isRefreshing: false
    }
  }

  _renderRow(row) {
    return <Item
        onSelect={() => this._loadPage(row)}
        key={row.id}
        row={row}/>
  }

  componentDidMount() {
    this._fechData(1);
  }

  _fechData(page) {
    var that = this;

    if (page != 0) {
      this.setState({
        isLoadingTail: true
      });
    } else {
      this.setState({
        isRefreshing: true
      });
    }

    request.get(config.api.base + config.api.creations, {
          accessToken: 'abc',
          page: page
        })
        .then((data) => {
          if (data.success) {
            var items = cachedResults.items.slice();

            if (page !== 0) {
              items = items.concat(data.data);
              cachedResults.nextPage += 1;
            } else {
              items = data.data.concat(items);
            }

            cachedResults.items = items;
            cachedResults.total = data.total;

            setTimeout(function () {
              if (page !== 0) {
                that.setState({
                  isLoadingTail: false,
                  dataSource: that.state.dataSource.cloneWithRows(
                      cachedResults.items
                  )
                });
              } else {
                that.setState({
                  isRefreshing: false,
                  dataSource: that.state.dataSource.cloneWithRows(
                      cachedResults.items
                  )
                });
              }
            }, 1000);
          }
        })
        .catch((error) => {
          if (page !== 0) {
            this.setState({
              isLoadingTail: false
            });
          } else {
            this.setState({
              isRefreshing: false
            });
          }
          console.error(error);
        });
  }

  _hasMore() {
    return cachedResults.items.length !== cachedResults.items.total;
  }

  _fechMoreData() {
    if (!this._hasMore() || this.state.isLoadingTail) {
      return
    }

    var page = cachedResults.nextPage;

    this._fechData(page)
  }

  _renderFooter() {
    if (!this._hasMore() && cachedResults.items.total !== 0) {
      return (
          <View style={styles.loadingMore}>
            <Text style={styles.loadingText}>没有更多</Text>
          </View>
      )
    }

    if (!this.state.isLoadingTail) {
      return <View style={styles.loadingMore}/>
    }

    return <ActivityIndicator
        style={styles.loadingMore}
    />
  }

  _onRefresh() {
    if (this.state.isRefreshing || !this._hasMore()) {
      return
    }

    this._fechData(0);
  }

  _loadPage(row) {
    // navigator 压站操作
    this.props.navigator.push({
      name: 'detail',
      component: Detail,
      params: {
        data: row
      }
    })
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>列表页面</Text>
          </View>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderRow.bind(this)}
              renderFooter={this._renderFooter.bind(this)}
              onEndReached={this._fechMoreData.bind(this)}
              onEndReachedThreshold={20}
              enableEmptySections={true}
              showsVerticalScrollIndicator={false}
              automaticallyAdjustContentInsets={false}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this._onRefresh}
                  tintColor="#ff6600"
                  title="拼命加载中"
                />
              }
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  header: {
    paddingTop: 25,
    paddingBottom: 12,
    backgroundColor: '#ee735c',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  },

  item: {
    width: width,
    marginBottom: 10,
    backgroundColor: '#fff'
  },

  thumb: {
    width: width,
    height: width * 0.56,
    resizeMode: 'cover'
  },

  title: {
    padding: 10,
    fontSize: 18,
    color: '#333'
  },

  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee'
  },

  handleBox: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: width / 2 - 0.5,
    backgroundColor: '#fff'
  },

  play: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    width: 46,
    height: 46,
    paddingTop: 9,
    paddingLeft: 18,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 23,
    color: '#ed7b66'
  },

  handleText: {
    paddingLeft: 12,
    fontSize: 18,
    color: '#333'
  },

  up: {
    fontSize: 22,
    color: '#f00'
  },

  down: {
    fontSize: 22,
    color: '#333'
  },

  commentItem: {
    fontSize: 22,
    color: '#333'
  },

  loadingMore: {
    marginVertical: 20
  },

  loadingText: {
    color: '#777',
    textAlign: 'center'
  }
});

