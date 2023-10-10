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
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="distributionList" @selection-change="handleSelectionChange" height="580px">
      <el-table-column type="selection" width="30" align="center" />
      <el-table-column label="id号" align="center" prop="repairNo" width="190"/>
      <el-table-column label="物料号" align="center" prop="materialNo" width="110"  />
      <el-table-column label="物料描述" align="center" prop="materialDes" width="210"/>
      <el-table-column label="PM单号" align="center" prop="pm" width="180"/>
      <el-table-column label="序列号" align="center" prop="sn" width="180"/>
      <el-table-column label="分类" align="center" prop="classification" width="150"/>
      <el-table-column label="物料详细编码" align="center" prop="materialDetailNo" width="230"/>
      <el-table-column label="设备使用时间" align="center" prop="rfidLift" width="190"/>
      <el-table-column label="损坏日期" align="center" prop="brokenDate" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.brokenDate|formateDate }}</span>   
        </template>
      </el-table-column>
      <el-table-column label="损坏描述" align="center" prop="damageDescription" width="251"/>
     <el-table-column label="是否维修" align="center" prop="repairAble" width="160">
      <template slot-scope="scope">
        <span v-if="scope.row.repairAble==1">是</span>
        <span v-else-if="scope.row.repairAble==0">否</span>
      </template>
     </el-table-column>
      <el-table-column label="维修类型" align="center" prop="materialDes" width="210" />
<!--      <el-table-column label="维修次数" align="center" prop="repairCount" />-->
     <el-table-column label="推荐供应商" align="center" prop="prefereSupplier" width="150"/>
<!--      <el-table-column label="备注" align="center" prop="suppilerComment" />-->
     <el-table-column label="紧急维修" align="center" prop="repairLevel" width="120">
      <template slot-scope="scope">
        <span v-if="scope.row.repairLevel==1">紧急</span>
        <span v-else-if="scope.row.repairLevel==0">正常</span>
      </template>
     </el-table-column>
     <el-table-column label="维修商来源" align="center" prop="supplierSource" width="150"/>
<!--      <el-table-column label="维修商" align="center" prop="supplier" />-->
     <el-table-column label="技术员" align="center" prop="technician" width="150"/>
     <el-table-column label="维修备注" align="center" prop="repairComment" width="180"/>
      <el-table-column label="单据状态" align="center" prop="materialStatus" >
        <template slot-scope="scope">  
          <span v-if="scope.row.materialStatus==1">待分配</span>   
        </template>
      </el-table-column>
<!--      <el-table-column label="epc" align="center" prop="materialDetailNo" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="270">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="ifFix(scope.row)"
          >是否维修</el-button>
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
    <el-dialog :title="title" :rules="rules" :visible.sync="open" :close-on-click-modal="false" width="600px"  append-to-body>
      <el-form label-position="left" ref="form" :model="form" :rules="rules" label-width="83px" >
          <div>
            <el-form-item label="维修类型">
              <el-radio v-model="form.materialStatus" label="4">内修</el-radio>
              <el-radio v-model="form.materialStatus" label="6">外修</el-radio>
              <el-radio v-model="form.materialStatus" label="9">外修-索赔</el-radio>
            </el-form-item>
          </div>
           <div v-if="form.materialStatus == 4" >
              <el-form-item label="维修人员" prop="technician" >
                <el-input v-model="form.technician"  placeholder="请填写维修技术人员"  />
              </el-form-item>
           </div>
           <div v-else>
              <el-form-item label="维修等级"  prop="repairLevel">
                <el-checkbox v-model="form.repairLevel" true-label=1>紧急维修</el-checkbox>
                <el-checkbox v-model="form.repairLevel" true-label=0>正常维修</el-checkbox>
              </el-form-item>
              <el-form-item label="测试技术员" prop="technician">
                <el-input v-model="form.technician" placeholder="请输入测试技术员" />
              </el-form-item>
              <el-form-item label="选择供应商" prop="supplierSource" >
                <el-checkbox v-model="form.supplierSource"  @change="ifInput(preSupplier)" true-label=0>推荐供应商</el-checkbox>
                <el-checkbox v-model="form.supplierSource" @change="ifinput"  true-label=1 >专修供应商</el-checkbox>
                <el-checkbox v-model="form.supplierSource" @change="ifinput"  true-label=2>分类供应商</el-checkbox>
             </el-form-item>
              <el-form-item label="推荐供应商" prop="prefereSupplier" v-if="form.supplierSource == 0">
                <el-input v-model="form.prefereSupplier" placeholder="当前无推荐供应商" disabled/>
              </el-form-item>
              <div v-else-if="form.supplierSource == 1">
                <el-form-item label="其他供应商" label-width="92px" prop="prefereSupplier" :rules="[{required:form.supplierSource == '1'? true:false,message:'请输入其他供应商'}]" >
                  <el-select  v-model="form.prefereSupplier" placeholder="请选择其他供应商" @click.native="selectSupp">
                    <el-option
                      v-for="item in option2"
                      :label="item"
                      :value="item"
                      :key="item">
                    </el-option>
                  </el-select>       
              </el-form-item>
              </div>
              <div v-else-if="form.supplierSource == 2">
                <el-form-item label="分类" :rules="[{required:form.supplierSource == '2'? true:false,message:'请选择分类'}]">
                  <el-select  v-model="sortName" placeholder="请选择分类"  @blur.capture.native="selectOP">
                    <el-option
                      v-for="item in option"
                      :label="item"
                      :value="item"
                      :key="item">
                    </el-option>
                  </el-select>      
              </el-form-item>
              <el-form-item label="分类供应商" label-width="92px" prop="prefereSupplier" :rules="[{required:form.supplierSource == '2'? true:false,message:'请输入分类供应商'}]" >
                  <el-select  v-model="form.prefereSupplier" placeholder="请选择分类供应商">
                    <el-option
                      v-for="item in option1"
                      :label="item"
                      :value="item"
                      :key="item">
                    </el-option>
                  </el-select>       
              </el-form-item>
              </div>  
              <el-form-item label="维修备注" prop="repairComment" :rules="[{required:form.supplierSource == '1'|| form.supplierSource == '2'? true:false,message:'请输入测试备注'}]">
                <el-input v-model="form.repairComment" placeholder="请输入维修备注" />
              </el-form-item>
           </div> 

      </el-form>
    
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">提交维修单</el-button>
        <el-button @click="open=false;getList()">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 能否维修 -->
    <el-dialog title="是否维修" :rules="rules" :visible.sync="dialogVisible" :close-on-click-modal="false" width="350px"  append-to-body>
      <el-form label-position="left" ref="form3" :model="form3" :rules="rules" label-width="90px" >
          <div>
            <el-form-item>
              <el-radio v-model="form3.repairAble" label="1">是</el-radio>
              <el-radio v-model="form3.repairAble" label="0">否</el-radio>
            </el-form-item>
          </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="canfix">提交</el-button>
        <el-button @click="dialogVisible=false;getList()">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { listDistribution,fixTypeSubmit,cancelWait,canFix,getSortNameList,queryBySortName,queryByMaterialNo} from "@/api/material/amend/confirm";
