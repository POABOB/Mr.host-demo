<template>
  <el-card v-for="item in 3" :key="item">
    <el-row>
      <el-col :span="6">
        <div class="image">
          <el-skeleton-item
            variant="image"
            style="width: 100%; height: 152px"
          />
        </div>
      </el-col>
      <el-col :span="14">
        <div class="description">
          <div style="padding: 14px">
            <el-skeleton-item variant="h3" style="width: 50%" />
            <br />
            <el-skeleton-item variant="p" style="width: 20%" />
            <br />
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" style="width: 40%" />
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="other">
          <el-skeleton-item variant="h1" />
          <el-skeleton-item variant="h1" />
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.other {
  display: flex;
  height: 100%;
  flex-flow: row wrap;
  align-content: space-between;
}
</style>
