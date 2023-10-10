<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="物料详细编码" prop="materialDetailNo">
        <el-input v-model="queryParams.materialDetailNo" placeholder="请输入物料详细编码" clearable size="small"
          @keyup.enter.native="handleQuery"  style="width: 240px"/>
      </el-form-item>
      <el-form-item label="库位信息" prop="storeInfo">
        <el-input v-model="queryParams.storeInfo" placeholder="请输入库位信息" clearable size="small"
                  @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="状态筛选" prop="remark">
        <el-select v-model="queryParams.remark" clearable placeholder="请选择" >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
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
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">库位精准查询</el-button>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuerya">库位模糊查询</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['material:taking:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />

<!--      <el-col :span="1.5">-->
<!--       <el-button v-hasPermi="['material:new_in:deleteae']" type="info" plain icon="el-icon-upload2" size="mini"-->
<!--        @click="deleteae">删除</el-button>-->
<!--    </el-col>-->
    </el-row>

    <el-table v-loading="loading" :data="takingList" @selection-change="handleSelectionChange"  height="500px">
      <el-table-column label="物料编码" align="center" prop="sMaterialno" width="180" />
      <el-table-column label="物料描述" align="center" prop="sMaterialdes" width="180" />
      <el-table-column label="物料详细编码" align="center" prop="materialDetailNo" width="240"/>
      <el-table-column label="库位信息" align="center" prop="storeInfo" />
      <el-table-column label="批次" align="center" prop="batch" />
      <el-table-column label="盘点状态" align="center" prop="remark" />
<!--      <el-table-column label="盘库时间" align="center" prop="takingDt" width="180" />-->
      <el-table-column label="盘库人员" align="center" prop="takingName" />



    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

  </div>
</template>

<script>
import { listTaking,deletea,istTakinga } from '@/api/material/taking/temp'
import { listUser } from '@/api/system/user'
import { getToken } from '@/utils/auth'
import StoreSelect from '@/components/shortcut/storeSelect'

export default {
  name: 'Taking',
  components: {
    StoreSelect
  },
  data() {
    return {
      options: [
        {
          value: '盘赢',
        },
        {
          value: '盘亏',
        },
        {
          value: '正常',
        },{
          value: '异常',
        }],value:'',
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
      // 盘库信息表格数据
      takingList: [],
      Blind:[],
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
        storeInfo: null,
        materialDetailNo: null,
        takingName: null,
        // blinid:null
      },
      // upload: {
      //   // 是否显示弹出层（用户导入）
      //   open: false,
      //   // 弹出层标题（用户导入）
      //   title: '',
      //   // 是否禁用上传
      //   isUploading: false,
      //   // 是否更新已经存在的用户数据
      //   updateSupport: 0,
      //   // 设置上传的请求头部
      //   headers: { Authorization: 'Bearer ' + getToken() },
      //   // 上传的地址
      //   url: process.env.VUE_APP_BASE_API + '/material/taking/importDat'
      // }
    }
  },

  watch: {
    // 监听路由是否变化
    '$route' (to, from) {
      if(to.query.id != from.query.id){
        this.id = to.query.id; // 把最新id赋值给定义在data中的id
        this.getList(); // 重新调用加载数据方法
      }
    }
  },


  created() {
    this.getList()
    this.getUserList()
  },
  methods: {
    /** 查询盘库信息列表 */
    getList() {
      this.loading = true
      // this.queryParams.takingDtStart = this.dateRange[0]
      // this.queryParams.takingDtEnd = this.dateRange[1]

      console.log(this.$route.query.id+'传递过来的值')
      this.queryParams.blinid=this.$route.query.id;
      console.log(this.queryParams.blinid)
      console.log(this.queryParams)
      listTaking(this.queryParams).then(response => {
        this.takingList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    //查询盘库信息列表
    getLista() {
      this.loading = true
      console.log(this.$route.query.id+'传递过来的值')
      this.queryParams.blinid=this.$route.query.id;
      console.log(this.queryParams.blinid)
      console.log(this.queryParams)
      istTakinga(this.queryParams).then(response => {
        this.takingList = response.rows
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
    /** 搜索按钮作 */
    handleQuerya() {
      this.queryParams.pageNum = 1
      console.log('aaaaaaa');
      this.getLista()
    }, 
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
      this.handleQuerya()
    },

    // /** 导入按钮操作 */
    // handleImport() {
    //   this.upload.title = '盲盘导入'
    //   this.upload.open = true
    // },
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
    deleteae() {
      deletea().then(response => {
      })
      this.getList();
    },
    // // 文件上传中处理
    // handleFileUploadProgress(event, file, fileList) {
    //   this.upload.isUploading = true
    // },
    // // 文件上传成功处理
    // handleFileSuccess(response, file, fileList) {
    //   this.upload.open = false
    //   this.upload.isUploading = false
    //   this.$refs.upload.clearFiles()
    //   this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + '</div>', '导入结果', { dangerouslyUseHTMLString: true })
    //   this.getList()
    // },
    // // 提交上传文件
    // submitFileForm() {
    //   this.$refs.upload.submit()
    // },
    /** 导出按钮操作 */
    handleExport() {
      this.download('material/taking/exportt', {
        ...this.queryParams
      }, `盲盘_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
