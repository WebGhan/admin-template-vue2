<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.startsWith('el-icon')) {
        vnodes.push(<i class={[icon, 'menu-icon']} />)
      } else if (icon.startsWith('icon-')) {
        vnodes.push(<i class={[icon, 'iconfont menu-icon']} />)
      }
    }

    if (title) {
      vnodes.push(<span slot='title' class='menu-title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
  .menu-icon { display: inline-block; margin-right: 5px; width: 24px; text-align: center; font-size: 18px; vertical-align: middle; }
  .menu-title { margin-left: 6px; }
</style>
