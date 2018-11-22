<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <div>
          <h2>主人信息</h2>
          <p>用户名:</p>
          <p>参与时间:</p>
          <p>消息:</p>
        </div>
      </el-aside>
      <el-container>
        <el-header>
            主人,您来了!今天也是美好的一天哦!请继续努力!
        </el-header>
        <el-main>
          <el-row>
            <el-col :span="8" >
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img src="../../static/images/if.jpg" class="image" >
                <div style="padding: 14px;">
                  <span>目标管理</span>
                  <el-button style="float: right; padding: 3px 0" type="text">进入</el-button>
                </div>
                <div class="text item">
                  我们命定的目标和道路，不是享乐，也不是受苦；而是行动，在每个明天，都要比今天前进一步。——朗费罗<br>
                  如果你想要快乐，设定一个目标，这个目标要能指挥你的思想，释放你的能量，激发你的希望。——安德鲁•卡耐基
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" >
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img src="../../static/images/dance.jpg" class="image">
                <div style="padding: 14px;">
                  <span>愿望清单管理</span>
                  <el-button style="float: right; padding: 3px 0" type="text">进入</el-button>
                </div>
                <div class="text item">
                  人类的心理统统就是这样，而且，似乎永远是这样；愈是得不到手的东西，就愈是想得到它，而且在实现这一愿望的过程中所遇到的困难愈大，奋斗的意志就愈是坚强。 —— 乔万尼奥里<br>
                  光有知识是不够的，还应当运用；光有愿望是不够的，还应当行动。 —— 歌德
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
        <el-footer>Footer</el-footer>
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
      msg: '首页'
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
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
  width: 450px;
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
