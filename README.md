Usage
=====

This module loads handlebars templates and helpers from a directory and make the rendering with the context passed by parameter. All the templates in the directory are also loaded as partials

<pre>
var handlebars = require('handlebars-server')('./templates'),
    request = {
      "template": "templateName",
      "context": {
        "msg": "hello!"
      }
    };

handlebars(request); // returns the rendered template
</pre>

This is usefull when using it with file sockets. So other process (java/PHP/etc) can use the templating service

<pre>
var socketServer = net.createServer(function (client) {
	client.on('data', function(data) {
		try {
			var req = JSON.parse(data.toString());
			client.write(handlebars(req));
		}catch(e){
			console.log(e);
			client.write(e.toString() + '\r\n');
		}
	});
})
.listen('/tmp/handlebars.sock');
</pre>

The module also exports a connect middleware

<pre>
var net = require('net'),
    connect = require('connect'),
    handlebars = require('handlebars-server')('./templates'),

var httpServer = connect()
  .use(connect.bodyParser())
  .use('/handlebars', handlebars.middleware)
  .listen(3000);
</pre>

Instalation
===========

<pre>
git clone git://github.com/ferlores/handlebars-server.git
cd handlebars-server
npm install -d
</pre>

TODO
====

* make automated tests
