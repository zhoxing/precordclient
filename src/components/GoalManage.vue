<template>
  <div id="goalManage">
    <el-row>
      <div class="main-header">目标管理</div>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span>设定日期:</span>
        <el-date-picker style="width: 70%"
          v-model="setDate"
          align="right"
          type="date" value-format="yyyy-MM-dd"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-col>
      <el-col :span="6">
        <span>目标名称:</span>
        <el-input style="width: 70%" placeholder="请输入目标名称" v-model="goalName" clearable></el-input>
      </el-col>
      <el-col :span="6">
        <span>目标级别:</span>
        <el-select style="width: 70%" v-model="goalLevel" clearable placeholder="请选择">
          <el-option
            v-for="item in levelList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span>完成状态:</span>
        <el-select style="width: 70%" v-model="completeStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="end">
      <router-link :to="{path:'/addGoal',name:'addGoal',params:{nickName:nickName}}">
        <el-button type="primary" class="goal-button" icon="el-icon-plus">
          新增
        </el-button>
      </router-link>
      <el-button type="primary" class="goal-button" icon="el-icon-edit" @click="toEditGoal">
        编辑
      </el-button>
      <el-button type="primary" class="goal-button" icon="el-icon-search" @click="queryGoalList">
        查询
      </el-button>
    </el-row>
    <el-table  highlight-current-row @current-change="handleCurrent"
               :data="goalList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
               style="width: 100%"
               :row-class-name="tableRowClassName">
      <el-table-column
        prop="goalNum"
        label="目标编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goalName"
        label="目标名称"
        width="180">
      </el-table-column>
      <el-table-column :formatter="levelFormat"
                       prop="goalLevel"
                       label="目标级别">
      </el-table-column>
      <el-table-column :formatter="statusFormat"
                       prop="completeStatus"
                       label="完成状态">
      </el-table-column>
      <el-table-column :formatter="dateFormat"
                       prop="setDate"
                       label="目标拟定时间">
      </el-table-column>
      <el-table-column :formatter="dateFormat"
                       prop="preDate"
                       label="目标预计完成时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="goalList.length">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'GoalManage',
  props: ['nickName'],
  data () {
    return {
      setDate: null,
      goalName: '',
      goalLevel: '',
      completeStatus: '',
      levelList: [{
        value: '1',
        label: '重要'
      }, {
        value: '2',
        label: '一般'
      }, {
        value: '3',
        label: '较小'
      }],
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
      goalList: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  mounted () {
    this.$axios({
      method: 'post',
      url: '/personalGoals/queryGoalList'
    }).then((response) => {
      if (response.data.flag === 'success') {
        this.goalList = response.data.goalList
        this.$emit('count', response.data.count)
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (row.completeStatus === '1') {
        return 'warning-row'
      } else if (row.completeStatus === '3') {
        return 'success-row'
      }
      return ''
    },
    handleCurrent (val) {
      this.currentRow = val
    },
    toEditGoal () {
      console.log(this.currentRow)
      if (this.currentRow === undefined) {
        this.$message({
          message: '未获取到对象',
          type: 'warning',
          customClass: 'msgStyle'
        })
        return
      }
      this.$router.push({path: '/editGoal', name: 'editGoal', params: {nickName: this.nickName, goalNum: this.currentRow.goalNum, goalName: this.currentRow.goalName, goalLevel: this.currentRow.goalLevel, completeStatus: this.currentRow.completeStatus, setDate: this.currentRow.setDate, preDate: this.currentRow.preDate}})
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
    levelFormat (row, column, cellValue, index) {
      const level = row[column.property]
      if (level === '1') {
        return '重要'
      } else if (level === '2') {
        return '一般'
      } else if (level === '3') {
        return '较小'
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
    queryGoalList: function () {
      this.$axios({
        method: 'post',
        url: '/personalGoals/queryGoalList',
        params: {
          setDate: this.setDate,
          goalName: this.goalName,
          goalLevel: this.goalLevel,
          completeStatus: this.completeStatus
        }
      }).then((response) => {
        if (response.data.flag === 'success') {
          this.goalList = response.data.goalList
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #3d8380;
    text-align: center;
    line-height: 60px;
    font-size: large;
    font-weight: bold;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #3d8380;
    text-align: center;
    min-height: 600px;
    line-height: 30px;
  }
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
