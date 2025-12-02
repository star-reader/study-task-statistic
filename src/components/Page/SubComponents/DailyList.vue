<template>
    <div class="list-border">
        <div class="title">历史学习记录</div>
        <el-scrollbar height="400px">
            <el-progress v-for="(item,index) in dataList" :key="index" :stroke-width="26" :percentage="item.precent">
                <el-button text class="with-test-button">{{item.date}} &nbsp;&nbsp;<strong style="color:orangered">{{item.time.toFixed(1)}}h</strong></el-button>
            </el-progress>
            <el-empty v-if="!dataList.length" description="空空如也，快来创建今天第一个学校计划吧" />
        </el-scrollbar>
    </div>
</template>

<script lang='ts' setup>
import { onMounted, Ref, ref } from 'vue';

const dataList: Ref<any>= ref([])
function getDataList(){
    let d = localStorage.getItem('totalStudyData')
    if (!d) return
    let data = JSON.parse(d)
    let arr = []
    for (let i in data){
        arr.push(
            {date:data[i].date,precent:calcPrecent(data[i].totalTime),time:data[i].totalTime}
        )
    }
    dataList.value = arr
    console.log(arr)
}

function calcPrecent(time: number){
    return parseFloat((time/(24)).toFixed(1))*100
}

onMounted(()=>{
    getDataList()
})
</script>

<style lang='less' scoped>
.list-border{
    position: relative;
    min-height: 400px;
    
    .title{
        color: #303133;
        font-size: 20px;
        font-weight: 600;
        margin: 0 0 16px 0;
        padding-bottom: 12px;
        border-bottom: 2px solid #f0f0f0;
    }
    
    :deep(.el-progress) {
        margin-bottom: 16px;
        
        .el-progress-bar__outer {
            border-radius: 8px;
            overflow: hidden;
        }
        
        .el-progress-bar__inner {
            border-radius: 8px;
        }
    }
    
    .with-test-button{
        font-size: 16px;
        font-weight: 500;
        
        strong {
            color: #f56c6c;
        }
    }
}
</style>