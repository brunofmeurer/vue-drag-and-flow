<template>
  <div :ref="'drop-area' + group" :class="`drop-area`" :id="'drop-area' + group" :style="getColorGrid()">
    <Node
      v-for="(node, index) in nodes"
      v-bind:key="index"
      :obj="node"
      @input="(value) => {nodes[index] = value;}"
      :class="node.class"
      :backgroundColorIcon="node.backgroundColorIcon"
      :topConnected="node.topConnected"
      :bottomConnected="node.bottomConnected"
      :width="node.width"
      :height="node.height"
      :status="node.status"
      :noStatus="node.noStatus"
      :start="node.start"
      :end="node.end"
      :condition="node.condition"
      :color="nodeColorBackground"
      @startLink="startLink"
      @endLink="endLink"
      @drag="drag"
      :group="group"
      @select="(value) => {selected = value; $emit('selected', selected)}"
      :active="selected && selected.id === node.id"
    />
    <span style="position: absolute; top: 40%; left: 40%; font-size: 40px" v-if="nodes.length === 0">
      drop itens here
    </span>
    <svg :height="height" :width="width">
      <LinePath 
        v-for="(link, index) in links"
        v-bind:key="index"
        :dasharray="link.dasharray"
        :from="{node: nodes.find(e => e.id === link.idFrom), pos: link.posFrom}"
        :to="{node: nodes.find(e => e.id === link.idTo), pos: link.posTo}"
        :group="group"
        :color="lineColor"
      />
      <defs>
      <marker id="triangle" viewBox="0 0 10 10"
          refX="1" refY="5"
          markerUnits="strokeWidth"
          markerWidth="10" markerHeight="10"
          orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" :fill="lineColor"/>
      </marker>
    </defs>
    </svg>
  </div>
</template>

<script>
import Node from "./components/Node";
import LinePath from "./components/LinePath";

export default {
  name: 'DragArea',
  props: {
    group: {
      type: String,
      default: 'group'
    },
    width: {
      type: Number,
      default: 1080
    },
    height: {
      type: Number,
      default: 1000,
    },
    nodeColorBackground: {
      type: String,
      default: ''
    },
    lineColor: {
      type: String,
      default: "#fff"
    },
    gridColor: {
      type: String,
      default: null
    },
  },
  components: { 
    Node,
    LinePath
  },
  data () {
    return {
      selected: null,
      nodes: []
    }
  },
  mounted () {
    this.$refs['drop-area' + this.group].addNode = this.addNode
  },
  methods: {
    drag (drag) {
      console.log(drag)
    },
    addNode (node) {
      node.id = this.getNewId()
      this.nodes.push(node)
      console.log("add", node)
    },
    startLink (from) {
      this.nodes.find(e=> e.id === from.id).links = from.links
      this.$forceUpdate()
    },
    endLink (fromId, toId, link) {
      if (document.startLinkId) {
        Object.assign(this.nodes.find(e=> e.id === fromId).links.find(e => e.posFrom === document.posFrom), link)
        this.nodes.find(e=> e.id === fromId).links = this.nodes.find(e=> e.id === fromId).links.filter(e => e.idTo !== '')
        this.nodes.find(e=> e.id === toId).topConnected = true
        this.nodes.find(e=> e.id === fromId).bottomConnected = true

        document.startLinkId = null
        document.posFrom = null
        this.$forceUpdate()
      }
    },
    getNewId () {
      return '_' + Math.random().toString(36).substr(2, 9);
    },
    getNodes () {
      return this.nodes
    },
    getColorGrid () {
      return `
      background-image:
      linear-gradient(to right, ${this.gridColor ? this.gridColor : 'transparent'} 1px, transparent 1px);`
    }
  },
  computed: {
    links () {
      return this.nodes.filter(e => e.links).map(e => e.links).flat()
    }
  }
}
</script>

<style>
 
</style>
