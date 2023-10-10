<template>
  <div class="index-container app-container">
    <el-card v-if="tempApiList.length > 0" class="box-card">
      <div slot="header" class="clearfix">
        <span>预警</span>
      </div>
<!--      <router-link :to="{path: '/brary', query: {arary:1 }}">-->
<!--        <button>-->
      <div @click="aryary()">
        <!--        query方式-->

<!--            <Top10AgeBarChart/>-->


      </div>
<!--        </button>-->
<!--      </router-link>-->
      <!--      <el-row :gutter="20">-->
      <!--        <el-col v-if="routers.includes('NewIntempList') || routers.includes('NewInReCheck') || routers.includes('NewInRack')" :xs="24" :sm="24" :md="12" :lg="6">-->
      <!--          <el-card class="box-card">-->
      <!--            <div slot="header" class="clearfix">-->
      <!--              <span>新件物料入库</span>-->
      <!--            </div>-->
      <!--            <div class="text">-->
      <!--              <el-badge v-if="routers.includes('NewIntempList')" :value="res1" class="item">-->
      <!--                <el-button size="small" style="width: 100%;" @click="handleNavTo('NewIntempList')">待检验物料</el-button>-->
      <!--              </el-badge>-->
      <!--              <el-badge v-if="routers.includes('NewInReCheck')" :value="res2" class="item">-->
      <!--                <el-button size="small" style="width: 100%;" @click="handleNavTo('NewInReCheck')">待重新检验物料</el-button>-->
      <!--              </el-badge>-->
      <!--              <el-badge v-if="routers.includes('NewInRack')" :value="res3" class="item">-->
      <!--                <el-button size="small" style="width: 100%;" @click="handleNavTo('NewInRack')">待上架物料</el-button>-->
      <!--              </el-badge>-->
      <!--            </div>-->
      <!--          </el-card>-->
      <!--        </el-col>-->
      <!--        <el-col v-if="routers.includes('ZeroInTtempList') || routers.includes('ZeroInReCheck') || routers.includes('ZeroInRack')" :xs="24" :sm="24" :md="12" :lg="6">-->

      <!--          <el-card class="box-card">-->
      <!--            <div slot="header" class="clearfix">-->
      <!--              <span>零价值物料入库</span>-->
      <!--            </div>-->
      <!--            <div class="text">-->
      <!--              <el-badge v-if="routers.includes('ZeroInTtempList')" :value="res4" class="item">-->
      <!--                <el-button size="small" style="width: 100%;" @click="handleNavTo('ZeroInTtempList')">待检验物料</el-button>-->
      <!--              </el-badge>-->
      <!--              <el-badge v-if="routers.includes('ZeroInReCheck')" :value="res5" class="item">-->
      <!--                <el-button size="small" style="width: 100%;" @click="handleNavTo('ZeroInReCheck')">待重新检验物料</el-button>-->
      <!--              </el-badge>-->
      <!--              <el-badge v-if="routers.includes('ZeroInRack')" :value="res6" class="item">-->
      <!--                <el-button size="small" style="width: 100%;" @click="handleNavTo('ZeroInRack')">待上架物料</el-button>-->
      <!--              </el-badge>-->
      <!--            </div>-->
      <!--          </el-card>-->
      <!--        </el-col>-->
      <!--        <el-col v-if="routers.includes('ReturnInTempList') || routers.includes('ReturnInReCheck') || routers.includes('ReturnInRack')" :xs="24" :sm="24" :md="12" :lg="6">-->

      <!--          <el-card class="box-card">-->
      <!--            <div slot="header" class="clearfix">-->
      <!--              <span>返库物料入库</span>-->
      <!--            </div>-->
      <!--            <div class="text">-->
      <!--              <el-badge v-if="routers.includes('ReturnInTempList')" :value="res7" class="item">-->
      <!--                <el-button size="small" style="width: 100%;" @click="handleNavTo('ReturnInTempList')">待检验物料</el-button>-->
      <!--              </el-badge>-->
      <!--              <el-badge v-if="routers.includes('ReturnInReCheck')" :value="res8" class="item">-->
      <!--                <el-button size="small" style="width: 100%;" @click="handleNavTo('ReturnInReCheck')">待重新检验物料</el-button>-->
      <!--              </el-badge>-->
      <!--              <el-badge v-if="routers.includes('ReturnInRack')" :value="res9" class="item">-->
      <!--                <el-button size="small" style="width: 100%;" @click="handleNavTo('ReturnInRack')">待上架物料</el-button>-->
      <!--              </el-badge>-->
      <!--            </div>-->
      <!--          </el-card>-->
      <!--        </el-col>-->
      <!--        <el-col v-if="routers.includes('RepairTempList') || routers.includes('RepairReCheck') || routers.includes('RepairRack')" :xs="24" :sm="24" :md="12" :lg="6">-->

      <!--          <el-card class="box-card">-->
      <!--            <div slot="header" class="clearfix">-->
      <!--              <span>维修件物料入库</span>-->
      <!--            </div>-->
      <!--            <div class="text">-->
      <!--              <el-badge v-if="routers.includes('RepairTempList')" :value="res10" class="item">-->
      <!--                <el-button size="small" style="width: 100%;" @click="handleNavTo('RepairTempList')">待检验物料</el-button>-->
      <!--              </el-badge>-->
      <!--              <el-badge v-if="routers.includes('RepairReCheck')" :value="res11" class="item">-->
      <!--                <el-button size="small" style="width: 100%;" @click="handleNavTo('RepairReCheck')">待重新检验物料</el-button>-->
      <!--              </el-badge>-->
      <!--              <el-badge v-if="routers.includes('RepairRack')" :value="res12" class="item">-->
      <!--                <el-button size="small" style="width: 100%;" @click="handleNavTo('RepairRack')">待上架物料</el-button>-->
      <!--              </el-badge>-->
      <!--            </div>-->
      <!--          </el-card>-->
      <!--        </el-col>-->
      <!--        <el-col v-if="routers.includes('PutOutRack')" :xs="24" :sm="24" :md="12" :lg="6">-->

      <!--          <el-card class="box-card">-->
      <!--            <div slot="header" class="clearfix">-->
      <!--              <span>物料出库</span>-->
      <!--            </div>-->
      <!--            <div class="text">-->
      <!--              <el-badge v-if="routers.includes('PutOutRack')" :value="res13" class="item">-->
      <!--                <el-button size="small" style="width: 100%;" @click="handleNavTo('PutOutRack', 0)">出库清单出库</el-button>-->
      <!--              </el-badge>-->
      <!--              <el-badge v-if="routers.includes('PutOutRack')" :value="res16" class="item">-->
      <!--                <el-button size="small" style="width: 100%;" @click="handleNavTo('PutOutRack', 1)">扫描清单出库</el-button>-->
      <!--              </el-badge>-->
      <!--            </div>-->
      <!--          </el-card>-->
      <!--        </el-col>-->
      <!--        <el-col v-if="routers.includes('MoveStorageTempList')" :xs="24" :sm="24" :md="12" :lg="6">-->

      <!--          <el-card class="box-card">-->
      <!--            <div slot="header" class="clearfix">-->
      <!--              <span>物料移库</span>-->
      <!--            </div>-->
      <!--            <div class="text">-->
      <!--              <el-badge v-if="routers.includes('MoveStorageTempList')" :value="res14" class="item">-->
      <!--                <el-button size="small" style="width: 100%;" @click="handleNavTo('MoveStorageTempList')">移库物料</el-button>-->
      <!--              </el-badge>-->
      <!--            </div>-->
      <!--          </el-card>-->
      <!--        </el-col>-->
      <!--        <el-col v-if="routers.includes('ScrapeTempList')" :xs="24" :sm="24" :md="12" :lg="6">-->

      <!--          <el-card class="box-card">-->
      <!--            <div slot="header" class="clearfix">-->
      <!--              <span>物料报废</span>-->
      <!--            </div>-->
      <!--            <div class="text">-->
      <!--              <el-badge v-if="routers.includes('ScrapeTempList')" :value="res15" class="item">-->
      <!--                <el-button size="small" style="width: 100%;" @click="handleNavTo('ScrapeTempList')">报废物料</el-button>-->
      <!--              </el-badge>-->
      <!--            </div>-->
      <!--          </el-card>-->
      <!--        </el-col>-->
      <!--        <el-col v-if="routers.includes('TakingList')" :xs="24" :sm="24" :md="12" :lg="6">-->

      <!--          <el-card class="box-card">-->
      <!--            <div slot="header" class="clearfix">-->
      <!--              <span>盘点</span>-->
      <!--            </div>-->
      <!--            <div class="text">-->
      <!--              <el-badge v-if="routers.includes('TakingList')" :value="res17" class="item">-->
      <!--                <el-button size="small" style="width: 100%;" @click="handleNavTo('TakingList')">未盘点天数</el-button>-->
      <!--              </el-badge>-->
      <!--            </div>-->
      <!--          </el-card>-->

      <!--        </el-col>-->
      <!--      </el-row>-->
    </el-card>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>月度库存总金额</span>
          </div>
          <div>
            <Top100AgeBarChart/>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>库存Top10</span>
          </div>
          <div>
            <Top10StorageBarChart/>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import { listTemp } from '@/api/material/newIn/temp'
