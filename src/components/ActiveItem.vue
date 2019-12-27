<template>
  <div>
    <div :class="member.className" ref="items" v-if="member.isShow">
      <div class="left">
        <div class="left_top">
          <span style="font-size: 22px;">{{member.index}}</span>
        </div>
        <div class="left_mid">
          <span class="hrPayload">{{member.pl?member.pl:0}}</span>
          <span class="hr_tag">%</span>
        </div>
        <div class="left_btm">
          <span class="calIcon"></span>
          <span class="calNum">{{member.cl?member.cl:0}}</span>
        </div>
      </div>
      <div class="mid">
        <div class="img_wrap">
          <img :src="member.avatar" />
        </div>
      </div>
      <div class="right">
        <div class="right_top">{{member.nickname?member.nickname:"未知"}}</div>
        <div class="right_mid">
          <span class="hbNum">{{member.hr?member.hr:0}}</span>
          <span class="hbIcon_wrap">
            <span class="hbIcon"></span>
          </span>
        </div>
        <div class="right_btm">
          <span class="stIcon"></span>
          <span class="stNum">{{member.st?member.st:0}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "activeItem",
  props: {
    member: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {

  },
};
</script>
<style lang="scss" scoped>

  .left {
    width: 130px;
    height: 191px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    .left_top {
      width: 110px;
      height: 50px;
      span {
        display: inline-block;
        width: 40px;
        height: 40px;
        background-color: #15436d;
        border-radius: 50%;
        line-height: 40px;
        text-align: center;
      }
    }
    .left_mid {
      width: 110px;
      height: 100px;
      display: flex;
      box-sizing: border-box;
      align-items: center;
      .hrPayload {
        height: 56px;
        display: inline-block;
        font-size: 66px;
        line-height: 60px;
      }
      .hr_tag {
        width: 20px;
        height: 50px;
        display: inline-block;
        box-sizing: border-box;
        padding: 3px 0;
        margin-left: 3px;
      }
    }
    .left_btm {
      width: 110px;
      height: 30px;
      display: flex;
      align-items: flex-end;
      .calIcon {
        display: inline-block;
        width: 25px;
        height: 25px;
        background: url("../assets/images/cal.png") center center no-repeat;
        background-size: cover;
        margin-right: 5px;
      }
      .calNum{
        font-size: 18px;
      }
    }
  }
  .mid {
    width: 150px;
    height: 196px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .img_wrap {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 150px;
        height: 150px;
      }
    }
  }
  .right {
    width: 170px;
    height: 196px;
    box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .right_top {
      width: 100%;
      height: 50px;
      text-align: right;
      font-size: 22px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .right_mid {
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .hbNum {
        height: 60px;
        font-size: 66px;
        line-height: 60px;
      }
      .hbIcon_wrap {
        width: 25px;
        height: 50px;
        display: inline-block;
        margin-left: 3px;
        .hbIcon {
          display: inline-block;
          width: 25px;
          height: 25px;
          background: url("../assets/images/hr.png") center center no-repeat;
          background-size: 140% 140%;
        }
      }
    }
    .right_btm {
      width: 100%;
      height: 30px;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      .stIcon {
        width: 25px;
        height: 25px;
        background: url("../assets/images/st.png") center center no-repeat;
        background-size: cover;
        margin-right: 5px;
      }
      .stNum {
        font-size: 18px;
      }
    }
  }

.bgImg1 {
  width: 465px;
  height: 201px;
  box-sizing: border-box;
  // margin-bottom: 20px;
  margin: 10px 5px 10px 5px;
  padding: 5px;
  display: flex;
  color: #fff;
  cursor: pointer;
  background: url("../assets/images/bgImg1.png") center center no-repeat;
  background-size: cover;
}
.bgImg2 {
  width: 465px;
  height: 201px;
  box-sizing: border-box;
  // margin-bottom: 20px;
  margin: 10px 5px 10px 5px;
  padding: 5px;
  display: flex;
  color: #fff;
  cursor: pointer;
  background: url("../assets/images/bgImg2.png") center center no-repeat;
  background-size: cover;
}
.bgImg3 {
  width: 465px;
  height: 201px;
  box-sizing: border-box;
  // margin-bottom: 20px;
  margin: 10px 5px 10px 5px;
  padding: 5px;
  display: flex;
  color: #fff;
  cursor: pointer;
  background: url("../assets/images/bgImg3.png") center center no-repeat;
  background-size: cover;
}
.bgImg4 {
  width: 465px;
  height: 201px;
  box-sizing: border-box;
  // margin-bottom: 20px;
  margin: 10px 5px 10px 5px;
  padding: 5px;
  display: flex;
  color: #fff;
  cursor: pointer;
  background: url("../assets/images/bgImg4.png") center center no-repeat;
  background-size: cover;
}
.bgImg5 {
  width: 465px;
  height: 201px;
  box-sizing: border-box;
  // margin-bottom: 20px;
  margin: 10px 5px 10px 5px;
  padding: 5px;
  display: flex;
  color: #fff;
  cursor: pointer;
  background: url("../assets/images/bgImg5.png") center center no-repeat;
  background-size: cover;
}
</style>