import DragAreaComp from "./DragArea.vue"
import NodeComp from './components/Node.vue'
import LinePathComp from './components/LinePath.vue'
import NodeCloneComp from './components/NodeClone.vue'
import Vue from "vue"

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import "@/assets/global.css"

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
import { VuePlugin } from 'vuera'

Vue.use(VuePlugin)

config.autoAddCss = false
library.add(fas)
library.add(fab)

Vue.config.productionTip = false

var Components = { DragArea: DragAreaComp, NodeClone: NodeCloneComp, Node: NodeComp, LinePath: LinePathComp }


Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export var DragArea = DragAreaComp
export var NodeClone = NodeCloneComp
export var LinePath = LinePathComp
export var Node = NodeComp

export default Components