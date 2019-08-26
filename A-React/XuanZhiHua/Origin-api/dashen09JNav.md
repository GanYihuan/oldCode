#
## TabBarIOS
## TabBarIOS.Item
```
<TabBarIOS
    barTintColor='orange' // 标签栏的背景颜色。
    tintColor='purple'  // 当前被选中的标签图标的颜色。
>
    {/*第一块*/}
    <TabBarIOS.Item
        systemIcon="downloads"
        selected={this.state.selectedTabBarItem == 'home'}
        onPress={() => {
          this.setState({
            selectedTabBarItem: 'home'
          })
        }}
    >
      <View></View>
    </TabBarIOS.Item>
  </TabBarIOS>
```



## Icon.TabBarItem
```
<TabBarIOS
    tintColor="##ee735c" // icon color
    barTintColor="##0f0" // bar color
>
    <Icon.TabBarItem
      iconName="ios-videocam-outline"     // 普通状态  
      selectedIconName="ios-videocam"     // 选择时图标变化
      selected={this.state.selectedTab === 'list'}
      badge="10"
      onPress={() => {
        this.setState({
          selectedTab: 'list'
        });
      }}>
      <View></View>
    </Icon.TabBarItem>
</TabBarIOS>
```


