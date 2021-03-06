var express = require('express')
var config = require('./config')
var port = process.env.PORT || config.build.port
var autoOpenBrowser = !!config.build.autoOpenBrowser
var app = express()
var router = express.Router()
router.get('/', function(req, res, next) {
  req.url = 'index.html'
  next()
})
app.use(router)
var appData = require('./data.json')
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings

var apiRoutes = express.Router()
apiRoutes.get('/seller', function(req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})
apiRoutes.get('/goods', function(req, res) {
  res.json({
    errno: 0,
    data: goods
  })
})
apiRoutes.get('/ratings', function(req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
})

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function(err) {
  if(err) {
    console.log(err)
    return
  }
  console.log('start')
  // when env is testing, don't need open it
  if(autoOpenBrowser && process.build.NODE_ENV !== 'testing') {
    console.log('start again')
    opn(uri)
  }
})