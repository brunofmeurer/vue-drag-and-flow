<template>
  <div id="app" style=" display: flex;">
    <div style="top: 50px; left: 0; z-index: 999; background-color: #191A28; padding: 5px">
      <span style="color: white;">Objects</span>
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
          :group="'group'"
          style="margin-top: 1px"
        />
      </div>
    </div>
    <DragArea></DragArea>
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