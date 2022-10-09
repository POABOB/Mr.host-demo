<template>
  <el-card style="margin-bottom: 5px">
    <el-row>
      <el-col :span="6">
        <div class="image">
          <el-image
            :src="hotel.image"
            fit="cover"
            style="width: 100%; height: 100%"
          />
        </div>
      </el-col>
      <el-col :span="14">
        <div class="description">
          <div style="padding: 0 0 0 15px">
            <h3 class="color-default font-bold">
              {{ hotel.name }}
            </h3>
            <p class="font-bold color-red small-font">
              <img class="svg-icon" src="@/assets/img/location.svg" />
              {{ hotel.location }}
            </p>
            <span class="small-font">{{ ellipsis }}</span>
            <el-skeleton-item variant="text" style="width: 40%" />
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="other">
          <p class="font-bold small-font">
            {{ computeComment }}
            <span class="comment small-font">{{ hotel.comment }}</span>
          </p>
          <p class="font-bold small-font">
            <span class="font-price">NT${{ computePrice }}</span>
            起
          </p>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { computed } from "vue"
export default {
  props: {
    hotel: {
      type: Object
    },
    people_available: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    // 依據不同人數轉換價格
    const computePrice = computed(() => {
      const temp = props.hotel.roomType.find(
        (data) => data.people_available === props.people_available
      )
      return moneyFormat(temp?.price_per_night)
    })

    // 分數轉換評語
    const computeComment = computed(() => {
      if (props.hotel.comment >= 4.5) return "好極了"
      else if (props.hotel.comment >= 3.5 && props.hotel.comment < 4.5)
        return "非常好"
      else if (props.hotel.comment >= 2.5 && props.hotel.comment < 3.5)
        return "普通"
      else return "待加強"
    })

    // 字數超過100字，剩餘變成...
    const ellipsis = computed(() => {
      const word_nums = 100
      if (props.hotel.description.length > word_nums)
        return props.hotel.description.slice(0, word_nums) + "..."
      return props.hotel.description
    })

    // 金錢3位1撇
    const moneyFormat = (num) => {
      const parts = num.toString().split(".")
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return parts.join(".") // '$' +
    }

    return { computePrice, computeComment, ellipsis }
  }
}
</script>

<style lang="less" scoped>
.image,
.description {
  display: inline-block;
  width: 100%;
  height: 100%;
  min-height: 160px;
  max-height: 185px;

  overflow: hidden;
  text-overflow: ellipsis;
}

.other {
  display: flex;
  height: 100%;
  justify-content: flex-end;
  flex-flow: row wrap;
  align-content: space-between;
}

.color-red {
  color: #f02828;
}

.svg-icon {
  width: 15px;
  height: 15px;
  filter: invert(22%) sepia(74%) saturate(6150%) hue-rotate(353deg)
    brightness(101%) contrast(89%);
}

.small-font {
  font-size: 15px;
}

.font-price {
  font-size: 18px;
}

.comment {
  color: white;
  background-color: #f24040;
  padding: 5px 10px;
  border-radius: 3px;
}
</style>
