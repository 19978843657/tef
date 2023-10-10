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
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['material:confirm:edit']"
        >修改</el-button>
      </el-col>
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
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="confirmList" @selection-change="handleSelectionChange" height="580px">
      <el-table-column type="selection" width="30" align="center" />
      <el-table-column label="id号" align="center" prop="repairNo" width="100"/>
      <el-table-column label="物料号" align="center" prop="materialNo" width="115"  />
      <el-table-column label="物料描述" align="center" prop="materialDes" width="250"/>
      <el-table-column label="PM单号" align="center" prop="pm" width="180"/>
      <el-table-column label="序列号" align="center" prop="sn" width="180"/>
      <el-table-column label="分类" align="center" prop="classification" />
      <el-table-column label="是否有RFID标签" align="center" prop="rfidLnitialize" width="120"/>
      <el-table-column label="物料详细编码" align="center" prop="materialDetailNo" width="180"/>
      <el-table-column label="设备使用时间" align="center" prop="rfidLift" width="150"/>
      <el-table-column label="损坏日期" align="center" prop="brokenDate" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.brokenDate|formateDate }}</span>   
        </template>
      </el-table-column>
      <el-table-column label="损坏描述" align="center" prop="damageDescription" width="180" />
      <!-- <el-table-column label="维修类型" align="center" prop="repairLevel" width="150" />
     <el-table-column label="推荐供应商" align="center" prop="prefereSupplier" width="150"/>
     <el-table-column label="维修商来源" align="center" prop="supplierSource" width="120"/> -->
     <el-table-column label="创建时间" align="center" prop="createTime" width="180" />
     <!-- <el-table-column label="技术员" align="center" prop="technician" width="220"/> -->
      <el-table-column label="单据状态" align="center" prop="materialStatus" >
        <template slot-scope="scope">
          <span v-if="scope.row.materialStatus == 0">新建</span>   
        </template>
      </el-table-column>
      <!-- <el-table-column label="是否维修" align="center"  width="120"  >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.ifFix"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @click="handelIfFix(scope.row)">
          </el-switch>
        </template>
      </el-table-column> -->
