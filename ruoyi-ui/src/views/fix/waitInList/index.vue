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
      <el-form-item label="内部维修人员" label-width="100" prop="technician" >
        <el-input
          v-model="queryParams.technician"
          placeholder="请输入内部维修人员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="维修流程" prop="technician">
        <el-input
          v-model="queryParams.technician"
          placeholder="请输入维修流程"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="维修备注" prop="technician">
        <el-input
          v-model="queryParams.technician"
          placeholder="请输入维修备注"
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
      <el-col :span="1.5">
        <!-- <el-button
          type="warning"
          plain
          ....
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['material:interior:export']"
        >导出</el-button> -->
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="interiorList" @selection-change="handleSelectionChange" height="580">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="repairNo" width="120"/>
      <el-table-column label="物料编码" align="center" prop="materialNo" width="180"/>
      <!-- <el-table-column label="数量" align="center" prop="qty" /> -->
      <el-table-column label="序列号" align="center" prop="sn" width="120"/>
      <el-table-column label="PM单" align="center" prop="pm" width="120"/>
      <el-table-column label="MissingQty" align="center" prop="missing" width="300"/>
      <el-table-column label="内部维修人员" align="center" prop="technician" width="200"/>
      <el-table-column label="SCT/M" align="center" prop="sct" width="300"/>
      <el-table-column label="维修流程" align="center" prop="repairFlow" width="180"/>
      <el-table-column label="PM04" align="center" prop="pmZf" width="180"/>
      <el-table-column label="维修备注" align="center" prop="repairComment" width="180"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handelFixFlow(scope.row)"
          >更新维修流程</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handelCancel(scope.row)"
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

    <!-- 修改内修对话框 -->
    <el-dialog :title="title" :visible.sync="open" :close-on-click-modal="false" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" >
        <!-- <el-form-item label="物料编码" prop="materialNo">
          <el-input v-model="form.materialNo" placeholder="请输入物料编码" />
        </el-form-item> -->
        <el-form-item label="内部维修人员"  prop="technician">
          <el-input v-model="form.technician" placeholder="请输入技术员"/>
        </el-form-item>
        <el-form-item label="维修备注" prop="repairComment">
          <el-input  type="textarea" :rows="3"  v-model="form.repairComment" placeholder="请输入测试备注" />
        </el-form-item> 
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="open=false;getList()">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 更新维修流程对话框 -->
    <el-dialog title="修改更新维修流程"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               width="400px" append-to-body>
       <el-form ref="form1" :rules="rules" :model="form1"  label-width="80px" >
          <el-form-item label="PM04" prop="pmZf" >
            <el-input v-model="form1.pmZf" placeholder="请输入PM04" required />
          </el-form-item>
          <el-form-item label="维修流程" prop="repairFlow"  >
                  <el-select  v-model="form1.repairFlow" placeholder="请选择维修流程" style="width: 280px;">
                    <el-option
                      v-for="item in option"
                      :label="item"
                      :value="item"
                      :key="item">
                    </el-option>
                  </el-select>       
          </el-form-item>
       </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;getList()">取 消</el-button>
        <el-button type="primary" @click="submitFixFlow()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listInterior, getInterior, updateInterior,cancelInterior,updatefixFlow,getfixFlow } from "@/api/material/amend/confirm";

export default {
  name: "Interior",
  data() {
    return {
      option:[],
      form1:{},
      dialogVisible:false,
      repairinIds:0,
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
      // 内修表格数据
      interiorList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        createAccount: null,
        updateAccount: null,
        materialNo: null,
        materialDes: null,
        qty: null,
        sn: null,
        classIfication: null,
        orderNo: null,
        engineer: null,
        rfidInitialize: null,
        repairAble: null,
        repairType: null,
        repairLevel: null,
        supplierSource: null,
        supplier: null,
        technician: null,
        trackto: null,
        shippingNo: null,
        sct: null,
        repairFlow: null,
        repairComment: null,
        quotationDate: null,
        repairPrice: null,
        bomid: null,
        bomcreatedate: null,
        bomflow: null,
        pr: null,
        po: null,
        planpoDeleverydate: null,
        actualDeleverydate: null,
        testingComment: null,
        otherComment: null,
        materialStatus: null,
        materialDetailNo: null,
        repairComment: null,
        repairOrder: null,
        smId: null,
        rfidLift: null,
        repairNo:null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        pmZf:[{required:true,trigger:'blur',message:'请输入PM04!'}],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //更新维修流程
    handelFixFlow(row){
      this.form1 = {}
      this.dialogVisible = true
      this.form1 = row
    },
    submitFixFlow(){
      updatefixFlow(this.form1).then(res=>{
              this.$modal.msgSuccess("修改成功!");
              this.dialogVisible = false;
              this.getList();
      },
      error=>{
        this.$modal.msgError("修改失败!");
      })
    },
    /** 查询内修列表 */
    getList() {
      this.loading = true;
      listInterior(this.queryParams).then(response => {
        this.interiorList = response.rows;
        this.total = response.total;
        this.loading = false;
        if(this.interiorList.length === 0){
              this.$message({
                showClose: true,
                message: '查询数据为空,暂无数据',
                type: 'warning'
               });
        }
      });
      getfixFlow().then(res=>{
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
        repairinId: null,
        createTime: null,
        createAccount: null,
        updateTime: null,
        updateAccount: null,
        materialNo: null,
        materialDes: null,
        qty: null,
        sn: null,
        classIfication: null,
        orderNo: null,
        engineer: null,
        rfidInitialize: null,
        repairAble: null,
        repairType: null,
        repairLevel: null,
        supplierSource: null,
        supplier: null,
        technician: null,
        trackto: null,
        shippingNo: null,
        sct: null,
        repairFlow: null,
        repairComment: null,
        quotationDate: null,
        repairPrice: null,
        bomid: null,
        bomcreatedate: null,
        bomflow: null,
        pr: null,
        po: null,
        planpoDeleverydate: null,
        actualDeleverydate: null,
        testingComment: null,
        otherComment: null,
        materialStatus: "0",
        materialDetailNo: null,
        repairComment: null,
        repairOrder: null,
        smId: null,
        rfidLift: null
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
      this.ids = selection.map(item => item.repairinId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const repairinId = row.repairinId || this.ids
      getInterior(repairinId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改内修";
      });
    },
    /** 提交按钮 */
    submitForm() {
            updateInterior(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            },
      error=>{
        this.$modal.msgError("修改失败!");
      });
    },
    /** 取消按钮操作 */
    handelCancel(row) {
     const repairinId = row.repairinId || this.ids;
      cancelInterior(repairinId).then(response => {
        this.$modal.msgSuccess("取消成功");
        this.getList(); 
      },
      error=>{
        this.$modal.msgError("取消失败!");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('material/interior/export', {
        ...this.queryParams
      }, `待内修清单_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
