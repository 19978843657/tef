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
      <el-form-item label="检验时间">
        <el-date-picker
          v-model="dateRange"
          style="width: 380px"
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
      <el-form-item label="检验人员" prop="checkName">
        <el-select v-model="queryParams.checkName" placeholder="请选择检验人员" clearable>
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

    <el-table v-loading="loading" :data="inList"  height="500px">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <!-- <el-table-column label="新件ID" align="center" prop="newMaterialId" /> -->
      <el-table-column label="物料" align="center" prop="materialNo" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="物料详细编码" align="center" prop="materialDetailNo" width="230" :show-overflow-tooltip="true" />

      <el-table-column label="物料描述" align="center" prop="materialDes" width="250" :show-overflow-tooltip="true" />
      <el-table-column label="移动类型" align="center" prop="movingType" width="150" :show-overflow-tooltip="true" />
      <!-- <el-table-column label="RFID类型" align="center" prop="rfidType" width="150" :show-overflow-tooltip="true" /> -->
      <el-table-column label="存储位置" align="center" prop="storeLocation" />
      <el-table-column label="历史库位信息" align="center" prop="storeHistoryInfo" width="150" :show-overflow-tooltip="true" />

      <el-table-column label="物料凭证" align="center" prop="materialRceipts" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="批次" align="center" prop="batch" />
      <el-table-column label="成本中心" align="center" prop="costCenter" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="采购订单" align="center" prop="poNo" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="订单" align="center" prop="purchaseOrder" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="用户名" align="center" prop="userName" />
      <!-- <el-table-column label="数量" align="center" prop="number" /> -->
      <el-table-column label="确认数量" align="center" prop="confirmNumber" />
      <el-table-column label="录入时间" align="center" prop="inputDt" width="180" />
      <el-table-column label="本位币金额" align="center" prop="materialCost" width="180" />
      <!-- <el-table-column label="更新时间" align="center" prop="updateDt" width="180" /> -->
      <!-- <el-table-column label="上架时间" align="center" prop="inputRackDt" width="180" /> -->
      <el-table-column label="物料状态" align="center" prop="materialStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.material_status" :value="scope.row.materialStatus" />
        </template>
      </el-table-column>
      <!-- <el-table-column label="库位信息" align="center" prop="storeInfo" /> -->
      <!-- <el-table-column label="标识码" align="center" prop="uUid" /> -->
      <el-table-column label="操作人员" align="center" prop="operationame" width="340px"/>
      <el-table-column label="录入种类" align="center" prop="inputType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.material_input_type" :value="scope.row.inputType" />
        </template>
      </el-table-column>
      <el-table-column label="检验人员" align="center" prop="checkName"  width="200px"/>
      <el-table-column label="检验时间" align="center" prop="checkDt" width="180" />
      <!-- <el-table-column label="上架人员" align="center" prop="inputRackName" /> -->
      <el-table-column label="备注" align="center" prop="remark" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['material:new_in:reCheck']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleRecheck(scope.row)"
          >重检</el-button>

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

    <!-- 添加或修改新件入库对话框 -->
    <el-dialog :title="title" :visible.sync="open" :close-on-click-modal="false" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="物料" prop="materialNo">
          <el-input v-model="form.materialNo" disabled placeholder="请输入物料编码" />
        </el-form-item>
        <!-- <el-form-item label="物料描述" prop="materialDes">
          <el-input v-model="form.materialDes" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="存储位置" prop="storeLocation">
          <el-input v-model="form.storeLocation" placeholder="请输入存储位置" />
        </el-form-item>
        <el-form-item label="物料凭证" prop="materialRceipts">
          <el-input v-model="form.materialRceipts" placeholder="请输入物料凭证" />
        </el-form-item>
        <el-form-item label="批次" prop="batch">
          <el-input v-model="form.batch" placeholder="请输入批次" />
        </el-form-item>
        <el-form-item label="成本中心" prop="costCenter">
          <el-input v-model="form.costCenter" placeholder="请输入成本中心" />
        </el-form-item>
        <el-form-item label="采购订单" prop="poNo">
          <el-input v-model="form.poNo" placeholder="请输入采购订单" />
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户名" />
        </el-form-item> -->
        <!-- <el-form-item label="数量" prop="number">
          <el-input v-model="form.number" type="number" disabled placeholder="请输入数量" />
        </el-form-item> -->
        <!-- <el-form-item label="录入时间" prop="inputDt">
          <el-date-picker
            v-model="form.inputDt"
            clearable
            size="small"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择录入时间"
          />
        </el-form-item>
        <el-form-item label="更新时间" prop="updateDt">
          <el-date-picker
            v-model="form.updateDt"
            clearable
            size="small"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择更新时间"
          />
        </el-form-item>
        <el-form-item label="上架时间" prop="inputRackDt">
          <el-date-picker
            v-model="form.inputRackDt"
            clearable
            size="small"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择上架时间"
          />
        </el-form-item>
        <el-form-item label="库位信息" prop="storeInfo">
          <el-input v-model="form.storeInfo" placeholder="请输入库位信息" />
        </el-form-item>
        <el-form-item label="标识码" prop="uUid">
          <el-input v-model="form.uUid" placeholder="请输入标识码" />
        </el-form-item> -->
        <!-- <el-form-item label="确认数量" prop="confirmNumber">
          <el-input-number v-model="form.confirmNumber" :min="1" placeholder="请输入确认数量" />
        </el-form-item> -->
        <!-- <el-form-item label="操作人员" prop="operationame">
          <el-input v-model="form.operationame" placeholder="请输入操作人员" />
        </el-form-item>
        <el-form-item label="检验人员" prop="checkName">
          <el-input v-model="form.checkName" placeholder="请输入检验人员" />
        </el-form-item>
        <el-form-item label="历史库位信息" prop="storeHistoryInfo">
          <el-input v-model="form.storeHistoryInfo" placeholder="请输入历史库位信息" />
        </el-form-item>
        <el-form-item label="上架人员" prop="inputRackName">
          <el-input v-model="form.inputRackName" placeholder="请输入上架人员" />
        </el-form-item>
        <el-form-item label="物料详细编码" prop="materialDetailNo">
          <el-input v-model="form.materialDetailNo" placeholder="请输入物料详细编码" />
        </el-form-item>
        <el-form-item label="检验时间" prop="checkDt">
          <el-date-picker
            v-model="form.checkDt"
            clearable
            size="small"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择检验时间"
          />
        </el-form-item> -->
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reCheckList, reCheck } from '@/api/material/newIn/reCheck'
import StoreSelect from '@/components/shortcut/storeSelect'

