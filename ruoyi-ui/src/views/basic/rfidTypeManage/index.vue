<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="物料编码" prop="sMaterialno">
        <el-input
          v-model="queryParams.sMaterialno"
          placeholder="请输入物料编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="RFID类型"  clearable prop="sRfidtype" >
        <el-select v-model="queryParams.sRfidtype" clearable placeholder="请选择" >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="物料分类" prop="sMaterialclassification">-->
<!--        <el-input-->
<!--          v-model="queryParams.sMaterialclassification"-->
<!--          placeholder="请输入物料分类"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="有效天数" prop="iValiddays">-->
<!--        <el-input-->
<!--          v-model="queryParams.iValiddays"-->
<!--          placeholder="请输入有效天数"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="预警天数" prop="iAlarmdays">-->
<!--        <el-input-->
<!--          v-model="queryParams.iAlarmdays"-->
<!--          placeholder="请输入预警天数"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="本位币金额" prop="fMaterialcost">-->
<!--        <el-input-->
<!--          v-model="queryParams.fMaterialcost"-->
<!--          placeholder="请输入本位币金额"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="推荐供应商" prop="sRecommendvendor">-->
<!--        <el-input-->
<!--          v-model="queryParams.sRecommendvendor"-->
<!--          placeholder="请输入推荐供应商"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="维修供应商" prop="sMaintainvendor">-->
<!--        <el-input-->
<!--          v-model="queryParams.sMaintainvendor"-->
<!--          placeholder="请输入维修供应商"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="第一大类" prop="sLevel0">-->
<!--        <el-input-->
<!--          v-model="queryParams.sLevel0"-->
<!--          placeholder="请输入第一大类"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="第二大类" prop="sLevel1">-->
<!--        <el-input-->
<!--          v-model="queryParams.sLevel1"-->
<!--          placeholder="请输入第二大类"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="第三大类" prop="sLevel2">-->
<!--        <el-input-->
<!--          v-model="queryParams.sLevel2"-->
<!--          placeholder="请输入第三大类"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="第四大类" prop="sLevel3">-->
<!--        <el-input-->
<!--          v-model="queryParams.sLevel3"-->
<!--          placeholder="请输入第四大类"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="创建时间" prop="dtCreatedt">-->
<!--        <el-date-picker clearable size="small"-->
<!--          v-model="queryParams.dtCreatedt"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择创建时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="创建人" prop="sCreateman">-->
<!--        <el-input-->
<!--          v-model="queryParams.sCreateman"-->
<!--          placeholder="请输入创建人"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="更新时间" prop="dtUpdatedt">-->
<!--        <el-date-picker clearable size="small"-->
<!--          v-model="queryParams.dtUpdatedt"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择更新时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="更新人" prop="sUpdateman">-->
<!--        <el-input-->
<!--          v-model="queryParams.sUpdateman"-->
<!--          placeholder="请输入更新人"-->
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
          v-hasPermi="['material:material:add']"
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
          v-hasPermi="['material:material:edit']"
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
          v-hasPermi="['material:material:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['material:material:export']"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:material:import']"
          type="info"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:material:importTemplate']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleDoload"
        >下载导入模板</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:material:import']"
          type="info"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="handleImportSupplier"
        >更新维修供应商</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleDoloadSupplier"
        >下载更新维修供应商模板</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="materialList" @selection-change="handleSelectionChange" height="580px">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="物料编码" align="center" prop="sMaterialno" />
      <el-table-column label="物料描述" align="center" prop="sMaterialdes" width="250"/>
      <el-table-column label="移动类型" align="center" prop="sMovingtype" />
      <el-table-column label="RFID类型" align="center" prop="sRfidtype" width="150"/>
<!--      <el-table-column label="物料分类" align="center" prop="sMaterialclassification" />-->
      <el-table-column label="有效天数" align="center" prop="iValiddays" />
      <el-table-column label="预警天数" align="center" prop="iAlarmdays" />
      <el-table-column label="本位币金额" align="center" prop="fMaterialcost" width="150"/>
      <el-table-column label="推荐供应商" align="center" prop="sRecommendvendor" width="150" />
      <el-table-column label="主供应商次数" align="center" prop="sRecommendvendornumber" width="150" />
      <el-table-column label="维修供应商" align="center" prop="sMaintainvendor" width="150" />
      <el-table-column label="次供应商次数" align="center" prop="sMaintainvendornumber" width="150" />
