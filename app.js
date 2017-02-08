const {app, BrowserWindow} = require('electron');

let win;

app.on('ready', function() {
	win = new BrowserWindow({
		width: 1300,
		height: 500,
		resizable: false,
		frame: false
	});
	win.loadURL(`file://${__dirname}/index.html`);
});