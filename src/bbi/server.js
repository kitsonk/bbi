define([
	'dojo/node!express',
	'dojo/node!jade',
	'dojo/node!colors',
	'dojo/node!stylus',
	'dojo/node!nib'
], function (express, jade, colors, stylus, nib) {
	'use strict';

	/* jshint node:true */

	var app = express(),
		appPort = process.env.PORT || '8020',
		env = process.env.NODE_ENV || 'development';

	app.configure(function () {

		function compile(str, path) {
			return stylus(str).set('filename', path).use(nib());
		}

		app.locals.pretty = true;
		app.set('view engine', 'jade');
		app.set('views', 'views');
		app.use(express.logger(env && env === 'production' ? null : 'dev'));
		app.use(express.compress());
		app.use(express.cookieParser());
		app.use(express.cookieSession({ secret: 'UDyA9DGRmRfFmqDzBAzC' }));
		app.use(app.router);

		app.use(stylus.middleware({
			src: '.',
			compile: compile,
			compress: true
		}));

		app.use('/static', express['static']('static'));
		app.use('/src', express['static']('src'));
		app.use('/lib', express['static']('lib'));

		app.use('/500', function (request, response, next) {
			next(new Error('All your base are belong to us!'));
		});

		app.use(function (request, response) {
			response.status(404);
			if (request.accepts('html')) {
				response.render('404', { url: request.url });
				return;
			}
			if (request.accepts('json')) {
				response.send({ error: 'Not Found', url: request.url });
				return;
			}
			response.type('text').send('Not Found');
		});

		app.use(function (error, request, response) {
			response.status(error.status || 500);
			if (request.accepts('html')) {
				response.render('500', {
					error: error
				});
			}
			else if (request.accepts('json')) {
				response.send({
					name: error.name,
					message: error.message,
					stack: error.stack.split('\n')
				});
			}
			else {
				response.type('text').send(error);
			}
		});
	});

	app.get('/', function (request, response/*, next*/) {
		response.render('index', {
			baseUrl: (env === 'production' ? 'lib' : 'src')
		});
	});

	app.listen(appPort);
	console.log('HTTP server started on port: '.grey + appPort.cyan);
});