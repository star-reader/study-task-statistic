import { formatToHourMinite } from '@/hooks/formatTimetoHour'
const noTimeMessage = '尚无学习时长，小伙伴继续努力吧ヾ(◍°∇°◍)ﾉﾞ'
const noTodayStudy = '暂无，美好的一天，从学习开始~'
export const getTotalTime : () => string = () =>{
    let data = localStorage.getItem('totalStudyTime')
    if (!data){
        localStorage.setItem('totalStudyTime','0')
        return noTimeMessage
    }else{
        return data == '0' ? noTimeMessage : formatToHourMinite(parseInt(data))
    }
}

export const getTodayTime: () => string = () =>{
    let data = localStorage.getItem('todayTime')
    if (!data){
        localStorage.setItem('todayTime','0')
        return noTodayStudy
    }else{
        return data == '0' ? noTodayStudy : formatToHourMinite(parseInt(data))
    }
}

export const calcTimeSplt: (time: number) => number = (time: number) => {
    let current = new Date().getTime()
    return parseFloat(((current - time)/1000/3600).toFixed(1))
}
export const calcTimeByMin: (time: number) => number = (time: number) => {
    let current = new Date().getTime()
    return parseFloat(((current - time)/1000/60).toFixed())
}
