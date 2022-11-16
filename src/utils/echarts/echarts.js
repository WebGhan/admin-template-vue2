import ECharts from 'vue-echarts'
import { use, registerTheme } from 'echarts/core'
// import 'echarts'

// 手动引入 ECharts 各模块来减小打包体积
// 所有支持的渲染器/图表/组件 https://github.com/apache/echarts/blob/master/src/echarts.all.ts
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart,
  LineChart,
  MapChart,
  PieChart,
  ScatterChart,
  EffectScatterChart
} from 'echarts/charts'
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  ParallelComponent,
  ToolboxComponent,
  TimelineComponent,
  MarkPointComponent,
  GeoComponent
} from 'echarts/components'

// 主题
import walden from './theme/walden.json'
registerTheme('walden', walden)

use([
  BarChart,
  CanvasRenderer,
  LineChart,
  MapChart,
  PieChart,
  ScatterChart,
  EffectScatterChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  ParallelComponent,
  ToolboxComponent,
  TimelineComponent,
  MarkPointComponent,
  GeoComponent
])

export default ECharts
