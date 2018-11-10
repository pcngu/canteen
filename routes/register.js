pool = require("./../config");

router = app => {
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
}

module.exports = router;
