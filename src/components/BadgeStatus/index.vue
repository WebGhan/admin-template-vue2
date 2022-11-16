<template>
  <span class="g-badge-status">
    <span class="g-badge-status-dot" :class="classObject" />
    <span v-if="text" class="g-badge-status-text">{{ text }}</span>
  </span>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    status: {
      type: String,
      default: 'default'
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    classObject() {
      return {
        'ant-badge-status-default': !this.status || this.status === 'default',
        'ant-badge-status-processing': this.status === 'processing',
        'ant-badge-status-success': this.status === 'success',
        'ant-badge-status-warning': this.status === 'warning',
        'ant-badge-status-error': this.status === 'error'
      }
    }
  }
}
</script>

<style>
.g-badge-status { line-height: inherit; vertical-align: baseline; }
.g-badge-status-text { margin-left: 8px; }
.g-badge-status-dot { display: inline-block; position: relative; top: -1px; width: 6px; height: 6px; vertical-align: middle; border-radius: 50%; }
.g-badge-status-dot.ant-badge-status-default { background-color: #c0c4cc; }
.g-badge-status-dot.ant-badge-status-processing { background-color: #409eff; }
.g-badge-status-dot.ant-badge-status-processing::after { content: ""; position: absolute; left: 0; top: 0; width: 100%; height: 100%; border: 1px solid #409eff; border-radius: 50%; animation: gStatusProcessing 1.2s ease-in-out infinite; }
.g-badge-status-dot.ant-badge-status-success { background-color: #67c23a; }
.g-badge-status-dot.ant-badge-status-warning { background-color: #e6a23c; }
.g-badge-status-dot.ant-badge-status-error { background-color: #f56c6c; }
@keyframes gStatusProcessing {
  0% { transform: scale(.8); opacity: .5 }
  to { transform: scale(2.4); opacity: 0 }
}
</style>
