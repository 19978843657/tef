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

      <el-form-item label="上架时间">
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
      <el-form-item label="操作人员" prop="operationame">
        <el-select v-model="queryParams.operationame" placeholder="请选择操作人员" clearable>
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

      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    </el-row>

    <el-table v-loading="loading" :data="outList" @selection-change="handleSelectionChange"  height="500px">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <!-- <el-table-column label="出库物料ID" align="center" prop="putOutMaterialId" /> -->
      <el-table-column label="物料类型" align="center" prop="materialType">
        <template slot-scope="scope">
          {{ Constants.codeToName(scope.row.materialType, Constants.MATERIAL_TYPE) }}
        </template>
      </el-table-column>
      <el-table-column label="物料" align="center" prop="materialNo" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="物料详细编码" align="center" prop="materialDetailNo" width="230" :show-overflow-tooltip="true" />
      <el-table-column label="物料描述" align="center" prop="materialDes" width="250" :show-overflow-tooltip="true" />
      <el-table-column label="物料状态" align="center" prop="materialStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.material_status" :value="scope.row.materialStatus" />
        </template>
      </el-table-column>
      <el-table-column label="库位信息" align="center" prop="storeInfo" />
      <el-table-column label="历史库位信息" align="center" prop="storeHistoryInfo" width="150" :show-overflow-tooltip="true" />

      <el-table-column label="移动类型" align="center" prop="movingType" />
      <el-table-column label="RFID类型" align="center" prop="rfidType"  width="150"/>
      <el-table-column label="存储位置" align="center" prop="storeLocation" />
      <el-table-column label="物料凭证" align="center" prop="materialRceipts" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="批次" align="center" prop="batch" />
      <el-table-column label="成本中心" align="center" prop="costCenter" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="采购订单" align="center" prop="poNo" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="用户名" align="center" prop="userName" />
      <el-table-column label="数量" align="center" prop="number" />
      <el-table-column label="上架时间" align="center" prop="inputRackDt" width="180" />

      <!-- <el-table-column label="标识码" align="center" prop="uUid" /> -->
      <el-table-column label="确认数量" align="center" prop="confirmNumber" />
      <el-table-column label="操作人员" align="center" prop="operationame" width="340px"/>
      <!-- <el-table-column label="录入种类" align="center" prop="inputType" /> -->
      <el-table-column label="检验人员" align="center" prop="checkName"  width="200px"/>
      <el-table-column label="上架人员" align="center" prop="inputRackName" />

      <el-table-column label="订单编号" align="center" prop="orderNo" />
      <el-table-column label="出库方式" align="center" prop="putOutType" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="100">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['material:move_storage:moveStorage']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleOutRack(scope.row)"
          >移库</el-button>
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

    <!-- 检验新件入库对话框 -->
    <el-dialog :title="title" :visible.sync="open" :close-on-click-modal="false" width="500px" append-to-body>
      <el-form ref="checkForm" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="物料" prop="materialNo">
          <el-input v-model="form.materialNo" disabled placeholder="请输入物料编码" />
        </el-form-item>
        <el-form-item label="库位信息" prop="storeInfo">
          <StoreSelect v-model="form.storeInfo" disabled />
        </el-form-item>
        <el-form-item label="新库位信息" prop="storeNewInfo">
          <StoreSelect v-model="form.storeNewInfo" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitCheckForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Constants from '@/constants'
import { list, moveStorage } from '@/api/material/moveStorage/moveStorage'
import { listUser } from '@/api/system/user'
import StoreSelect from '@/components/shortcut/storeSelect'

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
        operationame: null,
        storeInfo: null
      },
      form: {},
      // 表单校验
      rules: {
        materialNo: [
          { required: true, message: '物料编码不能为空', trigger: 'blur' }
        ],
        storeNewInfo: [
          { required: true, message: '库位信息不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getUserList()
  },
  methods: {
    /** 查询物料出库信息列表 */
    getList() {
      this.loading = true
      this.queryParams.inputRackDtStart = this.dateRange[0]
      this.queryParams.inputRackDtEnd = this.dateRange[1]
      list(this.queryParams).then(response => {
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
      this.ids = selection.map(item => item.moveMaterialId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleOutRack(row) {
      const temp = Object.assign({}, row)
      this.form = temp
      this.open = true
      this.title = '移库'
      // this.$modal.confirm('是否确认移库物料出库信息编号为"' + row.moveMaterialId + '"的数据项？').then(function() {
      //   return moveStorage(temp)
      // }).then(() => {
      //   this.$modal.msgSuccess('移库成功')
      //   this.getList()
      // }).catch(() => {
      //   this.$modal.msgSuccess('取消移库')
      // })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    reset() {
      this.form = {}
      this.resetForm('form')
    },
    /** 检验提交按钮 */
    submitCheckForm() {
      this.$refs['checkForm'].validate(valid => {
        if (valid) {
          this.form.materialStatus = 7
          if (this.form.moveMaterialId != null) {
            moveStorage(this.form).then(response => {
              this.$modal.msgSuccess('移库成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    }
  }
}
</script>
