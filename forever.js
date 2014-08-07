var forever = require('forever');

forever.start(__dirname + '/app.js', {uid: 'chat_happy'});
