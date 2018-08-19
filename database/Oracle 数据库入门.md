# Oracle 数据库入门  
  
标签（空格分隔）： learning  
  
## 第一章：引言  
### 一、概述  
保存数据的两种方法--文件和数据库  
文件保存：  
（1）文件的安全性问题  
（2）文件不利于查询和对数据的管理  
（3）文件不利于存放海量数据  
（4）文件在程序中控制不方便  
  
小型数据库：access、foxbase  
中型数据库：sql server、mysql  
大型数据库：oracle、sybase、informix  
海量数据库：db2  
应当如何选择数据库（项目中）：  
1、标的（花多少钱）  
2、功能要求  
3、多少人用（并发问题）  
4、安全，稳定性  
5、操作系统  
  
### 二、ORACLE的安装  
（1）安装文件下载  
（2）把安装文件拷贝到没有中文的路径下（考虑兼容性）  
（3）到电脑的服务选项去确认本机没有安装ORACLE数据库，如果有则先卸载  
（4）安装目录建议不要带中文或者特殊字符  
（5）可以选择创建一个启动数据库（默认数据库），当我们每创建一个数据库实例的时候，就会自动地创建三个用户（至少3个，还有更多）：sys用户（超级管理员，超级用户，权限最大），system用户（管理员用户，其权限仅次于sys），scott用户（普通用户）。其他的用户（sysman,dbsnmp)用的比较少，暂且不管。  
（6）在默认情况下，scott用户是锁定（lock user)，不能使用，建议启用它。  
  
### 三、配置  
我们一般把所有的服务都设为手动启动，否则计算机启动太慢了  
我们做开发的时候，一般只需要启动TNSListener（监听服务）和OracleService（数据库实例服务）两个服务  
  
如果你安装的时候，忘记对某个游湖解锁，比如scott，我们可以通过system来对该用户解锁。先使用system登陆，然后输入：alter user scott account unlock。  
  
oracle10G比oracle9i增加了网格（Grid），支持自动管理（Automatic Management).  
10g的g是"Grid"的缩写，支持网格计算，即多台结点服务器利用高速网络组成一个虚拟的高性能服务器，负载在整个网格中均衡(Load Balance)，按需增点，避免单点故障(single Point of Failure).  
10g还新增了基于浏览器的企业管理器（Enterprise Manager)。  
  
oracle不仅做数据库也做应用软件的开发，比如ERP,CRM,HCM等。  
  
### 四、oracle管理工具介绍  
1、sql*plus是oracle自带的工具软件，主要用于执行sql语句，plsql块。在application development中或者在运行栏中输入：sqlplusw（windows版）或者sqlplus（在dos下操作oracle的工具）运行。  
2、pl/sql developer属于第三方软件，主要哟昂与开发，测试，优化oracle pl/sql的存储过程比如：触发器，此软件oracle不带，需要单独安装。  
3、enterprise manager console(企业管理器）。oracle10g是通过web管理的一般默认端口是5500，也有1158的。访问url(请一定保证oracledbconsoleorcl服务启动了，一般情况下不启动该服务):http://ip:1158(也可能是5500)/em,http://机器名：端口/em  
  
### 五、sql*plus常用命令  
连接命令  
（1）conn[ect] （也可以用来切换当前用户）  
用法：conn 用户名/密码@网络服务名 [as sysdba/sysoper]。当用特权用户身份连接时，必须带上as sysdba或是as sysoper  
（2）disc[connect]  
说明：该命令用来断开与当前数据库的连接  
(3)passw[ord] （如果给自己改密码，则可以不带用户名）  
说明：该命令用于修改用户的密码。如果要想修改其他用户的密码，需要用sys/system登陆。  
（4）show user  
说明：显示当前用户名  
（5）exit  
说明：该命令会断开与数据库的连接，同时会退出sql*plus  
交互式命令  
（6）&  
说明：可以替代变量，而该变量在执行时，需要用户输入。  
sql>select * from emp where job = '&job'  
（7）edit  
说明：该命令可以编辑指定的sql脚本  
案例：sql>edit d:\a.sql  
（8）spool  
说明：该命令可以将sql*plus屏幕上的内容输出到指定文件去  
案例：sql>spool d:\b.sql并输入sql>spool off  
(9)linesize  
说明：设置显示行的宽度，默认是80个字符  
sql>show linesize  
sql>set linesize 90  
（10）pagesize  
说明：设置每页显示的行数目，默认是14，用法和linesize一样。至于其他坏境参数的使用也是大同小异。  
  
### 六、oracle用户管理  
#### 1、创建用户（简单版）  
概述：在oracle中要创建一个新的用户使用create user语句，一般是具有dba（数据管理员）的权限才能使用。  
基本语法：create user 用户名 identified by 密码  
给用户修改密码  
概述：如果给自己修改密码可以直接使用  
sql>password 用户名  
如果给别人修改密码则需要具有dba权限（sys和system)，或是拥有alter user的系统权限，也可以使用password用户名 sql>alter user 用户名 identified by 新密码注意：oracle要求用户的密码不能用数字打头。  
  
oralce刚刚创建的用户是没有任何权限的，甚至连登陆的都有，需要管理员给用户分配相应的权限，才能够登陆。比如说我们分配create session（仅仅只是登陆权限） 权限给他。grant creat session to 用户名。  
  
#### 2、创建用户（细节）  
例子：sql>create user shunping identified by m123 default tablespace users temporary tablespace temp quota 3m on users;（USER、temp、system表空间是数据库自动创建的）  
indentified by 表明用户shunping将用数据库方式验证default tablespace users//用户的表空间  
在user上tempopraty tablespace temp //用户shunping的临时表建在temp空间  
quota 3m on users //表明用户shunping建立的数据对象（表、索引、视图、pl/sql快）最大只能是3m。刚刚创建的用户是没有任何权限的，因此，需要dba给该用户授权。  
sql>grant connect to shunping  
如果你希望该用户建表没有空间限制  
sql>grant resource to shunping  
如果你希望该用户成为dba  
sql>grant dba to shunping  
  
#### 3、表空间：表存在的空间。一个表空间（逻辑）是指向具体的数据文件（物理，文件中有很多表）的。  
  
### 七、oracle管理机制  
#### 1、权限  
系统权限：系统权限是和数据库本身的管理相关的权限（128种）。create session,create table create index create view crate sequence create trriger 创建函数，创建包等。  
对象权限：对象权限是和用户操作数据对象相关的权限（10多种）update,insert,delete,select  
用户创建好之后可以通过DBA分配权限。  
#### 2、角色  
预定义角色：把常用的权限集中起来，形成角色。dba,connect,resource  
自定义角色：自己定义角色。  
既可以分配(grant)权限、角色，也可以回收(revoke)权限、角色。  
  
如果切换用户没有成功就会自动退出当前用户，需要重新登录。  
  
删除用户 drop user 用户名 [cascade]  
当我们删除一个用户的时候，如果这个用户自己已经创建过数据对象，那么我们再删除该用户的时候，需要加一个选项:cascade，表示把这个用户删除的同时，把该用户创建的数据对象一并删除。如果还想使用用户创建的数据对象，则只需要冻结用户。  
  
#### 3、方案（schema）  
当一个用户，创建好后，如果该用户创建了任意一个数据对象，这时我们的DBMS就会创建一个对应的方案与该用户对应，并且该方案的名字和用户名一致。  
如果希望看到某个用户的方案究竟有什么数据对象，我们可以用pl/sql developer查看。  
  
with grant option表示的到权限的用户，可以把权限继续分配。  
with admin option 如果系统权限，则带with admin option。  
  
