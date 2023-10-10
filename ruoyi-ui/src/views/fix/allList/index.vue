<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="ID号" prop="repairNo">
        <el-input
          v-model="queryParams.repairNo"
          placeholder="请输入ID号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料号" prop="materialNo">
        <el-input
          v-model="queryParams.materialNo"
          placeholder="请输入物料号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="序列号" prop="sn">
        <el-input
          v-model="queryParams.sn"
          placeholder="请输入序列号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单据状态" prop="masterStatus">
          <el-select v-model="queryParams.masterStatus" placeholder="请选择单据状态" clearable >
            <el-option
               v-for="item in option"
                :label="item.label"
                :value="item.value"
                :key="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="分类" prop="classification">
        <el-input
          v-model="queryParams.classification"
          placeholder="请输入分类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="损坏日期" prop="brokenDate">
        <el-date-picker clearable size="small"
                        v-model="queryParams.brokenDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择损坏日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="pm单" prop="pm">
        <el-input
          v-model="queryParams.pm"
          placeholder="请输入pm单"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="distributionList" @selection-change="handleSelectionChange" height="580px">
      <el-table-column type="selection" width="30" align="center" />
      <el-table-column label="id号" align="center" prop="repairNo" />
      <el-table-column label="物料号" align="center" prop="materialNo" width="150"  />
      <el-table-column label="物料描述" align="center" prop="materialDes" width="220"/>
      <el-table-column label="PM单号" align="center" prop="pm" width="190"/>
      <el-table-column label="序列号" align="center" prop="sn" width="190"/>
      <el-table-column label="分类" align="center" prop="classIfication" width="150"/>
      <el-table-column label="物料详细编码" align="center" prop="materialDetailNo" width="230"/>
      <el-table-column label="是否有RFID标签" align="center" prop="rfidLnitialize" width="120"/>
      <el-table-column label="设备使用时间" align="center" prop="rfidLift" width="160">
        <template slot-scope="scope">
          <span>{{scope.row.rfidLift|formateDate }}</span>   
      </template>
      </el-table-column>
      <el-table-column label="PM04" align="center" prop="pmZf" /> 
      <el-table-column label="pr单" align="center" prop="pr" width="150"/>
      <el-table-column label="po单" align="center" prop="po" width="150"/>
      <el-table-column label="损坏日期" align="center" prop="brokenDate" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.brokenDate|formateDate }}</span>   
        </template>
      </el-table-column>
      <el-table-column label="损坏描述" align="center" prop="damageDescription" width="190"/>
     <el-table-column label="是否维修" align="center" prop="repairAble" >
      <template slot-scope="scope">
        <span v-if="scope.row.repairAble == 1">是</span>
        <span v-if="scope.row.repairAble == 0">否</span>
      </template> 
     </el-table-column>
     <el-table-column label="bom创建时间" align="center" prop="bomCreatetime" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.bomCreatetime|formateDate }}</span>   
        </template>
      </el-table-column>
      <el-table-column label="bom状态" align="center" prop="bomStatus" />
     <el-table-column label="维修选择" align="center" prop="repairStatus" >
      <template slot-scope="scope">
        <span v-if="scope.row.repairStatus == 1">维修</span>
        <span v-if="scope.row.repairStatus == 0">不维修</span>
      </template> 
     </el-table-column>
     <el-table-column label="sct/m" align="center" prop="sct" width="150"/>
      <el-table-column label="bomid" align="center" prop="bomid" width="150"/>
      <el-table-column label="bom审批" align="center" prop="bomApprove" width="150"/>
      <el-table-column label="bom提交日期" align="center" prop="bomCreatedate" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.bomCreatedate|formateDate }}</span>   
        </template>
      </el-table-column>
     <el-table-column label="去向" align="center" prop="trackto" width="150"/>
      <el-table-column label="维修类型" align="center" prop="repairType" width="120" />
<!--      <el-table-column label="维修次数" align="center" prop="repairCount" />-->
     <el-table-column label="维修商" align="center" prop="supplier" width="150"/>
