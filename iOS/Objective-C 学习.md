# Objective-C 学习

标签（空格分隔）： learning

---

## 一、Objective-C(以下简称oc)简述
### 1、oc的历史
oc和c++就像两个孪生兄弟一样，都是从c语言发展而来，经过30多年的发展已经十分成熟。
oc不像c++那样的臃肿复杂，它更像一门既古老，又优雅的编程语言。
c语言由丹尼斯.里奇发明。丹尼斯.里奇首次提出了编译器的概念，解决了多设备兼容的问题，使的跨平台编程成为可能。由于c语言被赋予了这样的特性，所以c语言只之上的编程语言都被称有高级语言。由于天才一样的丹尼斯.里奇的贡献，软件行业获得的飞速的发展，c语言也在全美迅速普及。然而，时代也在不断地更迭。随着软件行业的发展，软件需求越来越复杂，参与人员越来越多，面向过程的c语言逐渐更不上时代前进的脚步。幸运的是，这个时代同样有天才，他们发明了面向对象编程语言(oc、c++等)，解决了这个问题。一种的新的编程思想诞生了，软件工程师们从复杂的需求中抽身，直接对现实中的对象建模，通过数据结构设计程序，大大降低了合作开发的难度，提升了软件开发的效率。
### 2、oc语言的特点
a、支持完整的c语言语法，是一个高效的编程语言。
b、作为c语言面向对象的扩展，支持完整的面向对象编程特性
c、简介而优雅的编程风格使得编写程序与阅读代码都变得格外清晰。
d、兼容性好，可以在同一个项目中同时使用oc与c++进行混编，也可以在项目中导入由c、c++等语言编写的库文件（静态库和函数库）。
### 3、如何学好一门编程语言
学习一门编程语言不仅仅要学习它的语法。一门语言存在即合理。一个语言的作者在创造这门语言的时候，赋予的是一种思想，也就是一种编程哲学。我们学习语言的时候，应该按照创作者的思想思考问题，按照语言的风格来编写程序，否则无法写出优美而精辟的代码。

## 二、oc基础
1、分号结束的一行代码称为一条程序指令，而程序指令会被编译器编译成一条或者多条cpu指令，交给cpu去执行。
2、在iOS和mac编程中我们一般使用oc字符串类型nsstring(用@的符号打头，如：@“hello world!”)，而基本字符串类型(c字符串类型)用的很少。
3、oc的switch参数只能是int或者char类型，case的项只能是const int。相较其他语言来说较为严格，c#等可以使用复合类型作为参数。
4、command line项目编译出来的程序为终端程序，一般是在终端使用命令来调用。

## 三、oc object oriented programming
一个程序员工作几年之后，各种技术已经难不倒他了，这时候可以依据面向对象思想的完整性来区分程序猿水平的高低。
oc与c++同是从c语言基础上发展过来的，但它们确有显著的不同。c++属于simulat 67流派，oc属于smalltalk流派。oc较c++来说，比较简单，比较随意。oc比较灵活，编译器没那么严格，允许某些错误存在，远没有c++严谨。oc与主流语言相比，语法风格十分火星。
### 1、oc语法
```objc
#import <Foundation/Foundation.h>
@interface classname : NSObject

@end

#import “classname.h”
@implementation classname

@end
```

//实例化对象
classname *objectname = [[classname alloc] init];
//在oc中，[]中括号表示方法调用[类名 方法名]或者[对象名 方法名]
//alloc - 为对象分配内存空间；init - 进行初始化操作

//另一种实例化对象的方法（编写纯正oc风格代码时，不建议使用）
classname *objectname = [classname new]

//oc类中有两种方法，分别是减号方法和加号方法，分别代表对象方法(用对象调用)和类方法(用类来调用)
- (void) functionname
+ (void) funcitonname

oc和java一样没有多继承，但是可以继承多个接口（在oc中称为协议protocol)

