<template>
    <div id="addGoal">
      <el-container>
        <el-main class="goalMain">
          <div class="add">
          <el-row>
            <el-col :span="24" class="title">新建目标</el-col>
          </el-row>
          <el-form :model="goalForm" :rules="rules" ref="goalForm" label-width="120px" >
            <el-form-item label="目标名称" prop="goalName">
              <el-input v-model="goalForm.goalName"></el-input>
            </el-form-item>
            <el-form-item label="目标级别" prop="goalLevel">
              <el-select v-model="goalForm.goalLevel" placeholder="请选择级别">
                <el-option label="重要" value="1"></el-option>
                <el-option label="一般" value="2"></el-option>
                <el-option label="较小" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="完成状态" prop="completeStatus">
              <el-select v-model="goalForm.completeStatus" placeholder="请选择状态">
                <el-option label="未开始" value="1"></el-option>
                <el-option label="进行中" value="2"></el-option>
                <el-option label="已完成" value="3"></el-option>
                <!--<el-option label="已暂停" value="4"></el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item label="设定日期" prop="setDate">
              <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" :picker-options="pickerOptions"
                              value-format="yyyy-MM-dd" placeholder="选择日期" v-model="goalForm.setDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="预计完成日期" prop="preDate">
              <el-date-picker type="date" format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd" placeholder="选择日期" v-model="goalForm.preDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('goalForm')">下一步</el-button>
              <el-button @click="resetForm('goalForm')">重置</el-button>
              <el-button @click="returnNav">返回</el-button>
            </el-form-item>
          </el-form>
          </div>
        </el-main>
      </el-container>
    </div>
</template>

<script>
export default {
  name: 'AddGoal',
  props: ['name'],
  data () {
    const checkSetDate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择设定日期'))
      } else if (value > this.goalForm.preDate) {
        return callback(new Error('设定日期不能大于预计完成日期'))
      } else {
        callback()
      }
    }
    const checkPreDate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择预计完成日期'))
      } else if (value < this.goalForm.setDate) {
        return callback(new Error('预计完成日期不能小于设定日期'))
      } else {
        callback()
      }
    }
    return {
      goalForm: {
        goalName: '',
        goalLevel: '',
        completeStatus: '',
        setDate: null,
        preDate: null
      },
      rules: {
        goalName: [
          { required: true, message: '请输入目标名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
        ],
        goalLevel: [
          { required: true, message: '请选择目标级别', trigger: 'change' }
        ],
        completeStatus: [
          { required: true, message: '请选择完成状态', trigger: 'change' }
        ],
        setDate: [
          { required: true, validator: checkSetDate, trigger: 'change' }
        ],
        preDate: [
          { required: true, validator: checkPreDate, trigger: 'change' }
        ]
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/personalGoals/addGoal',
            params: {
              goalForm: this.goalForm
            }
          }).then((response) => {
            if (response.data.flag === 'success') {
              this.$message({
                message: '目标成功添加,继续下一步阶段设置!',
                type: 'success'
              })
              this.$router.push({path: '/addStage', query: {goalNum: response.data.goalNum, nickName: this.$route.params.name}})
            }
          }).catch((err) => {
            this.$message.error(err)
          })
        } else {
          this.$message.error('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    returnNav () {
      this.$router.push({path: '/nav', name: 'nav', params: {modIdd: '001', nickName: this.$route.params.name}})
    }
  }
}
</script>

<style scoped>
.add{
  padding: 20px;
  border: 1px solid #282e35;
  width: 40%;
  margin-left: 30%;
  color: #ffffff;
  background-color: #869a9673;
}

.title{
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
}

.goalMain {
  color: #333;
  text-align: center;
  height: 600px;
  background: url('../../static/images/dong1.gif')  no-repeat;
  background-size:100% 100%;
}

.el-select{
  width: 100%;
}
</style>
