<template>
  <div class="login_wrap">
    <form action class="loginForm" @keydown.enter.native="onLogin($event)">
      <p class="title">智能场馆</p>
      <input
        class="login_input"
        placeholder="请输入用户名..."
        type="text"
        autocomplete="false"
        v-model="username"
      />
      <input
        class="login_input"
        placeholder="请输入密码..."
        type="password"
        autocomplete="false"
        v-model="password"
      />

      <button class="login_btn" @click="onLogin($event)">登&nbsp;&nbsp;录</button>
    </form>
    <el-dialog title="请选择场馆" :visible.sync="dialogVisible" width="30%" center class="myDialog">
      <div class="block">
        <p>场馆名称:</p>
        <el-select v-model="gymid" placeholder="请选择" @change="handleChange">
          <el-option
            v-for="item in gymOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="block">
        <p>场馆区域:</p>
        <el-select v-model="mapid" placeholder="请选择" :disabled="disableFlag">
          <el-option
            v-for="item in mapOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectGym">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { Base64 } from "js-base64";
import md5 from "md5";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: { Treeselect },
  data() {
    return {
      dialogVisible: false,
      username: "",
      password: "",
      gymOptions: [],
      gymid: null,
      mapOptions: [],
      mapid: null,
      disableFlag: true
    };
  },
  methods: {
    onLogin(e) {
      this.gymOptions = [];
      this.mapOptions = [
        {
          value: 0,
          label: "全部区域"
        }
      ];
      this.gym = null;
      this.map = null;
      e.preventDefault();

      let pass = md5(this.password).toUpperCase();

      this.httpRequest("POST", "web/v3/login", {
        username: this.username,
        password: pass
      }).then(res => {
        let resualt;
        this.dialogVisible = true;
        if (res.data.data) {
          resualt = JSON.parse(decodeURI(this.$decrypt(res.data.data)));
          // console.log(resualt);
          window.sessionStorage.setItem(
            "userInfo",
            JSON.stringify({
              userid: resualt.userid,
              token: resualt.token
            })
          );
          //获取场馆
          let gymArr = resualt.gym;
          gymArr.forEach(item => {
            this.gymOptions.push({
              value: item.gym_id,
              label: item.gym_name
            });
            let logo = decodeURIComponent(item.gym_logo);
            // this.$root.$data.store.getLogo(logo);
            window.sessionStorage.setItem("logo",logo)
            // debugger
            //获取场馆map
            let mapArr = item.gym_map;
            mapArr.forEach(subItem => {
              this.mapOptions.push({
                value: subItem.map_id,
                label: subItem.map_name
              });
            });
          });
        } else {
          console.log(res);
        }
      });
    },
    handleChange(value){
      if(this.gymid){
        this.disableFlag = false;
      }else{
        this.disableFlag = true;
      }
    },
    selectGym() {
      if (((this.gymid && this.mapid)) ||(this.gymid && this.mapid === 0)) {
        let token = JSON.parse(window.sessionStorage.getItem("userInfo")).token;
        let userid = JSON.parse(window.sessionStorage.getItem("userInfo"))
          .userid;
        let gymInfo = {
          userid: userid,
          gym_id: this.gymid,
          map_id: this.mapid
        };
        this.httpRequest(
          "POST",
          `web/v3/select/gym?token=${token}`,
          gymInfo
        ).then(res => {
          let resualt;
          this.succeed("登录成功");

          resualt = JSON.parse(this.$decrypt(res.data.data));

          this.MAClist = [...resualt];
          window.sessionStorage.setItem("gymInfo", JSON.stringify(gymInfo));
          window.sessionStorage.setItem(
            "MAClist",
            JSON.stringify(this.MAClist)
          );
          this.dialogVisible = false;
          this.$router.push({ name: "smartgym" });
        });
      } else {
        this.warning("请选择场馆及区域");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.login_wrap {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgb(235, 228, 228);
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/images/loginbg.jpg") center center no-repeat;
  background-size: cover;
  min-width: 800px;
  .loginForm {
    width: 360px;
    height: 400px;
    display: flex;
    flex-direction: column;
    padding: 30px 20px;
    box-sizing: border-box;
    align-items: center;
    border: 2px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
    animation: shake linear 4s infinite;
    .title {
      font-size: 32px;
      color: #fff;
      margin-bottom: 20px;
    }
    .login_input {
      width: 300px;
      height: 50px;
      outline: none;
      border-radius: 5px;
      border: 1px solid #fff;
      margin-bottom: 50px;
      line-height: 50px;
      padding: 5px 10px;
      font-size: 16px;
      background-color: rgba(0, 0, 0, 0);
      color: #fff;
      box-sizing: border-box;
      &::placeholder {
        color: #bbb;
      }
    }
    .login_input:focus {
      border: 1px solid #20a0ff;
    }
    .login_input:hover {
      border: 1px solid #20a0ff;
    }

    .login_btn {
      width: 180px;
      height: 50px;
      background-color: #1890ff;
      border-radius: 5px;
      outline: none;
      line-height: 40px;
      text-align: center;
      margin-bottom: 50px;
      color: #fff;
      font-size: 22px;
      font-family: Arial, Helvetica, sans-serif;
    }
    .login_btn:hover {
      background-color: #20a0ff;
    }
    .login_btn:focus {
      background-color: #1890ff;
    }
  }
  .myDialog /deep/ {
    .el-dialog__header {
      height: 50px;
      .el-dialog__title {
        font-size: 32px;
        line-height: 50px;
      }
    }
    .el-dialog__body {
      margin: 50px 0;
      .block {
        width: 400px;
        height: 50px;
        margin: 0 auto;
        font-size: 26px;
        display: flex;
        p {
          width: 90px;
          height: 50px;
          font-size: 18px;
          line-height: 50px;
        }
        .el-input__inner,
        .el-input {
          color: #424242;
          background-color: rgba(0, 0, 0, 0);
          width: 300px;
          height: 50px;
        }
      }
    }
    .el-dialog__footer{
    }
  }
}
@keyframes shake {
  0% {
    transform: translate(0%, 0%);
  }
  25% {
    transform: translate(-1.5%, 1.5%);
  }
  50% {
    transform: translate(0%, 3%);
  }
  75% {
    transform: translate(1.5%, 1.5%);
  }
  100% {
    transform: translate(0%, 0%);
  }
}
</style>
