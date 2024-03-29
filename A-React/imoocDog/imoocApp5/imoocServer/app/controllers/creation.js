'use strict'

//var _ = require('lodash')
var mongoose = require('mongoose')
//var Promise = require('bluebird')
var Video = mongoose.model('Video')
//var Audio = mongoose.model('Audio')
//var Creation = mongoose.model('Creation')
//var xss = require('xss')
var robot = require('../service/robot')
var config = require('../../config/config')

exports.video = function *(next) {
  var body = this.request.body
  var videoData = body.video
  var user = this.session.user

  if (!videoData || !videoData.key) {
    this.body = {
      success: false,
      err: '视频没有上传成功！'
    }

    return next
  }

  var video = yield Video.findOne({
    qiniu_key: videoData.key
  }).exec()

  if (!video) {
    video = new Video({
      author: user._id,
      qiniu_key: videoData.key,
      persistentId: videoData.persistentId
    })

    video = yield video.save()
  }

  var url = config.qiniu.video + video.qiniu_key

  robot
      .uploadToCloudinary(url)
      .then(function(data) {
        if (data && data.public_id) {
          video.public_id = data.public_id
          video.detail = data

          video.save().then(function(_video) {
            asyncMedia(_video._id)
          })
        }
      })

  this.body = {
    success: true,
    data: video._id
  }
}