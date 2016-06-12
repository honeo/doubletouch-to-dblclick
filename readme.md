# doubletouch-to-dblclick
[honeo/doubletouch-to-dblclick](https://github.com/honeo/doubletouch-to-dblclick)  
[doubletouch-to-dblclick](https://www.npmjs.com/package/doubletouch-to-dblclick)

## なにこれ
一定時間内に同じ要素を連続してタップしたらダブルクリックイベントを発火する。

## 使い方
```sh
$ npm i -S doubletouch-to-dblclick
```
```js
// 読み込むだけ
import 'doubletouch-to-dblclick';

element.addEventListener('dblclick', listener);
```

## API
ダブルクリックとして判定する間隔を指定する。
初期値は200(ms)。
```js
import interval from 'doubletouch-to-dblclick';
interval(250); // 200ms => 250ms
```
