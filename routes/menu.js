pool = require("./../config");
req = require("request");

router = app => {
	app.get("/menu", (request, response) => {
		if(request.session.phone){
			pool.query("SELECT * FROM items", (error, result) => {
				if(error){
					return console.log(error);
				}
				response.render("menu", {
					items : result,
				});
			});
		}
		else{
			response.redirect("/login");
		}
	});

	app.post("/menu", (request, response) => {
		if(request.body.quantity > 0){
			pool.query("SELECT id FROM users WHERE phone = ?", request.session.phone, (error, result) => {
				if(result && result.length == 1){
					req.post("http://localhost:8080/orders", {
						json : {
							userId : result[0]["id"],
							itemId : request.body.itemId,
							quantity : request.body.quantity
						}
					}, (error, resp, body) => {
						if(!error && resp.statusCode == 201){
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
		}
	});
}

module.exports = router;
