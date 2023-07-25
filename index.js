const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { config } = require("dotenv")
config()
const app = express()
const Product = require("./router/Products")

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDb is connected"))
    .catch(() => console.log("MongoDb is not connected"))

app.get("/", async (req, res) => {
    // res.send("MERN stack")
    res.json("MERN stack")
})


app.use("/products", Product)
app.use(express.urlencoded({ extended: true }))
app.use("/images", express.static("./images"))

const PORT = process.env.PORT || 8000



app.listen(PORT, () => console.log(`${PORT} is listened`))