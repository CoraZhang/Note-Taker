var express = require("express");
var app = express();
var PORT = process.env.PORT || 3002;
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
app.listen(PORT, function() {     console.log("App listening on PORT " + PORT);   });