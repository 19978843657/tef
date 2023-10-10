<template>
  <div class="app-container">
    <el-form
      v-show="showSearch"
      ref="queryForm"
      :model="queryParams"
      :inline="true"
      label-width="100px"
    >
      <el-form-item label="EPCID编码" prop="epcidCode">
        <el-input
          v-model="queryParams.epcidCode"
          placeholder="请输入EPCID编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="编码头" prop="header">
        <el-input
          v-model="queryParams.header"
          placeholder="请输入编码头"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司前缀" prop="companyPrefix">
        <el-input
          v-model="queryParams.companyPrefix"
          placeholder="请输入公司前缀"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司后缀" prop="companySuffix">
        <el-input
          v-model="queryParams.companySuffix"
          placeholder="请输入公司后缀"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="编号" prop="indlAstRef">
        <el-input
          v-model="queryParams.indlAstRef"
          placeholder="请输入编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="GDTI编码" prop="gdtiCode">
        <el-input
          v-model="queryParams.gdtiCode"
          placeholder="请输入GDTI编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="使用标记" prop="usedSymbol">
        <el-select v-model="queryParams.usedSymbol" placeholder="请选择" clearable>
          <el-option
            v-for="item in dict.type.used_symbol"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="使用时间" prop="usedDatetime">
        <el-date-picker
          v-model="queryParams.usedDatetime"
          clearable
          size="small"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择使用时间"
        />
      </el-form-item>
      <el-form-item label="领用人" prop="operation">
        <el-input
          v-model="queryParams.operation"
          placeholder="请输入领用人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="使用的物料编码" prop="materialNo">
        <el-input
          v-model="queryParams.materialNo"
          placeholder="请输入使用的物料编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索</el-button>
        <el-button
          icon="el-icon-refresh"
          size="mini"
          @click="resetQuery"
        >重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:epcid:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:epcid:import']"
          type="info"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:epcid:importTemplate']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleDoload"
        >下载导入模板</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:epcid:edit']"
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
          v-hasPermi="['material:epcid:remove']"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:epcid:export']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    </el-row>

    <el-table
      v-loading="loading"
      :data="epcidList"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <!-- <el-table-column label="主键ID" align="center" prop="epcidId" /> -->
      <el-table-column label="EPCID编码" align="center" prop="epcidCode" />
      <el-table-column label="编码头" align="center" prop="header" />
      <el-table-column label="公司前缀" align="center" prop="companyPrefix" />
      <el-table-column label="公司后缀" align="center" prop="companySuffix" />
      <el-table-column label="编号" align="center" prop="indlAstRef" />
      <el-table-column label="GDTI编码" align="center" prop="gdtiCode" />
      <el-table-column label="使用标记" align="center" prop="usedSymbol">
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.usedSymbol === 1 ? '使用' : '未使用' }}</span>
        </template> -->
        <template slot-scope="scope">
          <dict-tag :options="dict.type.used_symbol" :value="scope.row.usedSymbol" />
        </template>
      </el-table-column>
      <el-table-column
        label="使用时间"
        align="center"
        prop="usedDatetime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.usedDatetime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领用人" align="center" prop="operation" />
      <el-table-column
        label="使用的物料编码"
        align="center"
        prop="materialNo"
      />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.usedSymbol !== 1"
            v-hasPermi="['material:epcid:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-if="scope.row.usedSymbol !== 1"
            v-hasPermi="['material:epcid:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改EPCID编码信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" :close-on-click-modal="false" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="EPCID编码" prop="epcidCode">
          <el-input v-model="form.epcidCode" placeholder="请输入EPCID编码" />
        </el-form-item>
        <el-form-item label="编码头" prop="header">
          <el-input v-model="form.header" placeholder="请输入编码头" />
        </el-form-item>
        <el-form-item label="公司前缀" prop="companyPrefix">
          <el-input v-model="form.companyPrefix" placeholder="请输入公司前缀" />
        </el-form-item>
        <el-form-item label="公司后缀" prop="companySuffix">
          <el-input v-model="form.companySuffix" placeholder="请输入公司后缀" />
        </el-form-item>
        <el-form-item label="编号" prop="indlAstRef">
          <el-input v-model="form.indlAstRef" placeholder="请输入编号" />
        </el-form-item>
        <el-form-item label="GDTI编码" prop="gdtiCode">
          <el-input v-model="form.gdtiCode" placeholder="请输入GDTI编码" />
        </el-form-item>

        <!-- <el-form-item label="使用标记" prop="usedSymbol">
          <el-input v-model="form.usedSymbol" placeholder="请输入使用标记" />
        </el-form-item> -->
        <!-- <el-form-item label="使用时间" prop="usedDatetime">
          <el-date-picker
            v-model="form.usedDatetime"
            clearable
            size="small"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择使用时间"
          />
        </el-form-item> -->
        <!-- <el-form-item label="领用人" prop="operation">
          <el-input v-model="form.operation" placeholder="请输入领用人" />
        </el-form-item>
        <el-form-item label="使用的物料编码" prop="materialNo">
          <el-input v-model="form.materialNo" placeholder="请输入使用的物料编码" />
        </el-form-item> -->
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :close-on-click-modal="false" :visible.sync="upload.open" width="400px" append-to-body>
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
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip text-center">
          <div slot="tip" class="el-upload__tip">
            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="handleDoload">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button v-loading.fullscreen.lock="upload.isUploading" type="primary" :loading="upload.isUploading" @click="submitFileForm">确 定</el-button>
        <el-button :loading="upload.isUploading" @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listEpcid, getEpcid, delEpcid, addEpcid, updateEpcid } from '@/api/basic/epcidManage'
