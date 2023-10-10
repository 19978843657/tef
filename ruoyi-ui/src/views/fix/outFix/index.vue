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
      <el-form-item label="pm单" prop="pm">
        <el-input
          v-model="queryParams.pm"
          placeholder="请输入pm单"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="紧急维修" prop="repairLevel">
        <el-input
          v-model="queryParams.repairLevel"
          placeholder="请输入紧急维修"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="维修商" prop="supplier">
        <el-input
          v-model="queryParams.supplier"
          placeholder="请输入维修商"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="去向" prop="trackto">
        <el-input
          v-model="queryParams.trackto"
          placeholder="请输入去向"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="pm04" prop="pm04">
        <el-input
          v-model="queryParams.pm04"
          placeholder="请输入pm单"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="维修流程" prop="repairFlow">
        <el-input
          v-model="queryParams.repairFlow"
          placeholder="请输入维修流程"
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
        <el-button
          type="success"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleFixsExport"
        >供应商返修统计</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="quotationList" @selection-change="handleSelectionChange" height="580">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id号" align="center" prop="repairNo" />
      <el-table-column label="物料号" align="center" prop="materialNo" width="180"/>
      <el-table-column label="sn号" align="center" prop="sn" />
      <el-table-column label="pm单" align="center" prop="pm" width="180"/>
      <el-table-column label="PM04" align="center" prop="pmZf" />
      <el-table-column label="维修类型" align="center" prop="repairType" width="150"/>
      <el-table-column label="维修等级" align="center" prop="repairLevel" width="150">
      </el-table-column>
      <el-table-column label="维修商" align="center" prop="supplier" width="180" />
      <el-table-column label="去向" align="center" prop="trackto" width="150"/>
      <el-table-column label="报价日期" align="center" prop="quotationDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.quotationDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="sct/m" align="center" prop="sct" width="150"/>
      <el-table-column label="bomid" align="center" prop="bomid" width="150"/>
      <el-table-column label="bom提交日期" align="center" prop="bomCreatedate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.bomCreatedate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="bom审批" align="center" prop="bomApprove" width="150"/>
      <el-table-column label="pr单" align="center" prop="pr" width="150"/>
      <el-table-column label="po单" align="center" prop="po" width="150"/>
      <el-table-column label="到货日期" align="center" prop="deleveryDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deleveryDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="维修备注" align="center" prop="repairComment" width="190"/>
      <el-table-column label="维修流程" align="center" prop="repairFlow" width="150"/>
      <el-table-column label="暂存位置" align="center" prop="blockStoragebin" width="150"/>
      <!-- <el-table-column label="未知" align="center" prop="blockStoragebin"  width="150"/> -->
      <!-- <el-table-column label="取消返回次数" align="center" prop="submit" width="180"/> -->
      <el-table-column label="测试备注" align="center" prop="testingComment"  width="150"/>
      <el-table-column label="外修测试人" align="center" prop="technician" width="180"/>
      <el-table-column label="更改记录" align="center" prop="changeRecord" width="400">
        <template slot-scope="scope">
          <span v-html="formatContent(scope.row.changeRecord)"></span>
        </template>
      </el-table-column>
      <el-table-column label="是否维修" align="center" prop="repairAble" width="160">
      <template slot-scope="scope">
        <span v-if="scope.row.repairAble==1">是</span>
        <span v-else-if="scope.row.repairAble==0">否</span>
      </template>
     </el-table-column>
      <el-table-column label="bom创建时间" align="center" prop="bomCreatetime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.bomCreatetime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="bom状态" align="center" prop="bomStatus" />
      <el-table-column label="单据状态" align="center" prop="materialStatus"  width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.materialStatus==7">外修</span> 
          <span v-else-if="scope.row.masterStatus==9">外修索赔</span>  
          <span v-else-if="scope.row.masterStatus==8">关闭外修</span>   
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="240">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handelFixFlow(scope.row)"
          >更新维修流程</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改维修单</el-button>   
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="submitOutFix(scope.row)"
          >提交维修单</el-button>
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

    <!-- 修改外修单对话框 -->
    <el-dialog :title="title" :close-on-click-modal="false" :visible.sync="open" width="550px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" >
        <div>
              <el-form-item label="维修等级"  prop="repairLevel" >
                <el-radio v-model="form.repairLevel" label="0">正常维修</el-radio>
                <el-radio v-model="form.repairLevel" label="1">紧急维修</el-radio>
              </el-form-item>
              <!-- <el-form-item label="SCT/M" prop="sct">
                <el-input v-model="form.sct" placeholder="请输入SCT/M" />
              </el-form-item>  -->
              <el-form-item label="BOMid" prop="bomid" >
                <el-input v-model="form.bomid" @blur="getbom(form.bomid)" placeholder="请输入BOMid" />
              </el-form-item> 
              <!-- <el-form-item label="BOM审批值" prop="bomApprove" >
                <el-input v-model="form.bomApprove" placeholder="请输入BOM审批值" />
              </el-form-item> 
              <el-form-item label="BOM提交日期" prop="bomCreatedate" >
                <el-date-picker clearable size="small"
                                v-model="form.bomCreatedate"
                                type="date"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd"
                                placeholder="选择BOM提交日期"
                                style="width: 390px;"
                                >
                </el-date-picker>
              </el-form-item>  -->
              <el-form-item label="到货日期" prop="deleveryDate" >
                <el-date-picker clearable size="small"
                                v-model="form.deleveryDate"
                                type="date"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd"
                                placeholder="选择到货日期"
                                style="width: 390px;"
                                >
                </el-date-picker>
              </el-form-item> 
              <el-form-item label="报价日期" prop="quotationDate">
                <el-date-picker clearable size="small"
                                v-model="form.quotationDate"
                                type="date"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd"
                                placeholder="选择报价日期"
                                style="width: 390px;"
                                >
                </el-date-picker>
              </el-form-item> 
              <!-- <el-form-item label="去向选择" prop="trackto" >
                  <el-select  v-model="form.trackto" placeholder="请选择维修流程" style="width: 390px;">
                    <el-option
                      v-for="item in option"
                      :label="item"
                      :value="item"
                      :key="item">
                    </el-option>
                  </el-select>       
              </el-form-item> -->
              <el-form-item label="维修流程" prop="repairFlow"  >
                  <el-select  v-model="form.repairFlow"  placeholder="请选择维修流程" style="width: 390px;">
                    <el-option
                      v-for="item in option1"
                      :label="item"
                      :value="item"
                      :key="item">
                    </el-option>
                  </el-select>       
          </el-form-item>
              <el-form-item label="暂存位置" prop="blockStoragebin" >
                <el-input v-model="form.blockStoragebin" placeholder="请输入暂存位置" />
              </el-form-item> 
              <el-form-item label="维修价格" prop="repairPrice" >
                <el-input v-model="form.repairPrice" placeholder="请输入维修价格" />
              </el-form-item> 
              <el-form-item label="PM04" prop="pmZf">
                <el-input v-model="form.pmZf" placeholder="请输入PM04" />
              </el-form-item>
              <el-form-item label="PR" prop="pr">
                <el-input v-model="form.pr" placeholder="请输入PR" />
              </el-form-item>
              <el-form-item label="PO" prop="po">
                <el-input v-model="form.po" placeholder="请输入PO" />
              </el-form-item>
              <el-form-item label="维修备注" prop="repairComment">
                <el-input v-model="form.repairComment" placeholder="请输入维修备注" />
              </el-form-item>
            </div>
              <!-- <el-form-item label="测试技术员" prop="technician">
                <el-input v-model="form.technician" placeholder="请输入测试技术员" />
              </el-form-item> -->
     

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="open=false">取 消</el-button>
      </div>
    </el-dialog>

  

  </div>
