/**
 * 
 * @authors 王叁
 * @date    2017-08-24 13:40:23
 * @version $Id$
 */
let readOnly = {
	read:　0,
	write: 1
};
export { readOnly }
export default { 
	serviceAddress: "http://192.168.1.249:89/Appapi.asmx",
	getBuilding: "/getBuilding?developers=",
	getHouse: "/getHouse?num=",
	getModeList:"/getCBmodeList?developers=",
	postMode: "/modesubmit",
	getMode: "/getCBModeItem?id=",
	updateMode:"/modeupdate"
}
