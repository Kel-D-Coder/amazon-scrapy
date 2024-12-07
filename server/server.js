const express = require("express");
const app = express();
require("dotenv").config();
const connectDb = require("./db/database.js");
const cors = require("cors");
const routes = require("./routes/routes.js");
const { Schedule } = require("./utils/schedule.js")

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/', routes);
app.get('/', async (req, res) => {
    res.render('index.ejs')
})

app.listen(3000, () => {
    console.log("Listening on port 3000 .....");
    connectDb();
    // Schedule();
})