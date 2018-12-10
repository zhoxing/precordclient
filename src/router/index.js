import Vue from 'vue'
import Router from 'vue-router'
// import App from '@/App'
import Login from '@/components/Login'
import Index from '@/components/Index'
import GoalManage from '@/components/GoalManage'
import AddGoal from '@/components/AddGoal'
import AddStage from '@/components/AddStage'
import EditGoal from '@/components/EditGoal'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', component: Login},
    { path: '/login', component: Login },
    { path: '/index', component: Index },
    { path: '/manage001', component: GoalManage },
    { path: '/addGoal', component: AddGoal },
    { path: '/editGoal', name: 'editGoal', component: EditGoal },
    { path: '/addStage', component: AddStage }
  ]
})
