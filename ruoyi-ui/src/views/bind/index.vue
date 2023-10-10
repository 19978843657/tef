<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="物料详细编码" prop="sMaterialdetaino">
        <el-input
          v-model="queryParams.sMaterialdetaino"
          placeholder="请输入物料详细编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="机台编号" prop="sAssetno">
        <el-input
          v-model="queryParams.sAssetno"
          placeholder="请输入机台编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="绑定日期" prop="dtBinddt">
        <el-date-picker clearable size="small"
          v-model="queryParams.dtBinddt"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择绑定日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="绑定操作人" prop="sBind">
        <el-input
          v-model="queryParams.sBind"
          placeholder="请输入绑定操作人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料编码" prop="sMaterialno">
        <el-input
          v-model="queryParams.sMaterialno"
          placeholder="请输入物料编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="解绑时间" prop="untiedt">
        <el-date-picker clearable size="small"
          v-model="queryParams.untiedt"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择解绑时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="解绑人" prop="untiename">
        <el-input
          v-model="queryParams.untiename"
          placeholder="请输入解绑人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="使用时间" prop="usedt">
        <el-input
          v-model="queryParams.usedt"
          placeholder="请输入使用时间"
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
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['material:bindmachine:add']"
        >新增</el-button>
      </el-col> -->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          plain-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['material:bindmachine:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          plain-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['material:bindmachine:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['material:bindmachine:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="bindmachineList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="物料详细编码" align="center" prop="sMaterialdetaino" />
      <el-table-column label="机台编号" align="center" prop="sAssetno" />
      <el-table-column label="绑定日期" align="center" prop="dtBinddt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dtBinddt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="标识码" align="center" prop="uUid" /> -->
      <el-table-column label="绑定操作人" align="center" prop="sBind" />
      <el-table-column label="物料编码" align="center" prop="sMaterialno" />
      <el-table-column label="解绑时间" align="center" prop="untiedt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.untiedt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="解绑人" align="center" prop="untiename" />
       <el-table-column label="使用时间" align="center" prop="bnumber" />
      <!-- <el-table-column label="状态" align="center" prop="bMaterialbindstatus" /> -->
      <el-table-column label="状态" align="center" key="bMaterialbindstatus">
      <template slot-scope="scope">
          <div v-if="scope.row.bMaterialbindstatus ===1">绑定</div>
        <div v-else-if="scope.row.bMaterialbindstatus ===2">解除</div>
        </template>
      </el-table-column>
      <!-- <el-form-item label="状态">
        <div v-if="data.bMaterialbindstatus===0">绑定</div>
        <div v-else-if="data.bMaterialbindstatus===1">解除</div>
      </el-form-item> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['material:bindmachine:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['material:bindmachine:remove']"
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
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="物料详细编码" prop="sMaterialdetaino">
          <el-input v-model="form.sMaterialdetaino" placeholder="请输入物料详细编码" />
        </el-form-item>
        <el-form-item label="机台编号" prop="sAssetno">
          <el-input v-model="form.sAssetno" placeholder="请输入机台编号" />
        </el-form-item>
        <el-form-item label="绑定日期" prop="dtBinddt">
          <el-date-picker clearable size="small"
            v-model="form.dtBinddt"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择绑定日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="绑定操作人" prop="sBind">
          <el-input v-model="form.sBind" placeholder="请输入绑定操作人" />
        </el-form-item>
        <el-form-item label="物料编码" prop="sMaterialno">
          <el-input v-model="form.sMaterialno" placeholder="请输入物料编码" />
        </el-form-item>
        <el-form-item label="解绑时间" prop="untiedt">
          <el-date-picker clearable size="small"
            v-model="form.untiedt"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择解绑时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="解绑人" prop="untiename">
          <el-input v-model="form.untiename" placeholder="请输入解绑人" />
        </el-form-item>
        <el-form-item label="使用时间" prop="usedt">
          <el-input v-model="form.usedt" placeholder="请输入使用时间" />
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
import { listBindmachine, getBindmachine, delBindmachine, addBindmachine, updateBindmachine } from "@/api/material/bindmachine/materialbindmachine";

export default {
  name: "Bindmachine",
  dicts: ['material_input_type', 'material_status'],
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
      // 表格数据
      bindmachineList: [
      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        sMaterialdetaino: null,
        sAssetno: null,
        dtBinddt: null,
        sBind: null,
        sMaterialno: null,
        untiedt: null,
        untiename: null,
        usedt: null,
        bMaterialbindstatus: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        sMaterialdetaino: [
          { required: true, message: "物料详细编码不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询列表 */
    getList() {
      this.loading = true;
      listBindmachine(this.queryParams).then(response => {
        this.bindmachineList = response.rows;
        this.total = response.total;
        // console.log(response.rows)
        // console.log(this.bindmachineList)
        // console.log(this.bindmachineList[0].bMaterialbindstatus)
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
        sMaterialdetaino: null,
        sAssetno: null,
        dtBinddt: null,
        uUid: null,
        sBind: null,
        sMaterialno: null,
        untiedt: null,
        untiename: null,
        usedt: null,
        bMaterialbindstatus: 0
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
      this.ids = selection.map(item => item.uUid)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const uUid = row.uUid || this.ids
      updateBindmachine(uUid).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.uUid != null) {
            updateBindmachine(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBindmachine(this.form).then(response => {
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
      const uUids = row.uUid || this.ids;
      this.$modal.confirm('是否确认删除【请填写功能名称】编号为"' + uUids + '"的数据项？').then(function() {
        return delBindmachine(uUids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('material/bindmachine/export', {
        ...this.queryParams
      }, `bindmachine_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
