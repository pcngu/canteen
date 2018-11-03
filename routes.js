pool = require("./config");

router = app => {
	app.get("/", (request, response) => {
		response.send("Welcome to Canteen!");
	});

	app.get("/users", (request, response) => {
		pool.query("SELECT * FROM users", (error, result) => {
			if(error){
				return console.log(error);
			}
			response.send(result);
		});
	});

	app.get("/users/:id", (request, response) => {
		pool.query("SELECT * FROM users WHERE id = ?", request.params.id, (error, result) => {
			if(error){
				return console.log(error);
			}
			response.send(result);
		});
	});

	app.post("/users", (request, response) => {
		pool.query("INSERT INTO users SET ?", request.body, (error, result) => {
			if(error){
				return console.log(error);
			}
			response.status(201).send("User added with ID : " + result.insertId + "\n");
		});
	});

	app.delete("/users/:id", (request, response) => {
		pool.query("DELETE FROM users WHERE id = ?", request.params.id, (error, result) => {
			if(error){
				return console.log(error);
			}
			response.send("User deleted!\n");
		});
	});
}

module.exports = router;
