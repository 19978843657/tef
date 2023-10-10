<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="创建账户" prop="createAccount">
        <el-input
          v-model="queryParams.createAccount"
          placeholder="请输入创建账户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="修改账户" prop="updateAccount">
        <el-input
          v-model="queryParams.updateAccount"
          placeholder="请输入修改账户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料编码" prop="materialNo">
        <el-input
          v-model="queryParams.materialNo"
          placeholder="请输入物料编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料描述" prop="materialDes">
        <el-input
          v-model="queryParams.materialDes"
          placeholder="请输入物料描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数量" prop="qty">
        <el-input
          v-model="queryParams.qty"
          placeholder="请输入数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="sn码" prop="sn">
        <el-input
          v-model="queryParams.sn"
          placeholder="请输入sn码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物品类别" prop="classIfication">
        <el-input
          v-model="queryParams.classIfication"
          placeholder="请输入物品类别"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label=" 订单" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="请输入 订单"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工程师名称" prop="engineer">
        <el-input
          v-model="queryParams.engineer"
          placeholder="请输入工程师名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否rfid初始化" prop="rfidInitialize">
        <el-input
          v-model="queryParams.rfidInitialize"
          placeholder="请输入是否rfid初始化"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否需要维修" prop="repairAble">
        <el-input
          v-model="queryParams.repairAble"
          placeholder="请输入是否需要维修"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="维修水平" prop="repairLevel">
        <el-input
          v-model="queryParams.repairLevel"
          placeholder="请输入维修水平"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供应商来源" prop="supplierSource">
        <el-input
          v-model="queryParams.supplierSource"
          placeholder="请输入供应商来源"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供应商" prop="supplier">
        <el-input
          v-model="queryParams.supplier"
          placeholder="请输入供应商"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="技术员" prop="technician">
        <el-input
          v-model="queryParams.technician"
          placeholder="请输入技术员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="跟踪" prop="trackto">
        <el-input
          v-model="queryParams.trackto"
          placeholder="请输入跟踪"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发送时间" prop="sendDate">
        <el-date-picker clearable size="small"
                        v-model="queryParams.sendDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择发送时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="运单号码" prop="shippingNo">
        <el-input
          v-model="queryParams.shippingNo"
          placeholder="请输入运单号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="sct" prop="sct">
        <el-input
          v-model="queryParams.sct"
          placeholder="请输入sct"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="缺少" prop="missing">
        <el-input
          v-model="queryParams.missing"
          placeholder="请输入缺少"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="维修流程" prop="repairFlow">
        <el-input
          v-model="queryParams.repairFlow"
          placeholder="请输入维修流程"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="维修评价" prop="repairComment">
        <el-input
          v-model="queryParams.repairComment"
          placeholder="请输入维修评价"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报价日期" prop="quotationDate">
        <el-date-picker clearable size="small"
                        v-model="queryParams.quotationDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择报价日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="报价金额" prop="repairPrice">
        <el-input
          v-model="queryParams.repairPrice"
          placeholder="请输入报价金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="bomid" prop="bomid">
        <el-input
          v-model="queryParams.bomid"
          placeholder="请输入bomid"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="bom日期" prop="bomcreatedate">
        <el-date-picker clearable size="small"
                        v-model="queryParams.bomcreatedate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择bom日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="bom流程" prop="bomflow">
        <el-input
          v-model="queryParams.bomflow"
          placeholder="请输入bom流程"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="pr单" prop="pr">
        <el-input
          v-model="queryParams.pr"
          placeholder="请输入pr单"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="po单" prop="po">
        <el-input
          v-model="queryParams.po"
          placeholder="请输入po单"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计划日期" prop="planpoDeleverydate">
        <el-date-picker clearable size="small"
                        v-model="queryParams.planpoDeleverydate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择计划日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="实际日期" prop="actualDeleverydate">
        <el-date-picker clearable size="small"
                        v-model="queryParams.actualDeleverydate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择实际日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="测试注释" prop="testingComment">
        <el-input
          v-model="queryParams.testingComment"
          placeholder="请输入测试注释"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="其他" prop="otherComment">
        <el-input
          v-model="queryParams.otherComment"
          placeholder="请输入其他"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="epc" prop="materialDetailNo">
        <el-input
          v-model="queryParams.materialDetailNo"
          placeholder="请输入epc"
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
          v-hasPermi="['material:master:add']"
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
          v-hasPermi="['material:master:edit']"
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
          v-hasPermi="['material:master:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['material:master:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="masterList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="维修总表id" align="center" prop="maintenanceId" />
      <el-table-column label="创建账户" align="center" prop="createAccount" />
      <el-table-column label="修改账户" align="center" prop="updateAccount" />
      <el-table-column label="上一个状态" align="center" prop="lastStatus" />
      <el-table-column label="当前状态" align="center" prop="currentStatus" />
      <el-table-column label="物料编码" align="center" prop="materialNo" />
      <el-table-column label="物料描述" align="center" prop="materialDes" />
      <el-table-column label="数量" align="center" prop="qty" />
      <el-table-column label="sn码" align="center" prop="sn" />
      <el-table-column label="物品类别" align="center" prop="classIfication" />
      <el-table-column label=" 订单" align="center" prop="orderNo" />
      <el-table-column label="工程师名称" align="center" prop="engineer" />
      <el-table-column label="是否rfid初始化" align="center" prop="rfidInitialize" />
      <el-table-column label="是否需要维修" align="center" prop="repairAble" />
      <el-table-column label="维修类型" align="center" prop="repairType" />
      <el-table-column label="维修水平" align="center" prop="repairLevel" />
      <el-table-column label="供应商来源" align="center" prop="supplierSource" />
      <el-table-column label="供应商" align="center" prop="supplier" />
      <el-table-column label="技术员" align="center" prop="technician" />
      <el-table-column label="跟踪" align="center" prop="trackto" />
      <el-table-column label="发送时间" align="center" prop="sendDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.sendDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="运单号码" align="center" prop="shippingNo" />
      <el-table-column label="sct" align="center" prop="sct" />
      <el-table-column label="缺少" align="center" prop="missing" />
      <el-table-column label="维修流程" align="center" prop="repairFlow" />
      <el-table-column label="维修评价" align="center" prop="repairComment" />
      <el-table-column label="报价日期" align="center" prop="quotationDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.quotationDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报价金额" align="center" prop="repairPrice" />
      <el-table-column label="bomid" align="center" prop="bomid" />
      <el-table-column label="bom日期" align="center" prop="bomcreatedate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.bomcreatedate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="bom流程" align="center" prop="bomflow" />
      <el-table-column label="pr单" align="center" prop="pr" />
      <el-table-column label="po单" align="center" prop="po" />
      <el-table-column label="计划日期" align="center" prop="planpoDeleverydate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.planpoDeleverydate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际日期" align="center" prop="actualDeleverydate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.actualDeleverydate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="测试注释" align="center" prop="testingComment" />
      <el-table-column label="其他" align="center" prop="otherComment" />
      <el-table-column label="历史表状态" align="center" prop="masterStatus" />
      <el-table-column label="epc" align="center" prop="materialDetailNo" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['material:master:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['material:master:remove']"
          >删除</el-button>
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

    <!-- 添加或修改维修单历史记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="创建账户" prop="createAccount">
          <el-input v-model="form.createAccount" placeholder="请输入创建账户" />
        </el-form-item>
        <el-form-item label="修改账户" prop="updateAccount">
          <el-input v-model="form.updateAccount" placeholder="请输入修改账户" />
        </el-form-item>
        <el-form-item label="物料编码" prop="materialNo">
          <el-input v-model="form.materialNo" placeholder="请输入物料编码" />
        </el-form-item>
        <el-form-item label="物料描述" prop="materialDes">
          <el-input v-model="form.materialDes" placeholder="请输入物料描述" />
        </el-form-item>
        <el-form-item label="数量" prop="qty">
          <el-input v-model="form.qty" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="sn码" prop="sn">
          <el-input v-model="form.sn" placeholder="请输入sn码" />
        </el-form-item>
        <el-form-item label="物品类别" prop="classIfication">
          <el-input v-model="form.classIfication" placeholder="请输入物品类别" />
        </el-form-item>
        <el-form-item label=" 订单" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="请输入 订单" />
        </el-form-item>
        <el-form-item label="工程师名称" prop="engineer">
          <el-input v-model="form.engineer" placeholder="请输入工程师名称" />
        </el-form-item>
        <el-form-item label="是否rfid初始化" prop="rfidInitialize">
          <el-input v-model="form.rfidInitialize" placeholder="请输入是否rfid初始化" />
        </el-form-item>
        <el-form-item label="是否需要维修" prop="repairAble">
          <el-input v-model="form.repairAble" placeholder="请输入是否需要维修" />
        </el-form-item>
        <el-form-item label="维修水平" prop="repairLevel">
          <el-input v-model="form.repairLevel" placeholder="请输入维修水平" />
        </el-form-item>
        <el-form-item label="供应商来源" prop="supplierSource">
          <el-input v-model="form.supplierSource" placeholder="请输入供应商来源" />
        </el-form-item>
        <el-form-item label="供应商" prop="supplier">
          <el-input v-model="form.supplier" placeholder="请输入供应商" />
        </el-form-item>
        <el-form-item label="技术员" prop="technician">
          <el-input v-model="form.technician" placeholder="请输入技术员" />
        </el-form-item>
        <el-form-item label="跟踪" prop="trackto">
          <el-input v-model="form.trackto" placeholder="请输入跟踪" />
        </el-form-item>
        <el-form-item label="发送时间" prop="sendDate">
          <el-date-picker clearable size="small"
                          v-model="form.sendDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择发送时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="运单号码" prop="shippingNo">
          <el-input v-model="form.shippingNo" placeholder="请输入运单号码" />
        </el-form-item>
        <el-form-item label="sct" prop="sct">
          <el-input v-model="form.sct" placeholder="请输入sct" />
        </el-form-item>
        <el-form-item label="缺少" prop="missing">
          <el-input v-model="form.missing" placeholder="请输入缺少" />
        </el-form-item>
        <el-form-item label="维修流程" prop="repairFlow">
          <el-input v-model="form.repairFlow" placeholder="请输入维修流程" />
        </el-form-item>
        <el-form-item label="维修评价" prop="repairComment">
          <el-input v-model="form.repairComment" placeholder="请输入维修评价" />
        </el-form-item>
        <el-form-item label="报价日期" prop="quotationDate">
          <el-date-picker clearable size="small"
                          v-model="form.quotationDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择报价日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报价金额" prop="repairPrice">
          <el-input v-model="form.repairPrice" placeholder="请输入报价金额" />
        </el-form-item>
        <el-form-item label="bomid" prop="bomid">
          <el-input v-model="form.bomid" placeholder="请输入bomid" />
        </el-form-item>
        <el-form-item label="bom日期" prop="bomcreatedate">
          <el-date-picker clearable size="small"
                          v-model="form.bomcreatedate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择bom日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="bom流程" prop="bomflow">
          <el-input v-model="form.bomflow" placeholder="请输入bom流程" />
        </el-form-item>
        <el-form-item label="pr单" prop="pr">
          <el-input v-model="form.pr" placeholder="请输入pr单" />
        </el-form-item>
        <el-form-item label="po单" prop="po">
          <el-input v-model="form.po" placeholder="请输入po单" />
        </el-form-item>
        <el-form-item label="计划日期" prop="planpoDeleverydate">
          <el-date-picker clearable size="small"
                          v-model="form.planpoDeleverydate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择计划日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际日期" prop="actualDeleverydate">
          <el-date-picker clearable size="small"
                          v-model="form.actualDeleverydate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择实际日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="测试注释" prop="testingComment">
          <el-input v-model="form.testingComment" placeholder="请输入测试注释" />
        </el-form-item>
        <el-form-item label="其他" prop="otherComment">
          <el-input v-model="form.otherComment" placeholder="请输入其他" />
        </el-form-item>
        <el-form-item label="epc" prop="materialDetailNo">
          <el-input v-model="form.materialDetailNo" placeholder="请输入epc" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listMaster, getMaster, delMaster, addMaster, updateMaster } from "@/api/material/amend/complete";

