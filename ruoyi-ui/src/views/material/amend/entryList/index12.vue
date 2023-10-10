<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="物料" prop="materialNo">
        <el-input
          v-model="queryParams.materialNo"
          placeholder="请输入物料编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="录入时间">
        <el-date-picker
          v-model="dateRange"
          style="width: 380px;"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
        />
      </el-form-item> -->
      <el-form-item label="库位信息" prop="storeInfo">
        <el-input v-model="queryParams.storeInfo" placeholder="请输入库位信息" clearable size="small"
                  @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="操作人员" prop="operationame">
        <el-select v-model="queryParams.operationame" placeholder="请选择操作人员" clearable>
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.userName"
            :value="item.userName"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:flow:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:flow:edit']"
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:flow:remove']"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    </el-row>

    <el-table v-loading="loading" :data="list" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="维修编号" align="center" prop="flowId" />
<!--      <el-table-column label="物料编码" align="center" prop="materialNo" />-->
<!--      <el-table-column label="物料类型" align="center" prop="materialType">-->
<!--        <template slot-scope="scope">-->
<!--          {{ Constants.codeToName(scope.row.materialType, Constants.MATERIAL_TYPE) }}-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="物料描述" align="center" prop="materialDes" />
      <el-table-column label="数量" align="center" prop="qty" />
      <!-- <el-table-column label="RFID类型" align="center" prop="rfidType" /> -->
      <el-table-column label="序列号" align="center" prop="sn" />
      <el-table-column label="分类" align="center" prop="classification" />
<!--      <el-table-column label="批次" align="center" prop="batch" />-->
<!--      <el-table-column label="成本中心" align="center" prop="costCenter" />-->
<!--      <el-table-column label="采购订单" align="center" prop="poNo" />-->
<!--      <el-table-column label="订单" align="center" prop="purchaseOrder" />-->
      <el-table-column label="损坏日期" align="center" prop="broken_date" width="180" />
      <el-table-column label="pm单" align="center" prop="pm单" />
      <el-table-column label="RFID初始化" align="center" prop="rfidLnitialize" />
      <el-table-column label="rfid寿命" align="center" prop="rfidLift" />
      <el-table-column label="rfid寿命" align="center" prop="rfidLift" />

<!--      <el-table-column label="录入时间" align="center" prop="inputDt" width="180" />-->

      <!-- <el-table-column label="物料状态" align="center" prop="materialStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.material_status" :value="scope.row.materialStatus" />
          {{ Constants.codeToName(scope.row.materialStatus, materialStatusOptions) }}
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="库位信息" align="center" prop="storeInfo" />
      <el-table-column label="标识码" align="center" prop="uUid" />
      <el-table-column label="确认数量" align="center" prop="confirmNumber" /> -->
<!--      <el-table-column label="操作人员" align="center" prop="operationame" />-->
<!--      <el-table-column label="录入种类" align="center" prop="inputType">-->
<!--        <template slot-scope="scope">-->
<!--          <dict-tag :options="dict.type.material_input_type" :value="scope.row.inputType" />-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="检验人员" align="center" prop="checkName"  width="200px"/>-->
<!--      <el-table-column label="历史库位信息" align="center" prop="storeHistoryInfo" />-->
      <!-- <el-table-column label="上架人员" align="center" prop="inputRackName" />
      <el-table-column label="物料详细编码" align="center" prop="materialDetailNo" />
      <el-table-column label="检验时间" align="center" prop="checkDt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.checkDt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
<!--      <el-table-column label="本位币金额" align="center" prop="materialCost" />-->
<!--      <el-table-column label="物料序列号" align="center" prop="materialSerialNo" />-->
<!--      <el-table-column label="维修流程编号" align="center" prop="flowId" />-->
<!--      <el-table-column label="区域" align="center" prop="areaNo" />-->
<!--      <el-table-column label="工位" align="center" prop="localNo" />-->
<!--      <el-table-column label="物料品牌及型号" align="center" prop="brandTypeNo" />-->
<!--      <el-table-column label="物料资产编号" align="center" prop="propertyNo" />-->
<!--      <el-table-column label="物料机床名称" align="center" prop="machineName" />-->
<!--      <el-table-column label="故障部位及描述" align="center" prop="faultPositionDes" />-->
<!--      <el-table-column label="仓库录入文员" align="center" prop="storageInputName" />-->
<!--      <el-table-column label="仓库文员录入时间" align="center" prop="storageInputDt" width="180">-->
        <!-- <template slot-scope="scope">
          <span>{{ parseTime(scope.row.storageInputDt, '{y}-{m}-{d}') }}</span>
        </template> -->
