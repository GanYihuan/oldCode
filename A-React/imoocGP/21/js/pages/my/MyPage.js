import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import NavigationBar from "../../common/NavigationBar";
import CustomKeyPage from './CustomKeyPage';
import SortKeyPage from './SortKeyPage';
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';


export default class MyPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.container}>
          <NavigationBar
              title="MyPage"
              backgroundColor="#6495ED"
          />
          <Text
              style={styles.tips}
              onPress={() => {
                this.props.navigator.push({
                  component: CustomKeyPage,
                  params: {
                    ...this.props,
                    flag: FLAG_LANGUAGE.flag_key
                  }
                })
              }}
          >
            CustomTagsPage
          </Text>
          <Text
              style={styles.tips}
              onPress={() => {
                this.props.navigator.push({
                  component: CustomKeyPage,
                  params: {
                    ...this.props,
                    flag: FLAG_LANGUAGE.flag_language
                  }
                })
              }}
          >
            CustomLanguagePage
          </Text>
          <Text
              style={styles.tips}
              onPress={() => {
                this.props.navigator.push({
                  component: SortKeyPage,
                  params: {
                    ...this.props,
                    flag: FLAG_LANGUAGE.flag_key
                  }
                })
              }}
          >
            SortKeyPage
          </Text>
          <Text
              style={styles.tips}
              onPress={() => {
                this.props.navigator.push({
                  component: SortKeyPage,
                  params: {
                    ...this.props,
                    flag: FLAG_LANGUAGE.flag_language
                  }
                })
              }}
          >
            SortLanguagePage
          </Text>
          <Text
              style={styles.tips}
              onPress={() => {
                this.props.navigator.push({
                  component: CustomKeyPage,
                  params: {
                    ...this.props,
                    isRemoveKey: true
                  }
                })
              }}
          >
            RemovePage
          </Text>
        </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tips: {
    fontSize: 20,
    margin: 20
  }
})