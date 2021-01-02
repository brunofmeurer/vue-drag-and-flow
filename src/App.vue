<template>
  <div id="app" style=" display: flex;">
    <div :style="`top: 50px; left: 0; z-index: 999; background-color: ${colors[selectColor].menu}; padding: 5px; color:${colors[selectColor].textColor};`">
      <span>Objects</span>
      <div class="grid" style="position: static; margin: 5px">
        <NodeClone
          v-for="(node2, index) in nodeObjects"
          v-bind:key="index"
          :obj="node2"
          :class="node2.class"
          :backgroundColorIcon="node2.backgroundColorIcon"
          :topConnected="node2.topConnected"
          :bottomConnected="node2.bottomConnected"
          :width="node2.width"
          :height="node2.height"
          :status="node2.status"
          :noStatus="node2.noStatus"
          @drag="(value) => drag = value"
          :clone="true"
          :group="group"
          :color="colors[selectColor].nodeClone"
          :style="`margin-top: 1px;`"
        />
      </div>
      colors
      <button v-for="(color, index) in colors" v-bind:key="index" @click="selectColor = index"> {{color.name}}</button>
    </div>
    <DragArea
      :group="group"
      :nodeColorBackground="colors[selectColor].node"
      :lineColor="colors[selectColor].line"
      :style="`background-color:${colors[selectColor].dropArea};color:${colors[selectColor].textColor};`"
    ></DragArea>
  </div>
</template>

<script>
import NodeClone from './components/NodeClone.vue'
import DragArea from './DragArea.vue'
export default {
  components: { DragArea, NodeClone },
  data () {
    return {
      drag: true,
      group: 'group',
      colors: [
        {
          name: 'dark',
          nodeClone: '#303030',
          node: '#303030',
          nodeStatus: '#424242',
          dropArea: '#424242',
          menu: '#212121',
          textColor: '#fff',
          line: '#fff'
        },
        {
          name: 'dark blue',
          nodeClone: '#3C4973',
          node: '#3C4973',
          nodeStatus: '#343A3F',
          dropArea: '#2A3456',
          menu: '#191A28',
          textColor: '#fff',
          line: '#fff'
        },
        {
          name: 'white',
          nodeClone: '#fff',
          node: '#fff',
          nodeStatus: '#343A3F',
          dropArea: '#fff',
          menu: '#F6F8FA',
          textColor: '#404453',
          line: '#000'
        }
      ],
      selectColor: 1,
      nodeObjects: [
        {
          icon: 'play',
          content: 'Start',
          start: true,
          backgroundColorIcon: '#1BA345',
          links: []
        },
        {
          icon: ['fab','chrome'],
          content: 'Open browse',
          class: 'id792',
          links: []
        },
        {
          icon: 'tag',
          content: 'Find tag',
          class: 'id792',
          links: []
        },
        {
          icon: 'mouse-pointer',
          content: 'Action tag',
          class: 'id792',
          links: []
        },
        {
          icon: 'qrcode',
          content: 'Captcha solver',
          width: '150px',
          links: []
        },
        {
          icon: 'comment-alt',
          content: 'Screen Message',
          class: 'id792',
          links: []
        },
        {
          icon: 'bolt',
          content: 'Trigger',
          class: 'id792',
          backgroundColorIcon: '#FEC001',
          links: []
        },
        {
          icon: 'code-branch',
          content: 'Condition',
          width: '150px',
          condition: true,
          links: []
        },
        {
          icon: 'flag',
          content: 'End',
          backgroundColorIcon: '#DE3E44',
          status: 'error',
          end: true,
          links: []
        }
      ]
    }
  }
}
</script>

<style>
</style>