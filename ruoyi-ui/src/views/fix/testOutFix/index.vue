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
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button> -->
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="fixInSubmit(scope.row)"
        >内修提交</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="fixoutSubmit(scope.row)"
        >外修提交</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['material:confirm:remove']"
        >删除</el-button>
      </el-col> -->
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
      <el-table-column label="PM单号" align="center" prop="pm"  width="190"/>
      <el-table-column label="序列号" align="center" prop="sn"  width="190"/>
      <el-table-column label="物料详细编码" align="center" prop="materialDetailNo" width="250"/>
      <el-table-column label="设备使用时间" align="center" prop="rfidLift" width="150"/>
      <!-- <el-table-column label="损坏日期" align="center" prop="brokenDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.brokenDate, '{y}-{m}-{d}') }}</span>   
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="损坏描述" align="center" prop="damage_description"  width="190"/> -->
     <!-- <el-table-column label="能否维修" align="center" prop="repair_type"  width="150"/> -->
      <el-table-column label="维修类型" align="center" prop="repairType" width="120" />
     <!-- <el-table-column label="维修次数" align="center" prop="repairCount" /> -->
     <!-- <el-table-column label="推荐供应商" align="center" prop="prefereSupplier" width="150"/> -->
     <el-table-column label="去向" align="center" prop="trackto" width="150"/>
     <el-table-column label="pr单" align="center" prop="pr" width="150"/>
      <el-table-column label="po单" align="center" prop="po" width="150"/>
      <el-table-column label="到货日期" align="center" prop="deleveryDate" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.deleveryDate|formateDate }}</span>   
        </template>
      </el-table-column>
     <el-table-column label="紧急维修" align="center" prop="repairLevel"  width="150"/>
     <el-table-column label="维修商" align="center" prop="supplier" width="120"/>
     <!-- <el-table-column label="是否维修" align="center" prop="repairAble" width="160">
      <template slot-scope="scope">
        <span v-if="scope.row.repairAble==1">是</span>
        <span v-else-if="scope.row.repairAble==0">否</span>
      </template>
     </el-table-column> -->
<!--      <el-table-column label="维修商" align="center" prop="supplier" />-->
      <el-table-column label="测试备注" align="center" prop="testingComment" width="180"/>
      <el-table-column label="测试人" align="center" prop="clickName" width="120"/>
     <el-table-column label="测试时间" align="center" prop="clickTime" width="120">
      <template slot-scope="scope">
          <span>{{ parseTime(scope.row.clickTime, '{y}-{m}-{d}') }}</span>   
        </template>
     </el-table-column>
     <el-table-column label="测试位置" align="center" prop="testLocation" width="120"/>
     <!-- <el-table-column label="技术员" align="center" prop="technician" width="220"/> -->
     <el-table-column label="备注原因" align="center" prop="technician" width="220"/>
      <!-- <el-table-column label="单据状态" align="center" prop="materialStatus" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.masterStatus==10">待测试</span>   
        </template>
      </el-table-column> -->
<!--      <el-table-column label="epc" align="center" prop="materialDetailNo" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="270">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="updateTest(scope.row)"
          >更新测试单</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="testResult(scope.row)"
          >测试结果提交</el-button>
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
              <el-form-item label="测试位置" prop="testLocation" >
                  <el-select  v-model="form.testLocation" placeholder="请选择测试位置" style="width: 378px;">
                    <el-option
                      v-for="item in option"
                      :label="item"
                      :value="item"
                      :key="item">
                    </el-option>
                  </el-select>       
              </el-form-item>
              <el-form-item label="测试技术员" prop=" technician">
                <el-input v-model="form.technician" placeholder="请输入测试技术员" />
              </el-form-item>
           </div> 

      </el-form>
    
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">提交更改</el-button>
        <el-button @click="open=false;getList()">取 消</el-button>
      </div>
    </el-dialog>
<!--    测试结果确认弹窗-->
    <el-dialog title="测试结果确认" :visible.sync="dialogVisible" :close-on-click-modal="false" width="400px">
      <el-form ref="form1" :model="form1" :rules="rules"   label-width="83px">
              <el-form-item label="测试结果"  prop="submit">
                <el-radio v-model="form1.submit"  :label="0">通过</el-radio>
                <el-radio v-model="form1.submit"  :label="1">失败</el-radio>
              </el-form-item>
              <el-form-item label="测试备注" prop="testingComment" v-if="this.form1.submit == 1">
                <el-input v-model="form1.testingComment" placeholder="请输入测试备注" />
              </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submitTestResult" >确 认</el-button>
    <el-button @click="dialogVisible = false;getList()">取 消</el-button>
  </span>
    </el-dialog>


  </div>
</template>
<script>
import { listFixOutTest,updateOutTest,getTestLocation,submitOutTest} from "@/api/material/amend/confirm";
// import { getFlow } from '@/api/material/amend/'
export default {
  name: "Confirm",
  data() {
    return {
      form1:{},
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
        testingComment:[{required:true,message:'请输入测试备注!',trigger:'blur'}]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询维修单据列表 */
    getList() {
      this.loading = true;
      listFixOutTest(this.queryParams).then(res => {
        this.distributionList = res.rows;
        console.log(res.rows,'wait');
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
      getTestLocation().then(res=>{
        this.option = res.data
      })
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
        materialStatus:null,
      };
      this.resetForm("form");
    },
    //测试结果按钮
    testResult(raw){
      this.form1 = {}
      this.form1.id = raw.id
      this.form1.materialNo = raw.materialNo
      this.dialogVisible = true
    },
    //测试结果提交按钮
    submitTestResult(){
      submitOutTest(this.form1).then(res=>{
        this.$modal.msgSuccess("结果提交成功");
        this.dialogVisible = false;
        this.getList();
      },
      )
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
    updateTest(row){
      this.reset();
      this.form = row
      this.form.id = row.id || this.ids
      this.title = "提交维修单";
      this.open = true;
    },

    /** 提交按钮 */
    submitForm() {     
      updateOutTest(this.form).then(response => {
              this.$modal.msgSuccess("更新成功");
              this.open = false;
              this.getList();
            },
            error=>{
              this.$modal.msgError("更新失败!");
           }
            );
    },

    /**
     * 维修取消按钮
     * @param row
     */

    /** 导出按钮操作 */
    handleExport() {
      this.download('material/confirm/export', {
        ...this.queryParams
      }, `confirm_${new Date().getTime()}.xlsx`)
    },

  }
};
</script>
