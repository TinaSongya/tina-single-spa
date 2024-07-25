import { reroute } from "../navigation/reroute.js";
import { NOT_LOADED } from "./app.helpers.js";

export const apps = [];
export function registerApplication(appName, loadApp, activeWhen, customProps){
  const registeration = {
    name: appName,
    loadApp,
    activeWhen,
    customProps,
    status: NOT_LOADED
  }
  apps.push(registeration)
  // 需要给每一个应用添加对应的状态变化

  // 未加载 -》加载 -》挂载 -》 卸载


  // 检查哪些应用需要被加载，哪些应用需要被挂载， 哪些应用需要被移除，
  console.log('reroute')
  reroute() // 重写路由
}