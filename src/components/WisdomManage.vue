<template>
  <div id="wisdomManage">
    <el-row>
      <div class="main-header">名言管理</div>
    </el-row>
    <el-row>
      <el-col :span="8">
        <span>模板编号:</span>
        <el-input style="width: auto" placeholder="请输入模板编号" v-model="modIdd" clearable></el-input>
      </el-col>
      <el-col :span="8">
        <span>名言编号:</span>
        <el-input style="width: auto" placeholder="请输入名言编号" v-model="wisNum" clearable></el-input>
      </el-col>
      <el-col :span="8">
        <span>名言:</span>
        <el-input style="width: auto" placeholder="请输入名言" v-model="wisdom" clearable></el-input>
      </el-col>
    </el-row>
    <el-row >
        <el-button type="primary" class="goal-button" icon="el-icon-plus" @click="addWisdom">
          新增
        </el-button>
        <el-button type="primary" class="goal-button" icon="el-icon-edit" @click="updateWisdom">
          编辑
        </el-button>
        <el-button type="primary" class="goal-button" icon="el-icon-search" @click="queryWisdomList">
          查询
        </el-button>
    </el-row>
    <el-table  highlight-current-row @current-change="handleCurrent" ref="singleTable"
               :data="wisdomList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
               style="width: 100%">
      <el-table-column
        prop="wisNum"
        label="名言编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="modIdd"
        label="模板编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="wisdom"
        label="名言">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="wisdomList.length">
    </el-pagination>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :show-close="false" center>
      <el-form :model="wisdomForm" :rules="rules" ref="wisdomForm" >
        <el-input type="hidden"  maxlength="11"  v-model="wisdomForm.wisNum" autocomplete="off"></el-input>
        <el-form-item label="模板编号" prop="modIdd" :label-width="formLabelWidth">
          <el-input :disabled="edit" maxlength="6" placeholder="填写模板编号" v-model="wisdomForm.modIdd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名言" prop="wisdom" :label-width="formLabelWidth">
          <el-input type="textarea"  maxlength="100" placeholder="填写名言" v-model="wisdomForm.wisdom" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="mergeSubmit('wisdomForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'wisdomManage',
  data () {
    return {
      modIdd: '',
      wisNum: '',
      wisdom: '',
      dialogFormVisible: false,
      title: '',
      edit: false,
      message: '',
      wisdomForm: {
        modIdd: '',
        wisNum: null,
        wisdom: ''
      },
      rules: {
        modIdd: [
          {required: true, message: '请输入模板编号', trigger: 'blur'},
          { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' }
        ],
        wisdom: [
          {required: true, message: '请选择名言', trigger: 'blur'}
        ]
      },
      formLabelWidth: '120px',
      wisdomList: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  mounted () {
    this.$axios({
      method: 'post',
      url: '/personalGoals/queryWisdomList'
    }).then((response) => {
      if (response.data.flag === 'success') {
        this.wisdomList = response.data.wisdomList
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    handleCurrent (val) {
      console.log(this.currentRow)
      this.currentRow = val
    },
    handleSizeChange: function (size) {
      this.pageSize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    queryWisdomList: function () {
      this.$axios({
        method: 'post',
        url: '/personalGoals/queryWisdomList',
        params: {
          modIdd: this.modIdd,
          wisNum: this.wisNum,
          wisdom: this.wisdom
        }
      }).then((response) => {
        if (response.data.flag === 'success') {
          this.wisdomList = response.data.wisdomList
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    addWisdom: function () {
      this.dialogFormVisible = true
      this.title = '新增名言'
      this.edit = false
      this.message = '名言成功添加,祝主人以此为戒!'
      this.wisdomForm.modIdd = ''
      this.wisdomForm.wisNum = null
      this.wisdomForm.wisdom = ''
    },
    updateWisdom: function () {
      if (this.currentRow === undefined || this.currentRow === null) {
        this.$message({
          message: '未获取到对象',
          type: 'warning',
          customClass: 'msgStyle'
        })
        return
      }
      this.dialogFormVisible = true
      this.title = '修改名言'
      this.edit = true
      this.message = '名言修改成功!'
      this.wisdomForm.modIdd = this.currentRow.modIdd
      this.wisdomForm.wisNum = this.currentRow.wisNum
      this.wisdomForm.wisdom = this.currentRow.wisdom
    },
    mergeSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/personalGoals/addOrUpdateWisdom',
            params: {
              wisdomForm: this.wisdomForm
            }
          }).then((response) => {
            if (response.data.flag === 'success') {
              this.$message({
                message: this.message,
                type: 'success'
              })
              this.currentRow = null
              this.dialogFormVisible = false
              this.queryWisdomList()
            } else {
              this.$message.error(response.data.message)
            }
          }).catch((err) => {
            this.$message.error(err)
          })
        } else {
          this.$message.error('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style>
  .main-header {
    color: #039be5;
    font-weight: bold;
    font-size: 20px;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .goal-button {
    line-height: 0;
    margin-right: 10px;
  }

  .el-table .warning-row {
    background: #e2cba0;
  }

  .el-table .success-row {
    background: #afda97;
  }

  .msgStyle {
    top: 50%;
  }
</style>
