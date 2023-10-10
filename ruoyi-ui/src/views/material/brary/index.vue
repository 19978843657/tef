<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="物料详细编码" prop="materialDetailNo">
        <el-input
          v-model="queryParams.materialDetailNo"
          placeholder="请输入物料详细编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
          style="width: 240px"/>
      </el-form-item>
      <el-form-item label="物料编码" prop="sMaterialNo">
        <el-input
          v-model="queryParams.sMaterialNo"
          placeholder="请输入物料编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="移动类型" prop="inputDt">-->
<!--        <el-input-->
<!--          v-model="queryParams.inputDt"-->
<!--          placeholder="请输入移动类型"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="有效天数" prop="iValiddays">
        <el-input
          v-model="queryParams.iValiddays"
          placeholder="请输入有效天数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预警天数" prop="iAlarmdays">
        <el-input
          v-model="queryParams.iAlarmdays"
          placeholder="请输入预警天数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作人" prop="sUpdatename">
        <el-input
          v-model="queryParams.sUpdatename"
          placeholder="请输入操作人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="预警状态" prop="alarm">-->
<!--        <el-select v-model="form.alarm" placeholder="请选择">-->
<!--          <el-option-->
<!--            v-for="item in options"-->
<!--            :key="item.value"-->
<!--            :label="item.value"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="操作时间" prop="updatedt">
        <el-date-picker clearable size="small"
          v-model="queryParams.updatedt"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择操作时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="入库时间" prop="sInedt">
        <el-date-picker clearable size="small"
          v-model="queryParams.sInedt"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择入库时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['material:materiallibrary:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
<!--        <el-button-->
<!--          type="success"-->
<!--          plain-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['material:materiallibrary:edit']"-->
<!--        >修改</el-button>-->
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-search"
          size="mini"
          @click="handleseala"
        >失效按钮</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-search"
          size="mini"
          @click="handlesealas"
        >预警按钮</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
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
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['material:materiallibrary:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="materiallibraryList" @selection-change="handleSelectionChange"  height="450px">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="物料详细编码" align="center" prop="materialDetailNo" />
      <el-table-column label="物料编码" align="center" prop="sMaterialNo" />
      <el-table-column label="在库时间" align="center" prop="number" />
      <el-table-column label="有效天数" align="center" prop="iValiddays" />
      <el-table-column label="预警天数" align="center" prop="iAlarmdays" />
      <el-table-column label="操作人" align="center" prop="sUpdatename" />
<!--      <el-table-column label="UUID" align="center" prop="uUid" />-->

      <el-table-column label="预警状态" align="center" prop="alarm" >
        <template slot-scope="scope">
          <div v-if="scope.row.alarm ===0">无</div>
          <div v-else-if="scope.row.alarm ===1">失效</div>
          <div v-else-if="scope.row.alarm ===2">预警</div>
        </template>
      </el-table-column>
      <el-table-column label="下架时间" align="center" prop="updatedt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updatedt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库时间" align="center" prop="sInedt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.sInedt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物料状态" align="center" prop="sMaterialtype" >
        <template slot-scope="scope">
          <dict-tag :options="dict.type.material_status" :value="scope.row.sMaterialtype" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['material:materiallibrary:ara']"
          >延长有效时间</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleUpdatesta(scope.row)"
            v-hasPermi="['material:materiallibrary:sta']"
          >报废</el-button>
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
        <el-form-item label="物料详细编码" prop="materialDetailNo">
          <el-input v-model="form.materialDetailNo" placeholder="请输入物料详细编码" />
        </el-form-item>
        <el-form-item label="物料描述" prop="sMaterialNo">
          <el-input v-model="form.sMaterialNo" placeholder="请输入物料描述" />
        </el-form-item>
        <el-form-item label="移动类型" prop="inputDt" >
          <el-input v-model="form.inputDt" placeholder="请输入移动类型" />
        </el-form-item>
        <el-form-item label="有效天数" prop="iValiddays">
          <el-input v-model="form.iValiddays" placeholder="请输入有效天数" />
        </el-form-item>
        <el-form-item label="剩余天数" prop="iAlarmdays">
          <el-input v-model="form.iAlarmdays" placeholder="请输入剩余天数" />
        </el-form-item>
        <el-form-item label="操作人" prop="sUpdatename">
          <el-input v-model="form.sUpdatename" placeholder="请输入操作人" width="340px"/>
        </el-form-item>
        <el-form-item label="预警状态" prop="alarm">
          <el-input v-model="form.alarm" placeholder="请输入预警状态" />
        </el-form-item>
        <el-form-item label="操作时间" prop="updatedt">
          <el-date-picker clearable size="small"
            v-model="form.updatedt"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择操作时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入库时间" prop="sInedt">
          <el-date-picker clearable size="small"
            v-model="form.sInedt"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择入库时间">
          </el-date-picker>
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
import Constants from '@/constants'
import {
  listMateriallibrary,
  listMateriallibrarya,
  getMateriallibrary,
  delMateriallibrary,
  addMateriallibrary,
  updateMateriallibrary,
  addMateriallibrarys
} from '@/api/material/brary/materiallibrary'

export default {
  name: "Materiallibrary",
  dicts: ['material_input_type', 'material_status'],
  data() {
    return {

      Constants,
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
      // 【表格数据
      materiallibraryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        materialDetailNo: null,
        sMaterialNo: null,
        inputDt: null,
        iValiddays: null,
        iAlarmdays: null,
        sUpdatename: null,
        alarm: null,
        updatedt: null,
        sInedt: null,
        sMaterialtype: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // materialDetailNo: [
        //   { required: true, message: "物料详细编码不能为空", trigger: "blur" }
        // ],
        iValiddays: [
          { required: true, message: "有效天数不能为空", trigger: "blur" }
        ],
        iAlarmdays: [
          { required: true, message: "预警天数不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.had();


  },
  methods: {
    /** 查询列表 */
    getList() {
      this.loading = true;
      listMateriallibrary(this.queryParams).then(response => {
        this.materiallibraryList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // getLista() {
    //   this.loading = true;
    //   listMateriallibrarya().then(response => {
    //     this.materiallibraryList = response.rows;
    //     this.total = response.total;
    //     this.loading = false;
    //   });
    // },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        materialDetailNo: null,
        sMaterialNo: null,
        inputDt: null,
        iValiddays: null,
        iAlarmdays: null,
        sUpdatename: null,
        uUid: null,
        alarm: null,
        updatedt: null,
        sInedt: null,
        sMaterialtype: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    had(){
      if (this.$route.query.id==1){
       this.handlesealas()
      }else {
        this.getList();
      }
    },
    handleseala(){
      this.queryParams.alarm=1;
      this.queryParams.pageNum = 1;
      this.getList();
      this.queryParams.alarm=null;
    },
    handlesealas(){
      this.queryParams.alarm=2;
      this.queryParams.pageNum = 1;
      this.getList();
      this.queryParams.alarm=null;
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
      addMateriallibrarys(row).then(response => {
        console.log(response);
        // this.form = response.data;
        console.log(this.form);
        // this.title = "延长有效期";
        this.$modal.msgSuccess("修改成功");
        this.getList();
      });
    },
    handleUpdatesta(row) {
      updateMateriallibrary(row).then(response => {
        console.log(response);
        // this.form = response.data;
        console.log(this.form);
        // this.title = "延长有效期";
        this.$modal.msgSuccess("报废成功");
        this.getList();
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.uUid != null) {
            updateMateriallibrary(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMateriallibrary(this.form).then(response => {
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
        return delMateriallibrary(uUids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('material/materiallibrary/export', {
        ...this.queryParams
      }, `materiallibrary_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
