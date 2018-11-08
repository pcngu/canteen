pool = require("./config");

router = app => {
	app.get("/", (request, response) => {
		if(request.session.phone){
			pool.query("SELECT name FROM users WHERE phone = ?", request.session.phone, (error, result) => {
				if(result && result.length == 1){
					response.render("index", {
						name : result[0]["name"]
					});
				}
				else{
					request.session.destroy((error) => {
						if(error){
							return console.log(error);
						}
						response.render("login", {
							showError : 1,
							loginError : "Please login again!"
						});
					});
				}
			});
		}
		else{
			response.redirect("/login");
		}
	});

	app.get("/login", (request, response) => {
		if(request.session.phone){
			response.redirect("/");
		}
		else{
			response.render("login", {
				showError : 0,
				loginError : ""
			});
		}
	});

	app.get("/logout", (request, response) => {
		if(request.session.phone){
			request.session.destroy((error) => {
				if(error){
					return console.log(error);
				}
				response.redirect("/");
			});
		}
		else{
			response.redirect("/login");
		}
	});

	app.post("/login", (request, response) => {
		pool.query("SELECT password FROM users WHERE phone = ?", request.body.phone, (error, result) => {
			if(result && result.length == 1 && result[0]["password"] == request.body.password){
				request.session.phone = request.body.phone;
				response.redirect("/");
			}
			else{
				response.render("login", {
					showError : 1,
					loginError : "Phone number or Password is incorrect!"
				});
			}
		});
	});

	app.get("/register", (request, response) => {
		if(request.session.phone){
			response.redirect("/");
		}
		else{
			response.render("register", {
				showError : 0,
				registerError : ""
			});
		}
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
		pool.query("SELECT id FROM users WHERE phone = ?", request.body.phone, (error, result) => {
			if(result && result.length == 0){
				pool.query("INSERT INTO users SET ?", request.body, (error, result) => {
					if(error){
						return console.log(error);
					}
					response.status(201).send("User added with ID : " + result.insertId + "\n");
				});
			}
			else{
				response.render("register", {
					showError : 1,
					registerError : "Phone number already exists!"
				});
			}
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
