const myData = [
  {
    name: 'String',
    isChecked: false
  }
]

const data = myData.map((dat, index) => (
  <input
    type
    checkbox
    value={dat.isChecked}
    onChange={() => myFunc(index, data._id)}
  />
))

const myFunc = (index, id) => {
  const myData2 = getData(id)
  this.setState(state => {
    state.checks[index].isChecked = !state.checks[index].isChecked
    state.products = myData2
    return state
  })
}
