var hb = require('handlebars'),
    fs = require('fs'),
    path = require('path'),
    templates = {};


module.exports = function(dirname){
	if (!dirname) throw new Error('handlebars() templates directory required');

	// Loads everything from the directory
	fs.readdirSync(path.resolve(dirname)).forEach(function(fileName){
		var ext = path.extname(fileName),
				base = path.basename(fileName, ext),
				file;

		if (ext === '.js'){
			// load as helpers set
			require(path.resolve(dirname + '/' + fileName))(hb);
		} else {
			// compile the template and load it as a partial
			file = fs.readFileSync(path.resolve(dirname + '/' + fileName), 'ascii'),
			templates[base] = hb.compile(file);
			hb.registerPartial(base, file);
		}
	});

	// excecutes the template
	var app = function(data){
		console.log(data);

		if (templates[data.template]) {
			return templates[data.template](data.context);
		}	else {
			return 'Template not found';
		}
	}	

	// middleware for handling POST request
	app.middleware = function(req, res, next){
		res.end(app(req.body));
	}

	return app;
};
