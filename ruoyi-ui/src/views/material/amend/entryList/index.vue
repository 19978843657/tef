<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
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
      <el-form-item label="数量" prop="qty">
        <el-input
          v-model="queryParams.qty"
          placeholder="请输入数量"
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
      <el-form-item label="工程师" prop="engineer">
        <el-input
          v-model="queryParams.rfidLnitialize"
          placeholder="请输入工程师"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="rfid寿命" prop="rfidLift">
        <el-input
          v-model="queryParams.rfidLift"
          placeholder="请输入rfid寿命"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="维修次数" prop="repairCount">-->
<!--        <el-input-->
<!--          v-model="queryParams.repairCount"-->
<!--          placeholder="请输入维修次数"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="推荐供应商" prop="prefereSupplier">-->
<!--        <el-input-->
<!--          v-model="queryParams.prefereSupplier"-->
<!--          placeholder="请输入推荐供应商"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="备注" prop="suppilerComment">-->
<!--        <el-input-->
<!--          v-model="queryParams.suppilerComment"-->
<!--          placeholder="请输入备注"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="能否维修" prop="repariable">-->
<!--        <el-input-->
<!--          v-model="queryParams.repariable"-->
<!--          placeholder="请输入能否维修"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="紧急维修" prop="repairLevel">-->
<!--        <el-input-->
<!--          v-model="queryParams.repairLevel"-->
<!--          placeholder="请输入紧急维修"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="维修商来源" prop="supplierSource">-->
<!--        <el-input-->
<!--          v-model="queryParams.supplierSource"-->
<!--          placeholder="请输入维修商来源"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="维修商" prop="supplier">-->
<!--        <el-input-->
<!--          v-model="queryParams.supplier"-->
<!--          placeholder="请输入维修商"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="技术员" prop="technician">-->
<!--        <el-input-->
<!--          v-model="queryParams.technician"-->
<!--          placeholder="请输入技术员"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="维修备注" prop="repairComment">-->
<!--        <el-input-->
<!--          v-model="queryParams.repairComment"-->
<!--          placeholder="请输入维修备注"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="epc" prop="materialDetailNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.materialDetailNo"-->
<!--          placeholder="请输入epc"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
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
          v-hasPermi="['material:confirm:add']"
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
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['material:confirm:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['material:confirm:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="confirmList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id号" align="center" prop="id" />
      <el-table-column label="物料号" align="center" prop="materialNo" />
      <el-table-column label="物料描述" align="center" prop="materialDes" />
      <el-table-column label="PM单号" align="center" prop="pm" />
      <el-table-column label="序列号" align="center" prop="sn" />
      <el-table-column label="分类" align="center" prop="classification" />
      <el-table-column label="物料详细编码" align="center" prop="rfidLnitialize" />
      <el-table-column label="设备使用时间" align="center" prop="rfidLift" />
      <el-table-column label="损坏日期" align="center" prop="brokenDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.brokenDate, '{y}-{m}-{d}') }}</span>   
        </template>
      </el-table-column>
      <el-table-column label="损坏描述" align="center" prop="materialDes" />
     <el-table-column label="能否维修" align="center" prop="repariable" />
      <el-table-column label="维修类型" align="center" prop="materialDes" />
<!--      <el-table-column label="维修次数" align="center" prop="repairCount" />-->
     <el-table-column label="推荐供应商" align="center" prop="prefereSupplier" />
<!--      <el-table-column label="备注" align="center" prop="suppilerComment" />-->
<!--      <el-table-column label="紧急维修" align="center" prop="repairLevel" />-->
     <el-table-column label="维修商来源" align="center" prop="supplierSource" />
<!--      <el-table-column label="维修商" align="center" prop="supplier" />-->
     <el-table-column label="技术员" align="center" prop="technician" />
      <el-table-column label="单据状态" align="center" prop="materialStatus" />
<!--      <el-table-column label="epc" align="center" prop="materialDetailNo" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
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
            @click="handleUpdate(scope.row)"
            v-hasPermi="['material:confirm:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="scrape(scope.row)"
            v-hasPermi="['material:confirm:scrap']"
          >报废</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="scrap(scope.row)"
            v-hasPermi="['material:confirm:scrap']"
          >取消</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['material:confirm:repair']"
          >维修</el-button>
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
    <el-dialog :title="title" :rules="rules" :visible.sync="open" width="1000px"  append-to-body>
      <el-form label-position="left" ref="form" :model="form" :rules="rules" label-width="80px" >
        <el-row :gutter="20">
          <el-col :span="12">  
            <div>
              <el-form-item label="ID号" prop="id" >
                <el-input v-model="form.id"  placeholder="请输入ID号" required />
              </el-form-item>
              <el-form-item label="物料号" prop="materialNo">
                <el-input v-model="form.materialNo" placeholder="请输入物料号" />
              </el-form-item>
              <el-form-item label="物料描述" prop="materialDes">
                <el-input v-model="form.materialDes" placeholder="请输入物料描述" />
              </el-form-item>
              <el-form-item label="序列号" prop="sn">
                <el-input v-model="form.sn" placeholder="请输入序列号" />
              </el-form-item>
              <el-form-item label="分类" prop="classification">
                  <el-select  v-model="form.classification" placeholder="请输入分类">
                    <el-option
                      v-for="item in option"
                      :label="item.label"
                      :value="item.value"
                      :key="item.value">
                    </el-option>
                  </el-select>       
              </el-form-item>
              <el-form-item label="PM单号" prop="pm">
                <el-input v-model="form.pm" placeholder="请输入PM单号" />
              </el-form-item>
              <el-form-item label="损坏描述" prop="materialDes">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入损坏描述"
                  v-model="form.materialDes">
                </el-input>
              </el-form-item>
              <el-form-item label="RFID标签">
                <el-radio-group v-model="form.isrfid" size="medium">
                  <el-radio  label="已有"></el-radio>
                  <el-radio  label="暂无"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-from-item z v-if="form.isrfid=='已有'">
                <el-input v-model="form.rfid" placeholder="请扫描或输入已有RFID编号"></el-input>
              </el-from-item>
              <el-form-item label="是否维修">
                <el-radio-group v-model="form.wx" size="medium">
                  <el-radio  label="是"></el-radio>
                  <el-radio  label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
           </div> 
        <!-- <el-form-item label="损坏日期" prop="brgbokenDate">
          <el-date-picker clearable size="small"
                          v-model="form.brokenDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择损坏日期">
          </el-date-picker>
        </el-form-item> --> 
          </el-col>
          <el-col :span="12">
          <div style="border-left: 2px solid #c7c7c7;padding-left: 20px;">
            <el-form-item label="维修类型">
                <el-radio-group v-model="form.wx" size="medium">
                  <el-radio  label="内修"></el-radio>
                  <el-radio  label="外修"></el-radio>
                </el-radio-group>
              </el-form-item>
          </div>
          </el-col>
        </el-row>
      </el-form>
    
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button type="primary" @click="cancel" plain>提 交</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="download.title" :visible.sync="download.open" :close-on-click-modal="false" width="1000px" append-to-body>
      <div id="pdfDom" style="padding: 10px;">
        <table class="printTable" style="width: 100%; text-align: center" border="1" cellspacing="0" cellpadding="0">
          <tbody>
          <tr>
            <td class="bgg" colspan="6">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px;">
                <span style="width: 160px;" />
                <span style="font-size: 20px; font-weight: 700;">损坏备件信息卡</span>
                <span style="display: inline-flex; align-items: center;">
                    <span style="margin-right: 10px;">编号:</span>
                    <span style="display: inline-flex; flex-direction: column;">
                      <img :src="form.flowIdBarCodeBase64" alt="">
                      <span>{{ form.id }}</span>
                    </span></span>
              </div>
            </td>
          </tr>
          <tr >
            <td class="bgg" :rowspan="2">物料号</td>
            <td colspan="2">{{ form.materialNo }}</td>
            <td class="bgg" :rowspan="2">PM单号</td>
            <td  colspan="2">{{ form.pm }}</td>
          </tr>
          <tr>
<!--            <td class="bgg" :rowspan="2">物料描述</td>-->
<!--            <td colspan="2" :rowspan="2">{{ form.materialDes }}</td>-->
            <td class="bgg">数量</td>
            <td colspan="4">{{ form.qty }}</td>
            <td  colspan="1">分类</td>
            <td colspan="1">{{ form.classification }}</td>
          </tr>
<!--          <tr>-->
<!--           -->
<!--          </tr>-->
          <tr>
            <td class="bgg">物料序列号</td>
            <td colspan="3">{{ form.sn }}</td>
            <td class="bgg" :rowspan="2">rfid初始化</td>
            <td :rowspan="2" colspan="3">{{ form.rfidLnitialize }}</td>
<!--            <td class="bgg">RFID编码</td>-->
            <!-- <td colspan="2">{{ form.materialDetailNo }}</td> -->
          </tr>

          <tr>

            </tr>
            <tr>
            <td class="bgg">rfid寿命</td>
            <td colspan="2">{{ form.rfidLift }}</td>
          </tr>
<!--          <tr>-->
<!--            <td class="bgg">机床名称</td>-->
<!--            <td colspan="2">{{ form.machineName }}</td>-->
<!--          </tr>-->
<!--          <tr>-->
<!--            <td class="bgg">故障部位及故障描述</td>-->
<!--            <td colspan="5">{{ form.faultPositionDes }}</td>-->
<!--          </tr>-->
          <tr>
            <td colspan="5">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px;">
                  <span style="display: inline-flex; flex-direction: column;">
                    <img :src="form.repairQRCodeBase64" width="50" alt="">
                    <span>
                      <el-checkbox style="pointer-event: none;" />
                      <span style="margin-left: 5px;">维修</span>
                    </span>
                  </span>
                <span style="display: inline-flex; flex-direction: column;">
                    <img :src="form.scrapeQRCodeBase64" width="50" alt="">
                    <span>
                      <el-checkbox style="pointer-event: none;" />
                      <span style="margin-left: 5px;">报废</span>
                    </span>
                  </span>
                <!-- <span style="display: inline-flex; flex-direction: column;">
                  <img :src="form.urgentRepairQRCodeBase64" width="50" alt=""> -->
                <!-- <span>
                  <el-checkbox style="pointer-event: none;" />
                  <span style="margin-left: 5px;">紧急维修</span>
                </span> -->
                <!-- </span> -->
              </div>
            </td>
            <td>损坏日期: {{ form.brokenDate ? form.brokenDate.split(' ').splice(0, 1).join(' ') : '' }}</td>
          </tr>
          <tr>
            <td class="bgg" colspan="6">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px;">
                <span style="width: 300px; text-align: left;">技术员: {{ form.operationame }}</span>
                <span style="width: 300px; text-align: left;">工程师确认:</span>
                <span style="width: 300px; text-align: left;">科长确认:</span>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDownload">下 载</el-button>
        <el-button @click="download.open = false">取 消</el-button>
      </div>
    </el-dialog>
<!--    确认是否维修页面-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
>
      <span>确认维修？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="scrap">否</el-button>
    <el-button type="primary" @click="dialogVisib = true">确认</el-button>
  </span>
    </el-dialog>
<!--    确认内外修页面-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisib"
      width="30%">
      <span>请确认内外修</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisib = false">取 消</el-button>
        <el-button @click="scrap">内修</el-button>
    <el-button type="primary" @click="dialogVisible = false">外修</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
import { listConfirm, getConfirm, delConfirm, addConfirm, updateConfirm ,scrapea,cance} from "@/api/material/amend/confirm";
// import { getFlow } from '@/api/material/amend/'

export default {
  name: "Confirm",
  data() {
    return {
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
      download: {
        open: false,
        title: '',
        id: null
      },
      option:[
        {
          label:1,
          value:1
        },
        {
          label:2,
          value:2
        }
      ],
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
        id:[{required:true,message:'请输入唯一ID号!',trigger:'blur'}]
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
      listConfirm(this.queryParams).then(response => {
        this.confirmList = response.rows;
        this.total = response.total;
        this.loading = false;
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
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateConfirm(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addConfirm(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    handleDownload(row) {
      this.download.id = row.id
      const materialFlowId = row.id
      getConfirm(materialFlowId).then(response => {
        this.form = response.data
        this.download.open = true
        this.download.title = '清单预览'
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
      if (this.mater==null){
        this.scraid = row.id || this.ids;
      }else {
        this.scraid = this.mater.id ;
      }
      // console.log(this.mater.id)
      cance(this.scraid).then(response => {
        this.dialogVisible = false;
        this.$modal.msgSuccess("取消成功");
        this.getList();
      })
    },
    /** 报废按钮操作 */
    scrape(row) {
      const ids = row.id || this.ids;
      scrapea(ids).then(response => {
        this.$modal.msgSuccess("报废成功");
        this.getList();
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('material/confirm/export', {
        ...this.queryParams
      }, `confirm_${new Date().getTime()}.xlsx`)
    },
    submitDownload() {
      this.$nextTick(() => { this.getPdf({ title: '损坏设备信息卡' + this.form.id }) })
    }
  }
};
</script>
