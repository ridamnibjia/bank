const express = require('express');
const app = express();
const path = require('path');
app.use(express.static[__dirname + '/dist/bank']);

app.get('*', function (req,res) {
res.sendFile(path.join(__dirname + '/dist/bank/index.html'));
});
// Run the app by serving the static files
// in the dist directory
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
// console.log('Console Listening');
