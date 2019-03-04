<template>
<div id="app" class="app">
    <el-row>
        <Top class="not-print"></Top>
    </el-row>
    <div class="main-wrap">
        <el-container>
            <el-aside class="not-print" style="width:140px;">
                <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#041a33" text-color="#fff" active-text-color="#ffd04b" :collapse="false" router>
                    <el-menu-item index="/">
                        <i class="el-icon-menu"></i>
                        <span slot="title">资产列表</span>
                    </el-menu-item>
                    <el-menu-item index="/config">
                        <i class="el-icon-menu"></i>
                        <span slot="title">资产设置</span>
                    </el-menu-item>
                </el-menu>

            </el-aside>
            <el-main>
                <div class="sider-way">
                    <router-view/>
                </div>
            </el-main>
        </el-container>

    </div>

</div>
</template>

<script>
import header from './components/common/header'
import footer from './components/common/footer'
import tabs from './components/common/tabs'
export default {
  name: 'app',
  components: {
    Top: header,
    Bottom: footer,
    Tabs: tabs
  },
  data () {
    return {
      isCollapse: true
    }
  }
}
</script>

<style lang="scss">
body {
    background-color: #2c3e50;
    .app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        max-width: 1600px;
        margin: 0 auto;
    }
}

@media print {
    .not-print {
        opacity: 0;
        height: 0 !important;
        display: none;
    }
}

.el-menu-vertical-demo {}

.not-print {
    margin-bottom: 20px
}

.el-menu {
    border-right: 0;
}

.main-wrap {
    display: flex;
    width: 100%;
    margin: 0 auto;
    flex-direction: row;
}

.sider-way {
    flex: 1;
}

.el-card__body {
    padding: 0 !important;
}

.el-main {
    padding: 0 !important
}
</style>
