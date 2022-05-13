const express = require("express")
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser")
const connectDB = require("./config/db");
const config = require("./config/db.config");
const path = require("path");
const mongoURI = config.url;
const app = express();

connectDB().then(() => console.log("Database Connected Successfully!!"))

const store = new MongoDBStore({
    uri: mongoURI,
    collection: "mySessions",
})

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
) //stores the session

app.use('/manager', require("./routes/managerRoutes"))
app.use('/user', require("./routes/userRoutes"))
app.use('/seller', require("./routes/sellerRoutes"))
app.get('/landing', (req, res) =>
    res.render(path.resolve('./views/landing.ejs'))
)

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port);

app.listen(port,() =>
    console.log(`App listening at http://localhost:${port}/landing`)
)