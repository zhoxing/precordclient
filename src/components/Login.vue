<template>
  <div class="hello">
    <h1 @click="show = !show">{{ msg }}</h1>
    <div>
      <el-collapse-transition>

        <div v-show="show">
          <div class="transition-box">
            <el-form status-icon label-position="right"
                     :rules="rules"  validate-on-rule-change
                     ref="form" :model="form" label-width="80px">
              <el-form-item label="用户名" prop="userId">
                <el-input v-model="form.userId"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"  style="margin-left: -80px;" @click="onSubmit">登录</el-button>
              </el-form-item>
            </el-form>

          </div>
        </div>
      </el-collapse-transition>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      show: true,
      msg: '进入我的人生',
      form: {
        userId: '',
        password: ''
      },
      rules: {
        userId: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: ['blur', 'change']}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 1, max: 16, message: '长度在 0 到 16 个字符', trigger: ['blur', 'change']}
        ]
      }
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
h1, h2 {
  font-weight: normal;
  color: #32373c;
}

.transition-box {
  width: 30%;
  height: 230px;
  border-radius: 4px;
  background-color: #ffffff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-left: 35%;
  opacity:0.6;
}
.hello{
  background-image: url("../../static/images/life.jpg");
  background-repeat: no-repeat;
  -webkit-background-size: 100%;
  background-size: 100%;
  height: 550px;
  padding-top: 50px;
}
</style>
