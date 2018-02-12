const PORT = 9000;
const express = require('express');


const app = express();

app.use(
	'/',
	express.static(__dirname + '/app')
);


app.listen(PORT);

console.log(`-----------------------------
| The root folder is: '${__dirname}/app'
| You can access the application at: http://localhost:${PORT}
------------------------------------------`);
