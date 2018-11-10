port = 8080

express = require("express");
session = require("express-session");
bodyParser = require("body-parser");

app = express();

app.use(session({
	secret : "TODO",
	resave : false,
	saveUninitialized : true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));
app.set("view engine", "ejs");

require("./routes/index")(app);
require("./routes/login")(app);
require("./routes/logout")(app);
require("./routes/register")(app);
require("./routes/addItem")(app);
require("./routes/menu")(app);
require("./routes/cart")(app);
require("./routes/users")(app);
require("./routes/items")(app);
require("./routes/orders")(app);
require("./routes/activeOrders")(app);

server = app.listen(port, (error) => {
	if(error){
		return console.log("Error : " + error);
	}
	console.log("Server listening on port " + server.address().port);
});
