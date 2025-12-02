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
    margin: 24px;
    justify-content: center;
    overflow: hidden;
    gap: 20px;
    
    .card-item{
        position: relative;
        width: calc(50% - 40px);
        min-width: 400px;
        border-radius: 16px;
        border: 1px solid #e8e8e8;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        
        :deep(.el-card__body) {
            padding: 24px;
        }
    }
}

@media only screen and (max-width: 1200px){
    .content-wrapper{
        .card-item{
            width: calc(100% - 40px);
            min-width: unset;
        }
    }
}

@media only screen and (max-width: 768px){
    .content-wrapper{
        margin: 16px;
        gap: 16px;
        
        .card-item{
            width: 100%;
            border-radius: 12px;
            
            :deep(.el-card__body) {
                padding: 16px;
            }
        }
    }
}
</style>