const express = require("express")
const multer = require("multer")
const path = require("path")
const superheroController = require("../controller/superhero")

const superheroRoute = express.Router()

// middleware configuration

const UPLOAD_PATH = path.join(__dirname, "..", "public", "images")

const uploader = multer({
    storage: multer.diskStorage({ 
        destination: function(req, file, cb) {
            cb(null, UPLOAD_PATH)
        },
        filename: function(req, file, cb) {
            console.log("=========== ", file)
            cb(null, Date.now()+file.originalname)
        }
    })
})

superheroRoute.get("/", superheroController.get)

superheroRoute.post("/", uploader.single("image"), superheroController.create)

// superheroRoute.route("/:name")
//     .get()
//     .put()
//     .delete()

module.exports = superheroRoute