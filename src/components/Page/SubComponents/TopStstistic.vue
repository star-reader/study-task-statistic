<template>
    <div class="stastic-item">
        <span class="title">累计学习时长: </span>
        <span class="data">{{getTotalTime()}}</span>
    </div>
    <div class="stastic-item">
        <span class="title">今日学习时长: </span>
        <span class="data">{{getTodayTime()}}</span>
    </div>
</template>

<script lang='ts' setup>
import { getTotalTime , getTodayTime } from '@/lib/timelib';
</script>

<style lang='less' scoped>
.stastic-item{
    position: relative;
    margin: 12px 8px;
    padding: 20px 24px;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
    border-radius: 12px;
    border: 1px solid #e8e8e8;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    
    .title{
        color: #606266;
        margin-right: 8px;
    }
    .data{
        color: #409eff;
        font-size: 24px;
        font-weight: 600;
    }
}
</style>