## 四、iOS foundation framework框架
iOS框架架构包括6层。foundation framework框架为service core的子框架。nsobject类为foundation framework中所有对象的基类，框架中所有的类都是nsobject类的子类
### 1、oc字符串类：nsstring   nsmutableString
NSString，oc字符串，不可变的普通字符串
nsstring与c语言字符串的转换
```objc
NSString *str1 = [NSString stringWithUTF8String:cstring];
char *str1 = [str UTF8String];
```
创建字符串的方法
```objc
NSString *str1 = @“test”;//用这种方式创建的字符串无需手动释放内存，系统会自动释放
NSString *str2 = [[NSString alloc] init];
str1 = @“test”//这种方式创建的字符串需要手动释放内存
```
格式化字符串
```objc
NSString *str1 = [NSString stringWithFormat:@“a=%d b=%d”, a, b];
NSLog(@“str5 = %@“, str1);//％@表示输出oc的NSString，％s表示输出c的string
```
拼接字符串
```objc
NSString *str1 = [str5 stringByAppendingString:str2];
```
大小写转换
```objc
NSString *str1 = @“AaBbCcDdEeFf”;
NSString *str2 = [str1 lowercaseString];
NSString *str3 = [str1 uppercaseString];
```
前缀和后缀的判断
```objc
NSString *str1= @“www.imooc.com”;
BOOL hasPreFIx = [str2 hasPrefix:@“www.”];//判断前缀
BOOL hasSuffix = [str2 hasSuffix:@“.cim”];//判断后缀
```
判断两个字符串是否相同
```objc
NSString *str1 = @“hello”;
NSString *st2 = @“hello”;
[str1 isEqualToString:str12];
```
比较字符串
```objc
NSComparisonResult
```
分割字符串
```objc
//按字符分割
NSString *str1 = @“a,b,c,d,e,f,g”;
NSArray *strArray = [str1 componentsSeparatedByString:@“,”];
for (NSString *str in strArray)
{
  NSLog(@“str = %@“, str);
}
//按范围分隔
NSRange range = NSMakeRange(1, 5);
NSString *str2 = [str1 substringWIthRange:range];
//从某一位开始截取后面的字符串
NSString *str2 = [str1 substringFromIndex:2];
//从开头截取到某一位
NSString *str2 = [str1 substringToIndex:7];
//将字符串拆分为单个字符
for (int i=0; i<[str1 length]; i++)
{
  NSLog(@“%c”, [str1 characterAtIndex:i]);
}
```
查找
```objc
NSString *str1 = @“ab cd ed gh ij ab”;
//查找指定字符串的位置
NSRange range1 = [str2 rangeOfString:@“ab”];
NSLog(@“range1.location:%ld range1.length:%ld”, range.location, range1.length);
```
替换
```objc
NSString *str1 = @“hello iOS, hello imooc”;
//替换某一个范围的内容
NSString *str2 = [str1 stringByReplacingCharaterInRange:NSMakeRange(0,5_ withString:@“你好“];
//用指定字符串替换原字符串中的子串
NSString *str2 = [str1 stringByReplacingOccurrencesOfString:@“hello” withString:@“你好”];
```
读取文件
```objc
//文件来源：1、本地文件；2、网络文件
//文件读取必须要用到路径累：NSURL
NSString *str1 = @“www.baidu.com”;
NSURL *httpURL = [NSURL URLWithString:str1];//网络路径
NSURL *fileURL = [NSURL fileURLWithPath:str1];//本地路径
//读取网络文件
NSString *httpStr = [NSString stringWithContentsOfURL:httpURL encoding:NSUTF8StringEncoding error:nil];
NSLog(@“httpStr = %@“, httpStr);
//读取本地文件
NSString *fileStr = [NSString stringWithContentsOfFile:@“/Users/yeehom?Desktop/test.txt” encoding:NSUTF8StringEncoding error:nil];
NSlog(@“fileSStr = %@“, fileStr);
```
写入文件
```objc
NSString *str1 = @“Hello World”;
BOOL isOK = [str1 writeToFile:@“/Users/Visitor/Destop/demo.txt” atomically:YES encoding:NSUTF8StringEncoding error:nil];
```

