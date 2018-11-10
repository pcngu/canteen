pool = require("./../config");
req = require("request");

router = app => {
	app.get("/cart", (request, response) => {
		if(request.session.phone){
			pool.query("SELECT orders.id, orders.quantity, items.name, items.image FROM items INNER JOIN orders ON orders.active = 0 AND orders.itemId = items.id INNER JOIN users ON orders.userId = users.id AND users.phone = ?", request.session.phone, (error, result) => {
				if(error){
					return console.log(error);
				}
				response.render("cart", {
					orders : result,
				});
			});
		}
		else{
			response.redirect("/login");
		}
	});

	app.put("/cart", (request, response) => {
		pool.query("SELECT id FROM users WHERE phone = ?", request.session.phone, (error, result) => {
			if(result && result.length == 1){
				req.put("http://localhost:8080/orders/"+result[0]["id"], {
					json : {
						active : 1
					}
				}, (error, resp, body) => {
					if(!error && resp.statusCode == 200){
						console.log(body);
					}
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
	});

	app.delete("/cart/:id", (request, response) => {
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
