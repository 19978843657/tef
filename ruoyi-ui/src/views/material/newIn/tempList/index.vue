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
      <el-form-item label="录入时间">
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
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          v-hasPermi="['material:new_in:add']"-->
<!--          type="primary"-->
<!--          plain-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:new_in:remove']"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >批量删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:new_in:import']"
          type="info"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:new_in:importTemplate']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleDoload"
        >下载导入模板</el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    </el-row>

    <el-table v-loading="loading" :data="tempList" @selection-change="handleSelectionChange" height="500px">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="物料id" align="center" prop="tempNewMaterialId" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="物料" align="center" prop="materialNo" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="物料描述" align="center" prop="materialDes" width="300" :show-overflow-tooltip="true" />
      <el-table-column label="移动类型" align="center" prop="movingType" />
      <el-table-column label="RFID类型" align="center" prop="rfidType" width="150"/>
      <el-table-column label="存储位置" align="center" prop="storeLocation" />
      <el-table-column label="物料凭证" align="center" prop="materialRceipts" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="批次" align="center" prop="batch" />
      <el-table-column label="成本中心" align="center" prop="costCenter" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="采购订单" align="center" prop="poNo" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="订单" align="center" prop="purchaseOrder" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="用户名" align="center" prop="userName" />
      <el-table-column label="数量" align="center" prop="number" />
      <el-table-column label="确认数量" align="center" prop="confirmNumber" width="200">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.confirmNumber" :min="1" :disabled="scope.row.disabled" type="number" size="mini" placeholder="请输入数量" style="width: 100px; margin-right: 5px;" /><el-button v-hasPermi="['material:new_in:check']" type="primary" size="mini" @click="handleConfirm(scope.row)">{{ scope.row.disabled ? '检验':'确认' }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="录入时间" align="center" prop="inputDt" width="180" />
      <el-table-column label="本位币金额" align="center" prop="materialCost" width="180" />
      <el-table-column label="操作人员" align="center" prop="operationame" width="340px"/>
      <el-table-column label="录入种类" align="center" prop="inputType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.material_input_type" :value="scope.row.inputType" />
        </template>
      </el-table-column>
      <el-table-column label="物料状态" align="center" prop="materialStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.material_status" :value="scope.row.materialStatus" />
        </template>
      </el-table-column>
<!--      <el-table-column label="历史库位信息" align="center" prop="storeNewInfo" width="150" :show-overflow-tooltip="true" />-->
      <el-table-column label="备注" align="center" prop="remark" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.materialStatus === 0"
            v-hasPermi="['material:new_in:check']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleCheck(scope.row)"
          >检验</el-button>
          <el-button
            v-hasPermi="['material:new_in:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['material:new_in:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
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
          <el-input v-model="form.materialNo"  placeholder="请输入物料编码"  />
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input-number v-model="form.number" :min="1" placeholder="请输入数量" />
        </el-form-item>

<!--        <el-form-item label="库位信息" prop="storeInfo">-->
<!--          <StoreSelect v-model="form.storeInfo" />-->
<!--        </el-form-item>-->
        <el-form-item label="物料描述" prop="materialDes">
          <el-input v-model="form.materialDes" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="移动类型" prop="movingType">
          <el-input v-model="form.movingType" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="RFID类型" prop="rfidType">
          <el-select v-model="form.rfidType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
<!--          <el-input v-model="form.rfidType"  type="text" placeholder="请输入物料编码获取类型" readonly/>-->
        </el-form-item>
<!--        <el-form-item label="存储位置" prop="storeLocation">-->
<!--          <el-input v-model="form.storeLocation" placeholder="请输入存储位置" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="物料凭证" prop="materialRceipts">-->
<!--          <el-input v-model="form.materialRceipts" placeholder="请输入物料凭证" />-->
<!--        </el-form-item>-->
        <el-form-item label="批次" prop="batch">
          <el-input v-model="form.batch" placeholder="请输入批次" />
        </el-form-item>

<!--        <el-form-item label="成本中心" prop="costCenter">-->
<!--          <el-input v-model="form.costCenter" placeholder="请输入成本中心" />-->
<!--        </el-form-item>-->
        <el-form-item label="采购订单" prop="poNo">
          <el-input v-model="form.poNo" placeholder="请输入采购订单" />
        </el-form-item>
        <el-form-item label="本位币金额" prop="materialCost">
          <el-input v-model="form.materialCost" placeholder="请输入本位币金额" />
        </el-form-item>
<!--        <el-form-item label="用户名" prop="userName">-->
<!--          <el-input v-model="form.userName" placeholder="请输入用户名" />-->
<!--        </el-form-item>-->

<!--        <el-form-item label="备注" prop="remark">-->
<!--          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 检验新件入库对话框 -->
    <el-dialog :title="title" :visible.sync="openCheck" width="500px" :close-on-click-modal="false" append-to-body>
      <el-form ref="checkForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="物料" prop="materialNo">
          <el-input v-model="form.materialNo" disabled placeholder="请输入物料编码" />
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input v-model="form.number" type="number" disabled placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="确认数量" prop="confirmNumber">
          <el-input-number v-model="form.confirmNumber" :min="1" placeholder="请输入确认数量" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitCheckForm" :loading="loadin">合 格</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 用户导入对话框 -->
      <el-dialog :title="upload.title" :close-on-click-modal="false" :visible.sync="upload.open" width="400px" append-to-body>
        <el-upload
          ref="upload"
          :limit="1"
          accept=".xlsx, .xls"
          :headers="upload.headers"
          :action="upload.url + '?updateSupport=' + upload.updateSupport"
          :disabled="upload.isUploading"
          :on-progress="handleFileUploadProgress"
          :on-success="handleFileSuccess"
          :auto-upload="false"
          drag
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip text-center">
            <div slot="tip" class="el-upload__tip">
              <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
            </div>
            <span>仅允许导入xls、xlsx格式文件。</span>
            <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="handleDoload">下载模板</el-link>
          </div>
        </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button v-loading.fullscreen.lock="upload.isUploading" type="primary" :loading="upload.isUploading" @click="submitFileForm">确 定</el-button>
        <el-button :loading="upload.isUploading" @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listTemp, getTemp, delTemp, addTemp, updateTemp, check } from '@/api/material/newIn/temp'