<!--      <el-table-column label="epc" align="center" prop="materialDetailNo" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="400">
        <template slot-scope="scope">
           <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['material:confirm:edit']"
          >修改/确认是否有RFID标签</el-button>
          <el-button
            v-hasPermi="['material:flow:edit']"
            size="mini"
            type="text"
            icon="el-icon-download"
            @click="handleDownload(scope.row)"
          >生成清单</el-button> 
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="SubmitConfirm(scope.row)"
            v-hasPermi="['material:confirm:scrap']"
          >提交单据</el-button>
      
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="scrap(scope.row)"
          >取消</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['material:confirm:repair']"
          >维修</el-button> -->
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

    <!-- 添加或修改维修单据对话框 -->
    <el-dialog :title="title" :rules="rules" :visible.sync="open" :close-on-click-modal="false" width="600px"  append-to-body>
      <el-form label-position="left" ref="form" :model="form" :rules="rules" label-width="80px" >
        <!-- <el-row :gutter="8"> -->
          <!-- <el-col :span="12">   -->
            <div>
              <el-form-item label="ID号" prop="repairNo" v-if="this.title=='添加维修单据'">
                <el-input v-model="form.repairNo"  placeholder="请输入ID号"  />
              </el-form-item>
              <el-form-item label="物料号" prop="materialNo">
                <el-input v-model="form.materialNo" placeholder="请输入物料号" />
              </el-form-item>
              <!-- <el-form-item label="物料描述" prop="materialDes">
                <el-input v-model="form.materialDes" placeholder="请输入物料描述" />
              </el-form-item> -->
              <el-form-item label="序列号" prop="sn">
                <el-input v-model="form.sn" placeholder="请输入序列号" />
              </el-form-item>
              <el-form-item label="分类" prop="classification">
                  <el-select  v-model="form.classification" placeholder="请输入分类">
                    <el-option
                      v-for="item in option"
                      :label="item"
                      :value="item"
                      :key="item">
                    </el-option>
                  </el-select>       
              </el-form-item>
              <el-form-item label="PM单号" prop="pm">
                <el-input v-model="form.pm" placeholder="请输入PM单号" />
              </el-form-item>
              <el-form-item label="损坏描述" prop="damageDescription">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入损坏描述"
                  v-model="form.damageDescription">
                </el-input>
              </el-form-item>
              <el-form-item label="RFID标签" v-if="this.title=='修改维修单据'">
                <el-radio-group v-model="form.rfidLnitialize" size="medium">
                  <el-radio  label="有"></el-radio>
                  <el-radio  label="无"></el-radio>
                </el-radio-group>
                <el-button 
                type="primary" 
                style="margin-left: 126px;margin-top: -33px;width: 55px;height: 30px;display: flex;align-items: center;justify-content: center;"
                @click="IfRfid()">
                保存</el-button>
              </el-form-item>
              <!-- <el-from-item z v-if="form.isrfid=='已有'">
                <el-input v-model="form.rfid" placeholder="请扫描或输入已有RFID编号"></el-input>
              </el-from-item> -->

           </div> 
    
          <!-- </el-col> -->
          <!-- <el-col :span="12">
          <div style="border-left: 2px solid #c7c7c7;padding-left: 20px;">
            <el-form-item label="维修类型">
                <el-radio-group v-model="form.wx" size="medium">
                  <el-radio  label="内修"></el-radio>
                  <el-radio  label="外修"></el-radio>
                </el-radio-group>
              </el-form-item>
          </div>
          </el-col> -->
        <!-- </el-row> -->
      </el-form>
    
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" v-if="this.title=='添加维修单据'">新建维修单</el-button>
        <el-button type="primary" @click="submitForm" v-else>保存维修单</el-button>
        <el-button @click="open=false;getList()">取 消</el-button>
      </div>
    </el-dialog>

    <!--生成清单下载页面-->
    <el-dialog  :visible.sync="download1.open"  :close-on-click-modal="false"  append-to-body>
        <table class="printTable" ref="pdfFile" style="width:190mm ; height: 125mm;  text-align: center;margin: 0 auto;" border="1" cellspacing="0" cellpadding="0">
          <tbody colspan="8">
          <tr>
            <td colspan="8">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px;">
                <span style="width: 160px;"/>
                <span style="font-size: 20px; font-weight: 700;">损坏备件信息卡</span>
                <span style="display: inline-flex; align-items: center;">
                    <span style="margin-left: 17px;margin-right: 3px;">id编号:</span>
                    <span style="display: inline-flex; flex-direction: column;">
                      <img :src="form.flowIdBarCodeBase64" width="100" alt="" >
                      <span>{{ form.repairNo }}</span>
                    </span></span>
              </div>
            </td>
          </tr>
          <tr></tr>
          <tr >
            <td :rowspan="2"  style="width: 80px;">物料号</td>
            <td colspan="3">{{ form.materialNo }}</td>
            <td  :rowspan="2"  style="width: 80px;">PM单号</td>
            <td  colspan="3">{{ form.pm }}</td>
          </tr>
          <tr></tr>
          <tr></tr>
          <tr >
            <td :rowspan="2"  style="width: 80px;">序列号</td>
            <td  :rowspan="2" colspan="3">{{ form.sn }}</td>
            <td  :rowspan="2"   style="width: 80px;">分类</td>
            <td  :rowspan="2" colspan="3">{{ form.classification }}</td>
          </tr>
          <tr></tr>    
            <tr>
            <td :rowspan="3" colspan="1" >物料描述</td>
            <td :rowspan="2" colspan="7">{{ form.materialDes }}</td>
            </tr>
          <tr></tr>
          <tr></tr>
            <tr>
            <td :rowspan="3" colspan="1" >损坏描述</td>
            <td :rowspan="3" colspan="7">{{form.damageDescription}}</td>
            </tr>

            
            <tr></tr>
            <tr></tr>

          <tr>
            <td :rowspan="3" colspan="4">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px;">
                  <span style="display: inline-flex; flex-direction:column; ">
                    <img :src="form.repairQRCodeBase64" width="50" alt="">
                    <span>
                      <el-checkbox style="pointer-event: none;" />
                      <span style="margin-left: 5px;">维修</span>
                    </span>
                  </span>
                <span style="display: inline-flex; flex-direction:column; ">
                    <img :src="form.scrapeQRCodeBase64" width="50" alt="">
                    <span>
                      <el-checkbox style="pointer-event: none;" />
                      <span style="margin-left: 5px;">报废</span>
                    </span>
                  </span>
   
              </div>
            </td>
            <td :rowspan="5" colspan="4">
              <div style="display: flex; flex-direction: column; align-items: flex-start; width: 185px; padding-left: 23px; ">
                <br>
                <span >技术员: {{ form.operationame }}</span>
                <br>
                <span >工程师:</span>
                <br>
                <span >科长签字:</span>
                <br>
              </div>
            </td>
          </tr>

          <tr></tr>
          <tr></tr>

          <tr>
            <td :rowspan="2"  colspan="4">
              损坏日期: {{ form.brokenDate ? form.brokenDate.split(' ').splice(0, 1).join(' ') : '' }}  
            </td>
          </tr>
          </tbody>
        </table>
      <!-- </div> -->

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDownload(form.id)">下 载</el-button>
        <el-button @click="download1.open = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { listConfirm, getConfirm, submitConfirm, addConfirm, updateConfirm ,scrapea,cance,getSortNameList,ifRfid} from "@/api/material/amend/confirm";
