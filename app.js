const express = require("express");
const fs= require('fs');
const path = require('path');
    
const app = express();
const port = process.env.PORT || 3001;

const songs = {};
const songNames = [];

const folderPath = path.join(__dirname, 'songs');
fs.readdir(folderPath, (err, fileNames) => {
    fileNames.forEach(fileName => {
        fs.readFile(path.join(folderPath, fileName), {encoding: 'utf-8'}, (err, lines) => {
            const [tempo, melody] = lines.toString().split("\n");
            
            songNames.push(fileName);
            songs[fileName] = {
                name: fileName,
                tempo,
                melody: melody.split(","),
            };
        });
    });
});


app.get("/song", (req, res) => {
    if (!!req.query.id) {
        if (req.query.id in songs) {
            res.json(songs[req.query.id]);
        } else {
            res
                .status(404)
                .send({ error: `Song id ${req.query.id} not found` })
        }
    } else {
        const index = Math.floor(Math.random() * songNames.length);
        const songName = songNames[index];
        res.json(songs[songName]);
    }
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
