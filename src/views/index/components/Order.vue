<template>
  <el-row justify="space-between">
    <el-col :span="6">
      <div class="label">
        <span class="color-default font-bold">找到 {{ hotels }} 間住宿</span>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple-light" />
    </el-col>
    <el-col :span="6">
      <div class="label">
        <el-select v-model="order" placeholder="排序" @change="handleChange">
          <el-option class="select-order" label="為您精選" value="default" />
          <el-option class="select-order" label="價格高" value="price_high" />
          <el-option class="select-order" label="價格低" value="price_low" />
          <el-option class="select-order" label="評價高" value="comment_high" />
          <el-option class="select-order" label="評價低" value="comment_low" />
        </el-select>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { ref } from "vue"
export default {
  props: {
    hotels: {
      type: Number,
      default: 0
    }
  },
  emits: ["handleChange"],
  setup(props, { emit }) {
    // 更動ORDER 要刷新父組件
    const handleChange = () => emit("handleChange", order.value)
    const order = ref("default")
    return { order, handleChange }
  }
}
</script>

<style lang="less" scoped>
.label {
  margin: 0 0 15px 0;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
