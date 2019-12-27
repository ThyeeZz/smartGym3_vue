<template>
  <div class="gym_head">
    <div class="left">
      <!-- <div class="img_wrap">
        <img src="../assets/hicling.png" alt />
      </div>
      <div class="name">
        <p>{{nameCN}} </p>
      </div> -->
      <img src="../assets/images/kfs.png" alt="">
    </div>
    <div class="right">
      <div class="date">
        <p>{{weekStr}}</p>
        <p>{{dateStr}}</p>
      </div>
      <p class="hms">{{timeStr}}</p>
    </div>
  </div>
</template>
<script>
import { dateFormat, hmsFormat, week } from "@/tools";
export default {
  name: "gym_head",
  data() {
    return {
      nameCN: "快健身巴黎春天淮海路店",
      dateStr: "",
      timeStr: "",
      weekStr: ""
    };
  },
  methods: {
    getTime() {
      this.timer = setInterval(() => {
        this.dateStr = dateFormat();
        this.timeStr = hmsFormat();
        this.weekStr = week();
      });
    }
  },
  mounted() {
    this.getTime();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
};
</script>
<style lang="scss" scoped>
.gym_head {
  width: 1080px;
  height: 98px;
  box-sizing: border-box;
  padding: 14px 30px;
  color: #fff;
  background-color: #0C1F3B;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  .left {
    width: 400px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;;
    // .img_wrap {
    //   width: 69px;
    //   height: 69px;
    //   overflow: hidden;
    //   border-radius: 50%;
    //   img {
    //     width: 69px;
    //     height: 69px;
    //   }
    // }
    // .name {
    //   height: 69px;
    //   display: flex;
    //   flex-direction: column;
    //   justify-content: flex-end;
    //   font-size: 28px;
    //   p:first-child {
    //     display: flex;
    //     justify-content: space-between;
    //   }
    // }
    img{
      height: 69px;
    }
  }
  .right {
    width: 450px;
    height: 69px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .date{
      height: 59px;
        font-size: 22px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: right;
    }
    .hms{
        font-size: 62px;
        height: 100%;
    }
  }
}
</style>