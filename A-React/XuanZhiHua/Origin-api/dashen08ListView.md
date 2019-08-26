#
## ListView
## copy!
```
constructor() {
    super();
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
```



## 
```
<ListView
  dataSource={this.state.dataSource}
  renderRow={this.renderRow}
  renderSectionHeader={this.renderSectionHeader}  // 头部a,b,c
/>
```



## 复杂的操作:数据请求 或者 异步操作(定时器)
```
  componentDidMount() {
    this.loadDataFromJSON();
  }
```



## 理解 dataBlob sectionIDs rowIDs 含义
```
loadDataFromJSON() {
    let dataBlob = {};  // 数据外壳{}
    let jsonData = Car.data;  // 总数据
    let cars = [];  // car array
    let sectionIDs = [];  // 分组ID
    let rowIDs = [];  // 行ID

    for (let i = 0; i < jsonData.length; i++) {
      sectionIDs.push(i);
      rowIDs[i] = []; // 模拟二维数组装内容,行ID
      cars = jsonData[i].cars;
      // 数据外壳{} -> []进入到data -> i:sectionID 进入到每个{} ->
      dataBlob[i] = jsonData[i].title;

      for (let j = 0; j < cars.length; j++) {
        // rowID:行ID
        rowIDs[i].push(j);
        // 把每一行中的内容放入dataBlob对象中
        dataBlob[i + ':' + j] = cars[j];
      }
    }

    // rowData:数据, sectionID:分组ID, rowID:行ID, highlightRow:是否高亮选中行的信息
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
    });
  }
```