<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <div>
          <h2>主人信息</h2>
          <p>用户名:</p>
          <span>{{nickName}}</span>
          <p>参与时间:</p>
          <span>{{createTime}}</span>
          <p>消息:</p>
          <span>{{message}}</span>
        </div>
      </el-aside>
      <el-container>
        <el-header>
            主人,您来了!今天也是美好的一天哦!请继续努力!
        </el-header>
        <el-main>
            <ul>
              <li v-for="module in queryModuleList" :key="module.modIdd"
                  style="list-style-type: none;width: 30%;height:100px;float: left;margin-bottom: 170px;margin-right: 10px;">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img :src="require('../../static/images/img'+module.modIdd+'.jpg')" class="image" >
                <div style="padding: 14px;">
                  <span>{{module.modName}}</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="enter(module.modIdd)">进入</el-button>
                </div>
                <div class="text item">
                  {{module.wisdom}}
                </div>
              </el-card>
              </li>
            </ul>
        </el-main>
        <el-footer>开发人员:小星星  开发时间:2018年11月19日</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      show: true,
      msg: '首页',
      nickName: this.$route.query.nickName,
      createTime: this.$route.query.createTime,
      message: '您有三个未读消息',
      queryModuleList: []
    }
  },
  mounted: function () {
    // this.$nextTick(function () {})
    this.$axios({
      method: 'post',
      url: '/personalGoals/index'
    }).then((response) => {
      if (response.data.flag === 'success') {
        this.queryModuleList = response.data.queryModuleList
      }
    }).catch((err) => {
      this.$message.error(err)
    })
  },
  methods: {
    enter (key) {
      this.$router.push({path: '/manage' + key, query: {modIdd: key}})
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.image{
  height: 120px;
  width: 350px;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #3d8380;
  text-align: center;
  line-height: 60px;
  font-size: large;
  font-weight: bold;
}

.el-aside {
  background-color: #D3DCE6;
  color: #3d8380;
  text-align: center;
  min-height: 600px;
  line-height: 30px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
