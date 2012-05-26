module.exports= function(Handlebars){

	Handlebars.registerHelper('capitalize', function(text) {
		return text.toUpperCase();
	});

}


