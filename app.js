port = 8080
express = require("express");
bodyParser = require("body-parser");
routes = require("./routes");

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

routes(app);

server = app.listen(port, (error) => {
	if(error){
		return console.log("Error : " + error);
	}
	console.log("Server listening on port " + server.address().port);
});
