<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="物料" prop="materialNo">
        <el-input
          v-model="queryParams.materialNo"
          placeholder="请输入物料编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="报废时间">
        <el-date-picker
          v-model="dateRange"
          style="width: 380px;"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
        />
      </el-form-item>

      <el-form-item label="库位信息" prop="storeInfo">
        <el-input v-model="queryParams.storeInfo" placeholder="请输入库位信息" clearable size="small"
                  @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="操作人员" prop="scrapeRackName">
        <el-select v-model="queryParams.scrapeRackName" placeholder="请选择操作人员" clearable>
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.userName"
            :value="item.userName"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:scrape:export']"
          type="warning"
          plain
          icon="el-icon-download"
          :disabled="ids.length === 0"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    </el-row>

    <el-table ref="tableRef" v-loading="loading" :data="outList" :row-key="getRowKeys" @selection-change="handleSelectionChange"  height="500px">
      <el-table-column type="selection" :reserve-selection="true" width="55" align="center" />
      <!-- <el-table-column label="出库物料ID" align="center" prop="putOutMaterialId" /> -->
      <el-table-column label="物料类型" align="center" prop="materialType">
        <template slot-scope="scope">
          {{ Constants.codeToName(scope.row.materialType, Constants.MATERIAL_TYPE) }}
        </template>
      </el-table-column>
      <el-table-column label="物料" align="center" prop="materialNo" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="物料详细编码" align="center" prop="materialDetailNo" width="230" :show-overflow-tooltip="true" />
      <el-table-column label="物料描述" align="center" prop="materialDes" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="物料状态" align="center" prop="materialStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.material_status" :value="scope.row.materialStatus" />
        </template>
      </el-table-column>
      <el-table-column label="库位信息" align="center" prop="storeInfo" />
      <el-table-column label="历史库位信息" align="center" prop="storeHistoryInfo" width="150" :show-overflow-tooltip="true" />

      <el-table-column label="移动类型" align="center" prop="movingType" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="RFID类型" align="center" prop="rfidType" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="存储位置" align="center" prop="storeLocation" />
      <el-table-column label="物料凭证" align="center" prop="materialRceipts" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="批次" align="center" prop="batch" />
      <el-table-column label="成本中心" align="center" prop="costCenter" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="采购订单" align="center" prop="poNo" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="用户名" align="center" prop="userName" />
      <el-table-column label="数量" align="center" prop="number" />
      <el-table-column label="报废时间" align="center" prop="scrapeRackDt" width="180" />

      <el-table-column label="确认数量" align="center" prop="confirmNumber" />
      <el-table-column label="报废人员" align="center" prop="scrapeRackName" />
      <el-table-column label="操作人员" align="center" prop="operationame" width="340px"/>
      <el-table-column label="检验人员" align="center" prop="checkName"  width="200px"/>
      <el-table-column label="上架人员" align="center" prop="inputRackName" />
      <el-table-column label="订单编号" align="center" prop="orderNo" />
      <el-table-column label="出库方式" align="center" prop="putOutType" />
      <el-table-column label="备注" align="center" prop="remark" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="200">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['material:scrape:scrapeMaterial']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="updatemaer(scope.row)"
          >撤销</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import Constants from '@/constants'
import { completeList, updateScrapea } from '@/api/material/scrape/complete'
import { listUser } from '@/api/system/user'
import StoreSelect from '@/components/shortcut/storeSelect'
import moment from 'moment'
import { scrapeMaterial } from '@/api/material/scrape/scrape'

export default {
  name: 'Out',
  components: {
    StoreSelect
  },
  dicts: ['material_input_type', 'material_status'],
  data() {
    return {
      Constants,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 物料出库信息表格数据
      outList: [],
      userList: [],
      dateRange: [],

      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        scrapeRackName: null,
        storeInfo: null
      }
    }
  },
  created() {
    this.getList()
    this.getUserList()
  },
  methods: {
    getRowKeys(row) {
      return row.scrapeMaterialId
    },
    /** 查询物料出库信息列表 */
    getList() {
      this.loading = true
      this.queryParams.scrapeRackDtStart = this.dateRange[0]
      this.queryParams.scrapeRackDtEnd = this.dateRange[1]
      completeList(this.queryParams).then(response => {
        this.outList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    getUserList() {
      listUser({ page: 1, size: 100000 }).then(response => {
        this.userList = response.rows
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.scrapeMaterialId)
    },
    handleExport() {
      this.downloadPost('/material/scrape/export', { materialIds: this.ids }, `报废完成导出表${moment(new Date()).format('YYYY-MM-DD_HH_mm_ss')}.xlsx`)
      this.$refs.tableRef.clearSelection()
    },
    updatemaer(row) {
      const temp = Object.assign({}, row)
      console.log(temp)
      // const temp = row
      this.$modal.confirm('是否确认选择撤销报废物料编码为"' + row.materialNo + '"的数据项？').then(function() {
        return updateScrapea(temp)
      }).then(() => {
        this.$modal.msgSuccess('撤销报废成功')
        this.getList()
      }).catch(() => {
        this.$modal.msgSuccess('取消撤销报废')
      })
    }
  }
}
</script>
