
'use strict'

const request = require('request')
require('dotenv').config()

const cerrajero = (req, res, next) => {

  let token = ''

  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    token = bearerToken
  }

  const headers = {
    'Authorization': `Bearer ${token}`
  }

  const options = {
    url: process.env.checkuri,
    headers: headers,
    method: 'POST'
  }

  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      next()
    } else {
      next(error)
    }
  })
}

module.exports = cerrajero
