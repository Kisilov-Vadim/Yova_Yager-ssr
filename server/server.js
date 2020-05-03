import express from 'express';
import fs from 'fs';
import path from 'path';
import "isomorphic-fetch";
import { createStore } from 'redux';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {App} from '../src/App/index';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import {reducer} from '../src/store/store';
import {getToken, getData} from '../src/store/actions';

const PORT = 8000;

const app = express()

//get full content for div#root
const getSSRHtml = (url, state) => {
  const context = {state}
  const store = createStore(reducer, state);
  return ReactDOMServer.renderToString(
    <StaticRouter context={context} location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )
}

// Url(string) - current page url.
// Return title in head
const getTitle = (url) => {
  console.log(url)
  switch (url) {
    case '/about':
      return 'About Page'
    case '/contacts':
      return 'Contacts Page';
    case '/works':
      return 'Works Page';
    case '/sociality':
      return 'Sociality Page';
    default:
      return 'Unknown Page';
  }
}

getToken('http://yova.praid.com.ua/api/login')
  .then(data => data.data['api_token'])
  .then(token =>  {
    Promise.all(
      [
        getData("http://yova.praid.com.ua/api/projects", token, 'feature', 'en', '', 'true'),
        getData("http://yova.praid.com.ua/api/projects", token, 'work', 'en', '', 'false'),
        getData("http://yova.praid.com.ua/api/projects", token, 'soc', 'en', '', 'false'),
        getData("http://yova.praid.com.ua/api/text", token),
        getData("http://yova.praid.com.ua/api/contact", token, '', 'en', '', ''),
        getData("http://yova.praid.com.ua/api/about", token, '', 'en', '', '')
      ])
      .then(data => ({
          screenWidth: 1440,
          menuShow: false,
          isLoaded: true,
          language: 'en',
          featured: data[0],
          works: data[1],
          allSocialities: data[2],
          currentWorkData: false,
          aboutPage: data[5],
          contactPage: data[4],
          allText: data[3]
        }))
      .then(state => {

        const allPersonalPages = [...state.featured, ...state.works, ...state.allSocialities]

        // get current work or sociality page
        for (let i = 0; i < allPersonalPages.length; i++) {
          app.get(`/${allPersonalPages[i].type}/${allPersonalPages[i].alias}`, (req, res, next) => {
            getToken('http://yova.praid.com.ua/api/login')
              .then(data => data.data['api_token'])
              .then(token => {
                getData(`http://yova.praid.com.ua/api/project`, token, '', 'en', allPersonalPages[i].id)
                  .then(data => {
                    state.currentWorkData = data;
                    const html = getSSRHtml(req.url, state);
                    fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
                      if(err) {
                        console.log(err)
                        return res.status(500).send('Some error happend')
                      }
                      return res.send(data.replace('<div id="root"></div>', `<div id="root">${html}</div>`))
                    })
                  })
                  .catch(err => console.log(err))
              })
              .catch(err => console.log(err))
          })
        }

        // get /about /contacts /works /allSocialities
        app.get('*', (req, res, next) => {
          const html = getSSRHtml(req.url, state);
          res.send(
            `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8"/>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport" content="width=device-width,initial-scale=1"/>
                <meta name="description" content="Main page Yova Yager"/>
                <title>${getTitle(req.url)}</title>
                <link href="/static/css/main.b41784da.chunk.css" rel="stylesheet">
              </head>
              <body>
                <div id="root">${html}</div>
                <script>!function(e){function t(t){for(var n,l,a=t[0],f=t[1],i=t[2],p=0,s=[];p<a.length;p++)l=a[p],Object.prototype.hasOwnProperty.call(o,l)&&o[l]&&s.push(o[l][0]),o[l]=0;for(n in f)Object.prototype.hasOwnProperty.call(f,n)&&(e[n]=f[n]);for(c&&c(t);s.length;)s.shift()();return u.push.apply(u,i||[]),r()}function r(){for(var e,t=0;t<u.length;t++){for(var r=u[t],n=!0,a=1;a<r.length;a++){var f=r[a];0!==o[f]&&(n=!1)}n&&(u.splice(t--,1),e=l(l.s=r[0]))}return e}var n={},o={1:0},u=[];function l(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.m=e,l.c=n,l.d=function(e,t,r){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)l.d(r,n,function(t){return e[t]}.bind(null,n));return r},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/";var a=this["webpackJsonptest-teact-sst"]=this["webpackJsonptest-teact-sst"]||[],f=a.push.bind(a);a.push=t,a=a.slice();for(var i=0;i<a.length;i++)t(a[i]);var c=f;r()}([])</script>
                <script src="/static/js/2.eca8c7ca.chunk.js"></script>
                <script src="/static/js/main.433daf52.chunk.js"></script>
              </body>
            </html>`
          )
        })
      })
    })
    .catch(err => console.log(err))

