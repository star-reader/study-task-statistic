<template>
    <div id="line-charts"></div>
</template>

<script lang='ts' setup>
import * as echarts from 'echarts'
import { ECharts } from 'echarts'
import { nextTick, onMounted } from 'vue';

let totalData = []
let xData: string[] = []  //x轴存放日期
let fullData: any = {
    chinese:[],
    math:[],
    english:[],
    physic:[],
    chemistry:[],
    biology:[],
    policy:[],
    history:[],
    geography:[],
    other:[]
}
function initData(){
    let d = localStorage.getItem('totalStudyData')
    if (!d) return
    totalData = JSON.parse(d)
    for (let i in totalData){
        if (parseInt(i) < 180){
            //记录半年的学习信息
            let baseDate = totalData[i].date.split('-')
            xData.push(
                baseDate[1]+'-'+baseDate[2]
            )
            fullData.chinese.push(totalData[i].data.chinese),
            fullData.math.push(totalData[i].data.math),
            fullData.english.push(totalData[i].data.english),
            fullData.physic.push(totalData[i].data.physic),
            fullData.chemistry.push(totalData[i].data.chemistry),
            fullData.biology.push(totalData[i].data.biology),
            fullData.policy.push(totalData[i].data.policy),
            fullData.history.push(totalData[i].data.history),
            fullData.geography.push(totalData[i].data.geography),
            fullData.other.push(totalData[i].data.other)
        }else{
            continue
        }
    }
    initECharts()
}

function initECharts(){
    let dom = document.getElementById('line-charts')
    let charts: ECharts = echarts.init(dom as HTMLElement)
    let config  = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
            }
        },
        legend: {
            data: ['语文', '数学', '英语', '物理', '化学' , '生物' , '政治' , '历史' , '地理' , '其他']
        },
        toolbox: {
            feature: {
            saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
            type: 'category',
            boundaryGap: false,
            data: xData
            }
        ],
        yAxis: [
            {
            type: 'value'
            }
        ],
        series: [
            {
            name: '语文',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: fullData.chinese
            },
            {
            name: '数学',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: fullData.math
            },
            {
            name: '英语',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: fullData.english
            },
            {
            name: '物理',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: fullData.physic
            },
            {
            name: '化学',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: fullData.chemistry
            },
            {
            name: '生物',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: fullData.biology
            },
            {
            name: '政治',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: fullData.policy
            },
            {
            name: '历史',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: fullData.history
            },
            {
            name: '地理',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: fullData.geography
            },
            {
            name: '其他',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: fullData.other
            }
        ]
    }
    config && charts.setOption(config)
    window.addEventListener('resize',() => charts.resize())
}

onMounted(()=>{
    initData()
    
})
</script>

<style lang='less' scoped>
#line-charts{
    position: relative;
    width: 100%;
    height: 400px;
}
</style>