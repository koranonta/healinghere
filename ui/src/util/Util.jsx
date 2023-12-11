import _ from "lodash"
import moment from 'moment'
import lzString from "lz-string";

const compare = (a, b) => {
  if (!isNaN(a) && !isNaN(b)) return parseInt (+a - +b)  
  else if(a < b) return -1
  else if(a > b) return 1
  else return 0
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => compare(a, b, orderBy)
    : (a, b) => -compare(a, b, orderBy);
}

const tableSort = (array, comparator) => {
  if (_.isEmpty(array)) return []
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const sortData = (dataToSort, sortBy, orderBy) => {
  const filtered = dataToSort.sort((a, b) => {
    if(orderBy === 'asc') return compare(a[sortBy], b[sortBy])
    else return compare(b[sortBy], a[sortBy])
  });
  return filtered;
}

const formatNumberWithComma = (num) => 
  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")

//const formatNumber = (val) => Number(parseFloat(val).toFixed(2)).toLocaleString('en') 
//const formatNumber = (val) => val.toLocaleString('en-US', {maximumFractionDigits:2})

const formatNumber = (val) => {
  let value = parseFloat(val)
  if (isNaN(value) || value === 0.0) return ""
  let a = (Math.round(value * 100) / 100).toFixed(2)
  return formatNumberWithComma(a)
}

const formatNumberDecimal = (val) => val.toLocaleString('en-US', {maximumFractionDigits:2})

const capitalize = (_str) => 
  _.isEmpty(_str) ? _str : _str.charAt(0).toUpperCase() + _str.slice(1)

const sleep = async (milliseconds)  => {
  await new Promise(resolve => { return setTimeout(resolve, milliseconds) });  
}

const zeroPad = (num, places) => String(num).padStart(places, '0')
const blankPad = (num, places) => String(num).padStart(places, ' ')
const truncateTime = (_date) => _date.substring(0, 10)
const truncateSecond = (_date) => _date.substring(0, 16)

const toPascalCase = (_str) => 
  (_str === undefined || _str === null) 
    ? "" 
    : _str.charAt(0).toUpperCase() + _str.substr(1, _str.length)

const dupString = (str, num) => {
  let temp = ''
  for (let i=0; i<num; i++) temp += str
  return temp
}

const getJsonFieldValue = (_jsonObj, _fieldName) => {
  Object.entries(_jsonObj).forEach( 
    ([key, value]) => {
      if (key === _fieldName)
        return value       
  })
  return null
}

const hasImage = (image) => {
  if (_.isEmpty(image) || image === null || image === "null") return false
  return true  
}

const toDMY = (date) => moment(date,"YYYY-MM-DD").format("DD-MM-YYYY")

const truncateText = (str, length) => 
  str.length <= length ? str : str.substr(0, length) + " . . ."

/**
 * Compress data
 * @param {object} data - Data to compress
 * @returns {string} compressed data as a string
 */
 const compressLZW = (data) => {
  //if (typeof data === "object") {
  //  return lzString.compressToEncodedURIComponent(JSON.stringify(data));
  //}

  return lzString.compressToEncodedURIComponent(data);
};

/**
 * Decompress strin
 * @param {string} compressed - Compressed string to decompress
 * @returns {string} decompressed string
 */
const decompressLZW = (compressed) =>
  lzString.decompressFromEncodedURIComponent(compressed);

/**
 * Decompress data
 * @param {string} compressed - Compressed data to decompress
 * @returns {object} decompressed data as an object
 */
const parseDecompressLZW = (compressed) =>
  JSON.parse(decompressLZW(compressed));


const Util = {
  sortData,
  formatNumber,
  capitalize,
  sleep,
  zeroPad,
  truncateTime,
  truncateSecond,
  toPascalCase,
  blankPad,
  dupString,
  tableSort,
  getComparator,
  formatNumberDecimal,
  getJsonFieldValue,
  hasImage,
  toDMY,
  truncateText,
  compressLZW,
  decompressLZW,
  parseDecompressLZW,
}

export default Util