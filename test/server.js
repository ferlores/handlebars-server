var net = require('net'),
    connect = require('connect'),
    handlebars = require('../index.js')('./test/templates/'),
    httpServer,
    socketServer;

/**
 * Open HTTP and socket server for rendering Handlebars templates
 *
 * Expects a JSON like this:
 * {"template": "default","context": {"title": "hello!"}}
 */

// HTTP server
httpServer = connect()
  .use(connect.bodyParser())
  .use('/handlebars', handlebars.middleware);

httpServer.listen(3000);



// Socket server
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
});

socketServer.listen('/tmp/handlebars.sock');
