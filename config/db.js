const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://mehdi_salimi:fC6dmfq8MKnIw7WJ@cluster0.sqvays3.mongodb.net/?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    )

    console.log(`MongoDB Conncted:${conn.connection.host}`)
  } catch (err) {
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }
}

module.exports = connectDB
