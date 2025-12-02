<template>
    <div v-if="isHaveData" id="main-charts"></div>
    <el-empty v-else description="空空如也，快来创建今天第一个学校计划吧" />
</template>

<script lang='ts' setup>
import * as echarts from 'echarts'
import { ECharts } from 'echarts'
import { nextTick, onMounted, ref } from 'vue';
import useTodayData from '@/hooks/useTodayData';


const isHaveData = ref(false)
const Chartconfig = ref()

function getTodayData(){
    let result: any[] = useTodayData()
    if (result.length){
        Chartconfig.value = result
        isHaveData.value = true
        nextTick(()=>{
            initECharts()
        })
    }else{
        Chartconfig.value = []
        isHaveData.value = false
    }
}

function initECharts(){
    let dom = document.getElementById('main-charts')
    let charts: ECharts = echarts.init(dom as HTMLElement)
    let config  = {
        title: {
            text: '今日时间分配详情',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '详细时长（小时）',
                type: 'pie',
                radius: '50%',
                data: Chartconfig.value,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    config && charts.setOption(config)
    charts.resize()
    window.addEventListener('resize',() => charts.resize())
}

onMounted(()=>{
    getTodayData()
})
</script>

<style lang='less' scoped>
#main-charts{
    position: relative;
    width: 100%;
    height: 400px;
    border-radius: 8px;
}
.action-button{
    position: relative;
    width: 100%;
    text-align: center;
}
</style>