import { getToken } from '@/utils/auth'

export default {
  name: 'Epcid',
  dicts: ['used_symbol'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      epcidCodes: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // EPCID编码信息表格数据
      epcidList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        header: null,
        companyPrefix: null,
        companySuffix: null,
        indlAstRef: null,
        gdtiCode: null,
        epcidCode: null,
        usedSymbol: null,
        usedDatetime: null,
        operation: null,
        materialNo: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        epcidCode: [
          { required: true, message: 'EPCID编码不能为空', trigger: 'blur' }
        ]
      },
      // 用户导入参数
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
        url: process.env.VUE_APP_BASE_API + '/material/epcid/importData'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询EPCID编码信息列表 */
    getList() {
      this.loading = true
      listEpcid(this.queryParams).then(response => {
        this.epcidList = response.rows
        this.total = response.total
        this.loading = false
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
        epcidId: null,
        header: null,
        companyPrefix: null,
        companySuffix: null,
        indlAstRef: null,
        gdtiCode: null,
        epcidCode: null,
        usedSymbol: null,
        usedDatetime: null,
        operation: null,
        materialNo: null,
        createTime: null,
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
      this.ids = selection.map(item => item.epcidId)
      this.epcidCodes = selection.map(item => item.epcidCode)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加EPCID编码信息'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const epcidId = row.epcidId || this.ids
      getEpcid(epcidId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改EPCID编码信息'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.epcidId != null) {
            updateEpcid(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addEpcid(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const epcidIds = row.epcidId || this.ids
      const epcidCodes = row.epcidCode || this.epcidCodes
      this.$modal.confirm('是否确认删除EPCID编码信息编号为"' + epcidCodes + '"的数据项？').then(function() {
        return delEpcid(epcidIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('material/epcid/export', {
        ...this.queryParams
      }, `epcid_${new Date().getTime()}.xlsx`)
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = 'EPCID编码信息导入'
      this.upload.open = true
    },
    handleDoload() {
      this.download('/material/epcid/importTemplate', {}, `EPCID编码信息导入表.xlsx`)
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
    }
  }
}
</script>
