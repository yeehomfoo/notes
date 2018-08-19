# Javascript 入门  
  
标签（空格分隔）： learning  
  
## 一、Javascript  
  
innerHTML属性：开始和结束标签之间的可添加文字的部分。可以放置html代码，并且代码会生效。  
```html  
<h1>innerHTML</h1>  
```  
  
## 二、Javascript  
  
### 1、Javascript  
ECMAScript:解释器、翻译  
DOM：Document Object Model html文档 赋予了JS操作html的能力，操作html元素的入口 document对象  
BOM: Browser Object Model 赋予了JS操作浏览器的能力 window对象  
各组成部分的兼容性，兼容性问题由来  
ECMA 几乎没有兼容性问题  
DOM 有一些操作不兼容  
BOM 没有兼容问题（完全不兼容）  
  
### 2、变量类型  
Javascript里面变量本身没有类型，变量的类型取决于它里面存的是什么  
类型：typeof运算符  
常见类型：number、string、boolean、undefined、object、funciton  
一个变量最好只存放一种类型的数据，否则容易乱，影响可读性  
  
### 3、数据类型转换  
显示类型转换(强制类型转换)parseInt()、parseFloat()，NaN（NOT A NUMBER的简称），注意NaN和NaN不相等（NaN!=NaN）,要用isNaN(var)。NaN和任何数进行运算结果都是NaN  
  
### 4、比较  
==先转换类型再比较  
===（全等）不转换类型，直接比较  
- 在JS里只有数字相减的功能 ，两字符串相减会自动转换成数字类型再相减  
  
### 5、变量的作用域和闭包  
变量作用域(作用范围) 局部变量 全局变量  
什么是闭包：子函数（内部函数）可以使用父函数中的局部变量  
  
### 6、命名  
命名规范及必要性：可读性--能看懂，规范性--符合规则  
匈牙利命名法：类型前缀，首字母大写  
  
  
### 5、JS中的真和假  
真：true、非零数字、非空字符串、非空的对象、  
假：false、数字零、空字符串、空对象、undefined  
三目运算符：？：  
条件？语句1：语句2  
  
### 8、Json  
跟数组有点像，是用来存东西的。  
```javascript  
var json={a: 12,b: 5, c: 'abc'};  
a=json.a;json.b++;json['a'];  
```  
json的下标是字符串，数组的下标是数字  
json没有length属性，是一种简单的数据类型，写了的数据才会有  
json循环可以用for(var i in json)  
  
## 三、深入JAVASCRIPT  
  
### 1、排序  
arr.sort();数组排序  
字符串排序：按A-Z排序  
数字排序：把数字当做字符串处理112排在12前面。  
sort可以有一个参数，比较函数  
```javascript  
arr.sort(function (n1, n2){  
	if(n1<n2)  
	{  
	return -1;//只要小于零就可以  
	else if(n1>n3)  
	{  
	return 1;//只要是整数就可以  
}  
	else  
	{  
	return 0;  
}  
}  
})  
```  
简化的比较函数  
```javascript  
function (n1, n2)  
{  
	return n1-n2;  
}  
```  
  
### 2、定时器的使用  
开启定时器  
```javascript  
setInterval(function（函数名，或者匿名函数）, time(毫秒)) //每个一段时间执行一次函数funtion 间隔性  
setTimeout(function, time) //只执行一次 延时性  
```  
停止定时器  
```javascript  
clearInterval(timer);//关闭指定的定时器。timer是设置定时器函数的返回值，即定时器本身  
clearTimeout(timer);//关闭timeout定时器  
```  
  
### 3、数码时钟  
''+number 可以把数字转化字符串  
获取系统时间  
date对象   
```javascript  
var oDate = new Data();//创建一个日期对象  
```  
getHours、getMinutes、getSeconds  
显示系统时间 字符串连接 空位补零  
设置图片路径 charAt方法  str[0]这种取字符串元素的方法在低版本浏览器（IE7等）中不支持，要用专门的方法：str.charAt(0);全兼容的方法获取字符串中的元素  
  
