<template>
  <div>
    <v-header />
    <div class="content" ref="myContent">
      <div class="smartgym" v-for="(arr,index) of newArray" :key="index">
        <transition-group name="slide-fade" class="itemWrap">
          <template v-if="index == n">
            <active-item v-for="(subItem,subIndex) of arr" :key="subIndex" :member="subItem"></active-item>
          </template>
        </transition-group>
      </div>
    </div>
    <v-footer />
  </div>
</template>
<script>
import VHeader from "@/components/VHeader";
import VFooter from "@/components/VFooter";
import { actSocket } from "@/mixin/index";
import ActiveItem from "@/components/ActiveItem";
import axios from "axios";
let arrSort = require("arr-sort");
export default {
  name: "smartgym",
  mixins: [actSocket],
  components: { ActiveItem, VHeader, VFooter },
  data() {
    return {

    };
  },
  methods: {
  },
  mounted() {
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
.content {
  width: 1920px;
  height: 884px;
  background-color: #0e1119;
  overflow: auto;
  .smartgym {
    width: 100%;
    .itemWrap {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 10px;
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