### 八、oracle用户管理  
使用profile管理用户口令  
概述：profile可以对用户所使用的数据库资源进行限制，资源限制(cpu时间、i/o时间、idletime、connecttime、并发会话数量、口令机制)的命令集合，当建立数据时，oracle会自动建立名称为default的profile，当建立用户没有指定profile选项，那oracle就会将default分配给用户。  
（1）账户锁定  
概述：指定该账户（用户）登录时最多可以输入密码的次数，也可以指定用户锁定的时间（天）一般用dba的身份去执行该命令  
例子：指定scott这个用户最多只能尝试3次登陆，锁定时间为2天，让我们看看怎么实现。  
创建profile文件  
sql>create profile lock_account limit failed_login_attempts 3 password_lock_time 2;  
sql>alter user tea profile lock_account;  
（2）给账户（用户）解锁  
sql>alter user 用户名 account unlock;  
（3）终止口令  
为了让用户定期修改密码可以使用终止口令的指令来完成，同样这个命令也需要dba身份来操作。  
例子：给前面创建的用户tea创建一个profile文件，要求该用户每隔10天要修改自家的登陆密码，宽限2天。  
sql>create profile myprofile limit password_life_time 10 password_grace_time 2;  
sql>alter user tea profile myprofile  
（4）口令历史  
如果希望用户在修改密码时，不能使用以前使用过的密码，可使用口令历史，这样oracle就会将口令修改的信息存放到数据字典中，这样当用户修改密码时，oracle就会对新旧密码进行比较，当发现新旧密码一样时，就提示用户重新输入密码。  
create profile password_history limit password_life_time 10 password_grace_time 2 password_reuse_time 1  
（5）删除profile  
drop profile profile文件名  
  
### 九、数据库启动流程  
oracle可以通过命令行方式启动  
windows  
1）lsnrctl start (启动监听）  
2）oradim -startup -sid 数据库实例名  
linux  
1）lsnctl start  
2）sqlplus sys/change_on_install as sysdba(以sysdba身份登录,oracle10g以后）  
sqlplus /nolog  
conn sys/change_on_install as sysdba  
3）startup  
  
### 十、oracle登录认证方式  
oracle登录认证方式-windows  
oracle登录认证在windows下和linux下是不完全相同的，这里我们先说说windows下oracle的登录认证方式。  
（1）操作系统认证  
如果当前用户属于本地操作系统的ora_dba组（对于windows操作系统而言），即可通过操作系统认证。  
（2）oracle数据库验证（密码文件验证）  
对于普通用户，oracle默认使用数据库验证。  
对于特权用户（dbms一看到as sysdba，则认为要以特权用户登陆，前面用户名和密码不管，登陆后，自动切换成sys用户），oracle默认使用操作系统认证，如果验证不通过，再到数据库验证（密码文件验证）。通过配置sqlnet.ora文件，可以修改oracle登陆认证方式  
SQLNET AUTHENTICATION_SERVICES=(NTS)是基于操作系统验证；  
SQLNET AUTHENTICATION_SERVICES=(NONE)是基于oracle验证；  
SQLNET AUTHENTICATION_SERVICES=(NONE,NTE)是二者共存。  
  
### 十一、丢失管理员密码怎么办  
恢复办法：把原有密码文件删除，生成一个新的密码文件。  
如果希望新的密码生效，则需要重新启动数据库实例。  
  
## 第二章：数据库基础  
所谓数据库服务器，只是在机器上装了一个数据库管理程序，这个程序可以管理多个数据库，一般开发人员会针对每一个应用创建一个数据库。  
为保存应用中实体的数据，一般会在数据库创建多个表，以保存程序中实体的数据。  
client、dbms、和db是一个三层的结构关系。  
  
数据在数据库中是以表的方式存储  
表的一行称之为一条记录  
表中一条记录对应一个java对象的数据（关系模型与对象模型的转换）  
  
### 一、创建一张表  
create table table_name(field1 datatype, field2 datatype, field3 datatype,)  
field：指定列名 dtatype:指定列类型  
  
oracle常用数据类型  
char(size) 定长，最大2000字符  
varchar2(size) 变长，最大4000字符  
nchar(n) unicode数据类型，定长，最大2000字符  
nvarchar2(n) unicode数据类型，变长，最大4000字符  
clob(character large object) 字符型大对象，最大8tb  
blob(binary large object) 二进制数据，可以存放图片/声音 8tb  
number(p,s) p为整数位，s为小数位。1<=p<=38,-84<=s<=127,保存在机器内部1——22bytes  
date 包含年月日，时分秒。默认格式：dd-mm-yyyy.从公元前4712年1月1日到公元4712年12月31  
timestamp(n) n的取值为0-9表示指秒的小数位数。n可选，如果n为0，和date等价（不推荐为0）  
  
number可以理解成是一个可变的数值类型，比如number(12),你放了一个小整数，它占用的字节数就少，你放一个大整数，它占用的字节数就多。number在范围内超出精度时，会四舍五入  
定长：最多可以放入给定长度字符，如果超过报错，如果不够则用空格补全。  
varchar一般用的比较少，因为varchar2比varchar要好  
如果我们的数据的长度是固定的，比如商品编号（8位），则应当使用char来存放，因为这样存取速度会快很多。如果存放数据的长度是变化的，则使用varchar2.  
unicode，一个汉字，占用一个字符空间（每一个是两个字节），非unicode一个汉字，占用两个字符空间（每一个字符空间是一个字节）。unicode的好处就是解决多国语言的问题  
一般不把图片和声音存到数据库中（效率问题），一般在网络中通过流的形式操作。实际上我们一般记录一个路径（本地路径或者url），然后通过io/网络来操作。如果我们要求对文件安全性比较高，可以考虑放入数据库。  
如果在做实际开发中，我们有明确要求保留到小数点第几位，则明确指定；如果没有，就可以直接使用number，范围是最广的。  
date类型添加的时候要使用默认格式‘dd-mm-yyyy’；如果我们希望使用，中国日期格式添加，需要借助oracle的函数。  
timestamp(n)，当对数据进行更新的时候会自动更新这个日期。  
  
### 二、修改表  
使用alter table语句添加，修改，或删除列  
alter table tablename add (columnname datatype);  
alter table table modify (columnname datatype);（修改数据类型）  
alter table table drop column column;  
修改表的名称：rename 表名 to 新表名  
  
表的crud操作（create/retreive/update/delete，增删改查)  
1、insert into table [(column [, column...])] values (value [,value...]);  
插入的数据应与字段的数据类型相同。  
数据的大小应在列的规定范围内。  
在values中列出的数据位置必须与被加入的列的排列位置相对应。  
字符和日期型数据应包含在单引号中。  
插入空值，不指定或insert into table value(null)，null表示没有分配空间，''和null等价  
如果给表的每一列都添加值，则可以不带列名  
2、update tablename set col1=expr1 [, col2=expr2 ...] [where where_definition]  
update语法可以用新值更新原有表中的各列。  
set子句指示要修改哪些列和要给予哪些值。  
where子句指定应更新哪些行，如没有where子句，则更新所有的行(小心)  
3、delete from tablename [where where_definition]  
如果不适用where子句，将删除表中所有数据。  
delete语句不能删除某一列的值（可使用update)  
使用delete语句仅删除记录，不删除表本身。如果删除表，使用drop table语句  
同isert和update一样，从一个表中删除记录将引起其他表的参照完整性问题，在修改数据库数据时，头脑中应该始终不要忘记这个潜在的问题。  
删除的几种方法比较：  
delete from 表名：删除所有记录，表结构还在，写日志，可恢复（savepoint,rollback，速度慢  
drop table 表名：删除表的结构和数据  
delete from student where xh='A001';删除一条记录  
truncate table 表名；  
删除表中的所有记录，表结构还在，不写日志，无法找回删除的记录,不可回滚，速度快。  
oracle的dbms总是试图把给的数据转换成对应的字段类型，如果不成功则报错。  
  
