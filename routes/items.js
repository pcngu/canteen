pool = require("./../config");

router = app => {
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
}

module.exports = router;
