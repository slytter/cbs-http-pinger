const express = require('express')
const app = express()
app.use(express.json());
const port = 3000
const icmp = require('icmp')



// Opgave 2 - Programmer så at /ping endpointet tilføjer dataen til databasen

// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./db.sqlite');

// db.serialize(function() {
//     console.log('Creating database if it doesn\'t exist');
//     db.run('CREATE TABLE if not exists pings (id integer primary key, hostname text not null, rtt integer, datetime integer)');
// });


// app.get('/api/pings', (req, res, next) => {
//     try {
//       db.serialize(function() {
//         db.all("SELECT * FROM pings", function(err, data){
//           res.json({ pings: data });
//         });
//       });
//     } catch(err) {
//       console.error(`Error while getting pings `, err.message);
//       res.status(500).json(err);
//     };
// });


// const pushPingToDb = (hostname, rtt) => {
//     db.serialize(function() {
//         db.run("INSERT INTO pings (hostname, rtt, datetime) VALUES (?, ?, ?)", [hostname, rtt, Date.now()]);
//     });
// }




// Opgave 1:

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Serve style.css
app.get('/style', (req, res) => {
    res.sendFile(__dirname + '/style.css')
})

app.post('/ping', async (req, res) => {
    try {
        if(!req.body?.host) return res.status(400).send('No "host" provided in body')


        // Her sender vi et ICMP ping til hosten
        const response = await icmp.send(req.body.host, "A message", 1000)
        
        // Opgave 1: Programmer så at /ping end-pointet sender 10 requests og sender gennemsnits svartiden tilbage.
        // ...
        
        
        
        console.log('RTT:', response.elapsed, 'Connection open:', response.open)
        res.json({elapsed: response.elapsed, open: response.open})
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})

// serve on port
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
})

