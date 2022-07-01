import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') // 把默认英文配置成中文
dayjs.extend(relativeTime)
/*
*把时间变成相对时间
*moment.js  dayjs（dayjs比momentjs体积小）
*@params {*} time
*@return
*/
export const dateformat = (time) => {
  return dayjs(time).fromNow()
}
// 1.批量创建过滤器
// 2.好处：创建新的过滤器，代码会变简单，只要写一个普普通通的函数并且按需导出就行了
