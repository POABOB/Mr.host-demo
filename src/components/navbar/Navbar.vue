<template>
  <el-header class="pageHeader">
    <el-row justify="center">
      <el-form
        :inline="true"
        :model="form"
        size="large"
        @submit.prevent="handleSearch"
      >
        <el-col :span="24">
          <el-form-item>
            <el-input
              v-model="form.location"
              placeholder="台北市"
              :prefix-icon="Search"
            />
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="form.time"
              type="daterange"
              start-placeholder="入住時間"
              range-separator="至"
              end-placeholder="退房時間"
            />
          </el-form-item>
          <el-form-item>
            <el-input-number v-model="form.number" :min="1" :max="20" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜尋條件</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </el-header>
</template>

<script>
import { reactive, onMounted } from "vue"
import { Search, User } from "@element-plus/icons-vue"
export default {
  emits: ["handleSearch"],
  setup(props, { emit }) {
    const form = reactive({
      location: "",
      time: [],
      number: 1
    })

    const handleSearch = () => emit("handleSearch", form)
    onMounted(() => emit("handleSearch", form))
    return { form, Search, User, handleSearch }
  }
}
</script>

<style lang="less" scoped>
.pageHeader {
  background-color: #20274d;
  padding: 10px 0;
  height: 80px;

  .el-form--inline .el-form-item {
    margin-top: 10px;
    margin-right: 5px;
  }
}
</style>
