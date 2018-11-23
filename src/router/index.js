import Vue from 'vue'
import Router from 'vue-router'
import AddStage from '@/components/AddStage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AddStage',
      component: AddStage
    }
  ]
})
