import Vue from 'vue'
import Router from 'vue-router'
// import App from '@/App'
import Login from '@/components/Login'
import Index from '@/components/Index'
import GoalManage from '@/components/GoalManage'
import AddGoal from '@/components/AddGoal'
import AddStage from '@/components/AddStage'
import EditGoal from '@/components/EditGoal'
import WishManage from '@/components/WishManage'
import Nav from '@/components/Nav'
import StageManage from '@/components/StageManage'
import WisdomManage from '@/components/WisdomManage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', component: Login},
    { path: '/login', component: Login },
    { path: '/index', component: Index },
    { path: '/manage001', name: 'manage001', component: GoalManage },
    { path: '/manage002', name: 'manage002', component: StageManage },
    { path: '/manage004', name: 'manage004', component: WishManage },
    { path: '/manage005', name: 'manage005', component: WisdomManage },
    { path: '/addGoal', name: 'addGoal', component: AddGoal },
    { path: '/editGoal', name: 'editGoal', component: EditGoal },
    { path: '/addStage', component: AddStage },
    { path: '/nav', name: 'nav', component: Nav }
  ]
})
