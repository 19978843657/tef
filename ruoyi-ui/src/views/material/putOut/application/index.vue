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
        <!-- <el-form-item label="物料详细编码" prop="materialDetailNo" label-width="110px">
          <el-input
            v-model="queryParams.materialDetailNo"
            placeholder="请输入物料详细编码"
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
        </el-form-item> -->

        <el-form-item label="操作人员" prop="name">
          <el-select v-model="queryParams.name" placeholder="请选择操作人员" clearable>
            <el-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.userName"
              :value="item.userName"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search"  @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh"  @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb8">

        <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
      </el-row>

      <el-table v-loading="loading" :data="outList" @selection-change="handleSelectionChange"  height="500px">
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <!-- <el-table-column label="出库物料ID" align="center" prop="putOutMaterialId" /> -->

        <!-- <el-table-column label="物料类型" align="center" prop="materialType"> -->
            <!-- <template slot-scope="scope">
              {{ Constants.codeToName(scope.row.materialType, Constants.MATERIAL_TYPE) }}
            </template>
          </el-table-column> -->
        <el-table-column label="物料" align="center" prop="materialNo" width="150" :show-overflow-tooltip="true" />
        <!-- <el-table-column label="物料详细编码" align="center" prop="materialDetailNo" width="230" :show-overflow-tooltip="true" /> -->
        <el-table-column label="物料描述" align="center" prop="materialDes" width="250" :show-overflow-tooltip="true" />
        <!-- <el-table-column label="库位信息" align="center" prop="storeInfo" /> -->
        <!-- <el-table-column label="历史库位信息" align="center" prop="storeHistoryInfo" width="150" :show-overflow-tooltip="true" /> -->

        <!-- <el-table-column label="移动类型" align="center" prop="movingType" /> -->
        <el-table-column label="RFID类型" align="center" prop="rfidType" width="150"/>
        <!-- <el-table-column label="存储位置" align="center" prop="storeLocation" /> -->
        <!-- <el-table-column label="物料凭证" align="center" prop="materialRceipts" width="150" :show-overflow-tooltip="true" /> -->
        <el-table-column label="批次" align="center" prop="batch" />
        <el-table-column label="申请单号" align="center" prop="requestNo" width="150" :show-overflow-tooltip="true" />
        <el-table-column label="申请单操作员" align="center" prop="name" width="150" :show-overflow-tooltip="true" />
        <!-- <el-table-column label="成本中心" align="center" prop="costCenter" width="150" :show-overflow-tooltip="true" /> -->
        <!-- <el-table-column label="采购订单" align="center" prop="poNo" width="150" :show-overflow-tooltip="true" /> -->
        <!-- <el-table-column label="用户名" align="center" prop="userName" /> -->
        <el-table-column label="数量" align="center" prop="confirmNumber" />
        <!-- <el-table-column label="录入时间" align="center" prop="inputDt" width="180" /> -->
        <!-- <el-table-column label="更新时间" align="center" prop="updateDt" width="180" /> -->
        <!-- <el-table-column label="上架时间" align="center" prop="inputRackDt" width="180" /> -->
        <el-table-column label="申请状态" align="center" prop="applyStatus" width="150" :show-overflow-tooltip="true" />

        <!-- <el-table-column label="申请状态" align="center" prop="materialStatus">
          <template slot-scope="scope">
            <dict-tag  :value="scope.row.apply_status" />
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="标识码" align="center" prop="uUid" /> -->
        <!-- <el-table-column label="确认数量" align="center" prop="confirmNumber" /> -->
        <!-- <el-table-column label="操作人员" align="center" prop="operationame" /> -->
        <!-- <el-table-column label="录入种类" align="center" prop="inputType" /> -->
        <!-- <el-table-column label="检验人员" align="center" prop="checkName"  width="200px"/> -->
        <!-- <el-table-column label="上架人员" align="center" prop="inputRackName" /> -->
        <!-- <el-table-column label="检验时间" align="center" prop="checkDt" width="180" /> -->
        <!-- <el-table-column label="下架人员" align="center" prop="outRackName" /> -->
        <!-- <el-table-column label="下架时间" align="center" prop="outRackDt" width="180" /> -->
        <!-- <el-table-column label="订单编号" align="center" prop="orderNo" /> -->
        <!-- <el-table-column label="出库方式" align="center" prop="putOutType" /> -->
        <el-table-column label="备注" align="center" prop="remark" />
        <!-- <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="200">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['material:put_out:handPutOut']"
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handelEdit(scope.row)"
            >选择出库</el-button>
          </template>
        </el-table-column> -->
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
  import { listOut, handPutOut } from '@/api/material/outPut/temp'
  import{list}from '@/api/material/outPut/apply'
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
        materialNos: [],
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
          pageSize: 20,
          name: null,
          storeInfo: null,
          materialDetailNo:null
        }

      }
    },
    mounted() {
      // console.log(this.$route.params.param)
      this.queryParams.putOutType = this.$route.params.param

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
          // console.log(response,'1111111111');
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
      // handleSelectionChange(selection) {
      //   this.ids = selection.map(item => item.putOutMaterialId)
      //   this.materialNos = selection.map(item => item.materialNo)
      //   this.single = selection.length !== 1
      //   this.multiple = !selection.length
      // },
      /** 导入按钮操作 */
      // handleImport() {
      //   this.upload.title = '待出库导入'

      //   this.upload.open = true
      // },
      /** 下载导入模板按钮操作 */
      // handleDoload() {
      //   this.download('/material/put_out/importTemplate', {}, `待出库导入表.xlsx`)
      // },
      // 文件上传中处理
      // handleFileUploadProgress(event, file, fileList) {
      //   this.upload.isUploading = true
      // },
      // 文件上传成功处理
      // handleFileSuccess(response, file, fileList) {
      //   this.upload.open = false
      //   this.upload.isUploading = false
      //   this.$refs.upload.clearFiles()
      //   this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + '</div>', '导入结果', { dangerouslyUseHTMLString: true })
      //   this.getList()
      // },
      // 提交上传文件
      // submitFileForm() {
      //   this.$refs.upload.submit()
      // },
      /** 修改按钮操作 */
      // handelEdit(row) {
      //   const temp = row

      // }
    }
  }
  </script>
