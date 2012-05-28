handlebars-server
=================

The goal of this module is to make possible the use Handlebars in systems that cannot run javascript (Java, PHP, etc), using nodejs instead of rhino or other havier stuff :D 

It exports a Connect/Express middleware and a method for using with sockets

Usage 
=====

Make a directory with your handlebar stuff:

<pre>
|-templates
  |--> helpers.js
  |--> template1.html  
  |--> template2.html
  |--> partials 
    |---> partial1.html
    |---> partial2.html
</pre>

Create a HTTP server with connect:

<pre>
var connect = require('connect'),
    handlebars = require('handlebars-server')('./templates'),

var httpServer = connect()
  .use(connect.bodyParser())
  .use('/handlebars', handlebars.middleware)
  .listen(3000);
</pre>

Now you are ready to make POST requests to ´´´http://localhost:3000/handlebars´´´. You can also use the module like this:

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

Enjoy!


Instalation
===========

<pre>
npm install handlebars-server
</pre>

Tests
=====

Run the tests:
* npm install -d
* node test/server.js
* npm test


NOTES
=====
* To access to the partials just refer to them like ```{{> partial1}}```
* The partials directory can have subfolders. To access to those partials use ´´´{{> folder/partial2}}´´´
* For examples look at the test directory
* This module can also be used with file sockets:

<pre>
var handlebars = requiere('handlebars-server')('./templates'),
  socketServer = net.createServer(function (client) {
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

TODO
====

* make automated tests for sockets
