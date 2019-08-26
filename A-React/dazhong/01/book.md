> window.localStorage.setItem('a', '1');
> undefind()

> window.localStorage.getItem('a');
> 1



// 监控时间
> window..performance.timing



// 任何网站都可以跨域
header('Access-Control-Allow-Origin:*');



// 移动端固定屏幕
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"/>



// trap
- decrease repaint, reflow
- 缓存能缓存的数据
(Cache-Control: max-age: xxxxx)
> localStorage.setItem('data_1', JSON.stringify({a:1}))
< undefined
> localStorage.getItem('data_1');
< "{"a":1}"
>JSON.parse(localStorage.getItem('data_1'))
< Object {a: 1}
> indexedDB



NO static animate!
use 硬件加速(cavase, transform)

