const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

const songs = {};
const songNames = [];

const preferences = {};

const folderPath = path.join(__dirname, "songs");
fs.readdir(folderPath, (err, fileNames) => {
  fileNames.forEach((fileName) => {
    fs.readFile(
      path.join(folderPath, fileName),
      { encoding: "utf-8" },
      (err, lines) => {
        const [tempo, melody] = lines.toString().split("\n");

        songNames.push(fileName);
        songs[fileName] = {
          name: fileName,
          tempo,
          melody: melody.split(","),
        };
      },
    );
  });
});

app.get("/song", (req, res) => {
  if (!!req.query.name) {
    if (req.query.name in songs) {
      res.json(songs[req.query.name]);
    } else {
      res.status(404).send({ error: `Song name ${req.query.name} not found` });
    }
  } else {
    const index = Math.floor(Math.random() * songNames.length);
    const songName = songNames[index];
    res.json(songs[songName]);
  }
});

app.post("/preference", (req, res) => {
  if (
    !!req.query.id &&
    !!req.query.key &&
    !!req.query.value &&
    req.query.value in songs
  ) {
    if (!preferences[req.query.id]) {
      preferences[req.query.id] = {};
    }
    preferences[req.query.id][req.query.key] = req.query.value;
    res.status(201).send();
  } else {
    res.status(400).send({ error: "Invalid parameters" });
  }
});

app.get("/preference", (req, res) => {
  if (
    !!req.query.id &&
    req.query.id in preferences &&
    !!req.query.key &&
    req.query.key in preferences[req.query.id]
  ) {
    res.json({
      name: preferences[req.query.id][req.query.key],
    });
  } else {
    res.status(400).send({ error: "Invalid parameters" });
  }
});

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
