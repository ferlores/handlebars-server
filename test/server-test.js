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
   .discuss('When asking for partial.html')
   .use('localhost', 3000)
   .setHeader('Content-Type', 'application/json')
   .post('/handlebars',{
        template: 'partial',
        context: {
          title: 'Hello!'
        }
      })
     .expect(200)
     .expect('should respond with template', function (err, res, body) {
        assert.equal(body, '<h1>Hello!<h1><p>this is a new<p>');
     })
   .undiscuss()
   .discuss('When asking for posts.html')
   .use('localhost', 3000)
   .setHeader('Content-Type', 'application/json')
   .post('/handlebars',{
        template: 'posts',
        context: {
          posts: [
            {
              title: 'My First Post',
              body: 'that is amazing'
            },
            {
              title: 'My Second Post',
              body: 'o_O'
            }
          ]
        }
      })
     .expect(200)
     .expect('should respond with template', function (err, res, body) {
        assert.equal(body, '<h1>Posts</h1><h1>My First Post</h1><p>that is amazing</p><h1>My Second Post</h1><p>o_O</p>');
     })
   .export(module);
