/**
 * 
 * @authors 王叁
 * @date    2017-08-22 10:57:43
 * @version $001$
 */
let mouseBtnEv = {
  /**
   * [setNewVal 改变对象或数组中一个元素的值]
   * @AuthorHTL 王叁
   * @DateTime  2017-08-22T14:15:21+0800
   * @param     {[obj]}                 data   [对象或数组]
   * @param     {[string/number]}       key    [键/索引]
   * @param     {[all]}                 newVal [新值]
   */
	setNewVal: function(data,key,newVal){
		if (typeof key === "string"){//改变对象中元素的值
			data[key] = newVal;
		} else if (typeof key === "number"){//改变数组中元素的值
			data.splice(key, 1, newVal);//this.$set(data, key, newVal);也可实现
		} else {
			console.log("类型错误");
		};
	},
  /**
   * [changeTime 毫秒数转为时分秒(XX:XX:XX)]
   * @AuthorHTL 王叁
   * @DateTime  2017-08-23T11:42:06+0800
   * @param     {Number}                 time [毫秒数]
   * @return    {String}                      [时:分:秒]
   */
  changeTime:function(time){//
    var newtime = new Date(time),
        hours = newtime.getUTCHours(),
        minSecs = newtime.toLocaleTimeString().substr(-5);
    if (hours==0){
         return minSecs;
    } else if (hours<10) {
         return `0${hours}:${minSecs}`;
    } else {
         return `${hours}:${minSecs}`;
    };
  },
  /**
   * [setCommentTime 计算历史时间与当期时间的时间间隔]
   * @AuthorHTL 王叁
   * @DateTime  2017-08-23T11:44:57+0800
   * @param     {Number}                 time [时间戳]
   * @return    {String}                      [刚刚/X分钟前/X小时前/昨天/X月x日x时x分/x年x月x日x时x分]
   */
  setCommentTime:function(time){
    var presentTime = new Date(),//当前时间
        cmtTime =new Date(time),//评论时间
        diff = presentTime-cmtTime;//当前时间与评论时间差
    //今天
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    //昨天
    var yestoday = new Date(today.getTime()-24*60*60*1000);
    //今年
    var thisYear = new Date(today.getTime());
    thisYear.setMonth(0);
    thisYear.setDate(1);
    
    var timePara = {
      year:cmtTime.getFullYear(),
      month:cmtTime.getMonth()+1,
      date:cmtTime.getDate(),
      hour:cmtTime.getHours()>9?cmtTime.getHours():`0${cmtTime.getHours()}`,
      minute:cmtTime.getMinutes()>9?cmtTime.getMinutes():`0${cmtTime.getMinutes()}`
    };

    if (diff<60*1000){
      return `刚刚`
    } else if(diff<60*60*1000){
      return `${parseInt(diff/(60*1000))}分钟前`
    } else if(diff<60*60*2*1000) {
      return `1小时前`
    } else {
      if(cmtTime>today||cmtTime==today){
        return `${timePara.hour}:${timePara.minute}`
      } else if(cmtTime>yestoday){
        return `昨天${timePara.hour}:${timePara.minute}`
      } else if(cmtTime>thisYear){
        return `${timePara.month}月${timePara.date}日 ${timePara.hour}:${timePara.minute}`
      } else {
        return `${timePara.year}年${timePara.month}月${timePara.date}日 ${timePara.hour}:${timePara.minute}`
      }
    };
  }
}
/**
 * [string2Obj 将字符串转为对象]
 * @AuthorHTL 王叁
 * @DateTime  2017-08-23T11:36:05+0800
 * @param     {String}                 str      [要转换的字符串]
 * @param     {String}                 startSyb [提取字符串的起始字符,默认值为{]
 * @param     {String}                 endSyb   [提取字符串的结尾字符，默认值为}]
 * @return    {Object}                          [null或{}]
 */
let string2Obj = function(str,startSyb = '{',endSyb = '}'){
  let start = str.indexOf(startSyb),
      end = str.lastIndexOf(endSyb);
      
  if (start + end > 1){
    return JSON.parse(str.substring(start,end+1));
    //return eval('(' + str.substring(start,end+1) + ')');//IE8+,Firefox3.5+,Safari4+,Chrome10.5+,Opera10.5+
  } else {
    return null;
  };
}
let cheakSelectLength = function(data){
    if ( data.length === 0 ){//选择集为空时不能查看

      this.$alert( '请在表格中选择一项', '警告', {
        confirmButtonText: '确定',
        type: 'warning',
        callback: action => {}//$alert, $confirm 
      });

      return false
    } else if ( data.length >= 2 ){//选择集中有多个对象时不能查看

      this.$alert( '只能在表格中选择一项', '警告', {
        confirmButtonText: '确定',
        type: 'warning',
        callback: action => {}
      });

      return false
    }

    return true
}
export { mouseBtnEv ,string2Obj, cheakSelectLength }
