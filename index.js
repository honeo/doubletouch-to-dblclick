/*
	ダブルタップ定義
		一定時間内に同要素にtouchstartが2回発火すること。
		ただし間にtouchendを挟み、touchmoveやtouchcancelは挟まないこと。
	流れ
	    windowにtouchstart, touchmove, touchend, touchcancelリスナーを張る。
	    touchstart発生時、weakMapに既に発生要素が…
	        あった場合…
	            時間内かつtouchendedフラグがあればダブルタップ判定、weakMapからログ削除して発生要素にダブルタップ発火。
	            時間外ならweakMapにログを上書き。
	        なかった場合はweakMapにログを追加。
		touchend発生時
			発生要素のログがあればtouchendフラグをtrueに。
	    touchmove, touchcancel発生時
	        weakMapから発生要素のログを削除する。
*/

// ダブルタップ判定とするms
let interval = 200;

/*
	タッチイベントが発生した要素の記録オブジェクトを収納する
	weakmap {
		element: {
			touchended: boolean,
			date: 前回記録時のDate.now()返り値
		}
	}
*/
const weakmap = new WeakMap();


// 登録
window.addEventListener('touchstart', onTouchStart, true);
window.addEventListener('touchmove', onTouchMoveOrCancel, true);
window.addEventListener('touchcancel', onTouchMoveOrCancel, true);
window.addEventListener('touchend', onTouchEnd, true);


/*
	touchstart
		ログがあって時間内なら発火、ログ削除
		ログがないか時間外なら新規ログを追加
*/
function onTouchStart(e){
	//console.log('onTouchStart');
	const target = e.target;
	const log = weakmap.get(target);
	if(log){
		if(Date.now() < log.date+interval){
			weakmap.delete(target);
			igniteDblclick(e, e.changedTouches[0]);
		}else{
			weakmap.set(target, {
				touchended: false,
				date: Date.now()
			});
		}
	}else{
		weakmap.set(target, {
			touchended: false,
			date: Date.now()
		});
	}
}


/*
	touchend
		発生要素のログがあればtouchendフラグをtrueに
*/
function onTouchEnd({target}){
	//console.log('onTouchEnd');
	const log = weakmap.get(target);
	if(log){
		log.touchended = true;
	}
}


/*
	touchmove, touchcancel
		weakMapに発生要素のログがあれば削除する。
*/
function onTouchMoveOrCancel({target}){
	//console.log('onTouchMoveOrCancel')
	const log = weakmap.get(target);
	if(log){
		weakmap.delete(target);
	}
}


/*
	引数のTouchEventオブジェクトを元にダブルクリックイベントを発火
		引数はタッチイベントオブジェクトとタッチオブジェクト
*/
function igniteDblclick({
	altKey, ctrlKey, metaKey, shiftKey, target
}, {
	clientX, clientY, screenX, screenY
}){
	//console.log('igniteDblclick');
	const type = 'dblclick';
	const bubbles = true;
	const cancelable = true;
	const view = window;
	const detail = 2;
	const button = 0;
	const relatedTarget = null;
	let dblclick;
	try{
		// Modern
		dblclick = new MouseEvent(type, {
			bubbles,
			cancelable,
			view,
			detail,
			screenX,
			screenY,
			clientX,
			clientY,
			ctrlKey,
			shiftKey,
			altKey,
			metaKey,
			button,
			buttons: 0,
			relatedTarget
		});
	}catch(e){
		// Legacy, 作って初期化
		dblclick = document.createEvent('MouseEvent');
		dblclick.initMouseEvent(type,
			bubbles,
			cancelable,
			view,
			detail,
			screenX,
			screenY,
			clientX,
			clientX,
			ctrlKey,
			shiftKey,
			altKey,
			metaKey,
			button,
			relatedTarget
		);
	}
	target.dispatchEvent(dblclick);
}


/*
	モジュール返り値、ダブルタップとみなす間隔を設定する
*/
function changeInterval(num){
	//console.log('changeInterval');
	if(typeof num!=='number'){
		throw new TypeError('invalid argument');
	}else{
		interval = num;
	}
};

export default changeInterval;
