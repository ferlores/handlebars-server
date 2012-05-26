It creates a socket which serves handlebars template service. It expects request with this format:

```json
{
  "template": "templateName",
  "context": {
    "msg": "hello!"
  }
}
```

Instalation
===========

```
git clone git://github.com/ferlores/handlebars-server.git
cd handlebars-server
npm install -d
```

Usage
=====

* In development probably you would like to use node-supervisor

```
supervisor -e html,js app.js
```

* In production:

```
node app.js
```

* Using the service:

```
$ nc -U /path/to/socket
{"template": "default","context": {"title": "hello!"}}
```


Configuration
=============

* In ```app.js``` 

```
conf = {
	templates: "path/to/templates",
	socket: "path/to/socket"
}
```

NOTE: it will also load all the templates as partials at boot time

TODO
====

* add support for handlebars helpers
