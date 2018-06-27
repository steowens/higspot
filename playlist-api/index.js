const restify = require('restify');
const os = require('os');
const playlistRoutes = require('./routeimpl/playlistRoutes.js');
const corsMiddleware = require('restify-cors-middleware');
const cors = corsMiddleware({
	  preflightMaxAge: 5, //Optional
	  origins: ['http://localhost', 'http://api.myapp.com', 'http://web.myapp.com'],
	  allowHeaders: ['API-Token'],
	  exposeHeaders: ['API-Token-Expiry']});
	 
var server = restify.createServer();

server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.plugins.queryParser({ mapParams: false }));

server.use(restify.plugins.bodyParser({
    maxBodySize: 0,
    mapParams: false,
    mapFiles: false,
    overrideParams: false,
    multipartHandler: function(part) {
        part.on('data', function(data) {
          // do something with the multipart data
        });
    },
   multipartFileHandler: function(part) {
        part.on('data', function(data) {
          // do something with the multipart file data
        });
    },
    keepExtensions: false,
    uploadDir: os.tmpdir(),
    multiples: true,
    hash: 'sha1',
    rejectUnknown: true,
    requestBodyOnGet: false,
    reviver: undefined,
    maxFieldsSize: 2 * 1024 * 1024
 }));

playlistRoutes.registerRoutes(server);

server.listen(8081, function() {
  console.log('%s listening at %s', server.name, server.url);
});