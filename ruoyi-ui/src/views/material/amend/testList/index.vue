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
      <!-- <el-form-item label="录入时间">
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
      </el-form-item> -->
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

    <el-table v-loading="loading" :data="list">
      <el-table-column label="物料编码" align="center" prop="materialNo" />
      <el-table-column label="物料类型" align="center" prop="materialType">
        <template slot-scope="scope">
          {{ Constants.codeToName(scope.row.materialType, Constants.MATERIAL_TYPE) }}
        </template>
      </el-table-column>
      <el-table-column label="物料描述" align="center" prop="materialDes" />
      <el-table-column label="移动类型" align="center" prop="movingType" />
      <!-- <el-table-column label="RFID类型" align="center" prop="rfidType" /> -->
      <el-table-column label="存储位置" align="center" prop="storeLocation" />
      <el-table-column label="录入时间" align="center" prop="inputDt" width="180" />
      <el-table-column label="物料凭证" align="center" prop="materialRceipts" />
      <el-table-column label="批次" align="center" prop="batch" />
      <el-table-column label="成本中心" align="center" prop="costCenter" />
      <el-table-column label="采购订单" align="center" prop="poNo" />
      <el-table-column label="订单" align="center" prop="purchaseOrder" />

      <el-table-column label="用户名" align="center" prop="userName" />
      <el-table-column label="数量" align="center" prop="number" />

      <el-table-column label="物料状态" align="center" prop="materialStatus">
        <template slot-scope="scope">
          <!-- <dict-tag :options="dict.type.material_status" :value="scope.row.materialStatus" /> -->
          {{ Constants.codeToName(scope.row.materialStatus, materialStatusOptions) }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="库位信息" align="center" prop="storeInfo" />
      <el-table-column label="标识码" align="center" prop="uUid" />
      <el-table-column label="确认数量" align="center" prop="confirmNumber" /> -->
      <el-table-column label="操作人员" align="center" prop="operationame" />
      <el-table-column label="录入种类" align="center" prop="inputType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.material_input_type" :value="scope.row.inputType" />
        </template>
      </el-table-column>
      <el-table-column label="检验人员" align="center" prop="checkName"  width="200px"/>
      <el-table-column label="历史库位信息" align="center" prop="storeHistoryInfo" />
      <!-- <el-table-column label="上架人员" align="center" prop="inputRackName" />
      <el-table-column label="物料详细编码" align="center" prop="materialDetailNo" />
      <el-table-column label="检验时间" align="center" prop="checkDt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.checkDt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="本位币金额" align="center" prop="materialCost" />
      <el-table-column label="物料序列号" align="center" prop="materialSerialNo" />
      <el-table-column label="维修流程编号" align="center" prop="flowId" />
      <el-table-column label="区域" align="center" prop="areaNo" />
      <el-table-column label="工位" align="center" prop="localNo" />
      <el-table-column label="物料品牌及型号" align="center" prop="brandTypeNo" />
      <el-table-column label="物料资产编号" align="center" prop="propertyNo" />
      <el-table-column label="物料机床名称" align="center" prop="machineName" />
      <el-table-column label="故障部位及描述" align="center" prop="faultPositionDes" />
      <el-table-column label="仓库录入文员" align="center" prop="storageInputName" />
      <el-table-column label="仓库文员录入时间" align="center" prop="storageInputDt" width="180">
        <!-- <template slot-scope="scope">
          <span>{{ parseTime(scope.row.storageInputDt, '{y}-{m}-{d}') }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="紧急维修批准人员" align="center" prop="urgentApprovedName" />
      <el-table-column label="紧急维修批准时间" align="center" prop="urgentApprovedDt" width="180">
        <!-- <template slot-scope="scope">
          <span>{{ parseTime(scope.row.urgentApprovedDt, '{y}-{m}-{d}') }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="维修单凭证存储文件" align="center" prop="pathRceipts" />
      <el-table-column label="维修测试报告附件存储文件" align="center" prop="pathChecked" />
      <el-table-column label="维修人员" align="center" prop="maintenance" />
      <el-table-column label="维修时间" align="center" prop="maintenanceDt" width="180">
        <!-- <template slot-scope="scope">
          <span>{{ parseTime(scope.row.maintenanceDt, '{y}-{m}-{d}') }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="测试人员" align="center" prop="tester" />
      <el-table-column label="测试时间" align="center" prop="testDt" width="180">
        <!-- <template slot-scope="scope">
          <span>{{ parseTime(scope.row.testDt, '{y}-{m}-{d}') }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="200">
        <template slot-scope="scope">
          <!-- <el-button
            v-hasPermi="['material:flow:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleRepair(scope.row)"
          >维修</el-button>
          <el-button
            v-hasPermi="['material:flow:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleTest(scope.row)"
          >测试</el-button> -->
          <el-button
            v-hasPermi="['material:flow:edit']"
            size="mini"
            type="text"
            icon="el-icon-upload2"
            @click="handleUpload(scope.row)"
          >上传维修测试报告</el-button>
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

    <el-dialog :title="upload.title" :close-on-click-modal="false" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="6"
        accept=""
        multiple
        :headers="upload.headers"
        :action="upload.url + '?materialFlowId=' + upload.materialFlowId"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip text-center">
          <!-- <div slot="tip" class="el-upload__tip">
            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
          </div> -->
          <span>请上传10MB大小以下的文件</span>
          <!-- <span>仅允许导入xls、xlsx格式文件。</span> -->
          <!-- <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="handleDoload">下载模板</el-link> -->
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
import { testList, test, repair } from '@/api/material/amend/test'
import { listUser } from '@/api/system/user'

import StoreSelect from '@/components/shortcut/storeSelect'
import Constants from '@/constants'
import { getToken } from '@/utils/auth'

export default {
  name: 'AmendTestList',
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
      userList: [],
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 维修流程信息表格数据
      list: [],
      // 弹出层标题
      title: '',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        materialType: null,
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
        materialStatus: null,
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
        materialCost: null,
        purchaseOrder: null,
        materialSerialNo: null,
        flowId: null,
        areaNo: null,
        localNo: null,
        brandTypeNo: null,
        propertyNo: null,
        machineName: null,
        faultPositionDes: null,
        storageInputName: null,
        storageInputDt: null,
        urgentApprovedName: null,
        urgentApprovedDt: null,
        pathRceipts: null,
        pathChecked: null,
        maintenance: null,
        maintenanceDt: null,
        tester: null,
        testDt: null
      },
      materialStatusOptions: [
        // { code: 0, name: '录入' },
        { code: 1, name: '报废' },
        { code: 2, name: '维修' },
        { code: 3, name: '紧急维修' }
      ],
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: '',
        // 是否禁用上传
        isUploading: false,
        materialFlowId: null,
        headers: { Authorization: 'Bearer ' + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/material/amend_flow/uploadTestReport'
      }
    }
  },
  created() {
    this.getList()
    this.getUserList()
  },
  methods: {
    /** 查询维修流程信息列表 */
    getList() {
      this.loading = true
      testList(this.queryParams).then(response => {
        this.list = response.rows
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
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 确认操作 */
    handleRepair(row) {
      const temp = Object.assign({}, row)
      this.$modal.confirm(`是否确认维修`).then(function() {
        return repair(temp)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('操作成功')
      }).catch(() => {})
    },
    /** 确认操作 */
    handleTest(row) {
      const temp = Object.assign({}, row)
      this.$modal.confirm(`是否确认测试`).then(function() {
        return test(temp)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('操作成功')
      }).catch(() => {})
    },
    handleUpload(row) {
      this.upload.title = '上传维修测试报告'
      this.upload.open = true
      this.upload.materialFlowId = row.materialFlowId
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      console.log(response, 'responseresponse')
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
