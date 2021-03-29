import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEllipsisV, faList, faAngleUp, faAngleDown, faSquareFull, faHome, faCog, faInfoCircle, faUserCircle, faFileAlt, faCaretDown, faCaretUp, faStar, faArrowsAltV, faMinus } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import "@fontsource/noto-sans-jp"

library.add(faEllipsisV, faList, faAngleUp, faAngleDown, faSquareFull, faHome, faCog, faInfoCircle, faUserCircle, faFileAlt, faCaretDown, faCaretUp, faStar, farStar, faArrowsAltV, faMinus)

Vue.config.productionTip = false
Vue.use(BootstrapVue)

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);

new Vue({
  render: h => h(App),
}).$mount('#app')
