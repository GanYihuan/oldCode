

export default class ArrayUtils {
  /**
   * if has item, delete it; if not, add to array
   * @param array
   * @param item
   */
  static updateArray(array, item) {
    for (let i = 0, len = array.length; i < len; i++) {
      let temp = array[i];
      if (temp === item) {
        array.splice(i, 1);
        return;
      }
    }
    array.push(item);
  }

  /**
   * clone a Array
   * @param from
   * @returns {Array}
   */
  static clone(from) {
    if (!from) {
      return [];
    }
    let newArray = [];
    for (let i = 0, len = from.length; i < len; i++) {
      newArray[i] = from[i];
    }
    return newArray;
  }

  /**
   * Determine whether two arrays Whether the one-to-one correspondence
   * @param arr1
   * @param arr2
   * @returns {boolean} true -> tow arrays equal
   */
  static isEqual(arr1, arr2) {
    if (!(arr1 && arr2)) {
      return false;
    }
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0, l = arr2.length; i < l; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
      return true;
    }
  }

  /**
   * remove array item
   * @param arr
   * @param item
   */
  static remove(arr, item) {
    if(!arr) return;
    for(let i = 0, l = arr.length; i < l; i ++) {
      if(item === arr[i]) arr.splice(i, 1);
    }
  }
}