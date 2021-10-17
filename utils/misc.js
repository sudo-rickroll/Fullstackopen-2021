const morgan = require('morgan')

const morganToken = () => {
  morgan.token('body', request => {
    if (request.method === 'POST'){
      return JSON.stringify(request.body)
    }
    return ' '
  })
}

module.exports = {
  morganToken
}