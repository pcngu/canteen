pool = require("./../config");

router = app => {
	app.get("/addItem", (request, response) => {
		if(request.session.phone == 0123456789){
			response.render("addItem");
		}
		else{
			response.redirect("/login");
		}
	});
}

module.exports = router;
