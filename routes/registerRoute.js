const express = require("express")
const app = express()
const router = express.Router()

const User = require("../models/userModel")

app.set("view engine", "pug")
app.set("views", "views")

router.get("/", (req, res, next) => {
  res.status(200).render("register")
})
router.post("/", async (req, res, next) => {
  const firstName = req.body.firstName.trim()
  const lastName = req.body.lastName.trim()
  const username = req.body.username.trim()
  const email = req.body.email.trim()
  const password = req.body.password

  const payload = req.body

  if (firstName && lastName && username && email && password) {
    try {
      const user = await User.findOne({
        $or: [{ username: username }, { password: password }],
      })
      if (!user) {
        const newUser = await User.create({
          firstName,
          lastName,
          username,
          email,
          password,
        })
        payload.errorMessage = "Registered successfully."
        req.session.user = newUser
        return res.redirect("/")
      } else {
        payload.errorMessage = "This user already exist"
        res.status(200).render("register", payload)
      }
    } catch {
      console.log("an error happened")
      payload.errorMessage = "Some Error Happend."
      res.status(200).render("register", payload)
    }
  } else {
    payload.errorMessage = "Make sure all fields have value"

    res.status(200).render("register", payload)
  }
})

module.exports = router
