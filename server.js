const swaggerUI=require("swagger-ui-express");
swaggerDocument=require('./swagger.json');

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride=require("method-override");

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const connectDB = require("./config/db");
const config = require("./config/db.config");
const mongoURI = config.url;
//const passport = require('passport');
//require('./googleAuth');
require('dotenv').config();

const app = express();


app.use(session({
    secret: 'cats',
    resave: false,
    saveUninitialized: true
}));
//app.use(passport.initialize());
//app.use(passport.session());
// app.get('/auth/google',
//     passport.authenticate('google', { scope: [ 'email', 'profile' ] }
//     ));
// app.get( '/auth/google/callback',
//     passport.authenticate( 'google', {
//         successRedirect: '/user',
//         failureRedirect: '/auth/google/failure'
//     })
// );
// app.get('/auth/google/failure', (req, res) => {
//     res.send('Failed to authenticate..');
// });


connectDB().then(() => console.log("Database Connected Successfully!!"))

const store = new MongoDBStore({
    uri: mongoURI,
    collection: "mySessions",
})

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended: true}))

app.use('/manager', require("./routes/managerRoutes"))
app.use('/user', require("./routes/userRoutes"))
app.use('/seller', require("./routes/sellerRoutes"))
app.get('/', (req, res) =>
    res.render(path.resolve('./views/home.ejs'))
)
app.get('/landing', (req, res) =>
    res.render(path.resolve('./views/landing.ejs'))
)


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port,() =>
    console.log(`App listening at http://localhost:${port}`)
)