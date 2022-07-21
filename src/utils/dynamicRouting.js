export const dynamicRouting = (menus) => {
  const result = []
  menus.forEach(val => {
    if (val.child) {
      val.child.forEach(item => {
        const route = {
          path: item.frontpath,
          name: item.desc,
          meta: {
            title: item.name,
            icon: item.icon
          }
        }
        if (item.frontpath === '/') {
          route.component = () => import('../views/index/index')
        } else {
          route.component = () => import('../views' + item.frontpath + '.vue')
        }
        result.push(route)
      })
    }
  }
  )
  result.push({
    path: '/:pathMatch(.*)',
    redirect: '/404'
  })
  return result
}
