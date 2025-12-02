<template>
    <div class="navbar">
        <div @click="openDrawer" class="action-bar">
            <el-icon><Operation /></el-icon>
        </div>
        <div class="main-nav-content">
            学习任务与时间统计
        </div>
    </div>
</template>

<script lang='ts' setup>
import { Operation } from '@element-plus/icons-vue'
import pubsub from 'pubsub-js'
function openDrawer(){
    pubsub.publish('open-drawer',true)
}

</script>

<style lang='less' scoped>
@nav-bar-height: 60px;
.navbar{
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: @nav-bar-height;
    background-color: rgb(4,164,239);
    color: white;
    font-size: 22px;
    display: flex;
    line-height: @nav-bar-height;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    .action-bar{
        position: relative;
        padding: 0 24px;
        font-weight: bold;
        font-size: 26px;
        cursor: pointer;
        
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
    
    .main-nav-content {
        font-weight: 600;
    }
}
</style>