<!--      </el-table-column>-->
<!--      <el-table-column label="紧急维修批准人员" align="center" prop="urgentApprovedName" />-->
<!--      <el-table-column label="紧急维修批准时间" align="center" prop="urgentApprovedDt" width="180">-->
        <!-- <template slot-scope="scope">
          <span>{{ parseTime(scope.row.urgentApprovedDt, '{y}-{m}-{d}') }}</span>
        </template> -->
<!--      </el-table-column>-->
<!--      <el-table-column label="维修单凭证存储文件" align="center" prop="pathRceipts" />-->
<!--      <el-table-column label="维修测试报告附件存储文件" align="center" prop="pathChecked" />-->
<!--      <el-table-column label="维修人员" align="center" prop="maintenance" />-->
<!--      <el-table-column label="维修时间" align="center" prop="maintenanceDt" width="180">-->
        <!-- <template slot-scope="scope">
          <span>{{ parseTime(scope.row.maintenanceDt, '{y}-{m}-{d}') }}</span>
        </template> -->
<!--      </el-table-column>-->
<!--      <el-table-column label="测试人员" align="center" prop="tester" />-->
<!--      <el-table-column label="测试时间" align="center" prop="testDt" width="180">-->
        <!-- <template slot-scope="scope">
          <span>{{ parseTime(scope.row.testDt, '{y}-{m}-{d}') }}</span>
        </template> -->
