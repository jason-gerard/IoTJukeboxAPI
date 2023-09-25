const express = require("express");
const fs= require('fs');
const path= require('path');
    
const app = express();
const port = process.env.PORT || 3001;

const songs = {};
const songNames = [];

const preferences = {
    "29133488" : {},
    "40016729" : {},
    "40113678" : {},
    "40131248" : {},
    "40151723" : {},
    "40169282" : {},
    "40176826" : {},
    "40192181" : {},
    "40192995" : {},
    "23740137" : {},
    "40028310" : {},
    "40076107" : {},
    "40098631" : {},
    "40038031" : {},
    "40077670" : {},
    "40105294" : {},
    "40099428" : {},
    "40112383" : {},
    "26376541" : {},
    "40116096" : {},
    "40135094" : {},
    "40158397" : {},
    "40155578" : {},
    "40158491" : {},
    "40182642" : {},
    "40175886" : {},
    "27037627" : {},
    "40165883" : {},
    "40176510" : {},
    "40181253" : {},
    "40291852" : {},
    "40291843" : {},
    "40291842" : {},
    "40291844" : {},
    "40291854" : {},
    "40292539" : {},
    "40151344" : {},
    "TA": {},
};

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
    if (!!req.query.name) {
        if (req.query.name in songs) {
            res.json(songs[req.query.name]);
        } else {
            res
                .status(404)
                .send({ error: `Song name ${req.query.name} not found` });
        }
    } else {
        const index = Math.floor(Math.random() * songNames.length);
        const songName = songNames[index];
        res.json(songs[songName]);
    }
});

app.post("/preference", (req, res) => {
    if (!!req.query.id && req.query.id in preferences && !!req.query.key && !!req.query.value && req.query.value in songs) {
        preferences[req.query.id][req.query.key] = req.query.value;
        res.status(201).send();
    } else {
        res
            .status(400)
            .send({ error: "Invalid parameters" });
    }
});

app.get("/preference", (req, res) => {
    if (!!req.query.id && req.query.id in preferences && !!req.query.key &&  req.query.key in preferences[req.query.id]) {
        res.json({
            "name": preferences[req.query.id][req.query.key],
        });
    } else {
        res
            .status(400)
            .send({ error: "Invalid parameters" });
    }
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
