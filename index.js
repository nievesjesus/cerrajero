'use strict'

const fetch = require('node-fetch')
require('dotenv').config()

const cerrajero = async (req, res, next) => {
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

  try {
    const response = await fetch(process.env.CHECKURI, {
      method: 'POST',
      headers: headers
    })

    if (response.status === 200) {
      next()
    } else {
      next(new Error('unauthorized'))
    }
  } catch (error) {
    next(error)
  }
}

module.exports = cerrajero
