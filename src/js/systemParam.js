/**
 * 
 * @authors 王叁
 * @date    2017-08-24 13:40:23
 * @version $Id$
 */
export default { 
	//服务目录
	serviceAddress: "http://192.168.1.188:89/Appapi.asmx",
	//用开发商名称，得到下属的楼盘地址、自然幢号、未登记户数
	getBuilding: "/getBuilding?developers=",
	//用自然幢号，得到该幢下属的单户信息
	getHouse: "/getHouse?num=",
	//用开发商名称，得到下属的模板列表
	getModeList:"/getCBmodeList?developers=",
	//新建模板，提交内容
	postMode: "/modesubmit",
	//用模板ID，得到模板内容
	getMode: "/getCBModeItem?id=",
	//更新已有模板
	updateMode:"/modeupdate"
}
