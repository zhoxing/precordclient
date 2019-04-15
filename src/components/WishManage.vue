<template>
  <div id="wishManage">
    <el-row>
      <div class="main-header">愿望清单管理</div>
    </el-row>
    <el-row>
      <el-col :span="8">
        <span>许愿日期:</span>
        <el-date-picker
          v-model="wishDate"
          align="right"
          type="date" value-format="yyyy-MM-dd"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-col>
      <el-col :span="8">
        <span>完成状态:</span>
        <el-select style="width: 60%" v-model="wishStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" class="goal-button" icon="el-icon-plus" @click="addWish">
          新增
        </el-button>
        <el-button type="primary" class="goal-button" icon="el-icon-edit" @click="updateWish">
          编辑
        </el-button>
        <el-button type="primary" class="goal-button" icon="el-icon-search" @click="queryWishList">
          查询
        </el-button>
      </el-col>
    </el-row>
    <el-table  highlight-current-row @current-change="handleCurrent" ref="singleTable"
               :data="wishList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
               style="width: 100%"
               :row-class-name="tableRowClassName">
      <el-table-column
        prop="wishId"
        label="愿望编号"
        width="180">
      </el-table-column>
      <el-table-column :formatter="dateFormat"
                       prop="wishDate"
                       label="许愿日期"
                       width="180">
      </el-table-column>
      <el-table-column
        prop="wishContent"
        label="许愿内容">
      </el-table-column>
      <el-table-column :formatter="statusFormat"
                       prop="wishStatus"
                       label="完成状态">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="wishList.length">
    </el-pagination>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :show-close="false" center>
      <el-form :model="wishForm" :rules="rules" ref="wishForm" >
        <el-form-item label="许愿内容" prop="wishContent" :label-width="formLabelWidth">
          <el-input type="textarea" :disabled="edit" maxlength="100" placeholder="填写内容" v-model="wishForm.wishContent" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="完成状态" prop="wishStatus" :label-width="formLabelWidth">
          <el-select v-model="wishForm.wishStatus" placeholder="请选择状态">
            <el-option label="未完成" value="0"></el-option>
            <el-option label="已完成" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="mergeSubmit('wishForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'WishManage',
  data () {
    return {
      wishDate: '',
      wishStatus: '',
      dialogFormVisible: false,
      title: '',
      edit: false,
      message: '',
      wishForm: {
        wishId: null,
        wishContent: '',
        wishStatus: ''
      },
      rules: {
        wishContent: [
          {required: true, message: '请输入内容', trigger: 'blur'}
        ],
        wishStatus: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      },
      formLabelWidth: '120px',
      statusList: [{
        value: '0',
        label: '未完成'
      }, {
        value: '1',
        label: '已完成'
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
      wishList: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  mounted () {
    this.$axios({
      method: 'post',
      url: '/personalGoals/queryWishList'
    }).then((response) => {
      if (response.data.flag === 'success') {
        this.wishList = response.data.wishList
        this.$emit('count', response.data.count)
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (row.wishStatus === '0') {
        return 'warning-row'
      } else if (row.wishStatus === '1') {
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
        const timeFormat = year + '/' + month + '/' + day
        return timeFormat
      }
    },
    statusFormat (row, column, cellValue, index) {
      const status = row[column.property]
      if (status === '0') {
        return '未完成'
      } else if (status === '1') {
        return '已完成'
      }
    },
    handleSizeChange: function (size) {
      this.pageSize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    queryWishList: function () {
      this.$axios({
        method: 'post',
        url: '/personalGoals/queryWishList',
        params: {
          wishDate: this.wishDate,
          wishStatus: this.wishStatus
        }
      }).then((response) => {
        if (response.data.flag === 'success') {
          this.wishList = response.data.wishList
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    addWish: function () {
      this.dialogFormVisible = true
      this.title = '新增愿望'
      this.edit = false
      this.message = '愿望成功添加,祝主人早日实现!'
      this.wishForm.wishId = null
      this.wishForm.wishContent = ''
      this.wishForm.wishStatus = ''
    },
    updateWish: function () {
      if (this.currentRow === undefined || this.currentRow === null) {
        this.$message({
          message: '未获取到对象',
          type: 'warning',
          customClass: 'msgStyle'
        })
        return
      }
      this.dialogFormVisible = true
      this.title = '修改愿望状态'
      this.edit = true
      this.message = '愿望状态修改成功!'
      this.wishForm.wishId = this.currentRow.wishId
      this.wishForm.wishContent = this.currentRow.wishContent
      this.wishForm.wishStatus = this.currentRow.wishStatus
    },
    mergeSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/personalGoals/addOrUpdateWish',
            params: {
              wishForm: this.wishForm
            }
          }).then((response) => {
            if (response.data.flag === 'success') {
              this.$message({
                message: this.message,
                type: 'success'
              })
              this.currentRow = null
              this.dialogFormVisible = false
              this.queryWishList()
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