### 4、DATE对象其他方法  
年 getFullYear()  
月 getMonth() 月份要记得加1，月份为0到11，其他的正常  
日 getDate()  
星期 getDay() 0周日 1周一 2 3 4 5 6周六  
  
### 5、延时提示框  
方法 移入显示，移出隐藏  
把代码重复部分合并，可以减少工作量，很方便。  
连等 a=b=c=d=6,所有都等于最右边的值6.  
简化代码：合并两个相同的mouseover和Mouseout  
  
### 6、无缝滚动  
一直让物体向一个方向移动  
offsetleft/offfsettop 获取物体的左、右边距（内边距+外边距）  
offsetwidth/offsetheight 获取物体的宽/高  
  
## 四、DOM基础  
DOM是用来操作文档页面的，所有JS对页面元素的操作都是通过它来进行的。DOM不光是JS的组成部分，也是一种规范  
浏览器支持情况：  
IE		10%（IE9之前）  
CHROME/SAFARI(都是WEBKIT) 60%		  
FF		99%  
  
### 1、DOM节点  
其实就是标签（CSS阶段），元素（JS阶段），节点（DOM阶段），这三个是同一个东西。  
  
文本节点：INNERHTML 元素节点：标签  
childNodes 获取子节点，是一个素组 //IE6-8不包括文本节点，其他的浏览器包括  
nodeType 节点的类型，用来区分文本节点（值为3）和元素节点（值为1）//适用于所有的浏览器  
children属性和childNodes相似，但是只包括元素不包括文本节点，非常方便。  
注意：JS的子节点只算第一层。  
  
parentNode 获取父节点  
offsetParent 获取用来定位的父节点（设置了相对定位的父节点）  
  
首尾子节点：有兼容性问题（和childNodes的兼容性问题相似）  
firstChilde(IE6-8)、firstElementChild(其他高版本浏览器) 处理兼容问题：用IF  
lastChild、lastElementChild  
  
兄弟节点：有兼容性问题 同上  
nextSibling、nextElementSibling  
previousSibling、previousElementSibling  
  
  
元素属性操作的第三种方式：DOM方式 第一种：点，第二种：方括号。这种方法一般情况下用不着  
获取：getAttribute(名称) 设置：setAttribute(名称：值) 删除：removeAttribute(名称)  
  
### 2、DOM元素灵活查找  
用className选择元素,第三种选择元素的方法  
没有自带的方法，需要自行封装成一个函数  
```javascript  
funciton getByClass(oParent, sClass)  
{  
	var aResult=[];  
	var aEle=oParent.getElmentsByTagName('*');  
	for(var i=0;i<aEle.length;i++)  
	{  
		if(aEle[i].className==sClass)  
		{  
			aResult.push(aEle[i]);  
}  
}  
	return aResult;  
}  
```  
  
### 3、创建、插入和删除DOM元素  
创建DOM元素  
createElement(标签名)   创建一个节点  
appendChild(节点)       追加一个节点  
插入元素  
insertBefore(节点，原有节点)   在已有元素前插入  
删除DOM元素  
removeChild(节点)    删除一个节点  
  
### 4、文档碎片  
文档碎片可以提高DOM操作性能（理论上）  
文档碎片原理  
```javascript  
document createDocumentFragment()  
```  
  
## 五、DOM操作的高级应用  
### 1、表格应用  
获取  
tBodies、tHead、tFoot、rows、cells  
隔行变色   鼠标移入高亮  
添加、删除一行  
搜索  
排序  
  
## 六、表单应用  
### 1、表单基础知识  
什么是表单：向服务器提交数据，比如：用户注册  
action 提交到哪里  
### 2、表单事件  
onsubmit 提交时发生  
onreset 重置时发生  
### 3、表单内容验证  
  
  
  
  
  
  
