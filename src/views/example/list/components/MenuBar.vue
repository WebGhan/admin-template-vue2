<template>
  <div class="g-filter-container">
    <el-form inline label-suffix=":" size="mini" @submit.native.prevent>
      <el-form-item label="状态">
        <el-select v-model="filterForm.status" clearable style="width: 100px;">
          <el-option v-for="item in statusOptions" :key="item.value" :value="item.value" :label="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="filterForm.nickname" clearable @keyup.enter.native="handleFilter" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="filterForm.mobile" clearable @keyup.enter.native="handleFilter" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" :loading="filterLoading" @click="handleFilter">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-plus" type="primary" @click="handleCreate">添加员工</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce'

export default {
  name: 'MenuBar',
  props: {
    filterLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      filterForm: {
        nickname: '',
        mobile: '',
        status: ''
      },
      statusOptions: [
        { name: '正常', value: '1' },
        { name: '锁定', value: '2' },
        { name: '离职', value: '0' }
      ]
    }
  },
  methods: {
    // 搜索
    handleFilter: debounce(500, true, function() {
      this.$emit('filter', this.filterForm)
    }),
    // 创建
    handleCreate() {
      this.$emit('create')
    }
  }
}
</script>
