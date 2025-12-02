<template>
    <div class="warning">
        *只有结束一项学习任务后，当前学习任务数据才会被保存并添加到界面中
    </div>
    <br>
    <div class="session-wrapper">
        <el-button type="success" @click="newStudyTask" :disabled="disabledNew" round>新建学习任务</el-button>
        <el-button type="primary" @click="completeStudy" :disabled="!disabledNew" round>结束当前任务</el-button>
    </div>
    <el-divider />
    <div class="export-wrapper">
        <el-button @click="handleExportJSON" :icon="Download" round>导出 JSON</el-button>
        <el-button @click="handleExportCSV" :icon="Download" round>导出 CSV</el-button>
        <el-button @click="triggerImport" :icon="Upload" round>导入数据</el-button>
        <input 
            ref="fileInput" 
            type="file" 
            accept=".json" 
            @change="handleImport" 
            style="display: none"
        />
    </div>
    <el-dialog 
        v-model="dialogFormVisible" 
        title="选择学习科目"
        width="500px"
        :close-on-click-modal="false"
        append-to-body
        destroy-on-close
    >
    <el-form :model="form" label-position="top">
        <el-form-item label="选择科目" required>
            <el-select 
                v-model="form.type" 
                placeholder="请选择学习学科" 
                size="large"
                style="width: 100%"
            >
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
        <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false" size="large" round>取消</el-button>
            <el-button type="primary" @click="saveCurrentStudy" size="large" round>
            开始学习
            </el-button>
        </div>
        </template>
    </el-dialog>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { Download, Upload } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { calcTimeSplt , calcTimeByMin } from '@/lib/timelib';
import { storageToday , storageList } from '@/hooks/useStorage';
import { useStudyData } from '@/hooks/useStudyData';

const { exportToJSON, exportToCSV, importData } = useStudyData();

let form = ref({
    type:'',
})
const disabledNew = ref( localStorage.getItem('tempStudyStartTime') ? true : false )
const dialogFormVisible = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

function newStudyTask() {
    dialogFormVisible.value = true
}

function completeStudy() {
    disabledNew.value = false
    //设置今日学习信息
    let thisStudyTime = localStorage.getItem('tempStudyStartTime')
    let thisStudyInfo = {
        name: localStorage.getItem('tempStudyType') || '',
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

function handleExportJSON() {
    try {
        exportToJSON();
        ElMessage.success('数据导出成功！');
    } catch (error) {
        ElMessage.error('导出失败，请重试');
    }
}

function handleExportCSV() {
    try {
        exportToCSV();
        ElMessage.success('数据导出成功！');
    } catch (error) {
        ElMessage.error('导出失败，请重试');
    }
}

function triggerImport() {
    fileInput.value?.click();
}

function handleImport(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const content = e.target?.result as string;
        if (importData(content)) {
            ElMessage.success('数据导入成功！');
            setTimeout(() => location.reload(), 1000);
        } else {
            ElMessage.error('导入失败，文件格式不正确');
        }
    };
    reader.readAsText(file);
    
    // 重置 input
    target.value = '';
}

</script>

<style lang='less' scoped>
.warning{
    color: #fa8c16;
    font-size: 15px;
    text-align: center;
    margin: 8px 0;
    padding: 8px 16px;
    background: #fff7e6;
    border-radius: 8px;
    border: 1px solid #ffd591;
}
.session-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin: 16px 0;
}
.export-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin: 16px 0;
    flex-wrap: wrap;
}
.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}
</style>