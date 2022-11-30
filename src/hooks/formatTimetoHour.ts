export const formatToHour: (time: number)=> number = (time: number) => {
    //记录时间格式xxx分钟
    return parseFloat((time/60).toFixed(2))
}
export const formatToHourMinite: (time: number)=> string = (time: number) =>{
    let hour = Math.floor(time/60)
    let minute = time%60
    return time > 60 ?  `${hour}小时${minute}分` : `${time}分钟`
}