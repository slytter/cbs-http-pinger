const e = require('express')
const express = require('express')
const app = express()
app.use(express.json());
const port = 3000
const icmp = require('icmp')

/* GET index.html. */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/ping', async (req, res) => {
    try {
        if(!req.body?.host) return res.status(400).send('No "host" provided in body')
    
        const response = await icmp.send(req.body.host, "A message", 1000)
        console.log(response.elapsed, 'Connection open: ', response.open)

        res.send({elapsed: response.elapsed, open: response.open})
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }

})

// serve on port
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
})

