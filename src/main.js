import { createApp } from "vue"
import App from "./App.vue"
const app = createApp(App)
import "normalize.css"
import "@/assets/css/index.less"

// 使用路由
import router from "./router"
// 全局引入ElementPlus
// app.use(ElementPlus)
// import ElementPlus from "element-plus"
// import "element-plus/dist/index.css"
import { globalRegister } from "./global"

app.use(globalRegister).use(router).mount("#app")
