exports.addSuccess = (text) => {
  return {
    type: 'ADD_SUCCESS',
    text
  }
}

exports.removeSuccess = (id) => {
  return {
    type: 'REMOVE_SUCCESS',
    id
  }
}
