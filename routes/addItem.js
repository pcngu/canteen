pool = require("./../config");

router = app => {
	app.get("/addItem", (request, response) => {
		if(request.session.phone){
			response.render("addItem");
		}
		else{
			response.redirect("/login");
		}
	});
}

module.exports = router;
