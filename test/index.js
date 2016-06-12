import 'babel-polyfill';
import changeInterval from '../';

changeInterval(200);

const div = document.querySelector('div');
div.addEventListener('dblclick', (e)=>{
	console.log('dblclick', e);
}, false);
