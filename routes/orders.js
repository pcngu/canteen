pool = require("./../config");

router = app => {
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

	app.put("/orders/:userId", (request, response) => {
		pool.query("UPDATE orders SET ? WHERE userId = ?", [request.body, request.params.userId], (error, result) => {
			if(error){
				return console.log(error);
			}
			response.send("Orders updated successfully!\n");
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
