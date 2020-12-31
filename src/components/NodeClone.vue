<template>
  <div :style="`min-height: ${height}; border-radius: 5px; border: ${drag ? '1' : '0'}px grey dashed;`">
    <div :id="model.id" ref="node" class="node" :style="`min-width: ${width}; min-height: ${height}; top: ${model.x}px; left: ${model.y}px; ${drag ? 'position: absolute;': ''}`">
      <div v-if="false" id="icon" :style="`background-color: ${backgroundColorIcon}; min-height: ${height}; width: 30px`">
        <font-awesome-icon :icon="model.icon" size="xs" style="margin: 4px"/>
      </div>
      <div id="content">
        {{model.content}}
        <p style="font-size: 10px" v-if="model.description">
          {{model.description}} 
        </p>
      </div>
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
      default: '200px'
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
      default: '#6D90FF'
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
    clone: {
      type: Boolean,
      default: false
    },
    group: {
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
      drag: false,
      originalX: 0,
      originalY: 0
    }
  },
  mounted () {
    this.elmnt = this.$refs.node
    this.originalX = this.elmnt.offsetTop
    this.originalY = this.elmnt.offsetLeft
    this.elmnt.onmousedown = this.dragMouseDown
    this.elmnt.ontouchstart = this.dragMouseDown
  },
  methods: {
    dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      /* 
      if (this.clone) {
        var nodeCopy = this.$refs.node.cloneNode(true);
        nodeCopy.id = "newId";
        document.getElementById('drop-area').appendChild(nodeCopy);
        this.elmnt = nodeCopy
      } */

      document.onmouseup = this.closeDragElement;
      document.onmousemove = this.elementDrag;

      document.ontouchend = this.closeDragElement;
      document.ontouchmove = this.elementDrag;
      this.drag = true
      this.$emit('drag', this.drag)

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
      document.onmouseup = null;
      document.onmousemove = null;

      document.ontouchend = null
      document.ontouchmove = null

      this.elmnt.style.top = this.originalX + "px";
      this.elmnt.style.left = this.originalY + "px";

      this.pos1 = 0;
      this.pos2 = 0;
      this.pos3 = 0;
      this.pos4 = 0;

      let position = this.getRecursiveParentUntilProperty({node: {id: 'drop-area' + this.group}, pos: ''}, 'id', 'app')

      this.model.x = (this.model.x - position.y);
      this.model.y = (this.model.y - position.x);
      this.dropArea = document.getElementById('drop-area' + this.group)
      if (this.model.x > 0 && this.model.y > 0 && this.dropArea) {
        document.getElementById('drop-area' + this.group).addNode(JSON.parse(JSON.stringify(this.model)))
      } else {
        console.error(`error: not add. Target Group "${this.group}" not in focus`)
      }

      this.model.y = this.originalY;
      this.model.x = this.originalX;

      this.drag = false
      this.$emit('drag', this.drag)

    },
    getStatusColor () {
      if (this.status === 'pendent' || this.status == null)
        return '#343A3F'
      else if (this.status === 'error')
        return '#DE3E44'
      else if (this.status === 'success' )
        return '#1BA345'
    },
    getRecursiveParentUntilProperty (object, property, value) {
      let result = {y: 0, x: 0}
      let element = document.getElementById(object.node.id + object.pos)
      
      if (element) {
        do {
          result.y += element.offsetTop
          result.x += element.offsetLeft
          element = element.offsetParent
        } while (element && element[property].includes(value))
      }
      return result
    },
  }
}
</script>

<style scoped>
  .node {
    display: flex;
    justify-content: flex-start;
    cursor: move;
    background-color: #3C4973;
    border-radius: 5px;
    -webkit-box-shadow: 3px 5px 11px -2px rgba(0,0,0,0.17);
    -moz-box-shadow: 3px 5px 11px -2px rgba(0,0,0,0.17);
    box-shadow: 3px 5px 11px -2px rgba(0,0,0,0.17);
    border: 0px;
    color: white;
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
</style>
