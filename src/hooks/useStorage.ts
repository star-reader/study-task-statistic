import useMap from "./useMap"
export function storageToday(data: any): void {
    let array = JSON.parse(localStorage.getItem('todayStudyData') as string)
    let flag: boolean = false
    for (let i in array){
        if (array[i].name == data.name){
            //已经存在的科目
            array[i].value += data.value
            flag = true
        }
    }
    if (!flag){
        array.push(data)
    }
    localStorage.setItem('todayStudyData',JSON.stringify(array))
}

export function storageList(data: any): void {
    let todayData = JSON.parse(localStorage.getItem('totalStudyData') as string)
    todayData[0].totalTime+=parseFloat(data.value.toFixed(2))
    todayData[0].data[useMap(data.name)]+=parseFloat(data.value.toFixed(2))
    localStorage.setItem('totalStudyData',JSON.stringify(todayData))
}