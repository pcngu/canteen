pool = require("./../config");

router = app => {
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
}

module.exports = router;
