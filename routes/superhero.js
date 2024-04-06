const express = require("express")
const { heroSchema } = require("../model/superhero")
const { readHero, writeHero } = require("../utils")
const superheroController = require("../controller/superhero")

const superheroRoute = express.Router()

superheroRoute.get("/", superheroController.get)
superheroRoute.post("/", superheroController.create)

// superheroRoute.route("/:name")
//     .get()
//     .put()
//     .delete()

module.exports = superheroRoute