// import { getFlow } from '@/api/material/amend/'
import { getToken } from '@/utils/auth'
import html2pdf from 'html2pdf.js';
export default {
  name: "Confirm",
  data() {
    return {
      ifFix:false,
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
      confirmList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      download1: {
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
        // repairCount: null,
        // prefereSupplier: null,
        // suppilerComment: null,
        // repariable: null,
        // repairLevel: null,
        // supplierSource: null,
        // supplier: null,
        // technician: null,
        // repairComment: null,
        // materialDetailNo: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // id:[{required:true,message:'请输入唯一ID号!',trigger:'blur'}]
        repairNo:[ { required: true, message: '此项不能为空', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const regex = /^[A-Za-z0-9]+$/; // 正则表达式，匹配英文和数字
              if (!regex.test(value) || /\s/.test(value)) {
                callback(new Error('只能输入英文或数字，且不能包含空格'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }]
      },
      subData:{
        id:null,
        repairOrder:null
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //是否维修
    handelIfFix(row){
      this.ifFix==true
    },
    //保存是否有rfid
    IfRfid(){
      ifRfid(this.form).then(res=>{
        this.$modal.msgSuccess("保存成功!");
        this.getList();
      },
      error=>{
        this.$modal.msgError("保存失败!");
      }
      
      )
    },
    
    /** 查询维修单据列表 */
    getList() {
      this.loading = true;
      listConfirm(this.queryParams).then(response => {
        this.confirmList = response.rows;
        this.total = response.total;
        this.loading = false;
        console.log(response.rows,'rereere');
        if(this.confirmList.length === 0){
              this.$message({
                showClose: true,
                message: '查询数据为空,暂无数据',
                type: 'warning'
               });
        }
      });
      getSortNameList().then(response=>{
        this.option = response.data
      })
    },
    //提交按钮
    SubmitConfirm(row){
      this.subData.id = row.id || this.ids
      this.subData.repairOrder = row.repairOrder
      console.log(this.subData,'subData');
      submitConfirm(this.subData).then(res=>{
              this.$modal.msgSuccess("提交成功！");
              this.getList();
      },
      error=>{
        this.$modal.msgError("提交失败!");
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
        // repairCount: null,
        // prefereSupplier: null,
        // suppilerComment: null,
        // repariable: null,
        // repairLevel: null,
        // supplierSource: null,
        // supplier: null,
        // technician: null,
        // repairComment: null,
        // materialDetailNo: null
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加维修单据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getConfirm(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改维修单据";
      });

    },
    /** 新增&修改 提交按钮 */
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.title == '修改维修单据') {
            updateConfirm(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            },
            error=>{
              this.$modal.msgError("修改失败!");
            });
          } else {
            addConfirm(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            },
            error=>{
              this.$modal.msgError("新增失败!");
            });
          }
        }
      })
    },
    handleDownload(row) {
      this.reset();
      this.download1.id = row.id
      const materialFlowId = row.id
      getConfirm(materialFlowId).then(response => {
        this.form = response.data
        // console.log(response.data,'ididididi');
        this.download1.open = true
        this.download1.title = '清单预览'
      })
 

    },
    
    /** 维修按钮操作 */
    handleDelete(row) {
      this.dialogVisible = true;
      this.mater = row
    },
    /**
     * 维修取消按钮
     * @param row
     */
    scrap(row) {
      this.scraid = row.id || this.ids;
      cance(this.scraid).then(response => {
        this.dialogVisible = false;
        this.$modal.msgSuccess("取消成功");
        this.getList();
      },
      error=>{
        this.$modal.msgError("取消失败!");
      })
    },
    /** 报废按钮操作 */
    // scrape(row) {
    //   const ids = row.id || this.ids;
    //   scrapea(ids).then(response => {
    //     this.$modal.msgSuccess("报废成功");
    //     this.getList();
    //   })
    // },
    /** 导出按钮操作 */
    handleExport() {
      this.download('/material/confirm/export', {
        ...this.queryParams
      }, `维修登记导出表_${new Date().getTime()}.xlsx`)
    },
    
    //下载pdf
    submitDownload() {
      const pdfElement = this.$refs.pdfFile; 
      const options = {
        margin: 10,
        filename: '损坏备件信息卡.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a5', orientation: 'landscape' },
      };

      html2pdf().from(pdfElement).set(options).save();
    }
  }
};
</script>
