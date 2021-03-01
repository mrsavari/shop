const fs = require('fs')
const moment = require('moment-jalaali')
const mkdirp = require('mkdirp')
module.exports = {
    handle(req,res,next){ 
        const year = moment().format('jYYYY') ,
        month = moment().format('jM') ,
        day = moment().format('jD') ,
        dir = `${DIR}/public/uploads/${year}/${month}/${day}`
        mkdirp.sync(dir)
        next()
    }
}