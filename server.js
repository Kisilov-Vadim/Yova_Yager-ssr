//Node modules
import express from 'express';
import fs from 'fs';
import path from 'path';
import "isomorphic-fetch";

//React modules
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import MetaTagsServer from 'react-meta-tags/server';
import {MetaTagsContext} from 'react-meta-tags';
import { createProxyMiddleware } from 'http-proxy-middleware';

//React Components
import {App} from '../src/App/index';

//React store and actions
import {reducer} from '../src/store/store';
import getData from './dataUtilits.js';

//Create server
const PORT = 8001;

const app = express()

let metaTagsInstance;

//get full content for div#root
const getSSRHtml = (url, state) => {
  metaTagsInstance = MetaTagsServer();
  const context = {state}
  const store = createStore(reducer, state);
  return ReactDOMServer.renderToString(
    <StaticRouter context={context} location={url}>
      <Provider store={store}>
         <MetaTagsContext extract = {metaTagsInstance.extract}>
           <App />
         </MetaTagsContext>
      </Provider>
    </StaticRouter>
  )
}

app.use('/api', createProxyMiddleware({ target: 'http://yova.praid.com.ua:8000' }));
app.use('/admin', createProxyMiddleware({ target: 'http://yova.praid.com.ua:8000' }));

app.get('/works/:name', (req, res) => {
  getData(req.params.name)
    .then(state => {
      const html = getSSRHtml(req.url, state);
      const meta = metaTagsInstance.renderToString();
      fs.readFile(path.resolve('build/index.html'), 'utf-8', (err, data) => {
        if(err) {
          console.log(err)
          return res.status(500).send('Some error happend')
        }
        return res.status(200).send(
          data.replace('</head>', `${meta}</head>`).replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        )
      })
    })
    .then(err => console.error(`Proplem with data fetch from getData /server/server.js, url: /works/:name; error: ${err}`))
})

app.get('/socialities/:name', (req, res) => {
  getData(req.params.name)
    .then(state => {
      const html = getSSRHtml(req.url, state);
      const meta = metaTagsInstance.renderToString();
      fs.readFile(path.resolve('build/index.html'), 'utf-8', (err, data) => {
        if(err) {
          console.log(err)
          return res.status(500).send('Some error happend')
        }
        return res.status(200).send(
          data.replace('</head>', `${meta}</head>`).replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        )
      })
    })
    .then(err => console.error(`Proplem with data fetch from getData /server/server.js, url: /socialities/:name; error: ${err}`))
})

app.get('*', (req, res) => {
  getData()
  .then(state => {
    const html = getSSRHtml(req.url, state);
    const meta = metaTagsInstance.renderToString();
    fs.readFile(path.resolve('build/index.html'), 'utf-8', (err, data) => {
      if(err) {
        console.log(err)
        return res.status(500).send('Some error happend')
      }
      return res.status(200).send(
        data.replace('</head>', `${meta}</head>`).replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      )
    })
  })
  .catch(err => console.log(err))
})

app.use('/static', express.static(__dirname + '../public_html'))

app.listen(PORT, () => {
  console.log(`Listen on ${PORT} port` )
})
