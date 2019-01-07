import "./utils/rem";
import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import Navigation from "vue-navigation";
import store from "./store";
import filters from "./filters";
Vue.use(Navigation, { router, store });

Vue.config.productionTip = false;
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
