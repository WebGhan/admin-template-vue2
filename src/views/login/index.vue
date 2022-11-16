<template>
  <div class="m-login-container">
    <div class="header">
      <img class="logo" src="@/assets/images/logo-login.png">
      <div class="admonition">只争朝夕 不负韶华</div>
    </div>

    <div class="body">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="from">
        <el-form-item prop="username">
          <el-input v-model.trim="loginForm.username" prefix-icon="el-icon-user" placeholder="账号" @keyup.enter.native="handleLogin" />
        </el-form-item>
        <el-form-item prop="password" class="password">
          <el-input ref="password" v-model.trim="loginForm.password" prefix-icon="el-icon-lock" placeholder="密码" :type="passwordType" @keyup.enter.native="handleLogin" />
          <div class="show-pwd" @click="showPwd">
            <i v-show="passwordType === 'password'" class="iconfont icon-eye-close" />
            <i v-show="passwordType === ''" class="iconfont icon-eye" />
          </div>
        </el-form-item>
        <el-button type="primary" class="btn" :loading="formLoading" @click.native.prevent="handleLogin">登 录</el-button>
      </el-form>
    </div>

    <div class="footer">
      <div class="copy-right">Copyright &copy; {{ curYear }} 利年冻品网</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const curYear = new Date().getFullYear()
    return {
      curYear,
      redirect: undefined,
      passwordType: 'password',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请填写账号' }],
        password: [{ required: true, trigger: 'blur', message: '请填写密码' }]
      },
      formLoading: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      if (this.formLoading) { return }
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          this.formLoading = true
          try {
            await this.$store.dispatch('user/login', this.loginForm)
            this.$router.push({ path: this.redirect || '/' })
          } finally {
            this.formLoading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.m-login-container {
  input:-webkit-autofill { box-shadow: 0 0 0 1000px #fff inset !important; }
  .password {
    input { padding-right: 30px; color: #303133; }
  }
}
</style>

<style lang="scss" scoped>
.m-login-container { display: flex; flex-direction: column; align-items: center; min-height: 100vh; background: #f7f7f7 url(~@/assets/images/login-bg.svg) center/100% no-repeat;
  .header { flex-shrink: 0; padding: 120px 0 50px; }
  .body { flex-shrink: 0; }
  .footer { flex-shrink: 0; margin-top: auto; padding: 100px 0 30px; }
  .logo { display: block; margin: 0 auto; width: 220px; height: auto; }
  .admonition { margin-top: 20px; text-align: center; font-size: 14px; color: #909399; }
  .from { width: 360px;
    .btn { width: 100%; }
  }
  .copy-right { text-align: center; font-size: 14px; color: #909399; }
  .show-pwd { position: absolute; top: 0; bottom: 0; right: 0; width: 30px; text-align: center; color: #909399; cursor: pointer;
    &:hover { color: #409EFF; }
  }
}
</style>
