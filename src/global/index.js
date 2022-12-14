// import "element-plus/theme-chalk/base.css"
// // 因為service的請求會用到，所以全局引入
import "element-plus/theme-chalk/el-message.css"
import "element-plus/theme-chalk/el-message-box.css"
import "element-plus/theme-chalk/el-loading.css"

// 普通組件已經透過 vue.config.js 中配置，無須在此調整
// config
// .plugin("AutoImport")
// .use(AutoImport({ resolvers: [ElementPlusResolver()] }))
// config
// .plugin("Components")
// .use(Components({ resolvers: [ElementPlusResolver()] }))

// 按需全局引入ICON組件
import { User } from "@element-plus/icons-vue"
const components = [User]

export function globalRegister(app) {
  for (const c of components) app.component(c.name, c)
}
