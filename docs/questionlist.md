## 问题清单

- 成果仓库是否创建，仓库名称是什么？  
是， response-time。
- README.md 文档是否翻译？  
是。
- 是否撰写 MarkDown 文档来记录自己代码阅读的收获？
是。  
- 通过代码阅读，自己学到了什么？    
学习了如何使用响应时间；  
提高了阅读代码的技能；  
对GitHub的使用和理解也更加深刻；  
git bash命令行使用熟练。
- 项目的功能是什么？  
记录HTTP服务器中请求的响应时间。这里定义的“响应时间”是从请求进入中间件到将headers写入客户机的时间。
- 请展示项目功能或者运行项目（不同项目类型，运行方式不同）。  
- 程序中的注释是否翻译？  
已翻译。
- 是否在程序中补充注释？补充注释的理由是什么？不补充注释的理由是什么？  
是，  
一方面，补充注释的理由在于可以帮助自己更详细全面的了解代码内容  
另一方面，注释的使用便于下次阅读  
- 项目类型是什么？（命令行程序、web 网站、第三方库、其他，如果是其他项目类型，请给出项目类型的具体名称） 
第三方库。
- 项目的入口文件是哪个？  
index.js。
- 项目的依赖项有哪些，各个依赖项都是做什么，有什么功能？  
断言 用来测试最终结果与预期结果是否相等  
fs 用来读取文件，读取目录等对文件的操作
- 项目有哪些代码模块？各个代码模块之间有什么关联性？  
 after模块  
 dept 模块 //弃用：这将在STDERR上显示一个弃用的消息“oldfunction”从“response—time”弃用。
 onheaders 模块 //onHeaders(res, listener).listener为监听的对象。
 undefined 模块 //用于判断suffix参数是否为undefined
- 项目中的数据结构有哪些种类？功能作用是什么？  
 没有使用什么数据结构  
 使用其他方模块比较多  
- 项目中的设计模式有哪些种类？功能作用是什么？   
工厂方法模式，减少代码的编写，更方便使用，例如fn函数相当于一个
包装步骤列表的工厂 ,读取多个文件的时候，可以将公用的函数包装成工
厂，不用每次都传参（函数书写麻烦） 
- 项目中使用了哪些高级的 JavaScript 语法？  
1.time.toFixed(digits) //参数是保留小数的个数，该方法不会改变原数值。
                       //小数点后数字的个数；介于 0 到 20 （包括）之间，实现环境可能支持更大范围。如果忽略该参数，则默认为 0
2.	process.hrtime() //一个基准时间，[ 1, 6962306 ]  

- 代码中哪一个或几个函数的代码比较难于理解？你搞明白了吗？你认为难点是什么？  
 	process.hrtime()较难理解 设置基准时间可以理解，传入参数时比较难理解。
- 项目中用到自动化测试吗？用到自动化测试框架了吗？用的是哪个自动化测试框架？  
断言模块
- 项目中所有的模块都有单元测试吗？哪些有？哪些没有？这样安排的理由是什么？  
 不全面
- 仓库根目录都有哪些文件？每个文件的作用都是什么？  
Test文件，包含测试代码
dots文件，包含代码的解读、分析以及注释。
Readme文件说明该项目的使用
pakage.json配置文件，包括name,version,url等属性
LICENSE 文件是开源协议
- 代码中是否有 bug？  
代码中的注释比较少    
方法的高效与否无从判断  
- 代码中是否有可以改进的地方？    
添加代码注释。 
- 项目是如何划分模块、划分函数的，划分的好吗？如果是你，你会怎么做
挺好的 一共两个函数 写完一个再写一个
- 代码的可读性如何？结构清晰吗？编码风格如何？   
结构很清晰，只有两个函数   
- 你是否调试运行过项目？通过调试运行，你搞明白了哪些问题？如果没有调试运行，说出不调试运行项目的理由。   
 没有很全面的调试，index文件较易理解，test文件看不懂 伤心
  