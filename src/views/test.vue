<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="id">
        <el-input v-model="formInline.id" placeholder="id"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">增加</el-button>
      </el-form-item>
    </el-form>

    <!-- //增加成员弹出 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="爱好" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.hobbies">
            <el-checkbox label="撩妹" value=1></el-checkbox>
            <el-checkbox label="敲代码" value=2></el-checkbox>
            <el-checkbox label="下棋" value=3></el-checkbox>
            <el-checkbox label="睡觉" value=4></el-checkbox>
            <el-checkbox label="吃蜂蜜" value=5></el-checkbox>
            <el-checkbox label="玩游戏" value=6></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="id" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="hobbies" label="爱好"></el-table-column>
      <el-table-column>
        <template slot-scope="props">
          <el-button @click="modify(props)">修改</el-button>
          <el-button @click="del(props)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "test",
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "150px",
      tableData: [],
      formInline: {
        name: "",
        id: ""
      },
      form: {
        id: 4,
        name: "沙雕宓",
        age: 26,
        email: "xiaomi@hicling.com",
        password: "12345",
        hobbies: ["玩游戏","睡觉"]
      }
    };
  },
  watch: {
    tableList: {
      handler(to) {
        console.log(to);
        this.list = to;
      },
      immediate: false,
      deep: true
    }
  },
  methods: {
    getData() {
      this.tableData = [];
      axios.get("api/list").then(res => {
        res.data.forEach(item => {
          this.tableData.push({
            id: item.id,
            name: item.name,
            age: item.age,
            password: item.password,
            email: item.email,
            hobbies: item.hobbies
          });
        });
      });
    },
    onSubmit() {
      axios
        .get("api/list/filter", {
          params: {
            name: this.formInline.name,
            id: this.formInline.id
          }
        })
        .then(res => {
          this.tableData = [];
          console.log(res.data);
          let resualt = res.data;
          this.tableData.push({
            id: resualt.id,
            name: resualt.name,
            age: resualt.age,
            password: resualt.password,
            email: resualt.email,
            hobbies: resualt.hobbies
          });
        });
    },
    add() {
      console.log(this.form)
      axios.post("api/list/add",{
        data: this.form
      }).then(res=>{
        if(res.status === 200){
          this.dialogFormVisible = false;
          this.$message({
            message: res.data,
            showClose: true,
            duration: 3000,
            type: "success"
          });
          this.getData();
        }
      })
    },
    modify(val){
      console.log(val.row)
    },
    del(val){
      console.log(val.row.id)
      axios.get("api/list/del",{
        params: {
          id: val.row.id
        }
      }).then(res=>{
        this.getData()
      })
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
</style>