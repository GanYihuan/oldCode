import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView,
  RefreshControl,
  DeviceEventEmitter
} from 'react-native';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';

import DataRepository from '../../js/expand/dao/DataRepository';
import NavigationBar from '../common/NavigationBar';
import RepositoryCell from '../common/RepositoryCell';
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';


const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';


export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.state = {
      languages: []
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.languageDao
        .fetch()
        .then(result => {
          this.setState({
            languages: result
          })
        })
        .catch(err => {
          console.log(err);
        })
  }

  render() {
    let content = this.state.languages.length > 0
        ?
        <ScrollableTabView
            tabBarBackgroundColor="#2196F3"
            tabBarInactiveTextColor="mintcream"
            tabBarActiveTextColor="#fff"
            tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
            renderTabBar={() => <ScrollableTabBar/>}
        >
          {
            this.state.languages.map((result, i, arr) => {
              let lan = arr[i];
              return lan.checked
                  ? <PopularTab tabLabel={lan.name} key={i}>Java</PopularTab>
                  : null;
            })
          }
        </ScrollableTabView>
        : null

    return (
        <View style={styles.container}>
          <NavigationBar
              title="PopularPage"
              statusBar={{backgroundColor: '#2196F3'}}
          />
          {content}
        </View>
    );
  }
}


class PopularTab extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository();
    this.state = {
      result: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      isLoading: false
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({
      isLoading: true
    })
    let url = this.getFetchUrl(this.props.tabLabel);
    this.dataRepository
        .fetchRepository(url)
        .then(result => {
          let items = result && result.items ? result.items : result ? result : [];
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
            isLoading: false
          });
          if (result && result.update_date && !this.dataRepository.checkdate(result.update_date)) {
            DeviceEventEmitter.emit('showToast', '数据过时');
            return this.dataRepository.fetchNetRepository(url);
          } else {
            DeviceEventEmitter.emit('showToast', '显示缓存数据');
          }
        })
        .then(result => {
          if (!items || items.length === 0) return;
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items)
          });
          DeviceEventEmitter.emit('showToast', '显示网络数据');
        })
        .catch(err => {
          console.log(err);
          this.setState({
            isLoading: false
          })
        })
  }

  getFetchUrl(key) {
    return URL + key + QUERY_STR;
  }

  renderRow(data) {
    return <RepositoryCell data={data}/>
  }

  render() {
    return <View>
      <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => this.renderRow(data)}
          refreshControl={
            <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={() => this.loadData()}
                colors={['#2196F3']}
                tintColor={['#2196F3']}
                titleColor={['#2196F3']}
                title={'Loading...'}
            />
          }
      />
    </View>
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tips: {
    fontSize: 20
  }
});

