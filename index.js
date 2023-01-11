const express = require('express');
const app = express();

const locallydb = require('locallydb');
const db = new locallydb('./data');
const collection = db.collection('numbers');
const draws = db.collection('draws');

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
    const last_draw = Math.max(...draws.sort('@id').toArray().map(draw => Number(draw.id)));
    res.render('index.pug', {last_draw: last_draw});
  });

  app.post('/counter', (req, res) => {
    const num = req.query.num;
    const records = collection.where({id: `${num}`}).toArray();
    console.log(records);
    const record = records[0];
    collection.update(record.cid, {count: record.count + 1});
    res.send({count: record.count});
  });

  app.get('/top20', (req, res) => {
    const counts = collection.where('@count > 0').sort('@count').toArray().filter((record, idx) => idx < 20).map(record => Number(record.id));
    // console.log(counts);
    res.json(counts);
  });

  app.post('/save-draw', (req, res) => {
    const draw = Number(req.query.draw);
    const winners = req.query.winners;
    draws.insert({
      id: draw, winners: winners.split(",")
    });
    console.log(`Saved draw ${draw}`);
    res.send({result: "saved"});
  });