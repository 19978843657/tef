<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="盘点单据创始人" prop="bindName">
        <el-input
          v-model="queryParams.bindName"
          placeholder="请输入盘点单据创始人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="盘点单据创建时间" prop="blindInput">
        <el-date-picker clearable size="small"
                        v-model="queryParams.blindInput"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择盘点单据创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="盘点库位" prop="blindBin">
        <el-input
          v-model="queryParams.blindBin"
          placeholder="请输入盘点库位"
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
          v-hasPermi="['material:blind:import']"
          type="info"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['material:blind:add']"
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
          v-hasPermi="['material:blind:edit']"
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
          v-hasPermi="['material:blind:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['material:blind:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="blindList" @selection-change="handleSelectionChange"  height="500px">
      <el-table-column  type="selection" width="55" align="center" />
      <el-table-column label="盘点单据id" align="center" prop="blindId" />
<!--        <template slot-scope="scope">-->
<!--          &lt;!&ndash; 注意：这个地方要传参数进去才能进行操作  函数名称(scope.row) &ndash;&gt;-->
<!--          <div @click="alertMessage(scope.row)">{{ scope.row.blindId }}</div>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="盘点单据创始人" align="center" prop="bindName" width="340px"/>
      <el-table-column label="盘点单据创建时间" align="center" prop="blindInput" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.blindInput, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="盘点库位" align="center" prop="blindBin" />
      <el-table-column label="盘点状态" align="center" prop="bindStore" >
        <template slot-scope="scope">
          <span v-if="scope.row.bindStore == 0">待完成</span>
          <span v-if="scope.row.bindStore == 1">已完成</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-col :span="1.5">
            <el-button

              type="info"
              plain
              icon="el-icon-upload2"
              size="mini"
              @click="handleImporta(scope.row)"
            >导入</el-button>
          </el-col>
          <el-button
            size="mini"
            type="text"
            @click="takingsel(scope.row)"
            v-hasPermi="['material:blind:sel']"
          >详情</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="selecbin()"
              v-hasPermi="['material:blind:ale']"
            >完成</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['material:blind:remove']"
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
<!--    sap差异表-->
    <el-dialog :title="uploada.title" :close-on-click-modal="false" :visible.sync="uploada.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="uploada.headers"
        :action="uploada.url + '?updateSupport=' + uploada.updateSupport"
        :disabled="uploada.isUploading"
        :on-progress="handleFileUploadProgressa"
        :on-success="handleFileSuccessta"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip text-center">
          <div slot="tip" class="el-upload__tip">
            <el-checkbox v-model="uploada.updateSupport" /> 是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="handleDoloads">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button v-loading.fullscreen.lock="uploada.isUploading" type="primary" :loading="uploada.isUploading" @click="submitFileForms">确 定</el-button>
        <el-button :loading="uploada.isUploading" @click="uploada.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listBlind, getBlind, delBlind, seleBlind, updateBlind } from "@/api/material/taking/blind";
import { getToken } from '@/utils/auth'
import { listUser } from '@/api/system/user'
import { listTaking } from '@/api/material/taking/temp'

export default {
  name: "Blind",
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
      // 盘点单据表格数据
      blindList: [],
      // 弹出层标题
      // title: "",
      // 是否显示弹出层
      open: false,
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: '',
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: false,

        // 设置上传的请求头部
        headers: { Authorization: 'Bearer ' + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/material/blind/importData'
      },
      uploada: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: '',
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: '',

        // 设置上传的请求头部
        headers: { Authorization: 'Bearer ' + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/material/taking/importData'
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        bindName: null,
        blindInput: null,
        blindBin: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getUserList()
    this.getList();
  },
  methods: {
    takingsel(row){
      console.log(row)
      // window.location.href="../../taking/tempList/index12.vue";
      this.$router.push({path:'/tempinde/index',query:{ id:row.blindId }});
    },
    /** 查询盘点单据列表 */
    getList() {
      this.loading = true;
      listBlind(this.queryParams).then(response => {
        this.blindList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getUserList() {
      listUser({ page: 1, size: 100 }).then(response => {
        this.userList = response.rows
      })
    },
    selecbin(){
      seleBlind().then(response => {
        // if (response.rows!=null){
          this.$modal.msgSuccess("操作成功");
        // }
        this.getList();
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
        blindId: null,
        bindName: null,
        blindInput: null,
        blindBin: null
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

    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加盘点单据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const blindId = row.blindId || this.ids
      getBlind(blindId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改盘点单据";
      });
    },
    handleImporta(row){
      this.uploada.title = 'sap差异导入',
        this.uploada.updateSupport=row.blindId,
      this.uploada.open = true



},
    // /** 提交按钮 */
    // submitForm() {
    //   this.$refs["form"].validate(valid => {
    //     if (valid) {
    //       if (this.form.blindId != null) {
    //         updateBlind(this.form).then(response => {
    //           this.$modal.msgSuccess("修改成功");
    //           this.open = false;
    //           this.getList();
    //         });
    //       } else {
    //         addBlind(this.form).then(response => {
    //           this.$modal.msgSuccess("新增成功");
    //           this.open = false;
    //           this.getList();
    //         });
    //       }
    //     }
    //   });
    // },
    /** 删除按钮操作 */
    handleDelete(row) {
      const blindIds = row.blindId || this.ids;
      if (row.bindStore==0){
        alert("请先完成订单再进行删除")
      }
      this.$modal.confirm('是否确认删除盘点单据编号为"' + blindIds + '"的数据项？').then(function() {
        return delBlind(blindIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('material/blind/export', {
        ...this.queryParams
      }, `blind_${new Date().getTime()}.xlsx`)
    },
    /** 导出按钮操作 */
    handleExportaking() {
      console.log(this.queryParams)
      this.download('material/taking/export', {
        ...this.queryParams
      }, `差异表_${new Date().getTime()}.xlsx`)
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = '盘点库存导入'

      this.upload.open = true
    },

    /** 下载导入模板按钮操作 */
    handleDoload() {
      this.download('/material/blind/importTemplate', {}, `盘点库存导入导入表.xlsx`)
    },
    /** 下载sap导入模板按钮操作 */
    handleDoloads() {
      this.download('/material/taking/importTemplate', {}, `sap差异表导入表.xlsx`)
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true
    },
    handleFileUploadProgressa(event, file, fileList) {
      this.uploada.isUploading = true
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + '</div>', '导入结果', { dangerouslyUseHTMLString: true })

      this.getList()
    },
    handleFileSuccessta(response, file, fileList) {
      this.uploada.open = false
      this.uploada.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + '</div>', '导入结果', { dangerouslyUseHTMLString: true })
      this.handleExportaking()
      this.getList()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selection = selection;
      this.selection = this.selection.map((item) => item);
      console.log(this.selection)
      // this.ids = selection.map(item => item.tempNewMaterialId)
      // this.materialNos = selection.map(item => item.materialNo)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },

    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit()
    },
    // 提交上传文件
    submitFileForms() {
      this.$refs.upload.submit()
    }
  }
};
</script>
