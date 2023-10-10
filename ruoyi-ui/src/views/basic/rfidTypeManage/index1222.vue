<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="物料编码" prop="materialNo">
        <el-input
          v-model="queryParams.materialNo"
          placeholder="请输入物料编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="第一大类" prop="level0">
        <el-input
          v-model="queryParams.level0"
          placeholder="请输入第一大类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="第二大类" prop="level1">
        <el-input
          v-model="queryParams.level1"
          placeholder="请输入第二大类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="第三大类" prop="level2">
        <el-input
          v-model="queryParams.level2"
          placeholder="请输入第三大类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="第四大类" prop="level3">
        <el-input
          v-model="queryParams.level3"
          placeholder="请输入第四大类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标签类型" prop="rfidType">
        <el-select v-model="queryParams.rfidType" placeholder="请选择标签类型" clearable @change="handleRfidTypeChange">
          <el-option
            v-for="item in dict.type.rfid_type"
            :key="item.label"
            :label="item.label"
            :value="item.label"
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
          v-hasPermi="['material:rfidType:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:rfidType:remove']"
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
          v-hasPermi="['material:rfidType:import']"
          type="info"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:rfidType:importTemplate']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleDoload"
        >下载导入模板</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:rfidType:export']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    </el-row>

    <el-table v-loading="loading" :data="rfidList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="物料编码" align="center" prop="materialNo" />
      <el-table-column label="物料描述" align="center" prop="materialDes" width="100" :show-overflow-tooltip="true" />
      <el-table-column label="第一大类" align="center" prop="level0" />
      <el-table-column label="第二大类" align="center" prop="level1" />
      <el-table-column label="第三大类" align="center" prop="level2" />
      <el-table-column label="第四大类" align="center" prop="level3" />
      <el-table-column label="标签类型" align="center" prop="rfidType" width="150">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.rfid_type" :value="scope.row.rfidType" />
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center" prop="createBy" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180" />
      <el-table-column label="修改人" align="center" prop="updateBy" />
      <el-table-column label="修改时间" align="center" prop="updateTime" width="180" />
      <el-table-column label="备注" align="center" prop="remark" width="100" :show-overflow-tooltip="true" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['material:rfidType:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['material:rfidType:remove']"
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

    <!-- 添加或修改RFID编码信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" :close-on-click-modal="false" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="物料编码" prop="materialNo">
          <el-input v-model="form.materialNo" placeholder="请输入物料编码" />
        </el-form-item>
        <el-form-item label="物料描述" prop="materialDes">
          <el-input v-model="form.materialDes" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="第一大类" prop="level0">
          <el-input v-model="form.level0" placeholder="请输入第一大类" />
        </el-form-item>
        <el-form-item label="第二大类" prop="level1">
          <el-input v-model="form.level1" placeholder="请输入第二大类" />
        </el-form-item>
        <el-form-item label="第三大类" prop="level2">
          <el-input v-model="form.level2" placeholder="请输入第三大类" />
        </el-form-item>
        <el-form-item label="第四大类" prop="level3">
          <el-input v-model="form.level3" placeholder="请输入第四大类" />
        </el-form-item>
        <el-form-item label="标签类型" prop="rfidType">
          <el-select v-model="form.rfidType" placeholder="请选择标签类型" clearable>
            <el-option
              v-for="item in dict.type.rfid_type"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
import { listRfid, getRfid, delRfid, addRfid, updateRfid } from '@/api/basic/rfidTypeManage'
import { getToken } from '@/utils/auth'

export default {
  name: 'Rfid',
  dicts: ['rfid_type'],
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
      // RFID编码信息表格数据
      rfidList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        materialNo: null,
        materialDes: null,
        level0: null,
        level1: null,
        level2: null,
        level3: null,
        rfidType: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        materialNo: [
          { required: true, message: '物料编码不能为空', trigger: 'blur' }
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
        url: process.env.VUE_APP_BASE_API + '/material/rfid/importData'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询RFID编码信息列表 */
    getList() {
      this.loading = true
      listRfid(this.queryParams).then(response => {
        this.rfidList = response.rows
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
        rfidId: null,
        materialNo: null,
        materialDes: null,
        level0: null,
        level1: null,
        level2: null,
        level3: null,
        rfidType: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      }
      this.resetForm('form')
    },
    handleRfidTypeChange(v) {
      this.queryParams.rfidType = v
      this.handleQuery()
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
      this.ids = selection.map(item => item.rfidId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加RFID编码信息'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const rfidId = row.rfidId || this.ids
      getRfid(rfidId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改RFID编码信息'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.rfidId != null) {
            updateRfid(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addRfid(this.form).then(response => {
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
      const rfidIds = row.rfidId || this.ids
      this.$modal.confirm('是否确认删除？').then(function() {
      // this.$modal.confirm('是否确认删除RFID编码信息编号为"' + materialNos + '"的数据项？').then(function() {
        return delRfid(rfidIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('material/rfid/export', {
        ...this.queryParams
      }, `rfid_${new Date().getTime()}.xlsx`)
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = 'EPCID编码信息导入'
      this.upload.open = true
    },
    handleDoload() {
      this.download('/material/rfid/importTemplate', {}, `RFID类型导入表.xlsx`)
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
