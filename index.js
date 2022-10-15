const express = require('express');
const app = express();

//external credential storage - dont include in git repository
const credentials = require('./config/credentials.js');

const server = app.listen(credentials.port, function(){
    console.log('Server listening on port ' + credentials.port);
  });

app.set('view-engine', 'pug');

app.use(express.static('public'));

//Global defer function
function defer() {
    let res, rej;
  
    let promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
  
    promise.resolve = res;
    promise.reject = rej;
  
    return promise
  
  }

  app.get('/', (req, res) => {
    res.render('index.pug', {});
  });