// Modules
const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const sequelize = require("./config/connection");
const path = require("path");
const session = require("express-session");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
    secret: "Super secret secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

// PORT
const PORT = process.env.PORT || 3001;

// Handlebars Engine settings
app.set("view engine", "hbs");
app.engine(
    "hbs",
    hbs({
        extname: "hbs",
        defaultLayout: "main",
    })
);

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(require("./controllers/"));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, (err) => {
        if (err) {
            console.log(`ERR: ${err.message}, ${err.stack}`);
        }
        console.log(`Server started on port ${PORT}`);
    });
});
