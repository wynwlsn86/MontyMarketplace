export const keyParser = key => {
  let newKey = ''
  if (key.includes('_')) {
    const tmp = key.split('_')
    let first = tmp[0].charAt(0).toUpperCase() + tmp[0].slice(1)
    let last = tmp[1].charAt(0).toUpperCase() + tmp[1].slice(1)
    newKey = `${first} ${last}`
  } else {
    newKey = key.charAt(0).toUpperCase() + key.slice(1)
  }
  return newKey
}

export const ObjSort = arryOfObjects => {
  let keys = []

  arryOfObjects.forEach(object => {
    let unsortedKeys = Object.keys(object)
    if (!keys.includes(...unsortedKeys)) keys.push(...unsortedKeys.sort())
  })
  return createNewObj(keys, arryOfObjects)
}

const createNewObj = (keys, objects) => {
  let arr = []
  objects.map(object => {
    let obj = {}
    keys.forEach(key => {
      obj[key] = object[key]
      if (Object.keys(obj).length === 3) {
        arr.push(obj)
      }
    })
  })
  return arr
}
