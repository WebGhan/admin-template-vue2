<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown v-if="user" class="avatar-container" trigger="click" size="medium">
        <div class="avatar-wrapper">
          <img src="@/assets/images/avatar.jpg" class="user-avatar">
          <span>{{ user.nickname || user.username }}</span>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item icon="el-icon-house">首页</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided icon="el-icon-switch-button" @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    user() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar { position: relative; height: 50px; background: #fff; box-shadow: 0 1px 4px rgba(0,21,41,.08); overflow: hidden;
  .hamburger-container { float: left; height: 100%; line-height: 46px; cursor: pointer; transition: background .3s; -webkit-tap-highlight-color: transparent;
    &:hover { background: rgba(0, 0, 0, .025) }
  }
  .breadcrumb-container { float: left; }
  .right-menu { float: right; height: 100%; line-height: 50px;
    &:focus { outline: none; }
    .right-menu-item { display: inline-block; padding: 0 8px; height: 100%; font-size: 18px; color: #5a5e66; vertical-align: text-bottom;
      &.hover-effect { cursor: pointer; transition: background .3s;
        &:hover { background: rgba(0, 0, 0, .025); }
      }
    }
    .avatar-container { margin-right: 15px;
      .avatar-wrapper { display: flex; align-items: center; position: relative; padding: 0 15px; transition: background .3s; cursor: pointer;
        &:hover { background: #f7f7f7; }
        .user-avatar { flex-shrink: 0; margin-right: 8px; width: 24px; height: 24px; border-radius: 100%; }
      }
    }
  }
}
</style>
