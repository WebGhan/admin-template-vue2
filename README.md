# 后台项目模版

## 规范

请严格遵守[《项目规范》](https://webghan.github.io/gaohan-note/guide/style-guide.html)


## 运行和发布

### 运行
```bash
# 运行测试环境
npm run dev

# 运行本地环境
npm run dev:local
```

如果是需要接入其他后端服务，例如自己本地运行的后端服务，则添加`.env.local`环境文件，文件内容如下：
```
NODE_ENV = development

# just a flag
ENV = 'local'

# base api
VUE_APP_BASE_API = '/major/v1'

# proxy target
PROXY_TARGET = 'http://localhost:3000'
```


### 发布
```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```


### 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```


## 生产环境的依赖

```json
"dependencies": {
  "axios": "0.18.1",             // 一个基于 promise 的 HTTP 库。
  "big.js": "^6.0.3",            // 提供高精度计算的轻量级 js 库，解决 0.1 + 0.2 ≠ 0.3 等问题；作者还有另外两个库 bignumber.js 和 decimal.js 用来应付更多情况。
  "core-js": "3.6.5",            // 提供了 es5、es6 的 polyfills 用来提高对低版本浏览器的兼容性。
  "dayjs": "^1.10.4",            // 用来处理日期的 js 库，比 Moment.js 更轻量级。
  "echarts": "^5.1.1",           // 一个基于 JavaScript 的开源可视化图表库。
  "element-ui": "2.13.2",
  "js-cookie": "2.2.0",          // 一个处理 cookies 的轻量级 js 库。
  "normalize.css": "7.0.0",      // 样式重置。
  "nprogress": "0.2.0",          // 页面加载进度条组件。
  "path-to-regexp": "2.4.0",     // 将字符串路径转换为正则表达式。
  "throttle-debounce": "^3.0.1", // 节流和防抖。
  "vue": "2.6.10",
  "vue-echarts": "^6.0.0-rc.4",  // echarts 的 vue.js 组件。
  "vue-grid-layout": "^2.3.12",  // 一个适用于 Vue.js 的栅格布局系统。
  "vue-router": "3.0.6",
  "vuex": "3.1.0"
}
```


## icons

### 单色图标

图标在 iconfont.com 中统一管理，单色图标通过 font-class 引用，只使用 .ttf 字体。

```
src/
|- icons/
   |- iconfont/
      |- iconfont.css
      |- iconfont.ttf
```

iconfont.css 文件里的`@font-face`请用如下代码替换。

```css
@font-face {
  font-family: "iconfont";
  src: url('iconfont.ttf') format('truetype');
}
```


### 多色图标

多色图标参考：https://panjiachen.github.io/vue-element-admin-site/zh/guide/advanced/icon.html


### 图片？还是图标？

iconfont.com 项目中的图标才视作图标，其余视作图片，图片需放在`src/assets/images`目录下。


## echarts 图表

文档：
- echarts: https://echarts.apache.org/zh/index.html
- vue-echarts: https://github.com/ecomfe/vue-echarts

echarts 包体积巨大，所以我们按需引入组件。

所有支持的渲染器/图表/组件 https://github.com/apache/echarts/blob/master/src/echarts.all.ts

```js
// src/utils/echarts.js

use([
  BarChart,
  CanvasRenderer,
  GridComponent,
  LegendComponent,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent
])
```

`echarts`已经注册到全局组件中了，直接使用即可。

```html
<v-chart class="chart" :option="option" />
```


## 通用组件文档

查看[《通用组件文档》](./doc/通用组件文档.md)


## 权限验证

参考：[vue-element-admin 指南](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/permission.html)

建议使用全局权限判断函数：

```vue
<template>
  <el-tab-pane v-if="checkPermission(['admin'])" label="Admin">Admin can see this</el-tab-pane>
  <el-tab-pane v-if="checkPermission(['editor'])" label="Editor">Editor can see this</el-tab-pane>
  <el-tab-pane v-if="checkPermission(['admin','editor'])" label="Admin-OR-Editor">Both admin or editor can see this</el-tab-pane>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数

export default{
  methods: {
    checkPermission
  }
}
</script>
```


## vue-admin-template

本项目基于 vue-admin-template 搭建，更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)
