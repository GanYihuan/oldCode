'use strict'

// 签名

var xss = require('xss')
var mongoose = require('mongoose')
var User = mongoose.model('User')
var uuid = require('uuid')
var sms = require('../service/sms')

exports.signup = function *(next) {
  //var phoneNumber = this.query.phoneNumber
  var phoneNumber = xss(this.request.body.phoneNumber.trim())

  var user = yield User.findOne({
    phoneNumber: phoneNumber
  }).exec()

  var verifyCode = sms.getCode()

  if (!user) {
    var accessToken = uuid.v4()

    user = new User({
      nickname: '小狗宝',
      avatar: 'http://res.cloudinary.com/digvexgsl/image/upload/v1499964450/avatar/win.jpg',
      phoneNumber: xss(phoneNumber),
      verifyCode: verifyCode,
      accessToken: accessToken
    })
  } else {
    user.verifyCode = verifyCode
  }

  try {
    user = yield user.save()
  } catch (e) {
    this.body = {
      success: false
    }

    return next
  }

  var msg = '您的注册验证码是：' + user.verifyCode

  try {
    sms.send(user.phoneNumber, msg)
  } catch (e) {
    console.log(e)

    this.body = {
      success: false,
      err: '短信服务异常'
    }

    return next
  }

  this.body = {
    success: true
  }
}

exports.verify = function *(next) {
  var verifyCode = this.request.body.verifyCode
  var phoneNumber = this.request.body.phoneNumber

  if (!verifyCode || !phoneNumber) {
    this.body = {
      success: false,
      err: '验证没通过'
    }

    return next
  }

  var user = yield User.findOne({
    phoneNumber: phoneNumber,
    verifyCode: verifyCode
  }).exec()

  if (user) {
    user.verified = true
    user = yield user.save()

    this.body = {
      success: true,
      data: {
        nickname: user.nickname,
        accessToken: user.accessToken,
        avatar: user.avatar,
        _id: user._id
      }
    }
  } else {
    this.body = {
      success: false,
      err: '验证未通过'
    }
  }
}

exports.update = function *(next) {
  var body = this.request.body
  var user = this.session.user;
  // 9-7 15:00
  //var accessToken = body.accessToken
  //var user = yield User.findOne({
  //  accessToken: accessToken
  //}).exec()
  //
  //if(!user) {
  //  this.body = {
  //    success: true,
  //    err: 'user gone'
  //  }
  //
  //  return next
  //}
  var fields = 'avatar,gender,age,nickname,breed'.split(',')

  fields.forEach(function(field) {
    if (body[field]) {
      user[field] = xss(body[field].trim())
    }
  })

  user = yield user.save()

  this.body = {
    success: true,
    data: {
      nickname: user.nickname,
      accessToken: user.accessToken,
      avatar: user.avatar,
      age: user.age,
      breed: user.breed,
      gender: user.gender,
      _id: user._id
    }
  }
}