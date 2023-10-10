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
      <el-table-column label="物料" align="center" prop="materialNo" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="物料详细编码" align="center" prop="materialDetailNo" width="230" :show-overflow-tooltip="true" />

      <el-table-column label="物料描述" align="center" prop="materialDes" width="250" :show-overflow-tooltip="true" />
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
      <el-table-column label="数量" align="center" prop="confirmNumber" />
      <el-table-column label="申请人" align="center" prop="applicant" />
      <el-table-column label="录入时间" align="center" prop="inputDt" width="180" />
      <el-table-column label="更新时间" align="center" prop="updateDt" width="180" />
      <el-table-column label="物料状态" align="center" prop="materialStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.material_status" :value="scope.row.materialStatus" />
        </template>
      </el-table-column>
      <el-table-column label="操作人员" align="center" prop="operationame" width="340px"/>
      <el-table-column label="录入种类" align="center" prop="inputType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.material_input_type" :value="scope.row.inputType" />
        </template>
      </el-table-column>
      <el-table-column label="检验人员" align="center" prop="checkName"  width="200px"/>
      <el-table-column label="检验时间" align="center" prop="checkDt" width="180" />
      <el-table-column label="备注" align="center" prop="remark" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['material:zero_in:rack']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleRack(scope.row)"
          >上架</el-button>

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

    <!-- 添加或修改零价值入库对话框 -->
    <el-dialog :title="title" :visible.sync="open" :close-on-click-modal="false" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="物料" prop="materialNo">
          <el-input v-model="form.materialNo" disabled placeholder="请输入物料编码" />
        </el-form-item>

        <el-form-item label="库位信息" prop="storeInfo">
          <StoreSelect v-model="form.storeInfo" />

        </el-form-item>
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
import { rackList, rack } from '@/api/material/zeroIn/rack'
import { listUser } from '@/api/system/user'
import StoreSelect from '@/components/shortcut/storeSelect'

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
      // 零价值入库表格数据
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
        pageSize: 10,
        materialStatus: 1,
        checkDtStart: null,
        checkDtEnd: null,
        storeInfo: null,
        operationame: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        storeInfo: [
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
    /** 查询零价值入库列表 */
    getList() {
      this.loading = true
      this.queryParams.checkDtStart = this.dateRange[0]
      this.queryParams.checkDtEnd = this.dateRange[1]
      rackList(this.queryParams).then(response => {
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
        zeroMaterialId: null,
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
      this.queryParams.pageNum = 1
      this.queryParams.pageSize = 10
      this.dateRange = []

      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 上架按钮操作 */
    handleRack(row) {
      this.form = Object.assign({}, row)
      this.open = true
      this.title = '上架'
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.zeroMaterialId != null) {
            rack(this.form).then(response => {
              this.$modal.msgSuccess('上架成功')
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
