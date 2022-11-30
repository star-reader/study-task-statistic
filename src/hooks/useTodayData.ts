export default function (): any[] {
    let data = localStorage.getItem('todayStudyData')
    if (!data){
        localStorage.setItem('todayStudyData',JSON.stringify([]))
        return []
    }else{
        return JSON.parse(data)
    }
}