# doubletouch-to-dblclick
[honeo/doubletouch-to-dblclick](https://github.com/honeo/doubletouch-to-dblclick)  
[doubletouch-to-dblclick](https://www.npmjs.com/package/doubletouch-to-dblclick)

## なにこれ
一定時間内に2回タッチしたらダブルクリックイベントを発火する。

## 使い方
```sh
$ npm i -S doubletouch-to-dblclick
```
```js
import 'doubletouch-to-dblclick';
```

## API
ダブルクリックとして判定する間隔を指定する。
初期値は200(ms)。
```js
import interval from 'doubletouch-to-dblclick';
interval(250); // 200ms => 250ms
```
