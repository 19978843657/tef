<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="100px">
      <el-form-item label="物料" prop="materialNo">
        <el-input v-model="queryParams.materialNo" placeholder="请输入物料号"  size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="RFID类型" prop="rfidType">
        <el-select v-model="queryParams.rfidType" clearable placeholder="请选择" >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="物料详细编码" prop="materialDetailNo">
        <el-input v-model="queryParams.materialDetailNo" placeholder="请输入物料详细编码" clearable size="small"
          @keyup.enter.native="handleQuery" style="width: 240px"/>
      </el-form-item>

      <el-form-item label="库位信息" prop="storeInfo">
        <el-input v-model="queryParams.storeInfo" placeholder="请输入库位信息" clearable size="small"
                  @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="操作人员" prop="operationame">
        <el-select v-model="queryParams.operationame" placeholder="请选择操作人员" clearable>
          <el-option v-for="item in userList" :key="item.userId" :label="item.userName" :value="item.userName" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">库位精准搜索</el-button>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQueryb">库位模糊搜索</el-button>

        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-button v-hasPermi="['material:new_in:remove']" type="primary" plain icon="el-icon-check" size="mini"
        :disabled="multiple" @click="submitCheckForm">补打</el-button>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:base:import']"
          type="info"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:base:importTemplate']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleDoload"
        >下载导入模板</el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    </el-row>

    <el-table v-loading="loading" :data="list" @selection-change="handleSelectionChange" height="500px">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="出库物料ID" align="center" prop="putOutMaterialId" /> -->
      <el-table-column label="物料类型" align="center" prop="materialType">
        <template slot-scope="scope">
          {{ Constants.codeToName(scope.row.materialType, Constants.MATERIAL_TYPE) }}
        </template>
      </el-table-column>
      <el-table-column label="物料" align="center" prop="materialNo" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="物料描述" align="center" prop="materialDes" width="300" :show-overflow-tooltip="true" />
      <el-table-column label="物料详细编码" align="center" width="230" prop="materialDetailNo" />
      <el-table-column label="库位信息" align="center" prop="storeInfo" />
      <el-table-column label="历史库位信息" align="center" prop="storeNewInfo" width="150" :show-overflow-tooltip="true" />

      <el-table-column label="移动类型" align="center" prop="movingType" />
      <el-table-column label="RFID类型" align="center" prop="rfidType" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="存储位置" align="center" prop="storeLocation" />
      <el-table-column label="物料凭证" align="center" prop="materialRceipts" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="批次" align="center" prop="batch" />
      <el-table-column label="成本中心" align="center" prop="costCenter" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="采购订单" align="center" prop="poNo" width="150" :show-overflow-tooltip="true" />
      <el-table-column label="用户名" align="center" prop="userName" />
      <el-table-column label="更新时间" align="center" prop="updateDt" width="180" />
      <el-table-column label="上架时间" align="center" prop="inputRackDt" width="180" />
      <el-table-column label="物料状态" align="center" prop="materialStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.material_status" :value="scope.row.materialStatus" />
        </template>
      </el-table-column>
      <el-table-column label="确认数量" align="center" prop="confirmNumber" />
      <el-table-column label="操作人员" align="center" prop="operationame"width="340px"/>
      <el-table-column label="检验人员" align="center" prop="checkName"  width="200px"/>
      <el-table-column label="上架人员" align="center" prop="inputRackName" />
      <el-table-column label="订单编号" align="center" prop="orderNo" />
      <el-table-column label="出库方式" align="center" prop="putOutType" />
      <el-table-column label="备注" align="center" prop="remark" />
    </el-table>
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
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

  </div>
</template>

<script>
import Constants from '@/constants'
import { lista, checkat,listab } from '@/api/material/base/index'
import { listUser } from '@/api/system/user'
import StoreSelect from '@/components/shortcut/storeSelect'
import { getToken } from '@/utils/auth'

export default {
  name: 'call',
  components: {
    StoreSelect
  },
  dicts: ['material_input_type', 'material_status'],
  data() {
    return {
      options: [
        {
          value: 'RFID纸质标签',
        }, {
          value: 'RFID抗金属标签',
        }],value:'',
      Constants,
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 物料出库信息表格数据
      list: [],
      selection: {},
      chang: [],
      // 非多个禁用
      multiple: true,
      userList: [],

      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
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
        url: process.env.VUE_APP_BASE_API + '/material/base/importData'
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        operationame: null,
        storeInfo: null
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
      lista(this.queryParams).then(response => {
        this.list = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    getListb() {
      this.loading = true
      listab(this.queryParams).then(response => {
        this.list = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /** 补打按钮操作 */
    submitCheckForm(row) {
      const item = row.item || this.ids
      console.log(this.selection);
      checkat(this.selection).then(response => {
        this.$modal.msgSuccess('补打成功')
        this.openCheck = false
        this.getList()
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
    /** 搜索按钮操作 */
    handleQueryb() {
      this.queryParams.pageNum = 1
      this.getListb()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
      this.handleQueryb()
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = '总清单导入'

      this.upload.open = true
    },

    /** 下载导入模板按钮操作 */
    handleDoload() {
      this.download('/material/base/importTemplate', {}, `总清单入库导入表.xlsx`)
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selection = selection;
      this.selection = this.selection.map((item) => item);
      console.log(this.selection)
      // this.ids = selection.map(item => item.tempNewMaterialId)
      // this.materialNos = selection.map(item => item.materialNo)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },

    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit()
    }
  }
}
</script>
