const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const folders = [];

app.get('/', (req, res) => { 
    res.sendFile(__dirname + '/views/index.html'); });

app.get('/folders', (req, res) => {
  res.json(folders);
});

app.post('/folders', (req, res) => {
  const { folderName } = req.body;
  const newFolder = { id: folders.length + 1, name: folderName, files: [] };
  folders.push(newFolder);
  res.json(newFolder);
});

app.get('/folders/:id/:name', (req, res) => {
    const folderid = req.params.id;
    const folder = folders.find(folder => folder.id == folderid);

    if (folder) {
        res.json(folder);
    } else {
        res.send('Folder not found').status(404);
    }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