import { reCheckList } from '@/api/material/newIn/reCheck'
import { rackList } from '@/api/material/newIn/rack'

import { listTemp as zeroInListTemp } from '@/api/material/zeroIn/temp'
import { reCheckList as zeroInReCheckList } from '@/api/material/zeroIn/reCheck'
import { rackList as zeroInRackList } from '@/api/material/zeroIn/rack'

import { listTemp as returnInListTemp } from '@/api/material/returnIn/temp'
import { reCheckList as returnInReCheckList } from '@/api/material/returnIn/reCheck'
import { rackList as returnInRackList } from '@/api/material/returnIn/rack'

import { listTemp as repairListTemp } from '@/api/material/repair/temp'
import { reCheckList as repairReCheckList } from '@/api/material/repair/reCheck'
import { rackList as repairRackList } from '@/api/material/repair/rack'

// import { listOut } from '@/api/material/outPut/temp' // 出库
import { list as listOutPut } from '@/api/material/outPut/rack' // 出库

import { listOut as moveStorageListOut } from '@/api/material/moveStorage/temp' // 移库

import { scrapeMaterialList } from '@/api/material/scrape/temp' // 报废

// import { noTakingDays } from '@/api/material/taking/taking' // 未盘点天数

import Top10AgeBarChart from './dashboard/Top10AgeBarChart'
import Top10StorageBarChart from './dashboard/Top10StorageBarChart'
import Top100AgeBarChart from './dashboard/Top100AgeBarChart'
import { mapGetters } from 'vuex'

