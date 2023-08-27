# IoTJukeboxAPI

This is a simple API made to return song data (tempo and melody) for an Arduino or similar device to play music.

All the song data for this API was scraped from this repository, https://github.com/robsoncouto/arduino-songs, using the python script `scripts/extract_songs.py`.

## API Docs

`/song` will return a random song each time the endpoint is used.

`/song?id=<id>` will return a single song where the songs name is <id>. An example usage would be `/song?id=gameofthrones`.

A song has the shape

```json
{
    "name": "harrypotter",
    "tempo": "144",
    "melody": ["0", "2", "294", "4"]
}
```

both endpoints return the song in the same shape.

## Song IDs

Below is a list of all the different song IDs the API offers

- asabranca
- badinerie
- babyelephantwalk
- bloodytears
- brahmslullaby
- cannonind
- cantinaband
- doom
- furelise
- gameofthrones
- greenhill
- greensleeves
- harrypotter
- happybirthday
- imperialmarch
- jigglypuffsong
- merrychristmas
- miichannel
- keyboardcat
- minuetg
- nevergonnagiveyouup
- nokia
- pacman
- odetojoy
- pinkpanther
- princeigor
- professorlayton
- pulodagaita
- silentnight
- songofstorms
- startrekintro
- starwars
- supermariobros
- tetris
- takeonme
- thegodfather
- thelick
- zeldaslullaby
- thelionsleepstonight
- vampirekiller
- zeldatheme

