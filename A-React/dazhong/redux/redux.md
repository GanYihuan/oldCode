# install
- npm install --save redux
- npm install --save react-redux
- npm install --save-dev redux-devtools



# redux
- 1: 定义计算规则，即 reducer
```
function counter(state = 0, action) {
    // state = 0 -> if(state === null) { return 0}
    switch (action.type) {
      case 'INCREMENT':
        // state = 0 里的state不变
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  }
```
- 2: 根据计算规则生成 store
```
let store = createStore(counter)
```
- 3: 定义数据（即 state）变化之后的派发规则
```
store.subscribe(() => {
    // store.getState()获得default function的返回值
    console.log('fn1 -> current state', store.getState())
  })
```
- 4: 触发数据变化, 进入1: 进行判断, 完成后进入3: 拿到getState()数据
```
store.dispatch({type: 'INCREMENT'})
```



# 
