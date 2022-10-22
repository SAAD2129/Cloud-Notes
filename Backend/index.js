// connect to Data base
const ConnectDb = require('./db.js');
ConnectDb();

const express = require('express');
const app = express();
const port = 5000;

app.use(express.json())
// using the end point no login / authication required here
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
	console.log(`Server Running on port localhost:${port}`);
	// connect established here
});
