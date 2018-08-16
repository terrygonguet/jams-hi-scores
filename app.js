const fs = require('fs')
const express = require('express')

const app = express()

app.use(express.static("public"))

app.get("/players", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("data.json").toString()).players)
})

app.post("/score/:player/:score", (req, res) => {
  let data = JSON.parse(fs.readFileSync("data.json").toString())

  let player = data.players.find(p => p.name === req.params.player)
  if (!player) {
    return res.status(404).send("player " + req.params.player + " not found.")
  }

  let score = Number(req.params.score)
  if (isNaN(score)) {
    return res.status(400).send("score is not a number")
  } else {
    player.score = score
  }

  fs.writeFileSync("data.json", JSON.stringify(data), { flag: "w+" })
  return res.json(data.players)
})

app.listen(process.env.PORT || 1337, e => {
  console.log("Server started on port " + (process.env.PORT || 1337));
})