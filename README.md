# vue-drag-and-flow

![Image of Yaktocat](./public/banner.png)

A beautiful flowchart maker, made with vuejs towards status machine and process automation. Have fun :D.

## Demo
[Demo flow maker](https://brunofmeurer.github.io/vue-drag-and-flow/)

## Using
```
yarn add vue-drag-and-flow
```

```
npm install vue-drag-and-flow -s
```

## Code
```javascript
import Vue from "vue"

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

config.autoAddCss = false
library.add(fas)
library.add(fab)
```

```javascript
<template>
  <div style=" display: flex;">
  </div>
</template>

<script>
import { DragArea, NodeClone } from 'vue-drag-and-flow'

export default {
  components: {
    DragArea,
    NodeClone
  },
  data () {
    return {
      objects: []
    }
  }
}
</script>

```


## Todo
- [x] Flowchart maker
- [ ] Organize font
- [ ] Using vuex state
- [ ] Templates and slots
- [ ] Color set
- [ ] Feedbacks on select items / rows
- [ ] Running state machine
- [ ] Create other demos
- [ ] Resize two options node
- [ ] two or more options like switch case


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```


### Compiles as component
```
yarn build-bundle
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### License
Copyright (c) 2020-present Bruno Meurer

[MIT License](./LICENSE)