import { listUser } from '@/api/system/user'

export default {
  name: 'In',
  components: {
    StoreSelect
  },
  dicts: ['material_input_type', 'material_status'],
  data() {
    return {
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
      // 新件入库表格数据
      inList: [],
      dateRange: [],
      userList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        materialStatus: 3,
        storeInfo: null,
        operationame: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        confirmNumber: [
          { required: true, message: '确认数量不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getUserList()
  },
  methods: {
    /** 查询新件入库列表 */
    getList() {
      this.loading = true
      this.queryParams.checkDtStart = this.dateRange[0]
      this.queryParams.checkDtEnd = this.dateRange[1]
      reCheckList(this.queryParams).then(response => {
        this.inList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    getUserList() {
      listUser({ page: 1, size: 100000 }).then(response => {
        this.userList = response.rows
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        newMaterialId: null,
        materialNo: null,
        materialDes: null,
        movingType: null,
        rfidType: null,
        storeLocation: null,
        materialRceipts: null,
        batch: null,
        costCenter: null,
        poNo: null,
        userName: null,
        number: null,
        inputDt: null,
        updateDt: null,
        inputRackDt: null,
        materialStatus: 0,
        storeInfo: null,
        uUid: null,
        confirmNumber: null,
        operationame: null,
        inputType: null,
        checkName: null,
        storeHistoryInfo: null,
        inputRackName: null,
        materialDetailNo: null,
        checkDt: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      }
      this.resetForm('form')
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
    /** 重检按钮操作 */
    handleRecheck(row) {
      this.form = Object.assign({}, row)
      this.open = true
      this.title = '重检'
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.newMaterialId != null) {
            reCheck(this.form).then(response => {
              this.$modal.msgSuccess('重检成功')
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
