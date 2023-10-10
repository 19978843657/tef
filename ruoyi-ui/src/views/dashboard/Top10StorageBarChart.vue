<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 2000
import { getStoreTopTenlist } from '@/api/home'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getStoreTopTenlist() {
      getStoreTopTenlist().then(res => {
        const data = res.rows
        console.log("------------------------")
        console.log(data)
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: '{b0}: <br />{c0}'
          },
          grid: {
            top: 20,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          color: ['#095AAE'],
          xAxis: [{
            type: 'category',
            data: data.map(v => v.materialNo),
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              rotate: 20
            }
          }],
          yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            }
          }],
          series: [{
            name: '库存',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: data.map(v => v.count),
            animationDuration,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontSize: 12
                  }
                }
              }
            }
          }]
        })
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.getStoreTopTenlist()
    }
  }
}
</script>
