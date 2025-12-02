import { ref, Ref } from 'vue';
import type { StudyRecord, DailyStudyData } from '@/types';
import useMap from './useMap';

export function useStudyData() {
  const todayData: Ref<StudyRecord[]> = ref([]);
  const totalData: Ref<DailyStudyData[]> = ref([]);

  /**
   * 加载今日数据
   */
  const loadTodayData = (): StudyRecord[] => {
    const data = localStorage.getItem('todayStudyData');
    if (!data) {
      localStorage.setItem('todayStudyData', JSON.stringify([]));
      todayData.value = [];
      return [];
    }
    todayData.value = JSON.parse(data);
    return todayData.value;
  };

  /**
   * 加载所有历史数据
   */
  const loadTotalData = (): DailyStudyData[] => {
    const data = localStorage.getItem('totalStudyData');
    if (!data) {
      totalData.value = [];
      return [];
    }
    totalData.value = JSON.parse(data);
    return totalData.value;
  };

  /**
   * 保存今日学习记录
   */
  const saveTodayRecord = (record: StudyRecord): void => {
    const array: StudyRecord[] = JSON.parse(localStorage.getItem('todayStudyData') as string) || [];
    let flag = false;
    
    for (let i in array) {
      if (array[i].name === record.name) {
        array[i].value += record.value;
        flag = true;
        break;
      }
    }
    
    if (!flag) {
      array.push(record);
    }
    
    localStorage.setItem('todayStudyData', JSON.stringify(array));
    todayData.value = array;
  };

  /**
   * 保存到总数据列表
   */
  const saveTotalRecord = (record: StudyRecord): void => {
    const data: DailyStudyData[] = JSON.parse(localStorage.getItem('totalStudyData') as string) || [];
    if (data.length === 0) return;
    
    const subjectKey = useMap(record.name) as keyof DailyStudyData['data'];
    const increment = parseFloat(record.value.toFixed(2));
    data[0].totalTime += increment;
    data[0].data[subjectKey] = (data[0].data[subjectKey] ?? 0) + increment;
    
    localStorage.setItem('totalStudyData', JSON.stringify(data));
    totalData.value = data;
  };

  /**
   * 获取所有学习数据（用于导出）
   */
  const getAllData = () => {
    return {
      todayData: loadTodayData(),
      totalData: loadTotalData(),
      todayTime: localStorage.getItem('todayTime') || '0',
      totalStudyTime: localStorage.getItem('totalStudyTime') || '0'
    };
  };

  /**
   * 导出为 JSON
   */
  const exportToJSON = () => {
    const data = getAllData();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `study-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  /**
   * 导出为 CSV
   */
  const exportToCSV = () => {
    const data = loadTotalData();
    if (data.length === 0) {
      return;
    }

    // CSV 表头
    let csv = '日期,总时长(小时),语文,数学,英语,物理,化学,生物,政治,历史,地理,其他\n';
    
    // CSV 数据行
    data.forEach(item => {
      csv += `${item.date},${item.totalTime},${item.data.chinese},${item.data.math},${item.data.english},${item.data.physic},${item.data.chemistry},${item.data.biology},${item.data.policy},${item.data.history},${item.data.geography},${item.data.other}\n`;
    });

    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `study-data-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  /**
   * 导入数据
   */
  const importData = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      
      if (data.todayData) {
        localStorage.setItem('todayStudyData', JSON.stringify(data.todayData));
      }
      if (data.totalData) {
        localStorage.setItem('totalStudyData', JSON.stringify(data.totalData));
      }
      if (data.todayTime) {
        localStorage.setItem('todayTime', data.todayTime);
      }
      if (data.totalStudyTime) {
        localStorage.setItem('totalStudyTime', data.totalStudyTime);
      }
      
      loadTodayData();
      loadTotalData();
      return true;
    } catch (error) {
      console.error('导入数据失败:', error);
      return false;
    }
  };

  return {
    todayData,
    totalData,
    loadTodayData,
    loadTotalData,
    saveTodayRecord,
    saveTotalRecord,
    getAllData,
    exportToJSON,
    exportToCSV,
    importData
  };
}
