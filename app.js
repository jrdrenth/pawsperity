// Modules
const express = require("express");
const app = express();
const hbs = require("express-handlebars");

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

// THIS IS JUST A TEST TO SEE IF I'M CONNECTED
app.get("/", (req, res) => {
    res.render("index");
});

// Start server to test only
app.listen(PORT, (err) => {
    if (err) {
        console.log(`ERR: ${err.message}, ${err.stack}`);
    }
    console.log(`Server started on port ${PORT}`);
});
