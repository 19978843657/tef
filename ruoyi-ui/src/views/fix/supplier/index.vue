<template>
    <div class="app-container">
      <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
        <!-- <el-form-item label="供应商ID" prop="sortSupplierId">
          <el-input
            v-model="queryParams.sortSupplierId"
            placeholder="请输入供应商ID"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item> -->
        <el-form-item label="供应商" prop="supplierName">
          <el-input
            v-model="queryParams.supplierName"
            placeholder="请输入分类供应商"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="分类" prop="sortName">
          <el-input
            v-model="queryParams.sortName"
            placeholder="请输入分类"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
           
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery" v-hasPermi="['material:supplier:list']">搜索</el-button>
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
           v-hasPermi="['material:supplier:add']"
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
           v-hasPermi="['material:supplier:edit']"
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
           v-hasPermi="['material:supplier:remove']"
          >删除</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
           v-hasPermi="['material:supplier:export']"
          >导出</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleDoload"
           v-hasPermi="['material:supplier:importTemplate']"
          >下载导入模板</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleImport"
           v-hasPermi="['material:supplier:importData']"
          >导入</el-button>
        </el-col>
        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"/>
      </el-row>
  
      <el-table v-loading="loading" :data="supplierList" @selection-change="handleSelectionChange" height="580">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="供应商ID" align="center" prop="sortSupplierId" width="90"/>
        <el-table-column label="分类供应商" align="center" prop="supplierName" />
        <el-table-column label="分类" align="center" prop="sortName" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="125">
          <template slot-scope="scope">
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
  
      <!-- 添加或修改分类供应商信息对话框 -->
      <el-dialog :title="title" :visible.sync="open" :close-on-click-modal="false" width="510px" append-to-body>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="供应商" prop="supplierName" >
            <el-input v-model="form.supplierName" placeholder="请输入分类供应商" />
          </el-form-item>
          <el-form-item label="分类" prop="sortName">
            <el-input v-model="form.sortName" placeholder="请输入分类" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>


         <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" :close-on-click-modal="false" width="400px" append-to-body>
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
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="handleDoload">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
    </div>
  </template>
  
  <script>
  import { listSupplier, getSupplier, delSupplier, addSupplier, updateSupplier } from "@/api/material/amend/confirm";
  import { getToken } from "@/utils/auth";
  
  export default {
    name: "Supplier",
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
        // 分类供应商信息表格数据
        supplierList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          supplierName: null,
          sortName: null,
          sortSupplierId:null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          supplierName: [
            { required: true, message: "分类供应商不能为空", trigger: "blur" }
          ],
          sortId: [
            { required: true, message: "外键分类id不能为空", trigger: "blur" }
          ]
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
        url: process.env.VUE_APP_BASE_API + '/material/supplier/importData'
      }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询分类供应商信息列表 */
      getList() {
        this.loading = true;
        listSupplier(this.queryParams).then(res => {
          this.supplierList = res.rows;
          this.total = res.total;
          this.loading = false;
          if(this.supplierList.length === 0){
              this.$message({
                showClose: true,
                message: '查询数据为空,暂无数据',
                type: 'warning'
               });
        }
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
          sortSupplierId: null,
          supplierName: null,
          sortId: null
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
        this.ids = selection.map(item => item.sortSupplierId)
        this.single = selection.length!==1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加分类供应商信息";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const sortSupplierId = row.sortSupplierId || this.ids
        getSupplier(sortSupplierId).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改分类供应商信息";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.sortSupplierId != null) {
              updateSupplier(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              },
      error=>{
        this.$modal.msgError("修改失败!");
      });
            } else {
              addSupplier(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              },
              error=>{
                this.$modal.msgError("新增失败!");
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const sortSupplierIds = row.sortSupplierId || this.ids;
        this.$modal.confirm('是否确认删除分类供应商信息编号为"' + sortSupplierIds + '"的数据项？').then(function() {
          return delSupplier(sortSupplierIds);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('material/supplier/export', {
          ...this.queryParams
        }, `维修分类供应商维护表_${new Date().getTime()}.xlsx`)
      },
      
      //下载导入模板
      handleDoload() {
      this.download('/material/supplier/importTemplate', {}, `维修分类供应商导入表.xlsx`)
    },
    //导入按钮操作
      handleImport(){
        this.upload.title = '维修分类供应商维护表'
        this.upload.open = true
      },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit()
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
    }
  };
  </script>
  