<!--      </el-table-column>-->
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="200">
        <template slot-scope="scope">
          <!-- <el-button
            v-hasPermi="['material:flow:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleConfirm(scope.row)"
          >工程师确认</el-button> -->
          <!-- <el-button
            v-hasPermi="['material:flow:edit']"
            size="mini"
            type="text"
            icon="el-icon-upload2"
            @click="handleUpload(scope.row)"
          >上传凭证</el-button> -->
          <el-button
            v-hasPermi="['material:flow:edit']"
            size="mini"
            type="text"
            icon="el-icon-download"
            @click="handleDownload(scope.row)"
          >生成清单</el-button>
          <el-button
            v-hasPermi="['material:flow:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['material:flow:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
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

    <!-- 添加或修改维修流程信息对话框 -->
    <el-dialog v-if="open" :title="title" :close-on-click-modal="false" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules1" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="物料编码" prop="materialNo">
              <!-- <el-input v-model="form.materialNo" placeholder="请输入物料编码" /> -->
              <el-autocomplete
                v-model="form.materialNo"
                :fetch-suggestions="querySearch"
                placeholder="请输入物料编码搜索选择"
                label="materialNo"
                suffix-icon="el-icon-search"
                :trigger-on-focus="false"
                style="width: 100%;"
                @select="handleSelect"
              >
                <template slot-scope="{ item }">
                  <div class="option-name">{{ '物料编码：' + item.materialNo }}</div>
                  <span style="font-size: 12px; color: #ccc;">{{ '物料描述：' + item.materialDes }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="PM单号" prop="purchaseOrder">
              <el-input v-model="form.purchaseOrder" placeholder="请输入订单号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="物料描述" prop="materialDes">
              <el-input v-model="form.materialDes" disabled placeholder="请输入物料描述" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="24">
                <el-form-item label="区域" prop="areaNo">
                  <el-input v-model="form.areaNo" placeholder="请输入区域" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="工位" prop="localNo">
                  <el-input v-model="form.localNo" placeholder="请输入localNo" />
                </el-form-item>
              </el-col>
            </el-row>

          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="物料序列号" prop="materialSerialNo">
              <el-input v-model="form.materialSerialNo" placeholder="请输入物料序列号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="RFID编码" prop="materialDetailNo">
              <el-input v-model="form.materialDetailNo" disabled placeholder="备件库文员登记维修时扫描" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="物料品牌及型号(无物料号必填)" prop="brandTypeNo">
              <el-input v-model="form.brandTypeNo" placeholder="请输入物料品牌及型号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="24">
                <el-form-item label="资产号" prop="propertyNo">
                  <el-input v-model="form.propertyNo" placeholder="请输入资产号" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="机床名称" prop="machineName">
                  <el-input v-model="form.machineName" placeholder="请输入机床名称" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="故障部位及故障描述" prop="faultPositionDes">
              <el-input v-model="form.faultPositionDes" type="textarea" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 确认维修流程信息对话框 -->
    <el-dialog :title="title" :visible.sync="openConfirm" width="500px" :close-on-click-modal="false" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="物料编码" prop="materialNo">
          <el-input v-model="form.materialNo" disabled placeholder="请输入物料编码" />
        </el-form-item>
        <el-form-item label="确认类型" prop="materialStatus">
          <!-- <el-input v-model="form.materialStatus" type="materialStatus" placeholder="请输入数量" /> -->
          <el-select v-model="form.materialStatus" placeholder="请选择" clearable>
            <el-option
              v-for="item in materialStatusOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitConfirmForm">确 定</el-button>
        <el-button @click="openConfirm = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="upload.title" :close-on-click-modal="false" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=""
        :headers="upload.headers"
        :action="upload.url + '?materialFlowId=' + upload.materialFlowId"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip text-center">
          <!-- <div slot="tip" class="el-upload__tip">
            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
          </div> -->
          <span>请上传10MB大小以下的文件</span>
          <!-- <span>仅允许导入xls、xlsx格式文件。</span> -->
          <!-- <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="handleDoload">下载模板</el-link> -->
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button :loading="upload.isUploading" @click="upload.open = false">取 消</el-button>
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
                      <span>{{ form.flowId }}</span>
                    </span></span>
                </div>
              </td>
            </tr>
            <tr>
              <td class="bgg">物料号</td>
              <td colspan="2">{{ form.materialNo }}</td>
              <td class="bgg">PM单号</td>
              <td colspan="2">{{ form.purchaseOrder }}</td>
            </tr>
            <tr>
              <td class="bgg" :rowspan="2">物料描述</td>
              <td colspan="2" :rowspan="2">{{ form.materialDes }}</td>
              <td class="bgg">区域</td>
              <td colspan="2">{{ form.areaNo }}</td>
            </tr>
            <tr>
              <td class="bgg">工位</td>
              <td colspan="2">{{ form.localNo }}</td>
            </tr>
            <tr>
              <td class="bgg">物料序列号</td>
              <td colspan="2">{{ form.materialSerialNo }}</td>
              <td class="bgg">RFID编码</td>
              <!-- <td colspan="2">{{ form.materialDetailNo }}</td> -->
            </tr>

            <tr>
              <td class="bgg" :rowspan="2">物料品牌及型号</td>
              <td :rowspan="2" colspan="2">{{ form.brandTypeNo }}</td>
              <td class="bgg">资产号</td>
              <td colspan="2">{{ form.propertyNo }}</td>
            </tr>
            <tr>
              <td class="bgg">机床名称</td>
              <td colspan="2">{{ form.machineName }}</td>
            </tr>
            <tr>
              <td class="bgg">故障部位及故障描述</td>
              <td colspan="5">{{ form.faultPositionDes }}</td>
            </tr>
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
              <td>损坏日期: {{ form.inputDt ? form.inputDt.split(' ').splice(0, 1).join(' ') : '' }}</td>
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
  </div>
</template>

<script>
import { entryList, getFlow, delFlow, addFlow, updateFlow, confirm } from '@/api/material/amend/entryList'
import { listUser } from '@/api/system/user'
import { query } from '@/api/material/base/index'

import StoreSelect from '@/components/shortcut/storeSelect'
import Constants from '@/constants'

import { getToken } from '@/utils/auth'

export default {
  name: 'AmendEntryList',
  components: {
    StoreSelect
  },
  dicts: ['material_input_type', 'material_status'],
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      Constants,
      // 遮罩层
      loading: true,
      // 选中数组
      userList: [],
      ids: [],
      materialNos: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 维修流程信息表格数据
      list: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      openConfirm: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        materialType: null,
        materialNo: '',
        materialDes: '',
        movingType: null,
        rfidType: null,
        storeLocation: null,
        materialRceipts: null,
        batch: null,
        costCenter: null,
        poNo: null,
        userName: null,
        number: null,
        inputDt: null,
        updateDt: null,
        inputRackDt: null,
        materialStatus: null,
        storeInfo: null,
        uUid: null,
        confirmNumber: null,
        operationame: null,
        inputType: 3,
        checkName: null,
        storeHistoryInfo: null,
        inputRackName: null,
        materialDetailNo: null,
        checkDt: null,
        materialCost: null,
        purchaseOrder: null,
        materialSerialNo: null,
        flowId: null,
        areaNo: null,
        localNo: null,
        brandTypeNo: null,
        propertyNo: null,
        machineName: null,
        faultPositionDes: null,
        storageInputName: null,
        storageInputDt: null,
        urgentApprovedName: null,
        urgentApprovedDt: null,
        pathRceipts: null,
        pathChecked: null,
        maintenance: null,
        maintenanceDt: null,
        tester: null,
        testDt: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        materialNo: [
          { required: true, message: '物料编码不能为空', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '数量不能为空', trigger: 'blur' }
        ]
      },
      materialStatusOptions: [
        // { code: 0, name: '录入' },
        { code: 1, name: '报废' },
        { code: 2, name: '维修' },
        { code: 3, name: '紧急维修' }
      ],
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: '',
        // 是否禁用上传
        isUploading: false,
        materialFlowId: null,
        headers: { Authorization: 'Bearer ' + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/material/amend_flow/uploadCertificate'
      },
      download: {
        open: false,
        title: '',
        materialFlowId: null
      }
    }
  },
  computed: {
    rules1() {
      return {
        materialNo: [
          { required: true, message: '物料编码不能为空', trigger: ['blur', 'change'] }
        ],
        purchaseOrder: [
          { required: true, message: 'PM单号不能为空', trigger: ['blur', 'change'] }
        ],
        materialDes: [
          { required: true, message: '物料描述不能为空', trigger: ['blur', 'change'] }
        ],
        areaNo: [
          { required: true, message: '区域不能为空', trigger: ['blur', 'change'] }
        ],
        materialSerialNo: [
          { required: true, message: '物料序列号不能为空', trigger: ['blur', 'change'] }
        ],
        faultPositionDes: [
          { required: true, message: '故障部位及描述不能为空', trigger: ['blur', 'change'] }
        ],
        brandTypeNo: [
          { required: this.form.materialNo === 'NA', message: '故障部位及描述不能为空', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getUserList()
  },
  methods: {
    /** 查询维修流程信息列表 */
    getList() {
      this.loading = true
      entryList(this.queryParams).then(response => {
        this.list = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    getUserList() {
      listUser({ page: 1, size: 100000 }).then(response => {
        this.userList = response.rows
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        materialFlowId: null,
        materialType: null,
        materialNo: 'NA',
        materialDes: 'NA',
        movingType: null,
        rfidType: null,
        storeLocation: null,
        materialRceipts: null,
        batch: null,
        costCenter: null,
        poNo: null,
        userName: null,
        number: null,
        inputDt: null,
        updateDt: null,
        inputRackDt: null,
        materialStatus: 0,
        storeInfo: null,
        uUid: null,
        confirmNumber: null,
        operationame: null,
        inputType: 3,
        checkName: null,
        storeHistoryInfo: null,
        inputRackName: null,
        materialDetailNo: null,
        checkDt: null,
        materialCost: null,
        purchaseOrder: null,
        materialSerialNo: null,
        flowId: null,
        areaNo: null,
        localNo: null,
        brandTypeNo: null,
        propertyNo: null,
        machineName: null,
        faultPositionDes: null,
        storageInputName: null,
        storageInputDt: null,
        urgentApprovedName: null,
        urgentApprovedDt: null,
        pathRceipts: null,
        pathChecked: null,
        maintenance: null,
        maintenanceDt: null,
        tester: null,
        testDt: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.materialFlowId)
      this.materialNos = selection.map(item => item.materialNo)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '录入维修流程信息'
    },
    /** 确认操作 */
    handleConfirm(row) {
      this.reset()
      const materialFlowId = row.materialFlowId
      getFlow(materialFlowId).then(response => {
        this.form = response.data
        this.openConfirm = true
        this.title = '确认维修流程信息'
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const materialFlowId = row.materialFlowId || this.ids
      getFlow(materialFlowId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改维修流程信息'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.materialFlowId != null) {
            updateFlow(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addFlow(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 提交按钮 */
    submitConfirmForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          confirm(this.form).then(response => {
            this.$modal.msgSuccess('确认成功')
            this.openConfirm = false
            this.getList()
          })
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const materialFlowIds = row.materialFlowId || this.ids
      const materialNos = row.materialNo || this.materialNos
      this.$modal.confirm('是否确认删除维修流程物料编码为"' + materialNos + '"的数据项？').then(function() {
        return delFlow(materialFlowIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {})
    },
    querySearch(queryString, cb) {
      query({ materialNo: queryString }).then(res => {
        cb([res.data])
      })
    },
    handleSelect(item) {
      // console.log(item, '........handleSelect..........')
      this.form.materialNo = item.materialNo
      this.form.materialDes = item.materialDes
      this.form.materialDetailNo = item.materialDetailNo
      this.form.materialId = item.materialId
    },
    handleUpload(row) {
      this.upload.title = '上传凭证'
      this.upload.open = true
      this.upload.materialFlowId = row.materialFlowId
    },
    handleDownload(row) {
      this.download.materialFlowId = row.materialFlowId
      const materialFlowId = row.materialFlowId
      getFlow(materialFlowId).then(response => {
        this.form = response.data
        this.download.open = true
        this.download.title = '清单预览'
      })
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      console.log(response, 'responseresponse')
      this.upload.open = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + '</div>', '导入结果', { dangerouslyUseHTMLString: true })
      this.getList()
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit()
    },
    submitDownload() {
      this.$nextTick(() => { this.getPdf({ title: '损坏设备信息卡' + this.form.flowId }) })
    }
  }
}
</script>
<style>
.printTable tr {
  height: 40px!important;
}

</style>
