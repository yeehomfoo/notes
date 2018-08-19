# Mysql数据库优化学习  
  
标签（空格分隔）： learning  
  
## 一、Mysql数据库的优化技术  
### 1、对mysql优化是一个综合性的技术，主要包括  
a:表的设计合理化（符合3NF)  
b:添加适当索引(index)（一般用四种：普通索引、主键索引、唯一索引、全文索引、空间索引）  
c:分表技术（水平分割、垂直分割）  
d:读写分离（写：update/delete/add)  
e:存储过程（模块化编程，可以提高速度）  
f:对mysql配置优化（配置最大并发数：my.ini，max_connections，一般网站调整到1000左右，默认是100；调整缓存大小）  
g:mysql服务器硬件升级  
h:定时地去清除不需要的数据，定时进行碎片整理（MyISAM一定要清)  
  
### 2、主键索引的效率是最高的，但是只能有一个。  
  
## 二、数据库表设计  
### 1、数据库设计三范式  
通俗地理解三范式，对于数据库设计大有好处。在数据库设计中，为了更好地应用三范式，就必须通俗地理解三范式。  
第一范式：1NF是对属性的原子性约束，要求属性(列)具有原子性，不可再分解  
第二范式：2NF是对记录的唯一性约束，要求记录有唯一标识，即实体的唯一性；  
第三范式：3NF是对字段冗余性的约束，他要求字段没有冗余，没有冗余的数据库设计可以做到。  
反3NF：但是，没有冗余的数据库未必是最好的数据库，有时为了提高运行效率，就必须降低范式标准，适当保留冗余数据。具体做法是：在概念数据模型设计时遵守第三范式，降低范式标准的工作放到物理数据模型设计时考虑。降低范式就是增加字段，允许冗余。允许适度冗余和有理由的冗余。  
  
### 2、数据库的分类  
关系型数据库：mysql、oracle、db2、informix、sysbase、sql server  
非关系型数据库：（特点：面向对象或者集合）  
NoSql数据库：MongoDB（特点是面向文档）  
  
主键：往往设计成不含业务逻辑，一般是自增长的。因为主键不含业务逻辑，因此数据比较稳定，主键无论需求怎么改也不需要变更。  
  
在表的1对n的情况下，为了提高效率，可能会在1这张表中设计冗余字段，提高速率  
但是有的时候，增加字段并不一定能提高效率，还要考虑IO的影响，数据冗余可能会增加大量的IO次数，更影响效率。  
  
### 3、SQL语句优化  
1、通过show status命令了解各种SQL的执行效率(比如想知道当前mysql运行的时间、一共执行了多少次select/update/delete../当前连接。  
show status like 'uptime' 数据库运行的时间  
show status like 'com_select' show status like 'com_insert'...类推 update delte  
show [session|global] status like ... 如果不写默认是session会话，指取出当前窗口的执行，如果想看所有（从mysql启动到现在），应该使用global;  
show status like 'connections';显示连接数  
show status like 'slow_queries';显示慢查询次数  
show variables like 'long_query_time';显示当前慢查询时间  
set long_query_time = 1;修改慢查询时间  
  
2、定位执行效率较低的SQL语句（定位慢查询（默认是10S,不仅是dql,dml也算慢查询），重点select)  
3、通过explain分析低效率的sql语句的执行情况  
4、确定问题并采取相应的优化措施  
  
构建大表->大表中记录有要求，记录是不同的才更有效，否则测试效果和真是的相差很大（所以无穷自我复制不适用，一般使用存储过程来实现）  
  
为了存储过程能够正常执行，我们需要把修改命令执行结束符delimiter $$  
在默认情况下mysel不会记录慢查询的sql，需要在启动mysql的时候指定记录慢查询。  
如果启用了慢查询日志，默认把文件my.ini文件中记录的datadir中。  
  
### 4、建立适当的索引  
说起提高数据库性能，索引是最物美价廉的东西了。不用加内测，不用改程序，不用调sql，只要执行个正确的create index，查询的速度就可能提高百倍千倍。但是查询速度的提高是以插入、更新、删除的速度为代价的，这些写操作，增加了大量i/o。（大概会增加20%的数据空间）  
  
四种索引（主键索引/唯一索引/全文索引/普通索引）  
#### 1、添加  
##### 1.1主键索引添加：当一张表中，把某个列设为主键的时候，则该列就是主键索引。  
create table aaa(id int unsigned primary key auto_increment, name varchar(32) not null default'';  
这时ID列就是主键索引了。  
如果创建表时，没有指定主键索引，也可以在创建表后再添加。  
alter table 表名 add primary key (列名);  
##### 1.2普通索引  
一般来说，普通索引的创建是先创建表然后再创建普通索引。  
create table ccc(id int unsigned, name varchar(32))  
create index 索引名 on table_name (col_name);  
##### 1.3全文索引  
全文索引主要针对文件，文本的检索，比如文章。全文索引只针对MyISAM有用。  
select * from articles where body like '%mysql%';这种做法不会用到全文索引  
正确的用法是：select * from articles where match(title, body) against('database');  
注意：在mysql中fulltext索引只针对myisam引擎生效；只针对英文字母生效（sphinx(coreseek）技术处理中文）；使用方法是match(字段名）..against('关键字')；全文索引有一个叫停止词的概念，因为在一个文本中，创建索引是一个天文数字，因此对一些常见的词和字符，就不会创建，这些词，称为停止词。  
##### 1.4唯一索引  
当表的某列被指定为unique约束时，这列就是一个唯一索引。  
create table ddd(id int primary key auto_increment, name varchar(32) unique)  
这时，name列就是一个唯一索引。  
#### 2、查询  
desc 表名，该方法不能够显示索引名。  
show index(es) from 表名  
show keys from 表名  
#### 3、删除  
alter table 表名 drop index 索引名  
drop index index_name on table_name   
如果删除主键索引：alter table 表名 drop primary key  
#### 4、修改  
先删除，再重新创建。  
  
第一次查询之后，数据库会对结果进行缓存，如果再次执行相同的查询会直接返回结果，执行不同查询则会重新遍历。   
  
### 5、索引的代价：  
1、占用磁盘空间  
2、对dml操作有影响，变慢（因为要去维护索引文件）  
  
哪些列适合添加索引  
较频繁的作为查询条件字段应该创建索引  
sleect * from emp where empno = 1  
唯一性太差的字段不适合单独创建索引，即使频繁作为查询条件  
select * from emp where sex = '男'  
更新非常频繁的字段不适合创建索引  
select * from emp where logincount = 1  
不会出现在where子句中字段不该创建索引  
  
### 6、索引的使用  
查询要使用索引最重要的条件是查询条件中需要使用索引。  
下列几种情况下有可能使用到索引  
1、对于创建的多列索引，只要查询条件使用了最左边的列，索引一般就会被使用。  
2、对于使用like的查询，查询如果是'%aaa'不会使用到索引'aaa%'会使用到索引。  
下列的表将不使用索引  
1、如果条件中有or，即使其中有条件带索引也不会使用。  
2、对于多列索引，不是使用的第一部分，则不会使用索引。  
3、like查询是以%开头  
4、如果列类型是字符串，那一定要在条件中将数据使用引号引用起来。否则不适用索引。（添加时，字符串必须‘’）  
5、如果mysql估计使用全表扫描要比使用索引快， 则不使用索引。  
  
  
  
  
