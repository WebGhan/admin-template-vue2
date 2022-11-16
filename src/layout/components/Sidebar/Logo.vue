<template>
  <div class="sidebar-logo-container" :class="{ 'collapse': collapse }">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <div class="logo-box">
          <img class="logo" src="@/assets/images/logo-2-mini.png" alt="logo">
        </div>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <div class="logo-box">
          <img class="logo-large" src="@/assets/images/logo-2.png" alt="logo">
        </div>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

// transition
.sidebarLogoFade-enter-active { transition: opacity 1s; }
.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to { opacity: 0; }

// sidebar-logo
.sidebar-logo-container { position: relative; width: 100%; height: 50px; line-height: 50px; text-align: center; background: $menuBg; overflow: hidden;
  .logo-box { display: flex; align-items: center; justify-content: center; position: relative; height: 50px;
    .logo { width: 80%; height: auto; }
    .logo-large { display: block; height: 32px; }
  }
  .sidebar-logo-link { width: 100%; height: 100%; }
}
</style>
