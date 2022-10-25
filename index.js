const express = require('express')
const app = express()
const port = 3000

/* GET index.html. */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/ping', (req, res) => {

})

// serve on port
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
})

