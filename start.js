var exec = require('child_process').exec;
var path = require('path');

var app,
	api,
	args,
	development,
	nodeEnv,
	appCommand,
	apiCommand,
	env;

args = process.argv.slice(2);

development = nodeEnv = args[0] !== '--prod'
nodeEnv = development ? 'development' : 'production';

appCommand = 'npm run start-' + (development ? 'dev' : 'prod');
apiCommand = 'npm start';

var env = Object.assign({}, process.env, {
	NODE_ENV: nodeEnv
});

function bindOutput(command) {
	command.stdout.on('data', function(data) {
		process.stdout.write(data);
	});
	command.stderr.on('data', function(data) {
		process.stderr.write(data);
	});
	command.on('error', function(err) {
		process.stderr.write(err);
		process.exit(err.code || 1);
	});
}

function commandCallback(error, stdout, stderr) {
	if (error) {
		console.error('FATAL ERROR', error);
		process.exit(error.code || 1);
	}
}

app = exec(appCommand, { cwd: path.resolve(__dirname, './app'), env }, commandCallback);
bindOutput(app);
api = exec(apiCommand, { cwd: path.resolve(__dirname, './api'), env }, commandCallback);
bindOutput(api);
