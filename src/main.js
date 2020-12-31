import Vue from 'vue'
import 'core-js'
import App from './App.vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import Store from './store'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

import { VuePlugin } from 'vuera'

Vue.use(VuePlugin)

config.autoAddCss = false
library.add(fas)
library.add(fab)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: Store
}).$mount('#app')
