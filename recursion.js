/** product: calculate the product of an array of numbers. */

function product(nums, index = 0) {
  if (index === nums.length) return 1;
  return nums[index] * product(nums,index + 1);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, maxLen = 0, index = 0) {
  if (index === words.length) return maxLen;
  const currentLen = words[index].length;
  return longest(words, Math.max(maxLen, currentLen), index + 1);
}

/** everyOther: return a string with every other letter. */

function everyOther(str, index = 0) {
  if (index >= str.length) return '';
  return str[index] + everyOtherRecursive(str,index + 2);
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  if (str.length <=1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome(str.slice(1, -1));
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, str, index = 0) {
  if (index >= arr.length) return -1;
  if (arr[index] === string) return index;
  return findIndex(arr, str, index + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  if (str==='') return '';
  return revString(str.substr(1)) + str[0];
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let stringsArray = [];
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      stringsArray.push(obj[key]);
    } else if (typeof obj[key] === 'object') {
      stringsArray = stringsArray.concat(gatherStrings(obj[key]));
    }
}
  return stringsArray;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {

}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