NSMutableString可变字符串(普通字符串的方法都可以用，还可以用一些特定的方法)
可变字符串时字符串的子类。一下方法是可变字符串特有的方法，普通字符串不可使用
```objc
NSMutableString *str = [[NSMutableString alloc] initWithCapacity:10];
[str setString:@“Hello”];//直接赋值会提示警告
```
追加字符串
```objc
[str appendString:@“ world”];
[str appendFormat:@“ - %d”, 10];
```
替换字符串
```objc
NSRange range = [str rangeOfString:@‘world”];
[str replaceCharactersInRange:range withString:@“iOS”]
```
插入字符串
```objc
str insertString:@“A” atIndex:6];
```
删除字符串
```objc
NSRange range = [str rangeOfString:@“AiOS”]:
[str deleteCharactersInRange:range];
```
### 2、数组：NSArray、NSMutableArray以及数组的三种遍历方式
oc的数组可以存储不同类型的对象，比别的面向对象语言的数组要强大很多。oc的数组只能存储对象(int char double等基本数据类型不能存储)。
NSArray是不可变数组，在初始化的时候必须给它赋值，因为它是不可变长的。
```objc
NSArray *array1 = [[NSArray alloc] initWithObjects:@“1”, @“2”, @“3”, nil];
int count = (int)array1.count;//数组的长度
BOOL isHave = array. containsObject:@“2”];//判断数组中是否包含对应的对象
NSString *str = [array1 lastObject];//获取数组中最后一个元素
str = [array1 firstObject];//获取数组中第一个元素
str = [array1 objectAtIndex:3]//取出下标为3的元素
int index = (int) [array1 indexOfObject:@“3”];//查找元素对应的下标，若不存在，返回－1
```
数组的遍历
三种方法：基本的for循环通过下标逐一取出查看；快速枚举for in；枚举器（迭代器）
```objc
for(int i=0; i<array1.count; i++)//c89以前，int的声明必须写在外面，c95和c99之后int的声明可以直接写在for循环里面。现在的编程语言一般可以写在里面，但是在早前的编程语言是不存在的
｛
  NSString *str1 = [array1 objectAtIndex;i];
  NSLog(@“str1 = %@“, str1);
｝
```
如果使用快速枚举，我们需要让数组中元素的类型保持一致
```objc
for(NSString *str2 in array1)
{
  NSLog(@“str2 = %@“, str2);
}
```
NSMutableArray可变数组，不需要实例化时就给它赋值，应为它是可变的
```objc
NSMutableArray *array = [[NSMutableArray alloc] init]
```
添加元素
```objc
[array addObject:p1];
[array addObjectsFromArray:(NSArray *)];
```
删除元素
```objc
[array removeAllObjects];
[array removeLastObject];
[array removeFirstObject];
[array removeObject:p2];
[array removeObjectAtIndec:2];//注意数组内元素的个数，下标问题会导致崩溃
```
交换元素的位置
```objc
[array exchangeObjectAtIndex:0 withObjectAtIndex:1];
```
### 3、字典：NSDictionary、NSMutableDictionary
装箱和拆箱：基础类型和对象的转换NSNumber、NSValue
字典存储的内存不是连续的，用key和value进行对应（键值）
kvc键值编码
声明不可变字典和声明不可变数组一样，声明好就不能再改了，所以要在声明时赋好值
```objc
NSDictionary *dict1 = [NSDictionary dictionaryWithObject:@“1” forkey:@“a”];
NSDictionary *dict2 = [NSDictionary DictionaryWithObejcts:[NSArray arrayWithObjects:@“1”,@“2”,nil] froKeys:[NSArray arrayWithObjects:@“a”,@“b”,nil]];
NSDictionary *dict3 = @{@“1”:@“a”,@“2”:@“b”};
int count = [dict2 count];//键值对数
NSString *value = [dict2 valueForKey:@“b”];//取值
NSString *value2 = [dict2 objectForkey:@“b”];
NSArray *allValues = [dict2 allValues];
NSArray *allKeys = [dict2 allKeys];
NSArray *array = [dict2 objectsForKeys:[NSArrray arrayWIthObjects:@“a”,@“b”,nil] notFoundMarker:@“not found’];
```
遍历字典，不管用哪种方式遍历字典遍历的都是字典的key而不是value
```objc
for (NSSring *key in dict2)
{

  NSLog(@“%@ = %@;, key, [dict2 objectForkey:key]);
}
NSEnumerator *en = [dict2 keyEnumerator];
id key = nil;
while (key = [en nextObjet]) {
  NSLog(@“key - %@“, key);
}
```
可变字典
```objc
NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
[dict setObject:@“1” forKey:@“a”];
[dict removeAllObjects];
[dict removeObjectForKey:@“b”];
[dict removeObjectsForKeys:[NSArray arrayWithObjects:@“a”, @“b”, nil]];
```

