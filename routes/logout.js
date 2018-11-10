pool = require("./../config");

router = app => {
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
}

module.exports = router;
