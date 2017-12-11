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
