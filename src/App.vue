<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import VHeader from "@/components/VHeader";
import VFooter from "@/components/VFooter";
export default {
  name: "App",
  components: { VHeader, VFooter },
};
</script>

<style lang="scss">
@import "./style/common.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