### 三、简单查询  
查询语句：增删改查中增复杂的操作（占据90%的学习时间）  
用到scott用户里面的三张表：emp,dept,salgrade  
select [distinct] * | {column1,column2,column3...} from tablename;  
select指定查询哪些列的数据  
column指定列名  
*号代表查询所有列  
from指定查询哪张表  
distinct可选，指显示结果时，是否剔除重复数据  
|| 连接符，把多列连接起来作为一列返回  
nvl 处理null的函数  
别名 [as] “别名”  
可以对列名使用算术表达式或者函数。  
where子句 可用between表示在两者之间  
like操作符（模糊查询）%表示0到多个字符，_表示1个任意字符  
where column in (val1,val2,val3)  
is null操作符 不能写val1=null  
order by 对结果（结果已经出来）进行排序显示，asc升序，desc降序。  
  
  
查看表的结构：sql>desc tablename;  
查询所有列：select * from tablename;  
查询指定列：select column1, column2... from tablename;  
取消重复行：select distinct deptno, job from emp;  
  
oracle和sql server不同，查询特定字段时，字段的内容（引号里面）是区分大小写的。  
null乘以任何数都为null，加上任何数也都为null，null!=null。  
oracle不允许单引号用于别名，可以不写或者用双引号，sql server可以用单引号。  
nvl函数时oracle提供的（sql server是isnull)，用于处理数据null的问题，基本用法是nvl(comm)  
  
### 四、复杂查询  
说明：在实际应用中经常需要执行复杂的数据统计，经常需要显示多张表的数据，所以要用到很多复杂的查询语句。如果多表查询要用到4,5张表，一般来说表的设计是有问题的。联合查询一般3张表已经很多了，4张表是极限了。  
数据分组（聚合函数）-max,min,avg,sum,count  
max,min不确定函数，如果有两个最大或最小的，随便挑一条出来（一般按数据的插入先后顺序）。  
avg，sum会忽略为空的数据，不予统计。sum(comm)/count(*)可以统计为空的数据  
count,可以count(字段名）,也是不统计为空的字段值。  
  
默认情况下SQL语句是从右向左执行的，查询记录结果少的语句尽量放在右边（目前的数据库一般都有内部优化，不写右边有时候也可以）。  
  
group by和having子句  
group by用于对查询的结果分组统计  
having子句用于限制（过滤）分组显示结果，对分组进行筛选。  
1、分组函数（avg...)只能出现在选择列表、having、order by 子句中  
2、如果在select语句中同时包含有group by, having, order by那么他们的顺序是group by, having, order by  
3、在选择列中如果有列、表达式和分组函数，那么这些列和表达式必须有一个出现在group by 子句中，否则会出错。  
  
### 五、多表查询（联合查询）  
说明：多表查询是指基于两个和两个以上的表或视图的查询。在实际应用中，查询单个表可能不能满足你的需求，（如显示sales部门位置和其员工的姓名），这种情况下需要使用到（dept表和emp表）    
多表查询原理  
select * from emp, dept;  
从dept表中选出第一条记录，然后与emp的每一条记录进行匹配。  
笛卡尔集，在多表查询的时候，如果不带任何条件，则会出现笛卡尔集。  
规定（避免笛卡尔集，出现笛卡尔集，结果一定是错的）：多表查询的条件至少不能少于表的个数-1。  
在多表查询的时候，如果两个表的列同名，则需要加表名区分，否则可以不加（建议还是加）。  
  
自连接：指在同一张表的连接查询。把同一张表看成两张表（一定要用别名）。  
  
子查询：指嵌入在其他sql语句中的select语句，也叫嵌套查询  
单行子查询：只返回一行数据的子查询语句  
多行子查询：返回多行数据的子查询。  
在多行子查询中可以使用all和any操作符。  
多列子查询：指返回多个列数据的子查询。select * from emp where(col1,col2)=(select col1,col2 from emp where ...)  
在from子句中使用子查询（把一个子查询当做一个临时的表或者临时的视图来对待）。  
如何显示高于自己部门平均工资的员工信息？  
这里要用到数据查询的小技巧，把一个子查询当作一个临时表使用  
解法①：select e1.*, e2.myavg from emp e1, (select avg(sal) myavg, deptno from emp group by deptno) e2 where e1.deptno=e2.deptno and e1.sal>e2.myavg  
解法②：select e1.* from emp e1 where e1.sal>(select avg(sal) from emp where deptno =e1.deptno)  
解法2虽然简单，但是有一定的局限性，它不能显示子查询中字段，并且效率可能略低。  
from子句的子查询经常会被用到，所以需要熟练掌握。  
（+）是外联符号  
当在from子句中使用子查询时，该子查询会被作为一个临时表来对待，当在from子句中使用子查询时，必须给子查询指定别名。  
  
