<template>
    <div id="addGoal">
      <el-container>
        <el-header>

        </el-header>
        <el-main>
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
                <el-option label="已暂停" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预计完成日期" prop="preDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="goalForm.preDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('goalForm')">下一步</el-button>
              <el-button @click="resetForm('goalForm')">重置</el-button>
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
  data () {
    return {
      goalForm: {
        goalName: '',
        goalLevel: '',
        completeStatus: '',
        preDate: ''
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
        preDate: [
          { type: 'date', required: true, message: '请选择预计完成日期', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
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
  background-color: #B3C0D1;
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
