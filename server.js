var express = require("express")
var multer = require("multer")
var bodyParser = require("body-parser")
var path = require("path")

var app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.set("views", "./views")
app.set("view engine", "ejs")

var multerStorage = multer.diskStorage({
    destination: (res, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + "-"+ file.originalname + "" + path.extname(file.originalname))
    }
})

var multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "png") {
        cb(null, true)
    } else {
        cb(new Error("Not supported file"), false)
    }
}

app.get("/", (req, res) => {
    res.render("home")
})

var upload = multer({
    storage: multerStorage
})

app.post("/", upload.single('image'), (req, res) => {
    console.log(req.body)
    console.log(req.files)
    res.json({ message: "succefully uploaded files" })
})


app.listen(8900, () => {
    console.log("Server running at port: 8900")
})