<template>
  <div id="stageManage">
    <el-row>
      <div class="main-header">目标阶段管理</div>
    </el-row>
    <el-row>
      <el-col :span="8">
        <span>目标编号:</span>
        <el-input style="width: auto" placeholder="请输入目标编号" v-model="goalNum" clearable></el-input>
      </el-col>
      <el-col :span="8">
        <span>完成状态:</span>
        <el-select style="width: 60%" v-model="stageStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" class="goal-button" icon="el-icon-plus" @click="addStage">
          新增
        </el-button>
        <el-button type="primary" class="goal-button" icon="el-icon-edit" @click="updateStage">
          编辑
        </el-button>
        <el-button type="primary" class="goal-button" icon="el-icon-search" @click="queryStageList">
          查询
        </el-button>
      </el-col>
    </el-row>
    <el-table  highlight-current-row @current-change="handleCurrent" ref="singleTable"
               :data="stageList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
               style="width: 100%"
               :row-class-name="tableRowClassName">
      <el-table-column
        prop="goalNum"
        label="目标编号">
      </el-table-column>
      <el-table-column
        prop="stageNum"
        label="阶段编号">
      </el-table-column>
      <el-table-column
        prop="content"
        label="阶段内容">
      </el-table-column>
      <el-table-column
        prop="reward"
        label="阶段奖励">
      </el-table-column>
      <el-table-column :formatter="statusFormat"
                       prop="stageStatus"
                       label="完成状态">
      </el-table-column>
      <el-table-column :formatter="dateFormat"
                       prop="modifyTime"
                       label="修改时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="stageList.length">
    </el-pagination>
    <el-dialog title="新增阶段" :visible.sync="dialogAddFormVisible" :show-close="false" center>
      <el-form :model="addStageForm" :rules="rules" ref="addStageForm" >
        <el-form-item label="目标编号" prop="goalNum" :label-width="formLabelWidth">
          <el-input  maxlength="100" placeholder="填写内容" v-model="addStageForm.goalNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content" :label-width="formLabelWidth">
          <el-input type="textarea" maxlength="100" placeholder="填写内容" v-model="addStageForm.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="奖励" prop="reward" :label-width="formLabelWidth">
          <el-input type="textarea" maxlength="100" placeholder="填写奖励" v-model="addStageForm.reward" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="完成状态" prop="stageStatus" :label-width="formLabelWidth">
          <el-select v-model="addStageForm.stageStatus" placeholder="请选择状态">
            <el-option label="未开始" value="1"></el-option>
            <el-option label="进行中" value="2"></el-option>
            <el-option label="已完成" value="3"></el-option>
            <el-option label="已暂停" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="mergeSubmit('addStageForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改阶段" :visible.sync="dialogEditFormVisible" :show-close="false" center>
      <el-form :model="editStageForm" :rules="rules" ref="editStageForm" >
        <el-form-item label="目标编号" prop="goalNum" :label-width="formLabelWidth">
          <el-input  maxlength="100" disabled="disabled" placeholder="填写目标编号" v-model="editStageForm.goalNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="阶段编号" prop="stageNum" :label-width="formLabelWidth">
          <el-input type="textarea" disabled="disabled" maxlength="100" placeholder="填写阶段编号" v-model="editStageForm.stageNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content" :label-width="formLabelWidth">
          <el-input type="textarea" maxlength="100" placeholder="填写内容" v-model="editStageForm.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="奖励" prop="reward" :label-width="formLabelWidth">
          <el-input type="textarea" maxlength="100" placeholder="填写奖励" v-model="editStageForm.reward" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="完成状态" prop="stageStatus" :label-width="formLabelWidth">
          <el-select v-model="editStageForm.stageStatus" placeholder="请选择状态">
            <el-option label="未开始" value="1"></el-option>
            <el-option label="进行中" value="2"></el-option>
            <el-option label="已完成" value="3"></el-option>
            <el-option label="已暂停" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="mergeSubmit('editStageForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'stageManage',
  data () {
    return {
      goalNum: '',
      stageStatus: '',
      dialogAddFormVisible: false,
      dialogEditFormVisible: false,
      message: '',
      addStageForm: {
        goalNum: '',
        stageNum: '',
        content: '',
        reward: '',
        stageStatus: ''
      },
      editStageForm: {
        goalNum: '',
        stageNum: '',
        content: '',
        reward: '',
        stageStatus: ''
      },
      rules: {
        goalNum: [
          {required: true, message: '请输入目标编号', trigger: 'blur'}
        ],
        stageNum: [
          {required: true, message: '请输入阶段编号', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'}
        ],
        reward: [
          {required: true, message: '请输入奖励', trigger: 'blur'}
        ],
        stageStatus: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      },
      formLabelWidth: '120px',
      statusList: [{
        value: '1',
        label: '未开始'
      }, {
        value: '2',
        label: '进行中'
      }, {
        value: '3',
        label: '已完成'
      }, {
        value: '4',
        label: '已暂停'
      }],
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
      },
      stageList: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  mounted () {
    this.$axios({
      method: 'post',
      url: '/personalGoals/queryStageList'
    }).then((response) => {
      if (response.data.flag === 'success') {
        this.stageList = response.data.stageList
        this.$emit('count', response.data.count)
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (row.stageStatus === '1') {
        return 'warning-row'
      } else if (row.stageStatus === '3') {
        return 'success-row'
      }
      return ''
    },
    handleCurrent (val) {
      console.log(this.currentRow)
      this.currentRow = val
    },
    dateFormat (row, column, cellValue, index) {
      const daterc = row[column.property]
      if (daterc != null) {
        const dateMat = new Date(daterc)
        const year = dateMat.getFullYear()
        const month = dateMat.getMonth() + 1
        const day = dateMat.getDate()
        const hour = dateMat.getHours()
        const minute = dateMat.getMinutes()
        const second = dateMat.getSeconds()
        const timeFormat = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second
        return timeFormat
      }
    },
    statusFormat (row, column, cellValue, index) {
      const status = row[column.property]
      if (status === '1') {
        return '未开始'
      } else if (status === '2') {
        return '进行中'
      } else if (status === '3') {
        return '已完成'
      } else if (status === '4') {
        return '已暂停'
      }
    },
    handleSizeChange: function (size) {
      this.pageSize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    queryStageList: function () {
      this.$axios({
        method: 'post',
        url: '/personalGoals/queryStageList',
        params: {
          goalNum: this.goalNum,
          stageStatus: this.stageStatus
        }
      }).then((response) => {
        if (response.data.flag === 'success') {
          this.stageList = response.data.stageList
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    addStage: function () {
      this.dialogAddFormVisible = true
      this.message = '阶段成功添加,祝主人更上一个阶段!'
    },
    updateStage: function () {
      if (this.currentRow === undefined || this.currentRow === null) {
        this.$message({
          message: '未获取到对象',
          type: 'warning',
          customClass: 'msgStyle'
        })
        return
      }
      this.dialogEditFormVisible = true
      this.message = '阶段状态修改成功!'
      this.editStageForm.goalNum = this.currentRow.goalNum
      this.editStageForm.stageNum = this.currentRow.stageNum
      this.editStageForm.content = this.currentRow.content
      this.editStageForm.reward = this.currentRow.reward
      this.editStageForm.stageStatus = this.currentRow.stageStatus
    },
    mergeSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/personalGoals/addOrUpdateStage',
            params: {
              stageForm: formName === 'editStageForm' ? this.editStageForm : this.addStageForm
            }
          }).then((response) => {
            if (response.data.flag === 'success') {
              this.$message({
                message: this.message,
                type: 'success'
              })
              this.currentRow = null
              this.dialogAddFormVisible = false
              this.dialogEditFormVisible = false
              this.queryStageList()
            } else {
              this.$message.error(response.data.message)
              this.dialogAddFormVisible = false
              this.dialogEditFormVisible = false
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
