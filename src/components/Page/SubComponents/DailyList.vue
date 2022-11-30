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
    height: 400px;
    .title{
        color: #303133;
        font-size: 20px;
        font-weight: bold;
        margin: 5px 0;
    }
    .with-test-button{
        font-size: 20px;
    }
}
</style>