</template>

<script>
import { listQuotation ,getfixFlow, cancelOutFix, updateQuotation,getSct, getBom,submitOutfix,getTrackInfo,} from "@/api/material/amend/confirm";

export default {
  name: "Quotation",
  data() {
    return {
      matetStc:'',
      option:[],
      option1:[],
      // form1:{},
      // dialogVisible:false,
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
      // 外修单表格数据
      quotationList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id:null,
        materialNo: null,
        qty: null,
        sn: null,
        pm: null,
        repairType: null,
        repairLevel: null,
        supplier: null,
        trackto: null,
        quotationDate: null,
        sct: null,
        bomid: null,
        bomCreatedate: null,
        bomApprove: null,
        pm04: null,
        pr: null,
        po: null,
        deleveryDate: null,
        receiveDate: null,
        repairComment: null,
        repairFlow: null,
        blockStoragebin: null,
        submit: null,
        testingComment: null,
        technician: null,
        bomCreatetime: null,
        bomStatus: null,
        repairNo:null
      },
      queryId:{
        id:null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // deleveryDate: [{ required: true, message: '请选择到货日期', trigger: 'change' }],
      }
    };
  },
  created() {
    this.getList();
  },

  methods: {
    /** 查询外修单列表 */
    getList() {
      this.loading = true;
      listQuotation(this.queryParams).then(response => {
        this.quotationList = response.rows;
        this.total = response.total;
        this.loading = false;  
        if(this.quotationList.length === 0){
              this.$message({
                showClose: true,
                message: '查询数据为空,暂无数据',
                type: 'warning'
               });
        }
      //通过物料号获取sct/m信息
      // getSct(materialNo).then(res=>{
      //   this.form.sct = res.data.sct
      // })
      }),
      //获取去向
      getTrackInfo().then(res=>{
        this.option = res.data
      })
      //获取维修流程
      getfixFlow().then(res=>{
        this.option1 = res.data
      })

    },
    //获取BOM
    getbom(bomid){
      getBom(bomid).then(res=>{
        this.form.bomApprove = res.data.bomApprove
        this.form.bomCreatedate = res.data.bomCreateDate
      })
    },
    //换行
    formatContent(content) {
      if (content !== null && content !== undefined) {
        // 使用分号分割字符串，然后使用 <br> 标签进行换行处理
        const parts = content.split(";");
        return parts.join("<br>");
      } else {
        return ""; // 如果 content 为 null，返回一个空字符串或其他适当的默认值
      }
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
        receiveDate:null,
        materialNo: null,
        qty: null,
        sn: null,
        pm: null,
        repairType: null,
        repairLevel: null,
        supplier: null,
        trackto: null,
        quotationDate: null,
        sct: null,
        bomid: null,
        bomCreatedate: null,
        bomApprove: null,
        pm04: null,
        pr: null,
        po: null,
        deleveryDate: null,
        receiveDate: null,
        repairComment: null,
        repairFlow: null,
        blockStoragebin: null,
        submit: null,
        testingComment: null,
        technician: null,
        bomCreatetime: null,
        bomStatus: "0",
        materialStatus:null,
        quotationDate:null,
      };
      this.resetForm("form");
    },
    //提交外修单
    submitOutFix(row){
      const id = row.id || this.ids
      if(row.repairFlow == 'Block'||row.repairFlow == '异常'){
        this.$modal.msgWarning("维修流程异常，不可提交！");
      }else{
         submitOutfix(id).then(res=>{
        this.$modal.msgSuccess("提交成功!");
        this.getList();
      },
      error=>{
        this.$modal.msgError("提交失败!");
        this.getList();
      }
      )
      }
      this.getList();
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

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.open = true;
      // const id = row.id || this.ids
      const materialNo = row.materialNo
      console.log(materialNo,'materialNo');
      this.form = row;
      this.form.repairLevel = row.repairLevel;
      if(this.form.repairLevel =='正常'){
        this.form.repairLevel = '0';
      }else if(this.form.repairLevel =='紧急'){
        this.form.repairLevel = '1';
      }
      console.log(this.form.repairLevel,'this.form.repairLevel');
      this.title = "修改外修单";
      },
    /** 修改提交按钮 */
    submitForm() {
      this.$refs.form.validate(valid=>{
        if(valid){
           updateQuotation(this.form).then(response => {
              this.$modal.msgSuccess("修改成功!");
              this.open = false;
              this.getList();
            },
            error=>{
              this.$modal.msgError("修改失败!");
              this.open = false;
              this.getList();
            }
            );
        }
      })
           
    },
    /** 取消按钮操作 */
    handelCancel(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认取消外修单ID号为"' + ids + '"的数据项？').then(function() {
        return cancelOutFix(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("取消成功！");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('material/quotation/export', {
        ...this.queryParams
      }, `quotation_${new Date().getTime()}.xlsx`)
    },
    //供应商返修统计导出
    handleFixsExport(){
      this.download('/material/quotation/exportSupplierNumber', {
        ...this.queryParams
      }, `供应商返修统计导出表_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