## 五、ui界面基础
mvc是什么？
mvc是一种架构模式或者说是一种思想，它高于框架和设计模式，可以与面向对象一样作为一种知指导程序开发的思想。
有助于管理复杂的应用程序，使代码简化、复用性更高
优点：低耦合性（视图层和业务层分离）2、高重用性（一个model对应多个视图）3/（低开发成本（程序分开写，程序复杂性降低）4、高可维护性

### 1、UIWindow
手机和电脑的应用是有很大区别的，电脑应用可以允许存在多个窗口，手机应用只能存在一个窗口即UIWindow。手机和电脑不可能融为一体，由于它们的屏幕大小差距巨大，导致它们的界面布局和操作方式截然不同，一个最明显的区别就是手机的应用区域简单化而电脑的应用区域复杂、专业化。相对来说，手机更偏向于娱乐和实用领域，而电脑更偏向于大型和专业领域。
core data是苹果自带的一个数据库
如果想要把控件放到手机屏幕上，需要设置它的frame也就是它的x,y坐标与宽高。
window就是一个大容器，可以在里面放置我们需要使用的小控件；window可以传递触摸消息给包涵在window内部的控件；window可以协同控件，在屏幕旋转时作出调整。
其实一个手机应用可以有多个window，可以通过设置windowlevel来同时显示三个window，但是同一级别的window虽然可以实例化多个但只能有一个被显示出来。

### 2、UIView（视图）
uiview是ui的基类，但是并不是所有ui开头的类都是继承自uiview或者说不是直接继承自uiview。
```objc
UIView *view1 = [[UIView alloc] init];//实例化视图
view1.frame = CGRectMake(100, 100, 50, 50);//位置大小
view1.backegroundColor = [UIColor redColor];//背景颜色，默认为白色，看不到
［self.view addSubview:view1];//将视图加入到父视图中
```
屏幕尺寸与屏幕大小：
3gs 3.5inch 320*480 @1x 320*480分辨率
4/4s 3.5inch 320*480 @2x 640*960分辨率
5/5c/5s 4.0inch 320*568 @2x 640*1136
6 6.7inch 375*667 @2x 750*1344
6plus 5.5inch 414*736 @3x 1242*2208
[[UICsreen mainScreen] bounds].size.width/height可以获得屏幕的宽度和高度
iPhone状态栏高度是20像素，在设置控件的高度时需要注意
bounds为边框大小，xy永远为0；frame的xy不为0；center只有xy值，它是一个点CGPoint
```objc
UIView *superView = view1.superview;//获取父视图
```
左边是根据父视图的位置来设置的相对位置，不会垮层
```objc
NSArray *subViewsArray = view1.subviews;//获取子视图，返回的是一个数组
```
可以通过给uiview设置不同的tag值来区分不同的视图
```objc
UIView *subVIew = [view1 viewWithTag:2];//如果知道tag可以直接获取单个子视图
```
同一个一个父视图中先加入的view会被盖在下面；子视图是跟随父视图进行层级遮挡，如果父视图层级低于其他同级视图，则父视图的子视图也会被盖住，但是子视图和其他视图中的子视图是没有关系的。
```objc
[view1 exchangeSubvivewAtIndex:0 withSubviewAtIndex:4];//交换两个层的视图，注意必须填写正确的层数。
[view 1 insertSubviw:view5 atIndex:1];//把view5插入第一层，原本的第一层就会变成第2层
[view1 insertSubview:view5 aboveSubview:view3];//加在view3之上
[view1 insertSubview:view5 belowSubview:view2];//加在view2之下
[view1 bringSubviewToFront:view3];//把view3置顶
[view sendSubvievwToBack:view3];//把view3置低
```
当层交换了之后对应的子视图的数组下标也会进行改变。
最高用uiwiew的自适应了做屏幕适配，但是现在出现了更好的自适应方式，比如：autolayout和classresizing，现在只在特殊控件布局时用到uiview的自适应。
```objc
backView.autoresizesSubviews = YES;//允许子视图自适应
topView.autoresizingMask = UIViewAutoresizingFlexibleLeftMargin;//设置子视图的适应方式
```

