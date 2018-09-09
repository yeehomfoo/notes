/* 基本用法  */
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1

for (let i = 0; i < 10; i++) {
  // ...
}

console.log(i);
// ReferenceError: i is not defined

var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10

var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
  
    console.log(i);
  };
}
a[6](); // 6

for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc

/* 不存在变量提升 */
// var 的情况
console.log(foo); // 输出 undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错 ReferenceError
let bar = 2;

/* 暂时性死区 */
var temp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}

if (true) {
  // TDZ 开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError
  
  let tmp; // TDZ 结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}

typeof x; // ReferenceError
let  x;

typeof undeclared_variable; // "undefined"

function bar(x = y, y = 2) {
   return [x, y];
}

bar(); // 报错

function bar(x = 2, y = x) {
  return [x, y];
}

bar(); // [2, 2]

// 不报错
var x = x;

// 报错
let x = x;
// ReferenceError: x is not defined;

/* 不允许重复声明 */

// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}

function func(arg) {
  let arg; // 报错
}

function func(arg) {
  {
    let arg; // 不报错
  }
}

/* 块级作用域 */

function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}

// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}

/* 函数块级作用域 */

function f() {
  console.log('I am outside!');
}

(function () {
  if (false) {
    // 重复声明一次函数 f
    function f() {
      console.log('I am inside!');
    }
  }
}());

// ES5 环境
(function () {
  function f() {...};
  if (false) {
  }
  f();
}());

// 浏览器的 ES6 环境
(function () {
  var f = undefined;
  if (false) {
    function f() {...};
  }

  f();
}());
// Uncaught TypeError: f is not a function

// 函数声明语句
{
  let a = 'secret';
  function f() {
    return a;
  }
}

// 函数表达式
{
  let a = 'secret';
  let f = function () {
     return a;
  }
}


/* const 基本用法 */

const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
//

const foo; // SyntaxError: Missing initilaizer in const declaration

if (true) {
  const MAX = 5;
}

MAX // Uncaught ReferenceError: MAX is not defined

if (true) {
  console.log(MAX); // ReferenceError
  const MAX = 5;
}

var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;

const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only

const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，改行会报错
foo.prop = 123;

var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key, i) => {
    if (type of obj[key] === 'object') {
      constantize(obj[key]):
    }
  })
}

// 顶层对象的属性

var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采取通用写法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined

