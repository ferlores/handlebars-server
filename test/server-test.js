var APIeasy = require('api-easy'),
    assert = require('assert');

var suite = APIeasy.describe('hanblebars-server');

suite.discuss('When asking for defaut.html')
   .use('localhost', 3000)
   .setHeader('Content-Type', 'application/json')
   .post('/handlebars',{
        template: 'default',
        context: {
          title: 'All about <p> Tags',
          body: '<p>This is a post about &lt;p&gt; tags</p>'
        }
      })
     .expect(200)
     .expect('should respond with template', function (err, res, body) {
        assert.equal(body, '<div class="entry"><h1>All about &lt;p&gt; Tags</h1>' +
                '<div class="body"><p>This is a post about &lt;p&gt; ' +
                'tags</p></div></div>');
     })
   .undiscuss()
   .discuss('When asking for custom-helper.html')
   .use('localhost', 3000)
   .setHeader('Content-Type', 'application/json')
   .post('/handlebars',{
        template: 'custom-helper',
        context: {
          people: [
            {firstName: "Yehuda", lastName: "Katz"},
            {firstName: "Carl", lastName: "Lerche"},
            {firstName: "Alan", lastName: "Johnson"}
          ]
        }
      })
     .expect(200)
     .expect('should respond with template', function (err, res, body) {
        assert.equal(body, '<ul><li>Yehuda Katz</li>' +
          '<li>Carl Lerche</li><li>Alan Johnson</li></ul>');
     })
   .undiscuss()
   .discuss('When asking for partials.html')
   .use('localhost', 3000)
   .setHeader('Content-Type', 'application/json')
   .post('/handlebars',{
        template: 'partials',
        context: {
          title: 'Hello!'
        }
      })
     .expect(200)
     .expect('should respond with template', function (err, res, body) {
        assert.equal(body, '<h1>Hello!<h1><p>this is a partial<p>');
     })
   .export(module);
