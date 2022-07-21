export const filterMenuData = (menu = []) => {
  const result = []
  menu.forEach(item => {
    if (item.child && item.icon) {
      const obj = {
        id: item.id,
        name: item.name,
        frontpath: item.frontpath,
        desc: item.desc,
        icon: item.icon,
        child: []
      }
      item.child.forEach(val => {
        obj.child.push({
          id: val.id,
          name: val.name,
          frontpath: val.frontpath,
          desc: val.desc,
          icon: val.icon
        })
      })
      result.push(obj)
    }
  })
  return result
}