// get home page
app.get('/', (req, res, next) => {
  getToken('http://yova.praid.com.ua/api/login')
    .then(data => data.data['api_token'])
    .then(token =>  {
      Promise.all(
        [
          getData("http://yova.praid.com.ua/api/projects", token, 'feature', 'en', '', 'true'),
          getData("http://yova.praid.com.ua/api/projects", token, 'work', 'en', '', 'true'),
          getData("http://yova.praid.com.ua/api/projects", token, 'soc', 'en', '', 'true'),
          getData("http://yova.praid.com.ua/api/text", token),
          getData("http://yova.praid.com.ua/api/contact", token, '', 'en', '', ''),
          getData("http://yova.praid.com.ua/api/about", token, '', 'en', '', '')
        ])
        .then(data => {
          const state = {
            screenWidth: 1440,
            menuShow: false,
            isLoaded: true,
            language: 'en',
            featured: data[0],
            works: data[1],
            allSocialities: data[2],
            currentWorkData: false,
            aboutPage: data[5],
            contactPage: data[4],
            allText: data[3]
          }
          const html = getSSRHtml(req.url, state);
          res.send(
            `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8"/>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport" content="width=device-width,initial-scale=1"/>
                <meta name="description" content="Main page Yova Yager"/>
                <title>Yova Yager</title>
                <link href="/static/css/main.b41784da.chunk.css" rel="stylesheet">
              </head>
              <body>
                <div id="root">${html}</div>
                <script>!function(e){function t(t){for(var n,l,a=t[0],f=t[1],i=t[2],p=0,s=[];p<a.length;p++)l=a[p],Object.prototype.hasOwnProperty.call(o,l)&&o[l]&&s.push(o[l][0]),o[l]=0;for(n in f)Object.prototype.hasOwnProperty.call(f,n)&&(e[n]=f[n]);for(c&&c(t);s.length;)s.shift()();return u.push.apply(u,i||[]),r()}function r(){for(var e,t=0;t<u.length;t++){for(var r=u[t],n=!0,a=1;a<r.length;a++){var f=r[a];0!==o[f]&&(n=!1)}n&&(u.splice(t--,1),e=l(l.s=r[0]))}return e}var n={},o={1:0},u=[];function l(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.m=e,l.c=n,l.d=function(e,t,r){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)l.d(r,n,function(t){return e[t]}.bind(null,n));return r},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/";var a=this["webpackJsonptest-teact-sst"]=this["webpackJsonptest-teact-sst"]||[],f=a.push.bind(a);a.push=t,a=a.slice();for(var i=0;i<a.length;i++)t(a[i]);var c=f;r()}([])</script>
                <script src="/static/js/2.eca8c7ca.chunk.js"></script>
                <script src="/static/js/main.433daf52.chunk.js"></script>
              </body>
            </html>`
          )
          // fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
          //   if(err) {
          //     console.log(err)
          //     return res.status(500).send('Some error happend')
          //   }
          //   return res.send(data.replace('<div id="root"></div>', `<div id="root">${html}</div>`))
          // })
        })
          .catch(err => console.log(err))
      })
})

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.listen(PORT, () => {
  console.log(`App launcherd on ${PORT}` )
})
