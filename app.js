const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');  

const folders = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/folders', (req, res) => {
    res.json(folders);
});

app.post('/folders', (req, res) => {
    const { folderName } = req.body;
    const newFolder = { id: folders.length + 1, name: folderName, files: [] };

    fileName = 'Hello.txt';
    const filePath = path.join(__dirname, fileName);
    console.log(filePath);

    try {
        const fileStats = fs.statSync(filePath);

        for (let i = 0; i < 3; i++) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const newFile = {
                id: newFolder.files.length + 1,
                name: fileName,
                content: fileContent,
                size: fileStats.size,
                lastModified: fileStats.mtime
            };

            newFolder.files.push(newFile);
        }

    } catch (error) {
        console.error('Error reading file:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }


    folders.push(newFolder);
    res.json(newFolder);
});

app.get('/folders/:id/:name', (req, res) => {
    const folderid = req.params.id;
    const folder = folders.find(folder => folder.id == folderid);
    if (folder) {
        res.render('folder', { folder });
    } else {
        res.send('Folder not found').status(404);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
