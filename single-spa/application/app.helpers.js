
// app status
export const NOT_LOADED = 'NOT_LOADED' // 没有被加载
export const LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE' // 路径匹配了，就去加载这个资源
export const LOAD_ERROR = 'LOAD_ERROR'
// 启动的过程
export const NOT_BOOTSTRAPED = 'NOT_BOOTSTRAPED'// 资源加载完毕了，需要启动，还没有启动
export const BOOTSTRAPING = 'BOOTSTRAPING' //启动中
export const NOT_MOUNTED ='NOT_MOUNTED' // 没有被挂载
// 挂载流程
export const MOUNTING = 'MOUNTING' // 正在挂载
export const MOUNTED ='MOUNTED' // 挂载完成
// 卸载流程
export const UNMOUNTING = 'UNMOUNTING' // 卸载中

// 判断这个应用是否正在被激活
export function isActive(app){
  return app.status === MOUNTED // 此应用正在被激活
}

// 判断此应用是否被激活
export function shouldBeActive(app){
  return app.activeWhen(window.location)
}

export async function getAppChanges () {
  const { apps } = await import("./app.js");

  const appsToLoad = [];
  const appsToMount = [];
  const appsToUnmount = [];

  apps.forEach((app) => {
    const appShouldBeActive = shouldBeActive(app);

    switch (app.status) {
      case NOT_LOADED:
      case LOADING_SOURCE_CODE:
        // 标记当前路径下 哪些应用要被加载
        if (appShouldBeActive) {
          appsToLoad.push(app);
        }
        break;
      case NOT_BOOTSTRAPED:
      case BOOTSTRAPING:
      case NOT_MOUNTED:
        // 当前状态下 哪些应用要被挂载
        if (appShouldBeActive) {
          appsToMount.push(app);
        }
        break;
      case MOUNTED:
        // 当前路径下，哪些应用要被卸载
        if (!appShouldBeActive) {
          appsToUnmount.push(app);
        }
        break;
      default:
        break;
    }
  });

  return { appsToLoad, appsToMount, appsToUnmount };
}