// import { getFlow } from '@/api/material/amend/'
import html2pdf from 'html2pdf.js';
export default {
  name: "Confirm",
  data() {
    return {
      preSupplier:'',
      form3:{},
      option2:[],
      noId:null,
      dialogVisible:false,
      sortName:'',
      option:[],
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
      option:[],
      option1:[],
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
      lastSelectedValue : '',
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // id:[{required:true,message:'请输入唯一ID号!',trigger:'blur'}]
      },
      form2 : {sortName:null},
    };
  },

  created() {
    this.getList();
  },
  methods: {
    /** 查询维修单据列表 */
    getList() {
      this.loading = true;
      listDistribution(this.queryParams).then(res => {
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
      //分类下拉框
      getSortNameList().then(response=>{
        this.option = response.data
      })
    },
    //通过物料号获取其他供应商下拉框
    selectSupp(){
      this.form.prefereSupplier=''
      queryByMaterialNo(this.form).then(res=>{
        this.option2 = res.data
      })
    },
    ifinput(){
      this.form.prefereSupplier=''
    },
    ifInput(preSupplier){
      this.form.prefereSupplier = preSupplier
    },

  
    //是否维修按钮操作
    ifFix(row) {
      this.dialogVisible = true
      this.form3.id = row.id
    },

    canfix(){
      
      canFix(this.form3).then(res=>{
        this.$modal.msgSuccess("提交成功");
        this.cancel()
        this.getList();
      })
    },
    
    //通过分类获取分类供应商下拉框
    selectOP(){
      this.form.prefereSupplier=''
    if(this.sortName !== '' && this.form2.sortName !== this.sortName){ 
      this.form2.sortName = this.sortName
      console.log(this.form2.sortName,'wait');
      queryBySortName(this.form2).then(res=>{
        this.option1 = res.data
          })
      .catch(err=>{
        this.option1 = []
        
      })
    }
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.dialogVisible =false
      this.reset();

    },
    // 表单重置
    reset() {
      this.sortName = ''
      this.form = {
        supplierSource:'0',
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
        repairLevel:'0',
        prefereSupplier: '',
        repairComment:null,
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
    //维修类型选择按钮操作
    fixSubmit(row){
      this.reset();
      this.form = row
      this.form.repairLevel = '0'
      this.form.supplierSource = '0'
      this.form.id = row.id || this.ids
      this.title = "提交维修单";
      this.open = true;
      this.preSupplier = row.prefereSupplier
      this.sortName = row.classification
    },
    /** 提交按钮 */
    submitForm() {     
    if (this.form.repairAble !== null) {
      this.$refs.form.validate(valid=>{
        if(valid){
        
          fixTypeSubmit(this.form).then(response => {
                  this.$modal.msgSuccess("提交成功");
                  this.open = false;
                  this.getList();
                },
                  error=>{
                    this.$modal.msgError("提交失败!");
                  });
              }
           
        })
      }
    else{
      this.$modal.msgError("请先选择是否维修");
      }
    },
    /**
     * 维修取消按钮
     * @param row
     */
    scrap(row) {
      this.scraid = row.id || this.ids;
      cancelWait(this.scraid).then(response => {
        this.dialogVisible = false;
        this.$modal.msgSuccess("取消成功");
        this.getList();
      },
      error=>{
        this.$modal.msgError("取消失败!");
      })
    },

    /** 导出按钮操作 */
    // handleExport() {
    //   this.download('material/confirm/export', {
    //     ...this.queryParams
    //   }, `confirm_${new Date().getTime()}.xlsx`)
    // },
  }
};
</script>
