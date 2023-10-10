<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="物料详细编码" prop="materialDetailNo">
        <el-input v-model="queryParams.materialDetailNo" placeholder="请输入物料详细编码" clearable size="small"
          @keyup.enter.native="handleQuery" style="width: 240px"/>
      </el-form-item>
      <el-form-item label="库位信息" prop="storeInfo">
        <el-input v-model="queryParams.storeInfo" placeholder="请输入库位信息" clearable size="small"
                  @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="盘库时间">
        <el-date-picker v-model="dateRange" style="width: 380px;" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange"
          range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
      </el-form-item>
      <el-form-item label="盘库人员" prop="takingName">
        <el-select v-model="queryParams.takingName" placeholder="请选择操作人员" clearable>
          <el-option v-for="item in userList" :key="item.userId" :label="item.userName" :value="item.userName" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
      <el-button v-hasPermi="['material:new_in:blindiscs']" type="info" plain icon="el-icon-upload2" size="mini"
        @click="dialogFormVisible = true">导入参照盲盘</el-button>
        <el-button v-hasPermi="['material:new_in:blindisou']" type="info" plain icon="el-icon-upload2" size="mini"
        @click="dialogFormVisibl = true">盲盘参照导入</el-button>
    </el-row>
    <el-col :span="1.5">
      <el-button v-hasPermi="['material:new_in:import']" type="info" plain icon="el-icon-upload2" size="mini"
                 @click="handleImport">导入</el-button>
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
    <el-col :span="1.5">
      <el-button
        type="warning"
        plain
        icon="el-icon-download"
        size="mini"
        @click="handleExport"
        v-hasPermi="['material:materiallibrary:export']"
      >导出</el-button>
    </el-col>
    <el-dialog title="导入参照盲盘" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        选择导入日期：
<!--        <el-date-picker v-model="form.takingDt" type="date" placeholder="选择导入日期" value-format="yyyy-MM-dd">-->
<!--        </el-date-picker>-->
        <el-select v-model="form.takingDt" placeholder="选择导入日期" clearable>
          <el-option
            v-for="(item,index) in takingListfg"
            :key="index"
            :label="item.takingDt"
            :value="item.takingDt"
          />
        </el-select>
        </el-form>
        选择盲盘日期：
      <el-select v-model="form.stakingDt" placeholder="选择盲盘日期" clearable>
        <el-option
          v-for="(item,index) in sourcesList"
          :key="index"
          :label="item.dtTakingdt"
          :value="item.dtTakingdt"
        />
      </el-select>
        <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="blind">确 定</el-button>
  </div>
    </el-dialog>
    <el-dialog title="盲盘参照导入" :visible.sync="dialogFormVisibl">
      <el-form :model="fora">
        选择盲盘日期：
<!--        <el-date-picker v-model="fora.stakingDt" type="date" placeholder="选择盲盘日期" value-format="yyyy-MM-dd">-->
          <el-select v-model="fora.stakingDt" placeholder="选择盲盘日期" clearable>
            <el-option
              v-for="(item,index) in sourcesList"
              :key="index"
              :label="item.dtTakingdt"
              :value="item.dtTakingdt"
            />
          </el-select>
<!--&lt;!&ndash;        </el-date-picker>&ndash;&gt;-->
        选择导入日期：
<!--        <el-date-picker v-model="fora.takingDt" type="date" placeholder="选择导入日期" value-format="yyyy-MM-dd">-->
          <el-select v-model="fora.takingDt" placeholder="选择导入日期" clearable>
            <el-option
              v-for="(item,index) in takingListfg"
              :key="index"
              :label="item.takingDt"
              :value="item.takingDt"
            />
          </el-select>
