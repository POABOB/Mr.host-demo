<template>
  <div>
    <!-- Navbar Components
      if the Submit button was clicked,
      update the ceotent of hotels list.
    -->
    <Navbar @handle-search="Search" />
    <div class="container">
      <el-row justify="center">
        <el-col :xs="24" :sm="20" :md="20" :lg="15" :xl="13">
          <el-row>
            <el-col :md="24" :lg="7" :xl="5">
              <el-aside style="width: 100%">
                <!-- Filter Components
                    if the value of checkbox was changed,
                    update the content of hotels list.
                -->
                <Filter @handle-change="Filter" />
              </el-aside>
            </el-col>
            <el-col :md="24" :lg="17" :xl="19">
              <el-main>
                <div class="order">
                  <!-- Order Components
                    if the value of Select was changed,
                    update the order of hotels list.
                  -->
                  <Order :hotels="hotels.length" @handle-change="reOrder" />
                </div>
                <el-skeleton animated :loading="loading" :throttle="100">
                  <template #template>
                    <!-- Static Components -->
                    <Skeleton />
                  </template>
                  <template #default>
                    <div v-show="!loading" class="content">
                      <!-- Hotel List -->
                      <List
                        v-for="h in hotels"
                        :key="h.image"
                        :hotel="h"
                        :people_available="people_available"
                      />
                    </div>
                    <div
                      v-show="hotels.length === 0 && !loading"
                      class="no-content"
                    >
                      <el-empty
                        description="不好意思，搜尋條件找不到合適的住宿!"
                      />
                    </div>
                  </template>
                </el-skeleton>
              </el-main>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import { Position } from "@element-plus/icons-vue"
import Navbar from "@/components/navbar"
import Skeleton from "@/views/index/components/Skeleton.vue"
import Filter from "@/views/index/components/Filter.vue"
import Order from "@/views/index/components/Order.vue"
import List from "@/views/index/components/List.vue"
import data from "@/views/index/data.json"
export default {
  components: {
    Navbar,
    Filter,
    Skeleton,
    Order,
    List
  },
  setup() {
    // 資料加載
    const loading = ref(true)

    // 本組件資料
    // 搜尋，Filter，Order過的資料
    const hotels = ref([])
    // 搜尋，Filter，沒被Order過的資料
    const default_hotels = ref([])
    // 原始資料
    const all_hotels = data

    // PROPS
    const people_available = ref(1)

    // EMIT資料
    // filter條件
    const filter = ref([])
    // 搜尋條件
    const search = ref([])
    // order條件
    const order = ref("default")

    // 重新排序
    const reOrder = (order_type = "default") => {
      loading.value = true
      order.value = order_type

      // 避免淺拷貝
      const temp_default = JSON.parse(JSON.stringify(default_hotels.value))

      if (order.value === "default") hotels.value = temp_default
      else if (order.value === "price_high") {
        hotels.value = temp_default.sort((a, b) => {
          const tempA = a.roomType.find(
            (data) => data.people_available === search.value.number
          )
          const tempB = b.roomType.find(
            (data) => data.people_available === search.value.number
          )
          return tempB.price_per_night - tempA.price_per_night
        })
      } else if (order.value === "price_low") {
        hotels.value = temp_default.sort((a, b) => {
          const tempA = a.roomType.find(
            (data) => data.people_available === search.value.number
          )
          const tempB = b.roomType.find(
            (data) => data.people_available === search.value.number
          )
          return tempA.price_per_night - tempB.price_per_night
        })
      } else if (order.value === "comment_high")
        hotels.value = temp_default.sort((a, b) => b.comment - a.comment)
      else if (order.value === "comment_low")
        hotels.value = temp_default.sort((a, b) => a.comment - b.comment)
      // 排序完過1.5s取消loading
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }

    // Filter
    const Filter = (filter_type = []) => {
      filter.value = filter_type
      Search(search.value)
    }

    const Search = (form) => {
      loading.value = true
      search.value = form
      people_available.value = search.value.number

      // 搜尋
      const temp_all = JSON.parse(JSON.stringify(all_hotels))

      // 根據地點、人數來返回資訊
      const temp_search = temp_all.filter((data) => {
        const temp = data.roomType.find(
          (data) => data.people_available === search.value.number
        )
        if (temp === undefined) return false
        return temp.numbers_left > 0
      })

      if (search.value.location !== "" || search.value.location !== null) {
        // 空值代表返回全部
        default_hotels.value = temp_search.filter(
          (data) =>
            data.location.match(form.location) ||
            data.name.match(form.location) ||
            data.description.match(form.location)
        )
      } else default_hotels.value = temp_search

      // filter
      let temp = []
      default_hotels.value.forEach((item) => {
        const result = item.equipments.filter((data) =>
          filter.value.includes(data)
        )
        if (result.length === filter.value.length) temp.push(item)
      })
      default_hotels.value = temp

      // Order
      reOrder(order.value)
    }

    return {
      Position,
      hotels,
      loading,
      people_available,
      reOrder,
      Filter,
      Search
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  margin: 5px 0;

  span {
    font-size: 20px;
  }

  .side-card {
    margin: 20px 20px;
  }
}
</style>