### 3、UILabel（文本标签）
```objc
UILabel *label = [[UILabel alloc] init];
label.frame = CGRectMake(10,100,100,30);
label.backgroundColor = [UIColor yellowColor];
label.text = @“我是一个标签”；//设置显示文本
label.textAlignment = NSTextAlignmentCenter;//文字布局模式
label.textColor = [UIColor colorWithRed:0.1 green:0.8 blue:0.2 alpha:1];//设置文字颜色。clearColor为透明色
label.alpha = 0.5;//设置透明度
label.font = [UIFont systemFontOfSize:25];//设置字体大小
label.font = [UIFont boldSystemFontOfSize:25];//设置字体加粗
label.font = [UIFont italicSystemFontOfSize:25];//设置字体倾斜
for(NSString *name in [UIFont familyNames])//遍历系统字体库里有哪些字体
{
  NSLog(@“%@“, name);
}
label.font = [UIFont fontWIthName:@“Bodoni 72” size:25];//更换字体
label.shadowColor = [UIColor redColor];//设置阴影颜色
label.shadowOffset = CGSizeMake(5, 5);//设置阴影偏移
label.lineBreakMode = NSLineBreakByCharWrapping;//设换行模式，按字符换行，NSLineBreakByWordWrapping按单词换行。对中文无效
label.numberOfLines = 10;//显示行数。0或-1表示不限制行数
CGSize size = [label.text sizeWithFont:label.font constrainedToSize:CGSizeMake(355, 10000) lineBreakMode:NSLineBreakByCharWrapping];//根据字符串大小计算label的大小
label.frame = CGRectMake(label.frame.origin.x, label.frame.origin.y, label.frame.size.width, size.height);
[[self.view addSubview:label];
```
### 4、UIImage&UIImage View
```objc
NSString *path = [NSBundle mainBundle] resourcePath];//获取工程目录的路径
NSString *imagePath = [NSString stringWithFormat:@“%@/1.png”, path];
UIImage *image = [[UIImage alloc] initWithContentsOfFile:imagePath];//加载图片,initWithData可以用来加载二进制流图片。
UIImage *image1 = [UIImage imageNamed:@“1”];//这种方式加载图片会在内存中建立缓存，知道程序结束才释放。如果时png格式可以省略后缀。
```
图片需要载体才能显示在屏幕在，比如Image VIew。图片显示在屏幕上的大小由载体控制
```objc
UIImageView *imageView = [[UIImageView alloc] initWithImage:image];
imageView.Frame = CGRectMake(10, 100, 355, 400);
imageView.backgroundColor = [UIColor yellowColor];
[self.view addSubview];
imageView.contenMode = UIViewContentModeCenter;//内容模式，设置了内容模式图片会保持原图大小，不会被拉伸。UIViewContentModeScaleToFIll － 拉伸充满整个载体；UIVIewContentModeScaleAspectFill - 拉伸不改变比例，充满最大的一边；UIVIewContentModeScaleAspectFit - 拉伸不改变比例，充满最小的一边
NSMutableArray *imageArray = [[NSMutableArray alloc] init];
for (int i=1; i<=13; i++)
{
  UIImage *iamge = [UIImage imageNamed;[NSString stringWtihFormat:@“png%d.png”,i]];
[imageArray addObject:image];
}
UIImageVIew *imageView = [[UIImageView alloc] init];
imageView.frame = CGRectMake((375-407)/2, 100, 407, 217);
[self.view addSubview:imageView];
imageView.animationImages = imageArray;//设置动画数组
imageView.animationDuration = 2;//设置播放周期时间(秒)
imageView.animationRepeatCount = 10;//执行次数，0代表无限制
[imageView StartAnimating];//开始播放动画序列图
[imageView stopAnimation];//停止播放
```

## 六、










