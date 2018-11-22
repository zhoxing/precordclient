<template>
  <div id="recordManage">
    <el-container>
      <el-header>
        小标提醒:当前还有<span>100</span>个目标没有完成哦!我还是不是你最爱的宝宝了||_||
      </el-header>
      <el-main>
        <el-row>
          <div class="main-header">目标管理</div>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span>设定日期:</span>
            <el-date-picker
              v-model="setDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </el-col>
          <el-col :span="6">
            <span>目标名称:</span>
            <el-input style="width: auto" placeholder="请输入目标名称" v-model="goalName" clearable></el-input>
          </el-col>
          <el-col :span="6">
            <span>目标级别:</span>
            <el-select v-model="goalLevel" clearable placeholder="请选择">
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
            <el-select v-model="completeStatus" clearable placeholder="请选择">
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
          <el-button type="primary" icon="el-icon-plus">
            新增
          </el-button>
          <el-button type="primary" icon="el-icon-edit">
            编辑
          </el-button>
          <el-button type="primary" icon="el-icon-search">
            查询
          </el-button>
        </el-row>
        <el-table  highlight-current-row @current-change="handleCurrentChange"
          :data="tableData2"
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
          <el-table-column
            prop="goalLevel"
            label="目标级别">
          </el-table-column>
          <el-table-column
            prop="completeStatus"
            label="完成状态">
          </el-table-column>
          <el-table-column
            prop="setDate"
            label="目标拟定时间">
          </el-table-column>
          <el-table-column
            prop="preDate"
            label="目标预计完成时间">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'RecordManage',
  data () {
    return {
      setDate: '',
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
      pickerOptions1: {
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
      tableData2: [{
        goalNum: '000001',
        goalName: '王小虎',
        goalLevel: '1',
        completeStatus: '1',
        setDate: '20181111',
        preDate: ''
      }, {
        goalNum: '000001',
        goalName: '王小虎',
        goalLevel: '1',
        completeStatus: '1',
        setDate: '20181111',
        preDate: ''
      }, {
        goalNum: '000001',
        goalName: '王小虎',
        goalLevel: '1',
        completeStatus: '1',
        setDate: '20181111',
        preDate: ''
      }, {
        goalNum: '000001',
        goalName: '王小虎',
        goalLevel: '1',
        completeStatus: '1',
        setDate: '20181111',
        preDate: ''
      }]
    }
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    handleCurrentChange (val) {
      this.currentRow = val
      console.log(this.currentRow)
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
    height: 500px;

  }

  .main-header {
    color: #039be5;
    font-weight: bold;
    font-size: 20px;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-button {
    line-height: 0;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
