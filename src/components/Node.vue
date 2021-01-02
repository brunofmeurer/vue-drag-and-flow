<template>
  <div :id="model.id" ref="node" :class="'node ' + (active ? 'selected' : '')" :style="`min-width: ${width}; min-height: ${height}; top: ${model.x}px; left: ${model.y}px; ${color ? 'background-color:' + color : ''}`" @click="setActive(true)">
    <div class="dot" :style="`background-color: ${topConnected ? '#1BA345' : '#ECF2F4'}; position: absolute; top: calc(-${sizeConnectors / 10}px - ${sizeConnectors / 2}px); left: calc(50% - ${sizeConnectors/2}px); width: ${sizeConnectors}px; height: ${sizeConnectors}px; border-radius: 50px;`" :id="model.id + 'top'" v-if="!start" @click="endLink" @drag="endLink"/>
    
    <div v-if="!end && !condition">
      <div class="dot" :style="`background-color: ${bottomConnected ? '#1BA345' : '#ECF2F4'}; position: absolute; bottom: calc(-${sizeConnectors / 10}px - ${sizeConnectors / 2}px); left: calc(50% - ${sizeConnectors/2}px); width: ${sizeConnectors}px; height: ${sizeConnectors}px; border-radius: 50px`" :id="model.id + 'bottom'" @click="startLink('bottom')"/>
    </div>

    <div v-if="!end && condition">
      <div class="dot" :style="`background-color: ${model.link ? '#1BA345' : '#1BA345'}; position: absolute; bottom: calc(-${sizeConnectors / 10}px - ${sizeConnectors / 2}px); left: calc(40% - ${sizeConnectors/2}px); width: ${sizeConnectors}px; height: ${sizeConnectors}px; border-radius: 50px`" :id="model.id + 'bottomYes'" @click="startLink('bottomYes')"/>
      <span style="position: absolute; left: 30px; bottom: -10px; color: #1BA345">yes</span>
    </div>

    <div v-if="!end && condition">
      <div class="dot" :style="`background-color: ${model.link ? '#1BA345' : '#DE3E44'}; position: absolute; bottom: calc(-${sizeConnectors / 10}px - ${sizeConnectors / 2}px); left: calc(60% - ${sizeConnectors/2}px); width: ${sizeConnectors}px; height: ${sizeConnectors}px; border-radius: 50px`" :id="model.id + 'bottomNo'" @click="startLink('bottomNo')"/>
      <span class="noAnimation" style="position: absolute; right: 35px; bottom: -10px; color: #DE3E44;">no</span>
    </div>

    <div v-if="model.icon" id="icon" :style="`background-color: ${backgroundColorIcon}; min-height: ${height}; width: 30px`">
      <font-awesome-icon :icon="model.icon" style="margin: 7px; width: 10px;"/>
    </div>
    <div id="content" v-if="model.content">
      {{model.content}}
      <p style="font-size: 10px" v-if="model.description">
        {{model.description}} 
      </p>
    </div>
    <div id="status" :style="`background-color: ${getStatusColor()} `" v-if="!model.noStatus">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '30px'
    },
    icon: {
      type: String,
      default: 'icon'
    },
    backgroundColorIcon: {
      type: String,
      default: '#555'
    },
    topConnected: {
      type: Boolean
    },
    bottomConnected: {
      type: Boolean
    },
    status: {
      type: String
    },
    noStatus: {
      type: Boolean,
      default: false
    },
    start: {
      type: Boolean,
      default: false
    },
    end: {
      type: Boolean,
      default: false
    },
    condition: {
      type: Boolean,
      defalt: false
    },
    group: {
      type: String
    },
    color: {
      type: String
    }
  },
  data () {
    return {
      model: this.obj,
      pos1: 0,
      pos2: 0,
      pos3: 0,
      pos4: 0,
      sizeConnectors: 6,
      active: false
    }
  },
  watch: {
    model: {
      handler () {
        this.$emit('input', this.model)
      },
      deep: true,
      elmnt: {}
    }
  },
  mounted () {
    this.elmnt = this.$refs.node
    this.elmnt.onmousedown = this.dragMouseDown
    this.elmnt.ontouchstart = this.dragMouseDown
  },
  methods: {
    startLink (posFrom) {
      this.model.links.push({idFrom: this.model.id, idTo: '', posFrom})
      document.startLinkId = this.model.id
      document.posFrom = posFrom
      this.$emit('startLink', this.model)
      this.$forceUpdate()
    },
    endLink () {
      this.$emit('endLink', document.startLinkId, this.model.id, {idTo: this.model.id, posTo: 'top'})
    },
    setLink (link) {
      this.model.link = link
    },
    dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      document.onmouseup = this.closeDragElement;
      document.onmousemove = this.elementDrag;

      document.ontouchend = this.closeDragElement;
      document.ontouchmove = this.elementDrag;
      this.$emit('drag', true)
    },
    elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      if (e.clientX) {
        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
      } else {
        this.pos1 = this.pos3 - event.changedTouches[0].clientX;
        this.pos2 = this.pos4 - event.changedTouches[0].clientY;
        this.pos3 = event.changedTouches[0].clientX;
        this.pos4 = event.changedTouches[0].clientY;
      }
      this.model.x = (this.elmnt.offsetTop - this.pos2)
      this.model.y = (this.elmnt.offsetLeft - this.pos1)
      this.elmnt.style.top = this.model.x + "px";
      this.elmnt.style.left = this.model.y + "px";
    },
    closeDragElement() {
      document.onmouseup = null
      document.onmousemove = null

      document.ontouchend = null
      document.ontouchmove = null
      this.$emit('drag', false)
    },
    getStatusColor () {
      if (this.status === 'pendent' || this.status == null)
        return '#424242'
      else if (this.status === 'error')
        return '#DE3E44'
      else if (this.status === 'success' )
        return '#1BA345'
    },
    setActive (active) {
      this.active = active
    }
  }
}
</script>

<style scoped>
  .node {
    position: absolute;
    display: flex;
    justify-content: flex-start;
    cursor: move;
    background-color: #303030;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 24px;
    border: 0px;
  }

  .selected {
    box-shadow: rgba(255, 255, 255, 1) 0px 0px 5px;
  }

  .node > #content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
  }

  .node > #icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    vertical-align: center;
    margin: 0;
    align-items: center;
    border: 1px solid;
  }

  .node > #status {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 5px;
    position: absolute;
    right: 0px;
    height: 100%;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .dot {
    transition: all 0.1s ease-in-out;
  }
  .dot:hover {
    transform: scale(3);
    cursor: pointer;
  }

</style>
