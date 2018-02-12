const PORT = 9000;
const express = require('express');


const app = express();

app.use(
	'/',
	express.static(__dirname + '/app')
);


<<<<<<< HEAD

// word generator service
=======
>>>>>>> 82645bb1bf8d3ef0068b7b302965f1c244e709fc
app.get('/word', function (req, res) {
	let fs = require("fs");
	var text = fs.readFileSync("./dico.txt").toString('utf-8');
	var textByLine = text.split("\n")
	let rand = Math.floor(Math.random() * (textByLine.length - 1));
	res.send(textByLine[rand]);
<<<<<<< HEAD
=======



	//  res.send('Hello World!');
>>>>>>> 82645bb1bf8d3ef0068b7b302965f1c244e709fc
});

app.listen(PORT);

console.log(`-----------------------------
	| The root folder is: '${__dirname}/app'
	| You can access the application at: http://localhost:${PORT}
	------------------------------------------`);