### 六、分页查询  
分页查询是我们学习任何数据库，必须掌握的一个要点。  
mysql(最简单）：  
select * from 表名 where 条件 limit 从第几条取，取几条  
sql server（较复杂）：  
select top 4 * from 表名 where id not in (select top 5 id from 表名 where 条件）；  
排除前5条，再取4条，也就是去5-8条。  
oracle（乍看复杂，实际简单）:  
select emp.*, rownum from emp where rownum<=6 and rownum>=4;  
这个查询不到结果，oracle认为这样做效率太低了，对这个进行了优化，和mysql一样优化了。  
select t2.* from (select t1.*, rownum rn from (select *from emp) t1 where rownum<=6) t2 where rn>=4;  
说明：上面的这个sql是oracle数据库效率比较高的查询方法，在百万级别都可以及时响应（0.1到0.2s）。  
oracle使用三层过滤（筛选）。  
实际上我们可以把上面的sql语句当做一个分页模板来对待。6为取到第几条，4代表从第几条开始取  
每一层都有自己的任务，第一层筛选出符合要求的数据，分层筛选很方便，如果是sqlserver加条件的话就会很麻烦。  
  
oracle分页查询的效率：  
模拟10w的一个表->测试：  
create table mytest as select empno, ename, sal, comm, deptno from emp;(以一个存在的表为模板创建一张表，数据也有）  
insert into mytest (empno, ename, sal, comm, deptno) select (empno,ename,sal,comm,deptno) from mytest;自我复制  
  
如果我们需要针对不同的情况分页，请在最内层进行处理，包括多表。  
  
oracle的分页查询总共有三种方法  
1、根据rowid来分（比较复杂）  
select * from t_xiaoxi where rowid in   
(select rid from  
(select rownum rn, rid from  
(select rowid rid, cid from t_xiaoxi order by cid desc) where rownum<10000)  
where m>9980) order by cid desc;  
执行时间0.03秒  
2、按分析函数来分（效率比较低）  
select * from  
(select t.*, row_number() over(order by cid desc) rk from t_xiaoxi t)  
where rk<10000 and rk>9980;  
执行时间1.01秒  
3、按rownum来分（一般来说用这种）  
select * from  
(select t.*, rownum rn from  
(select *from t_xiaoxi order by cid desc) t where rownum<1000)  
where rn>9980;  
执行时间0.1秒。  
  
### 七、用查询结果创建新表  
这个命令是一种快捷的建表方法  
create table mytable (id, name, sal, job, deptno)  
as select empno, ename, sal, job, deptno from emp;  
自我复制数据（蠕虫复制）  
为了对某个sql语句进行效率测试，我们需要海量数据时，可以用此方法。  
insert into mytable (id, name, sal, job, deptno)  
select empno, ename, sal, job, deptno from emp;  
  
### 八、合并查询（用的比较少）  
为了合并多个select语句的结果，可以使用集合操作符号union, union all, intersect, minus  
1)union 用于取得两个结果集的并集。使用该操作符，会自动去掉结果集中重复的行。  
2）union all 与union相似，但是它不会取消重复行，而且不会排序。  
3)intersect 用于取得两个结果集的交集。  
4）minus 用于取两个结果集的差集，它只会显示存在第一个集合中，而不存在第二个结合中的数据  
  
### 九、表内连接和外连接  
表连接分为内连接和外连接。每种连接都有两种写法，where或on  
#### 1、内连接：实际上就是利用where子句对两张表形成的笛卡尔积进行筛选，，是开发过程中用的最多的连接。select 列名 .. from 表1 inner join 表2 on 条件...  
#### 2、外连接  
外连接分三种：左外连， 右外连， 完全外连。  
左外连：左侧的表完全显示 left join ...on... 或 右表（+）  
右外连：右侧的表完全显示 right join ...on... 或左表（+）  
完全外连：完全显示两个表，没有匹配的记录置空 f ull outer join on,  
内连接：只有两张表同时匹配，才显示。select stu.name, stu id, exam.grade from stu, exam where stu.id=exam.id;  
实际上左外连和右外连是可以互为转换的，本质上没有区别。  
  
## 第三章：sql函数与事务处理  
1、java程序中如何操作oracle  
2、如何在oracle中操作数据  
3、oracle事务处理  
4、sql函数的使用  
我们可以对java代码进行一个重构（代码冗余），封装成一个sqlhelper类  
在实际开发中，我们往往把，连接字符串这些变量写到外部文件中，当程序启动时候，我们读入这些配置信息。把数据库配置信息，写到一个文件里取，这样更灵活，不需要重新编译。可以用java.util.Properties这个类的方法。  
PL/SQL DEVERLOPER看到的数据，可能和Java程序中看到的数据不一样=》事务控制  
  
### 一、java连接oracle有两种方式  
1、JDBC直连  
2、jdbc-odbc 桥连接  
什么时候使用jdbc,jdbc-odbc？  
如果java程序和db不在同一机器上，我们一般使用jdbc，如果java程序和db在同一台机器上，则两个都可以用。一般用jdbc比较多。  
  
当使用values子句时，一次只能插入一行数据，当使用子查询插入数据时，一条insert语句可以插入大量的数据。当处理行迁移或者装载外部表的数据到数据库时，可以使用子查询来插入数据。  
使用update语句更新数据时，既可以使用表达式或者数值直接修改数据，也可以使用子查询修改数据。  
  
### 二、sql函数  
oracle数据库的强大，体现在对用户管理，pl/sql编程，函数丰富。安全性，并发性也很强。  
函数的分类：  
单行函数：对每一行输入值进行计算，得到相应的计算结果，返回给用户，也就是说，每行作为一个输入参数，经过函数计算得到每行的计算结果。比如length  
多行函数：对多行输入值进行计算，得到多行对应的单个结果。比如max,min>  
  
单行函数分为：  
数字函数  
日期类型  
转换函数  
系统函数  
  
字符函数：  
字符函数：是oracle中最常用的函数，用于处理字符相关的业务。  
concat函数和||作用是一样的，用于字符串或者列连接  
initcap函数，返回首字母大写的字符串  
instr(c1,c2,i,j)函数，字符串查找函数  
length函数，得到字符串的长度（字符个数）。  
lower返回字符串，并将所有的字符小写  
upper返回字符串，并将所有的字符大写  
substr(string,start,count)取子子字符串，从start开始，取count个  
rpad在列的右边粘贴字符  
lpad在列的左边粘贴字符  
ltrim删除左边出现的字符串  
rtrim删除右边出现的字符串  
replace替换字符串  
soundex 返回一个与给定的字符串读音相同的字符串。  
trim去掉指定字符串或是数值前后的某些字符或数值，有点像把ltrin和rtrim合在一起。  
数值函数：  
数字函数的输入参数和返回值的数据类型都是数字类型。对于数字的处理，在财务系统或银行系统中用的最多，不同的处理方法，对财务报表有不同的结果。  
可以在参考文档中查看别的数学函数  
ABS返回指定值的绝对值  
acos给出反余弦的值  
asin给出反正弦的值  
atan返回一个数字的反正切值  
ceil返回大于或等于给出数字的最小整数  
floor对给定的数字取整数  
cos返回一个给定数字的余弦  
cosh返回一个数字的双曲余弦值  
exp返回一个数字e的n次方根  
ln返回一个数字的对数值  
log(n1,n2)返回一n1为低，n2的对数  
mod(n1,n2)返回一个n1除以n2的余数  
power返回n1的n2次方值  
round按照指定的精度进行四舍五入  
trunc按照指定的精度截取一个数  
sign取数字n的符号，大于0返回1，小于0返回-1，等于0返回0  
sin返回一个数字的正弦值  
sinh返回双曲正弦的值  
sqrt返回数字n的平方根  
tan返回数字的正切值  
tanh返回数字的双曲正切值  
  
日期函数：  
用于处理date类型的数据，默认情况下日期的格式是dd-mon-yy即12-7月-78  
add_mounths增加或减去月份  
sysdate用来获取系统的日期  
trunc（data,fmt)可以按照要求将日期截断，如果fmt='mi',表示保留分，截断秒  
last_day返回日期的最后一天  
months_between(date2,date1)给出date2-date1的月份  
new_time(date,'this','other')给出在this时区=other时区的日期和时间  
next_day(date,'day')给出日期date和星期x之后计算下一个星期x的日期  
sysdate用来得到系统的当前日期，默认不显示时分秒  
转换函数：  
转换函数用于将数据类型从一种转为另外一种，在某些情况下，oracle server允许值的数据类型和实际的不一样，这时，oracle server会隐含的转化数据类型，。但是隐式转换并不适用于所有的情况，为了提高程序的可靠性，我们应该使用转换函数进行转换  
chartorowid将字符数据类型转换为rowid类型，rowid是oracle的一种特殊的类型  
convert(c,dset,sset)将源字符串c从一个语言字符集sset转换到另一个目的dset字符集.  
hextoraw将一个十六进制构成的字符串转换为二进制  
rawtohex将一个二进制构成的字符串转换为十六进制  
rowidtochar 将rowid数据类型转换成字符串。  
to_char(date/string/number,'format')，我们可以有选择的显示  
to_date(string,'format')将字符串转化为oracle中的一个日期  
to_multi_byte将字符串中的单字节字符转化为多字节字符  
to_number将给出的字符转换为数字  
bfilename(dir, file)指定一个外部二进制文件(blob)  
decode(deptno, 10, '10号部门'， 20, '20号', 30, '30号') from emp;有点像switch函数  
dump(s,fmt,start,length)以fmt指定的内部数字格式返回一个varchar2类型的值  
dump(列名），返回该列的值类型描述。  
desc(表名)返回表的结构描述  
系统函数  
oracle提供了一套系统函数，可以用于查询系统信息  
vsize(x)返回x的大小（字节）数  
uid返回标识当前用户的唯一整数  
user返回当前用户的名字和show user效果一样  
userevn返回当前用户环境的信息，opt可以是：entryid,sessionid,isdba,lable,language,client_info,vsize  
isdba查看当前用户是否是dba如果是返回true,select userenv('isdba') from dual  
sys_context  
1)terminal：当前回话客户所对应的终端标识符  
2）language:语言  
3）db_name:当前数据库名称  
4)nls_date_format：当前会话客户所对应的日期格式  
5)seesion_user:当前会话客户所对应的数据库（实例）用户名  
6)current_schema：当前会话客户所对应的默认方案名  
7)host:返回数据库所在主机的名称  
通过函数，可以查询一些重要的信息，比如你在使用哪个数据库？  
select sys_context('userenv','db_name') from dual;  
  
多行函数  
empty_blob()和empty_clob()用来对大数据型字段进行初始化操作  
createst返回一组表达式中的最大值，即比较字符的编码大小  
least返回一组表达式中的最小值  
avg(distinct|all)平均值  
max(distinct|all)  
min(distinct|all)  
stddev(distinct|all)求标准差，对字段求标准差  
variance(distinct|all)求协方差  
  
