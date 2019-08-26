'use strict';

module.exports = {
  header: {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  },
  qiniu: {
    // !important check chrome debug remote js
    upload: 'http://up-z2.qiniu.com'
  },
  cloudinary: {
    api_key: '675977649267356',
    base: 'http://res.cloudinary.com/ganyihuan',
    image: 'https://api.cloudinary.com/v1_1/ganyihuan/image/upload',
    video: 'https://api.cloudinary.com/v1_1/ganyihuan/video/upload',
    audio: 'https://api.cloudinary.com/v1_1/ganyihuan/raw/upload'
  },
  api: {
    //base: 'http://rap.taobao.org/mockjs/14179/',
    base: 'http://localhost:1234/',
    creations: 'api/creation',
    comment: 'api/comments',
    up: 'api/up',
    video: 'api/creation/video',
    signup: 'api/u/signup',
    verify: 'api/u/verify',
    update: 'api/u/update',
    signature: 'api/signature'
  }
};