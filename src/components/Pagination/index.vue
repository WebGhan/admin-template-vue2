<template>
  <div v-show="total" class="g-pagination">
    <el-pagination
      :total="total"
      :page-sizes="[10, 20, 30, 50, 100]"
      :page-size="pageSize"
      :current-page="currentPage"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="currentChange"
      @size-change="sizeChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    pageSize: {
      type: Number,
      default: 20
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    currentChange(e) {
      this.$emit('update:currentPage', e)
      this.$emit('change')
    },
    sizeChange(e) {
      this.$emit('update:pageSize', e)
      this.$emit('change')
    }
  }
}
</script>

<style>
.g-pagination { flex-shrink: 0; margin-top: 10px; }
</style>
