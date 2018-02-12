const PORT = 9000;
const express = require('express');


const app = express();

app.use(
	'/',
	express.static(__dirname + '/app')
);


app.get('/word', function (req, res) {
	let fs = require("fs");
	var text = fs.readFileSync("./dico.txt").toString('utf-8');
	var textByLine = text.split("\n")
	let rand = Math.floor(Math.random() * (textByLine.length - 1));
	res.send(textByLine[rand]);



	//  res.send('Hello World!');
});

app.listen(PORT);

console.log(`-----------------------------
	| The root folder is: '${__dirname}/app'
	| You can access the application at: http://localhost:${PORT}
	------------------------------------------`);
