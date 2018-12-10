<template>
    <div id="addStage">
      <el-container>
        <el-header>
          <img :src="require('../../static/images/header001.jpg')" width="100%" height="100%"/>
        </el-header>
        <el-main>
          <div class="add">
            <el-row>
              <el-col :span="24" class="title">新增阶段</el-col>
            </el-row>
            <el-form :model="stageForm" :rules="rules" ref="stageForm" label-width="100px">
              <el-form-item label="阶段内容" prop="content">
                <el-input type="textarea" placeholder="填写该阶段内容" v-model="stageForm.content"></el-input>
              </el-form-item>
              <el-form-item label="阶段奖励" prop="reward">
                <el-input type="textarea" placeholder="填写该阶段完成后奖励" v-model="stageForm.reward"></el-input>
              </el-form-item>
              <el-form-item label="完成状态" prop="stageStatus">
                <el-select v-model="stageForm.stageStatus" placeholder="请选择状态">
                  <el-option label="未开始" value="1"></el-option>
                  <el-option label="进行中" value="2"></el-option>
                  <el-option label="已完成" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('stageForm')">立即创建</el-button>
                <el-button type="primary" @click="continueForm('stageForm')">新增下一阶段</el-button>
                <el-button @click="resetForm('stageForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-main>
      </el-container>

    </div>
</template>

<script>
export default {
  name: 'AddStage',
  data () {
    return {
      stageForm: {
        goalNum: this.$route.query.goalNum,
        count: 1,
        content: '',
        reward: '',
        stageStatus: ''
      },
      rules: {
        content: [
          { required: true, message: '请填写阶段内容', trigger: 'blur' }
        ],
        reward: [
          { required: true, message: '请填写阶段奖励', trigger: 'blur' }
        ],
        stageStatus: [
          { required: true, message: '请选择完成状态', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/personalGoals/addStage',
            params: {
              stageForm: this.stageForm
            }
          }).then((response) => {
            if (response.data.flag === 'success') {
              this.$message({
                message: '阶段添加完成!回到目标管理页面',
                type: 'success'
              })
              this.$router.push({path: '/manage001'})
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    continueForm (formName) {
      console.log(this.stageForm.count)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/personalGoals/addStage',
            params: {
              stageForm: this.stageForm
            }
          }).then((response) => {
            if (response.data.flag === 'success') {
              this.$message({
                message: '该阶段添加成功,继续新增阶段!',
                type: 'success'
              })
              this.stageForm.count++
              this.$refs[formName].resetFields()
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          console.log('error continue!!')
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
