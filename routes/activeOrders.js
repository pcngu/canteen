pool = require("./../config");
req = require("request");

router = app => {
	app.get("/activeOrders", (request, response) => {
		if(request.session.phone == 0123456789){
			pool.query("SELECT users.name AS uname, orders.id, orders.quantity, items.name, items.image FROM items INNER JOIN orders ON orders.active = 1 AND orders.itemId = items.id INNER JOIN users ON orders.userId = users.id", (error, result) => {
				if(error){
					return console.log(error);
				}
				response.render("activeOrders", {
					orders : result,
				});
			});
		}
		else{
			response.redirect("/login");
		}
	});

	app.delete("/activeOrders/:id", (request, response) => {
		req.delete("http://localhost:8080/orders/"+request.params.id, {
			json : {
			}
		}, (error, resp, body) => {
			if(!error && resp.statusCode == 200){
				console.log(body);
			}
		});
	});
}

module.exports = router;
