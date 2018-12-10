<template>
    <div id="editGoal">
      <el-container>
        <el-header>
          <img :src="require('../../static/images/header001.jpg')" width="100%" height="100%"/>
        </el-header>
        <el-main>
          <div class="add">
          <el-row>
            <el-col :span="24" class="title">编辑目标</el-col>
          </el-row>
          <el-form :model="goalForm" :rules="rules" ref="goalForm" label-width="120px" >
            <el-form-item label="目标名称" prop="goalName">
              <el-input v-model="goalForm.goalName" disabled></el-input>
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
                <el-option label="已暂停" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设定日期" prop="setDate">
              <el-input v-model="goalForm.setDate" disabled></el-input>
            </el-form-item>
            <el-form-item label="预计完成日期" prop="preDate">
              <el-date-picker type="date" format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd" placeholder="选择日期" v-model="goalForm.preDate" style="width:100%"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('goalForm')">完成</el-button>
              <el-button @click="$router.back(-1)">返回</el-button>
            </el-form-item>
          </el-form>
          </div>
        </el-main>
      </el-container>
    </div>
</template>

<script>
export default {
  name: 'EditGoal',
  data () {
    const checkPreDate = (rule, value, callback) => {
      const dateMat = new Date(this.$route.query.setDate * 1)
      const setyear = dateMat.getFullYear()
      const setmonth = dateMat.getMonth() + 1
      const setday = dateMat.getDate()
      const pre = value.split('-')
      if (!value) {
        return callback(new Error('请选择预计完成日期'))
      }
      if (pre[0] < setyear) {
        return callback(new Error('预计完成日期不能小于设定日期'))
      } else {
        if (pre[1] < setmonth) {
          return callback(new Error('预计完成日期不能小于设定日期'))
        } else {
          if (pre[2] < setday) {
            return callback(new Error('预计完成日期不能小于设定日期'))
          }
        }
      }
      callback()
    }
    return {
      goalForm: {
        goalNum: this.$route.query.goalNum,
        goalName: this.$route.query.goalName,
        goalLevel: this.$route.query.goalLevel,
        completeStatus: this.$route.query.completeStatus,
        setDate: null,
        preDate: null
      },
      rules: {
        goalLevel: [
          { required: true, message: '请选择目标级别', trigger: 'change' }
        ],
        completeStatus: [
          { required: true, message: '请选择完成状态', trigger: 'change' }
        ],
        preDate: [
          { required: true, validator: checkPreDate, trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    if (this.$route.query.preDate != null) {
      const dateMat = new Date(this.$route.query.preDate * 1)
      const year = dateMat.getFullYear()
      const month = dateMat.getMonth() + 1
      const day = dateMat.getDate().length === 1 ? '0' + dateMat.getDate() : dateMat.getDate()
      this.goalForm.preDate = year + '-' + month + (day.toString().length === 1 ? ('-0' + day) : ('-' + day))
    }
    if (this.$route.query.setDate != null) {
      const dateMat = new Date(this.$route.query.setDate * 1)
      const year = dateMat.getFullYear()
      const month = dateMat.getMonth() + 1
      const day = dateMat.getDate()
      this.goalForm.setDate = year + '-' + month + (day.toString().length === 1 ? ('-0' + day) : ('-' + day))
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/personalGoals/editGoal',
            params: {
              goalForm: this.goalForm
            }
          }).then((response) => {
            if (response.data.flag === 'success') {
              this.$message({
                message: '目标修改成功!',
                type: 'success'
              })
              this.$router.push({path: '/manage001'})
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
    }
  }
}
</script>

<style >
.add{
  padding: 20px;
  border: 1px solid #B3C0D1;
  width: 40%;
  margin-left: 30%;
  background-color: #b6d4e2;
}

.title{
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
}

.el-header {
  background-color: #B3C0D1;
  color: #3d8380;
  text-align: center;
  min-height: 100px;
  font-size: large;
  font-weight: bold;
  padding: 0;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  height: 500px;
}
  .el-form-item__content{
    text-align: left;
  }
  .el-select{
    width: 100%;
  }
</style>
