<template>
  <div id="menu">
    <h2 style="color: #ffffff">{{nickName}}</h2>
    <el-menu
      :default-active="menuId"
       style="border-right: none;text-align: left"
      class="el-menu-vertical-demo"
       @select="handleSelect"
      background-color="#2bbfa4"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item :index="item.modIdd" v-for="item in queryModuleList" :key="item.modIdd">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.modName}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      queryModuleList: []
    }
  },
  props: ['nickName', 'menuId'],
  mounted: function () {
    this.$axios({
      method: 'post',
      url: '/personalGoals/index'
    }).then((response) => {
      if (response.data.flag === 'success') {
        this.queryModuleList = response.data.queryModuleList
      }
    }).catch((err) => {
      this.$message.error(err)
    })
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$emit('modIdd', key)
      console.log('menu:' + key)
    }
  }
}
</script>

<style scoped>

</style>