to_date函数  
to_date(string, 'format') (把字符串转成指定格式的日期）  
在插入date的时候，我们必须以默认格式（日-月-年，1-1月-01，美国日期形式）添加，为了按自己习惯的方式添加，需要使用to_date函数进行日期转换。  
to_char函数  
常用的日期格式符号：yy,两位数字的年份；yyyy四位数字的年份；mm两位数字的月份；dd2为数字的天；hh24；hh12;mi，分钟；ss秒；day，星期  
常用的其他格式符号：9,显示数字，并忽略前面0；0，显示数字，如位数不足，则用0补齐；.:在指定位置显示小数点；,:在指定位置显示逗号；$:在数字前面加美元；L:在数字前加本地货币符号；C:在数字前面加国际货币符号；G:在指定位置显示组分隔符；D：在指定位置显示小数点符号(.)  
  
oracle的下标一般是从1开始的。  
  
### 三、ORACLE中事务处理  
什么是事务  
事务用于保证数据的一致性，它由一组相关的dml语句组成，该组的dml语句要么全部成功，要么全部失败。网上转账就是典型的事务处理，用来保证数据的一致性。事务具有原子性的特点  
事务和锁：当执行事务操作时（dml语句），oracle会在被作用的表上加上锁，防止其他用户改变表的结构，这里对我们用户来讲是非常重要的。有表级锁和行级锁等。  
提交事务：当使用commit语句可以提交事务。当执行了commit语句后，会确认事务的变化、结束事务、删除保存点、释放锁，当使用commit语句结束事务后，其他会话将可以查看事务变化后的新数据。  
回退事务：保存点（savepoint）是事务中的一个点，用于取消部分事务，当结束事务时，会自动的删除该事务所定义的所有保存点。当执行rollback时，通过指定保存点可以回退到指定的点。  
事务的几个重要操作：设置保存点：savepoint 保存点名；取消部分事务：rollback to 保存点名；取消全部事务：rollback。设置保存点，是有资源开销的。  
一旦提交了事务，则不能回退到任何保存点。  
  
dml=data manipulation language,数据操纵语言，包括update、insert、delete等  
java程序的数据库操作是默认自动提交的，如果要使用事务这个机制的，需要先把程序设置成不自动提交，最后再用commit()函数提交。  
如果一个事务内部只有一个dml操作或者都是查询语句，则不需要使用事务控制。  
既有单链接的事务也有跨连接的事务。  
  
事务隔离级别  
隔离级别定义了事务与事务之间的隔离程度。  
ANSI/ISO SQL92标准定义了一些数据库操作的隔离级别（这是国际标准化组织定义的一个标准而已，不同数据库在实现时有所不同，oralce只有读已提交、可串行化和readonly)  
读未提交（程度最低） 脏读，不可重复读，幻读  
读已提交 不可重复读，幻读  
可重复读 幻读  
可串行化（级别最高，代价也最高） 无  
脏读：当一个事务读取另一个事务尚未提交的修改时，产生脏读。（在oracle中不会出现）  
不可重复读：同一查询在同一事务中多次进行，由于其他提交事务所做的修改或删除，每次返回不同的结果集，此时发生非重复读。  
幻读：同一查询在同一事务中多次进行，由于其他提交事务所做的插入操作，每次返回不同的结果集，此时发生幻读。  
  
oracle的事务隔离级别  
oracle提供了sql92标准中的read committed和serializable,同时提供了非sql92标准的read_only  
oracle的read committed是oracle缺省的事务隔离级别，保证不会出现脏读，但可能出现非重复读和幻读。  
oracle的serializable是使事务看起来像是一个接着一个地顺序执行（从效果上可以这样理解），仅仅能看见在本事务开始前由其他事务提交的更改和在本事务中所做的更改，保证不会出现脏读、不可重复读和幻读，serializable隔离级别提供了read-only事务所提供的读一致性（事务级的读一致性），同时又允许dml操作。  
oracle的read only遵从事务级的读一致性，仅仅能看见本事务开始前由其他事务提交的更改，不允许在本事务中进行dml操作；read only是serializable的子集。它们都避免了不可重复读和幻读。区别是read only中是只读，而在serializable中可以进行dml操作。  
  
oracle事务隔离级别设置  
设置一个事务的隔离级别  
set transaction isolation levele read committed/serializable;  
set transaction read only;  
设置整个会话的隔离级别  
alter session set isolation_level serializable/read committed;  
  
java程序中的事务级别有五个，但不是所有的数据库都有对应的五个事务隔离级别的实现。在实际工作中，我们极少去修改各个数据库默认的隔离级别。  
  
  
## 第四章：高级数据库知识  
主要内容  
1、维护数据的完整性 2、序列（sequence) 3、管理索引 4、管理权限和角色（dba)  
  
### 一、维护数据的完整性  
数据的完整性用于确保数据库数据遵从一定的商业的逻辑规则。在oracle中，数据的完整性可以使用约束、触发器、应用程序（过程、函数）三种方法来实现，在这三种方法中，因为约束易于维护，并且具有最好的性能，所以作为维护数据完整性的首选。  
  
约束  
约束用于确保数据库数据满足特定的商业规则。在oracle中，约束包括：not null、unique、primary key、foreign key和check五种。  
oracle中一列里有多个空值，不违反唯一约束，但是sql server不行。  
not null(非空）如果在列上定义了not null,那么当插入数据时，必须为列提供数据  
unique(唯一)当定义了唯一约束后，该列值是不能重复的，但可以为null  
primary key(主键)用于唯一的标识表行的数据，当定义主键约束后，该列不但不能重复而且不能为null。一张表最多只能有一个主键，但是可以有多个unique约束。primary key所在的列会自动创建索引，unique不会。每一张表都应该有一个主键。  
foreign key(外键)用于定义主表和从表之间的关系。外键约束要定义在从表上，主表则必须具有主键约束或是unique约束。当定义外键约束后，要求外键列数据必须在主表的主键列存在或是为null。外键列和主键列的数据类型要一致，长度不做要求。主表和从表可以是同一个表。创建先创建主表再创建从表，删除相反。  
check用于强制行数据必须满足的条件。  
修改约束  
如果在建表时忘记建立必要的约束，则可以在建表后使用alter table命令为表增加约束，但要注意，增加not null约束时，需要使用modify选项，而增加其他四种约束使用add选项。  
alter table 表名 add constraint 约束名(字段)  
alter table 表名 modify 字段名 not null  
删除约束  
当不再需要某个约束时，可以删除。alter table 表名 drop constraint 约束名称  
在删除主键约束时，如果两张表存在主从关系，则必须带上cascade(级联)选项。  
因为一张表只能有一个主键，因此在删除主键约束的时候可以不使用约束名，直接使用primary key   
  
列级定义  
列级定义是在定义列的同时定义约束  
表级定义  
表级定义是指在定义了所有列后，在定义约束，这里需要注意：not null约束只能在列级上定义。  
一般情况下，我们使用列级定义即可，但是如果遇到定义复合主键（两列或以上一起作为主键），一般不推荐使用复合主键。复合主键一般包含商业逻辑，所以有可能被修改，我们一般选择新增一个与商业逻辑无关的列作为主键列（比如id)，从而增强表的稳定性。并且复合主键效率也不高，不到万不得已不要使用。  
  
