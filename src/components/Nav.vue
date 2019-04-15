<template>
  <div id="nav">
    <el-container>
      <el-aside width="200px">
        <Menu :nickName="nickName" :menuId="modIdd" @modIdd="listenToMenu"></Menu>
      </el-aside>
      <el-container>
        <el-header>
          <p v-if="modIdd === '001'">小标提醒:当前还有<span>{{count}}</span>个目标没有完成哦!我还是不是你最爱的宝宝了||_||</p>
          <p v-else-if="modIdd === '002'">小段提醒:当前还有<span>{{count}}</span>个阶段没有实现哦!我还是不是你最爱的宝宝了||_||</p>
          <p v-else-if="modIdd === '004'">小愿提醒:当前还有<span>{{count}}</span>个愿望没有实现哦!我还是不是你最爱的宝宝了||_||</p>
        </el-header>
        <el-main>
          <GoalManage :nickName="nickName" @count="listenToChild" v-if="modIdd === '001'"></GoalManage>
          <StageManage :nickName="nickName" @count="listenToChild" v-if="modIdd === '002'"></StageManage>
          <WishManage :nickName="nickName" @count="listenToChild" v-if="modIdd === '004'"></WishManage>
          <WisdomManage :nickName="nickName" @count="listenToChild" v-if="modIdd === '005'"></WisdomManage>
        </el-main>
        <el-footer>开发人员:小星星  开发时间:2018年11月19日</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import WishManage from '@/components/WishManage'
import GoalManage from '@/components/GoalManage'
import StageManage from '@/components/StageManage'
import WisdomManage from '@/components/WisdomManage'
export default {
  name: 'Nav',
  components: {Menu, WishManage, GoalManage, StageManage, WisdomManage},
  data () {
    return {
      nickName: this.$route.params.nickName,
      headMsg: '',
      modIdd: this.$route.params.modIdd,
      count: 0
    }
  },
  methods: {
    listenToMenu: function (modIdd) {
      this.modIdd = modIdd
      console.log('nav' + modIdd)
    },
    listenToChild: function (count) {
      this.count = count
    }
  }
}
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #2bbfa4;
    color: #3d8380;
    text-align: center;
    line-height: 60px;
    font-size: large;
    font-weight: bold;
  }

  .el-main {
    background-color: #8ee0be;
    color: #333;
    text-align: center;
    /* height: 500px;*/

  }
  .el-aside {
    background-color: #2bbfa4;
    color: #3d8380;
    text-align: center;
    min-height: 600px;
    line-height: 30px;
  }
  p{
    margin: auto;
  }
</style>