<!--        </el-date-picker>-->
        </el-form>

        <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibl = false">取 消</el-button>
    <el-button type="primary" @click="blindsou">确 定</el-button>
  </div>

    </el-dialog>
    <el-table v-loading="loading" :data="takingList" @selection-change="handleSelectionChange"  height="500px">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <!-- <el-table-column label="移库物料ID" align="center" prop="takingMaterialId" /> -->
      <!-- <el-table-column label="物料详细编码" align="center" prop="materialDetailNo" /> -->
      <el-table-column label="盘库时间" align="center" prop="takingDt" width="180" />
      <el-table-column label="盘库人员" align="center" prop="takingkName" />

      <!-- <el-table-column label="物料类型" align="center" prop="materialType">
        <template slot-scope="scope">
          {{ Constants.codeToName(scope.row.materialType, Constants.MATERIAL_TYPE) }}
        </template>
      </el-table-column> -->
      <el-table-column label="物料" align="center" prop="materialNo" width="150" :show-overflow-tooltip="true" />
      <!-- <el-table-column label="物料描述" align="center" prop="materialDes" width="150" :show-overflow-tooltip="true" /> -->
      <!-- <el-table-column label="库位信息" align="center" prop="storeInfo" />
      <el-table-column label="历史库位信息" align="center" prop="storeHistoryInfo" width="150" :show-overflow-tooltip="true" />

      <el-table-column label="移动类型" align="center" prop="movingType" />
      <el-table-column label="RFID类型" align="center" prop="rfidType" />
      <el-table-column label="存储位置" align="center" prop="storeLocation" />
      <el-table-column label="物料凭证" align="center" prop="materialRceipts" width="150" :show-overflow-tooltip="true" /> -->

      <!-- <el-table-column label="成本中心" align="center" prop="costCenter" width="150" :show-overflow-tooltip="true" /> -->
      <!-- <el-table-column label="采购订单" align="center" prop="poNo" width="150" :show-overflow-tooltip="true" /> -->
      <!-- <el-table-column label="用户名" align="center" prop="userName" /> -->
      <el-table-column label="导入数量" align="center" prop="totalstock" />
      <el-table-column label="盲盘数量" align="center" prop="stotalstock" width="180" />
      <el-table-column label="盲盘时间" align="center" prop="stakingDt" />
      <!-- <el-table-column label="更新时间" align="center" prop="updateDt" width="180" />
      <el-table-column label="上架时间" align="center" prop="inputRackDt" width="180" />
      <el-table-column label="物料状态" align="center" prop="materialStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.material_status" :value="scope.row.materialStatus" />
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="标识码" align="center" prop="uUid" /> -->
      <!-- <el-table-column label="确认数量" align="center" prop="confirmNumber" />
      <el-table-column label="操作人员" align="center" prop="operationame" /> -->
      <!-- <el-table-column label="录入种类" align="center" prop="inputType" /> -->
      <!-- <el-table-column label="检验人员" align="center" prop="checkName"  width="200px"/>
      <el-table-column label="上架人员" align="center" prop="inputRackName" /> -->
      <!-- <el-table-column label="物料详细编码" align="center" prop="materialDetailNo" width="150" :show-overflow-tooltip="true" /> -->
      <!-- <el-table-column label="检验时间" align="center" prop="checkDt" width="180" /> -->
      <!-- <el-table-column label="下架人员" align="center" prop="outRackName" /> -->
      <!-- <el-table-column label="下架时间" align="center" prop="outRackDt" width="180" /> -->
      <!-- <el-table-column label="订单编号" align="center" prop="orderNo" />
      <el-table-column label="出库方式" align="center" prop="putOutType" />
      <el-table-column label="备注" align="center" prop="remark" /> -->
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
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
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"
                   @click="handleDoload">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button v-loading.fullscreen.lock="upload.isUploading" type="primary" :loading="upload.isUploading"
                   @click="submitFileForm">确 定</el-button>
        <el-button :loading="upload.isUploading" @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Constants from '@/constants'
import { listTaking, blindiscs,blindiso,listSourc,listat } from '@/api/material/taking/taking'
import { listUser } from '@/api/system/user'
import StoreSelect from '@/components/shortcut/storeSelect'
import { getToken } from '@/utils/auth'

export default {
  name: 'Taking',
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
      form:{},
      fora:{
        date:''
      },
      // 盘库信息表格数据
      takingList: [],
      dateRange: [],
      // 是否显示导入弹出层
      openCheck: false,
      userList: [],
      takingLista: [],
      sourcesList: [],
      taking: [],
      takingListfg: [],
      dialogFormVisible: false,
      dialogFormVisibl: false,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        storeInfo: null,
        materialDetailNo: null,
        takingDt: null,
        takingName: null
      },
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
        url: process.env.VUE_APP_BASE_API + '/material/taking/importDat'
      }
    }
  },
  created() {
    this.getList()
    this.getListata()
    this.getUserList()
    this.getlistat()
    this.getListtas()
  },
  methods: {
    /** 查询盘库信息列表 */
    getList() {
      this.loading = true
      this.queryParams.takingDtStart = this.dateRange[0]
      this.queryParams.takingDtEnd = this.dateRange[1]
      listTaking(this.queryParams).then(response => {
        this.takingList = response.rows
        console.log("********************")
        console.log(this.takingList)
        this.loading = false
      })
    },
    getListata() {
      listat(this.queryParams).then(response => {
        this.takingListfg = response.data
        console.log("***********************************")
        console.log(this.takingListfg)
        this.loading = false
      })
    },
    /** 查询导入日期 */
    getListtas() {
      listTaking(this.queryParams).then(response => {
        this.takingLista = response.rows
        console.log("********************")
        console.log(this.takingList)
        this.total = response.total
        this.loading = false
      })
    },
    getUserList() {
      listUser({ page: 1, size: 100000 }).then(response => {
        this.userList = response.rows
      })
    },
    /** 查询盘库-源列表 */
    getlistat() {
      this.loading = true;
      listSourc(this.queryParams).then(response => {
        this.sourcesList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    blind() {
      // console.log(this.form.date + "选择的日期")
      blindiscs(this.form).then(response => {
        this.$modal.msgSuccess('导入参照盲盘参数成功')
        this.takingList = response.rows
        // if(response.rows.bMaterialbindstatus==0){
        //   this.takingList.bMaterialbindstatus=='绑定'
        // }else{
        //   this.takingList.bMaterialbindstatus=='解绑'
        // }
        console.log(response)
        console.log("下面是选择的日期")
        console.log(this.takingList)
        this.loading = false
        this.dialogFormVisible = false
      })
    },
    blindsou(){
      // console.log(this.fora.date + "选择的日期")
      blindiso(this.fora).then(response => {
        this.$modal.msgSuccess('盲盘参照导入成功')
        this.takingList = response.rows
        this.loading = false
        this.dialogFormVisibl = false
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    // 取消按钮
    cancel() {
      this.openCheck = false
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []

      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = '盲盘导入'
      this.upload.open = true
    },
    /** 下载导入模板按钮操作 */
    handleDoload() {
      this.download('/material/taking/importTemplate', {}, `sap导入表.xlsx`)
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.takingMaterialId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
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
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('material/taking/expor', {
        ...this.queryParams
      }, `差异表_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
