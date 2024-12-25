const express = require("express");
const app = express();
require("dotenv").config();
const connectDb = require("./db/database.js");
const cors = require("cors");
const routes = require("./routes/routes.js");
const { Schedule } = require("./utils/schedule.js")

app.set('view engine', 'ejs');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
}));  // First, allow cross-origin requests


// Use raw body for Stripe webhook route
app.use('/api/v1/webhooks', express.raw({ type: 'application/json' }));

app.use(express.json());  // Then, parse JSON bodies
app.use(express.urlencoded({ extended: false }));  // Then, parse URL-encoded bodies
app.use('/', routes);  // Finally, your routes

app.listen(8000, () => {
    console.log("Listening on port 8000 .....");
    connectDb();
    // Schedule();
})