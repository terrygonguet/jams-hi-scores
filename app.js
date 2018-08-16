const fs = require('fs')
const express = require('express')

const app = express()

app.use(express.static("public"))

app.get("/players", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("data.json").toString()))
})

app.get("/score/:player/:score", (req, res) => {
  let data = JSON.parse(fs.readFileSync("data.json").toString())

  let player = data.find(p => p.name === req.params.player)
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
  return res.json(data)
})

app.get("/add/:name/:score", (req, res) => {
  let data = JSON.parse(fs.readFileSync("data.json").toString())

  let player = data.find(p => p.name === req.params.name)
  if (player) {
    return res.status(400).send("Names should be unique")
  }

  let score = Number(req.params.score)
  if (isNaN(score)) {
    return res.status(400).send("score is not a number")
  }

  data.push({ name: req.params.name, score })
  fs.writeFileSync("data.json", JSON.stringify(data), { flag: "w+" })
  return res.json(data)
})

app.get("/remove/:name", (req, res) => {
  let data = JSON.parse(fs.readFileSync("data.json").toString())
  let newData = data.filter(p => p.name !== req.params.name)
  fs.writeFileSync("data.json", JSON.stringify(newData), { flag: "w+" })
  return res.json(newData)
})

app.listen(process.env.PORT || 1337, e => {
  console.log("Server started on port " + (process.env.PORT || 1337));
})
