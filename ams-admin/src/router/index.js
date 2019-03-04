import Vue from 'vue'
import Router from 'vue-router'
// import Using from '@/components/Equipment/using'
import Unused from '@/components/Equipment/unused'
import Abandon from '@/components/Equipment/abandon'
import Export from '@/components/common/export.vue'
import Tabs from '@/components/common/tabs.vue'
import Econfig from '@/components/Econfig/Econfig.vue'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tabs',
      component: Tabs
    },
    {
      path: '/config',
      name: 'Econfig',
      component: Econfig
    },
    {
      path: '/unused',
      name: 'unused',
      component: Unused
    },
    {
      path: '/abandon',
      name: 'abandon',
      component: Abandon
    },
    {
      path: '/export',
      name: 'exportQR',
      component: Export
    }
  ]
})

Vue.use(Router)
