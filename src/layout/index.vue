<template>
  <div>
    <div class="navbar1" style="display: flex;align-items: center;">
      <div style="width:210px;">
        <span style="margin-left:51px;color:#fff">极乐研发云</span>
      </div>
      <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="dashboard">首页</el-menu-item>
          <el-menu-item index="product">产品运营</el-menu-item>
          <el-menu-item index="develop">研发交付</el-menu-item>
          <el-menu-item index="resource">资源中心</el-menu-item>
          <el-menu-item index="eventbox">事件中心</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div :class="classObj" class="app-wrapper">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <navbar />
        </div>
        <app-main />
        <right-panel v-if="showSettings">
          <settings />
        </right-panel>
      </div>
    </div>
  </div>

</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar
  },
  mixins: [ResizeMixin],
  data() {
    return {
      activeIndex: 'dashboard'
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    handleSelect(v) {
      switch (v) {
        case 'dashboard':
          this.$router.push({ path: '/dashboard' })
          break
        case 'product':
          break
        case 'develop':
          break
        case 'resource':
          break
        case 'eventbox':
          break
        default:
          break
      }
      console.log(v)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }
  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }
  .mobile .fixed-header {
    width: 100%;
  }

  .navbar1 {
    background-color: #444681;
  }

  .navbar1 ::v-deep .el-menu.el-menu--horizontal {
  border-bottom: 0;
  background-color: transparent;
}

 .navbar1 ::v-deep .el-menu--horizontal > .el-menu-item {
   color: #fff;
   background-color: transparent;
 }

 .navbar1 ::v-deep .el-menu--horizontal > .el-menu-item {
   border-bottom: 4px solid #fff;
 }

</style>
