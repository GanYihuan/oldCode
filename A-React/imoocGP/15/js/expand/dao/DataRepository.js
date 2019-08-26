import React from 'react';
import {
  AsyncStorage
} from 'react-native';


export default class DataRepository {
  fetchRepository(url) {
    return new Promise((resolve, reject) => {
      this.fetchlocalRepository(url)
          .then(result => {
            if (result) {
              resolve(result);
            } else {
              this.fetchNetRepository(url)
                  .then(result => {
                    resolve(result);
                  })
                  .catch(e => {
                    resolve(e);
                  })
            }
          })
          .catch(e => {
            this.fetchNetRepository(url)
                .then(result => {
                  resolve(result);
                })
                .catch(e => {
                  resolve(e);
                })
          })
    })
  }

  /**
   * get local data
   * @param url
   * @returns {promise}
   */
  fetchlocalRepository(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            resolve(result);
          }
        }
      })
    })
  }

  fetchNetRepository(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
          .then(response => response.json())
          .then(result => {
            if (!result) {
              reject(new error('responsedata it is null'));
              return;
            }
            resolve(result.items);
            this.saveRepository(url, result.items);
          })
          .catch(err => {
            reject(err)
          })
    })
  }

  saveRepository(url, item, callback) {
    if (!url || !item) return;
    let wrapdata = {
      items: items,
      update_date: new Date().getTime()
    };
    AsyncStorage.setItem(url, JSON.stringify(wrapdata), callback);
  }

  /**
   * Judge whether the data out of date
   * @param longtime
   * @returns {boolean}
   */
  checkdate(longtime) {
    return false;
    let cdate = new Date();
    let tdate = new Date();
    tdate.setTime(longtime);
    if (cdate.getMonth() !== tdate.getMonth()) return false;
    if (cdate.getDay() !== tdate.getDay()) return false;
    if (cdate.getHours() - tdate.getHours() > 4) return false;
    return true;
  }
}

