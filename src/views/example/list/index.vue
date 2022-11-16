<template>
  <div class="g-app-container-flex">
    <!-- 菜单栏 -->
    <MenuBar class="menu-bar" :filter-loading="listLoading" @filter="handleFilter" @create="showEditor(false)" />

    <!-- 列表 -->
    <el-table
      ref="table"
      v-loading="listLoading"
      :data="list"
      size="medium"
      height="auto"
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" width="100" />
      <el-table-column label="账号" prop="work_account" width="200" />
      <el-table-column label="姓名" prop="nickname" width="150" />
      <el-table-column label="手机号" prop="mobile" width="150" />

      <el-table-column label="职位" prop="post" width="200">
        <template slot-scope="scope">
          {{ scope.row.post || '-' }}
        </template>
      </el-table-column>

      <el-table-column label="状态" prop="status" width="100">
        <template slot-scope="scope">
          <BadgeStatus :status="scope.row.statusName.value" :text="scope.row.statusName.name" />
        </template>
      </el-table-column>

      <el-table-column label="站点" prop="status" width="200">
        <template slot-scope="scope">
          <el-tag
            v-for="item in scope.row.tenants"
            :key="item.id"
            size="mini"
            type="primary"
            disable-transitions
            class="g-table-tag"
          >
            {{ item.title }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" prop="created_at" width="180" />
      <el-table-column label="更新时间" prop="updated_at" width="180" />

      <el-table-column label="操作" min-width="160" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showEditor(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" :loading="deleteLoading === scope.row.id" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 列表分页 -->
    <Pagination
      :total="listTotal"
      :page-size.sync="listQuery.limit"
      :current-page.sync="listQuery.page"
      @change="pageChange"
    />

    <!-- 编辑 -->
    <Editor ref="editor" @change="getList" />
  </div>
</template>

<script>
import { fetchList, deleteItem } from '@/api/example/list'
import { Editor, MenuBar } from './components'
import { BadgeStatus, Pagination } from '@/components'

export default {
  name: 'UserList',
  components: {
    BadgeStatus,
    Editor,
    MenuBar,
    Pagination
  },
  data() {
    return {
      list: [],
      listLoading: false,
      listTotal: 0,
      listQuery: {
        title: '',
        page: 1,
        limit: 20
      },
      deleteLoading: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 显示编辑
    showEditor(item) {
      this.$refs['editor'].showDialog(item)
    },
    // 获取列表
    async getList() {
      this.listLoading = true
      try {
        const res = await fetchList(this.listQuery)
        this.list = res.data.map(item => {
          item.statusName = this.handleStatus(item.status)
          return item
        })
        this.listTotal = res.meta.total
      } catch (error) {
        console.log(error)
      } finally {
        this.listLoading = false
      }
    },
    // 处理状态
    handleStatus(status) {
      if (status === 0) {
        return { value: 'default', name: '离职' }
      }
      if (status === 1) {
        return { value: 'processing', name: '正常' }
      }
      if (status === 2) {
        return { value: 'warning', name: '锁定' }
      }
    },
    // 修改分页
    pageChange() {
      this.getList()
      this.$refs.table.bodyWrapper.scrollTop = 0
    },
    // 处理筛选
    handleFilter(filterForm) {
      this.listQuery = { ...this.listQuery, ...filterForm }
      this.listQuery.page = 1
      this.getList()
      this.$refs.table.bodyWrapper.scrollTop = 0
    },
    // 处理删除
    async handleDelete(id) {
      if (this.deleteLoading) { return }
      try {
        const confirm = await this.$confirm('确定要删除吗?', '提示', { type: 'warning' })
        if (confirm !== 'confirm') { return }
        await deleteItem(id)
        this.getList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      } finally {
        this.deleteLoading = 0
      }
    }
  }
}
</script>
