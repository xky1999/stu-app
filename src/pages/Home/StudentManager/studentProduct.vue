<template>
  <div class="studentProduct">
    <div class="top">
      <el-select
        v-model="value"
        multiple
        filterable
        remote
        @change="searchTextChange"
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <el-option
          v-for="item in options"
          :key="item.sId"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>

      <el-button
        type="primary"
        @click="searchTextChange"
        class="searchBtn"
        icon="el-icon-search"
        >搜索</el-button
      >
      <el-button
        type="primary"
        @click="addStu()"
        class="addProjectBtn"
        :disabled="hasDisabledFn('add')"
        >添加信息<i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </div>
    <!-- 选择班级 -->
    <div class="chooseclass">
      <span style="margin-right:10px">请选择班级:</span>
      <el-select
        v-model="classes"
        filterable
        @visible-change="classVisible"
        placeholder="请输入班级"
        :loading="loading"
        @change="classchange"
      >
        <el-option label="全部" value="all"></el-option>
        <el-option
          v-for="(item, index) in classOptions"
          :key="index"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <!-- 导出表格 -->
    <el-button type="primary" @click="exportExcel" icon="el-icon-share" style="float:right;margin:10px">导出表格</el-button>
   
    <el-table
      :data="stuData"
      stripe
      border
      v-loading="loading"
      style="width: 100%"
    >
      <el-table-column prop="headimgurl" align="center" label="头像" width="80">
        <template scope="scope">
          <!-- {{scope.row.headimgurl}} -->
          <img :src="scope.row.headimgurl" alt="" width="70" />
        </template>
      </el-table-column>
      <el-table-column prop="name" align="center" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="class" align="center" label="班级">
      </el-table-column>
      <el-table-column align="center" prop="productUrl" label="项目">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template class="btns" slot-scope="{ row }">
          <el-button
            type="primary"
            class="btn"
            icon="el-icon-view"
            :disabled="hasDisabledFn('read')"
            @click="$router.push({ path: '/StudentManager/studentProfile' })"
            >查看</el-button
          >
          <el-button
            type="primary"
            class="btn"
            :disabled="hasDisabledFn('edit')"
            icon="el-icon-edit"
            @click="editStu(row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            class="btn"
            :disabled="hasDisabledFn('delete')"
            icon="el-icon-delete"
            @click="deleteStu(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="dataCount"
      @current-change="changePage"
      background
      hide-on-single-page
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
    <qf-dialog></qf-dialog>
  </div>
</template>

<script>
import { getStuList, addStuDetail, delStu, searchStu, getClasses } from "@/api";
import { mapState, mapMutations } from "vuex";
import dialog from "../../../components/dialog";
import qee from "qf-export-excel";
export default {
  components: {
    "qf-dialog": dialog
  },
  computed: {
    ...mapState(["permissionButtons"])
  },
  data() {
    return {
      //表格数据对象
      classOptions: [],
      stuData: [],
      //表格加载动画控制
      loading: true,
      options: [],
      value: [],
      list: [],
      loading: false,
      states: [],
      total: 0, //总数据条数
      dataCount: 5,
      classes: "", //班级
      dataPage:1,
      params: {
        page: "",
        count: "",
        class: ""
      }
    };
  },
  methods: {
    //分页器  页码发生改变的时候触发的事件
    changePage(page) {
      // console.log(page);
      this.dataPage = page
      this.updateStuTable(this.params)
    },
    //导出表格
    exportExcel() {
      let titleList = [
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "年龄",
          key: "age"
        },
        {
          title: "住址",
          key: "city"
        }
      ];
      let dataSource = this.stuData;
      qee(titleList, dataSource, "fileName");
    },
    hasDisabledFn(params) {
      // console.log(params);
      // console.log(this.permissionButtons)
      let flag = this.permissionButtons.includes(params);
      // console.log(flag)
      return !flag;
    },
    //班级选择展开触发事件
    classVisible(isVisible) {
      // console.log(isVisible)
      if (!isVisible) {
        return;
      }
      getClasses().then(res => {
        if (res.data && res.data.state) {
          // console.log(res);
          this.classOptions = res.data.data;
        }
      });
    },
    // ...mapMutations(["CHANGE_DIALOG_VISIBLE","SET_STUFORM"]),
    //增加学员
    addStu() {
      this.$bus.$emit("showDialog");
    },
    // 编辑学员
    editStu(row) {
      // 1 弹出dialog
      // 2 数据回显
      // 3 更新提交
      this.$bus.$emit("editStuEvent", row);
    },
    // 更新表格数据
    updateStuTable(params) {
      this.loading = true;
      params = this.params;
      params.count = this.dataCount || "";
      params.page = this.dataPage || "";
      getStuList(params).then(res => {
        if (res.data && res.data.state) {
          this.stuData = res.data.data;
          this.total = res.data.total; // 数据总数
          // console.log("total", this.total);
          this.loading = false;
        } else {
          this.$message.warning("数据获取失败");
          this.loading = false;
        }
      });
    },
    //删除学员
    deleteStu(row) {
      // console.log(row);
      if (row && row.sId) {
        // 确认删除
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            delStu(row.sId)
              .then(res => {
                if (res.data.state && res.data) {
                  // console.log(res);
                  //删除成功
                  this.$message.success("删除成功"), this.updateStuTable();
                } else {
                  this.$message.warning("删除失败");
                }
              })
              .catch(err => {
                this.$message.err("删除出错");
              });
          })
          // 、、用户取消删除
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        // meiyou没有row
        this.$message.err("没有传入row对象");
      }
    },

    remoteMethod(query) {
      // console.log(query);
      let key = query;
      searchStu(key).then(res => {
        // console.log(res);
        if (res.data && res.data.state) {
          console.log(res.data.data);
          this.options = res.data.data;
        }
      });
    },

    // 搜索框选中 值发生变化的事件
    searchTextChange(searchText) {
      this.loading = true;
      // console.log(searchText);
      // console.log(searchText[0]);
      let key = searchText[0];
      if (!searchText[0]) {
        this.updateStuTable();
        return;
      }
      searchStu(key).then(res => {
        // console.log(res);
        if (res.data && res.data.state) {
          // console.log(res.data.data);
          //更改我啊表格数据对象
          this.loading = false;
          this.total = res.data.total; // 数据总数

          this.stuData = res.data.data;
        }
      });
    },
    //选择班级
    classchange(query) {
      // console.log(query);
      if (query === "all") {
        this.params = {
          page: 1,
          count: 5
        };
        console.log(this.params.count);
        this.updateStuTable(this.params);
        return;
      }

      this.params = {
        page: 1,
        count: 5,
        class: query
      };

      this.updateStuTable(this.params);
    }
  },
  mounted() {
    // 页面加载 获取表格数据
    this.updateStuTable(this.params);
    this.$bus.$on("updateStuTable", () => {
      this.updateStuTable(this.params);
    });
    this.list = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  }
};
</script>
<style scoped>
.studentProduct .top {
  display: flex;
}
.chooseclass {
  display: flex;
  align-items: center;
}
</style>