const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
   res.setHeader('Content-Type', 'text/html');

   fs.readFile('./index.html', (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });
});

server.listen(port, (error) => {
    if (error) {
        console.log('Something went wrong', error);
    } else {    
        console.log('Server is listening on port ' + port);
    }
});