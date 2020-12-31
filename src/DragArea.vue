<template>
  <div :ref="'drop-area' + group" :class="`drop-area  ${grid ? 'drop-area-grid' : ''}`" :id="'drop-area' + group">
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
      @startLink="startLink"
      @endLink="endLink"
      @drag="drag"
      :group="group"
    />
    <svg :height="height" :width="width">
      <LinePath 
        v-for="(link, index) in links"
        v-bind:key="index"
        :dasharray="link.dasharray"
        :from="{node: nodes.find(e => e.id === link.idFrom), pos: link.posFrom}"
        :to="{node: nodes.find(e => e.id === link.idTo), pos: link.posTo}"
        :group="group"
      />
      <defs>
      <marker id="triangle" viewBox="0 0 10 10"
          refX="1" refY="5"
          markerUnits="strokeWidth"
          markerWidth="10" markerHeight="10"
          orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#6B757D"/>
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
    grid: {
      type: Boolean,
      default: false
    },
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
      default: 5000
    }
  },
  components: { 
    Node,
    LinePath
  },
  data () {
    return {
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
      Object.assign(this.nodes.find(e=> e.id === fromId).links.find(e => e.posFrom === document.posFrom), link)
      this.nodes.find(e=> e.id === fromId).links = this.nodes.find(e=> e.id === fromId).links.filter(e => e.idTo !== '')
      this.nodes.find(e=> e.id === toId).topConnected = true
      this.nodes.find(e=> e.id === fromId).bottomConnected = true
      this.$forceUpdate()
    },
    getNewId () {
      return '_' + Math.random().toString(36).substr(2, 9);
    },
    getNodes () {
      return this.nodes
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
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-image: linear-gradient(#2B3557, #192037);
  }
  .drop-area {
    width: calc(100%);
    height: calc(100%);
    position: relative;
    background-size: 20px 20px;
    transition: all 0.1s ease-in-out;
  }
  .drop-area-grid {
    background-image:
      linear-gradient(to right,#2b3247a1 1px, transparent 1px),
      linear-gradient(to bottom,#2b3247a1 1px, transparent 1px);
  }
</style>
