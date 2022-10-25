const express = require("express")
const path = require("path")
const middleware = require("./middleware")
const loginRoute = require("./routes/loginRoute")
const registerRoute = require("./routes/registerRoute")
const bodyParser = require("body-parser")
const session = require("express-session")
const connectDB = require("./config/db")

const app = express()
const PORT = 3001
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(PORT, () => {
  console.log(`app is rinning on port ${PORT}`)
})

connectDB()

app.set("view engine", "pug")
app.set("views", "views")

//static folder

app.use(express.static(path.join(__dirname, "public")))

//session configuration

app.use(
  session({
    secret: "thisgonnabeverysecret",
    resave: true,
    saveUninitialized: false,
  })
)

// routes
app.use("/login", loginRoute)
app.use("/register", registerRoute)
app.get("/", middleware.requireLogin, (req, res, next) => {
  const payload = {
    pageTitle: "Home Page ",
  }
  res.status(200).render("home", payload)
})
