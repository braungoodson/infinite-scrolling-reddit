var express = require('express'),
  app = express(),
  port = process.env.PORT || 30000,
  staticRoot = __dirname;

app.use('/', express.static(staticRoot));

app.listen(port);

console.log('listening on '+port);
