<template>
    <div class="warning">
        *只有结束一项学习任务后，当前学习任务数据才会被保存并添加到界面中
    </div>
    <br>
    <div class="session-wrapper">
        <el-button type="success" @click="newStudyTask" :disabled="disabledNew">新建学习任务</el-button>
        <el-button type="primary" @click="completeStudy" :disabled="!disabledNew">结束当前任务</el-button>
    </div>
    <el-dialog v-model="dialogFormVisible" title="选择学习科目">
    <el-form :model="form">
        <el-form-item label="选择科目">
            <el-select v-model="form.type" placeholder="请选择时间学科">
            <el-option label="语文" value="语文" />
            <el-option label="数学" value="数学" />
            <el-option label="英语" value="英语" />
            <el-option label="物理" value="物理" />
            <el-option label="化学" value="化学" />
            <el-option label="生物" value="生物" />
            <el-option label="政治" value="政治" />
            <el-option label="历史" value="历史" />
            <el-option label="地理" value="地理" />
            <el-option label="其他" value="其他" />
            </el-select>
        </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="saveCurrentStudy">
            开始学习
            </el-button>
        </span>
        </template>
    </el-dialog>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { calcTimeSplt , calcTimeByMin } from '@/lib/timelib'
import { storageToday , storageList } from '@/hooks/useStorage'

let form = ref({
    type:'',
})
const disabledNew = ref( localStorage.getItem('tempStudyStartTime') ? true : false )
const dialogFormVisible = ref(false)

function newStudyTask() {
    dialogFormVisible.value = true
}

function completeStudy() {
    disabledNew.value = false
    //设置今日学习信息
    let thisStudyTime = localStorage.getItem('tempStudyStartTime')
    let thisStudyInfo = {
        name: localStorage.getItem('tempStudyType'),
        value: calcTimeSplt(parseInt(thisStudyTime as string))
    }
    storageToday(thisStudyInfo)
    storageList(thisStudyInfo)
    let totalTime = localStorage.getItem('totalStudyTime')
    let todayTime = localStorage.getItem('todayTime')
    localStorage.setItem('todayTime',
    (parseInt(todayTime as string) + calcTimeByMin(parseInt(thisStudyTime as string))).toString())
    localStorage.setItem('totalStudyTime',
    (parseInt(totalTime as string) + calcTimeByMin(parseInt(thisStudyTime as string))).toString())
    localStorage.removeItem('tempStudyStartTime')
    location.reload()
}

function saveCurrentStudy(){
    dialogFormVisible.value = false
    localStorage.setItem('tempStudyType',form.value.type)
    localStorage.setItem('tempStudyStartTime',new Date().getTime().toString())
    disabledNew.value = true
}

</script>

<style lang='less' scoped>
.warning{
    color: orangered;
    font-size: 20px;
    text-align: center;
    margin: 4px 0;
}
.session-wrapper{
    display: flex;
    //height: 90px;
    align-items: center;
    justify-content: space-evenly;
}
</style>