<!--      <el-table-column label="在库时间" align="center" prop="number" />-->
<!--      <el-table-column label="第二大类" align="center" prop="sLevel1" />-->
<!--      <el-table-column label="第三大类" align="center" prop="sLevel2" />-->
<!--      <el-table-column label="第四大类" align="center" prop="sLevel3" />-->
      <el-table-column label="创建时间" align="center" prop="dtCreatedt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dtCreatedt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center" prop="sCreateman" width="220" />
      <el-table-column label="更新时间" align="center" prop="dtUpdatedt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dtUpdatedt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新人" align="center" prop="sUpdateman" width="220"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['material:material:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['material:material:remove']"
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

    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="物料编码" prop="sMaterialno">
          <el-input v-model="form.sMaterialno" placeholder="请输入物料编码" />
        </el-form-item>
        <el-form-item label="物料描述" prop="sMaterialdes">
          <el-input v-model="form.sMaterialdes" placeholder="请输入物料描述" />
        </el-form-item>
        <el-form-item label="有效天数" prop="iValiddays">
          <el-input v-model="form.iValiddays" placeholder="请输入有效天数" onkeyup="this.value=this.value.replace(/\D|^0/g,'')" />
        </el-form-item>
        <el-form-item label="预警天数" prop="iAlarmdays">
          <el-input v-model="form.iAlarmdays" placeholder="请输入预警天数" onkeyup="this.value=this.value.replace(/\D|^0/g,'')" />
        </el-form-item>
        <el-form-item label="本位币金额" prop="fMaterialcost">
          <el-input v-model="form.fMaterialcost" placeholder="请输入本位币金额" />
        </el-form-item>
        <el-form-item label="推荐供应商" prop="sRecommendvendor">
          <el-input v-model="form.sRecommendvendor" placeholder="请输入推荐供应商" />
        </el-form-item>
        <el-form-item label="维修供应商" prop="sMaintainvendor">
          <el-input v-model="form.sMaintainvendor" placeholder="请输入维修供应商" />
        </el-form-item>
        <el-form-item label="RFID类型" prop="sRfidtype">
          <el-select v-model="form.sRfidtype" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" :model="types" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link v-if="types == 'normal'"  type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="handleDoload">下载模板</el-link>
          <el-link v-else="types == 'supplier'" types="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="handleDoloadSupplier">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="types == 'normal'" type="primary" @click="submitFileForm">确 定</el-button>
        <el-button v-else="types == 'supplier'" type="primary" @click="submitSupplierFile">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { listMaterial, getMaterial, delMaterial, addMaterial, updateMaterial } from "@/api/material/basematerial/material";
import { getToken } from '@/utils/auth'

export default {
  name: "Material",
  data() {
    return {
      // options: [
      //   {
      //     value: 'RFID纸质标签',
      //   }, {
      //     value: 'RFID抗金属标签',
      //   }],value:'',


      //导入类型
      types:'normal',
      // 遮罩层
      loading: true,
      options: [{
        value: 'RFID纸质标签',
      }, {
        value: 'RFID抗金属标签',
      }],
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
      // 表格数据
      materialList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        sMaterialno:null,
        sMaterialdes: null,
        sMovingtype: null,
        sRfidtype: null,
        sMaterialclassification: null,
        iValiddays: null,
        iAlarmdays: null,
        fMaterialcost: null,
        sRecommendvendor: null,
        sMaintainvendor: null,
        sLevel0: null,
        sLevel1: null,
        sLevel2: null,
        sLevel3: null,
        dtCreatedt: null,
        sCreateman: null,
        dtUpdatedt: null,
        sUpdateman: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: '',
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: 'Bearer ' + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/material/material/importData'
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询列表 */
    getList() {
      this.loading = true;
      listMaterial(this.queryParams).then(response => {
        this.materialList = response.rows;
        // console.log(response.rows);
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
        sMaterialno: null,
        sMaterialdes: null,
        sMovingtype: null,
        sRfidtype: null,
        sMaterialclassification: null,
        iValiddays: null,
        iAlarmdays: null,
        fMaterialcost: null,
        sRecommendvendor: null,
        sMaintainvendor: null,
        sLevel0: null,
        sLevel1: null,
        sLevel2: null,
        sLevel3: null,
        dtCreatedt: null,
        sCreateman: null,
        dtUpdatedt: null,
        sUpdateman: null
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
      this.ids = selection.map(item => item.sMaterialno)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加物料信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const sMaterialno = row.sMaterialno || this.ids
      getMaterial(sMaterialno).then(response => {
        console.log("------------")
        console.log(response)
        this.form = response.data;
        this.open = true;
        this.title = "修改物料信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      console.log("99999999999")
      console.log(this.form);
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.sCreateman != null) {
            updateMaterial(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMaterial(this.form).then(response => {
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
      const sMaterialnos = row.sMaterialno || this.ids;
      this.$modal.confirm('是否确认删除编号为"' + sMaterialnos + '"的数据项？').then(function() {
        return delMaterial(sMaterialnos);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('material/material/export', {
        ...this.queryParams
      }, `material_${new Date().getTime()}.xlsx`)
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = '物料基础导入表'
      this.upload.open = true 
      this.types='normal'
      this.upload.url = process.env.VUE_APP_BASE_API + '/material/material/importData'
    },
    //更新供应商按钮操作
    handleImportSupplier(){
      this.upload.title = '更新供应商导入表'
      this.upload.open = true
      this.types='supplier'
      this.upload.url = process.env.VUE_APP_BASE_API + '/material/material/vendor/importData'
    },
    /** 下载导入模板按钮操作 */
    handleDoload() {
      this.download('/material/material/importTemplate', {}, `物料基础导入表.xlsx`)
    },
    //下载更新供应商模板按钮操作
    handleDoloadSupplier(){
      this.download('/material/material/vendor/importTemplate', {}, `更新维修供应商导入表.xlsx`)
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
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
    //导入更新供应商表格
    submitSupplierFile(){
      this.$refs.upload.submit()

    }
  }
};
</script>