### 二、序列  
在sql server和mysql中都是可以在定义表的时候，直接给指定自增长。  
sql server:create table temp1(id int primary key identity(1,1), name varchar(36));  
mysql:create table temp1(id int primary key auto_increment,name varchar(32));  
oracle中，是通过使用序列(sequence）来处理自动增长列的(效率比较高）。可以为表中的列自动产生值，由用户创建数据库对象，并可由多个用户共享，一般用于主键或唯一列。  
使用cache可以提高效率，一次产生多个数字；nocache一次只产生一个数字，每次都要计算。但是cache有可能产生跳号，如果程序异常终止会出现跳号。  
一旦定义了某个序列，就可以用currval返回sequence的当前值；nextval增加sequence的值，然后返回sequence的值。  
currval总是返回当前sequence的值，但是在第一次nextval初始化之后才能使用currval<f否则会出错。一次nextval会增加一次sequence的值，所以在同一个语句里使用多个nextval的值是不一样的  
第一次nextval返回的是初始值，随后的nextval会自动增加你定义的incremeent by值，然后返回增加后的值。  
如果指定cache值，oracle就可以预先在内存里面放置一些sequence，这样存取的快一些，cache里面取完后，oracle自动再取一组到cache，使用cache或许会跳号，比如数据库突然不正常down掉(shut down abort)，cache中的sequence就会丢失，所以可以在create sequence的时候用nocache防止这种情况。  
  
什么时候用sequence：  
不包含子查询、snapshot、view的select语句  
insert语句的子查询中  
insert语句的values中（大部分）  
update的set中  
  
### 三、索引  
索引是用于加速数据存取的数据对象。合理的使用索引可以大大降低i/o次数，从而提高数据访问性能。索引有很多中我们主要介绍常用的几种：  
单列索引  
单列索引是基于单个列所建立的索引  
复合索引  
复合索引是基于两列或是多列的索引。在同一张表上可以有多个索引，但是要求列的组合必须不同。  
使用原则  
在大表上建立索引才有意义  
在where子句或是连接条件上经常引用的列上建立索引  
索引上的层次不要超过4层  
索引有一些先天不足：  
1、建立索引，系统要占用大约表的0.2倍的硬盘和内存空间来保存索引  
2、更新数据的时候，系统必须要有额外的时间来同时对索引进行更新，以维持数据和索引的一致性。实践表明，不恰当的索引不但于事无补，反而会降低系统性能。因为大量的索引在进行插入、修改和删除操作时比没有索引花费更多的系统时间  
  
在逻辑类型字段（是否、男女），或者值就是固定几种的列上不要建立索引  
  
按照数据存储方式，可以分为B+树、反向索引、位图索引  
按照索引列的个数，可以分为单列索引，复合索引  
按照索引列值的唯一性，可以分为唯一索引和非唯一索引  
此外还有函数索引、全局索引、分区索引。。  
B+树索引建立在重复值很少的列上，而位图索引建立在重复值多、不同值相对固定的列上比较好。  
  
清空共享池 alter system flush buffer_cache  
  
### 四、管理权限和用户  
oralce用户：普通用户，系统用户。  
当刚刚建立用户时，用户没有任何权限，也不能执行任何操作，如果要执行某种特定的数据库操作，则必须为其授予系统的权限；如果用户要访问其他方案的对象，则必须为其授予对象的权限，为了简化权限的管理，可以使用角色。  
  
ORACLE权限（指执行特定类型sql命令或是访问其他方案对象的权利）  
  
系统权限是指执行特性类型sql命令的权利，它用于控制用户可以执行的一个或一组数据库操作，比如当用户具有create table权限时，可以在其方案中建表，当用户具有create any table权限时，可以在任何方案中建表。常用的有：create session连接数据库,create table建表,create view建视图,create synonym建同义词,create procedure建过程、函数、包,create trigger建触发器,create cluster建簇。可以查询数据字典视图system_privilege_map，可以显示所有系统权限  
  
对象权限指访问其他方案对象的权利，用户可以直接访问自己方案的对象，但是如果要访问其他的方案的对象，则必须具有对象的权限。常用的有alter修改,delete删除,select查询,insert添加,update修改,index索引,references引用,execute执行。查看oralce提供的所有对象权限(dba角色用户可以查看）select distinct privilege from dba_tab_privs;  
  
系统权限（166种）：对数据库管理的操作以及对数据对象本身的操作（创建，删除，修改？）  
对象权限（17种）：对数据对象的数据的操作（select,update,insert,delete)  
  
ORACLE角色（意义：简化对权限的管理，从而简化对用户的管理，本质是多个相关权限的集合）  
  
预定义角色(33种)是指oracle所提供的角色，每种角色都用于执行一些特定的管理任务，常用的预定义角色connect(create session）：具有一般应用开发人员需要的大部分权限，只要给用户授予connect和resource角色就够了, resource（create cluster create indextype create table create table create sequence create type create procedure create trigger):具有应用开发人员所需要的其他权限，隐含了unlimited tablespace系统权限, dba：具有几乎所有的系统权限，及with admin option选项，默认的dba用户为sys和system他们可以将任何系统权限授予其他用户。但是要注意dba角色不具备启动和关闭数据库的权限，这个是sysdba和sysoper的特权。  
  
自定义角色一般是dba来建立，如果用别的用户来建立，则需要具有create role的系统权限。在建立角色时可以指定验证方式（不验证，数据库验证等）  
grant 角色名 to 用户  
查看oracle中的所有预定义角色：select * from dba_roles；所有dba角色用户。  
查询某个用户具有怎样的角色：select * from dba_role_privs where grantee='xxx';  
  
授予系统权限  
一般情况下，授予系统权限是由dba完成的，如果用其他用户来授予系统权限，则要求该用户必须具有grant any privilege的系统权限。在授予系统权限时，可以带有with admin option选线，这样，被授予权限用户或是角色还可以将该系统权限授予其他的用户或者角色。  
回收系统权限  
一般情况下，回收系统权限是dba来完成的，如果其他用户来回收系统权限，要求用户必须具有相应系统权限及转授系统权限的选项（with admin option)。回收系统权限使用revoke来完成，当回收了系统权限后，用户就不能执行相应的操作了，但是请注意，系统权限级联收回问题，并不是级联回收。  
授予对象权限  
在oracle9i前，授予对象权限是由对象的所有者来完成的，如果其他用户来操作，则需要用户具有相应的（with grant option)权限，从oracle9i开始，sys, sytem用户可以将任何对象上的对象权限授予其他用户。grant 对象权限/all on 数据库对象 to 用户/角色 with grant option  
如果用户需要修改其他方案的表的结构，则必须授予alter对象权限。  
如果用户想要执行其他方案的包/过程/函数，则必须有execute权限。  
如果想在别的方案的表上建立索引，则必须具有index对象权限。  
回收对象权限  
收回对象的权限可以由对象的所有者来完成，也可以用dba用户(sys,system)来完成。收回对象权限后，用户不能执行相应的sql命令，但是要注意的是对象的权限是否被级联收回，是会被级联收回的，与系统权限不同。revoke 对象权限 on 数据库对象 from 用户名[角色名]  
  
方案scheme：是Oralce管理数据对象的方式，当一个用户创建任意一个数据对象后，dbms就会创建一个与之同名的方案，该用户创建的数据对象，会默认地放在该方案中。用户刚刚创建的时候是没有方案的。  
  
数据字典：是用来记录Oracle的系统信息的。  
oracle没有吧index所以当做数据对象来对待。  
角色既可以包含系统权限也可以包含对象权限。  
查看某个角色具有怎样的权限select * from dba_sys_privs where grantee='DBA'(注意大写)  
  
精细访问控制  
用户可以使用函数、策略实现更加细微的安全访问控制。如果使用精细访问控制，则当在客户端发出sql语句(select,insert,update,delete)时，oracle会自动在sql语句后追加谓词(where子句），并执行sql语句。通过这样的控制，可以使得不同的数据库用户在访问相同的表时，返回不同的数据信息。  
  
  
## 第五章：pl/sql编程  
1、pl/sql的介绍  
2、pl/sql的基础  
  
### 一、pl/sql的介绍  
pl/sql(procedural language/sql)是oracle在标准的sql语言上的扩展。pl/sql不仅允许嵌入sql语言，还可以定义变量和常量，允许使用条件语句和循环语句，允许使用例外处理各种错误，这样使得它的功能变得更加强大。  
优点：提高应用程序的运行性能，模块化的设计思想（分页的过程，订单的过程，转账的过程],减少网络传输量，提高安全性  
缺点：移植性不好。  
  
