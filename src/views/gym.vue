<template>
  <div class="verticalContent">
    <v-head />
    <div class="verticalGym" v-for="(arr,index) of newArray" :key="index">
      <transition-group name="slide-fade" class="itemWrap">
        <template v-if="index == n" style="height: 1724px">
          <active-item v-for="(subItem,subIndex) of arr" :key="subIndex" :member="subItem"></active-item>
        </template>
      </transition-group>
    </div>
    <v-foot />
  </div>
</template>
<script>
import VFoot from "@/components/VFoot";
import VHead from "@/components/VHead";
import { actSocket } from "@/mixin/index";
import ActiveItem from "@/components/ActiveItem";
import axios from "axios";
let arrSort = require("arr-sort");
export default {
  name: "gym",
  // mixins: [actSocket],
  components: { ActiveItem, VFoot, VHead },
  data() {
    return {
      userList: [],
      n: 0,
      newArray: [],
      tempArr: []
    };
  },
  methods: {
    getData() {
      axios
        .get("/Get/list2")
        .then(res => {
          console.log(res);
          res.data.forEach((item,index) => {
            this.userList.push({
              name: item.name,
              avatar: item.avatar,
              totalCal: item.cl,
              hr: item.hr,
              hrPayload: item.hrPayload,
              isShow: item.isShow,
              mac: item.mac,
              steps: item.st,
              index: index + 1
            });
            // this.setBackground(item);
          });
        })
        .then(() => {
          this.userList.forEach(item => {
            if(item.hrPayload <60){
              item.className = "bgImg5";
            }else if (item.hrPayload >= 60 && item.hrPayload <= 69) {
              item.className = "bgImg4";
            } else if (item.hrPayload >= 70 && item.hrPayload <= 79) {
              item.className = "bgImg3";
            } else if (item.hrPayload >= 80 && item.hrPayload <= 89) {
              item.className = "bgImg2";
            } else if (item.hrPayload >= 90) {
              item.className = "bgImg1";
            }
          });
          let index = 0;
          let newArray = [];
          while (index < this.userList.length) {
            newArray.push(this.userList.slice(index, (index += 16)));
          }
          this.newArray = newArray;
          console.log(this.newArray);
        });
    },
    setBackground(item) {
      if (this.$refs.items) {
        let hrPayload = item.hrPayload;
        if(hrPayload <60){
          return "bgImg5";
        }
        if (hrPayload >= 60 && hrPayload <= 69) {
          return "bgImg4";
        }
        if (hrPayload >= 70 && hrPayload <= 79) {
          return "bgImg3";
        } 
        if (hrPayload >= 80 && hrPayload <= 89) {
          return "bgImg2";
        }
        if (hrPayload >= 90) {
          return "bgImg1";
        }
      }
    },
    // getUserList() {
    //   this.userList = [];
    //   let index = 1;
    //   this.getRequest("api/cling/user/all")
    //     .then(res => {
    //       res.data.data.map(item => {
    //         this.userList.push({
    //           avatar: item.avatar,
    //           gender: item.gender,
    //           genderCN:
    //             item.gender == 1 ? "男" : item.gender == 0 ? "女" : "undefined",
    //           birthdate: item.birthdate,
    //           id: item.id,
    //           uid: item.uid,
    //           mac: item.mac,
    //           name: item.name,
    //           nickName: item.nickName,
    //           distance: 0,
    //           hbp: 0,
    //           hr: 0,
    //           lbp: 0,
    //           steps: 0,
    //           totalCal: 0,
    //           hrPayload: 0,
    //           isShow: false
    //         });
    //       });
    //     })
    //     .then(() => {
    //       this.getHealthInfo();
    //     })
    //     .then(() => {
    //       this.userList.map(i => {
    //         this.tempArr.map(j => {
    //           if (i.uid === j.uid) {
    //             i.distance = j.distance;
    //             i.hbp = j.hbp;
    //             i.hr = j.hr;
    //             i.lbp = j.lbp;
    //             i.steps = j.steps;
    //             i.totalCal = j.totalCal;
    //             i.hrPayload = res;
    //           }
    //         });
    //       });
    //       this.userList = arrSort(this.userList, [
    //         {
    //           attr: "hrPayload",
    //           asc: false
    //         },
    //         {
    //           attr: "totalCal",
    //           asc: false
    //         }
    //       ]);
    //       let index = 1;
    //       this.userList.map(item => {
    //         item.index = index;
    //         item.hrPayload = this.getHrPayload(
    //           item.hr,
    //           item.birthdate,
    //           item.gender
    //         );
    //         index++;
    //       });
    //     })
    //     .then(() => {
    //       this.group();
    //     })
    //     .then(() => {
    //       this.autoPager();
    //     });
    // },
    // getHealthInfo() {
    //   this.tempArr = [];
    //   this.getRequest("api/cling/health/all/today").then(res => {
    //     this.tempArr = [...this.tempArr, ...res.data.data];
    //   });
    // },
    // getHrPayload(hr, birthdate, gender) {
    //   let age = 2019 - new Date(birthdate).getFullYear();
    //   let resualt;
    //   resualt =
    //     gender == 0
    //       ? Math.round((hr / (226 - age)) * 100)
    //       : Math.round((hr / (220 - age)) * 100);
    //   return resualt;
    // },
    // group() {
    //   let index = 0;
    //   let newArray = [];
    //   let tempList = this.userList.filter(item => {
    //     return item.isShow;
    //   });
    //   while (index < tempList.length) {
    //     newArray.push(tempList.slice(index, (index += 16)));
    //   }
    //   this.newArray = newArray;
    //   console.log(this.newArray)
    // },
    autoPager() {
      if (this.timer1) {
        clearInterval(this.timer1);
        this.timer1 = null;
      }
      this.timer1 = setInterval(() => {
        let len = this.newArray.length - 1;
        this.n = this.n < len ? this.n + 1 : 0;
      }, 10000);
    }
  },
  mounted() {
    this.getData();
    // this.getUserList();
    this.autoPager();
    console.log(__dirname)
  },
  beforeDestroy() {
    if (this.timer1) {
      clearInterval(this.timer1);
      this.timer1 = null;
    }
    if (this.timer3) {
      clearInterval(this.timer3);
      this.timer3 = null;
    }
  }
};
</script>
<style lang="scss" scoped>
.verticalContent {
  width: 1080px;
  height: 1920px;
  background-color: #0e1119;
  overflow: auto;
  margin-top: 98px;

  .verticalGym {
    width: 100%;
    .itemWrap {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px;
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>