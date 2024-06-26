const express = require("express")
const path = require("path")
const { CONSTANTS, loggerMW, customErrorHandler } = require("./utils")

const superheroRoute = require("./routes/superhero")

const app = express()

// view set
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.get("/", (req, res) => {
    res.render("index")
})

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(loggerMW)
app.use(express.static("public"))

app.get("/greetings", (req, res) => {
    return res.send("Hello! from MVC Server.")
})

// routes
app.use("/superhero", superheroRoute)

// custom error handler
app.use(customErrorHandler)

app.listen(CONSTANTS.PORT, () => {
    console.log(`Your MVC Server is running on port ${CONSTANTS.PORT}.`)
})