export default {
  name: "Master",
  data() {
    return {
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
      // 维修单历史记录表格数据
      masterList: [],
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
        lastStatus: null,
        currentStatus: null,
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
        sendDate: null,
        shippingNo: null,
        sct: null,
        missing: null,
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
        masterStatus: null,
        materialDetailNo: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询维修单历史记录列表 */
    getList() {
      this.loading = true;
      listMaster(this.queryParams).then(response => {
        this.masterList = response.rows;
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
        maintenanceId: null,
        createTime: null,
        createAccount: null,
        updateTime: null,
        updateAccount: null,
        lastStatus: "0",
        currentStatus: "0",
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
        sendDate: null,
        shippingNo: null,
        sct: null,
        missing: null,
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
        masterStatus: "0",
        materialDetailNo: null
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
      this.ids = selection.map(item => item.maintenanceId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加维修单历史记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const maintenanceId = row.maintenanceId || this.ids
      getMaster(maintenanceId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改维修单历史记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.maintenanceId != null) {
            updateMaster(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMaster(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const maintenanceIds = row.maintenanceId || this.ids;
      this.$modal.confirm('是否确认删除维修单历史记录编号为"' + maintenanceIds + '"的数据项？').then(function() {
        return delMaster(maintenanceIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('material/master/export', {
        ...this.queryParams
      }, `master_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
