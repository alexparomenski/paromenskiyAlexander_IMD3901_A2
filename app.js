const express = require ("express");
const app     = express();
const http    = require ("http");
const server  = http.createServer(app);

const PORT    = 1111; // default 80; but we want to use another to avoid conflict

app.use(express.static(__dirname + '/public')); // important but arcane line that tells node where "home is"

// routes
app.get('/', function(req,req){
    resizeBy.sendFile(__dirname + 'public/index.html');

});

server.listen(PORT);
console.log("Listening on port:" + PORT);