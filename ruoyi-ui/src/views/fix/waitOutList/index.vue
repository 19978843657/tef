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
<!--      <el-form-item label="物料描述" prop="materialDes">-->
<!--        <el-input-->
<!--          v-model="queryParams.materialDes"-->
<!--          placeholder="请输入物料描述"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <!-- <el-form-item label="数量" prop="qty">
        <el-input
          v-model="queryParams.qty"
          placeholder="请输入数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="序列号" prop="sn">
        <el-input
          v-model="queryParams.sn"
          placeholder="请输入序列号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
      <!-- <el-form-item label="工程师" prop="engineer">
        <el-input
          v-model="queryParams.rfidLnitialize"
          placeholder="请输入工程师"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="rfid寿命" prop="rfidLift">
        <el-input
          v-model="queryParams.rfidLift"
          placeholder="请输入rfid寿命"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <!-- <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button> -->
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="distributionList" @selection-change="handleSelectionChange" height="580px">
      <el-table-column type="selection" width="30" align="center" />
      <el-table-column label="id号" align="center" prop="repairNo" />
      <el-table-column label="物料号" align="center" prop="materialNo" width="110"  />
      <el-table-column label="序列号" align="center" prop="sn" width="180"/>
      <el-table-column label="运单号" align="center" prop="shippingNo" width="180"/>
     <el-table-column label="去向" align="center" prop="trackto" width="150"/>
     <el-table-column label="寄件日期" align="center" prop="sendDate" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.sendDate|formateDate }}</span>   
        </template>
      </el-table-column>
     <el-table-column label="维修商" align="center" prop="supplier" width="120"/>
     <el-table-column label="维修备注" align="center" prop="repairComment" width="220"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="270">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="updateFix(scope.row)"
          >更新</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="submitFix(scope.row)"
          >提交维修单</el-button>
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

    <!-- 提交内外修维修单据对话框 -->
    <el-dialog :title="title" :rules="rules" :visible.sync="open" :close-on-click-modal="false" width="500px"  append-to-body>
      <el-form label-position="left" ref="form" :model="form" :rules="rules" label-width="83px" >
          <div>
              <el-form-item label="维修选择"  prop="repairStatus">
                <el-checkbox v-model="form.repairStatus"  @change="getFixTra()" true-label=1>维修</el-checkbox>
                <el-checkbox v-model="form.repairStatus" @change="getunFixTra()" true-label=0>不维修</el-checkbox>
              </el-form-item>
              <el-form-item label="去向选择" prop="trackto"  v-if="form.repairStatus == 1">
                  <el-select  v-model="form.trackto" placeholder="请选择维修流程" style="width: 375px;">
                    <el-option
                      v-for="item in option1"
                      :label="item"
                      :value="item"
                      :key="item">
                    </el-option>
                  </el-select>       
              </el-form-item>
            
              <el-form-item label="去向选择" prop="trackto"  v-else >
                  <el-select  v-model="form.trackto" placeholder="请选择维修流程" style="width: 375px;">
                    <el-option
                      v-for="item in option2"
                      :label="item"
                      :value="item"
                      :key="item">
                    </el-option>
                  </el-select>       
              </el-form-item>
              <el-form-item label="运单号码" prop="shippingNo" >
                <el-input v-model="form.shippingNo" placeholder="请输入运单号码" />
              </el-form-item> 
              <el-form-item label="寄件日期" prop="sendDate">
                <el-date-picker clearable size="small"
                                v-model="form.sendDate"
                                type="date"
                                formate="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                placeholder="选择寄件日期"
                                style="width: 375px;"
                                >
                </el-date-picker>
              </el-form-item> 


           
          </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">提交更改</el-button>
        <el-button @click="open=false;getList()">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { getawaitOutList,updateWaitOutFix,cancelOutFix,getTrackInfo,getTrackNoSupplier,submitWaitOutFix} from "@/api/material/amend/confirm";
// import { getFlow } from '@/api/material/amend/'
// import html2pdf from 'html2pdf.js';
export default {
  name: "Confirm",
  data() {
    return {
      option1:[],
      option2:[],
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
      dialogVisible: false,
      dialogVisib:false,
      // 总条数
      total: 0,
      // 维修单据表格数据
      distributionList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      download: {
        open: false,
        title: '',
        id: null
      },
      mater:{},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
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
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // repairAble:[{required:true,message:'请输入唯一ID号!',trigger:'blur'}],
        // shippingNo:[{required:true,message:'请输入唯一ID号!',trigger:'blur'}],
        // quotationDate:[{required:true,message:'请输入唯一ID号!',trigger:'blur'}],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //提交待外修单据
    submitFix(row){
      submitWaitOutFix(row.id).then(res=>{
      this.$modal.msgSuccess("提交成功!");
      this.getList();
      })
    },
    /** 查询维修单据列表 */
    getList() {
      this.loading = true;
      getawaitOutList(this.queryParams).then(res => {
        this.distributionList = res.rows;
        console.log(res.rows,'res');
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
      //去向选择
      getTrackInfo().then(res=>{
        this.option1 = res.data
      });
      //去向选择(不包含供应商)
      getTrackNoSupplier().then(res=>{
        this.option2 = res.data
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
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
        materialStatus:null,
        sendDate:null,
        trackto:null,
        shippingNo:null,
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
    //维修类型选择
    updateFix(row){
      this.reset()
      this.form = row
      this.form.id = row.id || this.ids
      this.title = "更新修改维修单";
      this.open = true;
    },
    getFixTra(){
        this.form.trackto = '供应商'
    },
    getunFixTra(){
      this.form.trackto = ''
    },
    /** 提交按钮 */
    submitForm() {     
      updateWaitOutFix(this.form).then(response => {
              this.$modal.msgSuccess("更新成功！");
              this.open = false;
              this.getList();
            },
            // error=>{
            //   this.$modal.msgError("更新失败!");
            // };
            )
    },
    /**
     * 待外修取消按钮
     * @param row
     */
    scrap(row) {
      this.scraid = row.id || this.ids;
      cancelOutFix(this.scraid).then(response => {
        this.dialogVisible = false;
        this.$modal.msgSuccess("取消成功");
        this.getList();
      },
      error=>{
        this.$modal.msgError("取消失败!");
      })
    },

    /** 导出按钮操作 */
    handleExport() {
      this.download('material/confirm/export', {
        ...this.queryParams
      }, `confirm_${new Date().getTime()}.xlsx`)
    },

  }
};
</script>
