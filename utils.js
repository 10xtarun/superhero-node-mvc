const fs = require("fs/promises")

const CONSTANTS = {
    PORT: 3000
}

// Custom Middlewares
function loggerMW(req, res, next) {
    console.log("=== NEW REQUEST : ", req.method, req.url, req.body)

    let isEnabled = true //req.body.isEnabled ? req.body.isEnabled : false

    if (isEnabled) {
        next()
    } else {
        return res.json({
            message: "Request Failed.",
            error: "Request is not enabled.",
            data: null
        })
    }
}

function customErrorHandler(err, req, res, next) {
    console.log("=== Error Logger: ", err)
    return res
        .status(400)
        .json({
            "message": "Request Failed.",
            "error": err,
            "data": null
        })
}

function readHero() {
    return fs.readFile("./database/superhero.json", { encoding: "utf-8" })
}

function writeHero(data) {
    return fs.writeFile("./database/superhero.json", data, { encoding: "utf-8" })
}

module.exports = {
    CONSTANTS,
    loggerMW,
    customErrorHandler,
    readHero,
    writeHero
}