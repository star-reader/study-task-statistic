export default function (key: string): string{
    switch (key) {
        case '语文':
            return 'chinese'
        case '数学':
            return 'math'
        case '英语':
            return 'english'
        case '物理':
            return 'physic'
        case '化学':
            return 'chemistry'
        case '生物':
            return 'biology'
        case '政治':
            return 'policy'
        case '历史':
            return 'history'
        case '地理':
            return 'geography'
        case '其他':
            return 'other'
        default:
            return 'other'
    }
}