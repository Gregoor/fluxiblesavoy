import express from 'express';
import serialize from 'serialize-javascript';
import {navigateAction} from 'flux-router-component';
import React from 'react';
import app from './app';
import dbConnect from './db/connect';

let htmlComponent = React.createFactory(require('./components/html.jsx'));
let debug = require('debug')('savoy');

dbConnect().then(db => {
  app.getPlugin('ServiceProxyPlugin').registerService('refreshMovieStore', {
    run: () => new Promise(resolve => {
      db.collection('crawls').find({}).sort({at: -1}).limit(1).toArray((err, crawls) => {
        resolve(crawls[0]);
      });
    })
  });

  let server = express();
  server.set('state namespace', 'App');
  server.use('/public', express.static(__dirname + '/dist'));

  server.use((req, res, next) => {
    let context = app.createContext();

    debug('Executing navigate action');
    context.getActionContext().executeAction(navigateAction, {url: req.url},
      (err) => {
        if (err) {
          if (err.status && err.status === 404) next();
          else next(err);
          return;
        }

        debug('Exposing context state');
        let exposed = `window.App=${serialize(app.dehydrate(context))};`;

        debug('Rendering Application component into html');
        let html = React.renderToStaticMarkup(htmlComponent({
          context: context.getComponentContext(),
          state: exposed,
          markup: React.renderToString(context.createElement())
        }));

        debug('Sending markup');
        res.type('html');
        res.write('<!DOCTYPE html>' + html);
        res.end();
      }
    );
  });

  let port = process.env.PORT || 3000;
  server.listen(port);
  console.log(`Listening on port ${port}`);
});
