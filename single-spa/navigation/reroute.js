export async function reroute(){
  const { getAppChanges } = await import('../application/app.helpers.js');
    console.log(getAppChanges(), '222')
    const {appsToLoad, appsToMount, appsToUnmount} = await getAppChanges()
    console.log(appsToLoad, appsToMount, appsToUnmount)
}
