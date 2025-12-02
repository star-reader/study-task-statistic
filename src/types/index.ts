// 学科类型
export type SubjectType = 'chinese' | 'math' | 'english' | 'physic' | 'chemistry' | 'biology' | 'policy' | 'history' | 'geography' | 'other';

// 学科中英文映射
export const SUBJECT_MAP: Record<string, SubjectType> = {
  '语文': 'chinese',
  '数学': 'math',
  '英语': 'english',
  '物理': 'physic',
  '化学': 'chemistry',
  '生物': 'biology',
  '政治': 'policy',
  '历史': 'history',
  '地理': 'geography',
  '其他': 'other'
};

// 学科英文中文映射
export const SUBJECT_NAME_MAP: Record<SubjectType, string> = {
  chinese: '语文',
  math: '数学',
  english: '英语',
  physic: '物理',
  chemistry: '化学',
  biology: '生物',
  policy: '政治',
  history: '历史',
  geography: '地理',
  other: '其他'
};

// 学习记录（今日）
export interface StudyRecord {
  name: string;
  value: number;
}

// 学科数据详情
export interface SubjectData {
  chinese: number;
  math: number;
  english: number;
  physic: number;
  chemistry: number;
  biology: number;
  policy: number;
  history: number;
  geography: number;
  other: number;
}

// 每日学习数据
export interface DailyStudyData {
  date: string;
  totalTime: number;
  data: SubjectData;
}

// 历史记录列表项
export interface HistoryListItem {
  date: string;
  precent: number;
  time: number;
}
