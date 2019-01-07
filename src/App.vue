<template>
  <div id="app">
    <navigation>
			<router-view name="default"></router-view>
    </navigation>
  </div>
</template>

<script>
require("./assets/css/common.less");
export default {
  name: "app"
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

*{
  margin:0;
  padding:0;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.clearfix:after {
  display: block;
  content: '';
  clear: both;
}

.clearfix {
  zoom: 1;
}
</style>
