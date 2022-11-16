<template>
  <el-dialog
    :visible.sync="visible"
    :close-on-click-modal="false"
    :title="type === 'create' ? '创建' : '编辑'"
    width="700px"
    @close="resetForm"
  >
    <!-- 表单 -->
    <el-form
      ref="form"
      v-loading="itemLoading"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      size="medium"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="formData.username" />
        <div class="formTips"><i class="icon el-icon-info" />这是一条提示</div>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formData.mobile" />
      </el-form-item>
    </el-form>

    <!-- footer -->
    <div slot="footer">
      <el-button size="medium" @click="visible = false">取 消</el-button>
      <template v-if="type === 'create'">
        <el-button size="medium" type="primary" :loading="submitLoading" @click="submitForm">创 建</el-button>
      </template>
      <template v-if="type === 'update'">
        <el-button size="medium" type="primary" :loading="submitLoading" @click="submitForm">保 存</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import { fetchItem, createItem, updateItem } from '@/api/example/list'

export default {
  name: 'Editor',
  data() {
    return {
      visible: false,
      type: 'create', // create 创建， update 编辑
      formData: this.defaultForm(),
      formRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ]
      },
      submitLoading: false,
      itemLoading: false
    }
  },
  methods: {
    // 显示弹窗
    async showDialog(item) {
      if (item) {
        this.type = 'update'
        const itemData = await this.getItem(item.id)
        const formData = {}
        for (const key in this.formData) {
          formData[key] = itemData[key]
        }
        this.formData = formData
      } else {
        this.type = 'create'
      }
      this.visible = true
    },
    // 处理 input 为空的情况
    handleInputBlur(key, value) {
      if (!value) {
        this.formData[key] = 0
      }
    },
    // 重置表单
    resetForm() {
      this.formData = this.defaultForm()
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    // 默认表单
    defaultForm() {
      return {
        title: '',
        free_amount: 0,
        is_free: 0,
        type: 1,
        once_amount: 0,
        unit: 0,
        base_amount: 0,
        second_amount: 0
      }
    },
    // 提交表单
    submitForm() {
      if (this.submitLoading) { return }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.type === 'create') {
            this.handleCreate()
          } else {
            this.handleUpdate()
          }
        }
      })
    },
    // 创建
    async handleCreate() {
      this.submitLoading = true
      try {
        await createItem(this.formData)
        this.visible = false
        this.$emit('change')
        this.$message.success('创建成功')
      } catch (error) {
        console.log(error)
      } finally {
        this.submitLoading = false
      }
    },
    // 更新
    async handleUpdate() {
      this.submitLoading = true
      try {
        await updateItem(this.formData.id, this.formData)
        this.visible = false
        this.$emit('change')
        this.$message.success('保存成功')
      } catch (error) {
        console.log(error)
      } finally {
        this.submitLoading = false
      }
    },
    // 获取单个详情
    async getItem(id) {
      this.itemLoading = true
      try {
        return await fetchItem(id)
      } catch (error) {
        console.log(error)
      } finally {
        this.itemLoading = false
      }
    }
  }
}
</script>

<style scoped>
  .formTips { margin-top: 5px; line-height: 1.5; font-size: 12px; color: #909399; }
  .formTips .icon { margin-right: 4px; }
</style>