import { listUser } from '@/api/system/user'
import { getRfidtype, listRfid } from '@/api/basic/rfidTypeManage'
import { getToken } from '@/utils/auth'

// import StoreSelect from '@/components/shortcut/storeSelect'

export default {
  name: 'Temp',
  // components: {
  //   StoreSelect
  // },
  dicts: ['material_input_type', 'material_status'],
  data() {
    return {
      options: [{
        value: 'RFID纸质标签',
      }, {
        value: 'RFID抗金属标签',
      }],
      value: '',
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      materialNos: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      loadin:false,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 新件入库表格数据
      tempList: [],
      dateRange: [],
      userList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 是否显示检验弹出层
      openCheck: false,
      // 是否显示导入弹出层
      openImport: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        inputDt: null,
        inputDtStart: null,
        inputDtEnd: null,
        storeInfo: null,
        operationame: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        materialNo: [
          { required: true, message: '物料编码不能为空', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '数量不能为空', trigger: 'blur' }
        ]
        // storeInfo: [
        //   { required: true, message: '库位信息不能为空', trigger: 'blur' }
        // ]
      },
      fileList: [],
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: '',
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: 'Bearer ' + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/material/new_in/importData'
      }
    }
  },
  created() {
    this.getList()
    this.getUserList()
  },
  methods: {
    /** 根据物料查询rfid类型 */
    // blur(){
    //   if(this.form.materialNo!="" && this.form.materialNo!=null){
    //     // console.log(this.form.materialNo);
    //     getRfidtype(this.form.materialNo).then(response => {
    //       // console.log("3333333333333333");
    //
    //       if(response.data!=""&&response.data!=null){
    //     console.log("3333333333333333");
    //     this.form.rfidType=response.data.rfidType;
    //     console.log(response.data);
    //       }
    //   })
    //   }
    //
    // },
    /** 查询新件入库列表 */
    getList() {
      this.loading = true
      this.queryParams.inputDtStart = this.dateRange[0]
      this.queryParams.inputDtEnd = this.dateRange[1]
      listTemp(this.queryParams).then(response => {
        this.tempList = response.rows.map(item => {
          return {
            ...item,
            confirmNumber: item.confirmNumber ? item.confirmNumber : item.number,
            disabled: true
          }
        })
        console.log(this.tempList)
        this.total = response.total
        this.loading = false
      })
    },
    getUserList() {
      listUser({ page: 1, size: 100 }).then(response => {
        this.userList = response.rows
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.openCheck = false
      this.openImport = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        tempNewMaterialId: null,
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
        uid: null,
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
      this.queryParams.pageSize = 10
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
      this.ids = selection.map(item => item.tempNewMaterialId)
      this.materialNos = selection.map(item => item.materialNo)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加新件入库'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const tempNewMaterialId = row.tempNewMaterialId || this.ids
      getTemp(tempNewMaterialId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改新件入库'
      })
    },
    /** 检验按钮操作 */
    handleCheck(row) {
      const tempNewMaterialId = row.tempNewMaterialId || this.ids
      getTemp(tempNewMaterialId).then(response => {
        this.form = {
          ...response.data,
          confirmNumber: response.data.confirmNumber ? response.data.confirmNumber : response.data.number
        }
        this.openCheck = true
        this.title = '检验'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.tempNewMaterialId != null) {
            updateTemp(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addTemp(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 检验提交按钮 */
    submitCheckForm() {
      this.loadin=true
      this.$refs['checkForm'].validate(valid => {
        if (valid) {
          this.form.materialStatus = 1
          if (this.form.tempNewMaterialId != null) {
            check(this.form).then(response => {

              this.$modal.msgSuccess('检验成功')
              this.loadin=false
              this.openCheck = false
              this.getList()
            })
          }
        }
      })
    },
    handleConfirm(row) {
      if (row.disabled) {
        row.disabled = false
        return
      }
      if (!row.confirmNumber) {
        this.$message.warning('请填写确认数量')
      } else {
        const temp = Object.assign({}, row)
        temp.materialStatus = 1
        if (temp != null) {
          check(temp).then(response => {
            this.$modal.msgSuccess('检验成功')
            this.getList()
          })
        }
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const tempNewMaterialIds = row.tempNewMaterialId || this.ids
      const materialNos = row.materialNo || this.materialNos
      this.$modal.confirm('是否确认删除新件入库物料编码为"' + materialNos + '"的数据项？').then(function() {
        return delTemp(tempNewMaterialIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {})
    },

    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = '新件入库导入'

      this.upload.open = true
    },
    /** 下载导入模板按钮操作 */
    handleDoload() {
      this.download('/material/new_in/importTemplate', {}, `新件入库导入表.xlsx`)
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + '</div>', '导入结果', { dangerouslyUseHTMLString: true })
      this.getList()
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit()
    }
  }
}
</script>
