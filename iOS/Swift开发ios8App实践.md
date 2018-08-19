# Swift开发ios8App实践

标签（空格分隔）： learning

---

## 一、基础知识
### 1、xcode简介与swift项目结构
appdelegeat类中定义了应用程序生命周期里的一些函数。
viewcontroller：mvc中的控制器controller
storybord：mvc中的视图view
assets存放图片等文件
info.plist是配置文件
tests文件夹存放单元测试类
uitests文件夹存放ui测试类
products编译出来的应用程序

## 二、通过storyboard制作app原型与编写程序逻辑
xcode6以前的版本，storyboard是与选中的设备分辨率一致。新版本之后apple引入了adaptive ui概念，即可自适应ui，理论上所有版本的分辨率都可以自适应。

### 1、取消自适应，disable size classes 
Disabling size classes limits documents to storing data for a single device family. The data for the size class best representing the targeted device will be retained, and all other data will be removed. In addition, segues will be converted to their non-adaptive equivalents.
### 2、disable auto layout
auto layout是size classes的基础，先阶段还不需要用到，暂不启用
### 3、在storyboard中使用interface builder设置相应控件的属性，如：把keyboard type设置成number pad
### 4、现在iphone的分辨率有1x和2x两种情况（以后可能还会有3x，4x）的情况，我们问了兼容所有设置，需要为所有图片准备两种尺寸，1倍和2倍大小的。ios会根据不同的设备，自动查找相应的图片，这样图片就不会失真。图片添加之后，会自动在media library中生成对应的资源文件项，方便我们使用
### 5、为了编写代码逻辑，我们需要把view和view controller绑定起来，以实现mvc中视图和控制器的绑定
### 6、控件的绑定（connection)有三种方式：outlet(可以把控件的属性和view controller进行绑定)、action(界面上的时间和类的方法进行绑定)和outlet collection(把界面上的元素绑定到集合上)
### 7、绑定时storage(内存管理方式)选项有weak和strong两种，选择weak的话，变量在生命周期结束后悔由系统自动回收
### 8、注意，@iboutlet、@ibaction之类的标识对编译器来说完全没有意义，只是为了方便代码编写和增加代码可读性
### 9、在确定按钮的action事件函数函数中编写程序逻辑，实现程序功能
### 10、override fun touchesended，使触摸别的地方时，数字键盘消失
至此简单的ios程序“十二生肖”已经编写完毕

## 三、uikit常用控件
apple自带类库(library)cocoatuch中有一个重要的组成部分，uikit。uikit提供了apple自带的一些控件，所有控件对应的类的名称均已ui开头。

## 四、高级技巧
### 1、使用auto layout支持不同设备
通过控制控件间距、等高、等宽等条件，一层层地实现相对定位。通过auto layout可以使app支持不同的ios设备。
### 2、使用sketch制作图标
sketch与ps类似，一般用来制作web或者app的ui，而ps一般用来制图。
在不考虑2x、iphone6&6plus的情况下，iPhone的分辨率可以认为是320*568。如果制作3个圆形的图标，每个图标的半径选择为50比较合适。制作时，一般以最大尺寸来制作，export时再导出为0.5x等较小尺寸。
### 3、相关类库
所有的swift文件已经默认import了foundation这个类库，如果要绑定view controller则要import uikit，如果要使用系统级社交分享功能则要import social
### 4、uitableviewcontroller
### 5、在objective c里没有struct，但是在swift中有，它和class的区别就是它不需要init函数。struct的内存会放在栈里面，而class申请的内存则会放在堆里面。另外，class的参数传递方式是引用传递，而struct是指传递。
### 6、segue和unwind是互为反向的两个过程，segue打开一个new view并传递数据，unwind关闭new view并反向传递数据

## 五、iosapp的设计
iphone 4s、5、5s、6都是使用2x图片，而6plus使用3x图片，由于4不是retina屏幕，所以4使用1x图片。





