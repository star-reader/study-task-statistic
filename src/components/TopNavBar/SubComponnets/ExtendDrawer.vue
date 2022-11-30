<template>
    <el-drawer
    class="drawer"
    v-model="drawer"
    title="学习时间统计"
    direction="ltr"
  >
    <span @click="action()">主页面</span> <br> <br>
    <span @click="action('true')">系统说明</span>
  </el-drawer>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import pubsub from 'pubsub-js'
import { ElMessageBox } from 'element-plus';

const drawer = ref(false)
function action(open?: string){
    drawer.value = false
    if (open){
    ElMessageBox.alert(`<span>一个简洁的学习任务与时间统计程序</span> <br>
                        <span>包含创建学习计划、统计学习时间等功能</span> <br>
                        <span>使用Vue3 + ECharts + ElementUI开发 <br>
                        <span>本项目代码已开源，详情请关注<a href='https://github.com/star-reader'>我的GitHub</a> <br>
    `, '系统说明', {
            confirmButtonText: 'OK',
            dangerouslyUseHTMLString: true,
        })
    }
}

pubsub.subscribe('open-drawer',(name: string, data: boolean)=>{
    if (data){
        drawer.value = true
    }
})
</script>

<style lang='less' scoped>
span{
    cursor: pointer;
}

</style>
<style>
a{
    font-weight: bold;
    color: skyblue;
    text-decoration: none;
}
a:visited{
    color: skyblue;
}
</style>