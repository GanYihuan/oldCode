// https://nodejs.org/api/querystring.html#querystring_querystring_stringify_obj_sep_eq
// 拼接参数
// The querystring module provides utilities for parsing and formatting URL query strings. It can be accessed using:
import queryString from 'query-string';
// 拿到的数据转成本地的package.json里(伪造数据)
import Mock from 'mockjs';
// Lodash 提供辅助函数
// http://lodashjs.com/docs/
import _ from 'lodash';
import config from './config';


// 对外暴露空对象
let request = {};


request.get = function (url, params) {
  if (params) {
    // http://yijiebuyi.com/blog/d37512fc6df0fc4d0adfc2ec5c3d46ff.html

    // querystring.stringify(obj[, sep[, eq[, options]]])   (object -> string)
    // For example:
    // queryString.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
    // returns 'foo=bar&baz=qux&baz=quux&corge='

    // querystring.parse(str[, sep[, eq[, options]]])   (string -> object)
    // For example, the query string 'foo=bar&abc=xyz&abc=123' is parsed into:
    // {
    //   foo: 'bar',
    //   abc: ['xyz', '123']
    // }
    url += '?' + queryString.stringify(params);
  }

  // copy react-native official
  return fetch(url)
      .then((response) => response.json())
      .then((response) => Mock.mock(response));
};


request.post = function (url, body) {
  // post Need head information (Body form)
  // (extend) Replace config.header
  // prototype : Property gives you the ability to add properties and methods to an object
  let options = _.extend(config.header, {
    // parse : Parsing a JSON object from a string (string -> object)
    // stringify : object is formatted as an argument string (object -> string)
    body: JSON.stringify(body)
  });

  return fetch(url, options)
      .then((response) => response.json())
      .then((response) => Mock.mock(response));
};


module.exports = request;