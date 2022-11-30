export default function(){
    let lastOpenDate = localStorage.getItem('date')
    let todayDate = new Date().getDate()
    if (lastOpenDate != todayDate.toString()){
        //新的一天
        localStorage.setItem('todayStudyData',JSON.stringify([]))
        localStorage.setItem('todayTime','0')
        localStorage.setItem('date',todayDate.toString())
        let totalArray = JSON.parse(localStorage.getItem('totalStudyData') as string)
        let d = new Date()
        if (!totalArray){
            localStorage.setItem('totalStudyData',JSON.stringify([
                {
                    date:`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
                    totalTime:0,
                    data:{
                        chinese:0,
                        math:0,
                        english:0,
                        physic:0,
                        chemistry:0,
                        biology:0,
                        policy:0,
                        history:0,
                        geography:0,
                        other:0
                    }
                }
            ]))
        }else{
            totalArray.unshift({
                date:`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
                totalTime:0,
                data:{
                    chinese:0,
                    math:0,
                    english:0,
                    physic:0,
                    chemistry:0,
                    biology:0,
                    policy:0,
                    history:0,
                    geography:0,
                    other:0
                }
            })
            localStorage.setItem('totalStudyData',JSON.stringify(totalArray))
        }
        return false
    }else{
        return true
    }
}