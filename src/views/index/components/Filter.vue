<template>
  <el-card class="side-card">
    <p class="color-default font-bold">篩選項目</p>
    <el-collapse v-model="activeCollapse">
      <el-collapse-item title="飯店設施" name="1">
        <el-form label-width="0px" status-icon>
          <el-form-item>
            <el-checkbox-group v-model="filterForm" @change="handleChange">
              <el-checkbox
                :label="c.name"
                name="type"
                v-for="c in checkItem"
                :key="c.name"
              />
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
import { ref } from "vue"
export default {
  emits: ["handleChange"],
  setup(props, { emit }) {
    // 點checkbox 要刷新父組件
    const filterForm = ref([])
    const activeCollapse = ref(["1"])
    const checkItem = [
      { name: "免費無線網路" },
      { name: "禁菸客房" },
      { name: "附廚房" },
      { name: "洗衣房" },
      { name: "停車場" },
      { name: "寵物友善" }
    ]
    const handleChange = () => emit("handleChange", filterForm.value)

    return { filterForm, checkItem, activeCollapse, handleChange }
  }
}
</script>

<style lang="less" scoped></style>
