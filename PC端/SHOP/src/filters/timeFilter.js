export default (e)=>{
  // e = 1615186648000
  var date = new Date(e);
  var year = date.getFullYear();
  /**
   * padStart
   * 参数一:字符串最小长度
   * 参数二:要补齐的字符
   */
  var month = (date.getMonth()+1+'').padStart(2,'0');
  var day = (date.getDate()+'').padStart(2,'0');
  var hour = (date.getHours()+'').padStart(2,'0')
  var minutes = (date.getMinutes()+'').padStart(2,'0');
  var seconds = (date.getSeconds()+'').padStart(2,'0');

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
}