export default {
  components: {
    Top10AgeBarChart,
    Top100AgeBarChart,
    Top10StorageBarChart

  },
  data() {
    return {
      result: null,
      res1: null,
      res2: null,
      res3: null,
      res4: null,
      res5: null,
      res6: null,
      res7: null,
      res8: null,
      res9: null,
      res10: null,
      res11: null,
      res12: null,
      res13: null,
      res14: null,
      res15: null,
      res16: null,
      res17: null,
      tempArray: [],
      tempApiList: []
    }
  },
  computed: {
    ...mapGetters(['defaultRoutes']),
    routers() {
      const temp = []
      this.readNodes(this.defaultRoutes, temp)
      return temp
    }
  },
  mounted() {
    this.getBadge()
    console.log(this.routers, 'routers')
  },
  methods: {
    aryary(){
      this.$router.push({
        path:'/material/Materialbrarylist',
        query:{
          id:1
        }
      })
    },
    async getBadge() {
      if (this.routers.includes('NewIntempList')) {
        const p1 = listTemp({ pageNum: 1, pageSize: 1 })
        this.tempApiList.push(p1)
      }
      if (this.routers.includes('NewInReCheck')) {
        const p2 = reCheckList({ pageNum: 1, pageSize: 1, materialStatus: 3 })
        this.tempApiList.push(p2)
      }
      if (this.routers.includes('NewInRack')) {
        const p3 = rackList({ pageNum: 1, pageSize: 1, materialStatus: 1 })
        this.tempApiList.push(p3)
      }
      if (this.routers.includes('ZeroInTtempList')) {
        const p4 = zeroInListTemp({ pageNum: 1, pageSize: 1 })
        this.tempApiList.push(p4)
      }
      if (this.routers.includes('ZeroInReCheck')) {
        const p5 = zeroInReCheckList({ pageNum: 1, pageSize: 1, materialStatus: 3 })
        this.tempApiList.push(p5)
      }
      if (this.routers.includes('ZeroInRack')) {
        const p6 = zeroInRackList({ pageNum: 1, pageSize: 1, materialStatus: 1 })
        this.tempApiList.push(p6)
      }
      if (this.routers.includes('ReturnInTempList')) {
        const p7 = returnInListTemp({ pageNum: 1, pageSize: 1 })
        this.tempApiList.push(p7)
      }
      if (this.routers.includes('ReturnInReCheck')) {
        const p8 = returnInReCheckList({ pageNum: 1, pageSize: 1, materialStatus: 3 })
        this.tempApiList.push(p8)
      }
      if (this.routers.includes('ReturnInRack')) {
        const p9 = returnInRackList({ pageNum: 1, pageSize: 1, materialStatus: 1 })
        this.tempApiList.push(p9)
      }
      if (this.routers.includes('RepairTempList')) {
        const p10 = repairListTemp({ pageNum: 1, pageSize: 1 })
        this.tempApiList.push(p10)
      }
      if (this.routers.includes('RepairReCheck')) {
        const p11 = repairReCheckList({ pageNum: 1, pageSize: 1, materialStatus: 3 })
        this.tempApiList.push(p11)
      }
      if (this.routers.includes('RepairRack')) {
        const p12 = repairRackList({ pageNum: 1, pageSize: 1, materialStatus: 1 })
        this.tempApiList.push(p12)
      }
      if (this.routers.includes('PutOutRack')) {
        const p13 = listOutPut({ pageNum: 1, pageSize: 1, putOutType: 0 }) // 手动出库
        this.tempApiList.push(p13)
      }
      if (this.routers.includes('MoveStorageTempList')) {
        const p14 = moveStorageListOut({ pageNum: 1, pageSize: 1 })
        this.tempApiList.push(p14)
      }
      if (this.routers.includes('ScrapeTempList')) {
        const p15 = scrapeMaterialList({ pageNum: 1, pageSize: 1 })
        this.tempApiList.push(p15)
      }

      if (this.routers.includes('PutOutRack')) {
        const p16 = listOutPut({ pageNum: 1, pageSize: 1, putOutType: 1 }) // 扫描出库
        this.tempApiList.push(p16)
      }

      // if (this.routers.includes('TakingList')) {
        // const p17 = noTakingDays()
      //   this.tempApiList.push(p17)
      // }

      console.log(this.tempApiList, 'temppppppppppppp')

      this.result = await Promise.all(this.tempApiList)

      console.log(this.result, 'result')

      this.result.map((o, i) => {
        if (typeof (o.total) === 'number') {
          this[`res${(i + 1)}`] = o.total
        }
      })
      // if (this.routers.includes('TakingList')) {
      //   this.res17 = this.result[16].data
      // }
    },
    handleNavTo(name, param = null) {
      this.$router.push({ name: name, params: { param } })
    },
    readNodes(nodes = [], arr = []) {
      for (const item of nodes) {
        arr.push(item.path)
        if (item.children && item.children.length) this.readNodes(item.children, arr)
      }
      return arr
    }

  }
}
</script>

<style lang="scss" scoped>
.index-container {
  .el-card__header {
    > div {
      text-align: center;
    }
  }

  ::v-deep .el-card__body {
    padding: 10px 40px 10px 40px !important;
  }

  .box-card {
    margin-bottom: 20px;
  }

  .text {
    .item {
      width: 100%;
      margin-bottom: 10px;
    }

    .item:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
