
const { heroSchema } = require("../model/superhero")
const { readHero, writeHero } = require("../utils")

function get(req, res, next) {
    return readHero()
        .then((data) => {
            data = JSON.parse(data)
            return res
                .status(200)
                .json({
                    message: "Request successful.",
                    data: data,
                    error: null
                })
        })
        .catch((error) => {
            return next(error)
        })
}

function create(req, res, next) {
    console.log("=========== ", req.file, req.files)
    req.body.imageUrl = req.file.filename
    return heroSchema.validateAsync(req.body)
        .then((validationResult) => {
            return readHero()
        })
        .then((data) => {
            // this data is of array type
            data = JSON.parse(data)
            data.push(req.body)

            const dataInStringJSON = JSON.stringify(data)

            return writeHero(dataInStringJSON)
        })
        .then(() => {
            return res
                .status(201)
                .json({
                    message: "Request successful.",
                    data: req.body,
                    error: null
                })
        })
        .catch((error) => {
            return next(error)
        })
}

module.exports = {
    get,
    create
}