开发工具  
sqlplus开发工具  
sqlplus是oracle公司提供的一个工具  
pl/sql developer开发工具  
pl/sql developer是用于开发pl/sql块的集成开发环境（ide),他是一个独立的产品，而不是oracle的一个附带品。  
  
### 二、pl/sql基础知识  
开发人员使用pl/sql编写应用模块时，不仅需要掌握sql语句的编写方法，还要掌握pl/sql语句及语法规则。pl/sql编程可以使用变量和逻辑控制语句，从而可以编写非常有用的功能模块。  
pl/sql可以用来写：过程，函数，触发器，包。这些数据对象都是以块（基本编程单元）为单位的，所以要先写块。  
  
编写规范  
注释：单行注释--；多行注释/*...*/  
标识符号的命名规范  
1）当定义变量时，建议用v_作为前缀v_sal  
2）当定义常量时，建议用c_作为前缀c_rate  
3）当定义游标时，建议用_cursor作为后缀emp_cursor;  
4）当定义例外时，建议用e_作为前缀e_error  
  
块(block)是pl/sql的基本程序单元，编写pl/sql程序实际上就是编写pl/sql块。要完成相对简单的应用功能，可能只需要编写一个pl/sql块；但是如果想要实现复杂功能，可能需要一个pl/sql块中嵌套其他的pl/sql块。  
pl/sql块由三个部分构成：定义部分、执行部分、例外处理部分。  
declare 定义部分，定义常量、变量、游标、例外、复杂数据类型  
begin 执行部分，要执行的pl/sql语句和sql语句  
exception 例外处理部分，处理运行的各种错误  
end;  
  
set serveroutput on --打开输出选项  
dbms_output是oracle所提供的包（类似java的开发包），该包包含一些过程，put_line就是dbms_output包的一个过程。  
&表示要接收从控制台输入的变量  
||表示把两个串拼接  
  
oralce的预定义异常有23种，请参考pl/sql官方文档  
异常处理的作用：可以捕获异常，并给出明确的提示；有时可以利用异常，来进行业务处理  
   
过程  
过程用于执行特定的操作，当建立过程时，既可以指定输入参数(in)，也可以指定输出参数（out）。通过在过程中使用输入参数，可以将数据传递到执行部分；通过使用输出参数，可以将执行部分的数据传递到应用环境。在sqlplus中可以使用create procedure命令来建立过程  
可以定义多个输出变量。  
  
调用过程的两种方法：exec 过程名（参数值...）call 过程名 （参数值...) call一般用来调函数  
create procedure 过程名(变量 in 变量类型...,变量 out 变量类型) is  
定义变量  
begin  
执行语句；  
end;  
当我们编写过程时，可以用show error来显示具体的错误信息  
  
函数  
函数用户返回特定的数据，当建立函数时，在函数头部必须包含return子句，而在函数体内必须包含return语句返回的数据。我们可以使用create function来建立函数。  
调用函数的方法  
在sqlplus中调用函数：var 变量名 变量类型；call 函数名(参数值) into 变量名；print 变量名  
用sql语句调用 select annual_income('scott') from dual;  
  
包  
包用于在逻辑上组合过程和函数，它由包规范和包体两部分组成。  
包的规范只包含了过程和函数的说明，但是没有过程和函数的实现代码。包体用于实现包规范中的过程和函数。  
使用包可以更好的管理自己写的函数、过程。  
包是用来开发包体的接口的，如果包体的函数没有在包中声明，这外部不能直接调用包体的函数，只能调用包中声明的接口函数/过程。  
  
调用包的过程/函数  
当调用包的过程或是函数时，在过程和函数前需要带有包名，如果要访问其他方案的包，还需要在包名前面加方案名。exec 方案名.包名.过程名（参数）；call 方案名.包名.函数名(参数)；  
  
触发器简单介绍  
触发器是指隐含执行（某个操作引发执行）的存储过程。当定义触发器时，必须要指定触发的事件和触触发的操作，常用的触发事件包括insert, update, delete语句，而触发操作实际就是一个pl/sql块。可以使用create trigger来建立触发器。触发器可以维护数据库的安全和一致性。  
  
定义并使用变量  
在编写pl/sql程序时，可以定义变量和常量，在pl/sql程序中包括  
标量类型(scalar)  
复合类型(composite)  
参照类型(reference)  
lob(large object)  
  
标量（scalar)-常用类型  
在编写pl/sql块时，如果要使用变量，需在定义部分定义变量。  
pl/sql中定义变量和常量的语法如下：  
identifier [constant] datatype [not null] [:=| default expr]  
常量需要指定它的初始值，且其值是不能改变的。  
标量类型  
定义一个变长字符串 v_ename varchar2(10);  
定义一个小数 v_sal number(6,2);  
定义一个小数并给出一个初始值 v_sal2 number(6,2) := 5.4  
定义一个日期类型数据 v_hiredate date;  
定义一个布尔变量 v_valid boolean := false;  
使用%type属性定义变量，这样它会按照数据库列来确定你定义的变量的类型和长度，降低pl/sq程序l维护的工作量。标识符名 表名.列名%type;  
  
:=是pl/sql的赋值号  
  
复合变量(composite)-介绍  
用于存放多个值的变量。常用的包括：pl/sql记录，pl/sql表  
pl/sql记录类似于高级语言中的结构体，需要注意的是，当引用pl/sql记录成员时，必须要加记录变量作为前缀（记录变量.记录成员），例如：  
type 自定义的pl/sql记录名 is record(  
变量名 变量类型，  
变量名 变量类型  
);  
pl/sql表相当于高级语言中的数组，但是需要注意的是在高级语言中数组的下标不能为负数，而pl/sql是可以为负数的，并且元素的下标没有限制，比如  
type sp_table_type is table of emp.ename%type index by binary_integer;  
  
参照变量  
参照变量是指用于存放数值指针的变量。通过使用参照变量，可以使得应用程序共享相同对象，从而降低占用的空间。在编写pl/sql程序时，可以使用游标变量(ref cursor)和对象变量， (ref obj_type)两种参照变量类型。  
游标变量：通过游标，我们可以取得返回结果集（一般是select语句的结果）的任何一行数据，从而提高共享效率。  
定义游标：type 自定义游标名 is ref cursor; 变量名 自定义游标名；  
打开游标：open 游标变量 for select语句；  
取出当前游标指向的行：fetch 游标变量 into 其他变量；  
判断游标是否指向记录最后：游标变量%notfound  
用完游标之后一定要关闭游标，否则会占用一个连接，浪费资源。  
  
## 第六章  
1、pl/sql的进阶   
2、oralce的视图  
  
### 一、pl/sql的进阶  
控制结构  
在任何计算机语言(c,java,c#,c++)都有各种控制语句（条件语句，循环结构，顺序控制结构..)在pl/sql中也存在这样的控制语句。  
  
条件分支语句  
pl/sql中提供了三种条件分支语句 if--then, if--then--else, if--then--elsif---else  
pl/sql中字符串的比较是 = 比如‘abc’='ttt'  
  
循环语句 -loop  
是pl/sql中最简单的循环语句，这种循环语句以loop开头，以end loop结尾。  
loop   
执行语句...;   
exit when 表达式；   
end loop；  
循环语句--while循环  
while循环以while..loop开始，以end loop结束  
循环语句--for循环  
for循环的基本结构如下：  
for i in reverse 1..10 loop  
insert into users values(i,'sdf');  
end loop;  
end;  
  
is和begin之间不能进行赋值，只能进行初始化（因为is..begin只是用来定义)。  
不能对入参进行赋值。  
  
