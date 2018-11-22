import Vue from 'vue'
import Router from 'vue-router'
import RecordManage from '@/components/RecordManage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'RecordManage',
      component: RecordManage
    }
  ]
})
