var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
// Go to api and html routes

app.listen(PORT, function() {     console.log("App listening on PORT " + PORT);   });