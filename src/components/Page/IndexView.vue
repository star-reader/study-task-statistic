<template>
        <div class="content-wrapper">
            <el-card class="card-item">
                <TopStstistic/>
            </el-card>
            <el-card class="card-item">
                <ChartShow/>
            </el-card>
            <el-card class="card-item">
                <ActionPanel/>
            </el-card>
            <el-card class="card-item">
                <LineChart/>
            </el-card>
            <el-card class="card-item">
                <DailyList/>
            </el-card>
        </div>
</template>

<script lang='ts' setup>
import TopStstistic from './SubComponents/TopStstistic.vue';
import ChartShow from './SubComponents/ChartShow.vue';
import ActionPanel from './SubComponents/ActionPanel.vue';
import LineChart from './SubComponents/LineChart.vue';
import DailyList from './SubComponents/DailyList.vue';
</script>

<style lang='less' scoped>
.content-wrapper{
    display: flex;
    flex-wrap: wrap;
    margin: 20px;
    justify-content: center;
    overflow: hidden;
    .card-item{
        position: relative;
        width: 40%;
        margin: 10px 20px;
    }
}
@media only screen and (max-width: 1000px){
    .card-item{
        width: 100% !important;
    }
}
</style>