<!--      <el-table-column label="备注" align="center" prop="suppilerComment" />-->
     <el-table-column label="维修等级" align="center" prop="repairLevel" width="150" />

      <el-table-column label="报价日期" align="center" prop="quotationDate" width="190">
        <template slot-scope="scope">
          <span>{{scope.row.quotationDate|formateDate }}</span>   
        </template>
      </el-table-column>
     <el-table-column label="创建时间" align="center" prop="createTime" width="150" />
     <el-table-column label="MissingQty" align="center" prop="missing" width="300"/>
      <el-table-column label="内部维修人员" align="center" prop="technician" width="200"/>
     <el-table-column label="维修商来源" align="center" prop="supplierSource" width="180"/>
    <el-table-column label="单据状态" align="center" prop="masterStatus" >
            <template slot-scope="scope">
              <span v-if="scope.row.masterStatus==0">新建</span>   
              <span v-else-if="scope.row.masterStatus==1">待分配</span>   
              <span v-else-if="scope.row.masterStatus==2">打印失败</span>   
              <span v-else-if="scope.row.masterStatus==3">报废</span>   
              <span v-else-if="scope.row.masterStatus==4">内修</span>   
              <span v-else-if="scope.row.masterStatus==5">关闭内修</span>   
              <span v-else-if="scope.row.masterStatus==6">待外修</span>   
              <span v-else-if="scope.row.masterStatus==7">外修</span>   
              <span v-else-if="scope.row.masterStatus==8">关闭外修</span>   
              <span v-else-if="scope.row.masterStatus==9">外修索赔</span>   
              <span v-else-if="scope.row.masterStatus==10">待测试</span>  
              <span v-else-if="scope.row.masterStatus==11">测试失败</span>  
              <span v-else-if="scope.row.masterStatus==-1">单据关闭</span>  
            </template>
          </el-table-column>
     <!-- <el-table-column label="技术员" align="center" prop="technician" width="220"/> -->
     <el-table-column label="维修备注" align="center" prop="repairComment" width="180"/>
     <el-table-column label="测试备注" align="center" prop="testingComment" width="180"/>
     <el-table-column label="测试人" align="center" prop="clickName" width="120"/>
     <el-table-column label="测试时间" align="center" prop="clickTime" width="160">
      <template slot-scope="scope">
          <span>{{scope.row.clickTime|formateDate }}</span>   
      </template>
     </el-table-column>
     <el-table-column label="测试位置" align="center" prop="testLocation" width="120"/>

<!--      <el-table-column label="epc" align="center" prop="materialDetailNo" />-->
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="270">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="fixSubmit(scope.row)"
          >选择维修类型</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="scrap(scope.row)"
          >取消</el-button>
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
import { listFixAll,fixTypeSubmit,cance} from "@/api/material/amend/confirm";
// import { getFlow } from '@/api/material/amend/'
export default {
  name: "Confirm",
  data() {
    return {
      checked: true,
      scraid:0,
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
      // 维修单据表格数据
      distributionList: [],
      download: {
        open: false,
        title: '',
        id: null
      },
      mater:{},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 50,
        materialNo: null,
        materialDes: null,
        qty: null,
        sn: null,
        classification: null,
        brokenDate: null,
        pm: null,
        rfidLnitialize: null,
        rfidLift: null,
        repairNo:null,
        masterStatus:null,
      },
      // 表单参数
      form: {},
      option:[
        {
         label: '新建',
         value: '0'
        },
        {
         label: '待分配',
         value: '1'
        },
        {
         label: '打印失败',
         value: '2'
        },
        {
         label: '报废',
         value: '3'
        },        {
         label: '内修',
         value: '4'
        },
        {
         label: '关闭内修',
         value: '5'
        },
        {
         label: '待外修',
         value: '6'
        },
        {
         label: '外修',
         value: '7'
        },
        {
         label: '关闭外修',
         value: '8'
        },   
        {
         label: '外修索赔',
         value: '9'
        },
        {
         label: '待测试',
         value: '10'
        },
        {
         label: '测试失败',
         value: '11'
        },
        {
         label: '单据关闭',
         value: '-1'
        },
      ]
    };
  },

  created() {
    this.getList();
  },
  methods: {
    /** 查询维修单据列表 */
    getList() {
      this.loading = true;
      listFixAll(this.queryParams).then(res => {
        this.distributionList = res.rows;
        this.total = res.total;
        this.loading = false;
        if(this.distributionList.length === 0){
              this.$message({
                showClose: true,
                message: '查询数据为空,暂无数据',
                type: 'warning'
               });
        }
       
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        materialNo: null,
        materialDes: null,
        qty: null,
        sn: null,
        classification: null,
        brokenDate: null,
        pm: null,
        rfidLnitialize: null,
        rfidLift: null,
        damage_description:null,
        technician:null,
        masterStatus:null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
  
    /**
     * 维修取消按钮
     * @param row
     */
    // scrap(row) {
    //   this.scraid = row.id || this.ids;
    //   cance(this.scraid).then(response => {
    //     this.dialogVisible = false;
    //     this.$modal.msgSuccess("取消成功");
    //     this.getList();
    //   })
    // },

    /** 导出按钮操作 */
    handleExport() {
      this.download('material/confirm/export', {
        ...this.queryParams
      }, `confirm_${new Date().getTime()}.xlsx`)
    },

  }
};
</script>
