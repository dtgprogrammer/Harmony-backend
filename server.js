
// const Router = require("./routes")
require("dotenv").config();
const passport=require("passport");
const cookieSession=require("cookie-session");
const express = require('express');
const cors = require('cors');
const passportSetup=require("./passport");
const authRoute=require("./routes/auth");


const app = express();
app.use(express.json());
app.use(cors());
app.use(
    cookieSession({
        name:"session",
        keys: ["harmony"],
        maxAge:24*60*60*100,
    })
)

app.use(passport.initialize());
app.use(passport.session());

// app.use(cors({
//     origin:"https://localhost:3000",
//     methods:"GET,POST,PUT,DELETE",
//     credentials:true,
// }))
app.use("/auth",authRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
})


app.post("/info", (req, res) => {
    console.log(req.body);
})

//mongoose config

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    auth: String,
    image: String,
    accessToken: String
})


const connection_URL = "mongodb+srv://ayush6678:L1jE8YPBHHf3lrc7@cluster0.zhcp1te.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connection_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("DB Connected successfully");
});

// app.use(Router);


//routes
const songDB = mongoose.model("songDB", schema);

app.post("/songData", async (req, res) => {

    const song = new songDB(req.body);

    try {
        await song.save();
        res.send(song);
    }
    catch (err) {
        response.status(500).send(err);
    }
});



app.get("/fetchData", (req, res) => {

    songDB.find()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });

});