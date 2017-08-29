// import _ from 'lodash'
import './style.css'
// import './index.html'
import Icon from './icon2.jpg';
import printMe from './print.js';
import _es6 from './es6.js';
function component() {
  var element = document.createElement('div');
  const btn = document.createElement('button');
  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
   // Lodash, now imported by this script
  // element.innerHTML = _.join(['Hello', 'webpack','demo'], ' ');
  element.innerHTML = '去掉了 lodash';
  element.classList.add('hello');

  // 将图像添加到我们现有的 div。
  var myIcon = new Image();
  myIcon.src = Icon;
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(myIcon);
  element.appendChild(btn);
  return element;
}


var element = component();
const testFn = ()=>`
  const a=b
`;
document.body.appendChild(element);
var _p = document.createElement('p');
_p.innerHTML=testFn();
document.body.appendChild(element);
document.body.appendChild(_p);
_es6();
if(module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    // printMe();

    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
  });
}