var net = require('net'),
		hb = require('handlebars'),
    fs = require('fs'),
    path = require('path'),
    templates = {},
    server,
    conf;

conf = {
	templates: 'templates',
	socket: '/tmp/handlebars.sock'
};

/**
 * Loads the templates from the directory
 * Add every template as a partial
 */
fs.readdirSync(conf.templates).forEach(function(fileName){
	var file = fs.readFileSync(conf.templates + '/' + fileName, 'ascii'),
			base = path.basename(fileName, path.extname(fileName));

	templates[base] = hb.compile(file);
	hb.registerPartial(base, file);
});

/**
 * Open a socket for rendering Handlebars templates
 *
 * Expects a JSON like this:
 * {"template": "default","context": {"title": "hello!"}}
 */

server = net.createServer(function (client) {
	client.on('data', function(data) {
		try {
			var req = JSON.parse(data.toString());

			if (templates[req.template]) {
				client.write(templates[req.template](req.context) + '\n');
			}	else {
				client.write('Template not found');
			}

		}catch(e){
			console.log(e);
			client.write(e.toString() + '\r\n');
		}
	});
});

server.listen(conf.socket);
