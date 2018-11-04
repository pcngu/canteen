pool = require("./config");
fs = require("fs");

router = app => {
	app.get("/", (request, response) => {
		response.send("Welcome to Canteen!");
	});

	app.get("/login", (request, response) => {
		fs.readFile("html/login.html", (error, page) => {
			if(error){
				response.writeHead(404);
				response.write("Sorry, the page you requested doesn't exist!");
			}
			else{
				response.writeHead(200, {
					"Content-Type" : "text/html"
				});
				response.write(page);
			}
			response.end();
		});
	});

	app.get("/register", (request, response) => {
		fs.readFile("html/register.html", (error, page) => {
			if(error){
				response.writeHead(404);
				response.write("Sorry, the page you requested doesn't exist!");
			}
			else{
				response.writeHead(200, {
					"Content-Type" : "text/html"
				});
				response.write(page);
			}
			response.end();
		});
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

	app.get("/items", (request, response) => {
		pool.query("SELECT * FROM items", (error, result) => {
			if(error){
				return console.log(error);
			}
			response.send(result);
		});
	});

	app.get("/items/:id", (request, response) => {
		pool.query("SELECT * FROM items WHERE id = ?", request.params.id, (error, result) => {
			if(error){
				return console.log(error);
			}
			response.send(result);
		});
	});

	app.post("/items", (request, response) => {
		pool.query("INSERT INTO items SET ?", request.body, (error, result) => {
			if(error){
				return console.log(error);
			}
			response.status(201).send("Item added with ID : " + result.insertId + "\n");
		});
	});

	app.put("/items/:id", (request, response) => {
		pool.query("UPDATE items SET ? WHERE id = ?", [request.body, request.params.id], (error, result) => {
			if(error){
				return console.log(error);
			}
			response.send("Item updated successfully!\n");
		});
	});

	app.delete("/items/:id", (request, response) => {
		pool.query("DELETE FROM items WHERE id = ?", request.params.id, (error, result) => {
			if(error){
				return console.log(error);
			}
			response.send("Item deleted!\n");
		});
	});

	app.get("/orders", (request, response) => {
		pool.query("SELECT * FROM orders", (error, result) => {
			if(error){
				return console.log(error);
			}
			response.send(result);
		});
	});

	app.get("/orders/:userId", (request, response) => {
		pool.query("SELECT * FROM orders WHERE userId = ?", request.params.userId, (error, result) => {
			if(error){
				return console.log(error);
			}
			response.send(result);
		});
	});

	app.post("/orders", (request, response) => {
		pool.query("INSERT INTO orders SET ?, time = ?", [request.body, new Date()], (error, result) => {
			if(error){
				return console.log(error);
			}
			response.status(201).send("Order added with ID : " + result.insertId + "\n");
		});
	});

	app.delete("/orders/:id", (request, response) => {
		pool.query("DELETE FROM orders WHERE id = ?", request.params.id, (error, result) => {
			if(error){
				return console.log(error);
			}
			response.send("Order deleted!\n");
		});
	});
}

module.exports = router;
