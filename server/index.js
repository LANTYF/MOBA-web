const express = require('express')
const cors = require('cors')
const app = express()

app.set('secret', 'qiguaidedongxi')

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/web'))
require('./routes/admin')(app)
require('./routes/web')(app)
require('./plugins/db')(app)
app.listen(3000,() => {
  console.log('http://127.0.0.1:3000');
})