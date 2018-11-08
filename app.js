port = 8080
express = require("express");
session = require("express-session");
bodyParser = require("body-parser");
routes = require("./routes");

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

routes(app);

server = app.listen(port, (error) => {
	if(error){
		return console.log("Error : " + error);
	}
	console.log("Server listening on port " + server.address().port);
});
