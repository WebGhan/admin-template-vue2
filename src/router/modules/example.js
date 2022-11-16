import Layout from '@/layout'

const ExampleRouter = {
  name: 'Example',
  path: '/example',
  redirect: '/example/list',
  component: Layout,
  meta: {
    title: '示例',
    icon: 'el-icon-user'
  },
  children: [
    {
      path: 'list',
      name: 'ExampleList',
      component: () => import('@/views/example/list'),
      meta: { title: '列表示例', keepAlive: true }
    }
  ]
}

export default ExampleRouter
