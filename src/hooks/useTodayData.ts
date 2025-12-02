import type { StudyRecord } from '@/types';

export default function (): StudyRecord[] {
    let data = localStorage.getItem('todayStudyData')
    if (!data){
        localStorage.setItem('todayStudyData',JSON.stringify([]))
        return []
    }else{
        return JSON.parse(data)
    }
}