顺序控制语句--goto, null  
goto语句用于跳转到特定标号去执行语句。注意由于使用goto语句会增加程序的复杂性，并使得应用程序的可读性变差，所以建议大家不要使用goto语句。goto 标号；<<标号>>  
null语句不会执行任何操作，并且会直接将控制传递到下一条语句。使用null语句的主要好处是可以提高pl/sql的可读性。  
  
编写分页过程  
分页是任何一个网站(bbs、网上商城、blog)都会使用到的技术，因此学习pl/sql编程开发就一定要掌握该技术。  
  
### 二、oracle视图  
视图是一个虚拟表，其内容由查询定义。同真是的表一样，视图包含一系列带有名称的列和行数据。但是，视图并不在数据库中以存储的数据值集形式存在。行和列数据来自由定义视图的查询所引用的表，并且在引用视图时动态生成。  
视图是oracle有一种数据对象，视图的主要用处是简化操作，提高安全性，满足不同用户的查询需求，视图不是一个真正存在的物理表（不是存在磁盘/文件中的，是根据别的表动态生成的）。  
当表结构过于复杂的时候，强烈建议使用视图。  
  
创建视图  
create view 视图名 as select语句 [with read only]  
创建或修改视图  
create or replace view 视图名 as select语句 [with read only]  
删除视图  
drop view 视图名  
可以像使用表一样使用视图。  
  
视图必须使用as关键字，不能使用is。  
  
视图与表的区别  
表需要占用磁盘空间，视图不需要  
视图不能添加索引  
使用视图可以简化复杂查询  
视图利于提高安全性（可以让不同的用户查看不同的视图）  
  
  
## 第七章  
### 一、触发器  
很多关系数据库中都提供一种技术，可以在用户进行某种操作的时候，自动的进行另外一个操作，我们把这种技术称为触发器技术。  
触发器是指存放在数据库中，被隐含执行的存储过程，可以支持dml触发器，还支持基于系统事件（启动数据库，关闭数据库，登陆，退出）和ddl操作建立触发器。  
  
触发器分类：dml触发器、系统时间触发器、ddl触发器  
触发器由触发事件，触发条件，触发操作三个部分组成  
  
创建触发器：  
create [or replace] trigger trigger_name  
{befor | after}  
{insert | delete | update [of column [, coloumn ...]]}  
on [schema.]table_name  
[for each row]  
[when condition]  
begin  
trigger_body;  
end;  
  
触发器分类2：  
行级触发器：对每一行的事件都做出响应  
语句级触发器（表级）：对每条语句做出响应，不是对每一行。  
  
raise_application_error(error_number_in in number, error_msg_in in varchar2)过程是oracle提供的，可以传入两个参数，第一个是自定义的错误号-2000- -20999之间，第二个参数是错误信息。  
  
dml触发器  
使用条件谓词  
当触发器中同时包含多个触发事件(insert, update, delete)时，为了在触发器代码中区分具体的触发事件，可以使用三个条件inserting, updating, deleting  
还有一种条件控制语句：case when...then ..; when...then...;end case;  
  
使用:odl和:new  
当触发器被触发时，要使用被插入、更新或删除的记录中的列值，；有时要使用操作前、后列的值。:new 修饰符访问操作完成后列的值，:old访问操作完成前列的值  
  
系统触发器  
系统事件是指基于oracle事件（例如Logon和startup)所建立的触发器。通过使用系统事件触发器。提供了跟踪系统或是数据变化的机制。  
常用的系统事件属性函数：  
ora_client_ip_adress //返回客户端的ip  
ora_database_name //返回数据库名  
ora_login_user //返回登陆用户名  
ora_sysevent //返回触发触发器的系统事件名  
ora_des_encrypted_password //返回用户des(mod5)加密后的密码  
create or replace trigger 触发器名  
after/befor logon/logoff on database  
begin end;  
  
在建立登陆和退出触发器需要特权用户来建立。  
  
ddl触发器  
ddl(data definition language),说白了就是我们常用的create、alter和drop这些数据定义语句。  
建立ddl触发器也需要dba权限  
create or replace trigger 触发器名  
after ddl on 方案名.schema  
begin end;  
  
ddl语句会自动commit，而dml语句则需要手动提交。  
退出控制台（登陆？）的时候，oracle会自动提交未提交的事务。  
  
管理触发器  
管理触发器也需要dba权限  
禁止触发器：让触发器临时失效。alter trigger 触发器名 disable;  
激活触发器：alter trigger 触发器名 enable;  
禁止或是激活表的所有触发器：alter table emp en/disable all triggers(9i);  
删除触发器：drop trigger 触发器名  
  
例外处理  
在pl/sql的执行过程中发生异常时系统所做的处理称为一个例外情况(exception)。通常例外情况的种类有三种：  
预定义的oracle例外情况，oracle预定义的例外情况大约有24个，对于这种例外情况无须在程序中定义，由oracle自动触发。  
非预定义oracle例外情况由使用者增加定义例外情况，然后oralce自动将其触发执行。  
自定义例外，这个用的比较少。  
  
  
常见的预定义例外  
例外情况      错误代码      描述  
no_data_found ora_01403 对于sleect语句没有返回任何值  
too_many_rows ora_01427 只允许传回一条记录的select叙述结果多余一条  
invalid_cursor ora_01001 使用非法的光标操作  
value_error ora_06502 出现数值，数据形态转换，截取字符串或强制性错误  
invalid_number ora-01722 字符串到数值的转换失败  
zero_divide ora-01476 被零除  
dup_val_on_index ora_0001 试图向具有唯一键值索引中插入一个重复键值。  
case_not_found ora-06592 没有case条件匹配  
cursor_not_opne ora-06511 游标没有打开  
其他参考pl/sql官方文档。  
  
  
## 第八章：dba和表的备份与恢复  
1、数据库管理员  
2、数据库（方案、表）的逻辑备份与恢复  
  
### 一、数据库管理员（dba)  
每个oracle数据库应该至少有一名dba,对于一个小的数据库，一个dba就够了，但是对于一个大的数据库可能需要多个dba分别担负不同的管理职责。  
1、安装和升级oracle数据库  
2、建库，表空间，表，视图，索引。。  
3、制定并实施备份和恢复计划  
4、数据库权限管理，调优，故障排除  
5、对于高级dba，要求能参与项目开发，会编写sql语句、存储过程、触发器、规则、约束、包  
  
管理数据库的用户主要是sys和system  
他们的主要区别是：  
1、最重要的区别，存储的数据的重要性不同  
sys:所有oracle的数据字典的基表和视图都存放在sys用户中，这些基表和视图对于oracle的运行是至关重要的，由数据库自己维护，任何用户都不能手动更改。sys用户拥有dba(角色），sysdba(系统权限), sysoper(系统权限）角色或权限，是oracle权限最高的用户。  
system:用于存放次一级的内部数据，如oracle的一些特性或工具的管理信息。system用户拥有dba,sysdba角色或系统全新啊。  
2、其次的区别，权限不同  
sys用户必须以as sysdba 或 as sysoper形式登陆。不能以normal方式登陆数据库  
system如果正常登陆，它其实就是一个普通的dba用户，但是如果以as sysdba登陆，其结果实际上它是作为sys用户登陆的，这一点类似linux里面的su的感觉，从登陆信息里面我们可以看出来。  
  
sysdba和sysoper是特权用户的登陆方式，具备普通dba用户不具备的启动、关闭数据库实例等权限  
管理初始化参数  
初始化参数用于设置实例或数据库的额特征。oracle 10g提供了200多个初始化参数，并且每个初始化参数都有默认值。  
显示初始化参数 show parameter  
  
### 二、数据库的逻辑备份与恢复  
逻辑备份是指使用工具export将数据对象的结构和数据导出到文件的过程，逻辑恢复是指当数据库对象被误操作而损坏之后使用工具Import利用备份的文件将数据对象导入到数据库的过程。物理备份即可在数据库open的状态下进行也可在关闭数据库后进行，但是逻辑备份和恢复只能在open状态下进行。  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
