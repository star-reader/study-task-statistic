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
    margin: 4px;
    padding: 2px 0;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    .title{
        color: black;
    }
    .data{
        color: skyblue;
    }
}
</style>