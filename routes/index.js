pool = require("./../config");

router = app => {
	app.get("/", (request, response) => {
		if(request.session.phone){
			pool.query("SELECT name FROM users WHERE phone = ?", request.session.phone, (error, result) => {
				if(result && result.length == 1){
					response.render("index", {
						name : result[0]["name"],
						isAdmin : request.session.phone == 0123456789
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
}

module.exports = router;
