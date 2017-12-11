# response-time
## 一、功能
Node.js服务器的响应时间。

此模块创建一个中间件，记录HTTP服务器中请求的响应时间。这里定义的“响应时间”是从请求进入中间件到将headers写入客户机的时间。
## 二、安装  
response-time是一个node.js的模块，使用npm install命令安装
```sh
$ npm install response-time
```
安装完毕之后使用 npm install安装response-time模块的依赖项  
```sh
$ npm install 
```
## 三、模块引入
由于是非全局模块，需要使用require引入response-time模块
```js
var responseTime = require('response-time')
```
### responseTime([options])
创建一个中间件增加X-response-time头响应。如果不想使用这个模块自动设置header，请看 responseTime(fn)。
### 参数 options
响应时间函数接受如下几个可选的参数：  
#### digits

固定数量的数字包括在输出中，始终是以毫秒为单位，默认为3（例如：2.300ms）。
#### header

用于设置header的名字,默认是 X-Response-Time.

#### suffix

布尔表示如果测量后缀单位应该被添加到输出，默认为true（例如：2.300ms vs 2.300）。

### responseTime(fn)

创建一个新的中间件，它记录请求的响应时间，并使其可用于自己的函数。fn参数将被援引为fn(req, res, time)，时间是在毫秒数。

## 代码
```js
/*!
 * response-time
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies
 * @private
 */

var deprecate = require('depd')('response-time')//弃用：这将在STDERR上显示一个弃用的消息“oldfunction”从“response—time”弃用。
var onHeaders = require('on-headers')//onHeaders(res, listener).listener为监听的对象。

/**
 * Module exports.
 * @public
 */

module.exports = responseTime

/**函数头注释
 * Create a middleware to add a `X-Response-Time` header displaying 创建一个中间件添加` x-response-time `标题显示
 * the response duration in milliseconds.响应持续时间为毫秒
 *
 * @param {object|function} [options] 对象或函数类型的参数
 * @param {number} [options.digits=3] 整数
 * @param {string} [options.header=X-Response-Time] 头信息
 * @param {boolean} [options.suffix=true] 后缀
 * @return {function}
 * @public
 */

function responseTime (options) {
  var opts = options || {} //实现默认参数，如没有则为空对象

  if (typeof options === 'number') {//如参数类型是number
    // back-compat single number argument 向后兼容单数参数
    deprecate('number argument: use {digits: ' + JSON.stringify(options) + '} instead')
    opts = { digits: options }
  }

  // get the function to invoke 获取要调用的函数
  var fn = typeof opts !== 'function'
    ? createSetHeader(opts)//如果不是参数不是函数类型，调用createSetHeader()函数
    : opts

  return function responseTime (req, res, next) {
    var startAt = process.hrtime()//一个基准时间，[ 1, 6962306 ]  
    //process.hrtime()
    //返回一个[秒,纳秒]形式的数组,代表了当前实时最高分标率.
    //返回结果和过去的时间有关,和天数没有关系,因此没有对象记录偏移量.
    //最初用于测量interval之间的效果.
    //可以传入上次process.hrtime()返回的结果到process.hertime()中,得到一个不一样的结果.用来测量基准点和interval很有用.

    onHeaders(res, function onHeaders () {
      var diff = process.hrtime(startAt) //将上次的结果传入process.hrtime()中
      var time = diff[0] * 1e3 + diff[1] * 1e-6//diff[0]单位是秒*10的三次方，diff[1]单位是纳秒*10的负六次方 把单位都换成毫秒

      fn(req, res, time)
    })

    next()
  }
}

/**
 * Create function to set respoonse time header.
 * @private
 */

function createSetHeader (options) {
  // response time digits
  var digits = options.digits !== undefined
    ? options.digits //要求整数类型
    : 3

  // header name
  var header = options.header || 'X-Response-Time' //设置头信息

  // display suffix
  var suffix = options.suffix !== undefined 
    ? Boolean(options.suffix)
    : true

  return function setResponseHeader (req, res, time) {
    if (res.getHeader(header)) {
      return
    }

    var val = time.toFixed(digits)
    //参数是保留小数的个数，该方法不会改变原数值。
    //小数点后数字的个数；介于 0 到 20 （包括）之间，实现环境可能支持更大范围。如果忽略该参数，则默认为 0
    if (suffix) {
      val += 'ms'
    }

    res.setHeader(header, val)
  }
}

```
